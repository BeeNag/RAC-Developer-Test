// Craco enables us to alter the postcss config of create-react-app without having to eject
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}