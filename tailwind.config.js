/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,vue,ts}"]
export const theme = {
  extend: {
    colors: {
      'white': 'var(--vt-c-white)',
      'black': 'var(--vt-c-black)',
    }
  }
}
export const plugins = []
