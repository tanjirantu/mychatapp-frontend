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
            blue: colors.blue,
            'dh-green': {
                400: '#A7E521',
                500: '#64c900',
                700: '#01896a',
                800: '#00745a',
            },
            'dh-red': {
                500: '#FF5B43',
            },
            'dh-yellow': {
                500: '#FBBD08',
                600: '#f2b100',
            },
            'dh-gray': {
                800: '#2a2a2a',
                700: '#63636A',
                600: '#9797A0',
                500: '#B8B8BE',
                400: '#ededed',
                300: '#e8e8e8',
                200: '#f2f2f2',
            },
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
