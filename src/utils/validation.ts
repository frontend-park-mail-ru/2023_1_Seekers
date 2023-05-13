/**
 * class implementing validation
 */
import {hrefRegExp, validatorRegExp} from "@config/regs";

export class Validation {
    /**
     * method insert error in HTML
     * @param target - place to insert
     * @param id - id of error element
     * @param text - message of error
     */
    putErrorMessage = (target: Element, id: string, text: string) => {
        const err = document.createElement('div');
        err.textContent = text;
        err.id = id;
        err.classList.add('error-input');
        target.parentElement?.insertAdjacentElement('beforeend', err);

        target.classList.add('input-form__error__border');
    };

    /**
     * method validate login
     * @param login
     * @return message for error and status
     */
    validateLogin = (login: string) => {
        if (login.length < 3) {
            return {status: false, message: 'Логин короче 3 символов'};
        }

        if (login.length > 30) {
            return {status: false, message: 'Логин длиннее 30 символов'};
        }

        if (validatorRegExp.emojis.test(login)) {
            return {status: false, message: 'Логин не может содержать эмодзи'};
        }

        const postAtDomain = '@mailbx.ru';
        if (!login.includes(postAtDomain)) {
            if (login.includes('@') || login.includes('.')) {
                return {status: false, message: 'Логин не может содержать @ или .'};
            }
        } else {
            const idx = login.indexOf(postAtDomain);
            if (idx + postAtDomain.length < login.length ||
                login.indexOf('@') < idx || login.indexOf('.') < idx) {
                return {status: false, message: 'Некорректный логин'};
            }
        }
        return {status: true, message: ''};
    };


    /**
     * method validate email
     * @param login
     * @return message for error and status
     */
    validateEmail = (email: string) => {
        if (email.length < 3) {
            return {status: false, message: 'Почта короче 3 символов'};
        }

        if (email.length > 30) {
            return {status: false, message: 'Почта длиннее 30 символов'};
        }

        if (validatorRegExp.emojis.test(email)) {
            return {status: false, message: 'Почта не может содержать эмодзи'};
        }

        const postAtDomain = '@mailbx.ru';
        if (!email.includes(postAtDomain)) {
            const emailRegex =
                new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
            const isValidEmail = emailRegex.test(email);
            if (!isValidEmail) {
                return {status: false, message: 'Невалидная почта'};
            }
        } else {
            const idx = email.indexOf(postAtDomain);
            if (idx + postAtDomain.length < email.length ||
                email.indexOf('@') < idx || email.indexOf('.') < idx) {
                return {status: false, message: 'Некорректный логин'};
            }
        }
        return {status: true, message: ''};
    };


    /**
     * method validate password
     * @param password - password string
     * @return message for error and status
     */
    validatePassword = (password: string) => {
        if (password.length < 5) {
            return {status: false, message: 'Пароль короче 5 символов'};
        }
        return {status: true, message: ''};
    };

    /**
     * method validate password and repeated password(check equal)
     * @param password - password string
     * @param anotherPassword - password string
     * @return message for error and status
     */
    validateRePassword = (password: string, anotherPassword: string) => {
        if (!(password === anotherPassword)) {
            return {status: false, message: 'Пароли не совпадают'};
        }
        return {status: true, message: ''};
    };

    /**
     * method validate text inputs(not empty)
     * @param data
     * @returns message for error and status
     */
    validateText = (data: string) => {
        if (data.length < 1) {
            return {status: false, message: 'Заполните поле'};
        }

        if (validatorRegExp.emojis.test(data)) {
            return {status: false, message: 'Поле не может содержать эмодзи'};
        }

        return {status: true, message: ''};
    };

    /**
     * general method calls validatePassword && validateLogin && validateText
     * @param login
     * @param password
     * @param anotherPassword
     * @param name
     * @param surname
     * @returns status
     */
    validateRegFields = (login: string, password: string, anotherPassword: string = password,
                         name = ' ', surname = ' ') => {
        return ((password === anotherPassword) && (this.validateLogin(login).status) &&
            (this.validatePassword(password).status) && (this.validateText(name).status) &&
            (this.validateText(surname).status));
    };

    /**
     * promise handle input real time validation
     * @param {object}  e - event focus on input
     */
    focusValidator = async (e: any) => {
        let check;
        switch (e.target?.name) {
            case 'first-name':
            case 'last-name':
                check = this.validateText(e.target.value);
                break;
            case 'new-mail-recipients':
            case 'login':
                check = this.validateLogin(e.target.value);
                break;
            case 'password_old':
            case 'password':
                check = this.validatePassword(e.target.value);
                break;
            case 'repeat_password':
                check = this.validateRePassword((document.getElementById('password') as any).value,
                    e.target.value);
                break;
            default:
                return;
        }
        if (!check.status) {
            if (document.getElementById(e.target.name + 'Error') !== null) {
                document.getElementById(e.target.name + 'Error')?.remove();
                document.getElementById(e.target.name)?.classList
                    .remove('error-border', 'input-form__error__border');
            }
            this.putErrorMessage((document.getElementById(e.target.name) as any),
                e.target.name + 'Error', check.message);
        } else if (document.getElementById(e.target.name + 'Error') !== null) {
            document.getElementById(e.target.name + 'Error')?.remove();
            document.getElementById(e.target.name)?.classList
                .remove('error-border', 'input-form__error__border');
        }
    };
}
