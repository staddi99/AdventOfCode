const input = `#.###########################################################################################################################################
#.#.................#...#...#...###.....#####...#.....###...#...###...#.......#.....#...#...###...###...#...###...###...#...#.....#...#.....#
#.#.###############.#.#.#.#.#.#.###.###.#####.#.#.###.###.#.#.#.###.#.#.#####.#.###.#.#.#.#.###.#.###.#.#.#.###.#.###.#.#.#.#.###.#.#.#.###.#
#.#...#.............#.#...#.#.#...#.#...#.....#.#...#...#.#...#.#...#.#.....#...#...#.#.#.#.#...#.###.#.#.#.#...#.....#.#.#.#...#...#.#...#.#
#.###.#.#############.#####.#.###.#.#.###.#####.###.###.#.#####.#.###.#####.#####.###.#.#.#.#.###.###.#.#.#.#.#########.#.#.###.#####.###.#.#
#.#...#.....#...#...#...#...#.#...#.#...#.....#.#...#...#...#...#...#.#...#...#...###.#.#.#.#...#.#...#.#.#.#.#.........#.#.#...#.....#...#.#
#.#.#######.#.#.#.#.###.#.###.#.###.###.#####.#.#.###.#####.#.#####.#.#.#.###.#.#####.#.#.#.###.#.#.###.#.#.#.#.#########.#.#.###.#####.###.#
#.#.#.......#.#.#.#.#...#...#.#...#.#...#.....#.#...#.#...#.#...>.>.#...#.#...#.>.>.#.#.#.#.###.#.#.#...#.#.#.#.###.....#.#.#.#...#...#.#...#
#.#.#.#######.#.#.#.#.#####.#.###.#.#.###.#####.###.#.#.#.#.#####v#######.#.#####v#.#.#.#.#.###.#.#.#.###.#.#.#.###.###.#.#.#.#.###.#.#.#.###
#.#.#...#...#.#.#.#.#...#...#.#...#.#.###.....#...#.#.#.#.#.....#.......#.#...###.#.#.#.#.#...#.#...#...#.#.#.#.>.>.#...#.#.#.#.#...#.#.#...#
#.#.###v#.#.#.#.#.#.###.#.###.#.###.#.#######.###.#.#.#.#.#####.#######.#.###.###.#.#.#.#.###.#.#######.#.#.#.###v###.###.#.#.#.#.###.#.###.#
#...###.>.#.#.#.#.#.#...#...#.#.#...#...###...#...#.#.#.#.......#...#...#.....#...#...#.#...#.#.#.......#.#...#...#...#...#.#.#...#...#.#...#
#######v###.#.#.#.#.#.#####.#.#.#.#####.###.###.###.#.#.#########.#.#.#########.#######.###.#.#.#.#######.#####.###.###.###.#.#####.###.#.###
#.....#...#.#.#.#.#.#.....#.#.#.#...#...#...###...#.#...#...#.....#...###...#...###.....#...#...#.....#...#.....###...#...#.#.#.....#...#...#
#.###.###.#.#.#.#.#.#####.#.#.#.###.#.###.#######.#.#####.#.#.###########.#.#.#####.#####.###########.#.###.#########.###.#.#.#.#####.#####.#
#...#.....#...#.#.#...#...#.#.#.#...#.>.>.#...#...#.#...#.#.#.........###.#.#.....#.....#.........###.#.###.......#...#...#.#.#.....#.#.....#
###.###########.#.###.#.###.#.#.#.#####v###.#.#.###.#.#.#.#.#########.###.#.#####.#####.#########.###.#.#########.#.###.###.#.#####.#.#.#####
###.....#...###...###.#.#...#.#...#...#.....#.#.....#.#...#.....#...#.....#.#.....###...#...#.....#...#...###...#.#...#.#...#.#.....#.#.....#
#######.#.#.#########.#.#.###.#####.#.#######.#######.#########.#.#.#######.#.#######.###.#.#.#####.#####.###.#.#.###.#.#.###.#.#####.#####.#
#.......#.#.........#.#.#...#...#...#...#.....###.....#.......#...#...#.....#.......#.#...#.#.....#.#.....#...#.#...#.#.#...#.#.#...#.#.....#
#.#######.#########.#.#.###.###.#.#####.#.#######.#####.#####.#######.#.###########.#.#.###.#####.#.#.#####.###.###.#.#.###.#.#.#.#.#.#.#####
#.#.....#.#.........#.#.###.#...#.....#...###.....#.....#####.......#.#.#...........#...###.#.....#...###...###...#.#.#...#...#...#...#.....#
#.#.###.#.#.#########.#.###.#.#######.#######.#####.###############.#.#.#.#################.#.###########.#######.#.#.###.#################.#
#.#.#...#.#.........#.#.#...#.#.....#.......#.......#...............#...#.................#.#.#.....#.....#...###...#.....###...............#
#.#.#.###.#########.#.#.#.###.#.###.#######.#########.###################################.#.#.#.###.#.#####.#.###############.###############
#...#...#.#.......#.#...#.....#...#.........#.....#...#.................#.......#...#.....#...#...#.#...###.#...#...#...###...#.........#...#
#######.#.#.#####.#.#############.###########.###.#.###.###############.#.#####.#.#.#.###########.#.###.###.###.#.#.#.#.###.###.#######.#.#.#
#...###...#.....#...###...###...#.........#...#...#.....#####...#...#...#.#...#...#.#...#.........#...#.....#...#.#...#...#.....###...#...#.#
#.#.###########v#######.#.###.#.#########.#.###.#############.#.#.#.#.###.#.#.#####.###.#.###########.#######.###.#######.#########.#.#####.#
#.#...........#.>.###...#.#...#...........#...#...#...#...#...#...#...###...#.....#.....#.......#...#.......#.###.#.......#...#.....#.....#.#
#.###########.#v#.###.###.#.#################.###.#.#.#.#.#.#####################.#############.#.#.#######.#.###.#.#######.#.#.#########.#.#
#...........#...#.#...#...#...........###...#.#...#.#.#.#.#...#...#...###...#...#.#...#.....###...#.#...###...#...#...#...#.#.#.........#...#
###########.#####.#.###.#############.###.#.#.#.###.#.#.#.###.#.#.#.#.###.#.#.#.#.#.#.#.###.#######.#.#.#######.#####.#.#.#.#.#########.#####
#.........#.....#.#...#.#...###.......#...#...#.#...#.#.#.#...#.#.#.#...#.#...#...#.#.#...#.....###...#...#...#...#...#.#.#.#.#...#.....#...#
#.#######.#####.#.###.#.#.#.###.#######.#######.#.###.#.#.#.###.#.#.###.#.#########.#.###.#####.#########.#.#.###.#.###.#.#.#.#.#.#v#####.#.#
#.......#.#.....#.#...#.#.#...#...#...#.......#.#.#...#.#.#...#.#.#...#.#.....###...#...#.....#.#...#.....#.#...#.#...#.#.#.#...#.>.#...#.#.#
#######.#.#.#####.#.###.#.###.###v#.#.#######.#.#.#.###.#.###v#.#.###.#.#####v###.#####.#####.#.#.#.#.#####.###.#.###.#.#.#.#######v#.#.#.#.#
#.......#.#.....#.#.###...#...#.>.>.#...#...#.#.#.#.#...#...>.>.#...#.#...#.>.>.#...#...#...#.#.#.#.#...###...#...###.#.#.#.......#.#.#...#.#
#.#######.#####.#.#.#######.###.#v#####.#.#.#.#.#.#.#.#######v#####.#.###.#.#v#.###.#.###.#.#.#.#.#.###v#####.#######.#.#.#######.#.#.#####.#
#.......#.#.....#.#.......#.....#...#...#.#.#.#.#.#...#####...#####.#.###...#.#.#...#...#.#.#.#...#...>.>...#.......#...#.#...#...#.#.#.....#
#######.#.#.#####.#######.#########.#.###.#.#.#.#.#########.#######.#.#######.#.#.#####.#.#.#.#########v###.#######.#####.#.#.#.###.#.#.#####
#.......#...#...#.....#...###...#...#.#...#.#.#.#.....#.....#.....#.#.#.......#.#.....#...#.#.###...#...#...#.......#.....#.#.#.#...#.#.....#
#.###########.#.#####.#.#####.#.#.###.#.###.#.#.#####.#.#####.###.#.#.#.#######.#####.#####.#.###.#.#.###.###.#######.#####.#.#.#.###.#####.#
#.............#.....#...###...#...###...###...#.#.....#.......#...#...#.......#.#.....#.....#.#...#...###...#.......#.....#.#...#.....#.....#
###################.#######.###################.#.#############.#############.#.#.#####.#####.#.###########.#######.#####.#.###########.#####
#.........#.....#...###...#.....#.....#...#...#.#.#.......#...#.....#...#...#.#...#...#...#...#.....###...#.#.....#.....#...###...#...#.....#
#.#######.#.###.#.#####.#.#####.#.###.#.#.#.#.#.#.#.#####.#.#.#####.#.#.#.#.#.#####.#.###.#.#######.###.#.#.#.###.#####.#######.#.#.#.#####.#
#...#...#...###...#...#.#.#.....#.#...#.#...#.#...#.....#...#.......#.#.#.#.#.#...#.#.###.#.#...###.....#.#...###...#...#.......#...#.......#
###.#.#.###########.#.#.#.#.#####.#.###.#####.#########.#############.#.#.#.#.#.#.#.#.###.#.#.#.#########.#########.#.###.###################
#...#.#.#...#...###.#.#.#.#.......#...#.#.....#.....###.......#.....#.#...#.#...#...#...#.#.#.#.........#.........#.#.###...#...#...........#
#.###.#.#.#.#.#.###.#.#.#.###########.#.#.#####.###.#########.#.###.#.#####.###########.#.#.#.#########.#########.#.#.#####.#.#.#.#########.#
#.....#...#...#...#.#...#.#...#.......#.#...#...#...#...#.....#...#.#.....#.............#...#.#.....###...........#.#.#...#...#...#.........#
#################.#.#####.#.#.#.#######.###.#.###.###.#.#.#######.#.#####.###################.#.###.###############.#.#.#.#########.#########
#.......#.........#.#.....#.#.#.#...#...#...#...#...#.#.#...#...#.#.#...#.......#.....###...#...###.........#.....#...#.#.###.....#.#.....###
#.#####.#.#########.#.#####.#.#v#.#.#.###.#####.###.#.#.###.#.#.#.#.#.#.#######.#.###.###.#.###############.#.###.#####.#.###.###.#.#.###.###
#.....#.#.......#...#.#...#.#.>.>.#...#...#...#.#...#.#.###.#.#.#.#...#.#.......#.#...#...#.###.............#...#...#...#.#...#...#...###...#
#####.#.#######.#.###.#.#.#.###v#######.###.#.#.#.###.#.###v#.#.#.#####.#.#######.#.###.###.###.###############.###.#.###.#.###.###########.#
#...#.#.........#...#.#.#.#.###.......#...#.#.#.#...#.#.#.>.>.#.#.....#.#.......#.#...#...#...#.............#...#...#...#.#...#.#...#.......#
#.#.#.#############.#.#.#.#.#########.###.#.#.#.###.#.#.#.#v###.#####.#.#######.#.###.###.###.#############.#.###.#####.#.###.#.#.#.#.#######
#.#...#.....#...#...#...#...#.........###.#.#.#.###...#.#.#.###.#...#.#.#.......#.#...###.#...#...#.........#...#.#...#.#.###.#.#.#.#.....###
#.#####.###.#.#.#.###########.###########.#.#.#.#######.#.#.###.#.#.#.#.#.#######.#.#####.#.###.#.#v###########.#.#.#.#.#.###.#.#.#.#####.###
#.......###.#.#.#...........#...#.......#.#.#.#.......#.#.#...#.#.#.#.#.#.....###.#...#...#.#...#.>.>.#...#...#.#.#.#.#.#...#.#.#.#.#...#...#
###########v#.#.###########.###.#.#####.#.#.#.#######.#.#.###.#.#.#.#.#.#####v###.###.#.###.#.#####v#.#.#.#.#.#.#.#.#.#.###.#.#.#.#.#.#.###.#
#.........#.>.#.#...#.....#.#...#.#.....#...#...#...#.#.#.#...#...#...#...#.>.>...#...#...#...#.....#.#.#.#.#.#.#.#.#.#...#.#.#.#.#.#.#.#...#
#.#######.#v###.#.#.#.###.#.#.###.#.###########.#.#.#.#.#.#.#############.#.#v#####.#####.#####.#####.#.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#v###
#.....#...#.#...#.#...###.#.#...#.#.......#####.#.#.#.#...#.....###...###.#.#...#...#...#.....#.#...#...#.#.#...#.#.#...#.#.#.#.#.#.#.#.>.###
#####.#.###.#.###.#######.#.###.#.#######.#####.#.#.#.#########.###.#.###.#.###.#.###.#.#####.#.#.#.#####.#.#####.#.###.#.#.#.#.#.#.#.###v###
#.....#.....#...#.......#...###...#.....#.....#...#.#.#.........#...#...#.#.#...#.....#.#.....#...#.#.....#.....#.#...#...#.#.#...#.#.#...###
#.#############.#######.###########.###.#####.#####.#.#.#########.#####.#.#.#.#########.#.#########.#.#########.#.###.#####.#.#####.#.#.#####
#.............#.#.....#.....###...#...#.......#...#...#...........#.....#...#...#.....#...#.........#...#...#...#.#...#.....#.....#...#.....#
#############.#.#.###.#####.###.#.###.#########.#.#################.###########.#.###.#####.###########.#.#.#.###.#.###.#########.#########.#
#.............#...###.....#.#...#.###.#.........#.....#.......#...#.....###.....#.#...#...#...........#...#.#.###.#...#.#...#.....###...#...#
#.#######################.#.#.###.###.#.#############.#.#####.#.#.#####.###.#####.#.###.#.###########.#####.#.###.###.#.#.#.#.#######.#.#.###
#.#...#...###.........###...#...#.....#.#.............#.....#...#.......#...#...#.#...#.#.....#.......#...#.#...#.#...#...#...###...#.#...###
#.#.#.#.#.###.#######.#########.#######.#.#################.#############.###.#.#.###.#.#####.#.#######.#.#.###.#.#.#############.#.#.#######
#...#...#.....#.....#...#.....#...#.....#.#.....#...#.....#.#...#...#...#...#.#.#.#...#.#.....#.#...###.#.#.#...#...#...#...#...#.#.#...#####
###############.###.###.#.###.###.#.#####.#.###.#.#.#.###.#.#.#.#.#.#.#.###.#.#.#.#.###.#.#####.#.#.###.#.#.#.#######.#.#.#.#.#.#.#.###.#####
###.........#...###.....#...#.....#.#.....#.#...#.#...#...#...#...#...#.#...#.#...#...#.#.....#...#...#.#.#...#...#...#.#.#.#.#.#.#.###.....#
###.#######.#.#############.#######.#.#####.#.###.#####.###############.#.###.#######.#.#####.#######.#.#.#####.#.#.###.#.#.#.#.#.#.#######.#
#...#.....#...###...###...#.........#.....#.#...#...#...#...#...###.....#.....#...###...#.....#...#...#.#.#...#.#.#...#.#.#.#.#.#.#.#...#...#
#.###.###.#######.#.###.#.###############.#.###.###.#.###.#.#.#.###v###########.#.#######.#####.#.#v###.#.#.#.#.#.###.#.#.#.#.#.#.#.#v#.#.###
#.....###.......#.#...#.#.#...#.....#.....#...#...#.#...#.#...#...>.>.#####...#.#.###...#.#...#.#.>.>...#...#.#.#.#...#.#.#.#.#.#.#.>.#...###
###############.#.###.#.#.#.#.#.###.#.#######.###.#.###.#.#########v#.#####.#.#.#.###.#.#v#.#.#.###v#########.#.#.#.###.#.#.#.#.#.###v#######
#.......#.......#.#...#.#...#...#...#.....###...#.#.#...#...#.......#...#...#.#.#.#...#.>.>.#.#.###...#.....#.#.#.#...#.#.#.#.#.#.###.......#
#.#####.#v#######.#.###.#########.#######.#####.#.#.#.#####.#.#########.#.###.#.#.#.#####v###.#.#####.#.###.#.#.#.###.#.#.#.#.#.#.#########.#
#.....#.#.>.#...#.#...#.........#...#...#.#.....#...#.......#.......###...###.#.#...#.....###...#...#.#.#...#...#.#...#...#.#.#...###...#...#
#####.#.#v#.#.#.#.###.#########.###.#.#.#.#.#######################.#########.#.#####.###########.#.#.#.#.#######.#.#######.#.#######.#.#.###
###...#...#.#.#.#...#.#...#...#.#...#.#.#.#.........###...#.......#.#...#...#...###...#...###.....#.#...#...#...#.#.......#...#...#...#...###
###.#######.#.#.###.#.#.#.#.#.#.#.###.#.#v#########.###.#.#.#####.#.#.#.#.#.#######.###.#.###.#####.#######.#.#.#.#######.#####.#.#.#########
#...#.....#...#...#.#.#.#.#.#.#.#...#.#.>.>.#...#...#...#.#.....#.#...#...#...#...#.....#.....#.....#...###...#.#.#.......#.....#...###.....#
#.###.###.#######.#.#.#.#.#.#.#.###.#.###v#.#.#.#.###.###.#####.#.###########.#.#.#############.#####.#.#######.#.#.#######.###########.###.#
#...#...#...#...#...#.#.#.#.#.#.#...#.#...#...#...###...#.#...#.#.#...#...#...#.#...#...#.......###...#.........#...#...###...#...#...#.#...#
###.###.###.#.#.#####.#.#.#.#.#.#.###.#.###############.#.#.#.#.#.#.#.#.#.#.###.###.#.#.#.#########.#################.#.#####.#.#.#.#.#.#.###
#...#...###...#.....#.#.#.#.#...#.#...#.......#.........#...#.#.#...#...#.#...#...#...#...#...#.....#.................#...#...#.#.#.#.#.#.###
#.###.#############.#.#.#.#.#####.#.#########.#.#############.#.#########.###.###.#########.#.#.#####.###################.#.###.#.#.#.#.#.###
#.#...#...........#.#...#...###...#...#.......#...#.....#.....#.....#.....#...#...#...#.....#.#.......#...###.............#...#.#...#...#...#
#.#.###.#########.#.###########.#####.#.#########.#.###.#.#########.#.#####.###.###.#.#.#####.#########.#.###.###############.#.###########.#
#.#.###.........#.#.#.....#...#.......#.......###...#...#.....#...#.#.#...#...#.....#...#.....#.........#.#...#.....#...#...#...#...#...#...#
#.#.###########.#.#.#.###.#.#.###############.#######.#######.#.#.#.#.#.#.###.###########.#####.#########.#.###.###.#.#.#.#.#####.#.#.#.#.###
#...#...........#...#.#...#.#.#...#...........#.....#.......#.#.#...#...#.#...###...#.....#...#.........#.#.....#...#.#.#.#.#.....#.#.#.#.###
#####.###############.#.###.#.#.#.#.###########.###.#######.#.#.#########.#.#####.#.#.#####.#.#########.#.#######.###.#.#.#.#.#####.#.#.#.###
#.....#.........#...#.#...#.#.#.#.#...........#...#.###.....#.#...#...###...#...#.#.#.......#.....#.....#...#.....###.#.#.#.#.....#...#...###
#.#####.#######.#.#.#.###.#.#.#.#.###########.###.#.###.#####.###.#.#.#######.#.#.#.#############.#.#######.#.#######.#.#.#.#####v###########
#.#.....#.......#.#.#.#...#.#.#.#.###.........#...#.....#...#.....#.#.#.....#.#.#.#...#.....#.....#.......#.#...###...#.#.#...#.>.###...#...#
#.#.#####.#######.#.#.#.###.#.#.#.###v#########.#########.#.#######.#.#.###.#.#.#.###.#.###.#.###########.#.###.###.###.#.###.#.#v###.#.#.#.#
#...#...#.#...###.#.#.#.#...#.#.#...>.>.......#.........#.#.###...#.#.#.#...#.#.#.#...#...#...#...###...#.#.#...#...###...#...#.#.#...#...#.#
#####.#.#.#.#v###.#.#.#.#.###.#.#####v#######.#########.#.#.###.#.#.#.#.#.###.#.#.#.#####v#####.#.###.#.#.#.#v###.#########.###.#.#.#######.#
###...#...#.#.>.#.#.#.#.#.###.#.#.....#.......#...#...#.#.#.....#...#.#.#.#...#.#.#.#...>.>.#...#.#...#.#.#.>.>.#...#.......#...#...#.......#
###.#######.#v#.#.#.#.#.#.###.#.#.#####.#######.#.#.#.#v#.###########.#.#.#.###.#.#.#.###v#.#.###.#.###.#.###v#.###.#.#######.#######.#######
#...#...#...#.#.#.#.#.#.#...#...#.....#...#...#.#.#.#.>.>.#...###.....#.#.#...#.#.#.#.#...#...###.#.#...#.#...#.#...#.....#...#.....#.......#
#.###.#.#.###.#.#.#.#.#.###.#########.###.#.#.#.#.#.###v###.#.###.#####.#.###.#.#.#.#.#.#########.#.#.###.#.###.#.#######.#.###.###.#######.#
#.....#...#...#...#.#.#...#...#.......###.#.#.#.#.#.###.#...#...#.....#.#.#...#...#...#.........#.#.#...#.#...#.#.....###...###...#.........#
###########.#######.#.###.###.#.#########.#.#.#.#.#.###.#.#####.#####.#.#.#.###################.#.#.###.#.###.#.#####.###########.###########
#...#.......#####...#.###.#...#.........#...#.#.#.#...#.#.#.....#...#...#...#...#.......#.......#...###...#...#...#...#...........#...#.....#
#.#.#.###########.###.###.#.###########.#####.#.#.###.#.#.#.#####.#.#########.#.#.#####.#.#################.#####.#.###.###########.#.#.###.#
#.#.#...........#.#...###...#...........#...#.#.#.#...#.#.#.......#.......#...#...#...#...#...#...###.......#...#...#...#.........#.#.#.#...#
#.#.###########.#.#.#########.###########.#.#.#.#.#.###.#.###############.#.#######.#.#####.#.#.#.###.#######.#.#####.###.#######.#.#.#.#.###
#.#.............#...###.......#.........#.#.#...#.#.###...###...#...#...#.#.........#.......#...#...#...#...#.#.....#.....#.......#.#...#...#
#.#####################.#######.#######.#.#.#####.#.#########.#.#.#.#.#.#.#########################.###.#.#.#.#####.#######.#######.#######.#
#...#.............#...#...#.....#.......#.#.###...#...#.......#...#...#.#...###...###...#.......#...###...#...#...#.......#.......#.#.......#
###.#.###########.#.#.###.#.#####.#######.#.###.#####.#.###############.###.###.#.###.#.#.#####.#.#############.#.#######.#######.#.#.#######
###...#...........#.#...#...#...#.........#...#.......#...............#.....#...#...#.#...#...#...#####...#...#.#.........###.....#.#.#...###
#######.###########.###.#####.#.#############.#######################.#######.#####.#.#####.#.#########.#.#.#.#.#############.#####.#.#.#.###
#.......#...#...###...#.#.....#.......#.......#...#...................###...#...#...#.......#...#...#...#.#.#.#.........#.....#.....#...#...#
#.#######.#.#.#.#####.#.#.###########.#.#######.#.#.#####################.#.###.#.#############.#.#.#.###.#.#.#########.#.#####.###########.#
#...#.....#...#...#...#.#...........#...#.....#.#.#.................#.....#.....#.#.............#.#.#.#...#.#...#.....#.#.......#...........#
###.#.###########.#.###.###########.#####.###.#.#.#################.#.###########.#.#############.#.#.#.###v###.#.###.#.#########.###########
#...#.#...........#...#.###.....###...###...#.#.#...#...#...#.......#...........#.#.......#...#...#...#.#.>.>.#...#...#.#.....###...........#
#.###.#.#############.#.###.###.#####.#####.#.#.###.#.#.#.#.#.#################.#.#######.#.#.#.#######.#.###.#####.###.#.###.#############.#
#...#.#...........#...#...#...#.#.....#...#.#.#.#...#.#.#.#.#.###...#.....#.....#...#...#.#.#.#.......#.#.#...#...#.....#...#...#####.......#
###.#.###########.#.#####.###.#.#.#####.#.#.#.#.#.###.#.#.#.#v###.#.#.###.#.#######.#.#.#.#.#.#######.#.#.#.###.#.#########.###.#####.#######
#...#.#...........#...#...###.#.#...#...#.#.#...#.#...#.#.#.>.>.#.#.#.#...#.....#...#.#.#.#.#.#...#...#...#...#.#...###...#...#...#...#...###
#.###.#.#############.#.#####.#.###.#.###.#.#####.#.###.#.#####.#.#.#.#.#######.#.###.#.#v#.#.#.#.#.#########.#.###.###.#.###.###.#.###.#.###
#.#...#.......###...#.#.#...#.#.###.#...#.#.....#.#.#...#.....#.#.#.#.#.....#...#.#...#.>.>.#.#.#.#.......###...###...#.#.#...#...#...#.#...#
#.#.#########.###.#.#.#.#.#.#.#.###v###.#.#####.#.#.#.#######.#.#.#.#.#####.#.###.#.#########.#.#.#######.###########.#.#.#.###.#####.#.###.#
#...#...#.....#...#.#.#.#.#.#.#.#.>.>.#.#.#...#.#.#.#.....#...#...#.#.#.....#.#...#...###.....#.#...#...#.#...........#.#.#.#...#...#...#...#
#####.#.#.#####.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.#####.#.#######.#.#.#####.#.#####.###.#####.###.#.#.#.#.###########.#.#.#.###.#.#####v###
#.....#...#...#.#...#.#.#.#.#.#.#.#...#.#.#.#.#.#.#.#.....#.......#.#.#...#...#.#...#...#.....#...#.#.#.#.#.#...#.....#.#.#.#...#.#...#.>.###
#.#########.#.#.#.###.#.#.#.#.#.#.#.###.#.#.#.#.#.#.#.###########.#.#.###.#.###.#.#.###.#####.###.#.#.#.#.#.#.#.#.###.#.#.#.###.#.###.#.#v###
#...........#...#.....#...#...#...#.....#...#...#...#.............#...###...###...#.....#####.....#...#...#...#...###...#...###...###...#...#
###########################################################################################################################################.#`;

export default input;
