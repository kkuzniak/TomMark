export const getURLParameter = (param) => {
    const pageURL = window.location.search.substring(1);
    const variables = pageURL.split('&');
    let parameterName, i;

    for (i = 0; i < variables.length; i++) {
        parameterName = variables[i].split('=');

        if (parameterName[0] === param) {
            return parameterName[1] === undefined ? true : decodeURIComponent(parameterName[1]);
        }
    }
};