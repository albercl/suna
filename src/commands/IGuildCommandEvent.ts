import { Guild, GuildMember } from 'discord.js';
import ICommandEvent from './ICommandEvent';
/**
 * This class represents a command event that has occurred on a guild
 * text command.
 */
export default interface IGuildCommandEvent extends ICommandEvent {
    /**
     * Get the guild where the event occurred
     * @returns Guild
     */
    get guild(): Guild | undefined;
    /**
     * Get the member who send the message
     * @returns GuildMember
     */
    get member(): GuildMember | undefined;
}
