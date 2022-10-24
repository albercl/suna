import DevCommand from './DevCommand';
import ICommandEvent from '../ICommandEvent';

export default class TraceCommand extends DevCommand {
    public constructor(name: string, description?: string) {
        super(name, description);
    }

    public async execute(event: ICommandEvent): Promise<void> {
        await event.message.reply({
            content: "Here is today's log file",
            files: ['logs/latest.log'],
        });
    }
}
