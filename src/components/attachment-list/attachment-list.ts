import {Component} from '@components/component';
import '@components/attachment-list/attachment-list.scss';
import template from "@components/attachment-list/attachment-list.hbs";
import {config} from "@config/config";
import {Attachment} from "@uikits/attachment/attachment";
import {reducerLetters} from "@stores/LettersStore";
import {dispatcher} from "@utils/dispatcher";
import {actionGetLetters} from "@actions/letters";


export interface AttachmentList {
    state: {
        element: Element,
        actionButtons: Element[],
        attachments: Element[],
    },
}

/**
 * class implementing component AttachmentList
 */
export class AttachmentList extends Component {
    /**
     * Constructor that creates a component class Mail
     * @param context - HTML-element for including content
     */
    constructor(context: componentContext) {
        super(context);
        this.state = {
            element: document.createElement('div'),
            actionButtons: [],
            attachments: [],
        };
    }

    /**
     * method insert AttachmentList to HTML
     */
    render() {
        const attachmentList: object[] = [];
        reducerLetters.getCurrentMail().attachments.forEach((attach: object) => {
            attachmentList.push(Attachment.renderTemplate(attach));
        });


        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                attachments: attachmentList,
            },
        ));

        this.state.element = document.getElementById('attachment-list')!;

        this.state.attachments =  [...this.state.element.getElementsByClassName('attachment')];
        this.state.actionButtons =  [...this.state.element.getElementsByClassName('attachment__footer')];

        this.registerEventListener();
    }

    saveAttachment = (e: Event) => {
        console.log('asdas')
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                dispatcher.dispatch(reducerLetters.getAttachment(currentTarget.dataset.section))
            }
        }
    }

    /**
     * method registerEventListener
     * register listeners for current object
     */
    registerEventListener() {
        this.state.actionButtons.forEach((attach) => {
            attach.addEventListener('click', this.saveAttachment);
        })
    }

    /**
     * method unregisterEventListener
     * unregister listeners for current object
     */
    unregisterEventListener() {
        this.state.actionButtons.forEach((attach) => {
            attach.removeEventListener('click', this.saveAttachment);
        })
    }

    /**
     * method purge
     * AttachmentList page clearing
     * will purge all the content in AttachmentList
     */
    purge() {
        this.unregisterEventListener();
        this.state.element.remove();
    }
}

