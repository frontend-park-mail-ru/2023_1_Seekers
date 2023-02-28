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
