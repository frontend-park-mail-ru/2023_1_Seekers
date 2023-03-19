declare module "*.hbs" {
    const _: Function;
    export default _;
}

type HandlebarsTemplateDelegate<T = any> = Handlebars.TemplateDelegate<T>;

declare const DOMAIN: string;

type userData = {
    username: string,
    email: string,
    avatar: string | Blob,
    password?: string,
};

type CustomPages = LoginPage;
