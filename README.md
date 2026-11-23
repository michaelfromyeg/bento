# Bento 🍱

My start page for navigating the Internet.

See the very wonderful original project [here](https://github.com/migueravila/Bento)!

## About

This project is my new tab page. It's fun having a custom page, and it's a good introductory web project.

## Development

Code-related notes.

### Client

The site is plain HTML, CSS, and JavaScript (ES modules, no bundler) derived from the original project. Personal settings live in `client/assets/js/config.js`.

Weather comes from [Open-Meteo](https://open-meteo.com) directly in the browser; it needs no API key, so there's no backend.

From `client/`:

- `npm start` serves the site at <http://localhost:8000>
- `npm test` runs the unit tests
- `npm run lint` and `npm run format` lint and format
- `npm run build` copies the site into `dist/`

### Deployment

The GitHub Action lints, tests, and builds on every PR, and on pushes to `main` publishes `client/dist` to the `gh-pages` branch, which GitHub Pages serves at <https://bento.michaeldemar.co>.
