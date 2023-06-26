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
              minHeight: {
                '2/3': '66.6%'
              },
              fontFamily: {
                  'sans': ['Oxygen', 'sans-serif'],
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
