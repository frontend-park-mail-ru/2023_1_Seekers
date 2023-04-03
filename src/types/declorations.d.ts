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

type mailToSend = {
    recipients: string[],
    "title": string,
    "text": string,
}

type CustomPages = LoginPage;
