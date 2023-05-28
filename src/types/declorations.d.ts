declare module '*.hbs' {
    const _: Function;
    export default _;
}

declare module '*.mp3';

type HandlebarsTemplateDelegate<T = any> = Handlebars.TemplateDelegate<T>;

declare const DOMAIN: string;

type Profile = {
    firstName: string,
    lastName: string,
    email: string,
    avatar: string | Blob,
};

type AttachToSend = {
    attachID?: number,
    fileName: string,
    fileData: string,
}

type MailToSend = {
    recipients: string[],
    title: string,
    text: string,
    attachments: AttachToSend[],
    from_user: string,
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
    preview: string,
    created_at: string,
    href: string,
    avatar: string,
    recipients?: ProfileData[],
    attachments?: AttachmentData[],
    showRecipient?: boolean,
}

type MailData = {
    message_id: number,
    from_user_id: ProfileData,
    recipients: ProfileData[],
    attachments: AttachmentData[],
    title: string,
    created_at: string,
    text: string,
    reply_to: MailData,
    seen: boolean,
    favorite: string,
    is_draft: boolean,
    attachmentsSize: string,
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

type AttachmentData = {
    attachID: number,
    fileName: string,
    type: string,
    sizeStr: string,
    sizeCount: number,
}

type MessageFromSocket = {
    mailData: MailData,
    folder: string,
}

type CustomPages = LoginPage;
