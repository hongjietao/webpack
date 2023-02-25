if (typeof window === 'undefined') {
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');

const SSR = require('../dist/search-server');
const template = fs.readFileSync(
  path.join(__dirname, '../dist/search.html'),
  'utf-8',
);

const renderMarkup = (str) => {
  const dataStr = JSON.stringify({ data: { a: 1, b: 2, c: 3, d: 4 } });
  return template
    .replace('<!-- HTML_PLACEHOLDER -->', str)
    .replace(
      '<!-- INIRIAL_DATA_PLACEHOLDER -->',
      `<script>window.__initial_data=${dataStr}</script>`,
    );
};

const server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log('server is running: ', port);
  });
};

server(process.env.PORT || 3000);
