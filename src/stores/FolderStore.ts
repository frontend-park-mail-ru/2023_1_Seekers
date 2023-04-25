import {Connector} from '@utils/ajax';
import {config, responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import BaseStore from '@stores/BaseStore';
import {reducerLetters} from "@stores/LettersStore";
import {loginPage} from "@views/login-page/login-page";

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
        Connector.makePostRequest(config.api.createFolder, {name: name}).then(([status, body]) => {
            if (status === responseStatuses.OK) {
                this.getMenu();
            }
            this._storage.set(this._storeNames.answerBody, body);
            this._storage.set(this._storeNames.answerStatus, status);
            microEvents.trigger('folderRequestSent');
        });
    };

    /**
     * function that makes request to get menu
     */
    getMenu = async () => {
        if (!this._storage.get(this._storeNames.menu)) {
            this._storage.set(this._storeNames.menu, []);
        }
        const responsePromise = Connector.makeGetRequest(config.api.getMenu + '?custom=true');
        const [status, response] = await responsePromise;
        if (status === responseStatuses.OK) {
            (response.folders as Folder[]).forEach((folder) => {
                folder.folder_slug = '/to_' + folder.folder_slug;
            });
            this._storage.set(this._storeNames.menu, response.folders);
            console.log(this._storage.get(this._storeNames.menu));
            microEvents.trigger('menuChanged');
        }
    };

    /**
     * function that transmits mail to another folder
     */
    transmitToFolder = async (folder: string) => {
        folder = folder.replace('to_', '');
        const responsePromise = Connector.makePutRequest({
            url: config.api.moveToFolder +
                reducerLetters.getCurrentContextMail().message_id.toString() +
                config.api.moveToFolder_post + folder,
            data: {},
        });
        const [status, response] = await responsePromise;
        this._storage.set(this._storeNames.answerBody, response);
        this._storage.set(this._storeNames.answerStatus, status);
        console.log(response);
        console.log(status);
        // if (status === responseStatuses.OK) {
            // this._storage.set(this._storeNames.menu, response.folders);
            // reducerLetters.getCurrentLettersArray().forEach((letter) => {
            //     if (letter.message_id === id) {
            //         reducerLetters.getCurrentLettersArray()
            //             .splice(reducerLetters.getCurrentLettersArray().indexOf(letter), 1);
            //     }
            // });
            microEvents.trigger('responseFromTransmitFolder');
            const mailHref = '/' + reducerLetters._storage.get(reducerLetters._storeNames.shownMail);
            console.log(mailHref);
            reducerLetters.getLetters(reducerLetters._storage.get(reducerLetters._storeNames.currentLetters));
            if (mailHref !== '/undefined') {
                reducerLetters.showMail(mailHref);
            }
        // }
    };
}

export const reducerFolder = new FolderStore();
