import CommandEvent from './ICommandEvent';

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
    /**
     * Get the name of the command
     * @returns command name
     */
    get name(): string;
    /**
     * Set the name attribute of the command
     * @param name command name
     */
    set name(name: string);

    /**
     * Get the description of the command
     * @returns command description
     */
    get description(): string;
    /**
     * Set the description of the command
     * @param description description of the commmand
     */
    set description(description: string);

    /**
     * Return true if the command can be executed by the current
     * event context.
     * @returns {boolean} {@linkcode true} if the command should be executed or {@linkcode false} in other case
     */
    shouldExecute(): boolean;

    /**
     * Executes the command with the provided {@linkcode ICommandEvent} that
     * gives the command all the information that needs to be executed.
     */
    execute(event: CommandEvent): void;
}
