const input = `9 12 17 23 28 40 101 333 1036 2906 7508 18265 42466 95247 207297 439378 908879 1836876 3628951 7009831 13241340
16 21 21 27 61 159 385 872 1932 4323 9832 22434 50423 110087 231720 469035 913368 1714449 3109967 5466677 9336393
-3 -2 11 59 179 432 931 1903 3821 7673 15477 31204 62335 122353 234557 437682 793917 1400032 2402455 4017281 6556347
5 14 39 91 180 329 607 1196 2514 5427 11608 24166 48841 96493 188594 369462 732851 1477424 3017293 6192561 12653786
4 11 35 92 212 450 912 1813 3602 7223 14634 29790 60452 121508 241177 472898 918689 1776028 3433515 6668092 13052479
9 31 73 154 316 636 1251 2420 4654 8964 17320 33499 64659 124263 237476 450991 850575 1591685 2951571 5415712 9817654
2 -5 0 46 184 502 1146 2356 4534 8376 15141 27226 49408 91460 173440 335957 659454 1299601 2551270 4962878 9538508
9 29 57 93 137 200 324 619 1347 3132 7461 17774 41640 94830 208648 442931 909203 1812561 3528867 6749341 12754729
2 19 55 116 213 367 626 1108 2095 4219 8813 18583 38961 80941 167066 343829 706615 1448481 2953644 5974818 11969164
17 38 73 124 193 288 439 732 1370 2787 5885 12555 26823 57308 122316 260008 547931 1139136 2326573 4654010 9101057
3 4 16 44 93 168 274 416 599 828 1108 1444 1841 2304 2838 3448 4139 4916 5784 6748 7813
4 2 1 1 2 4 7 11 16 22 29 37 46 56 67 79 92 106 121 137 154
18 42 79 140 239 388 592 844 1120 1374 1533 1492 1109 200 -1466 -4172 -8258 -14126 -22245 -33156 -47477
22 32 43 59 88 161 359 839 1842 3653 6473 10179 14042 16760 17888 23410 61781 224142 757081 2264784 6131769
18 32 55 93 163 317 689 1569 3504 7423 14795 27881 50275 88216 153710 271513 493774 929034 1796915 3527045 6931707
12 32 79 173 349 663 1202 2121 3751 6848 13093 26027 52747 106955 214436 422902 819642 1562992 2937955 5453373 10009365
7 13 11 2 -3 27 159 533 1450 3569 8322 18733 40921 86650 177309 349596 662928 1208467 2120778 3598892 5962308
1 -2 4 34 114 286 613 1184 2119 3574 5746 8878 13264 19254 27259 37756 51293 68494 90064 116794 149566
10 4 -9 -28 -46 -50 -21 66 242 544 1015 1704 2666 3962 5659 7830 10554 13916 18007 22924 28770
20 32 49 80 144 270 497 874 1460 2324 3545 5212 7424 10290 13929 18470 24052 30824 38945 48584 59920
7 12 20 43 118 319 771 1666 3281 5998 10326 16925 26632 40489 59773 86028 121099 167168 226792 302943 399050
-8 -11 -12 -9 16 108 346 846 1760 3271 5584 8913 13464 19414 26886 35920 46440 58217 70828 83611 95616
14 39 91 186 342 582 935 1429 2068 2783 3345 3226 1392 -3990 -15951 -39247 -81038 -151745 -266113 -444510 -714494
8 19 37 74 159 359 823 1856 4037 8415 16856 32675 61764 114511 208926 375739 667440 1176901 2080921 3746922 6990423
14 12 11 10 12 30 106 369 1183 3478 9419 23652 55473 122396 255748 509091 970460 1779608 3151659 5408782 9021706
13 32 61 100 149 208 277 356 445 544 653 772 901 1040 1189 1348 1517 1696 1885 2084 2293
14 34 64 107 174 289 499 902 1723 3496 7455 16312 35729 77017 162005 331813 662901 1297346 2502309 4791491 9180169
14 44 94 184 353 673 1273 2373 4328 7682 13232 22102 35827 56447 86611 129691 189906 272456 383666 531140 723925
-4 -8 -11 -13 -9 35 220 766 2078 4826 10039 19213 34433 58509 95126 149008 226096 333740 480905 678391 939067
17 45 86 134 181 234 343 636 1367 3003 6406 13206 26511 52160 100795 191108 354709 643161 1137838 1963382 3305665
12 35 80 168 330 613 1107 2002 3692 6974 13461 26471 52924 107259 219186 448356 910932 1825761 3591574 6911566 12987998
14 30 58 93 129 174 280 591 1412 3302 7194 14545 27519 49206 83880 137299 217050 332942 497450 726213 1038589
1 2 16 61 174 420 902 1782 3333 6052 10874 19537 35158 63090 112140 196238 336657 564894 926332 1484813 2328262
4 16 27 30 30 67 257 870 2472 6172 14051 29944 60975 120762 236303 462750 914505 1828960 3693634 7493604 15183353
17 39 80 146 253 444 819 1595 3225 6615 13477 26833 51630 95337 168301 283659 457073 708276 1071113 1629894 2624053
21 37 57 74 76 46 -38 -203 -481 -909 -1529 -2388 -3538 -5036 -6944 -9329 -12263 -15823 -20091 -25154 -31104
14 22 39 65 100 144 197 259 330 410 499 597 704 820 945 1079 1222 1374 1535 1705 1884
28 56 111 204 347 553 828 1164 1564 2161 3533 7365 17667 42824 98830 214143 436692 843670 1554859 2750354 4693683
5 11 12 15 46 166 502 1312 3122 6995 15023 31203 63047 124750 243809 475208 931648 1846528 3701387 7476068 15125493
-1 10 40 102 216 409 715 1185 1943 3366 6529 14159 32526 75032 168842 366883 769151 1559902 3071638 5894008 11057820
1 -3 1 30 110 273 553 994 1706 3045 6053 13385 31111 72105 162395 353132 743167 1521237 3043481 5973316 11530356
-4 -6 -4 4 20 46 84 136 204 290 396 524 676 854 1060 1296 1564 1866 2204 2580 2996
12 20 39 79 147 251 412 700 1328 2875 6786 16442 39341 91324 204367 440297 913940 1830742 3545897 6654553 12125839
11 7 -2 -16 -35 -59 -88 -122 -161 -205 -254 -308 -367 -431 -500 -574 -653 -737 -826 -920 -1019
0 9 45 120 251 473 857 1546 2831 5307 10202 20102 40578 83794 176269 374947 799160 1691827 3532750 7242629 14542913
8 11 20 35 56 83 116 155 200 251 308 371 440 515 596 683 776 875 980 1091 1208
16 28 49 94 191 379 706 1235 2070 3418 5707 9784 17221 30761 54940 96925 167612 283032 466117 748882 1175083
1 2 23 85 210 418 729 1180 1876 3117 5697 11574 25289 56819 127081 278223 592387 1225140 2463659 4825507 9221956
12 12 15 35 107 306 773 1758 3707 7439 14485 27701 52341 97954 181941 336789 625680 1176766 2257405 4430603 8875273
-9 -2 31 110 262 525 969 1763 3330 6651 13817 29011 60282 122847 245392 482207 936389 1803368 3450471 6558240 12364210
15 19 25 35 53 91 188 467 1269 3416 8673 20532 45612 96443 197550 399286 809122 1660592 3460420 7292804 15430850
-4 -5 -6 -7 -8 -9 -10 -11 -12 -13 -14 -15 -16 -17 -18 -19 -20 -21 -22 -23 -24
19 34 55 91 149 240 395 693 1313 2634 5419 11128 22411 43855 83184 153594 279405 511274 967237 1938969 4153263
-6 0 18 53 116 222 385 612 893 1178 1326 1000 -538 -4784 -14443 -33412 -64190 -96623 -72487 210571 1337220
26 36 45 59 100 226 561 1335 2934 5960 11301 20211 34400 56134 88345 134751 199986 289740 410909 571755 782076
8 5 -1 -3 18 97 296 741 1711 3808 8251 17388 35641 71330 140223 272350 524863 1006068 1920244 3651352 6919349
14 25 45 74 112 159 215 280 354 437 529 630 740 859 987 1124 1270 1425 1589 1762 1944
17 33 56 90 140 206 282 378 606 1418 4177 12414 34426 88387 212030 480514 1038934 2161352 4358874 8580474 16592201
11 32 64 110 177 278 426 616 791 788 260 -1430 -5347 -13158 -27346 -51468 -90461 -151000 -241912 -374650 -563831
5 15 39 96 226 500 1036 2037 3880 7299 13721 25852 48717 91609 171902 322588 606983 1146859 2175403 4136020 7865996
2 8 14 20 26 32 38 44 50 56 62 68 74 80 86 92 98 104 110 116 122
15 31 60 114 218 415 776 1430 2651 5074 10160 21091 44350 92328 187400 368025 697551 1276545 2259620 3877896 6468410
10 26 55 104 187 323 534 843 1272 1840 2561 3442 4481 5665 6968 8349 9750 11094 12283 13196 13687
2 5 9 33 121 354 877 1969 4199 8725 17810 35659 69745 132947 247225 450591 811671 1462047 2669628 5004089 9702488
15 24 41 74 124 182 227 235 226 408 1540 5765 18423 51846 133014 318424 721873 1564440 3261219 6566852 12812294
-2 0 2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38
-6 -7 -10 -4 46 206 585 1367 2880 5732 11094 21333 41450 82256 167093 345463 719622 1494719 3070414 6203494 12288718
18 28 33 41 68 137 280 543 994 1734 2911 4737 7508 11627 17630 26215 38274 54928 77565 107881 147924
25 52 98 175 298 479 714 964 1137 1084 628 -338 -1583 -1796 3477 27381 105930 332349 936199 2457694 6116817
6 14 34 75 148 268 465 826 1602 3428 7720 17334 37620 78159 155945 302032 576606 1103646 2148406 4282929 8722724
10 22 55 124 244 430 709 1153 1942 3466 6475 12286 23056 42130 74473 127195 210178 336814 524863 797440 1184140
7 17 42 92 193 410 888 1918 4040 8199 15973 29893 53879 93852 158732 262471 428817 702685 1176128 2044122 3717329
1 -8 -22 -43 -63 -56 36 340 1148 3141 7866 18688 42603 93561 198348 406662 807863 1558102 2923346 5346563 9551577
23 49 100 191 344 607 1086 1989 3682 6774 12296 22138 40089 74137 141204 276325 549585 1096115 2167396 4216389 8035054
20 26 32 38 44 50 56 62 68 74 80 86 92 98 104 110 116 122 128 134 140
23 51 104 202 371 635 999 1418 1747 1667 582 -2518 -9233 -21973 -44227 -80886 -138625 -226349 -355708 -541686 -803269
2 3 -1 -9 -19 -33 -61 -109 -107 306 2275 8713 26120 67812 159541 349181 723300 1435261 2752303 5133251 9354615
18 36 66 108 162 228 306 396 498 612 738 876 1026 1188 1362 1548 1746 1956 2178 2412 2658
16 31 67 144 297 596 1174 2260 4218 7604 13271 22587 37916 63716 109049 193156 357280 688465 1365063 2739702 5484191
14 33 53 75 109 189 395 883 1940 4106 8438 17041 34084 67705 133570 261511 507806 977531 1864355 3519631 6569283
16 39 90 178 322 577 1080 2132 4347 8930 18203 36591 72421 141092 270462 509684 943202 1712137 3045708 5305348 9043260
18 22 35 72 165 383 859 1837 3776 7579 15064 29883 59265 117302 231226 453703 887532 1736058 3406295 6717772 13317787
0 -5 -11 -8 20 93 232 455 772 1179 1651 2134 2536 2717 2478 1549 -424 -3893 -9423 -17708 -29588
4 3 1 2 17 67 186 424 850 1555 2655 4294 6647 9923 14368 20268 27952 37795 50221 65706 84781
5 25 62 119 190 261 322 397 610 1325 3427 8849 21497 48781 104025 210103 404731 747937 1332332 2296915 3845264
11 15 19 23 27 31 35 39 43 47 51 55 59 63 67 71 75 79 83 87 91
26 40 49 54 66 115 276 724 1830 4310 9439 19342 37374 68601 120394 203148 331138 523524 805517 1209718 1777642
16 34 61 106 198 413 918 2045 4418 9169 18308 35383 66734 124038 229746 429011 815884 1589788 3173611 6451884 13233382
18 23 28 33 38 43 48 53 58 63 68 73 78 83 88 93 98 103 108 113 118
18 24 29 52 127 303 644 1229 2152 3522 5463 8114 11629 16177 21942 29123 37934 48604 61377 76512 94283
8 22 62 155 340 668 1202 2017 3200 4850 7078 10007 13772 18520 24410 31613 40312 50702 62990 77395 94148
10 23 41 64 92 125 163 206 254 307 365 428 496 569 647 730 818 911 1009 1112 1220
-1 -1 4 14 29 49 74 104 139 179 224 274 329 389 454 524 599 679 764 854 949
16 33 52 79 139 290 651 1452 3115 6388 12591 24117 45516 85892 164182 320539 640106 1300839 2665990 5456151 11057729
8 12 16 20 24 28 32 36 40 44 48 52 56 60 64 68 72 76 80 84 88
-10 -13 0 42 125 260 457 725 1072 1505 2030 2652 3375 4202 5135 6175 7322 8575 9932 11390 12945
1 14 40 96 210 421 779 1345 2191 3400 5066 7294 10200 13911 18565 24311 31309 39730 49756 61580 75406
12 12 14 18 24 32 42 54 68 84 102 122 144 168 194 222 252 284 318 354 392
17 36 77 158 311 603 1173 2306 4592 9252 18746 37813 75160 146191 277588 515451 940411 1696124 3042475 5452504 9783573
12 18 27 44 75 143 311 712 1591 3374 6806 13258 25411 48727 94528 186391 373474 758314 1554277 3201892 6597863
26 44 77 133 223 380 703 1451 3226 7298 16139 34247 69355 134134 248513 442753 761426 1268464 2053457 3239393 4992047
6 13 22 50 141 393 999 2302 4864 9549 17620 30850 51647 83193 129597 196062 289066 416557 588162 815410 1111969
12 12 8 0 -12 -28 -48 -72 -100 -132 -168 -208 -252 -300 -352 -408 -468 -532 -600 -672 -748
9 16 29 68 172 421 972 2113 4337 8444 15704 28180 49463 86394 152974 278788 526165 1023324 2025379 4021872 7919178
21 41 74 125 199 317 545 1036 2085 4197 8168 15179 26903 45625 74375 117074 178693 265425 384870 546233 760535
22 34 43 49 52 52 49 43 34 22 7 -11 -32 -56 -83 -113 -146 -182 -221 -263 -308
17 25 43 97 226 490 997 1957 3770 7157 13355 24444 44022 78850 143093 269057 533091 1114673 2423987 5363679 11841566
0 17 51 104 172 250 355 587 1257 3117 7730 18018 39023 78910 150232 271465 468806 778209 1247613 1939292 2932230
3 4 6 14 50 162 435 1014 2171 4494 9366 20062 44055 97537 213828 458514 956459 1940823 3845436 7486991 14438180
11 10 16 40 104 247 531 1047 1921 3320 5458 8602 13078 19277 27661 38769 53223 71734 95108 124252 160180
25 46 84 159 307 583 1064 1852 3077 4900 7516 11157 16095 22645 31168 42074 55825 72938 93988 119611 150507
14 17 19 29 62 132 255 489 1046 2524 6337 15477 35829 78380 162817 323200 616634 1136175 2029647 3526737 5977892
6 9 10 10 19 61 183 473 1089 2302 4577 8786 16814 33159 68756 149344 332488 740203 1618460 3441286 7086477
6 13 21 29 28 -6 -126 -442 -1171 -2708 -5688 -10944 -19125 -29419 -36087 -19815 72919 377551 1218752 3345545 8432973
0 10 34 92 216 450 859 1557 2768 4939 8928 16298 29795 54282 98988 183389 352227 711607 1510478 3314930 7365303
3 9 15 16 7 -17 -61 -130 -229 -363 -537 -756 -1025 -1349 -1733 -2182 -2701 -3295 -3969 -4728 -5577
8 3 9 46 147 371 826 1712 3409 6661 12945 25179 49067 95721 186961 366235 720962 1427039 2834277 5623932 11087871
-3 7 36 92 183 331 594 1094 2049 3805 6861 11878 19665 31145 47327 69352 98749 138139 192770 273464 401819
13 13 15 30 75 169 327 554 848 1246 1997 4028 9993 26377 67392 161787 364251 773887 1563367 3023958 5633779
3 17 39 73 128 220 373 627 1080 2029 4342 10296 25259 60778 139858 305474 633641 1252665 2370497 4312395 7571346
2 10 35 86 183 380 804 1728 3711 7853 16228 32573 63326 119121 216863 382521 654792 1089804 1767041 2796688 4328609
10 11 3 -24 -79 -164 -268 -361 -388 -263 137 978 2475 4898 8578 13913 21374 31511 44959 62444 84789
1 0 2 13 46 121 265 512 903 1486 2316 3455 4972 6943 9451 12586 16445 21132 26758 33441 41306
11 25 61 133 261 479 851 1495 2615 4541 7777 13057 21409 34227 53351 81155 120643 175553 250469 350941 483613
-2 -4 -1 14 53 136 294 572 1032 1756 2849 4442 6695 9800 13984 19512 26690 35868 47443 61862 79625
13 27 57 106 182 303 510 909 1773 3742 8165 17635 36778 73372 139894 255624 449477 763789 1259353 2022088 3171830
16 21 21 21 34 90 255 660 1540 3283 6489 12039 21174 35584 57507 89838 136248 201313 290653 411081 570762
17 21 29 46 81 148 267 465 777 1247 1929 2888 4201 5958 8263 11235 15009 19737 25589 32754 41441
19 23 35 64 124 237 438 783 1361 2326 4004 7204 14003 29573 66277 152675 352948 807788 1818238 4013579 8681655
0 -7 -6 17 91 278 703 1603 3402 6819 13016 23793 41837 71032 116837 186739 290788 442221 658182 960545 1376847
14 22 38 69 138 297 653 1427 3079 6556 13769 28497 58073 116455 229654 445015 846564 1579586 2888832 5176317 9086620
10 13 12 4 -13 -35 -47 -11 177 813 2694 7804 20774 51953 123830 284272 633116 1373797 2909852 6018488 12151349
5 20 42 78 144 268 493 880 1511 2492 3956 6066 9018 13044 18415 25444 34489 45956 60302 78038 99732
11 29 70 152 304 577 1063 1934 3534 6584 12597 24655 48781 96260 187473 358256 670845 1233871 2241020 4048246 7328614
18 23 30 56 141 369 900 2013 4160 8031 14630 25362 42131 67449 104556 157551 231534 332759 468798 648716 883257
6 1 -9 -18 -8 60 264 767 1922 4475 9923 21146 43597 87691 173707 341670 670522 1313681 2562139 4951938 9440626
-3 -7 -11 -15 -19 -23 -27 -31 -35 -39 -43 -47 -51 -55 -59 -63 -67 -71 -75 -79 -83
9 24 56 115 207 336 515 798 1350 2585 5425 11770 25334 53139 108299 215624 423895 834322 1667626 3419933 7214001
-1 5 22 47 73 89 80 27 -93 -307 -646 -1145 -1843 -2783 -4012 -5581 -7545 -9963 -12898 -16417 -20591
9 24 51 95 162 259 394 576 815 1122 1509 1989 2576 3285 4132 5134 6309 7676 9255 11067 13134
4 19 40 74 139 275 565 1173 2423 4984 10297 21482 45092 94228 193680 387895 752670 1411497 2557414 4481002 7604769
18 21 24 27 30 33 36 39 42 45 48 51 54 57 60 63 66 69 72 75 78
12 32 63 107 184 345 685 1356 2580 4662 8003 13113 20624 31303 46065 65986 92316 126492 170151 225143 293544
-6 -7 6 46 127 262 468 795 1409 2775 6005 13458 29704 62992 127393 245823 454188 806933 1384320 2301806 3721941
17 35 71 137 252 438 713 1093 1634 2570 4639 9751 22278 51519 116472 255205 543299 1129701 2304827 4626213 9143196
13 8 -4 -15 -7 50 215 632 1676 4292 10714 25883 60104 133884 286661 592610 1189487 2331512 4486104 8509125 15957443
15 35 71 132 240 450 880 1753 3454 6615 12270 22183 39577 70756 128676 240719 465433 928147 1895637 3929842 8197566
17 24 47 97 193 366 667 1193 2151 3984 7580 14567 27652 50873 89477 148884 231809 332044 422593 434737 223103
9 34 69 122 211 364 619 1024 1637 2526 3769 5454 7679 10552 14191 18724 24289 31034 39117 48706 59979
-1 -3 -9 -7 38 187 536 1247 2627 5305 10603 21281 43006 87277 177413 361140 737354 1512767 3120142 6461139 13398341
25 36 46 54 59 60 56 46 29 4 -30 -74 -129 -196 -276 -370 -479 -604 -746 -906 -1085
5 15 32 69 145 278 474 727 1074 1807 4054 11134 31406 83816 208054 482228 1052315 2179439 4313340 8203331 15061695
13 25 42 71 119 203 375 762 1621 3409 6868 13125 23807 41171 68249 109008 168525 253177 370846 531139 745623
-3 -5 1 23 66 145 306 652 1373 2778 5315 9530 15842 23878 30896 28497 -3643 -108939 -372747 -952815 -2126694
6 10 27 64 139 299 658 1462 3191 6718 13562 26296 49202 89303 157947 273170 463124 770922 1261325 2029776 3214373
14 29 67 152 318 614 1112 1917 3188 5197 8479 14166 24678 45140 86386 171579 351079 735708 1569828 3387999 7342199
11 27 41 49 47 31 -3 -59 -141 -253 -399 -583 -809 -1081 -1403 -1779 -2213 -2709 -3271 -3903 -4609
15 34 77 167 348 693 1304 2296 3750 5612 7508 8437 6279 -3032 -27063 -80125 -190327 -414734 -870689 -1797537 -3672666
23 34 45 56 67 78 89 100 111 122 133 144 155 166 177 188 199 210 221 232 243
24 31 45 76 140 260 463 773 1200 1725 2281 2730 2836 2234 395 -3413 -10168 -21141 -37947 -62600 -97572
13 16 25 45 86 170 341 677 1298 2361 4035 6454 9646 13423 17205 19841 20043 20096 41621 178157 747286
19 38 69 129 259 531 1053 1972 3475 5788 9173 13923 20355 28801 39597 53070 69523 89218 112357 139061 169347
10 11 22 43 70 95 106 87 18 -125 -370 -749 -1298 -2057 -3070 -4385 -6054 -8133 -10682 -13765 -17450
5 6 10 22 61 178 496 1293 3163 7325 16234 34839 73239 152292 315222 650873 1338585 2731548 5506034 10919552 21243545
1 11 44 126 312 704 1486 2998 5880 11326 21497 40151 73557 131769 230345 392605 652531 1058421 1677418 2601044 3951878
8 8 13 35 96 233 500 959 1656 2585 3654 4689 5556 6570 9565 20527 56056 159230 437843 1153327 2918408
4 2 10 47 138 319 646 1203 2104 3484 5474 8155 11486 15201 18670 20719 19404 11734 -6662 -41929 -102446
3 24 56 109 207 384 690 1235 2323 4776 10629 24501 56135 124896 267513 551257 1096531 2116520 3989142 7391877 13559887
3 10 17 24 31 38 45 52 59 66 73 80 87 94 101 108 115 122 129 136 143
18 22 24 27 36 57 95 163 337 936 2999 9417 27418 73676 184219 432664 962248 2039814 4143534 8100915 15299772
17 26 35 52 112 289 706 1543 3043 5516 9341 14966 22906 33739 48100 66673 90181 119374 155015 197864 248660
17 20 29 55 122 289 694 1639 3747 8234 17351 35063 68044 127079 228976 399103 674677 1108944 1776401 2779223 4255070
4 -1 -1 21 98 295 743 1697 3632 7424 14733 28831 56347 110835 219891 439023 877981 1749286 3455119 6739475 12952375
9 24 41 60 81 104 129 156 185 216 249 284 321 360 401 444 489 536 585 636 689
11 12 23 57 127 246 427 683 1027 1472 2031 2717 3543 4522 5667 6991 8507 10228 12167 14337 16751
10 5 1 4 35 149 459 1175 2679 5669 11415 22180 41889 77231 139654 249335 443453 793363 1439052 2654956 4968676
14 22 44 91 172 306 546 1015 1954 3782 7168 13115 23056 38962 63462 99975 152854 227542 330740 470587 656852
22 31 44 74 140 274 536 1053 2117 4395 9325 19821 41551 85412 172625 345460 689496 1378263 2759114 5511580 10928014
21 44 77 117 156 181 185 201 385 1196 3751 10471 26180 59873 127431 255631 487877 892164 1571881 2680161 4438596
23 35 52 93 195 425 912 1915 3942 7941 15614 29983 56509 105429 196725 370618 709279 1380605 2724382 5418899 10800205
-5 -6 5 47 150 372 832 1756 3524 6692 11939 19848 30377 41853 49449 43645 10638 -60044 -148830 -135893 359569
1 22 64 147 300 554 929 1413 1948 2469 3097 4686 10100 26900 72627 184675 437983 975580 2059538 4153249 8050208
-4 2 20 55 119 241 492 1051 2350 5361 12140 26836 57521 119414 240372 469918 893584 1654980 2988772 5268677 9075675
28 48 73 103 138 178 223 273 328 388 453 523 598 678 763 853 948 1048 1153 1263 1378
-7 -3 19 85 245 581 1208 2260 3848 5976 8414 10574 11553 10754 9959 18559 65179 221985 654469 1723825 4200213
-2 2 22 71 168 348 681 1314 2560 5069 10136 20248 40077 78336 151296 289402 549438 1036216 1939974 3598769 6599386
9 12 14 10 -2 -10 37 274 992 2743 6486 13800 27245 51075 92756 166257 299209 548548 1034768 2016384 4048798
8 0 2 38 144 369 781 1498 2782 5262 10410 21517 45661 97617 207472 435091 896848 1813636 3594718 6980304 13277922
11 24 57 130 269 510 918 1632 2954 5513 10553 20411 39256 74137 136316 242715 417053 689854 1095929 1667128 2417071
-9 2 37 109 242 483 920 1721 3223 6114 11765 22783 43870 83087 153636 276287 482591 819034 1352301 2175833 3417874
8 13 18 23 28 33 38 43 48 53 58 63 68 73 78 83 88 93 98 103 108
10 22 53 105 184 312 542 971 1753 3141 5644 10482 20669 43261 93583 202606 429092 878672 1732679 3290335 6028798
-6 4 33 86 172 316 578 1089 2138 4390 9388 20590 45310 98073 206102 418113 818871 1555545 2891228 5323243 9852929
-6 -13 -26 -47 -82 -146 -272 -526 -1024 -1935 -3423 -5400 -6771 -3447 16384 82658 264858 713739 1738764 3945895 8473892
-6 4 34 96 220 466 931 1753 3134 5445 9558 17707 35474 76045 168901 376970 829562 1784042 3738474 7632218 15194152
24 49 91 164 306 606 1246 2558 5096 9723 17713 30868 51650 83328 130140 197470 292040 422117 597735 830932 1136002
5 18 54 132 277 527 946 1647 2843 4969 8965 16906 33362 68255 142680 300354 629293 1301304 2641308 5244860 10171079
19 49 101 188 326 534 833 1240 1764 2446 3557 6190 13667 34443 87539 211988 482345 1033007 2094925 4049280 7503852
-5 -7 -12 -25 -56 -109 -153 -60 527 2464 7631 19923 47103 104256 220191 449225 892835 1739775 3341734 6358991 12045138
2 -1 -12 -33 -64 -97 -109 -47 212 948 2754 6782 15101 31182 60466 110750 191522 309997 458812 585145 521986`;

export default input;