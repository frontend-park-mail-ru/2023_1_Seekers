import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';

/**
 * class that implements all possible actions with sent mail
 */
class FolderStore extends BaseStore {
    _storeNames = {
        answerStatus: 'answerStatus',
        answerBody: 'answerBody',
        menu: 'menu',
    };

    /**
     * constructor that creates the store
     */
    constructor() {
        super();
    }

    createNewFolder = async () => {
        microEvents.trigger('createNewFolder');
    };

    /**
     * function that make send mail request to backend
     * @param name - mail to send
     */
    sendFolderToCreate = async (name: string) => {
        // Connector.makePostRequest(config.api.sendMail, {folderName: name}).then(([status, body]) => {
            this._storage.set(this._storeNames.answerBody, 200);
            this._storage.set(this._storeNames.answerStatus, 200);
            microEvents.trigger('folderRequestSent');
        // });
    };

    /**
     * function that makes request to get menu
     */
    getMenu = async () => {
        const responsePromise = Connector.makeGetRequest(config.api.getMenu);
        const [status, response] = await responsePromise;
        if (status === responseStatuses.OK) {
            this._storage.set(this._storeNames.menu, response.folders);
            microEvents.trigger('menuChanged');
        }
    };
}

export const reducerFolder = new FolderStore();
