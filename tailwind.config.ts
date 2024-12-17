import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'green-ufcat': '#29797C',
        'orange-ufcat': '#FC831E',
        'red-ufcat': '#EE2D55',
        'gray-ufcat': '#E1DEE3',
        'oceangreen-ufcat': '#0D2428',
      },
    },
  },
  plugins: [],
} satisfies Config
