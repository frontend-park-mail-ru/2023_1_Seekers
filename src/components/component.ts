import {ROOT} from '@config/config';

export interface Component extends anyObject {
    context: componentContext;
    parent: HTMLElement;
}

export class Component {
    constructor(context = {parent: ROOT} as componentContext) {
        this.state = {};
        this.context = context;
        if (Object.hasOwnProperty.call(context, 'parent')) {
            this.parent = context.parent;
        }
    }
}
