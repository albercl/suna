import IConfig from '../config/IConfig';
import { Client, GatewayIntentBits, Message, Partials } from 'discord.js';
import LoggerFactory from '../utils/LoggerFactory';
import CommandManager from '../commands/CommandManager';
import StatusCommand from '../commands/dev/StatusCommand';
import TraceCommand from '../commands/dev/TraceCommand';

/**
 * The bot controller is the class where all the actions over the bot are done.
 * For example, receiving a message and analyze it corresponds to this
 * class and then it redistribute sub-tasks in the different services.
 */
export default class BotController {
    private static instance: BotController;

    /**
     * Returns the instance of the controller and sets the config
     * provided as parameter or throws error when no config is
     * provided when creating the instance
     * @param config configuration of the bot
     * @throws when the config is empty at first execution
     */
    public static getInstance(config?: IConfig) {
        if (!this.instance) {
            this.instance = new BotController(config);
        }

        return this.instance;
    }

    private logger = LoggerFactory.Instance.getLogger();

    private commandManager = CommandManager.Instance;

    public config!: IConfig;
    private client: Client;

    private constructor(config?: IConfig) {
        if (!config) {
            throw new Error(
                'No configuration provided at the creation of the BotController object'
            );
        }

        this.logger.info('Starting bot...');

        this.config = config;

        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            partials: [Partials.Channel],
        });

        this.setupBot();
    }

    private setupBot() {
        this.commandManager.registerCommand(new StatusCommand('status'));
        this.commandManager.registerCommand(new TraceCommand('trace'));

        this.client
            .on('ready', (client) => {
                this.logger.info(`Bot logged in as '${client.user.tag}'`);
            })
            .on('messageCreate', (message) => {
                this.onMessageReceived(message);
            })
            .login(this.config.token)
            .catch(() => this.logger.error("Couldn't login in discord!!!"));
    }

    /**
     * When a message is received
     */
    onMessageReceived(message: Message): void {
        // Create event
        this.commandManager.tryRunCommand(message);
    }
}
