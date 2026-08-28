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
        // Paleta antiga. Ainda usada pelo admin e pelas páginas internas que
        // não foram migradas. Sai quando essas páginas forem redesenhadas.
        'base-blue': '#121927',
        'base-gray': '#d5d6ce',
        'base-pink': '#f2a497',

        // Tema único escuro, em tons de azul-marinho. As faixas do site variam
        // entre page, page-alt e navy, que são próximos de propósito: a
        // separação vem dos fios de 1px, não de contraste de fundo.
        navy: '#121927',
        'navy-soft': '#1e2739',
        stone: '#d5d6ce',
        coral: '#f2a497',
        'coral-ink': '#e79877',
        page: '#10141c',
        'page-alt': '#161b26',
        ink: '#eceadf',
        'ink-mid': '#a8adb9',
        'ink-soft': '#838895',
        rule: '#272e3c',
        'rule-strong': '#333c4d',
        'on-navy': '#e9e6dd',
        'on-navy-mid': '#a9adb8'
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-garamond)', 'Garamond', 'Times New Roman', 'serif']
      }
    }
  },
  plugins: []
}
export default config
