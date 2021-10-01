#!/bin/bash

while getopts y:d: flag
do
    case "${flag}" in
        y) year=${OPTARG};;
        d) day=${OPTARG};;
    esac
done

set -u
: "${year:?-y <year> not given}"
: "${day:?-d <day> not given}"

gitRoot=$(git rev-parse --show-toplevel)

year_desc=$(node $gitRoot/utils/parseDesc.ts $year 0 0)
days=$(node $gitRoot/utils/parseTitle.ts $year 0)
title=$(node $gitRoot/utils/parseTitle.ts $year $day 1)
part1=$(node $gitRoot/utils/parseDesc.ts $year $day 1)
part2=$(node $gitRoot/utils/parseDesc.ts $year $day 2)
input=$(node $gitRoot/utils/parseInput.ts $year $day)

set -a
export DAY=$day YEAR=$year TITLE=$title DESCRIPTION_PART_1=$part1 DESCRIPTION_PART_2=$part2 YEAR_DESCRIPTION=$year_desc DAYS=$days INPUT=$input LIST="*  [🛠️ Day $day: $title](day_$day/)"
set +a

if [ ! -d "$gitRoot/$year" ]; then mkdir -p "$gitRoot/$year"; sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/year/README.md" | envsubst > "$gitRoot/$year/README.md"; sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/year/package.json" | envsubst > "$gitRoot/$year/package.json"; fi;

if [ $day -gt 0 ]; then if [ ! -d "$gitRoot/$year/day_$day" ]; then cp -R "$gitRoot/templates/day/" "$gitRoot/$year/day_$day"; fi; fi;
cp "$gitRoot/$year/README.md" "$gitRoot/$year/README.tmp"

if [ $day -gt 0 ]; then sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/day/README.md" | envsubst > "$gitRoot/$year/day_$day/README.md"; fi;
if [ $day -gt 0 ]; then sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/day/input.js" | envsubst > "$gitRoot/$year/day_$day/input.js"; fi;
if [ $day -gt 0 ]; then sed -E 's/\*  \[. Day '+$day+': [a-zA-Z ]+\]\(\)/${LIST}/g' "$gitRoot/$year/README.tmp" | envsubst > "$gitRoot/$year/README.md"; fi;

rm "$gitRoot/$year/README.tmp"