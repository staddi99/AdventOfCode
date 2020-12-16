const axios = require('axios');
const cheerio = require('cheerio');

const year = 2020;

const getPostTitles = async () => {
  const postTitles = [];
  for (let i = 1; i <= 25; i++) {
    try {
      const { status, data } = await axios.get(
        'https://adventofcode.com/' + year + '/day/' + i
      );

      if (status === 404) {
        continue;
      }

      const $ = cheerio.load(data);

      $('body > main > article > h2').each((_idx, el) => {
        const postTitle = $(el).text().split(': ')[1].split(' -')[0];
        postTitles.push('*  [❌ Day ' + i + ': ' + postTitle + ']()');
      });
    } catch (error) {}
  }
  return postTitles;
};

getPostTitles().then((postTitles) => postTitles.forEach((e) => console.log(e)));
