import {Connector} from '@utils/ajax';
import {config} from '@config/config';
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

        microEvents.trigger('createNewMail');
    };

    /**
     * function that sets initial state of the store when need to forward mail
     */
    forwardMail = async () => {
        this._storage.set(
            this._storeNames.title, reducerLetters._storage.get(reducerLetters._storeNames.mail)
                .get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail)).title,
        );
        this._storage.set(
            this._storeNames.text, reducerLetters._storage.get(reducerLetters._storeNames.mail)
                .get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail)).text,
        );
        this._storage.set(this._storeNames.recipients, '');

        microEvents.trigger('createNewMail');
    };

    /**
     * function that sets initial state of the store when need to reply to mail
     */
    replyToMail = async () => {
        this._storage.set(
            this._storeNames.title, 'RE: ' + reducerLetters._storage.get(reducerLetters._storeNames.mail)
                .get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail)).title,
        );
        this._storage.set(
            this._storeNames.text, '',
        );

        this._storage.set(
            this._storeNames.recipients, reducerLetters._storage
                .get(reducerLetters._storeNames.mail).get(reducerLetters._storage
                    .get(reducerLetters._storeNames.currentMail))
                .from_user_id.email,
        );

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
            microEvents.trigger('mailSent');
        });
    };
}

export const reducerNewMail = new NewMailStore();
