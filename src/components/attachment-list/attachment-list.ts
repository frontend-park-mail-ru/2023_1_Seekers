import {Component} from '@components/component';
import '@components/attachment-list/attachment-list.scss';
import template from "@components/attachment-list/attachment-list.hbs";
import {config} from "@config/config";
import {Attachment} from "@uikits/attachment/attachment";
import {reducerLetters} from "@stores/LettersStore";
import {dispatcher} from "@utils/dispatcher";
import {actionCtxMail, actionGetAttach, actionGetLetters, actionOpenAttach} from "@actions/letters";
import {iconChooser} from "@utils/iconChooser";


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
        reducerLetters.getCurrentMail().attachments.forEach((attach: AttachmentData) => {
            const attachShow = {
                attachID: attach.attachID,
                fileName: attach.fileName,
                icon: iconChooser.choose(attach.fileName),
                filesize: attach.sizeStr
            };
            attachmentList.push(Attachment.renderTemplate(attachShow));
        });


        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                attachments: attachmentList,
                filecount: attachmentList.length,
                commonFileSize: reducerLetters.getCurrentMail().attachmentsSize,
            },
        ));

        this.state.element = document.getElementById('attachment-list')!;

        this.state.attachments = [...this.state.element.getElementsByClassName('attachment')];
        this.state.actionButtons = [...this.state.element.getElementsByClassName('attachment__footer')];

        this.registerEventListener();
    }

    saveAttachment = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                e.stopPropagation();
                dispatcher.dispatch(actionGetAttach(Number(currentTarget.dataset.section)));
            }
        }
    }

    openAttachment = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                e.stopPropagation();
                dispatcher.dispatch(actionOpenAttach(Number(currentTarget.dataset.section)));
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
        });

        this.state.attachments.forEach((attach) => {
            attach.addEventListener('click', this.openAttachment);
        });
    }

    /**
     * method unregisterEventListener
     * unregister listeners for current object
     */
    unregisterEventListener() {
        this.state.actionButtons.forEach((attach) => {
            attach.removeEventListener('click', this.saveAttachment);
        });

        this.state.attachments.forEach((attach) => {
            attach.removeEventListener('click', this.openAttachment);
        });
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

