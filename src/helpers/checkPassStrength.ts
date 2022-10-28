const checkPassStrength = (password: string) => {
    let strength = 0;
    strength += /[A-Z]+/.test(password) ? 1 : 0;
    strength += /[a-z]+/.test(password) ? 1 : 0;
    strength += /[0-9]+/.test(password) ? 1 : 0;
    strength += /[\W]+/.test(password) ? 1 : 0;
    strength += password.length >= 8 ? 1 : 0;
    switch (strength) {
        case 3:
            return 'weak';
        case 4:
            return 'medium';
        case 5:
            return 'strong';
        default:
            return 'very-weak';
    }
};

export default checkPassStrength;
