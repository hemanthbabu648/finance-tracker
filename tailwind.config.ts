import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#000957',
        primary: '#344CB7',
        'primary-light': '#577BC1',
        'dark-yellow': '#FFEB00',
        'primary-blue-light': '#228BE6',
        alabaster: '#EDEADE',
      },
    },
  },
  plugins: [],
} satisfies Config;
