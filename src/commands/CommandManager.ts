import ICommand from './ICommand';

export default class CommandManager {
    private static instance: CommandManager;

    private constructor() {}

    public get Instance() {
        if (!CommandManager.instance) {
            CommandManager.instance = new CommandManager();
        }

        return CommandManager.instance;
    }

    private commandCollection: Map<string, ICommand> = new Map();

    public registerCommand(cmd: ICommand) {
        this.commandCollection.set(cmd.name, cmd);
    }

    public deleteCommand(cmd: ICommand) {
        this.commandCollection.delete(cmd.name);
    }

    public runCommand(cmdName: string) {
        let cmd = this.commandCollection.get(cmdName);
        if (!cmd) {
            throw new Error("The introduced command doesn't exists");
        }
        // TODO: Pass {@link ICommandEvent} as argument
        cmd.execute(undefined as any);
    }
}
