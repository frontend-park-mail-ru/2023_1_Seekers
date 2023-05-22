import {Component} from '@components/component';
import {ProfileButton} from '@uikits/profile-button/profile-button';

import template from '@components/navbar/navbar.hbs';

import '@components/navbar/navbar.scss';
import {AccountSidebar} from '@components/account-sidebar/account-sidebar';
import {reducerUser} from '@stores/userStore';
import {microEvents} from '@utils/microevents';
import {config} from "@config/config";
import {dispatcher} from "@utils/dispatcher";
import {actionCreateNewMail} from "@actions/newMail";
import {FolderName} from "@uikits/folder-name/folder-name";
import {reducerFolder} from "@stores/FolderStore";
import {NavbarUserInfo} from "@uikits/navbar-user-info/navbar-user-info";
import {reducerLetters} from "@stores/LettersStore";
import {actionCtxFolder} from "@actions/folders";
import {ContextMenu} from "@components/context-menu/context-menu";

export interface Navbar {
    state: {
        element: Element,
        profileButton: Element,
        sidebar: AccountSidebar,
        userInfo: Element,
    },
}

/**
 * class implementing component Navbar
 */
export class Navbar extends Component {
    /**
     * Constructor that creates a component class Navbar
     * @param context - HTML element into which
     * will be rendered current element
     */
    constructor(context: componentContext) {
        super(context);
    }

    /**
     * method handle click on navbar
     * @param e - event that goes from one of children of current element
     */
    eventCatcher = (e: Event) => {
        e.preventDefault();
        this.state.sidebar.render();
    };

    onMenuButtonClick = (e: Event) => {
        e.preventDefault();
        document.getElementsByClassName('letterList')[0].classList.add('letterList__hide');
        document.getElementsByClassName('menu')[0].classList.add('menu__show');

        document.getElementById('navbar__menu-button')!.classList.add('navbar__menu-button__hide');
        document.getElementById('navbar__send-mail')!.classList.add('navbar__send-mail__hide');

        document.getElementById('navbar__back-right-mail')!.classList.add('navbar__back-right-mail__show');
        document.getElementById('navbar__email')!.classList.add('navbar__email__show');

        document.getElementById('footer-button')!.classList.add('footer-button__show');

        document.getElementById('navbar__frame__center')!.classList.add('navbar__frame__center__hide');

        document.getElementById('user-info')!.classList.add('user-info__show');
    }

    onBackRightClick = (e: Event) => {
        e.preventDefault();
        document.getElementsByClassName('letterList')[0]?.classList.remove('letterList__hide');
        document.getElementsByClassName('menu')[0]?.classList.remove('menu__show');

        document.getElementById('navbar__menu-button')?.classList.remove('navbar__menu-button__hide');
        document.getElementById('navbar__send-mail')?.classList.remove('navbar__send-mail__hide');

        document.getElementById('navbar__back-right-mail')?.classList.remove('navbar__back-right-mail__show');
        document.getElementById('navbar__email')?.classList.remove('navbar__email__show');

        document.getElementById('footer-button')?.classList.remove('footer-button__show');

        document.getElementById('navbar__frame__center')?.classList.remove('navbar__frame__center__hide');

        document.getElementById('user-info')?.classList.remove('user-info__show');
    }

    onBackLeftClick = (e: Event) => {
        e.preventDefault();
        document.getElementsByClassName('letterList')[0]?.classList.remove('letterList__hide');
        document.getElementsByClassName('mail')[0]?.classList.remove('mail__show');

        document.getElementById('navbar__menu-button')?.classList.remove('navbar__menu-button__hide');
        document.getElementById('navbar__send-mail')?.classList.remove('navbar__send-mail__hide');

        document.getElementById('navbar__back-left-mail')?.classList.remove('navbar__back-left-mail__show');
    }

    onCtxClicked = (e: Event) => {
        e.preventDefault();

        const folder = Object.values(config.buttons.commonMenuButtons).find((button) => {
            return button.folder_slug === reducerLetters.getCurrentLettersName();
        });
        if (folder || document.getElementsByClassName('letterList__hide')[0]) {
            return;
        }

        const advFolder = (reducerFolder.getAdvancedMenu() as Folder[]).find((button) => {
            return button.folder_slug === reducerLetters.getCurrentLettersName();
        });

        if (!advFolder) {
            return;
        }

        const me = e as MouseEvent;

        dispatcher.dispatch(actionCtxFolder(reducerLetters.getCurrentLettersName()));
        const ctxMenu = new ContextMenu({parent: document.getElementById('root')!});
        ctxMenu.render(me.clientX, me.clientY);
        e.stopPropagation();
    }

    onSendMailClick = (e: Event) => {
        e.preventDefault();
        const {currentTarget} = e;
        if (currentTarget instanceof HTMLElement) {
            if (currentTarget.dataset.section) {
                dispatcher.dispatch(actionCreateNewMail());
            }
        }
    }

    /**
     * method registerEventListener
     * unregister listeners for each button in letter-list
     */
    registerEventListener() {
        microEvents.bind('profileChanged', this.rerenderProfileButton);
        microEvents.bind('letterListChanged', this.rerenderFolderName);

        microEvents.bind('renderAccountPage', this.rerenderAccountName);
        microEvents.bind('renderProfilePage', this.rerenderAccountName);
        microEvents.bind('renderSecurityPage', this.rerenderAccountName);

        microEvents.bind('responseFromTransmitFolder', this.clickBackLeft);
        microEvents.bind('folderRenamed', this.rerenderFolderName);

        this.state.profileButton.addEventListener('click', this.eventCatcher);

        document.getElementById('navbar__menu-button')!.addEventListener('click', this.onMenuButtonClick);
        document.getElementById('navbar__back-right-mail')!.addEventListener('click', this.onBackRightClick);
        document.getElementById('navbar__back-left-mail')!.addEventListener('click', this.onBackLeftClick);
        document.getElementById('navbar__send-mail')!.addEventListener('click', this.onSendMailClick);

        const folder = Object.values(config.buttons.commonMenuButtons).find((button) => {
            return button.folder_slug === reducerLetters.getCurrentLettersName();
        });
        if (folder) {
            document.getElementById('navbar__frame__center')!.addEventListener('click', this.onCtxClicked);
        }
    }

    /**
     * method unregisterEventListener unregister events click on navbar
     */
    unregisterEventListener() {
        microEvents.unbind('folderRenamed', this.rerenderFolderName);
        microEvents.unbind('profileChanged', this.rerenderProfileButton);
        microEvents.unbind('letterListChanged', this.rerenderFolderName);

        microEvents.unbind('renderAccountPage', this.rerenderAccountName);
        microEvents.unbind('renderProfilePage', this.rerenderAccountName);
        microEvents.unbind('renderSecurityPage', this.rerenderAccountName);

        microEvents.unbind('responseFromTransmitFolder', this.clickBackLeft);

        this.state.profileButton.removeEventListener('click', this.eventCatcher);

        document.getElementById('navbar__menu-button')!.removeEventListener('click', this.onMenuButtonClick);
        document.getElementById('navbar__back-right-mail')!.removeEventListener('click', this.onBackRightClick);
        document.getElementById('navbar__back-left-mail')!.removeEventListener('click', this.onBackLeftClick);
        document.getElementById('navbar__send-mail')!.removeEventListener('click', this.onSendMailClick);

        document.getElementById('navbar__frame__center')!.removeEventListener('click', this.onCtxClicked);

    }

    /**
     * method insert form to HTML
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', template(
            {
                menu: config.navbar.menu,
                send: config.navbar.send,
                userInfo: NavbarUserInfo.renderTemplate(
                    reducerUser._storage.get(reducerUser._storeNames.profile)),
                backRight: config.navbar.backRight,
                backLeft: config.navbar.backLeft,
                profileButton: ProfileButton.renderTemplate(
                    reducerUser._storage.get(reducerUser._storeNames.profile)),
                folderName: FolderName.renderTemplate({
                    text: 'Входящие',
                }),
            },
        ));

        this.state.element = this.parent.getElementsByClassName('navbar')[0];
        this.state.profileButton = this.state.element.getElementsByClassName('profile-button')[0];
        this.state.userInfo = this.state.element.getElementsByClassName('user-info')[0];


        this.state.sidebar = new AccountSidebar({
            parent: this.state.element as HTMLElement,
        });

        this.registerEventListener();
    }

    rerenderProfileButton = () => {
        this.state.profileButton.removeEventListener('click', this.eventCatcher);
        this.state.profileButton.remove();
        this.state.element.getElementsByClassName('navbar__frame-right')[0].insertAdjacentHTML(
            'afterbegin',
            ProfileButton.renderTemplate(reducerUser._storage.get(reducerUser._storeNames.profile)),
        );
        this.state.profileButton = this.state.element.getElementsByClassName('profile-button')[0];
        this.state.profileButton.addEventListener('click', this.eventCatcher);

        this.state.userInfo.remove();
        document.getElementById('navbar__email')!.insertAdjacentHTML(
            'afterbegin',
            NavbarUserInfo.renderTemplate(reducerUser._storage.get(reducerUser._storeNames.profile)),
        );
        this.state.userInfo = document.getElementsByClassName('user-info')[0];

    };

    rerenderFolderName = () => {
        document.getElementById('navbar__folderName')!.remove();
        this.state.element.getElementsByClassName('navbar__frame__center')[0].insertAdjacentHTML(
            'afterbegin',
            FolderName.renderTemplate({
                text: reducerFolder.getCurrentFolderName(),
            }),
        );
    };

    clickBackLeft = () => {
        document.getElementById('navbar__back-left-mail')?.click();
    }

    rerenderAccountName = () => {
        document.getElementById('navbar__folderName')!.remove();

        this.state.element.getElementsByClassName('navbar__frame__center')[0].insertAdjacentHTML(
            'afterbegin',
            FolderName.renderTemplate({
                text: reducerLetters.getCurrentAccountsName(),
            }),
        );
        document.getElementById('navbar__frame-left')!.classList.add('navbar__frame-left__hide');
        document.getElementById('navbar__frame-right')!.classList.add('navbar__frame-right__hide');
    };

    /**
     * method navbar page clearing
     */
    purge() {
        this.unregisterEventListener();
        this.state.sidebar.purge();
        this.state.element.remove();
    }
}

