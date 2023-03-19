declare module "*.hbs" {
    const _: Function;
    export default _;
}

interface anyObject{
    [key: string]: any
}

interface componentProps extends anyObject {
    parent: HTMLElement,
}

type HandlebarsTemplateDelegate<T = any> = Handlebars.TemplateDelegate<T>;


interface DispatcherCallbackObject {
    callback: emptyCallback | oneParamCallback,
    isPending: boolean,
}
