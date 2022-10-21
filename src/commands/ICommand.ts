import ICommandEvent from './ICommandEvent';

/**
 * The command interface that contains information about a
 * command of the application: {@link name} and {@link description}.
 *
 * The {@link execute} method executes the command actions.
 *
 * Also adds the {@link shouldExecute} method that allows checking
 * wether a command should be executed or not.
 */
export default interface ICommand {
    // Command name and unique identifier
    name: string;
    // Command description
    description?: string;

    /**
     * Return {@link true} if the command can be executed by the current
     * event context.
     * @returns {boolean} {@link true} if the command should be executed or {@link false} in other case
     */
    shouldExecute(event: ICommandEvent): Promise<boolean>;

    /**
     * Executes the command with the provided {@link ICommandEvent} that
     * gives the command all the information that needs to be executed.
     */
    execute(event: ICommandEvent): Promise<void>;
}
