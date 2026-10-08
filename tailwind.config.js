/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'flame-anim': 'flicker 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        flicker: {
          '0%': { transform: 'scaleX(1) scaleY(1)' },
          '100%': { transform: 'scaleX(0.9) scaleY(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
