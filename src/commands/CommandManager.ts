import ICommand from './ICommand';
import { Message } from 'discord.js';
import ICommandEvent from './ICommandEvent';
import LoggerFactory from '../utils/LoggerFactory';

export default class CommandManager {
    private static instance: CommandManager;
    private static readonly PREFIX = 's!';

    private constructor() {}

    public static get Instance() {
        if (!CommandManager.instance) {
            CommandManager.instance = new CommandManager();
        }

        return CommandManager.instance;
    }

    private logger = LoggerFactory.Instance.getLogger();
    private commandCollection: Map<string, ICommand> = new Map();

    public registerCommand(cmd: ICommand) {
        this.commandCollection.set(cmd.name, cmd);
    }

    public deleteCommand(cmd: ICommand) {
        this.commandCollection.delete(cmd.name);
    }

    /**
     * Try to execute a command searching it in the command collection.
     * @param message discord message object
     * @returns true if the message contains a valid command or false in other way
     */
    public tryRunCommand(message: Message): boolean {
        if (!message.content.startsWith(CommandManager.PREFIX)) return false;

        // Extract args from content
        const args = message.content.split(' ');
        args[0] = args[0].substring(2, args[0].length);

        const cmd = this.commandCollection.get(args[0]);
        if (!cmd) {
            return false;
        }

        // Construct event
        const event: ICommandEvent = {
            args,
            message,
            user: message.author,
            channel: message.channel,
        };

        cmd.execute(event).catch((e) => this.logger.error(e.message, e));
        return true;
    }
}
