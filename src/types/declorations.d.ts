declare module '*.hbs' {
    const _: Function;
    export default _;
}

type HandlebarsTemplateDelegate<T = any> = Handlebars.TemplateDelegate<T>;

declare const DOMAIN: string;

type Profile = {
    firstName: string,
    lastName: string,
    email: string,
    avatar: string | Blob,
};

type MailToSend = {
    recipients: string[],
    'title': string,
    'text': string,
}

type SearchMessage = {
    recipients?: string[],
    'text': string,
}

type LetterFrameData = {
    message_id: number,
    seen: bool,
    from_user_email: string,
    title: string,
    text: string,
    created_at: string,
    href: string,
    avatar: string,
    recipients?: any[],
}

type ProfileData = {
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

type MailData = {
    created_at: string,
    deleted: string,
    favorite: string,
    from_user_id: any,
    message_id: number,
    recipients: any[],
    length: number,
    reply_to: any,
    seen: boolean,
    text: string,
    title: string,
}

type Folder = {
    folder_id: number,
    folder_slug: string,
    messages_count?: number,
    messages_unseen: number,
    name: string,
    img?: string
}

type Recipient = {
    firstName: string,
    lastName: string,
    email: string,
    avatar?: string
}

type CustomPages = LoginPage;
