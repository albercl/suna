import ICommand from '../ICommand';
import ICommandEvent from '../ICommandEvent';
import CONFIG from '../../config/Config';

/**
 * Generic implementation of a Dev Command that will be executed on
 * any chats and are only available for developers specified in config.json
 */
export default abstract class DevCommand implements ICommand {
    name: string;
    description?: string | undefined;

    protected constructor(name: string, description?: string) {
        this.name = name;

        if (description) this.description = description;
    }

    async shouldExecute(event: ICommandEvent): Promise<boolean> {
        if (!event || !event.user || !event.user.id) return false;
        const userId = event.user.id.toString();

        return !!CONFIG.developers.find((s) => s === userId);
    }

    abstract execute(event: ICommandEvent): Promise<void>;
}
