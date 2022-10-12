import { TextChannel, User } from 'discord.js';

/**
 * Stores all the information relative to a command event as:
 * user, channel, message or command args.
 */
export default interface ICommandEvent {
    /**
     * Get the user
     * @returns user
     */
    get user(): User;

    /**
     * Get the text channel
     * @returns TextChannel
     */
    get channel(): TextChannel;
    /**
     * Get the message
     * @returns string
     */
    get message(): string;
    /**
     * Get the command args
     * @returns string
     */
    get args(): string[];
}
