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

        navy: '#121927',
        'navy-soft': '#1e2739',
        stone: '#d5d6ce',
        coral: '#f2a497',
        // coral-ink e ink-soft são versões escurecidas para texto pequeno.
        // Os tons originais não alcançavam 4.5:1 sobre os fundos claros.
        'coral-ink': '#a85535',
        page: '#ffffff',
        'page-alt': '#f7f5f0',
        ink: '#1a1f2b',
        'ink-mid': '#575d6b',
        'ink-soft': '#6b7080',
        rule: '#e2ded4',
        'rule-strong': '#cec9bb',
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
