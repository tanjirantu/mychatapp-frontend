export default (styles: any, classes: any, rawClassName: string) => {
    let classStr = '';

    try {
        if (Object.keys(classes).length) {
            Object.keys(classes).forEach((key, i) => {
                if (classes[key]) {
                    if (i == 0) classStr += styles[key];
                    else classStr += ` ${styles[key]}`;
                }
            });
        }
    } catch (error) {
        console.error('Error in parsing ClassNames:', error);
    }

    if (rawClassName) classStr += ` ${rawClassName}`;

    return classStr;
};
