import StatusCommand from '../../../src/commands/dev/StatusCommand';
import ICommandEvent from '../../../src/commands/ICommandEvent';
import { Message, TextChannel, User } from 'discord.js';

jest.mock('discord.js');

describe('Status command', () => {
    it('Run command with startup time 2 seconds', async () => {
        const cmd = new StatusCommand('status', 'This is the status command');
        let replyStr: string;
        const message = {
            reply: async (str: string) => {
                replyStr = str;
                return;
            },
        };

        let event: ICommandEvent = {
            args: ['status'],
            user: {} as User,
            message: message as any as Message,
            channel: {} as TextChannel,
        };

        let p = new Promise<void>((resolve) => {
            setTimeout(async () => {
                await cmd.execute(event);
                resolve();
            }, 2000);
        });

        await p;

        expect(replyStr!).toBe('Bot version: 0.1\nTime running: 0:0:2');
    });

    it('Run command with startup time 0 seconds', async () => {
        const cmd = new StatusCommand('status', 'This is the status command');
        let replyStr: string;
        const message = {
            reply: async (str: string) => {
                replyStr = str;
                return;
            },
        };

        let event: ICommandEvent = {
            args: ['status'],
            user: {} as User,
            message: message as any as Message,
            channel: {} as TextChannel,
        };

        let p = new Promise<void>(async (resolve) => {
            await cmd.execute(event);
            resolve();
        });

        await p;

        expect(replyStr!).toBe('Bot version: 0.1\nTime running: 0:0:0');
    });
});
