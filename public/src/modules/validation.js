/**
 * class implementing validation
 */
export class Validation {
    /**
     * method insert error in HTML
     * @param {Element} target - place to insert
     * @param {String} id - id of error element
     * @param {String} text - message of error
     */
    putErrorMessage = (target, id, text) => {
        const err = document.createElement('div');
        err.textContent = text;
        err.id = id;
        err.classList.add('error-input', 'font-caption-0');
        target.parentElement.insertAdjacentElement('beforeend', err);

        target.classList.add('error-border');
    };

    /**
     * method validate login
     * @param {String} login
     * @return {{message: string, status: boolean}} - message for error and status
     */
    validateLogin = (login) => {
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
     * @param {String} password - password string
     * @return {Object} {{message: string, status: boolean}} - message for error and status
     */
    validatePassword = (password) => {
        if (password.length < 5) {
            return {status: false, message: 'Пароль слишком короткий'};
        }
        return {status: true, message: ''};
    };

    /**
     * method validate password and repeated password(check equal)
     * @param {String} password - password string
     * @param {String} anotherPassword - password string
     * @return {Object} {{message: string, status: boolean}} - message for error and status
     */
    validateRePassword = (password, anotherPassword) => {
        if (!(password === anotherPassword)) {
            return {status: false, message: 'Пароли не совпадают'};
        }
        return {status: true, message: ''};
    };

    /**
     * method validate text inputs(not empty)
     * @param {String} data
     * @return {Object} {{message: string, status: boolean}} - message for error and status
     */
    validateText = (data) => {
        if (data.length < 1) {
            return {status: false, message: 'Заполните поле'};
        }
        return {status: true, message: ''};
    };

    /**
     * general method calls validatePassword && validateLogin && validateText
     * @param {String} login
     * @param {String} password
     * @param {String} anotherPassword
     * @param {String} name
     * @param {String} surname
     * @return {false|boolean|*} - status
     */
    validateRegFields = (login, password, anotherPassword = password, name = ' ', surname = ' ') => {
        return ((password === anotherPassword) && (this.validateLogin(login).status) &&
            (this.validatePassword(password).status) && (this.validateText(name).status) &&
            (this.validateText(surname).status));
    };

    /**
     * promise handle input real time validation
     * @param {object}  e - event focus on input
     */
    focusValidator = async (e) => {
        let check;
        switch (e.target.name) {
            case 'first-name':
            case 'last-name':
                check = this.validateText(e.target.value);
                break;
            case 'login':
                check = this.validateLogin(e.target.value);
                break;
            case 'password':
                check = this.validatePassword(e.target.value);
                break;
            case 'repeat_password':
                check = this.validateRePassword(document.getElementById('password').value,
                    e.target.value);
                break;
            default:
                return;
        }
        if (!check.status) {
            if (document.getElementById(e.target.name + 'Error') === null) {
                this.putErrorMessage(document.getElementById(e.target.name),
                    e.target.name + 'Error', check.message);
            }
        } else if (document.getElementById(e.target.name + 'Error') !== null) {
            document.getElementById(e.target.name + 'Error').remove();
            document.getElementById(e.target.name).classList.remove('error-border');
        }
    };
}
