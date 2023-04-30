export const hrefRegExp = {
    endSlash: /\/$/,
    // host: /^\w+:.*?(:)\d*/,
    host: /(?!(w+)\.)\w*(?:\w+\.)+\w+/,
    localhost: /^\w+:.*?(:)\d*/,
};
