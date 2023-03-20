export interface UiKit extends anyObject {
    context: anyObject;
}

export class UiKit {
    constructor(context :anyObject) {
        this.context = context;
        if (Object.hasOwnProperty.call(context, 'root')) {
            this.root = context.root;
        }
    }
}
