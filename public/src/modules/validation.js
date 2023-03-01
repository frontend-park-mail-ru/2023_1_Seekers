const emailRegex = /@/;

export default class Validation
{
    putErrorMessage = (target, id, text) => {
        const err = document.createElement('div');
        err.textContent = text;
        err.id = id;
        err.classList.add("error-input", "font-caption-0");
        target.parentElement.insertAdjacentElement('beforeend', err)
    }

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

    validateRegFields = (email, password, anotherPassword = password) => {
        return ((password === anotherPassword) && (this.validateEmail(email).status) &&
            (this.validatePassword(password).status));
    };
}
