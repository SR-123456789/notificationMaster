module.exports = {
  content : ['./app/**/*.{js,jsx,ts,tsx}'], // デフォルトは空なので、任意のパスを書き足してください
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
