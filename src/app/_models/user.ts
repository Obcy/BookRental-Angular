export class User {
    id: number | undefined;
    emailAddress: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    token?: string | undefined;
    roles?: string[];
}