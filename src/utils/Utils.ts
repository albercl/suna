const intFormatterTwoDigits = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 2,
});

export function dateDiffToString(start: Date, end: Date) {
    const timeRunningDate = new Date(end.getTime() - start.getTime());

    return `${intFormatterTwoDigits.format(
        Math.floor(timeRunningDate.getTime() / 36e5)
    )}:${intFormatterTwoDigits.format(
        Math.floor((timeRunningDate.getTime() / 60000) % 60)
    )}:${intFormatterTwoDigits.format(
        Math.floor((timeRunningDate.getTime() / 1000) % 60)
    )}`;
}

export function dateToLogFile(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
}
