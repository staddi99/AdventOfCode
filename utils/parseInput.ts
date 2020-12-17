const axios = require('axios');
const cheerio = require('cheerio');
const breakdance = require('breakdance');
require('dotenv').config({ path: __dirname + '/../.env' });

const args = process.argv.slice(2);

let year = args[0] ? args[0] : 2020;
let day = args[1] ? args[1] : 1;

const getInput = async (year, day) => {
  let postInput;
  try {
    const { status, data } = await axios.get(
      'https://adventofcode.com/' + year + '/day/' + day + '/input',
      {
        headers: {
          Cookie:
            'session='+process.env.AOD_SESSION_COOKIE+';',
        },
      }
    );

    if (status === 404) {
      return;
    }
    postInput = data;
  } catch (error) {
    return;
  }
  return postInput;
};

const getInputs = async () => {
  const inputs = [];
  if (day != 0 && day != null) {
    await getInput(year, day).then((input) => {
      if (input != null) inputs.push(input);
    });
  } else {
    for (let i = 1; i <= 25; i++) {
      await getInput(year, i).then((input) => {
        if (input != null) inputs.push(input);
      });
    }
  }
  return inputs;
};

getInputs().then((postInput) => postInput.forEach(e => console.log(e)));
