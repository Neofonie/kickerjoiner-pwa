

--- How i created this app ---
* `npx degit sveltejs/template ./kickerjoiner-pwa` --force
* script changes in package.json
* `npm install`
* .gitignore changes
* extract index.html to src for cache busting at deploy
* create stores.ts
* add "rollup-plugin-scss": "^2.6.1" & "svelte-preprocess": "^4.0.0" to packages.json for sass
  * change rollup.config.js
  * setup base sass in src/scss 
* add typescript to rollup.config.js and package.json
* create svelte files
