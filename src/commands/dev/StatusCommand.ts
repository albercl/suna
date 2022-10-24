import ICommandEvent from '../ICommandEvent';
import DevCommand from './DevCommand';
import { dateDiffToString } from '../../utils/Utils';

/**
 * Provides some information about the bot execution like the version or runtime.
 */
export default class StatusCommand extends DevCommand {
    public constructor(name: string, description?: string) {
        super(name, description);
    }

    private startup: Date = new Date();

    public async execute(event: ICommandEvent): Promise<void> {
        if (!(await this.shouldExecute(event))) return;

        const statusStr =
            `Bot version: 0.1\n` +
            `Time running: ${dateDiffToString(this.startup, new Date())}`;

        await event.message.reply(statusStr);
    }
}
