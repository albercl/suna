export default interface IUser {
    snowflake: string;
    globalRole?: GlobalRole;
}

enum GlobalRole {
    'DEVELOPER',
}
