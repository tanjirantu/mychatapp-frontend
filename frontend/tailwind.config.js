const colors = require('tailwindcss/colors');

module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            green: colors.gray,
            teal: colors.teal,
            red: colors.red,
            yellow: colors.yellow,
            blue: colors.blue
        },
        fontFamily: {
            'dh-SFUIDisplay': 'SFUIDisplay',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwindcss-scrollbar')],
};
