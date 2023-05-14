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
    title: string,
    text: string,
    attachments: string[],
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
    recipients?: ProfileData[],
}

type MailData = {
    message_id: number,
    from_user_id: ProfileData,
    recipients: ProfileData[],
    attachments: Attachment[],
    title: string,
    created_at: string,
    text: string,
    reply_to: MailData,
    seen: boolean,
    favorite: string,
    is_draft: boolean,

}

type Folder = {
    folder_id: number,
    folder_slug: string,
    messages_count?: number,
    messages_unseen: number,
    name: string,
    img?: string
}

type ProfileData = {
    firstName: string,
    lastName: string,
    email: string,
    avatar?: string
}

type Attachment = {
    attachID: number,
    fileName: string,
    type: string,
}

type CustomPages = LoginPage;
