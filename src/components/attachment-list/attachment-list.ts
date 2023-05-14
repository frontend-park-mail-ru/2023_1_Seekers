import {Component} from '@components/component';
import '@components/attachment-list/attachment-list.scss';
import template from "@components/attachment-list/attachment-list.hbs";
import {config} from "@config/config";
import {Attachment} from "@uikits/attachment/attachment";


export interface AttachmentList {
    state: {
        element: Element,
        actionButtons: Element[],
        attachments: [],
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
        Object.values(config.DELETETHISATTACHES).forEach((attach: object) => {
            attachmentList.push(Attachment.renderTemplate(attach));
        });


        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                attachments: attachmentList,
            },
        ));

    }

    /**
     * method registerEventListener
     * register listeners for current object
     */
    registerEventListener() {

    }

    /**
     * method unregisterEventListener
     * unregister listeners for current object
     */
    unregisterEventListener() {

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

