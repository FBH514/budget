/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.html',
        './src/**/*.jsx',
        './src/**/*.js',
        './src/**/*.ts',
        './src/**/*.tsx'
    ],
    theme: {
        extend: {
            colors: {
                'coral': {
                    '50': '#fff8f7',
                    '100': '#ffeee9',
                    '200': '#ffd6d0',
                    '300': '#ffbdb7',
                    '400': '#ff9b8a',
                    '500': '#ff795d',
                    '600': '#e66f53',
                    '700': '#bf5b46',
                    '800': '#994c3a',
                    '900': '#7d3f2f'
                },
            },
            minHeight: {
                '2/3': '66.6%'
            },
            fontFamily: {
                'sans': ['Oxygen', 'sans-serif'],
                'mono': ['Oxygen Mono', 'monospace'],
                'handwritten': ['Dancing Script', 'handwritten']
            }
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px'
        }
    },
    plugins: [],
}
