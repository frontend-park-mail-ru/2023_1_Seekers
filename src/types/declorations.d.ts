declare module "*.hbs" {
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
    "title": string,
    "text": string,
}

type LetterFrameData = {
    message_id: number,
    seen: bool,
    from_user_email: string,
    title: string,
    text: string,
    created_at: string,
    href: string,
}

type CustomPages = LoginPage;
