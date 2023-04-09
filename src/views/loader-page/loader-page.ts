import {View} from '@views/view';
import template from '@views/loader-page/loader-page.hbs';

import '@views/loader-page/loader-page.scss';


export interface LoaderPage {
    state: {
        element: HTMLElement,
    }
}

/**
 * class implementing login page
 */
export class LoaderPage extends View {
    /**
     *
     * @param {Element} parent HTML-element for including content
     */
    constructor(parent: Element) {
        super(
            parent,
            template,
        );

        this.state = {
            element: document.createElement('div'),
        };
    }

    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
    };


    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
    };

    /**
     * method insert login to HTML
     */
    override render = () => {
        super.render({});
        this.state.element = this.parent.getElementsByClassName('loader-page')[0] as HTMLElement;

        this.registerEvents();
    };

    /** \
     * method mailbox page clearing
     */
    purge() {
        this.unregisterEvents();
        this.state.element.remove();
    }
}

export const loaderPage = new LoaderPage(document.getElementById('root')!);
