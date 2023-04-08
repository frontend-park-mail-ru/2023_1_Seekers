export const hrefRegExp = {
    endSlash: /\/$/,
    host: /(?:\w+\.)+\w+/,  //(?!(w+)\.)\w*(?:\w+\.)+\w+/ //^\w+:.*?(:)\d
    localhost: /^\w+:\/\/\w+:\d|^\w+:\/\/\w+/i,
};
