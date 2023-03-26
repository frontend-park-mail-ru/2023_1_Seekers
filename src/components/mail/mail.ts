import {Component} from '@components/component';
import '@components/mail/mail.scss'
import template from '@components/mail/mail.hbs'
import {reducerLetters} from "@stores/LettersStore";
import {MailContent} from '@uikits/mail-content/mail-content';
import {microEvents} from "@utils/microevents";


export interface Mail {
    state: {
        element: Element,
        children: Element[],
    },
}

/**
 * class implementing component Mail
 */
export class Mail extends Component {

    /**
     * Constructor that creates a component class Mail
     * @param {componentContext} context HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            children: [],
        }

        this.rerender = this.rerender.bind(this);

        microEvents.bind('mailChanged', this.rerender);
    }

    /**
     * method insert mail to HTML
     */
    render() {
        if(reducerLetters._storage.get(reducerLetters._storeNames.mail).title === undefined){
            this.parent.insertAdjacentHTML('afterbegin', template({}));
        } else {
            this.parent.insertAdjacentHTML('afterbegin', template(
                {
                    from_user: reducerLetters._storage.get(reducerLetters._storeNames.mail).from_user,
                    creating_date: reducerLetters._storage.get(reducerLetters._storeNames.mail).creating_date,
                    recipient: 'ogreba@mailbox.ru',
                    mailContent: MailContent.renderTemplate(reducerLetters._storage.get(reducerLetters._storeNames.mail)),
                }
            ));
        }

        this.state.element = this.parent.getElementsByClassName('mail')[0];
        this.registerEventListener();
    }

    /**
     * method register NOT IMPLEMENTED
     * will unregister listeners for each button in mail
     */
    registerEventListener() {
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will register listeners for each button in mail
     */
    unregisterEventListener() {
    }

    /**
     * method purge NOT IMPLEMENTED
     * mail page clearing
     * will purge all the content in mail
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }

    rerender() {
        console.log('in rerender');
        this.purge();
        this.render();
    }
}
