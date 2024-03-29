import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from '@components/account-profile/account-profile.hbs';
import '@components/account-profile/account-profile.scss';

import {Component} from '@components/component';
import {Validation} from '@utils/validation';
import {dispatcher} from '@utils/dispatcher';
import {actionPostProfile, actionPutAvatar} from '@actions/user';
import {reducerUser} from '@stores/userStore';
import {responseStatuses} from '@config/config';
import {microEvents} from '@utils/microevents';
import {showNotification} from '@components/notification/notification';

export interface AccountProfile {
    state: {
        element: Element,
        firstName: string,
        lastName: string,
        login: string,
        avatar: any,
        forms: any,
        button: any,
    },
}

/**
 * class implementing component account-profile
 */
export class AccountProfile extends Component {
    #validator;

    /**
     * constructor
     * @param context - contains parent element
     * @param state - initialize start state for current object
     */
    constructor(context: componentContext, state: any) {
        super(context);
        this.state = state;

        this.#validator = new Validation();

        this.subscribeProfileStatus = this.subscribeProfileStatus.bind(this);
        microEvents.bind('fromProfile', this.subscribeProfileStatus);

        this.subscribeAvatarStatus = this.subscribeAvatarStatus.bind(this);
        microEvents.bind('fromAvatar', this.subscribeAvatarStatus);
    }

    /**
     * promise handle button submit
     * @param  e - event click on button submit
     */
    onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        const data = document.getElementById('account-profile__form') as HTMLElement;

        const firstName = data.querySelector('input[name=first-name]') as HTMLInputElement;
        const lastName = data.querySelector('input[name=last-name]') as HTMLInputElement;

        const user = {} as user;
        user.firstName = firstName.value;
        user.lastName = lastName.value;

        if ((this.#validator.validateText(user.firstName).status) &&
            (this.#validator.validateText(user.lastName).status)) {
            await dispatcher.dispatch(actionPostProfile(user));
        }
    };

    onClickAvatar = (e: MouseEvent) => {
        e.preventDefault();
        const input = document.getElementById('avatar-picker')!;
        input.click();
    };

    onLoadAvatar = (e: any) => {
        e.preventDefault();
        const avatarForm = document.getElementById('account-profile__avatar__form') as HTMLFormElement;

        const formData = new FormData(avatarForm);

        dispatcher.dispatch(actionPutAvatar(formData));
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const avatar = document.querySelector('.account-sidebar__avatar-img') as HTMLImageElement;
            avatar.src = reader.result as string;
        });


        const blobUrl = formData.get('avatar') as Blob;
        reader.readAsDataURL(blobUrl);
    };


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('account-profile__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('focusout', this.#validator.focusValidator);


        const avatar = document.getElementById('account-sidebar__avatar');
        avatar?.addEventListener('click', this.onClickAvatar);

        const avatarForm = document.getElementById('account-profile__avatar__form');
        avatarForm?.addEventListener('change', this.onLoadAvatar);

        microEvents.bind('profileChanged', this.rerenderCreds);
    };

    /**
     * method unregister events button submit/input focus/redirect link
     */
    unregisterEvents = () => {
        const form = document.getElementById('account-profile__form');
        form?.removeEventListener('submit', this.onSubmitHandler);
        form?.removeEventListener('focusout', this.#validator.focusValidator);

        const avatar = document.getElementById('account-sidebar__avatar');
        avatar?.removeEventListener('click', this.onClickAvatar);

        const avatarForm = document.getElementById('account-profile__avatar__form');
        avatarForm?.removeEventListener('change', this.onLoadAvatar);

        microEvents.unbind('profileChanged', this.rerenderCreds);
    };


    /**
     * method insert account-profile to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                login: this.state.login,
                avatar: this.state.avatar,
                forms: Form.renderTemplate(this.state.forms),
                button: Button.renderTemplate(this.state.button),
            },
        ));
        this.state.element = this.parent.getElementsByClassName('account-profile')[0];

        const data = document.getElementById('account-profile__form') as HTMLElement;

        const firstName = data.querySelector('input[name=first-name]') as HTMLInputElement;
        const lastName = data.querySelector('input[name=last-name]') as HTMLInputElement;

        firstName.value = reducerUser._storage.get('profile').firstName;
        lastName.value = reducerUser._storage.get('profile').lastName;

        this.registerEvents();
    }

    /**
     * method purge
     * account profile clearing
     * will purge all the content in account profile
     */
    purge() {
        this.unregisterEvents();
        this.state.element.remove();
    }

    /**
     * method subscribeProfileStatus
     * show notification when answer to change name received
     */
    subscribeProfileStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);
        switch (status) {
        case responseStatuses.OK:
            showNotification('Информация успешна изменена');
            break;
        default:
            showNotification(body);
        }
    }

    /**
     * rerenderCreds
     * rerender credentials data when profile changed
     */
    rerenderCreds = () => {
        const profile = reducerUser._storage.get(reducerUser._storeNames.profile);
        const avatar = document.querySelector('.account-sidebar__avatar-img') as HTMLImageElement;
        avatar.src = profile.avatar;
        const creds = document.querySelector('.account-profile__name') as HTMLDivElement;
        creds.ariaLabel = profile.firstName + ' ' + profile.lastName;
        creds.innerHTML = profile.firstName + ' ' + profile.lastName;
    };

    /**
     * method subscribeAvatarStatus
     * show notification when answer to change avatar received
     */
    subscribeAvatarStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);

        switch (status) {
        case responseStatuses.OK:
        case 500:
            showNotification('Аватар успешно изменён');
            break;
        default:
            if (body.message) {
                showNotification(body.message);
            } else {
                showNotification('что-то пошло не так');
            }
        }
    }
}
