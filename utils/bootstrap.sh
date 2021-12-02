#!/bin/bash

while getopts y:d:f: flag; do
    case "${flag}" in
    y) year=${OPTARG} ;;
    d) day=${OPTARG} ;;
    f) finish=${OPTARG} ;;
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
comp=$(node $gitRoot/utils/changeStatus.ts $year 0)

set -a
export DAY=$day
export YEAR=$year
export TITLE=$title
export DESCRIPTION_PART_1=$part1
export DESCRIPTION_PART_2=$part2
export YEAR_DESCRIPTION=$year_desc
export DAYS=$days
export INPUT=$input
export LISTWIP="*  [🛠️ Day $day: $title](day_$day/)"
export LISTFIN="*  [✅ Day $day: $title](day_$day/)"
export YEARWIP_1="*  [🛠️ $year: **"
export YEARWIP_2=" / 25** ($((comp * 2))% ⭐️)]($year)"
export YEARFIN="*  [✅ $year: **25 / 25** (100% ⭐️)]($year)"
set +a

if [ -z ${finish+x} ]; then
    if [ ! -d "$gitRoot/$year" ]; then
        mkdir -p "$gitRoot/$year"
        sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/year/README.md" | envsubst >"$gitRoot/$year/README.md"
        sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/year/package.json" | envsubst >"$gitRoot/$year/package.json"
    fi

    if [ $day -gt 0 ]; then
        if [ ! -d "$gitRoot/$year/day_$day" ]; then
            cp -R "$gitRoot/templates/day/" "$gitRoot/$year/day_$day"
        fi

        cp "$gitRoot/$year/README.md" "$gitRoot/$year/README.tmp"

        sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/day/README.md" | envsubst >"$gitRoot/$year/day_$day/README.md"
        sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/day/input.js" | envsubst >"$gitRoot/$year/day_$day/input.js"

        sed -E 's/\*  \[.+ Day '$day': [a-zA-Z ]+\]\(\)/${LISTWIP}/g' "$gitRoot/$year/README.tmp" | envsubst >"$gitRoot/$year/README.md"

        rm "$gitRoot/$year/README.tmp"
    fi

else
    if [ $day -gt 0 ]; then
        cp "$gitRoot/README.md" "$gitRoot/README.tmp"
        cp "$gitRoot/$year/README.md" "$gitRoot/$year/README.tmp"

        if [ $finish -eq 1 ]; then
            res=$(node $gitRoot/utils/changeStatus.ts $year 1)
            sed -E 's/\*  \[(.+) '$year': \*\*(.+) \/ .+\*\* \((\d*).+\)\]\('$year'\)/${YEARWIP_1}\2${YEARWIP_2}/g' "$gitRoot/README.tmp" | envsubst >"$gitRoot/README.md"
            sed -E 's/__(([^_]|_[^_])*)__/${\1}/g' "$gitRoot/templates/day/README.md" | envsubst >"$gitRoot/$year/day_$day/README.md"
        fi
        if [ $finish -eq 2 ]; then
            res=$(node $gitRoot/utils/changeStatus.ts $year 1)

            if [ $comp -eq 50 ]; then
                sed -E 's/\*  \[(.+) '$year': \*\*(.+ \/ .+)\*\* \((\d*).+\)\]\('$year'\)/${YEARFIN}/g' "$gitRoot/README.tmp" | envsubst >"$gitRoot/README.md"
            else
                daysFin=$(sed -n -E 's/\*  \[(.+) '$year': \*\*(.+) \/ .+\*\* \((\d*).+\)\]\('$year'\)/\2/gp' "$gitRoot/README.tmp")
                sed -E 's/\*  \[(.+) '$year': \*\*(.+) \/ .+\*\* \((\d*).+\)\]\('$year'\)/${YEARWIP_1}'$((daysFin + 1))'${YEARWIP_2}/g' "$gitRoot/README.tmp" | envsubst >"$gitRoot/README.md"
            fi

            sed -E 's/\*  \[.+ Day '$day': [a-zA-Z ]+\]\(.*\)/${LISTFIN}/g' "$gitRoot/$year/README.tmp" | envsubst >"$gitRoot/$year/README.md"
        fi

        rm "$gitRoot/README.tmp"
        rm "$gitRoot/$year/README.tmp"
    else
        if [ $comp -eq 50 ]; then
            cp "$gitRoot/README.md" "$gitRoot/README.tmp"
            res=$(node $gitRoot/utils/changeStatus.ts $year 1)
            sed -E 's/\*  \[(.+) '$year': \*\*(.+ \/ .+)\*\* \((\d*).+\)\]\('$year'\)/${YEARFIN}/g' "$gitRoot/README.tmp" | envsubst >"$gitRoot/README.md"
            rm "$gitRoot/README.tmp"
        fi
    fi
fi
