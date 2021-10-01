const axios = require('axios');
const cheerio = require('cheerio');
const breakdance = require('breakdance');
require('dotenv').config({ path: __dirname + '/../.env' });

const args = process.argv.slice(2);

let year = args[0] ? args[0] : 2020;
let day = args[1] ? args[1] : 1;
let part = args[2] ? parseInt(args[2]) : 1;

const getDescription = async (year, day) => {
  const postDesc = [];
  try {
    const { status, data } = await axios.get(
      'https://adventofcode.com/' + year + '/day/' + day,
      {
        headers: {
          Cookie: 'session=' + process.env.AOD_SESSION_COOKIE + ';',
        },
      }
    );

    if (status === 404) {
      return;
    }

    const $ = cheerio.load(data);

    $('body > main > article').each((_idx, el) => {
      postDesc.push([breakdance($(el).html())]);
    });
  } catch (error) {
    return;
  }
  return postDesc;
};

const getDescriptions = async () => {
  const descs = [];
  if (part == 0) {
    await getDescription(year, 1).then((desc) => {
      if (desc != null) {
        descs.push([
          [
            desc[0].toString().split('---\n\n')[1].split('Good luck!\n')[0] +
              'Good luck!\n',
          ],
        ]);
      }
    });
  } else if (day != 0 && day != null) {
    await getDescription(year, day).then((desc) => {
      if (desc != null) descs.push(desc);
    });
  } else {
    for (let i = 1; i <= 25; i++) {
      await getDescription(year, i).then((desc) => {
        if (desc != null) descs.push(desc);
      });
    }
  }
  console.log(descs);
  return descs;
};

getDescriptions().then((postDescs) =>
  postDescs.forEach((e) => {
    part = part == 0 ? 1 : part;
    if (e[part - 1] != undefined) e[part - 1].forEach((l) => console.log(l));
  })
);
