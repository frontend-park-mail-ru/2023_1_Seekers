const emailRegex = /@/;

export default class Validation {
    putErrorMessage = (target, id, text) => {
        const err = document.createElement('div');
        err.textContent = text;
        err.id = id;
        err.classList.add('error-input', 'font-caption-0');
        target.parentElement.insertAdjacentElement('beforeend', err);
    };

    validateEmail = (data) => {
        if (!(emailRegex).test(data)) {
            return {status: false, message: 'Неверный логин'};
        }
        return {status: true, message: ''};
    };

    validatePassword = (data) => {
        if (data.length < 5) {
            return {status: false, message: 'Пароль слишком короткий'};
        }
        return {status: true, message: ''};
    };

    validateRePassword = (password, anotherPassword) => {
        if (!(password === anotherPassword)) {
            return {status: false, message: 'Пароли не совпадают'};
        }
        return {status: true, message: ''};
    };

    validateText = (data) => {
        if (data.length < 1) {
            return {status: false, message: 'Заполните поле'};
        }
        return {status: true, message: ''};
    };

    validateRegFields = (email, password, anotherPassword = password, name = ' ', surname = ' ') => {
        return ((password === anotherPassword) && (this.validateEmail(email).status) &&
            (this.validatePassword(password).status) && (this.validateText(name).status) && (this.validateText(surname).status));
    };

    focusValidator = async (e) => {
        let check;
        switch (e.target.name) {
        case 'first-name':
        case 'last-name':
            check = this.validateText(e.target.value);
            break;
        case 'email':
            check = this.validateEmail(e.target.value);
            break;
        case 'password':
            check = this.validatePassword(e.target.value);
            break;
        case 'repeat_password':
            check = this.validateRePassword(document.getElementById('password').value, e.target.value);
            break;
        default:
            return;
        }
        if (!check.status) {
            if (document.getElementById(e.target.name + 'Error') === null) {
                this.putErrorMessage(document.getElementById(e.target.name), e.target.name + 'Error', check.message);
            }
        } else if (document.getElementById(e.target.name + 'Error') !== null) {
            document.getElementById(e.target.name + 'Error').remove();
        }
    };
}
