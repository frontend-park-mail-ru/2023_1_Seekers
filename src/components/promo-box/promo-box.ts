import {Component} from '@components/component';
import {ListItem} from '@uikits/list-item/list-item';
import {config} from '@config/config';

import template from '@components/promo-box/promo-box.hbs';

import '@components/promo-box/promo-box.scss';

export interface PromoBox {
    state: {
        list:any
    },
}

/**
 * class implementing component PromoBox
 */
export class PromoBox extends Component {
    /**
     * Constructor that creates a component class PromoBox
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            list: {
                fields: config.forms.login.promoBox.fields,
            },
        };
    }

    /**
     * method insert form to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                title: config.forms.login.promoBox.title,
                list: ListItem.renderTemplate(this.state.list),
            },
        ));
    }
}
