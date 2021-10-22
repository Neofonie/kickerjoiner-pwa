

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
* add deploy.yml for github actions
* add public/manifest.json
  * create app icons + favicons https://www.favicon-generator.org/ 
  * add maskable icons https://maskable.app/editor 96 128 192
* add <icon /> and <meta /> tags index.html
* add public/js/pwa.js & service-worker.js
* pwa debugging https://www.thinktecture.com/downloads/v1-pwa-cheatsheet-thinktecture-4c.pdf
