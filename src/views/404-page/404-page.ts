import '@views/404-page/404-page.scss';

import template from '@views/404-page/404-page.hbs';
import {View} from '@views/view';

/**
 * class implementing 404 page
 */
export default class Page404 extends View {
    /**
     * @param parent - HTML-element for including content
     */
    constructor(parent: Element) {
        super(
            parent,
            template,
        );
    }

    /**
     * method insert login to HTML
     */
    render(): void {
        super.render({});
    }
}

export const page404 = new Page404(document.getElementById('root')!);
