export const hrefRegExp = {
    endSlash: /\/$/,
    // host: /^\w+:.*?(:)\d*/,
    host: /^\w+:.*?(:)\d|^\w+:\/\/\w+.\w+/,
    localhost: /^\w+:.*?(:)\d*/,
};
