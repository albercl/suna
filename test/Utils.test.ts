import { dateDiffToString, dateToLogFile } from '../src/utils/Utils';

describe('dateDiffToSTring', () => {
    it('0 diff', () => {
        const date = new Date();

        expect(dateDiffToString(date, date)).toBe('00:00:00');
    });

    it('5 seconds diff', () => {
        const start = new Date();
        const end = new Date(start.getTime() + 5 * 1000);

        expect(dateDiffToString(start, end)).toBe('00:00:05');
    });

    it('61 seconds diff', () => {
        const start = new Date();
        const end = new Date(start.getTime() + 61 * 1000);

        expect(dateDiffToString(start, end)).toBe('00:01:01');
    });

    it('5 minutes and 5 seconds diff', () => {
        const start = new Date();
        const end = new Date(start.getTime() + 5 * 60 * 1000 + 5 * 1000);

        expect(dateDiffToString(start, end)).toBe('00:05:05');
    });

    it('61 minutes diff', () => {
        const start = new Date();
        const end = new Date(start.getTime() + 61 * 60 * 1000);

        expect(dateDiffToString(start, end)).toBe('01:01:00');
    });

    it('5 hours, 5 minutes and 5 seconds diff', () => {
        const start = new Date();
        const end = new Date(
            start.getTime() + 5 * 60 * 60 * 1000 + 5 * 60 * 1000 + 5 * 1000
        );

        expect(dateDiffToString(start, end)).toBe('05:05:05');
    });

    it('100 hours diff', () => {
        const start = new Date();
        const end = new Date(start.getTime() + 100 * 60 * 60 * 1000);

        expect(dateDiffToString(start, end)).toBe('100:00:00');
    });
});

describe('dateToLogFile', () => {
    it('some date', () => {
        const now = new Date('2000-12-15');
        const result = dateToLogFile(now);

        expect(result).toBe('2000-12-15.log');
    });
});
