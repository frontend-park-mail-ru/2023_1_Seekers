function renderSignUp(parent) {
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


    const titleAuth = createParagraph("Создание почтового ящика")
    titleAuth.classList.add("font-title-1", "login-title")


    const form = document.createElement('form')
    formAddParam(form, "#", "get", "multipart/form-data")


    const wrapperInputName = document.createElement('div');
    wrapperInputName.classList.add("wrapper-input")

    const nameInput = createInput('text', 'first-name', "", 3, 20, true);
    nameInput.classList.add("wrapper-input-input", "wrapper-input-color");

    const nameSpan = createSpan("Имя")
    nameSpan.classList.add("font-normal-1", "span-wrapper", "wrapper-input-span")

    wrapperInputName.appendChild(nameInput);
    wrapperInputName.appendChild(nameSpan);


    const wrapperInputSurname = document.createElement('div');
    wrapperInputSurname.classList.add("wrapper-input")

    const surnameInput = createInput('text', 'last-name', "", 3, 20, true);
    surnameInput.classList.add("wrapper-input-input", "wrapper-input-color");

    const surnameSpan = createSpan("Фамилия")
    surnameSpan.classList.add("font-normal-1", "span-wrapper", "wrapper-input-span")

    wrapperInputSurname.appendChild(surnameInput);
    wrapperInputSurname.appendChild(surnameSpan);


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


    const wrapperInputPassword2 = document.createElement('div');
    wrapperInputPassword2.classList.add("wrapper-input")

    const passInput2 = createInput('password', 'password', "", 3, 20, true);
    passInput2.classList.add("wrapper-input-input", "wrapper-input-color");

    const passSpan2 = createSpan("Повторите пароль")
    passSpan2.classList.add("font-normal-1", "span-wrapper", "wrapper-input-span")

    wrapperInputPassword2.appendChild(passInput2);
    wrapperInputPassword2.appendChild(passSpan2);


    const wrapperInputButton = document.createElement('div');
    wrapperInputButton.classList.add("wrapper-input")

    const submitBtn = createButton('submit', "Создать")
    submitBtn.classList.add("button-long", "b-color", "font-normal-1")

    wrapperInputButton.appendChild(submitBtn);


    form.appendChild(wrapperInputName)
    form.appendChild(wrapperInputSurname)
    form.appendChild(wrapperInputEmail)
    form.appendChild(wrapperInputPassword)
    form.appendChild(wrapperInputPassword2)
    form.appendChild(wrapperInputButton)


    const wrapperInputBottom = document.createElement('div');
    wrapperInputBottom.classList.add("wrapper-input-bottom");

    const subtext = createParagraph("Мы уже знакомы?");
    subtext.classList.add("font-normal-1");

    const signUpLink = createLink("Войти", "/login",);
    signUpLink.classList.add("font-normal-1", "signup-link");

    wrapperInputBottom.appendChild(subtext);
    wrapperInputBottom.appendChild(signUpLink);


    login.appendChild(wrapperIcon)
    login.appendChild(titleAuth)
    login.appendChild(form)
    login.appendChild(wrapperInputBottom)
    mainSide.appendChild(login)

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passInput.value;

        ajax(
            'POST',
            '/signup',
            {email, password},
            status => {
                if (status === 200) {
                    return;
                }
                console.log(email, password)
                alert('Неверный емейл или пароль');
            }
        );
    });
    parent.appendChild(container);
}

renderSignUp(rootElement);
