import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerUser} from "@stores/userStore";
import {actionChangeLetterStateToRead} from "@actions/letters";
import {reducerLetters} from "@stores/LettersStore";


class NewMailStore extends BaseStore {

    _storeNames = {
        title: 'title',
        text: 'text',
        recipients: 'recipients',
        answerStatus: 'answerStatus',
        answerBody: 'answerBody',
    };

    constructor() {
        super();
    }

    createNewMail = async () => {
        this._storage.set(this._storeNames.title, '');
        this._storage.set(this._storeNames.text, '');
        this._storage.set(this._storeNames.recipients, '');
        this._storage.set(this._storeNames.answerBody, '');
        this._storage.set(this._storeNames.answerStatus, '');

        microEvents.trigger('createNewMail');
    }

    forwardMail = async () => {
        this._storage.set(
            this._storeNames.title, reducerLetters._storage.get(reducerLetters._storeNames.mail).get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail)).title
        );
        this._storage.set(
            this._storeNames.text, reducerLetters._storage.get(reducerLetters._storeNames.mail).get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail)).text
        );
        this._storage.set(this._storeNames.recipients, '');

        microEvents.trigger('createNewMail');
    }

    replyToMail = async () => {
        this._storage.set(
            this._storeNames.title, 'RE: ' + reducerLetters._storage.get(reducerLetters._storeNames.mail).get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail)).title
        );
        this._storage.set(
            this._storeNames.text, ''
        );

        this._storage.set(
            this._storeNames.recipients, reducerLetters._storage
                .get(reducerLetters._storeNames.mail).get(reducerLetters._storage.get(reducerLetters._storeNames.currentMail))
                .from_user_id.email
        );

        microEvents.trigger('createNewMail');
    }

    sendMail = async (mail: MailToSend) => {
        console.log('sendMail');
        Connector.makePostRequest(config.api.sendMail, mail).then(([status, body]) => {

            this._storage.set(this._storeNames.answerBody, body);
            this._storage.set(this._storeNames.answerStatus, status);

            console.log(status)
            console.log(body)
            microEvents.trigger('mailSent');
        });
    }
}

export const reducerNewMail = new NewMailStore();
