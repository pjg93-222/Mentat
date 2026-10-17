# Mentat 1.0.3 - Third-Party Notices, Addendum 4 (dependency versions)

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3
Written 2026-10-16T11:51:30Z (UTC). Additive: `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-2.md` and `-ADDENDUM-3.md` are unchanged. Where this file gives a version that Addendum 2 marked "not determined", this file controls. No binary was touched.

**This is a notices record, not legal clearance.** It is not legal advice and has not been reviewed by a lawyer. "Probable" means a bare unlabelled string; "not determined" means the version could not be established.

## 0. Evidence base

* Source of the values: the owner's evidence record `installer-zip-and-versions-evidence-20261016.md` (run 2026-10-16, 11:30 to 11:47 UTC). It reads the local B2 tree `...\mentat-b2\dist\mentat\win-unpacked\resources\runtime\mentat` read-only, with PE version resources (read as data), embedded-string scans and `DESCRIPTION` files; nothing was executed from the tree or the installer. The values below are taken from that record; they were not re-derived in this pass. The B2 tree and the published zip agree by path, size and CRC-32 (section 1).
* "Determined" below means a labelled version resource or a labelled embedded string. "Probable" means a bare unlabelled string. Wheel `METADATA`/`RECORD` and `DELVEWHEEL` files do not give native-library versions (the only exception is shapely's GEOS path).

## 1. Installer versus zip (Mentat only)

Compared by path, size and CRC-32 using 7-Zip 16.04 listings (read-only; one payload file was extracted to a scratch folder and deleted afterwards):

| Measure | Installer payload (`app-64.7z`, 366,256,632 bytes) | Published zip |
|---|---|---|
| Files (directories excluded) | 12,510 | 12,510 |
| Total file bytes | 1,108,977,256 | 1,108,977,256 |
| Files present on one side only | 0 | 0 |

* 12,510 of 12,510 files identical by size and CRC-32. Of those, 97 are zero-byte files: the 7z container stores no CRC for empty files, the zip stores 00000000; treating blank as 00000000 gives 12,510/12,510 and zero real mismatches (no mismatch has a non-zero size).
* Both sides contain the same 23 `.pyc` files; the 193 smoke `.pyc` files removed before zipping are absent from both, so only set equality is established.
* Limits: this compares archive contents, not an installed result. It does not show what the NSIS script does at install time, signature status, or the 10 non-payload installer entries (NSIS plugin DLLs, icon, `Uninstall Mentat.exe`).
* The hashes of the installer and zip are unchanged (installer `c239a77edf6cbd15572904e4981959aec7179f54359d44b60cbe75b39ea5a858`, zip `54aa6ea0e26d34f2947a2d18ca06313733627dfa319732f0c14e09275e90fb40`). This closes the question left open in Addendum 2 ("whether the NSIS installer carries the same files") for file contents, for Mentat only.

## 2. Python wheels: native DLL versions

| Component | Version | File(s) under `site-packages` | Evidence | License | Source | Confidence |
|---|---|---|---|---|---|---|
| GEOS | 3.14.1 | pyogrio.libs/geos-*.dll, geos_c-*.dll | string "3.14.1"; "3.14.1-CAPI-1.20.5"; also in gdal-*.dll | LGPL-2.1 | https://github.com/libgeos/geos/releases/tag/3.14.1 | determined |
| GEOS (second, different build) | 3.13.1 | shapely.libs/geos-*.dll, geos_c-*.dll | string "3.13.1-CAPI-1.19.2"; wheel DELVEWHEEL path `geos-3.13.1\bin` | LGPL-2.1 | https://github.com/libgeos/geos/releases/tag/3.13.1 | determined |
| PROJ | 9.8.1 | pyogrio.libs/proj_9-*.dll and pyproj.libs/proj_9-*.dll | strings "PROJ 9.8.1", "Rel. 9.8.1, April 10th, 2026" in both | MIT | https://github.com/OSGeo/PROJ/releases/tag/9.8.1 | determined |
| libpng | 1.6.58 | pyogrio.libs/libpng16-*.dll | string "libpng version 1.6.58" | libpng license (PNG Reference Library license) | https://github.com/pnggroup/libpng/releases/tag/v1.6.58 | determined |
| GDAL | 3.12.4 | pyogrio.libs/gdal-*.dll | version resource FileVersion; string "GDAL 3.12.4" | MIT/X-style | https://github.com/OSGeo/gdal/releases/tag/v3.12.4 | determined |
| libtiff | 4.7.1 | pyogrio.libs/tiff-*.dll and pyproj.libs/tiff-*.dll | version resource 4.7.1; string "LIBTIFF, Version 4.7.1" (a stray "libtiff 4.5.1" string is message text, not the version) | libtiff license (BSD-style) | https://gitlab.com/libtiff/libtiff/-/tags/v4.7.1 | determined |
| libcurl | 8.20.0 (pyogrio); 8.19.0 (pyproj) | pyogrio.libs/libcurl-*.dll; pyproj.libs/libcurl-*.dll | version resource and string "libcurl/8.20.0" / "libcurl/8.19.0" (Schannel backend) | curl license (MIT-style) | https://curl.se/download/curl-8.20.0.tar.xz ; https://curl.se/download/curl-8.19.0.tar.xz | determined |
| OpenSSL | 3.6.2 | pyogrio.libs/libcrypto-3-x64-*.dll, libssl-3-x64-*.dll | version resource; string "OpenSSL 3.6.2 7 Apr 2026" | Apache-2.0 | https://github.com/openssl/openssl/releases/tag/openssl-3.6.2 | determined |
| qhull | 8.0.2 (qhull 2020.2, 2020/08/31) | pyogrio.libs/qhull_r-*.dll | string "qhull_r 8.0.2 (2020.2.r 2020/08/31)" | Qhull license (BSD-style) | https://github.com/qhull/qhull/releases/tag/2020.2 | determined |
| json-c | 0.18 | pyogrio.libs/json-c-*.dll | bare string "0.18" beside export `json_c_version`; no label | MIT | https://github.com/json-c/json-c/releases/tag/json-c-0.18-20240915 | probable |
| SpatiaLite (libspatialite) | 5.1.0 | pyogrio.libs/spatialite-*.dll | bare string "5.1.0" followed by "Windows_64bit"; no label, no version resource | MPL-1.1 / GPL-2.0-or-later / LGPL-2.1-or-later (tri-license per upstream) | https://www.gaia-gis.it/fossil/libspatialite/index | probable |
| minizip | 1.3.2 (inferred) | pyogrio.libs/minizip-*.dll | bare string "1.3.2"; "zip 1.01 / unzip 1.01" strings are the API era, not a release; the same vcpkg tree has zlib 1.3.2 | zlib license | https://github.com/madler/zlib/tree/master/contrib/minizip | probable |

Confirmed unchanged by the same record (already versioned in Addendum 2 from PE version resources): libxml2 2.15.3 (MIT), expat 2.8.1 (MIT), liblzma 5.8.3, zlib 1.3.2 (pyogrio) and 1.3.1 (pyproj) (zlib license), SQLite 3.53.1 (pyogrio) and 3.53.0 (pyproj) (public domain), libjpeg-turbo 3.1.4.1 (BSD-3-Clause, IJG, zlib), libiconv 1.18 (LGPL-2.1+ for the library).

Two different GEOS builds are present: 3.14.1 (pyogrio) and 3.13.1 (shapely). pyogrio and pyproj also carry separate PROJ, libtiff, libcurl, zlib and SQLite copies at partly different versions (curl 8.20.0 vs 8.19.0, zlib 1.3.2 vs 1.3.1, SQLite 3.53.1 vs 3.53.0).

Microsoft C++ runtime copies (`msvcp140*.dll`, version resources; supersedes "not read" in Addendum 2 section 2.1):

| Copy | FileVersion | CRC-32 (zip) | Bytes |
|---|---|---|---|
| `numpy.libs`, `pandas.libs`, `pyogrio.libs` `msvcp140-a4c2229b...dll` | 14.40.33810.0 | fe4b7797 | 575,056 |
| `pyarrow.libs` `msvcp140-f22b3317...dll` and `msvcp140_atomic_wait-a6737982...dll` | 14.44.35223.0 | 9636e026 ; 2abdf8db | 557,648 ; 29,696 |
| `pyproj.libs` `msvcp140-7c26614e...dll` | 14.51.36247.0 | 2fe252cb | 643,512 |
| `shapely.libs` `msvcp140-90bc62d4...dll` | 14.44.35215.0 | b1a64e2e | 557,704 |

Terms: Microsoft Visual Studio 2022 Distributable Code, https://learn.microsoft.com/en-us/visualstudio/releases/2022/redistribution (see Addendum 2 section 2.1 for what that page does and does not establish).

## 3. R packages: statically linked library versions

R 4.6; 97 packages; compiler string "GCC: (GNU) 14.3.0" in every R DLL. 70 packages have `Built: R 4.6.0`, 26 have `R 4.6.1`, one (chromote) has no platform. `SystemRequirements` exists for 9 packages and states requirements, not bundled versions. The versions below come from strings inside the DLLs. They are not recorded in any package metadata, and no CRAN/Rtools static-library manifest was consulted.

| R package(s) | Component | Version | Evidence | License | Source | Confidence |
|---|---|---|---|---|---|---|
| curl 7.1.0 | libcurl | 8.14.1 | string "libcurl/8.14.1", "curl 8.14.1" | curl license (MIT-style) | https://curl.se/download/curl-8.14.1.tar.xz | determined |
| curl 7.1.0 | OpenSSL | 3.5.0 (8 Apr 2025) | string "OpenSSL 3.5.0 8 Apr 2025" | Apache-2.0 | https://github.com/openssl/openssl/releases/tag/openssl-3.5.0 | determined |
| curl 7.1.0 | nghttp2 | 1.65.0 | string "nghttp2-1.65.0/lib" | MIT | https://github.com/nghttp2/nghttp2/releases/tag/v1.65.0 | determined |
| curl 7.1.0 | libssh2 | 1.11.0 | string "libssh2-1.11.0/src" | BSD-3-Clause | https://github.com/libssh2/libssh2 (release libssh2-1.11.0) ; https://www.libssh2.org/license.html | determined |
| openssl 2.4.1 and websocket 1.4.4 | OpenSSL | 3.6.0 (1 Oct 2025) | string, in both DLLs | Apache-2.0 | https://github.com/openssl/openssl/releases/tag/openssl-3.6.0 | determined |
| openssl 2.4.1, websocket 1.4.4, pdftools 3.9.0, qpdf 1.4.1, xml2 1.5.2, grDevices winCairo, R.dll | zlib | 1.3.1 | string in each DLL (curl.dll resolves zlib at run time, so no version in the file; data.table also shows 1.3.1; writexl: zlib present, version not stated) | zlib license | https://github.com/madler/zlib/releases/tag/v1.3.1 | determined |
| RSQLite 3.53.3 (LGPL-2.1+) | SQLite | 3.53.3 (matches the package version) | string near the library-version strings | public domain | https://sqlite.org/download.html | determined |
| grDevices `winCairo.dll` (part of R) | cairo | 1.18.4 | string | LGPL-2.1 or MPL-1.1 (dual, per upstream) | https://www.cairographics.org/releases/cairo-1.18.4.tar.xz | determined |
| grDevices `winCairo.dll` | pixman | 0.46.4 | string | MIT | https://www.cairographics.org/releases/pixman-0.46.4.tar.gz | determined |
| pdftools 3.9.0 and winCairo | HarfBuzz | 12.3.0 | string in both | MIT ("Old MIT") | https://github.com/harfbuzz/harfbuzz/releases/tag/12.3.0 | determined |
| pdftools 3.9.0 and winCairo | libpng | 1.6.54 | string in both | libpng license | https://github.com/pnggroup/libpng/releases/tag/v1.6.54 | determined |
| R.dll (R 4.6.0) | PCRE2 | 10.47 (2025-10-21) | string | BSD-3-Clause (with PCRE2 exemption text) | https://github.com/PCRE2Project/pcre2/releases/tag/pcre2-10.47 | determined |
| fs 2.1.0 | libuv | 1.51.0 | string "libuv-1.51.0" | MIT | https://github.com/libuv/libuv/releases/tag/v1.51.0 | determined |
| pdftools 3.9.0 | OpenJPEG | 2.5.4 | bare string beside `opj_` messages | BSD-2-Clause | https://github.com/uclouvain/openjpeg/releases/tag/v2.5.4 | probable |
| qpdf 1.4.1 | QPDF library | 12.2.0 | bare string beside the version-regex text | Apache-2.0 | https://github.com/qpdf/qpdf/releases/tag/v12.2.0 | probable |
| xml2 1.5.2 | libxml2 | 2.12.10 | bare string beside `libxml2_version_` | MIT | https://download.gnome.org/sources/libxml2/2.12/libxml2-2.12.10.tar.xz | probable |
| writexl 1.5.4 | libxlsxwriter | 1.1.5 | bare string beside libxlsxwriter error text | BSD-2-Clause (FreeBSD) | https://github.com/jmcnamara/libxlsxwriter/releases/tag/RELEASE_1.1.5 | probable |

**Unexplained:** `RSQLite.dll` also contains the strings "curl 8.18.0", "OpenSSL 3.6.0", "nghttp2-1.68.0", "libidn2/2.3.8" and "libpsl-0.21.5", i.e. a static libcurl stack whose purpose was not determined. If those libraries are linked into this DLL, their upstream licenses would apply: libcurl (curl license) https://curl.se/download/curl-8.18.0.tar.xz ; nghttp2 (MIT) https://github.com/nghttp2/nghttp2/releases/tag/v1.68.0 ; libidn2 (GPL-2.0-or-later or LGPL-3.0-or-later per upstream) https://ftp.gnu.org/gnu/libidn/libidn2-2.3.8.tar.gz ; libpsl (MIT) https://github.com/rockdaboot/libpsl/releases/tag/0.21.5 . Whether they are linked, and what follows from it, is not determined.

## 4. libsndfile

The evidence record finds no `libsndfile` file name or string anywhere under `runtime\mentat`. libsndfile is therefore not a Mentat component, and nothing in Mentat's Addendum 2 or 3 claims it. (The Melange release's Addendum 2 does list libsndfile, on the strength of `_soundfile_data/libsndfile_x64.dll` in the Melange zip; see Melange Addendum 4.)

## 5. Still not determined

* Wheels: geotiff (`geotiff-*.dll`: no version resource, only export `GTIFSetVersionNumbers`), LERC (`Lerc-*.dll`: no version resource, only the format tag "Lerc2 "), OpenBLAS (numpy: only a fragment "0.3.30 H" beside "openblas64_.dll", no label), and the licenses of those three are named by upstream only (geotiff: MIT-style; LERC: Apache-2.0; OpenBLAS: BSD-3-Clause).
* R: Poppler (pdftools: only `poppler::` symbols, no version string); libtiff (pdftools: the "libtiff 4.5.1" string is message text); libjpeg (pdftools and qpdf), Little CMS and FreeType (pdftools; FreeType and fontconfig also in winCairo); bzip2, xz and TRE (R.dll); brotli and zstd (curl.dll, present but unversioned); zlib inside curl.dll (resolved at run time).
* The "probable" rows above; they rest on unlabelled strings and should be confirmed against upstream wheel-build manifests (vcpkg baseline) and the CRAN/Rtools static-library manifests for R 4.6.
* Unchanged from Addendum 2: the legal basis for redistributing `d3dcompiler_47.dll`, `dxil.dll` and the Visual C++ runtime copies; the xz 5.2.5 COPYING text; source-offer contact. The source-offer note in Addendum 2 remains NOT lawyer-reviewed; the exact versions above narrow it (GEOS, cairo, libidn2 and the LGPL/GPL R packages now have version-specific source URLs) but do not complete it.

## 6. Status

**This is a notices record, not legal clearance.** It is not legal advice and has not been reviewed by a lawyer. "Probable" means a bare unlabelled string; "not determined" means the version could not be established.

