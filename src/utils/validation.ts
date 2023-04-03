/**
 * class implementing validation
 */
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
        const postAtDomain = '@mailbox.ru';
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
     * @return message for error and status
     */
    validateText = (data: string) => {
        if (data.length < 1) {
            return {status: false, message: 'Заполните поле'};
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
     * @return status
     */
    validateRegFields = (login: string, password: string, anotherPassword: string = password, name: string = ' ', surname: string = ' ') => {
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
            case 'login':
                check = this.validateLogin(e.target.value);
                break;
            case 'password_old':
            case 'password':
                check = this.validatePassword(e.target.value);
                break;
            case 'repeat_password':
                check = this.validateRePassword((document.getElementById('password') as any ).value,
                    e.target.value);
                break;
            default:
                return;
        }
        if (!check.status) {
            if (document.getElementById(e.target.name + 'Error') === null) {
                this.putErrorMessage((document.getElementById(e.target.name) as any),
                    e.target.name + 'Error', check.message);
            }
        } else if (document.getElementById(e.target.name + 'Error') !== null) {
            document.getElementById(e.target.name + 'Error')?.remove();
            document.getElementById(e.target.name)?.classList.remove('error-border', 'input-form__error__border');
        }
    };
}
