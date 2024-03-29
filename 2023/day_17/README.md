# Answers

| Part 1 | Part 2 |
| ------ | ------ |
| `866`  | `1010` |

## --- Day 17: Clumsy Crucible ---

The lava starts flowing rapidly once the Lava Production Facility is operational. As you leave, the reindeer offers you a parachute, allowing you to quickly reach Gear Island.

As you descend, your bird's-eye view of Gear Island reveals why you had trouble finding anyone on your way up: half of Gear Island is empty, but the half below you is a giant factory city!

You land near the gradually-filling pool of lava at the base of your new _lavafall_. Lavaducts will eventually carry the lava throughout the city, but to make use of it immediately, Elves are loading it into large [crucibles](https://en.wikipedia.org/wiki/Crucible) on wheels.

The crucibles are top-heavy and pushed by hand. Unfortunately, the crucibles become very difficult to steer at high speeds, and so it can be hard to go in a straight line for very long.

To get Desert Island the machine parts it needs as soon as possible, you'll need to find the best way to get the crucible _from the lava pool to the machine parts factory_. To do this, you need to minimize _heat loss_ while choosing a route that doesn't require the crucible to go in a _straight line_ for too long.

Fortunately, the Elves here have a map (your puzzle input) that uses traffic patterns, ambient temperature, and hundreds of other parameters to calculate exactly how much heat loss can be expected for a crucible entering any particular city block.

For example:

```
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
```

Each city block is marked by a single digit that represents the _amount of heat loss if the crucible enters that block_. The starting point, the lava pool, is the top-left city block; the destination, the machine parts factory, is the bottom-right city block. (Because you already start in the top-left block, you don't incur that block's heat loss unless you leave that block and then return to it.)

Because it is difficult to keep the top-heavy crucible going in a straight line for very long, it can move _at most three blocks_ in a single direction before it must turn 90 degrees left or right. The crucible also can't reverse direction; after entering each city block, it may only turn left, continue straight, or turn right.

One way to _minimize heat loss_ is this path:

```
2<em>></em><em>></em>34<em>^</em><em>></em><em>></em><em>></em>1323
32<em>v</em><em>></em><em>></em><em>></em>35<em>v</em>5623
32552456<em>v</em><em>></em><em>></em>54
3446585845<em>v</em>52
4546657867<em>v</em><em>></em>6
14385987984<em>v</em>4
44578769877<em>v</em>6
36378779796<em>v</em><em>></em>
465496798688<em>v</em>
456467998645<em>v</em>
12246868655<em><</em><em>v</em>
25465488877<em>v</em>5
43226746555<em>v</em><em>></em>
```

This path never moves more than three consecutive blocks in the same direction and incurs a heat loss of only `<em>102</em>`.

Directing the crucible from the lava pool to the machine parts factory, but not moving more than three consecutive blocks in the same direction, _what is the least heat loss it can incur?_

-----------------

## --- Part Two ---

The crucibles of lava simply aren't large enough to provide an adequate supply of lava to the machine parts factory. Instead, the Elves are going to upgrade to _ultra crucibles_.

Ultra crucibles are even more difficult to steer than normal crucibles. Not only do they have trouble going in a straight line, but they also have trouble turning!

Once an ultra crucible starts moving in a direction, it needs to move _a minimum of four blocks_ in that direction before it can turn (or even before it can stop at the end). However, it will eventually start to get wobbly: an ultra crucible can move a maximum of _ten consecutive blocks_ without turning.

In the above example, an ultra crucible could follow this path to minimize heat loss:

```
2<em>></em><em>></em><em>></em><em>></em><em>></em><em>></em><em>></em><em>></em>1323
32154535<em>v</em>5623
32552456<em>v</em>4254
34465858<em>v</em>5452
45466578<em>v</em><em>></em><em>></em><em>></em><em>></em>
143859879845<em>v</em>
445787698776<em>v</em>
363787797965<em>v</em>
465496798688<em>v</em>
456467998645<em>v</em>
122468686556<em>v</em>
254654888773<em>v</em>
432267465553<em>v</em>
```

In the above example, an ultra crucible would incur the minimum possible heat loss of `<em>94</em>`.

Here's another example:

```
111111111111
999999999991
999999999991
999999999991
999999999991
```

Sadly, an ultra crucible would need to take an unfortunate path like this one:

```
1<em>></em><em>></em><em>></em><em>></em><em>></em><em>></em><em>></em>1111
9999999<em>v</em>9991
9999999<em>v</em>9991
9999999<em>v</em>9991
9999999<em>v</em><em>></em><em>></em><em>></em><em>></em>
```

This route causes the ultra crucible to incur the minimum possible heat loss of `<em>71</em>`.

Directing the _ultra crucible_ from the lava pool to the machine parts factory, _what is the least heat loss it can incur?_