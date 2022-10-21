import ICommand from '../ICommand';
import ICommandEvent from '../ICommandEvent';

export default class StatusCommand implements ICommand {
    public readonly name: string;
    public readonly description?: string;

    public constructor(name: string, description?: string) {
        this.name = name;

        if (description) this.description = description;
    }

    private startup: Date = new Date();

    async execute(event: ICommandEvent): Promise<void> {
        if (!(await this.shouldExecute(event))) return;

        let timeRunningDate = new Date(
            new Date().getTime() - this.startup.getTime()
        );

        let timeRunningStr = `${Math.floor(
            timeRunningDate.getTime() / 36e5
        )}:${Math.floor(timeRunningDate.getTime() / 6000)}:${Math.floor(
            timeRunningDate.getTime() / 1000
        )}`;

        let statusStr =
            `Bot version: 0.1` + '\n' + `Time running: ${timeRunningStr}`;

        await event.message.reply(statusStr);
    }

    async shouldExecute(event: ICommandEvent): Promise<boolean> {
        return true;
    }
}
