# Mentat 1.0.5 - Sources of the bundled R 4.6.0, R packages and Node.js

Ships inside the package at `resources/runtime/mentat/THIRD-PARTY-NOTICES/R-and-Node-SOURCES.md`. Generated 2026-10-17, read-only, from the published Mentat 1.0.3 preview ZIP (`Mentat-1.0.3-win-x64-unsigned-preview.zip`, sha256 `54aa6ea0e26d34f2947a2d18ca06313733627dfa319732f0c14e09275e90fb40`), whose native R and Node files 1.0.5 ships unchanged: the build restores them from that ZIP and checks every file against `ops/desktop/packaging/mentat-native-runtime.sha256` (7,711 files, manifest sha256 `c24d1ebaaab90a71a085fa6590897bb469a4cda5f7e97a5b74a9be6f95078c73`).

**This is not legal clearance and not a written offer.** It records where the corresponding source is and the sha256 of the exact upstream source files, computed on 2026-10-17 by streaming each file from the URL given (nothing was rebuilt). OPEN, for the owner: the GPL written source offer and the contact address for source requests are not set; no contact is given here.

## R 4.6.0 (GPL-2 | GPL-3)

- Binary: the CRAN Windows build of R 4.6.0 (`library/base/DESCRIPTION` Built: R 4.6.0; 2026-04-24), copied unmodified by `prepare_r.py` except that `unins*`, `tests`, `Rprofile.site` and `Renviron.site` are left out. Location: `resources/runtime/mentat/native/R/`.
- License texts shipped with it: `native/R/COPYING`, `native/R/doc/COPYING`, `native/R/doc/COPYRIGHTS`, `native/R/share/licenses/` (GPL-2, GPL-3, LGPL-2, LGPL-2.1, LGPL-3 and others).
- Corresponding source: <https://cran.r-project.org/src/base/R-4/R-4.6.0.tar.gz> (40,916,004 bytes), sha256 `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec`. All releases: <https://cran.r-project.org/src/base/>. The base packages below are part of this tarball; the recommended packages are also on CRAN at the URLs listed.
- Windows toolchain and static libraries used by the CRAN Windows builds: see `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-2.md` section 3 and Addenda 4 and 6 (shipped next to this file).

## R packages

97 library directories: 15 base, 15 recommended, 67 contributed. License = the DESCRIPTION `License` field. License files = files of that name in the installed package folder (`native/R/library/<package>/`); "-" means none, in which case the license is the one named (for GPL and LGPL, the texts in `native/R/share/licenses/`). Source = the CRAN source tarball of that exact version (the contrib path while it is current, the Archive path after), with the sha256 of the file served there on 2026-10-17.

| Package | Version | Priority | License | License files | Source | sha256 |
|---|---|---|---|---|---|---|
| base | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| compiler | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| datasets | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| graphics | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| grDevices | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| grid | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| methods | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| parallel | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| splines | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| stats | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| stats4 | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| tcltk | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| tools | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| translations | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| utils | 4.6.0 | base | Part of R 4.6.0 | - | part of R-4.6.0.tar.gz | `b8dc9b4543660c7b596b87938df532394350360976527d344228ee0ed12e45ec` (R-4.6.0.tar.gz) |
| boot | 1.3-32 | recommended | Unlimited | - | <https://cran.r-project.org/src/contrib/boot_1.3-32.tar.gz> | `3a05aced6fea42a5c310c5c6ab7a2019f69f757f5e77c4961183977747136c97` |
| class | 7.3-23 | recommended | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/Archive/class/class_7.3-23.tar.gz> | `4d1adb12eae045f15641516d795177dd1d3074c0a86ac633000507c4822891f1` |
| cluster | 2.1.8.2 | recommended | GPL (>= 2) | - | <https://cran.r-project.org/src/contrib/Archive/cluster/cluster_2.1.8.2.tar.gz> | `4cc898a58baade883bb33aa0ee9be1723f321bd85ad91562cbd1e43dfdb41585` |
| codetools | 0.2-20 | recommended | GPL | - | <https://cran.r-project.org/src/contrib/codetools_0.2-20.tar.gz> | `3be6f375ec178723ddfd559d1e8e85bfeee04a5fbaf9f53f2f844e1669fea863` |
| foreign | 0.8-91 | recommended | GPL (>= 2) | COPYRIGHTS | <https://cran.r-project.org/src/contrib/foreign_0.8-91.tar.gz> | `fdf6c2c6077659a7dc069e58528d3c7cd93b6571c708d98994565386afce5298` |
| KernSmooth | 2.23-26 | recommended | Unlimited | - | <https://cran.r-project.org/src/contrib/Archive/KernSmooth/KernSmooth_2.23-26.tar.gz> | `b465bdac197f7faa787e625412ae03d1b7c2c134b1c924cfeb775faf9c4da73e` |
| lattice | 0.22-9 | recommended | GPL (>= 2) | - | <https://cran.r-project.org/src/contrib/Archive/lattice/lattice_0.22-9.tar.gz> | `b72ad4ed2e5269fa7cf668e46f83a9b5d9d5f8fdcbc5b9886531ca19dffca4ba` |
| MASS | 7.3-65 | recommended | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/Archive/MASS/MASS_7.3-65.tar.gz> | `b07ef1e3c364ce56269b4a8a7759cc9f87c876554f91293437bb578cfe38172f` |
| Matrix | 1.7-5 | recommended | GPL (>= 2) / file LICENCE | LICENCE | <https://cran.r-project.org/src/contrib/Archive/Matrix/Matrix_1.7-5.tar.gz> | `308b0edd7bcb023a8bb50cc5cec98e66b3658c94a5badfb1ce6024e595fa8a83` |
| mgcv | 1.9-4 | recommended | GPL (>= 2) | - | <https://cran.r-project.org/src/contrib/mgcv_1.9-4.tar.gz> | `a98159698afb269e06a46cac1f945bf2b3427a2dd587c6f2efd67ede90089372` |
| nlme | 3.1-169 | recommended | GPL (>= 2) | - | <https://cran.r-project.org/src/contrib/Archive/nlme/nlme_3.1-169.tar.gz> | `51b92f1b543d2eb5915478965dab05a9094e1675a160138d49963eb3a0e7fdb8` |
| nnet | 7.3-20 | recommended | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/Archive/nnet/nnet_7.3-20.tar.gz> | `8f33e17e0eb161cfbc1bfee4875baa23c66fcdba8215a64a63402b099db2b555` |
| rpart | 4.1.27 | recommended | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/rpart_4.1.27.tar.gz> | `3183552d74f02749a70e2b989591c561ca0f7c146034f415748acc8480ca4050` |
| spatial | 7.3-18 | recommended | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/Archive/spatial/spatial_7.3-18.tar.gz> | `cc46693d69745af8ec95b557e7a8ee4e1865df69dc0d25723629fd8e9ea43055` |
| survival | 3.8-6 | recommended | LGPL (>= 2) | COPYRIGHTS | <https://cran.r-project.org/src/contrib/Archive/survival/survival_3.8-6.tar.gz> | `9a4c0a35d86c64ec5a6e6cf179ab22dcffb5ce1d313d2880a09f1e53422699d7` |
| AsioHeaders | 1.30.2-1 | contributed | BSL-1.0 | COPYRIGHTS | <https://cran.r-project.org/src/contrib/AsioHeaders_1.30.2-1.tar.gz> | `1be43b48a4cc704ef84b5673b4fc78323709fd0d61c18dbd364ac89a38e2ab31` |
| askpass | 1.2.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/askpass_1.2.1.tar.gz> | `6c2106a74c44a748f2cea795d9686e27a0058a90debcfd8558b62b06aec0c7dd` |
| bit | 4.6.0 | contributed | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/bit_4.6.0.tar.gz> | `48fe21c5d04c7b724d695eeb60074395c0c631a7fb234e2075de92471445de08` |
| bit64 | 4.8.2 | contributed | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/Archive/bit64/bit64_4.8.2.tar.gz> | `be5907acc6ebc389e9fb3fb6760b07ca4ee9c6da2fe1c286277bc67b9af5db9f` |
| blob | 1.3.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/blob_1.3.0.tar.gz> | `d4d2aeb8d17683bbfc256a7541e282af9663a752988a21a6ba72a4ab268c7331` |
| brio | 1.1.5 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/brio_1.1.5.tar.gz> | `a9f22335ea39039de25bb27bccd5ff1ffb2b743579b31d150b6b91c9ea81d0b8` |
| cachem | 1.1.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/cachem_1.1.0.tar.gz> | `550839fc2ae5d865db475ba2c1714144f07fa0c052c72135b0e4a70287492e21` |
| callr | 3.8.0 | contributed | MIT + file LICENSE | COPYRIGHTS<br>LICENSE | <https://cran.r-project.org/src/contrib/callr_3.8.0.tar.gz> | `a16b50e41ddbbf2bac236572e3e68c4ef9c76b88faf5cf840c79524c49000b06` |
| cellranger | 1.1.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/cellranger_1.1.0.tar.gz> | `5d38f288c752bbb9cea6ff830b8388bdd65a8571fd82d8d96064586bd588cf99` |
| chromote | 0.5.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/chromote_0.5.1.tar.gz> | `b0caa76507a2dea3c524c84d99ca0ac77eb8b46b60adc02fbc80c67741b354b5` |
| cli | 3.6.6 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/cli_3.6.6.tar.gz> | `b2b58d6dd82f5798b335e39c00591686a01fd3e94399ef898e146173e36f18f9` |
| clubSandwich | 0.7.0 | contributed | GPL-3 | - | <https://cran.r-project.org/src/contrib/clubSandwich_0.7.0.tar.gz> | `f3cd9cd5840022b8d1354dce3e7e4a820edcd47411b9f95bdd200c4e040032ed` |
| cpp11 | 0.5.5 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/cpp11_0.5.5.tar.gz> | `72486beb0605c1229bf3d422cd536224af8dc09bd389a3116f62f4c7705c62f4` |
| crayon | 1.5.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/crayon_1.5.3.tar.gz> | `3e74a0685541efb5ea763b92cfd5c859df71c46b0605967a0b5dbb7326e9da69` |
| curl | 7.1.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/curl/curl_7.1.0.tar.gz> | `74f079b6306acc18fbe60c18dbaac805703fb6579e6ab398f3437377695fd8a9` |
| data.table | 1.18.4 | contributed | MPL-2.0 / file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/data.table/data.table_1.18.4.tar.gz> | `d65256f0050a6443770d5982b5098a2a8c894f9675ed17053416c7815cbddeb9` |
| DBI | 1.3.0 | contributed | LGPL (>= 2.1) | - | <https://cran.r-project.org/src/contrib/DBI_1.3.0.tar.gz> | `13def8e90cbe41205a0dfcf585a6a7ea79ce10d45969789e82613c7ce3d5fb18` |
| desc | 1.4.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/desc_1.4.3.tar.gz> | `54468da73dd78fc9e7c565c41cfe3331802c2134b2e61a9ad197215317092f26` |
| diffobj | 0.3.8 | contributed | GPL-2 / GPL-3 | COPYRIGHTS | <https://cran.r-project.org/src/contrib/Archive/diffobj/diffobj_0.3.8.tar.gz> | `a41f93e19a5029e2eab5f2b5df10a22818ad11fa24d822a323f8e1cf7ec081d6` |
| digest | 0.6.39 | contributed | GPL (>= 2) | - | <https://cran.r-project.org/src/contrib/digest_0.6.39.tar.gz> | `8bf048b49b2d17077138fae758bda56bbd53278d9437f2fdeaedf979c90a13c9` |
| evaluate | 1.0.5 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/evaluate_1.0.5.tar.gz> | `47aac79f889a828a5f8b4756cb972d7c2966bb984cbae17a4bd2389a73270794` |
| fastmap | 1.2.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/fastmap_1.2.0.tar.gz> | `b1da04a2915d1d057f3c2525e295ef15016a64e6667eac83a14641bbd83b9246` |
| fs | 2.1.0 | contributed | MIT + file LICENSE | COPYRIGHTS<br>LICENSE | <https://cran.r-project.org/src/contrib/fs_2.1.0.tar.gz> | `7088af1117d65c4ceb144b532e323f197fc8243b1d704bf6edf40774789829cd` |
| glue | 1.8.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/glue_1.8.1.tar.gz> | `1c55905d3efc3d5c199ceb0bd12218e97f0d4c64df6038ff41ecef415478a122` |
| hms | 1.1.4 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/hms_1.1.4.tar.gz> | `efc525f797b62b3740d06c6fa8202593ab5aa4fc1edeefb76b6eb9be89e87b94` |
| httr2 | 1.3.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/httr2_1.3.0.tar.gz> | `031990311482479da4bb910369606c73bb2b2456b8b8c1ab877ad8fbb0703c75` |
| ids | 1.0.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/ids_1.0.1.tar.gz> | `b6212a186063c23116c5cbd3cca65dbb8977dd737261e4526ebee8f64852cfe8` |
| jsonlite | 2.0.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/jsonlite_2.0.0.tar.gz> | `75eb910c82b350ec33f094779da0f87bff154c232e4ae39c9896a9b89f3ac82d` |
| later | 1.4.8 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/later_1.4.8.tar.gz> | `ce5d88b3fd1df409eaa21aa53bf20b1a9331f75cd69e7e9b2a27b40d2290d219` |
| lifecycle | 1.0.5 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/lifecycle_1.0.5.tar.gz> | `61841e3e6edba056a88355a3f1d6698ab8d5d9cb3c05f2af0ec5a44ab516f8ee` |
| magrittr | 2.0.5 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/magrittr_2.0.5.tar.gz> | `3f5b5b1d4e6d12807a95c50b6c88cb1d8af2c5eb5213f08bfe58f278eca2ed23` |
| memoise | 2.0.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/memoise_2.0.1.tar.gz> | `f85034ee98c8ca07fb3cd826142c1cd1e1e5747075a94c75a45783bbc4fe2deb` |
| openssl | 2.4.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/openssl/openssl_2.4.1.tar.gz> | `ffa7ba564f9258c13bf76242b6f967b2c53a8944a0590800e249c8e0ae92d63c` |
| otel | 0.2.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/otel_0.2.0.tar.gz> | `ef8afe5a1bc8074bbeb8a84134699ef348a1f8ac629ffba25ee43ea7bcd8dd17` |
| pdftools | 3.9.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/pdftools/pdftools_3.9.0.tar.gz> | `da20bb9b59d8ced2aec9d73e4265b339e6fb39c32f91e03143931f20eceb88d6` |
| pillar | 1.11.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/pillar_1.11.1.tar.gz> | `056ce154238c9b5b8d5dcbcb52e1bc51d33870ce08c8a9ca9496478bd59f4653` |
| pkgbuild | 1.4.8 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/pkgbuild_1.4.8.tar.gz> | `2e4259202ce90fc452f31ff36cfe14ff21a38e9fd71c3015e25018b9079924cb` |
| pkgconfig | 2.0.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/pkgconfig_2.0.3.tar.gz> | `330fef440ffeb842a7dcfffc8303743f1feae83e8d6131078b5a44ff11bc3850` |
| pkgload | 1.5.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/pkgload_1.5.3.tar.gz> | `5e539f91ca36b8ed80933101baf2a57462b9342c68556f5d4dcb86c01639df28` |
| praise | 1.0.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/praise_1.0.0.tar.gz> | `5c035e74fd05dfa59b03afe0d5f4c53fbf34144e175e90c53d09c6baedf5debd` |
| prettyunits | 1.2.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/prettyunits_1.2.0.tar.gz> | `f059f27e2a5c82e351fe05b87ad712f7afc273c651450453f59d99af5deeacea` |
| processx | 3.9.0 | contributed | MIT + file LICENSE | COPYRIGHTS<br>LICENSE | <https://cran.r-project.org/src/contrib/processx_3.9.0.tar.gz> | `cdfef9035405891d8b104b258a40f62656f215aba7dcdc9f3226203c4c8fb354` |
| progress | 1.2.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/progress_1.2.3.tar.gz> | `ea2b079b894de85c3ab12088c9c52aec06432245047a961d5b4b8aa6889f9276` |
| promises | 1.5.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/promises_1.5.0.tar.gz> | `bb68fd4065cc072996aed416f0b2388f58738797a3a38024720c29d67164747d` |
| ps | 1.9.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/ps_1.9.3.tar.gz> | `7b227f0627709a2073daf960ac612a0b87d03e18f7dd5c1938048ed440ef2e68` |
| qpdf | 1.4.1 | contributed | Apache License 2.0 | - | <https://cran.r-project.org/src/contrib/qpdf_1.4.1.tar.gz> | `3ab2c6f099b7f17e383ccb0c4fdd8c27a657ba629967d2edb3c768fc3dc315c6` |
| R6 | 2.6.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/R6_2.6.1.tar.gz> | `59c6eba8b1b912eb7e104f65053235604be853425ee67c152ac4e86a1f2073b4` |
| Rcpp | 1.1.1-1.1 | contributed | GPL (>= 2) | - | <https://cran.r-project.org/src/contrib/Archive/Rcpp/Rcpp_1.1.1-1.1.tar.gz> | `32e5d5fee4080c8ca315f31b74c3eaa6367a1900e92e860e00390c9565f5fbe1` |
| readxl | 1.5.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/readxl/readxl_1.5.0.tar.gz> | `908347d27f455ba6f42dc0b0619656166cfd916b3e2cffee4eff867ce5014ce7` |
| rematch | 2.0.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/rematch_2.0.0.tar.gz> | `15daf7bf2907aef8503635bc8631fce9fd75248a1fc2496825588c4bdf785c26` |
| rlang | 1.3.0 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/rlang_1.3.0.tar.gz> | `80aa537d49e72265f443a15e8936128af583caa5e572086518b503cbf064279c` |
| rprojroot | 2.1.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/rprojroot_2.1.1.tar.gz> | `473989bbef45fd9cd68f68dc317b14c9f42de5cea4b55fd6ba9011f25e0517e9` |
| RSQLite | 3.53.3 | contributed | LGPL (>= 2.1) | - | <https://cran.r-project.org/src/contrib/RSQLite_3.53.3.tar.gz> | `82946aac5e2869da5fdaf57d0e4afeee3d4deac21d9eaeffb5f743273a93736c` |
| sandwich | 3.1-3 | contributed | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/sandwich_3.1-3.tar.gz> | `960006cf4fcbada936b43acd04ddd8c0d1255570f41dda046ce778873f546134` |
| sys | 3.4.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/sys_3.4.3.tar.gz> | `051e7332e3074db826efef9059067721864f9d70adc55bbcae3a72e5ae83913a` |
| testthat | 3.3.2 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/testthat_3.3.2.tar.gz> | `5d2e2fa2c3dcb523afb6898c02be9544c24c1c7e0789149c436fef768a409808` |
| tibble | 3.3.1 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/tibble_3.3.1.tar.gz> | `fb309f8a1939021b237c7e85ff7ad6e8ff5acd57a6230d220a452094b492b28f` |
| utf8 | 1.2.6 | contributed | Apache License (== 2.0) / file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/utf8_1.2.6.tar.gz> | `4589f8b72291329e70b7f3a8c20f2feb4e7764eebad2e6976bc9a3eee7686ce9` |
| uuid | 1.2-2 | contributed | MIT + file LICENSE | COPYING<br>LICENSE | <https://cran.r-project.org/src/contrib/uuid_1.2-2.tar.gz> | `b1b73b87180d7b15095e6b33092ccf9dbd7ed3177791682711b8151ebbe9025f` |
| vctrs | 0.7.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/vctrs_0.7.3.tar.gz> | `b45078413e06ac624dddb7221a3a43908b405c8abec09822cb86638d30b0435b` |
| waldo | 0.6.2 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/waldo_0.6.2.tar.gz> | `b22a746be625eec49736d2a0a18d96c45c14d97e30e42bc81a0740f3194e07fa` |
| websocket | 1.4.4 | contributed | GPL-2 | - | <https://cran.r-project.org/src/contrib/websocket_1.4.4.tar.gz> | `9fcd00271e461ec9deda4aef83155f9f8c9125490123fc11121df48e11f4142e` |
| withr | 3.0.2 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/withr/withr_3.0.2.tar.gz> | `0a3a05f493d275cca4bf13c8c1b95a1a4eed7f83b2493f41fde02ce3fc92c1a3` |
| writexl | 1.5.4 | contributed | BSD_2_clause + file LICENSE | AUTHORS<br>COPYRIGHT<br>LICENSE | <https://cran.r-project.org/src/contrib/Archive/writexl/writexl_1.5.4.tar.gz> | `d0574a29ea22bd78785f50c7cd23c6e10036f65321e26d55a694e931467660d3` |
| xml2 | 1.5.2 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/xml2/xml2_1.5.2.tar.gz> | `ed87cfa478f9e4c398288963cf7b0e1a66ba08f54d909b261a4a6c35944f50ab` |
| zip | 2.3.3 | contributed | MIT + file LICENSE | LICENSE | <https://cran.r-project.org/src/contrib/Archive/zip/zip_2.3.3.tar.gz> | `d0450b24f8b7b937033ad748b5fad76d23e9464f3e8c0c57a256d64829249a52` |
| zoo | 1.8-15 | contributed | GPL-2 / GPL-3 | - | <https://cran.r-project.org/src/contrib/Archive/zoo/zoo_1.8-15.tar.gz> | `c0d139b7d3dee4f28202bc8d82fd76109af26530c43e39a051b1eb145d1861ea` |

## Node.js v24.18.0 (MIT)

- Binary: `resources/runtime/mentat/native/Node/node.exe`, sha256 `9a4eb5f1c29c6a2e93852ead46b999e284a6a5ca8bab4d4e241d587d025a52de`, equal to `win-x64/node.exe` in <https://nodejs.org/dist/v24.18.0/SHASUMS256.txt>. License and bundled-component notices: `native/Node/LICENSE.txt`.
- Corresponding source: <https://nodejs.org/dist/v24.18.0/node-v24.18.0.tar.gz>, sha256 `c8348067b41d8739ec69fd4da615cd8995ad6a76eb53e84a7fa7291c8a477eb7` (from the same SHASUMS256.txt).

## Other components

- Python 3.12.10 and the bundled wheels: `Python-and-packages.md` in this folder (generated by the build from each wheel; the wheels are pinned by sha256 in `ops/desktop/packaging/mentat-runtime.constraints.txt`).
- Electron 44.7.2 / Chromium and the app.asar npm packages: `Mentat-1.0.3-THIRD-PARTY-SOURCES.md` sections 3.1 and 5, and its Addenda (unchanged toolchain versions in 1.0.5).
