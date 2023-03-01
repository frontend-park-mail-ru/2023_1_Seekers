'use strict'

const mainElement = document.getElementById('main');
mainElement.classList.add('main')


const navbarButtonIcons = {
    newMsg: `<svg class="icon-button-icon" fill="none" height=100% viewBox="0 0 20 20" width=100%
                     xmlns="http://www.w3.org/2000/svg">
                    <g stroke-width="1">
                        <path d="m17.4142 2.58579c-.781-.78105-2.0474-.78105-2.8284 0l-7.5858
                    7.58581v2.8284h2.82842l7.58578-7.58579c.7811-.78105.7811-2.04738 0-2.82842z"/>
                        <path clip-rule="evenodd" d="m2 6c0-1.10457.89543-2 2-2h4c.55228 0 1 .44772 1
                    1s-.44772 1-1 1h-4v10h10v-4c0-.5523.4477-1 1-1s1 .4477 1 1v4c0 1.1046-.8954
                    2-2 2h-10c-1.10457 0-2-.8954-2-2z" fill-rule="evenodd"/>
                    </g>
                </svg>`,

    about: `<svg class="icon-button-icon" fill="none" height=100% viewBox="0 0 24 24" width=100%
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="m13 16h-1v-4h-1m1-4h.01m8.99 4c0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-4.97056
                    4.02944-9 9-9 4.9706 0 9 4.02944 9 9z" stroke-linecap="round"
                          stroke-linejoin="round" stroke-width="2"/>
                </svg>`,

    settings: `<svg class="icon-button-icon" fill="none" height=100% viewBox="0 0 24 24" width=100%
                     xmlns="http://www.w3.org/2000/svg">
                    <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="m10.3246 4.31731c.4264-1.75641 2.9244-1.75641 3.3508 0 .2754 1.13462 1.5753
                        1.67307 2.5724 1.06554 1.5435-.94046 3.3098.82585 2.3694 2.36933-.6076.99707-.0691
                        2.29702 1.0655 2.57242 1.7564.4264 1.7564 2.9244 0 3.3508-1.1346.2754-1.6731
                        1.5753-1.0655 2.5724.9404 1.5435-.8259 3.3098-2.3694 2.3694-.9971-.6076-2.297-.0691-2.5724
                        1.0655-.4264 1.7564-2.9244 1.7564-3.3508
                        0-.2754-1.1346-1.57534-1.6731-2.57241-1.0655-1.54349.9404-3.3098-.8259-2.36934-2.3694.60753-.9971.06908-2.297-1.06554-2.5724-1.75641-.4264-1.75641-2.9244
                        0-3.3508 1.13462-.2754 1.67306-1.57534 1.06554-2.57242-.94046-1.54348.82585-3.30979 2.36934-2.36933.99707.60752 2.29701.06908
                        2.57241-1.06554z"/>
                        <path d="m15 12c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"/>
                    </g>
                </svg>`,

    logout: `<svg class="icon-button-icon" fill="none" height=100% viewBox="0 0 24 24" width=100%
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="m17 16 4-4m0 0-4-4m4 4h-14m6 4v1c0 1.6569-1.3431 3-3 3h-4c-1.65685
                    0-3-1.3431-3-3v-10c0-1.65685 1.34315-3 3-3h4c1.6569 0 3 1.34315 3 3v1"
                          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>`,
}

const menuContent = {
    input: {
        img: `<svg class="menu-button-icon" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m3 8 7.8906 5.2604c.6718.4479 1.547.4479 2.2188 0l7.8906-5.2604m-16 11h14c1.1046
                            0 2-.8954 2-2v-10c0-1.10457-.8954-2-2-2h-14c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543
                            2 2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>`,
        text: 'Входящие',
        count: '999',
    },
    sent: {
        img: `<svg class="menu-button-icon" fill="none" height="100%" viewBox="0 0 24 24" width="100%"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m12 19 9 2-9-18-9 18zm0 0v-8" stroke-linecap="round"
                              stroke-linejoin="round" stroke-width="2"/>
                    </svg>`,
        text: 'Отправленные',
        count: '999',
    },
    attachment: {
        img: `<svg class="menu-button-icon" fill="none" height="100%" viewBox="0 0 24 24" width="100%"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m9 5h-2c-1.10457 0-2 .89543-2
                             2v12c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2v-12c0-1.10457-.8954-2-2-2h-2m-6
                             0c0 1.10457.89543 2 2 2h2c1.1046 0 2-.89543 2-2m-6 0c0-1.10457.89543-2 2-2h2c1.1046 0
                             2 .89543 2 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>`,
        text: 'Черновик',
        count: '999',
    },
    draft: {
        img: `<svg fill="none" height="100%" viewBox="0 0 24 24" width="100%"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="m15.1716 7-6.58581 6.5858c-.78105.781-.78105 2.0474 0 2.8284.78105.7811
                            2.04741.7811 2.82841 0l6.4142-6.58577c1.5621-1.5621 1.5621-4.09476
                            0-5.65686-1.5621-1.56209-4.0947-1.56209-5.6568 0l-6.41424 6.58583c-2.34315
                            2.3431-2.34315 6.1421 0 8.4852 2.34314 2.3432 6.14214 2.3432 8.48524 0l6.2574-6.2426"
                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>`,
        text: 'Вложения',
        count: '999',
    },
    spam: {
        img: `<svg class="menu-button-icon" fill="none" height="100%" viewBox="0 0 24 24" width="100%"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m18.364 18.364c3.5147-3.5148 3.5147-9.21324
                        0-12.72796-3.5148-3.51472-9.21324-3.51472-12.72796 0m12.72796 12.72796c-3.5148
                        3.5147-9.21324 3.5147-12.72796 0-3.51472-3.5148-3.51472-9.21324 0-12.72796m12.72796
                        12.72796-12.72796-12.72796" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>`,
        text: 'Спам',
        count: '999',
    },
    trash: {
        img: `<svg class="menu-button-icon" fill="none" height="100%" viewBox="0 0 24 24" width="100%"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m19 7-.8673 12.1425c-.0748 1.0466-.9457 1.8575-1.9949 1.8575h-8.27556c-1.04928
                            0-1.92016-.8109-1.99492-1.8575l-.86732-12.1425m5
                            4v6m4-6v6m1-10v-3c0-.55228-.4477-1-1-1h-4c-.55228 0-1 .44772-1 1v3m-5 0h16"
                              stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>`,
        text: 'Корзина',
        count: '999',
    },
}

const cake = `<svg class="content-mail" fill="none" height="20" viewBox="0 0 20 20" width="20"
             xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="m6 3c0-.55228.44772-1 1-1h.01c.55228 0
                 1 .44772 1 1s-.44772 1-1 1h-.01c-.55228 0-1-.44772-1-1zm2 3c0-.55228-.44772-1-1-1s-1
                 .44772-1 1v1c-1.10457 0-2 .89543-2 2v1c-1.10457 0-2 .8954-2 2v.6833c.36868.1033.72499.2649
                 1.0547.4847.57243.3816 1.31817.3816 1.8906 0 1.24423-.8295 2.86517-.8295 4.1094 0 .57243.3816
                 1.3182.3816 1.8906 0 1.2442-.8295 2.8652-.8295 4.1094 0 .5724.3816 1.3182.3816 1.8906 0
                 .3297-.2198.686-.3814 1.0547-.4847v-.6833c0-1.1046-.8954-2-2-2v-1c0-1.10457-.8954-2-2-2v-1c0-.55228-.4477-1-1-1s-1
                 .44772-1 1v1h-1v-1c0-.55228-.4477-1-1-1-.55228 0-1
                 .44772-1 1v1h-1zm10 8.8679c-1.2367.7935-2.8286.7816-4.0547-.0358-.5724-.3816-1.3182-.3816-1.8906
                 0-1.2442.8295-2.86517.8295-4.1094 0-.57243-.3816-1.31817-.3816-1.8906
                 0-1.22607.8174-2.81795.8293-4.0547.0358v2.1321c0 .5523.44772 1 1 1h14c.5523 0 1-.4477
                 1-1zm-9-11.8679c0-.55228.44772-1 1-1h.01c.5523 0 1 .44772 1 1s-.4477 1-1 1h-.01c-.55228
                 0-1-.44772-1-1zm3 0c0-.55228.4477-1 1-1h.01c.5523 0 1 .44772 1 1s-.4477 1-1 1h-.01c-.5523 0-1-.44772-1-1z"
                  fill-rule="evenodd"/>
        </svg>`

const letterListContent = [
    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:11 pm, Jul 12, 2021',
        content: 'Lorem ipsum dolor sit amet',
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:12 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:13 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:14 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:15 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:16 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:17 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:18 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:19 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:20 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },

    {
        img: 'img/female-avatar.svg',
        name: 'Ivan Ivanovich',
        title: 'Students in bma',
        time: '16:21 pm, Jul 12, 2021',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing amet,
                            consectetur adipisicing elit. Alias, assumenda corporis doloribus ea
                            illum iure optio pariatur, provident ratione repellendus reprehenderit vero.
                            Amet culpa dolorem dolorum harum, praesentium quaerat rem.`,
    },
]

function createLetterFrame(img, name, title, time, letterContent) {
    const letterFrame = document.createElement('div');
    letterFrame.classList.add('letter-frame');

    const letterReadStateFrame = document.createElement('div');
    letterReadStateFrame.classList.add('letter-read-state-frame');

    const letterContentFrame = document.createElement('div');
    letterContentFrame.classList.add('letter-content-frame');

    letterFrame.appendChild(letterReadStateFrame);
    letterFrame.appendChild(letterContentFrame);

    const letterContentHeaderFrame = document.createElement('div');
    letterContentHeaderFrame.classList.add('letter-content-header-frame');

    const letterContentTextFrame = document.createElement('div');
    letterContentTextFrame.classList.add('letter-content-text-frame');

    letterContentFrame.appendChild(letterContentHeaderFrame);
    letterContentFrame.appendChild(letterContentTextFrame);

    const letterContentHeaderImageFrame = document.createElement('div');
    letterContentHeaderImageFrame.classList.add('letter-content-header-image-frame');

    const letterContentHeaderTextFrame = document.createElement('div');
    letterContentHeaderTextFrame.classList.add('letter-content-header-text-frame');

    letterContentHeaderFrame.appendChild(letterContentHeaderImageFrame);
    letterContentHeaderFrame.appendChild(letterContentHeaderTextFrame);

    const letterContentHeaderImage = document.createElement('img');
    letterContentHeaderImage.classList.add('letter-content-image-letter');
    letterContentHeaderImage.src = img;

    letterContentHeaderImageFrame.appendChild(letterContentHeaderImage);

    const letterContentHeaderNameText = document.createElement('label');
    letterContentHeaderNameText.classList.add('letter-content-header-name-text');
    letterContentHeaderNameText.textContent = name;

    const letterContentHeaderTextBottomFrame = document.createElement('div');
    letterContentHeaderTextBottomFrame.classList.add('letter-content-header-text-bottom-frame');

    letterContentHeaderTextFrame.appendChild(letterContentHeaderNameText);
    letterContentHeaderTextFrame.appendChild(letterContentHeaderTextBottomFrame);

    const letterContentHeaderSecondTextTitle = document.createElement('label');
    letterContentHeaderSecondTextTitle.classList.add('letter-content-header-second-text');
    letterContentHeaderSecondTextTitle.textContent = title

    const letterContentHeaderSecondTextTime = document.createElement('label');
    letterContentHeaderSecondTextTime.classList.add('letter-content-header-second-text');
    letterContentHeaderSecondTextTime.style.textAlign = "right";
    letterContentHeaderSecondTextTime.textContent = time;

    letterContentHeaderTextBottomFrame.appendChild(letterContentHeaderSecondTextTitle);
    letterContentHeaderTextBottomFrame.appendChild(letterContentHeaderSecondTextTime);

    const letterContentText = document.createElement('label');
    letterContentText.classList.add('letter-content-text');
    letterContentText.textContent = letterContent;

    letterContentTextFrame.appendChild(letterContentText);

    return letterFrame;
}

function createButton(img, text, c){
    const button = document.createElement('a');
    button.classList.add('menu-button');

    const leftFrame = document.createElement('div');
    leftFrame.classList.add('menu-button-left-frame');

    const icon = document.createElement('div');
    icon.classList.add('menu-button-icon');
    icon.innerHTML = img;

    const menuButtonText = document.createElement('label');
    menuButtonText.classList.add('menu-button-text');
    menuButtonText.textContent = text;

    leftFrame.appendChild(icon);
    leftFrame.appendChild(menuButtonText);

    button.appendChild(leftFrame);

    const rightFrame = document.createElement('div');
    rightFrame.classList.add('menu-button-right-frame');

    const count = document.createElement('p');
    count.textContent = c;
    rightFrame.classList.add('menu-button-count');

    rightFrame.appendChild(count);

    button.appendChild(rightFrame);
    return button;
}

function createNavbar(){
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');

    const navbarFrameLeft = document.createElement('div');
    navbarFrameLeft.classList.add('navbar-frame-left');

    const navbarFrameRight = document.createElement('div');
    navbarFrameRight.classList.add('navbar-frame-right');

    navbar.appendChild(navbarFrameLeft);
    navbar.appendChild(navbarFrameRight);

    const emblem = document.createElement('a');
    emblem.classList.add('navbar-emblem-button');
    emblem.href = "";

    const emblemIcon = document.createElement('img');
    emblemIcon.src = 'img/emblem.svg';

    const emblemLabel = document.createElement('label');
    emblemLabel.classList.add('navbar-text');
    emblemLabel.textContent = 'MailBox';

    emblem.appendChild(emblemIcon);
    emblem.appendChild(emblemLabel);

    navbarFrameLeft.appendChild(emblem);

    const navbarProfile = document.createElement('a');
    navbarProfile.classList.add('navbar-img-button');
    const navbarProfileAvatar = document.createElement('img');
    navbarProfileAvatar.src = 'img/female-avatar.svg';
    navbarProfile.appendChild(navbarProfileAvatar);

    const logout = document.createElement('a');

    Object.entries(navbarButtonIcons).map(([_, value]) => {
        const iconButton = document.createElement('a');
        iconButton.classList.add('icon-button');
        iconButton.innerHTML = value;
        return iconButton;
    }).forEach((e) => navbarFrameRight.appendChild(e));

    navbarFrameRight.appendChild(navbarProfile);
    return navbar;
}

function createVerticalLine() {
    const line = document.createElement('div');
    line.classList.add('vertical-line');
    return line;
}

function createContent(){
    const content = document.createElement('div');
    content.classList.add('content');
    content.appendChild(createMenu());
    content.appendChild(createVerticalLine());
    content.appendChild(createLetterList());

    return content;
}

function createMenu(){
    const menu = document.createElement('div');
    menu.classList.add('Menu');

    Object.entries(menuContent).map(([_, {img, text, count}]) =>
        createButton(img, text, count)).forEach((e) => menu.appendChild(e));

    return menu;
}

function createLetterList(){
    const letterList = document.createElement('div');
    letterList.classList.add('LetterList');

    letterListContent.forEach(e =>
        letterList.appendChild(createLetterFrame(e.img, e.name, e.title, e.time, e.content))
    );

    return letterList;
}

const navbar = createNavbar()
mainElement.appendChild(navbar);

const content = createContent()
mainElement.appendChild(content);

content.innerHTML += cake;


// mainElement.appendChild(createMenu());
