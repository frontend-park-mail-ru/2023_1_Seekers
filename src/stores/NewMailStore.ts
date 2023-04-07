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
    };

    constructor() {
        super();
        this._storage.set(this._storeNames.title, '');
        this._storage.set(this._storeNames.text, '');
        this._storage.set(this._storeNames.recipients, '');
    }

    createNewMail = async () => {
        this._storage.set(this._storeNames.title, '');
        this._storage.set(this._storeNames.text, '');
        this._storage.set(this._storeNames.recipients, '');

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
        const responsePromise = Connector.makePostRequest(config.api.sendMail, mail);
        const [status, body] = await responsePromise;
        console.log(status)
        console.log(body)
        if (status === responseStatuses.OK) {
            microEvents.trigger('mailSent');
        }
    }
}

export const reducerNewMail = new NewMailStore();
