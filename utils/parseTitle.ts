const axios = require('axios');
const cheerio = require('cheerio');

const args = process.argv.slice(2);

let year = (args[0]) ? args[0] : 2020;
let day = (args[1]) ? args[1] : 1;
let only = (args[2]) ? args[2] : 0;

const getTitle = async (year, day) => {
  let postTitle;
  try {
    const { status, data } = await axios.get(
      'https://adventofcode.com/' + year + '/day/' + day
    );

    if (status === 404) {
      return;
    }

    const $ = cheerio.load(data);

    $('body > main > article > h2').each((_idx, el) => {
      postTitle = $(el).text().split(': ')[1].split(' -')[0];
    });
  } catch (error) {
    return;
  }
  if (only == 1) return postTitle;
  return '*  [❌ Day ' + day + ': ' + postTitle + ']()';
};

const getTitles = async () => {
  const titles = [];
  if (day != 0 && day != null) {
    await getTitle(year, day).then(title => {if(title != null) titles.push(title)});
  } else {
    for (let i = 1; i <= 25; i++) {
      await getTitle(year, i).then(title => {if(title != null) titles.push(title)});
    }
  }
  return titles;
};

getTitles().then((postTitles) => postTitles.forEach((e) => console.log(e)));
