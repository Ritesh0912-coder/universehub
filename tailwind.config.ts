// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'space-black': '#0a0a0a',
                'galaxy-purple': '#6b5b95',
                'nebula-pink': '#ff6f91',
                'star-gold': '#ffd166'
            },
            backgroundImage: {
                'starfield': "url('/images/starfield.jpg')"
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            },
            animation: {
                float: 'float 3s ease-in-out infinite'
            }
        }
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};

export default config;
