module.exports = {
   presets: [
      '@babel/preset-env',
      // Runtime automatic with React 17+ allows not importing React
      // in files only using JSX (no state or React methods)
      ['@babel/preset-react', { runtime: 'automatic' }]
   ],
   "plugins": [
      ["module-resolver", {
         "root": ["./"],
         "alias": {
            "@formElements": "./src/js/components/common/formElements",
            "@common": "./src/js/common",
            "@commonReact": "./src/js/components/common",
            "@hooks": "./src/js/hooks",
            "@components": "./src/js/components",
            "@layout": "./src/js/components/layout",
            "@pages": "./src/js/Pages",
            "@images": "./src/assets/images",
            "@data": "./src/assets/data",
            "@assets": "./src/assets/"

         }
      }],

   ],
};