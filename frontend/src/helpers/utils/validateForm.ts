const validateForm = (params: any) => {
    const errors = {};
    for (const [key, value] of Object.entries({ ...params })) {
        if (value === '' || value == undefined || value === false) Object.assign(errors, { [key]: true });
        if (Array.isArray(value) && !value.length) Object.assign(errors, { [key]: true });

        if (!Array.isArray(value)) {
            if (typeof value === 'object') {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const [_k, v] of Object.entries({ ...value })) {
                    if (v === '' || v == undefined) Object.assign(errors, { [key]: true });
                }
            }
            if (value === '' || value == undefined) Object.assign(errors, { [key]: true });
        }
    }
    return errors;
};

export default validateForm;
