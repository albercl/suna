import { Message, TextBasedChannel, User } from 'discord.js';

/**
 * Stores all the information relative to a command event as:
 * user, channel, message or command args.
 */
export default interface ICommandEvent {
    // The user who executed the command
    user: User;
    // The channel where the command was executed
    channel: TextBasedChannel;
    // The complete message of the command event
    message: Message;
    // The args of the command
    args: string[];
}
