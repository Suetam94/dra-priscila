import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'base-blue': '#121927',
        'base-blue-soft': '#262f45',
        'base-gray': '#d5d6ce',
        'base-pink': '#f2a497',
        'base-pink-deep': '#d97a5c',
        paper: '#f7f5f0',
        sunken: '#efece3',
        ink: '#171c28',
        'ink-soft': '#565c6e',
        hairline: '#e3ded2'
      },
      fontFamily: {
        sans: ['var(--font-public-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
}
export default config
