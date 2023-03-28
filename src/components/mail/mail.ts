import {Component} from '@components/component';
import '@components/mail/mail.scss'
import template from '@components/mail/mail.hbs'
import {reducerLetters} from "@stores/LettersStore";
import {MailContent} from '@uikits/mail-content/mail-content';
import {microEvents} from "@utils/microevents";
import {config} from "@config/config";
import {IconButton} from "@uikits/icon-button/icon-button";
import {dispatcher} from "@utils/dispatcher";
import {actionGetLetters} from "@actions/letters";


export interface Mail {
    state: {
        element: Element,
        actionButtons: Element[],
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
            actionButtons: [],
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
            let actionButtons = '';
            config.buttons.mailActionButtons.forEach((button: Object) => {
                actionButtons += (IconButton.renderTemplate(button));
            })
            this.parent.insertAdjacentHTML('afterbegin', template(
                {
                    from_user: reducerLetters._storage.get(reducerLetters._storeNames.mail).from_user,
                    creating_date: reducerLetters._storage.get(reducerLetters._storeNames.mail).creating_date,
                    recipient: 'ogreba@mailbox.ru',
                    mailContent: MailContent.renderTemplate(reducerLetters._storage.get(reducerLetters._storeNames.mail)),
                    actionButtons: actionButtons,
                }
            ));
        }

        this.state.element = this.parent.getElementsByClassName('mail')[0];

        this.state.actionButtons = [...this.state.element.getElementsByClassName('icon-button')];
        console.log('size: ' + this.state.actionButtons.length);
        console.log(this.state.actionButtons);
        this.registerEventListener();
    }

    /**
     * method register NOT IMPLEMENTED
     * will unregister listeners for each button in mail
     */
    registerEventListener() {
        this.state.actionButtons.forEach((button) => {
            console.log('in cycle');
            button.addEventListener('click', this.letterAction);
        })
    }

    /**
     * method unregister NOT IMPLEMENTED
     * will register listeners for each button in mail
     */
    unregisterEventListener() {
        this.state.actionButtons.forEach((button) => {
            button.removeEventListener('click', this.letterAction);
        })
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

    letterAction(e: Event) {
        e.preventDefault();
        const {currentTarget} = e;
        if(currentTarget instanceof HTMLElement){
            if(currentTarget.dataset.section){
                console.log('dispatching mail action...');
                // dispatcher.dispatch(actionGetLetters(currentTarget.dataset.section));
            }
        }
    }
}
