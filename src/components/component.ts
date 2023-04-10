import {ROOT} from '@config/config';

export interface Component extends anyObject {
    context: componentContext;
    parent: HTMLElement;
}

/**
 * base class for components
 */
export class Component {
    /**
     * constructor that initializes parent field
     * @param context - contains parent
     */
    constructor(context = {parent: ROOT} as componentContext) {
        this.state = {};
        this.context = context;
        if (Object.hasOwnProperty.call(context, 'parent')) {
            this.parent = context.parent;
        }
    }
}
