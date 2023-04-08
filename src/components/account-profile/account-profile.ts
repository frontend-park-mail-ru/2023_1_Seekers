import {Form} from '@uikits/form/form';
import {Button} from '@uikits/button/button';

import template from "@components/account-profile/account-profile.hbs";
import "@components/account-profile/account-profile.scss"

import {Component} from "@components/component";
import {Validation} from "@utils/validation";
import {dispatcher} from "@utils/dispatcher";
import {actionPostProfile, actionPutAvatar} from "@actions/user";
import {reducerUser} from "@stores/userStore";
import {config, responseStatuses} from "@config/config";
import {microEvents} from "@utils/microevents";

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

        const first_name = data.querySelector('input[name=first-name]') as HTMLInputElement;
        const last_name = data.querySelector('input[name=last-name]') as HTMLInputElement;

        const user = {} as user;
        user.firstName = first_name.value;
        user.lastName = last_name.value;

        if ((this.#validator.validateText(user.firstName).status)
            && (this.#validator.validateText(user.lastName).status)) {
            await dispatcher.dispatch(actionPostProfile(user));
        }
    };

    onClickAvatar = (e: MouseEvent) => {
        e.preventDefault();
        const input = document.getElementById('avatar-picker')!;
        input.click();
    }

    onLoadAvatar = (e: any) => {
        e.preventDefault();
        const avatar_form = document.getElementById('account-profile__avatar__form') as  HTMLFormElement;
        //const avatar2 = avatar_form.querySelector('input[name=avatar]') as HTMLInputElement;
        //console.log(avatar2.value)

        const formData = new FormData(avatar_form);

        dispatcher.dispatch(actionPutAvatar(formData));
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const avatar = document.querySelector('.account-sidebar__avatar-img') as HTMLImageElement;
            avatar.src = reader.result as string;
        });


        const blobUrl = formData.get('avatar') as Blob;
        reader.readAsDataURL(blobUrl);
    }


    /**
     * method register events button submit/input focus/redirect link
     */
    registerEvents = () => {
        const form = document.getElementById('account-profile__form');

        form?.addEventListener('submit', this.onSubmitHandler);
        form?.addEventListener('focusout', this.#validator.focusValidator);


        const avatar = document.getElementById('account-sidebar__avatar');
        avatar?.addEventListener('click', this.onClickAvatar);

        const avatar_form = document.getElementById('account-profile__avatar__form');
        avatar_form?.addEventListener('change', this.onLoadAvatar);
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

        const avatar_form = document.getElementById('account-profile__avatar__form');
        avatar_form?.removeEventListener('change', this.onLoadAvatar);
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
            }
        ));
        this.state.element = this.parent.getElementsByClassName('account-profile')[0];

        const data = document.getElementById('account-profile__form') as HTMLElement;

        const first_name = data.querySelector('input[name=first-name]') as HTMLInputElement;
        const last_name = data.querySelector('input[name=last-name]') as HTMLInputElement;

        first_name.value = reducerUser._storage.get('profile').firstName;
        last_name.value = reducerUser._storage.get('profile').lastName;

        this.registerEvents();
    }

    purge() {
        this.unregisterEvents();
        this.state.element.remove();
    }

    subscribeProfileStatus() {
        const status = reducerUser._storage.get(reducerUser._storeNames.status);
        const body = reducerUser._storage.get(reducerUser._storeNames.body);
        console.log(status, body)
        switch (status) {
            case responseStatuses.OK:

                break;
            default:
                break;
        }
    }

    subscribeAvatarStatus() {
        console.log('subscribeAvatarStatus')
    }
}
