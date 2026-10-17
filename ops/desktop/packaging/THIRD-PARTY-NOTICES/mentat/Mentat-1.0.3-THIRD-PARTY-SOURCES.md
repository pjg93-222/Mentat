# Mentat 1.0.3 - Third-Party Sources and Licenses

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3 (unsigned manual-install preview).
Generated 2026-10-16 from the B2 unpacked build (`win-unpacked`), read-only. Paths below are relative to `win-unpacked/` inside the installer/zip, i.e. under the install directory. R was not executed; versions come from files on disk.

## 1. Summary of status

* Node.js `node.exe` is byte-identical to the upstream release (SHA-256 matches nodejs.org `SHASUMS256.txt` for v24.18.0).
* R, the R packages, Python and the wheels are upstream builds (CRAN Windows binaries, python.org layout, PyPI wheels). They were not modified by Mentat, with the exceptions listed in section 7, but only Node was verified by hash against upstream. The R and Python claims are from build provenance and file metadata, not a byte comparison.
* Electron: `Mentat.exe` is the Electron 44.7.2 runtime re-branded (name, version resources, icon) by electron-builder, so it is not byte-identical to upstream `electron.exe`. Chromium/Electron library files (`*.dll`, `*.pak`, `*.bin`) are unmodified as far as is known; not hash-verified.
* Gaps (license texts that are not in the package) are listed in section 8.

## 2. R 4.6.0 (GPL-2 | GPL-3)

* Version: **R 4.6.0** (`library/base/DESCRIPTION`, `README.R-4.6.0`; `Built: R 4.6.0; ; 2026-04-24 08:08:52 UTC; windows`). Windows binary distribution from CRAN, 64-bit (`bin/x64`).
* License: GNU GPL version 2 or version 3 (`COPYING`, `doc/COPYING`, `share/licenses/GPL-2`, `share/licenses/GPL-3`). Some R components carry other licenses (LGPL, public domain, etc.) as described in `doc/COPYRIGHTS`; the base and recommended packages are covered by the R license text unless their own DESCRIPTION states otherwise.
* Corresponding source: https://cran.r-project.org/src/base/R-4/R-4.6.0.tar.gz (HTTP 200 checked 2026-10-16). Archive of all releases: https://cran.r-project.org/src/base/
* Install location: `resources/runtime/mentat/native/R/`.

### 2.1 R packages: 97 installed (15 base, 15 recommended, 67 contributed from CRAN)

Base packages (priority "base") are part of the R source tarball above and have no separate tarball. Recommended and contributed packages are CRAN packages; the "Current" URL is the CRAN contrib path (valid while that version is current), and the "Archive" URL is where the same file lives once CRAN supersedes it.

| Package | Version | License (DESCRIPTION) | Source: current contrib | Source: Archive |
|---|---|---|---|---|
| AsioHeaders | 1.30.2-1 | BSL-1.0 | https://cran.r-project.org/src/contrib/AsioHeaders_1.30.2-1.tar.gz | - |
| askpass | 1.2.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/askpass_1.2.1.tar.gz | - |
| base | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| bit | 4.6.0 | GPL-2 / GPL-3 | https://cran.r-project.org/src/contrib/bit_4.6.0.tar.gz | - |
| bit64 | 4.8.2 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/bit64/bit64_4.8.2.tar.gz |
| blob | 1.3.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/blob_1.3.0.tar.gz | - |
| boot | 1.3-32 | Unlimited | https://cran.r-project.org/src/contrib/boot_1.3-32.tar.gz | - |
| brio | 1.1.5 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/brio_1.1.5.tar.gz | - |
| cachem | 1.1.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/cachem_1.1.0.tar.gz | - |
| callr | 3.8.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/callr_3.8.0.tar.gz | - |
| cellranger | 1.1.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/cellranger_1.1.0.tar.gz | - |
| chromote | 0.5.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/chromote_0.5.1.tar.gz | - |
| class | 7.3-23 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/class/class_7.3-23.tar.gz |
| cli | 3.6.6 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/cli_3.6.6.tar.gz | - |
| clubSandwich | 0.7.0 | GPL-3 | https://cran.r-project.org/src/contrib/clubSandwich_0.7.0.tar.gz | - |
| cluster | 2.1.8.2 | GPL (>= 2) | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/cluster/cluster_2.1.8.2.tar.gz |
| codetools | 0.2-20 | GPL | https://cran.r-project.org/src/contrib/codetools_0.2-20.tar.gz | - |
| compiler | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| cpp11 | 0.5.5 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/cpp11_0.5.5.tar.gz | - |
| crayon | 1.5.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/crayon_1.5.3.tar.gz | - |
| curl | 7.1.0 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/curl/curl_7.1.0.tar.gz |
| data.table | 1.18.4 | MPL-2.0 / file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/data.table/data.table_1.18.4.tar.gz |
| datasets | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| DBI | 1.3.0 | LGPL (>= 2.1) | https://cran.r-project.org/src/contrib/DBI_1.3.0.tar.gz | - |
| desc | 1.4.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/desc_1.4.3.tar.gz | - |
| diffobj | 0.3.8 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/diffobj/diffobj_0.3.8.tar.gz |
| digest | 0.6.39 | GPL (>= 2) | https://cran.r-project.org/src/contrib/digest_0.6.39.tar.gz | - |
| evaluate | 1.0.5 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/evaluate_1.0.5.tar.gz | - |
| fastmap | 1.2.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/fastmap_1.2.0.tar.gz | - |
| foreign | 0.8-91 | GPL (>= 2) | https://cran.r-project.org/src/contrib/foreign_0.8-91.tar.gz | - |
| fs | 2.1.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/fs_2.1.0.tar.gz | - |
| glue | 1.8.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/glue_1.8.1.tar.gz | - |
| graphics | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| grDevices | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| grid | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| hms | 1.1.4 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/hms_1.1.4.tar.gz | - |
| httr2 | 1.3.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/httr2_1.3.0.tar.gz | - |
| ids | 1.0.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/ids_1.0.1.tar.gz | - |
| jsonlite | 2.0.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/jsonlite_2.0.0.tar.gz | - |
| KernSmooth | 2.23-26 | Unlimited | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/KernSmooth/KernSmooth_2.23-26.tar.gz |
| later | 1.4.8 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/later_1.4.8.tar.gz | - |
| lattice | 0.22-9 | GPL (>= 2) | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/lattice/lattice_0.22-9.tar.gz |
| lifecycle | 1.0.5 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/lifecycle_1.0.5.tar.gz | - |
| magrittr | 2.0.5 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/magrittr_2.0.5.tar.gz | - |
| MASS | 7.3-65 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/MASS/MASS_7.3-65.tar.gz |
| Matrix | 1.7-5 | GPL (>= 2) / file LICENCE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/Matrix/Matrix_1.7-5.tar.gz |
| memoise | 2.0.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/memoise_2.0.1.tar.gz | - |
| methods | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| mgcv | 1.9-4 | GPL (>= 2) | https://cran.r-project.org/src/contrib/mgcv_1.9-4.tar.gz | - |
| nlme | 3.1-169 | GPL (>= 2) | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/nlme/nlme_3.1-169.tar.gz |
| nnet | 7.3-20 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/nnet/nnet_7.3-20.tar.gz |
| openssl | 2.4.1 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/openssl/openssl_2.4.1.tar.gz |
| otel | 0.2.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/otel_0.2.0.tar.gz | - |
| parallel | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| pdftools | 3.9.0 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/pdftools/pdftools_3.9.0.tar.gz |
| pillar | 1.11.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/pillar_1.11.1.tar.gz | - |
| pkgbuild | 1.4.8 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/pkgbuild_1.4.8.tar.gz | - |
| pkgconfig | 2.0.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/pkgconfig_2.0.3.tar.gz | - |
| pkgload | 1.5.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/pkgload_1.5.3.tar.gz | - |
| praise | 1.0.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/praise_1.0.0.tar.gz | - |
| prettyunits | 1.2.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/prettyunits_1.2.0.tar.gz | - |
| processx | 3.9.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/processx_3.9.0.tar.gz | - |
| progress | 1.2.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/progress_1.2.3.tar.gz | - |
| promises | 1.5.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/promises_1.5.0.tar.gz | - |
| ps | 1.9.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/ps_1.9.3.tar.gz | - |
| qpdf | 1.4.1 | Apache License 2.0 | https://cran.r-project.org/src/contrib/qpdf_1.4.1.tar.gz | - |
| R6 | 2.6.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/R6_2.6.1.tar.gz | - |
| Rcpp | 1.1.1-1.1 | GPL (>= 2) | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/Rcpp/Rcpp_1.1.1-1.1.tar.gz |
| readxl | 1.5.0 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/readxl/readxl_1.5.0.tar.gz |
| rematch | 2.0.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/rematch_2.0.0.tar.gz | - |
| rlang | 1.3.0 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/rlang_1.3.0.tar.gz | - |
| rpart | 4.1.27 | GPL-2 / GPL-3 | https://cran.r-project.org/src/contrib/rpart_4.1.27.tar.gz | - |
| rprojroot | 2.1.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/rprojroot_2.1.1.tar.gz | - |
| RSQLite | 3.53.3 | LGPL (>= 2.1) | https://cran.r-project.org/src/contrib/RSQLite_3.53.3.tar.gz | - |
| sandwich | 3.1-3 | GPL-2 / GPL-3 | https://cran.r-project.org/src/contrib/sandwich_3.1-3.tar.gz | - |
| spatial | 7.3-18 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/spatial/spatial_7.3-18.tar.gz |
| splines | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| stats | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| stats4 | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| survival | 3.8-6 | LGPL (>= 2) | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/survival/survival_3.8-6.tar.gz |
| sys | 3.4.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/sys_3.4.3.tar.gz | - |
| tcltk | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| testthat | 3.3.2 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/testthat_3.3.2.tar.gz | - |
| tibble | 3.3.1 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/tibble_3.3.1.tar.gz | - |
| tools | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| translations | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| utf8 | 1.2.6 | Apache License (== 2.0) / file LICENSE | https://cran.r-project.org/src/contrib/utf8_1.2.6.tar.gz | - |
| utils | 4.6.0 | Part of R 4.6.0 | part of R-4.6.0.tar.gz | - |
| uuid | 1.2-2 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/uuid_1.2-2.tar.gz | - |
| vctrs | 0.7.3 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/vctrs_0.7.3.tar.gz | - |
| waldo | 0.6.2 | MIT + file LICENSE | https://cran.r-project.org/src/contrib/waldo_0.6.2.tar.gz | - |
| websocket | 1.4.4 | GPL-2 | https://cran.r-project.org/src/contrib/websocket_1.4.4.tar.gz | - |
| withr | 3.0.2 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/withr/withr_3.0.2.tar.gz |
| writexl | 1.5.4 | BSD_2_clause + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/writexl/writexl_1.5.4.tar.gz |
| xml2 | 1.5.2 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/xml2/xml2_1.5.2.tar.gz |
| zip | 2.3.3 | MIT + file LICENSE | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/zip/zip_2.3.3.tar.gz |
| zoo | 1.8-15 | GPL-2 / GPL-3 | not current on CRAN | https://cran.r-project.org/src/contrib/Archive/zoo/zoo_1.8-15.tar.gz |

## 3. Node.js v24.18.0 (MIT)

* Version: **v24.18.0** (file version resource of `node.exe` reads 24.18.0). Location: `resources/runtime/mentat/native/Node/node.exe`.
* License: MIT for Node itself; `LICENSE.txt` (shipped next to `node.exe`) also contains the notices for the third-party components compiled into Node (V8, OpenSSL, ICU, zlib, c-ares, llhttp, etc.).
* Source tarball: https://nodejs.org/dist/v24.18.0/node-v24.18.0.tar.gz (HTTP 200 checked). Release index: https://nodejs.org/dist/v24.18.0/
* `node.exe` SHA-256 `9a4eb5f1c29c6a2e93852ead46b999e284a6a5ca8bab4d4e241d587d025a52de`; matches `win-x64/node.exe` in https://nodejs.org/dist/v24.18.0/SHASUMS256.txt and `provenance.json` `binarySha256`: unmodified upstream binary.
* No `node_modules` ships alongside this Node runtime. Node packages exist only inside the Electron app (`resources/app.asar`), listed below.

### 3.1 Node packages inside `resources/app.asar` (Electron app dependencies)

| Package (path in asar) | Version | License | License file in package | SHA-256 of license file |
|---|---|---|---|---|
| argparse | 2.0.1 | Python-2.0 | LICENSE | de4d1f2d2ad5ad0cfd1657a106476b31cb5db5ef9d1ff842b237c0c81f0c8a23 |
| builder-util-runtime | 9.7.0 | MIT | LICENSE | bed8d0ab3e6031817f775a641ff37313b0f5591bc8ba0ed79b978dafbd4231ce |
| debug | 4.4.3 | MIT | LICENSE | 3a61c6c96caf5c1d9b623fb9b04c822b783dfcb78aa7e49c76a3f643e6ed7f95 |
| electron-updater | 6.8.9 | MIT | LICENSE | bed8d0ab3e6031817f775a641ff37313b0f5591bc8ba0ed79b978dafbd4231ce |
| electron-updater/node_modules/semver | 7.7.4 | ISC | LICENSE | 4ec3d4c66cd87f5c8d8ad911b10f99bf27cb00cdfcff82621956e379186b016b |
| fs-extra | 10.1.0 | MIT | LICENSE | 1e76029602ae9b21cc4e612db2496d92febed882ba13ba745f8b3309e85f9d39 |
| graceful-fs | 4.2.11 | ISC | LICENSE | f65c5d9f22a317b2a10803bd1868461ce6499c2ed7217bc80c0cc772a748789c |
| js-yaml | 4.3.2 | MIT | LICENSE | a07bc24468b9654ce76a547d47a2db282d07733b715db4c73a98bd63961f9550 |
| jsonfile | 6.2.1 | MIT | LICENSE | a9801fb52ba22ef808682a094da8a7a480584b7ed0dfd0d888ab543616335031 |
| lazy-val | 1.0.5 | MIT | NONE | - |
| lodash.escaperegexp | 4.1.2 | MIT | LICENSE | ffd8b33b354585f4ce119f19c53728281e48a97b074491eb6bf6d5c5ff305272 |
| lodash.isequal | 4.5.0 | MIT | LICENSE | e159c6d48c989185448658f276375bfb2300362ec6d4ae5525a2d49c4bcb947d |
| ms | 2.1.3 | MIT | license.md | 1662fae9b5314d11cf51284e2dcd1f006a354f7343f08712a730fcff9a359801 |
| sax | 1.6.1 | BlueOak-1.0.0 | LICENSE.md | 8a1af140fdfbf5afd3df27f7e662f989c5b963a300020dfafce42033cae9e004 |
| semver | 7.8.5 | ISC | LICENSE | 4ec3d4c66cd87f5c8d8ad911b10f99bf27cb00cdfcff82621956e379186b016b |
| tiny-typed-emitter | 2.1.0 | MIT | LICENSE | 4b3faf884ee71eec3df920b66c98fc6618af28e824cf3a32ef3d8774048cc76d |
| universalify | 2.0.1 | MIT | LICENSE | 3fda5977c0904e226190b4e21d64340c1731e2142d6fe5f3dee0090a216b8b63 |

npm sources: https://registry.npmjs.org/<name>/-/<name>-<version>.tgz (for scoped packages the path is `@scope/name/-/name-<version>.tgz`).

## 4. Python 3.12.10 (PSF License) and bundled wheels

* Version: **3.12.10** (file version resource of `python.exe`, `python312.dll`). Location: `resources/runtime/mentat/python/`. License: Python Software Foundation License; text in `python/LICENSE.txt`.
* Source: https://www.python.org/ftp/python/3.12.10/Python-3.12.10.tgz (HTTP 200 checked).
* Bundled with the interpreter in `python/DLLs`: OpenSSL 3 (`libcrypto-3.dll`, `libssl-3.dll`), SQLite (`sqlite3.dll`), Tcl/Tk 8.6 (`tcl86t.dll`, `tk86t.dll`), libffi, zlib, expat, bz2/lzma modules. These are python.org build components; their licenses are only partly reproduced (see gaps).
* Mentat adds `Lib/site-packages/sitecustomize.py` (disables user site-packages); Mentat application sources are under `resources/runtime/mentat/{bootstrap,sources}`.

### 4.1 Wheels in `site-packages`: 23

Source links: the PyPI project page for the exact version and the sdist path on files.pythonhosted.org (the sdist exists only if the project publishes one; for projects that publish wheels only, use the project page / repository). The sdist file name uses the normalized project name; if that 404s, try the underscore/original form.

| Name | Version | License (METADATA) | PyPI | sdist (source) |
|---|---|---|---|---|
| certifi | 2026.7.22 | MPL-2.0 | https://pypi.org/project/certifi/2026.7.22/ | https://files.pythonhosted.org/packages/source/c/certifi/certifi-2026.7.22.tar.gz |
| cffi | 2.1.1 | MIT-0 | https://pypi.org/project/cffi/2.1.1/ | https://files.pythonhosted.org/packages/source/c/cffi/cffi-2.1.1.tar.gz |
| cryptography | 46.0.7 | Apache-2.0 OR BSD-3-Clause | https://pypi.org/project/cryptography/46.0.7/ | https://files.pythonhosted.org/packages/source/c/cryptography/cryptography-46.0.7.tar.gz |
| et_xmlfile | 2.0.0 | MIT | https://pypi.org/project/et_xmlfile/2.0.0/ | https://files.pythonhosted.org/packages/source/e/et_xmlfile/et_xmlfile-2.0.0.tar.gz |
| geographiclib | 2.1 | MIT | https://pypi.org/project/geographiclib/2.1/ | https://files.pythonhosted.org/packages/source/g/geographiclib/geographiclib-2.1.tar.gz |
| geopandas | 1.1.4 | BSD-3-Clause | https://pypi.org/project/geopandas/1.1.4/ | https://files.pythonhosted.org/packages/source/g/geopandas/geopandas-1.1.4.tar.gz |
| geopy | 2.5.0 | MIT | https://pypi.org/project/geopy/2.5.0/ | https://files.pythonhosted.org/packages/source/g/geopy/geopy-2.5.0.tar.gz |
| Jinja2 | 3.1.6 | BSD License | https://pypi.org/project/jinja2/3.1.6/ | https://files.pythonhosted.org/packages/source/j/jinja2/jinja2-3.1.6.tar.gz |
| MarkupSafe | 3.0.3 | BSD-3-Clause | https://pypi.org/project/markupsafe/3.0.3/ | https://files.pythonhosted.org/packages/source/m/markupsafe/markupsafe-3.0.3.tar.gz |
| numpy | 2.3.5 | BSD License | https://pypi.org/project/numpy/2.3.5/ | https://files.pythonhosted.org/packages/source/n/numpy/numpy-2.3.5.tar.gz |
| openpyxl | 3.1.5 | MIT | https://pypi.org/project/openpyxl/3.1.5/ | https://files.pythonhosted.org/packages/source/o/openpyxl/openpyxl-3.1.5.tar.gz |
| packaging | 26.3 | Apache-2.0 OR BSD-2-Clause | https://pypi.org/project/packaging/26.3/ | https://files.pythonhosted.org/packages/source/p/packaging/packaging-26.3.tar.gz |
| pandas | 3.0.1 | BSD License | https://pypi.org/project/pandas/3.0.1/ | https://files.pythonhosted.org/packages/source/p/pandas/pandas-3.0.1.tar.gz |
| pip | 25.0.1 | MIT | https://pypi.org/project/pip/25.0.1/ | https://files.pythonhosted.org/packages/source/p/pip/pip-25.0.1.tar.gz |
| psutil | 7.2.2 | BSD-3-Clause | https://pypi.org/project/psutil/7.2.2/ | https://files.pythonhosted.org/packages/source/p/psutil/psutil-7.2.2.tar.gz |
| pyarrow | 24.0.0 | Apache-2.0 | https://pypi.org/project/pyarrow/24.0.0/ | https://files.pythonhosted.org/packages/source/p/pyarrow/pyarrow-24.0.0.tar.gz |
| pycparser | 3.11 | BSD-3-Clause | https://pypi.org/project/pycparser/3.11/ | https://files.pythonhosted.org/packages/source/p/pycparser/pycparser-3.11.tar.gz |
| pyogrio | 0.13.0 | MIT License | https://pypi.org/project/pyogrio/0.13.0/ | https://files.pythonhosted.org/packages/source/p/pyogrio/pyogrio-0.13.0.tar.gz |
| pyproj | 3.8.0 | MIT | https://pypi.org/project/pyproj/3.8.0/ | https://files.pythonhosted.org/packages/source/p/pyproj/pyproj-3.8.0.tar.gz |
| python-dateutil | 2.9.0.post0 | Dual License | https://pypi.org/project/python-dateutil/2.9.0.post0/ | https://files.pythonhosted.org/packages/source/p/python-dateutil/python-dateutil-2.9.0.post0.tar.gz |
| shapely | 2.1.2 | BSD 3-Clause | https://pypi.org/project/shapely/2.1.2/ | https://files.pythonhosted.org/packages/source/s/shapely/shapely-2.1.2.tar.gz |
| six | 1.17.0 | MIT | https://pypi.org/project/six/1.17.0/ | https://files.pythonhosted.org/packages/source/s/six/six-1.17.0.tar.gz |
| tzdata | 2026.3 | Apache-2.0 | https://pypi.org/project/tzdata/2026.3/ | https://files.pythonhosted.org/packages/source/t/tzdata/tzdata-2026.3.tar.gz |

Wheels that vendor native shared libraries (listed in the matching `*.libs` directory): numpy (OpenBLAS, MSVC runtime), pandas and pyarrow (MSVC runtime), pyproj (PROJ, libtiff, libcurl, SQLite, libjpeg, liblzma, zlib), pyogrio (GDAL, GEOS, PROJ, libtiff, libgeotiff, libcurl, OpenSSL, libxml2, expat, libpng, SQLite, SpatiaLite, qhull, json-c, minizip, zlib, libjpeg, LERC, iconv, liblzma), shapely (GEOS, GEOS C API, MSVC runtime). These are upstream PyPI wheels; the vendored libraries are not separately re-licensed by Mentat.

## 5. Electron 44.7.2 and Chromium 152 (MIT; Chromium notices)

* Electron 44.7.2 (string `Electron/44.7.2` and `Chrome/152.0.7977.149` found in `Mentat.exe`). License: MIT (`LICENSE.electron.txt`). Source: https://github.com/electron/electron/tree/v44.7.2 and Chromium source via https://chromium.googlesource.com/chromium/src/+/refs/tags/152.0.7977.149
* `LICENSES.chromium.html` is PRESENT at the app root: 20,477,229 bytes. It carries the notices for Chromium and its third-party components (including FFmpeg, V8, ANGLE, Skia, SwiftShader, etc.).
* Electron runtime files in the app root: `ffmpeg.dll`, `vk_swiftshader.dll`, `vulkan-1.dll`, `d3dcompiler_47.dll`, `dxcompiler.dll`, `dxil.dll`, `icudtl.dat`, `*.pak`, `*.bin`.

## 6. License files shipped in the package, with SHA-256

Install-relative paths (under the app directory). Hashes were computed on the B2 `win-unpacked` tree.

| File | Bytes | SHA-256 |
|---|---|---|
| `LICENSE.electron.txt` | 1,096 | 5154e165bd6c2cc0cfbcd8916498c7abab0497923bafcd5cb07673fe8480087d |
| `LICENSES.chromium.html` | 20,477,229 | e6e6b1f9cb0f32235412be113de7716333e88121f9159a0ea0ff3be652021af7 |
| `resources/runtime/mentat/native/Node/LICENSE.txt` | 157,606 | 148eacf7863ef4329224a29398623077200a27194aa075569faf4a0a85566ca5 |
| `resources/runtime/mentat/python/LICENSE.txt` | 36,874 | e502c6b880ff58d614901495a9009c136539cd0b1e2a2abb8fc00b934c203419 |
| `resources/runtime/mentat/native/R/COPYING` | 18,011 | e6d6a009505e345fe949e1310334fcb0747f28dae2856759de102ab66b722cb4 |
| `resources/runtime/mentat/native/R/doc/COPYING` | 18,011 | e6d6a009505e345fe949e1310334fcb0747f28dae2856759de102ab66b722cb4 |
| `resources/runtime/mentat/native/R/doc/COPYRIGHTS` | 72,210 | b1c1f64278edec8fdf9272badeaf5e6ed0b5ff3608192b71ffbd6dfd747f783a |
| `resources/runtime/mentat/native/R/share/licenses/AGPL-3` | 34,523 | 0d96a4ff68ad6d4b6f1f30f713b18d5184912ba8dd389f86aa7710db079abcb0 |
| `resources/runtime/mentat/native/R/share/licenses/Apache-2.0` | 11,358 | cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30 |
| `resources/runtime/mentat/native/R/share/licenses/Artistic-2.0` | 9,073 | 4cabb00406b10ab960d3ebb5c14e5042cf54d2b970cc4047588aa28c703525fe |
| `resources/runtime/mentat/native/R/share/licenses/BSD_2_clause` | 1,630 | 534d4226056f1fe3a268e960ae8bf8462cabaa032a6c89a96d7be9ee261042ab |
| `resources/runtime/mentat/native/R/share/licenses/BSD_3_clause` | 1,927 | 942d8f6a395b75acaf4e147261e6fb4478a4a3e176cf1e581dff3366cb9b6985 |
| `resources/runtime/mentat/native/R/share/licenses/CC0-1.0` | 7,048 | a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499 |
| `resources/runtime/mentat/native/R/share/licenses/GPL-2` | 18,092 | 8177f97513213526df2cf6184d8ff986c675afb514d4e68a404010521b880643 |
| `resources/runtime/mentat/native/R/share/licenses/GPL-3` | 35,149 | 3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986 |
| `resources/runtime/mentat/native/R/share/licenses/LGPL-2` | 25,292 | 655bbf126cb0247df3a5cfce85e2293e76a1cbd588568b3b482b6e5029646097 |
| `resources/runtime/mentat/native/R/share/licenses/LGPL-2.1` | 26,530 | dc626520dcd53a22f727af3ee42c770e56c97a64fe3adb063799d8ab032fe551 |
| `resources/runtime/mentat/native/R/share/licenses/LGPL-3` | 7,652 | e3a994d82e644b03a792a930f574002658412f62407f5fee083f2555c5f23118 |
| `resources/runtime/mentat/native/R/share/licenses/MIT` | 1,380 | dabc720ac4a1dacea5f2d72070cef67e9fafb623e0db6e86aae3ff6e31db0d91 |
| `resources/runtime/mentat/native/R/share/licenses/license.db` | 8,575 | 804b990d8710413af4c7ab6a86079f203c2aca6e40e3ea118fc8cf3fbbc8be69 |
| `resources/runtime/mentat/native/R/Tcl/lib/BWidget/LICENSE.txt` | 2,223 | 85a1ea733ced76b106d944fed020545a7e6b106a6c5dadaa84e1fddfaa50846d |
| `resources/runtime/mentat/native/R/Tcl/lib/tk8.6/demos/license.terms` | 2,267 | 2cde822b93ca16ae535c954b7dfe658b4ad10df2a193628d1b358f1765e8b198 |
| `resources/runtime/mentat/native/R/Tcl/lib/Tktable2.10/license.txt` | 2,731 | 3f8ed9f129ad006a45a662eac5a86d11fe59c2244526ab4dd9291559b6fa3b6b |
| `resources/runtime/mentat/native/R/doc/html/katex/LICENSE` | 1,160 | 14a68aa0a32c23c9de2e5cf3eb81c3cb8ca9d33aa3a447313eb3f825a53a8c00 |

### 6.1 Per-package license files (R packages and Python wheels)

| File | Bytes | SHA-256 |
|---|---|---|
| `resources/runtime/mentat/native/R/library/askpass/LICENSE` | 41 | 485684feca79992b8973c4f8bcdab3f414f156299f7e6346513e30427e591879 |
| `resources/runtime/mentat/native/R/library/blob/LICENSE` | 42 | 28dd64ba4bf3288237ed8c749affe45a28292853c245e983ba732ecff408070b |
| `resources/runtime/mentat/native/R/library/brio/LICENSE` | 42 | ceb507e5da4beb838ddd5658a9ed9949a928e9e26f997cec298fbf91cc71987f |
| `resources/runtime/mentat/native/R/library/cachem/LICENSE` | 49 | 8841acac0442c5454cd9e9dbde2ccf355c16aaa542c728e634fe67cf351c98e3 |
| `resources/runtime/mentat/native/R/library/callr/LICENSE` | 64 | 2a9de55f6c7f83f3af335bcb14b2ca37d2520ec87f7ee213883630e26555fe84 |
| `resources/runtime/mentat/native/R/library/cellranger/LICENSE` | 44 | 12138d675c360229bc01e1cf0fd45a8d089bfab8e2ed1e286d95ebeefb8725d0 |
| `resources/runtime/mentat/native/R/library/chromote/LICENSE` | 46 | 7cc07f78d52269cd400f21cbafce6cbeee67515b710912d3626c37cabeeb92b9 |
| `resources/runtime/mentat/native/R/library/cli/LICENSE` | 41 | 7ca9da25537a5e7e628150a0e6e60de2eaad6c4d5f2d64e4cc63e75aa053e591 |
| `resources/runtime/mentat/native/R/library/cpp11/LICENSE` | 49 | 84119b56da00767ba3cd75a7a0b37dd9bf974b8760fb425cb36bd72dcf004612 |
| `resources/runtime/mentat/native/R/library/crayon/LICENSE` | 44 | 4e894cd8664a6c3a3af970093eec09e41f3bbb0943fb6514f2e48bbb6b8af705 |
| `resources/runtime/mentat/native/R/library/curl/LICENSE` | 62 | 46e348eb9a9e95358770c3b0df03a464e89019d6242875fc7adee7a2d1490690 |
| `resources/runtime/mentat/native/R/library/data.table/LICENSE` | 16,726 | fab3dd6bdab226f1c08630b1dd917e11fcb4ec5e1e020e2c16f83a0a13863e85 |
| `resources/runtime/mentat/native/R/library/desc/LICENSE` | 42 | 1000d2e07707241e8bd01ade00c38131555085f976b56b16b56bd68a11f07c86 |
| `resources/runtime/mentat/native/R/library/evaluate/LICENSE` | 46 | 706274b3ebe600ffde19479bac28d8f25aaae75556c580db36f67ed07594de69 |
| `resources/runtime/mentat/native/R/library/fastmap/LICENSE` | 49 | 88cb13bc72ae6e9422255d9923b9666f0aedbaaf8d0462f55bd09282d4d7fd28 |
| `resources/runtime/mentat/native/R/library/fs/LICENSE` | 40 | b7721969cd4444c9a6ccd2577e3bf4ee03c2d089121269fcca839e1074706a2e |
| `resources/runtime/mentat/native/R/library/glue/LICENSE` | 42 | df91fc6693975392fe1d13934181f520bda494e6fc1ddaa34a267b43859ab1ac |
| `resources/runtime/mentat/native/R/library/hms/LICENSE` | 41 | e13223dfdbc752320e1e29fbeecd4fbc010092fbec13842898d23c508ff94089 |
| `resources/runtime/mentat/native/R/library/httr2/LICENSE` | 43 | e494cd00db733aca34c9b6e77cbea6c7dce43c6edfee44f843fbccf3a8f346fd |
| `resources/runtime/mentat/native/R/library/ids/LICENSE` | 43 | c90a2af335d19284e2053cf7e3f00d21b4805b883689fddd28cc1fe4dcc5452f |
| `resources/runtime/mentat/native/R/library/jsonlite/LICENSE` | 41 | 008725198f645358cbb93366529f71300cdc33586bbd0f071e5879a16bacbdb1 |
| `resources/runtime/mentat/native/R/library/later/LICENSE` | 43 | d523f6f85324ce012944d2400084c7ce5ffe77fbbc6edc0c09f7ce76c5d3b3ef |
| `resources/runtime/mentat/native/R/library/lifecycle/LICENSE` | 47 | 950f917f975ec43d52acf4f97f913e0eeac12c18ffa8e6fb609d43641feac74b |
| `resources/runtime/mentat/native/R/library/magrittr/LICENSE` | 46 | a0fc38a7d1f39765687d621dab45ab50f706ee6aa00289f90af5366079699542 |
| `resources/runtime/mentat/native/R/library/Matrix/LICENCE` | 36,703 | 950f535be089f287efbfb53e97c0e4835e3ec8f4dc10770ff448f95022c33240 |
| `resources/runtime/mentat/native/R/library/memoise/LICENSE` | 49 | 728149b1a13e7dce2e5ebf88bf86cce3c98db357a4cf60fc06fb1ae7d5d341b8 |
| `resources/runtime/mentat/native/R/library/openssl/LICENSE` | 41 | 059386638024adf2092d7c9abfb651c70e5b85755556630cbf7b01ea94f770bb |
| `resources/runtime/mentat/native/R/library/otel/LICENSE` | 42 | fa1804ae8bc8a59c05269173aa72154bbb09164b55fe00806e56b5fb7f30c33c |
| `resources/runtime/mentat/native/R/library/pdftools/LICENSE` | 41 | 1baa9799889f734a502205b14a3881c3fc4ebd3ebb77cf45895ca9fca2950cf1 |
| `resources/runtime/mentat/native/R/library/pillar/LICENSE` | 44 | f2f750126100f2772e0f428b1d97e2f5b175e39254a3db729a1ffc15aa1bb13b |
| `resources/runtime/mentat/native/R/library/pkgbuild/LICENSE` | 46 | 0f67d647805cacab4762061373b20e9aec30d8d51d620a98fb4afba6efd03ccf |
| `resources/runtime/mentat/native/R/library/pkgconfig/LICENSE` | 50 | 375d96241b4a2ead695a70ac4f52909d35b164fe1b68dd67e935a7d8f6a47bf7 |
| `resources/runtime/mentat/native/R/library/pkgload/LICENSE` | 45 | f54ab10ddf99650c94acc9679525148ad6d4f10085f59b45651d09db7142ae08 |
| `resources/runtime/mentat/native/R/library/praise/LICENSE` | 57 | eccc391720ba62149839cdac16015d65a18916c54ddd799dc30aebf0b9753613 |
| `resources/runtime/mentat/native/R/library/prettyunits/LICENSE` | 42 | c7b7f281c6844a2fe4122f54d2c9e4e347333511da3977b16b8c2e182631265d |
| `resources/runtime/mentat/native/R/library/processx/LICENSE` | 69 | d2f3bd0faa45909ed15d1b316b7fa3493af30c73788424cc97835966355c6525 |
| `resources/runtime/mentat/native/R/library/progress/LICENSE` | 46 | b02ca02ba9d8d407016f18ff23c3732dbee3484a5bbb4c458dce14af0bd53a36 |
| `resources/runtime/mentat/native/R/library/promises/LICENSE` | 46 | 4eb56327a2845065c6a82b5bf5b12c89ea454d445fb3f2a9f8c8af053a1428aa |
| `resources/runtime/mentat/native/R/library/ps/LICENSE` | 40 | e163678959610d192af2fa22473ea0db36cd7ae1bbb171eb947d9722e13572cc |
| `resources/runtime/mentat/native/R/library/R6/LICENSE` | 40 | 4a241a4eb733aa770ae6b578cb43b8b16f0fc203c92ef3cd00e4189e0302dcf3 |
| `resources/runtime/mentat/native/R/library/readxl/LICENSE` | 44 | 60bac11ebd180e0a51b4e1b59a658bf9977b6594a60652558f15289d2783db85 |
| `resources/runtime/mentat/native/R/library/rematch/LICENSE` | 66 | 7b96e6ac1974de9b6ad38bf7439b98ce22e4451983e0406c49f7f6f9878e115c |
| `resources/runtime/mentat/native/R/library/rlang/LICENSE` | 43 | 007646ca628dcb18cf6568a0edb41c28157b9d1a715a4ea3d5865a98e8113626 |
| `resources/runtime/mentat/native/R/library/rprojroot/LICENSE` | 47 | 4d31f876560893dbeaf9f99b6fcfcc30c1e55976a7b4862c088e255ac475c8d6 |
| `resources/runtime/mentat/native/R/library/sys/LICENSE` | 41 | 3fbb8e774a322192e18e2d2e1eb9bf3054b065e562e7ffd3a6ab4dfa311fd394 |
| `resources/runtime/mentat/native/R/library/testthat/LICENSE` | 46 | 3cecc4828c7f71d7d9ec27db762f8106dd1a7bebf43a589ca0b42f6228fb6ce5 |
| `resources/runtime/mentat/native/R/library/tibble/LICENSE` | 42 | 30024b268600650b7f18647c65d34b86c81f36d08e850ca2840d53dabdeede56 |
| `resources/runtime/mentat/native/R/library/utf8/LICENSE` | 11,358 | cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30 |
| `resources/runtime/mentat/native/R/library/uuid/COPYING` | 1,509 | c7828536f51182fadf62d041a4cae903d7f1ea844fed544e8498b963f84b81b6 |
| `resources/runtime/mentat/native/R/library/uuid/LICENSE` | 61 | 9d796925223f1d470f8a40953a64a09b59b1a5d0db71ea84295109e36012c780 |
| `resources/runtime/mentat/native/R/library/vctrs/LICENSE` | 43 | cf3ca4dadcd87073140dade7a0fac48fe9bfc249fd5152415fd44dad263c3447 |
| `resources/runtime/mentat/native/R/library/waldo/LICENSE` | 43 | 3a56afc8d2d98285c6b4d9ed90b175ae84114e44368f7bb02f159db8017e1dfd |
| `resources/runtime/mentat/native/R/library/withr/LICENSE` | 43 | f977839320e6333860f1d7541afb87508bdf303bd91eea546d84fb2f10aad004 |
| `resources/runtime/mentat/native/R/library/writexl/LICENSE` | 41 | 8adbbc7db7aff98eb71f055edaf4ce8713021e98d6487771c02440ae7ed38267 |
| `resources/runtime/mentat/native/R/library/xml2/LICENSE` | 42 | 234115ff4a53c5e52b7f0d4c76cfd46654221b0a3ea5da5ffeb49537d46a564a |
| `resources/runtime/mentat/native/R/library/zip/LICENSE` | 41 | 33109adc947bc12aaa51a3e1c2addc14c111b37b37e842292c9747ac26d16edf |
| `resources/runtime/mentat/python/Lib/site-packages/certifi-2026.7.22.dist-info/licenses/LICENSE` | 989 | e93716da6b9c0d5a4a1df60fe695b370f0695603d21f6f83f053e42cfc10caf7 |
| `resources/runtime/mentat/python/Lib/site-packages/cffi-2.1.1.dist-info/licenses/LICENSE` | 1,123 | 5ba24ddc57067f9249add644c3afc41a5d6dc37e23433ef759d95df370b0af63 |
| `resources/runtime/mentat/python/Lib/site-packages/cryptography-46.0.7.dist-info/licenses/LICENSE` | 197 | 3e0c7c091a948b82533ba98fd7cbb40432d6f1a9acbf85f5922d2f99a93ae6bb |
| `resources/runtime/mentat/python/Lib/site-packages/cryptography-46.0.7.dist-info/licenses/LICENSE.APACHE` | 11,360 | aac73b3148f6d1d7111dbca32099f68d26c644c6813ae1e4f05f6579aa2663fe |
| `resources/runtime/mentat/python/Lib/site-packages/cryptography-46.0.7.dist-info/licenses/LICENSE.BSD` | 1,532 | 602c4c7482de6479dd2e9793cda275e5e63d773dacd1eca689232ab7008fb4fb |
| `resources/runtime/mentat/python/Lib/site-packages/et_xmlfile-2.0.0.dist-info/AUTHORS.txt` | 82 | 7f038029ea5463605dd2278d300099a381bce9e90dda83ccab2042346b6c8107 |
| `resources/runtime/mentat/python/Lib/site-packages/et_xmlfile-2.0.0.dist-info/LICENCE.python` | 14,688 | 4ccdaaebc0f44b83720ec0399bb7ab329adce067dd62f73c5535a2dc05628ab2 |
| `resources/runtime/mentat/python/Lib/site-packages/et_xmlfile-2.0.0.dist-info/LICENCE.rst` | 1,131 | 0c84bb42f5d367e5ebf9fc2dde35b16141df5ee0fdc189250858bc6c5560f69e |
| `resources/runtime/mentat/python/Lib/site-packages/geographiclib-2.1.dist-info/licenses/LICENSE` | 1,089 | 44e8d5e992a01915a3522d48296b8a684df5641e8162be44431c9911b9e9f32b |
| `resources/runtime/mentat/python/Lib/site-packages/geopandas-1.1.4.dist-info/licenses/LICENSE.txt` | 1,498 | c60efa15937a5a82a5a2786a26be7452936fffec7a845724db0740e54535c8ea |
| `resources/runtime/mentat/python/Lib/site-packages/geopy-2.5.0.dist-info/licenses/AUTHORS` | 5,172 | 5810791ef070f6edd7b744c6f95aa73d9876cb6628c7242830bb011201780d4b |
| `resources/runtime/mentat/python/Lib/site-packages/geopy-2.5.0.dist-info/licenses/LICENSE` | 1,076 | f09cbf1aec22dfc3d457594b619d0484a12498e9481bc126fb16dff6bf5aec16 |
| `resources/runtime/mentat/python/Lib/site-packages/jinja2-3.1.6.dist-info/licenses/LICENSE.txt` | 1,475 | 3b49dcee4105eb37bac10faf1be260408fe85d252b8e9df2e0979fc1e094437b |
| `resources/runtime/mentat/python/Lib/site-packages/markupsafe-3.0.3.dist-info/licenses/LICENSE.txt` | 1,503 | 4631ec0db5fd90a547e336817264c6798214338146f8ac94b4a57f96ee8c9ec4 |
| `resources/runtime/mentat/python/Lib/site-packages/numpy-2.3.5.dist-info/LICENSE.txt` | 46,841 | 596b953e1dcbe829b32ae444387efa15003fc6abdeca8a2179f364a6364c286e |
| `resources/runtime/mentat/python/Lib/site-packages/openpyxl-3.1.5.dist-info/LICENCE.rst` | 1,131 | 0c84bb42f5d367e5ebf9fc2dde35b16141df5ee0fdc189250858bc6c5560f69e |
| `resources/runtime/mentat/python/Lib/site-packages/packaging-26.3.dist-info/licenses/LICENSE` | 197 | cad1ef5bd340d73e074ba614d26f7deaca5c7940c3d8c34852e65c4909686c48 |
| `resources/runtime/mentat/python/Lib/site-packages/packaging-26.3.dist-info/licenses/LICENSE.APACHE` | 10,174 | 0d542e0c8804e39aa7f37eb00da5a762149dc682d7829451287e11b938e94594 |
| `resources/runtime/mentat/python/Lib/site-packages/packaging-26.3.dist-info/licenses/LICENSE.BSD` | 1,344 | b70e7e9b742f1cc6f948b34c16aa39ffece94196364bc88ff0d2180f0028fac5 |
| `resources/runtime/mentat/python/Lib/site-packages/pandas-3.0.1.dist-info/LICENSE` | 1,634 | 9850f6b5bdef7346503065807b878deb8058b976c5c329f4c4d23bf4796ce9ae |
| `resources/runtime/mentat/python/Lib/site-packages/pip-25.0.1.dist-info/AUTHORS.txt` | 11,018 | 1eace90552df4f5941b61a907e20e555e16483ae6127b650bef5a1a2af8102c0 |
| `resources/runtime/mentat/python/Lib/site-packages/pip-25.0.1.dist-info/LICENSE.txt` | 1,093 | 634300a669d49aeae65b12c6c48c924c51a4cdf3d1ff086dc3456dc8bcaa2104 |
| `resources/runtime/mentat/python/Lib/site-packages/psutil-7.2.2.dist-info/LICENSE` | 1,577 | c7adc4d5d1337a548b967421f1fbe258b93033a0417708fd6f4e38f8ecbceb80 |
| `resources/runtime/mentat/python/Lib/site-packages/pyarrow-24.0.0.dist-info/licenses/LICENSE.txt` | 114,602 | b410defd7f5f8cac9cfa54a3a49fcd971de2be0462bbab980c8f869f1aac94d3 |
| `resources/runtime/mentat/python/Lib/site-packages/pyarrow-24.0.0.dist-info/licenses/NOTICE.txt` | 2,997 | 2ccca1e730e671f55b8028facf2261a6f74b561a4d96a2ccd743be19c5619236 |
| `resources/runtime/mentat/python/Lib/site-packages/pycparser-3.11.dist-info/licenses/LICENSE` | 1,543 | 0a9e78156ae8b96caf1b4f11ac2df424b83de29736f9e757630548a6272fdf90 |
| `resources/runtime/mentat/python/Lib/site-packages/pyogrio-0.13.0.dist-info/licenses/LICENSE` | 1,123 | d4f257af1744b6dbd7700cebe02830d87e7ef9fe997d2b6262743358acffde22 |
| `resources/runtime/mentat/python/Lib/site-packages/pyproj-3.8.0.dist-info/licenses/LICENSE` | 1,137 | c25d436b6fc9009a3d337ca024ed1caf615e55e10f4a0ace1673b9953821c8da |
| `resources/runtime/mentat/python/Lib/site-packages/pyproj-3.8.0.dist-info/licenses/LICENSE_proj` | 1,753 | ec8ad0defdbcfac5083e510c000c05a5b63144c685e0a879b7c081b5e44e24c7 |
| `resources/runtime/mentat/python/Lib/site-packages/python_dateutil-2.9.0.post0.dist-info/LICENSE` | 2,889 | ba00f51a0d92823b5a1cde27d8b5b9d2321e67ed8da9bc163eff96d5e17e577e |
| `resources/runtime/mentat/python/Lib/site-packages/shapely-2.1.2.dist-info/licenses/LICENSE.txt` | 1,612 | e8cd7d34604d2758ff589f0f34d6ed79c3f7fb14aaf5e12fb09221421391a3bf |
| `resources/runtime/mentat/python/Lib/site-packages/shapely-2.1.2.dist-info/licenses/LICENSE_GEOS` | 27,295 | 91a5bb11df4d44bfddc0c68db43681705326107781599fb6c6ff821042072d64 |
| `resources/runtime/mentat/python/Lib/site-packages/shapely-2.1.2.dist-info/licenses/LICENSE_win32` | 1,179 | 9b30cd1a09789884dd54e5828e31d2bf8e6879034e7cf7b6e0321444cf6dd11d |
| `resources/runtime/mentat/python/Lib/site-packages/six-1.17.0.dist-info/LICENSE` | 1,066 | 4375ba20e2b9c6c4e7cad2940a628fd90e95cc3d50ee92aae755715d8ba1fbd0 |
| `resources/runtime/mentat/python/Lib/site-packages/tzdata-2026.3.dist-info/licenses/LICENSE` | 625 | df58f69ea88683035d720b5375bcef0cf5aeaa98a1d098d572e0992c378deb46 |
| `resources/runtime/mentat/python/Lib/site-packages/tzdata-2026.3.dist-info/licenses/licenses/LICENSE_APACHE` | 11,357 | c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4 |

92 per-package license files listed. Note: for R packages whose License field is "MIT + file LICENSE" or similar, the shipped `LICENSE` is the short CRAN stub (year and copyright holder); the full license text is the standard one named in the License field.

## 7. Unmodified-binaries statement and Mentat additions

* Node.js: unmodified (hash-verified, section 3).
* R 4.6.0 and its libraries: CRAN Windows binary distribution layout (`README.R-4.6.0` is the upstream installer README; `Built:` stamps in each package DESCRIPTION are CRAN's). Mentat did not recompile or patch R. Package library installed with CRAN binary packages (`RemoteRepos: https://cran.rstudio.com` in DESCRIPTION), so also upstream builds. Not hash-compared with the CRAN installer.
* Python 3.12.10 and wheels: python.org Windows runtime layout plus PyPI wheels. Mentat additions: `Lib/site-packages/sitecustomize.py`. Not hash-compared with the python.org installer.
* Electron: `Mentat.exe` is a re-branded `electron.exe` (version/icon resources edited by electron-builder); `resources/app.asar` and `resources/app-update.yml` are Mentat's own.
* Mentat's own code: `resources/runtime/mentat/{bootstrap,sources,python-launch files}` and `resources/app.asar`. Mentat's own license is not covered by this file.

Where the license files sit inside the package (install directory = the folder holding `Mentat.exe`): `LICENSE.electron.txt`, `LICENSES.chromium.html` (root); `resources/runtime/mentat/native/R/COPYING`, `.../R/doc/COPYING`, `.../R/doc/COPYRIGHTS`, `.../R/share/licenses/*`, `.../R/library/<pkg>/LICENSE*`; `.../native/Node/LICENSE.txt`; `.../python/LICENSE.txt`; `.../python/Lib/site-packages/<wheel>.dist-info/**`.

Source availability: for the GPL/LGPL components (R, GEOS and other LGPL/GPL libraries inside the wheels and Chromium/FFmpeg) the corresponding source is the upstream source at the URLs above; the binaries are upstream builds, so upstream source is the corresponding source. This document does not itself constitute legal advice or a written offer; the owner should confirm GPL source-offer wording before treating the release as compliant.

## 8. Gaps (license texts NOT present in the package)

* Python: `python/LICENSE.txt` is the CPython/PSF text only (it mentions libffi and Tcl/Tk). The OpenSSL 3 (Apache-2.0), SQLite (public domain), zlib, expat, bzip2 and xz notices, and `docs/license.tcltk` that LICENSE.txt refers to, are not shipped for the python.org-built DLLs in `python/DLLs`.
* R Tcl/Tk: `native/R/Tcl` ships BWidget, Tktable and the Tk demos `license.terms` only. There is no Tcl core license file (`tcl8.6` license.terms). R itself and Tcl/Tk are covered by upstream; the Tcl core text is absent.
* R compiled packages (CRAN Windows binaries) statically link toolchain libraries (for example libcurl/OpenSSL for curl, openssl, httr2; poppler and its dependencies for pdftools; libxml2 for xml2; SQLite for RSQLite; libxls for readxl). Only each R package's own LICENSE is shipped; the license texts of those statically linked libraries are not in the package. Their sources are the upstream CRAN package tarballs (listed above) plus the Rtools/rwinlib library sources. Statically linked contents were inferred from package DESCRIPTION and CRAN build practice, not by binary analysis.
* Python wheels with vendored native libraries: `pyogrio` ships only its own LICENSE although its `pyogrio.libs` bundles GDAL, GEOS (LGPL-2.1), PROJ, libtiff, libgeotiff, libcurl, OpenSSL, libxml2, expat, libpng, SQLite, SpatiaLite and others; `pyproj` ships LICENSE and LICENSE_proj only (libtiff, libcurl, libjpeg, SQLite, zlib, liblzma texts absent); `shapely` ships LICENSE_GEOS but no texts for the MSVC runtime; `pandas`, `pyarrow` and `numpy` bundle `msvcp140` (Microsoft Visual C++ runtime, redistributable under Microsoft terms) with no Microsoft license text. numpy's `LICENSE.txt` does include its bundled-library notices.
* Microsoft redistributables in the Electron app root (`d3dcompiler_47.dll`, `dxcompiler.dll`, `dxil.dll`, `vulkan-1.dll`) and the Visual C++ runtime DLLs in `python/` (`vcruntime140*.dll`) have no Microsoft license text in the package; the Chromium notices file covers third-party code in Chromium but not these Microsoft redistributables.
* Mentat's own project license file was not examined or included here.

Mechanical checks (file presence per component):
* app.asar package `node_modules/lazy-val` has no license file.

## 9. Component count

141 components: 1 R + 97 R packages (15 base, 15 recommended, 67 contributed) + Node + 17 Node packages (asar) + Python + 23 wheels + Electron/Chromium.
