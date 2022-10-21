import { Guild, GuildMember } from 'discord.js';
import ICommandEvent from './ICommandEvent';

/**
 * This class represents a command event that has occurred on a guild
 * text command.
 */
export default interface IGuildCommandEvent extends ICommandEvent {
    // Guild where the event occurred
    guild: Guild;
    // Member who sent the message
    member: GuildMember;
}
