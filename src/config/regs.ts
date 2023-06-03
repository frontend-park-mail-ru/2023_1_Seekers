export const hrefRegExp = {
    endSlash: /\/$/,
    // host: /^\w+:.*?(:)\d*/,
    host: /^\w+:.*?(:)\d|^\w+:\/\/\w+.\w+/,
    localhost: /^\w+:.*?(:)\d*/,
};

export const validatorRegExp = {
    emojis: /\p{Extended_Pictographic}/u,
    russianSymbols: /[а-яА-Я]/g,
};
