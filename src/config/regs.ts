export const hrefRegExp = {
    endSlash: /\/$/,
    host: /^\w+:.*?(:)\d/, //|(?!(w+)\.)\w*(?:\w+\.)+\w+
    localhost: /^\w+:\/\/\w+:\d|^\w+:\/\/\w+/i,
};
