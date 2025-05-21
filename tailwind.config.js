/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmic: {
          background: '#0A0A1F',
          darker: '#070717',
          card: '#1A1A2E',
          purple: '#3A1F5D',
          deepPurple: '#2C1745',
          accent: '#FFD700',
          accentDark: '#B89B00',
          text: '#E0E0FF',
          textDim: '#AAAACC'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        reading: ['"Crimson Text"', 'serif'],
        body: ['"Poppins"', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 215, 0, 0.3)',
        'cosmic': '0 4px 20px rgba(26, 26, 46, 0.8)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'stars': 'url("https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        'tent': 'url("https://images.pexels.com/photos/19032770/pexels-photo-19032770.jpeg?auto=compress&cs=tinysrgb&w=1600")'
      }
    },
  },
  plugins: [],
};