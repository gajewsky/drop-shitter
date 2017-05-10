const request = require('request');
const async = require('async');
const cheerio = require('cheerio');

const url = 'http://allegro.pl/xiaomi-redmi-note-4x-32gb-dualsim-pl-menu-global-i6718875497.html';

request.get({
  url,
  headers: {'User-Agent': 'Request-Promise'},
}, (error, response, body) => {
  if (error) return cb(error)

  $ =  cheerio.load(body);
  const fromPoland =
    $('.attributes-container')
      .find(`span.attribute-name:contains(dostawa z Polski:)`)
      .next('span.attribute-value')
      .text()

  const dropShipped = fromPoland  === 'nie';

  console.log(dropShipped)
  return { dropShipped }
});
