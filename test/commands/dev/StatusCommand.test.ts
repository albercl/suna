import StatusCommand from '../../../src/commands/dev/StatusCommand';
import ICommandEvent from '../../../src/commands/ICommandEvent';
import { Message, TextChannel, User } from 'discord.js';

jest.mock('../../../src/config/Config', () => {
    return {
        token: '',
        developers: ['12345'],
    };
});

function getEvent(
    id: string | undefined,
    msgObj: { msg?: string }
): ICommandEvent {
    return {
        args: ['status'],
        user: {
            id: {
                toString: () => id,
            },
        } as unknown as User,
        message: {
            reply: async (str: string): Promise<void> => {
                msgObj.msg = str;
            },
        } as unknown as Message,
        channel: {} as TextChannel,
    };
}

describe('Status command', () => {
    const cmd = new StatusCommand('status', 'This is the status command');

    it('Run command with startup time 0 seconds', async () => {
        const msgObj = { msg: undefined };
        const event = getEvent('12345', msgObj);

        await cmd.execute(event).then();

        expect(msgObj.msg).toBe('Bot version: 0.1\nTime running: 00:00:00');
    });

    it('Try run with unauthorized user', async () => {
        const msgObj = { msg: undefined };
        const event = getEvent('123', msgObj);

        await cmd.execute(event);

        expect(msgObj.msg).toBeUndefined();
    });

    it('Try to run with undefined user', async () => {
        const msgObj = { msg: undefined };
        const event = getEvent(undefined, msgObj);

        await cmd.execute(event);

        expect(msgObj.msg).toBeUndefined();
    });
});
