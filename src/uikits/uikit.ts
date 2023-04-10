export interface UiKit extends anyObject {
    context: anyObject;
}

/**
 * Base class for uikits
 */
export class UiKit {
    /**
     * constructor that initializes root for current object
     * @param context - contains parent
     */
    constructor(context :anyObject) {
        this.context = context;
        if (Object.hasOwnProperty.call(context, 'root')) {
            this.root = context.root;
        }
    }
}
