const rootElement = document.getElementById('root');


function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}

function createInput(type, name, value, minlength, maxlength, required) {
    const input = document.createElement('input')
    input.type = type
    input.name = name
    input.value = value
    input.minLength = minlength
    input.maxLength = maxlength
    input.required = required

    return input
}

function createIcon(textContent, src, alt) {
    const icon = document.createElement('img');

    icon.textContent = textContent;
    icon.src = src;
    icon.alt = alt;

    return icon;
}

function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    return paragraph;
}

function createLink(text, href) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;

    return link;
}

function formAddParam(form, action, method, enctype) {
    form.action = action;
    form.method = method;
    form.enctype = enctype;
}

// function createWrapperInput(){
//     const wrapper = document.createElement('div');
//     wrapper.classList.add("login", "border");
// }

function createSpan(text) {
    const span = document.createElement('span')
    span.textContent = text

    return span
}

function createButton(type, value) {
    const button = document.createElement('input')
    button.type = type
    button.value = value

    return button
}

function createLabel(text) {
    const label = document.createElement('label')
    label.textContent = text

    return label
}

function renderLogin(parent) {
    const container = document.createElement('div');
    container.classList.add("container");
    const mainSide = document.createElement('div');
    mainSide.classList.add("main-side");
    container.appendChild(mainSide)


    const login = document.createElement('div');
    login.classList.add("login", "border");


    const wrapperIcon = document.createElement('div');
    wrapperIcon.classList.add("icon")
    const icon = createIcon("MailBox", "img/mail.svg", "");
    icon.classList.add("MenuButtonIcon");
    const iconParagraph = createParagraph("MailBox")
    iconParagraph.classList.add("font-title-1")
    wrapperIcon.appendChild(icon)
    wrapperIcon.appendChild(iconParagraph)


    const titleAuth = createParagraph("Авторизация")
    titleAuth.classList.add("font-title-1", "login-title")


    const form = document.createElement('form')
    formAddParam(form, "#", "get", "multipart/form-data")

    const wrapperInputEmail = document.createElement('div')
    wrapperInputEmail.classList.add("wrapper-input")

    const emailInput = createInput('email', 'email', "", 3, 20, true)
    emailInput.classList.add("wrapper-input-input", "wrapper-input-color")

    const emailSpan = createSpan("Email")
    emailSpan.classList.add("font-normal-1", "span-wrapper", "wrapper-input-span")

    wrapperInputEmail.appendChild(emailInput)
    wrapperInputEmail.appendChild(emailSpan)


    const wrapperInputPassword = document.createElement('div');
    wrapperInputPassword.classList.add("wrapper-input")

    const passInput = createInput('password', 'password', "", 3, 20, true);
    passInput.classList.add("wrapper-input-input", "wrapper-input-color");

    const passSpan = createSpan("Пароль")
    passSpan.classList.add("font-normal-1", "span-wrapper", "wrapper-input-span")

    wrapperInputPassword.appendChild(passInput);
    wrapperInputPassword.appendChild(passSpan);


    const checkBox = document.createElement('div');
    checkBox.classList.add("remember")

    const checkBoxLabel = createLabel()

    const checkBoxInput = createInput("checkbox", "remember", "yes")
    const checkBoxSpan = createSpan("Запомнить")
    checkBoxSpan.classList.add("font-normal-1")

    checkBoxLabel.appendChild(checkBoxInput)
    checkBoxLabel.appendChild(checkBoxSpan)

    const checkBoxLink = createLink("Забыли пароль?", "#")
    checkBoxLink.classList.add("font-normal-1", "signup-link")

    checkBox.appendChild(checkBoxLabel)
    checkBox.appendChild(checkBoxLink)


    const wrapperInputButton = document.createElement('div');
    wrapperInputButton.classList.add("wrapper-input")

    const submitBtn = createButton('submit', "Войти")
    submitBtn.classList.add("button-long", "b-color", "font-normal-1")

    wrapperInputButton.appendChild(submitBtn);


    form.appendChild(wrapperInputEmail)
    form.appendChild(wrapperInputPassword)
    form.appendChild(checkBox)
    form.appendChild(wrapperInputButton)


    const wrapperInputBottom = document.createElement('div');
    wrapperInputBottom.classList.add("wrapper-input-bottom");

    const subtext = createParagraph("Мы еще не знакомы?");
    subtext.classList.add("font-normal-1");

    const signUpLink = createLink("Регистрация", "#",);
    signUpLink.classList.add("font-normal-1", "signup-link");

    wrapperInputBottom.appendChild(subtext);
    wrapperInputBottom.appendChild(signUpLink);


    login.appendChild(wrapperIcon)
    login.appendChild(titleAuth)
    login.appendChild(form)
    login.appendChild(wrapperInputBottom)
    mainSide.appendChild(login)

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //
    //     const email = emailInput.value.trim();
    //     const password = passwordInput.value;
    //
    //     ajax(
    //         'POST',
    //         '/login',
    //         {email, password},
    //         status => {
    //             if (status === 200) {
    //                 return;
    //             }
    //
    //             alert('Неверный емейл или пароль');
    //         }
    //     );
    //
    // });

    parent.appendChild(container);
}

renderLogin(rootElement);
