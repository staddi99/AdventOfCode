const fs = require('fs');
const gitRoot = require('git-root')();

const args = process.argv.slice(2);

let year = args[0] ? args[0] : 2021;
let inc = args[1] ? args[1] : 0;

const changeStatus = async () => {
  var completionYear = JSON.parse(
    fs
      .readFileSync(gitRoot + '/.github/badges/completion-' + year + '.json')
      .toString()
  );
  var completion = JSON.parse(
    fs.readFileSync(gitRoot + '/.github/badges/completion.json').toString()
  );

  completionYear.message =
    parseInt(completionYear.message.split('/')[0]) +
    1 +
    '/' +
    completionYear.message.split('/')[1];
  completionYear.color =
    parseInt(completionYear.message.split('/')[0]) > 0
      ? parseInt(completionYear.message.split('/')[0]) == 50
        ? 'green'
        : 'yellow'
      : 'red';

  completion.message =
    parseInt(completion.message.split('/')[0]) +
    1 +
    '/' +
    completion.message.split('/')[1];
  completion.color =
    parseInt(completion.message.split('/')[0]) > 0
      ? parseInt(completion.message.split('/')[0]) == 50
        ? 'green'
        : 'yellow'
      : 'red';

  if (inc == 1) {
    fs.writeFileSync(
      gitRoot + '/.github/badges/completion-' + year + '.json',
      JSON.stringify(completionYear, null, 4)
    );
    fs.writeFileSync(
      gitRoot + '/.github/badges/completion.json',
      JSON.stringify(completion, null, 4)
    );
  }

  return parseInt(completionYear.message.split('/')[0]);
};

changeStatus().then((res) => console.log(res));
