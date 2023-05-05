import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerLetters} from '@stores/LettersStore';

/**
 * class that implements all possible actions with sent mail
 */
class NewMailStore extends BaseStore {
    _storeNames = {
        title: 'title',
        text: 'text',
        recipients: 'recipients',
        answerStatus: 'answerStatus',
        answerBody: 'answerBody',
        isDraft: 'isDraft',
        draftId: 'draftId',
    };

    /**
     * constructor that creates the store
     */
    constructor() {
        super();
    }

    /**
     * function that sets initial state of the store
     */
    createNewMail = async () => {
        this._storage.set(this._storeNames.title, '');
        this._storage.set(this._storeNames.text, '');
        this._storage.set(this._storeNames.recipients, '');
        this._storage.set(this._storeNames.answerBody, '');
        this._storage.set(this._storeNames.answerStatus, '');
        this._storage.set(this._storeNames.isDraft, false);

        microEvents.trigger('createNewMail');
    };

    /**
     * function that sets initial state of the store when need to forward mail
     */
    forwardMail = async () => {
        this._storage.set(
            this._storeNames.title, reducerLetters.getCurrentContextMail().title,
        );
        this._storage.set(
            this._storeNames.text, reducerLetters.getCurrentContextMail().text,
        );
        this._storage.set(this._storeNames.recipients, '');

        this._storage.set(this._storeNames.isDraft, false);
        microEvents.trigger('createNewMail');
    };

    /**
     * function that sets initial state of the store when need to reply to mail
     */
    replyToMail = async () => {
        const email = reducerLetters.getCurrentContextMail().from_user_id.email;
        const text = reducerLetters.getCurrentContextMail().text;
        const title = reducerLetters.getCurrentContextMail().title;

        this._storage.set(
            this._storeNames.title, 'RE: ' + title,
        );
        this._storage.set(
            this._storeNames.text, '\n\n\n\n\n\n' + email +
            ' написал(а) ' + 'ВРЕМЯ(с датой):' + '\n' + text,
        );

        this._storage.set(
            this._storeNames.recipients, email,
        );
        this._storage.set(this._storeNames.isDraft, false);
        microEvents.trigger('createNewMail');
    };

    /**
     * function that sets initial state of the store when need to forward mail
     */
    selectDraft = async (draftHref: string) => {
        this._storage.set(this._storeNames.draftId, parseInt(draftHref.split('/').pop()!));
        const mail = reducerLetters.getLetterByFolderAndId('drafts', this._storage.get(this._storeNames.draftId))!;
        let recipientsStr = '';

        mail.recipients?.forEach((recipient) => {
            recipientsStr = recipientsStr + recipient.email + ' ';
        });

        this._storage.set(
            this._storeNames.title, mail.title,
        );
        this._storage.set(
            this._storeNames.text, mail.text,
        );
        this._storage.set(this._storeNames.recipients, recipientsStr);
        this._storage.set(this._storeNames.isDraft, true);
        microEvents.trigger('createNewMail');
    };

    /**
     * function that make send mail request to backend
     * @param mail - mail to send
     */
    sendMail = async (mail: MailToSend) => {
        Connector.makePostRequest(config.api.sendMail, mail).then(([status, body]) => {
            this._storage.set(this._storeNames.answerBody, body);
            this._storage.set(this._storeNames.answerStatus, status);

            if (this.isDraft()) {
                reducerLetters.deleteMailRequest(this.getDraftId()).then(() =>
                    reducerLetters.getLetters(reducerLetters.getCurrentLettersName()));
            }

            microEvents.trigger('mailSent');
        });
    };

    sendDraft = async (draft: MailToSend) => {
        const promise = Connector.makePostRequest(config.api.sendDraft, draft)
        const [status, body] = await promise;

        this._storage.set(this._storeNames.answerBody, body);
        this._storage.set(this._storeNames.answerStatus, status);

        if (status == responseStatuses.OK) {
            if (this.isDraft()) {
                reducerLetters.deleteMailRequest(this.getDraftId()).then(() =>
                    reducerLetters.getLetters(reducerLetters.getCurrentLettersName()));
            }
        }
        microEvents.trigger('draftSent');
        return promise;
    };

    getDraftId() {
        return this._storage.get(this._storeNames.draftId);
    }

    isDraft() {
        return this._storage.get(this._storeNames.isDraft);
    }
}

export const reducerNewMail = new NewMailStore();
