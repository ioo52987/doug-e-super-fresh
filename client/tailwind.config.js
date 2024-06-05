/** @type {import('tailwindcss').Config} */
export default {
  content: [
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff', // white
      'black': '#111111', // black
      'zinc-50': '#fafafa', // zinc-50
      'orange': {
        200: '#fed7aa', // orange-200
        300: '#fdba74', // orange-300
        500: '#f97316', // orange-500
        600: '#ea580c', // orange-600
        800: '#9a3412', // orange-800
      },
      'cyan-200': '#a5f3fc', // cyan-200
      'amber-100': '#fef3c7', // amber-100
      'mexican-orange': '#fa5a39', // non-tailwind color
      'lite-gray': '#f3f3f3', // non-tailwind color
      'dark-gray': '#1e1e1e', // non-tailwind color
      'gray': {
        50: '#f9fafb', // gray-50
        200: '#e5e7eb', // gray-200
        400: '#9ca3af', // gray-400
        500: '#6b7280', // gray-500
        600: '#4b5563', // gray-600
        700: '#374151', // gray-700
        800: '#1f2937', // gray-800
        900: '#111827', // gray-900
      },
      'purple-300': '#d8b4fe', // purple-300
    },
  },
  plugins: [],
}

