# Mentat 1.0.3 - Third-Party Notices, Addendum 2

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3
Written 2026-10-16T10:50:10Z (UTC). Additive record: no existing asset was changed, replaced or deleted. Where this addendum and an earlier notices file disagree, this addendum controls for the points it states.

**This is a notices record, not legal clearance.** It was prepared by an automated assistant from file metadata, upstream documentation and the published packages. It is not legal advice and has not been reviewed by a lawyer. Where a fact could not be established it says "not determined" and does not guess.

## 0. Evidence base

* Read-only inspection of the local B2 package `<local build folder>\dist\mentat\win-unpacked` (version resources via `(Get-Item).VersionInfo`, `Get-AuthenticodeSignature`, file listings, `DESCRIPTION` files, wheel `METADATA`). Nothing was executed from it (R and Python were not run).
* The published `Mentat-1.0.3-win-x64-unsigned-preview.zip` central directory was read with HTTP range requests (about 2.4 MB transferred; the zip was not downloaded). Its Python and Electron DLL sizes agree with the local B2 copies (spot-checked by size). Whether B2 is byte-identical to the published zip was not hash-compared.

## 1. Python runtime DLL components (CPython 3.12.10)

CPython 3.12.10 (released 2025-04-08) is the python.org Windows build. Its layout is the full python.org layout, not the embeddable zip: `python/DLLs/` carries `_tkinter.pyd`, `tcl86t.dll` and `tk86t.dll`, as observed.  The table follows the files actually present.
Component versions are those pinned by CPython 3.12.10 `PCbuild/get_externals.bat` and `Modules/` (https://github.com/python/cpython/blob/v3.12.10/PCbuild/get_externals.bat): bzip2-1.0.8, libffi-3.4.4, openssl-bin-3.0.16.2, sqlite-3.49.1.0, tcltk-8.6.15.2, xz-5.2.5, zlib-1.3.1; expat 2.7.1 (`Modules/expat/expat.h`, and the 3.12.10 NEWS entry "Update bundled libexpat to 2.7.1"); libmpdec 2.5.1 (`Modules/_decimal/libmpdec/mpdecimal.h`). The DLL version resources observed on disk agree: `libcrypto-3.dll`/`libssl-3.dll` 3.0.16, `sqlite3.dll` 3.49.1.0, `tcl86t.dll`/`tk86t.dll` 8.6.15, `zlib1.dll` 1.3.1. `libffi-8.dll` has no version resource (3.4.4 is from `get_externals.bat`; "-8" is the library's ABI number).

Python's own `python/LICENSE.txt` (36,874 bytes, same CRC-32 in all three packages) was read. It contains: the PSF/BeOpen/CNRI/CWI license history and terms; full text for bzip2/libbzip2 1.0.8; libffi (MIT, "Copyright (c) 1996-2022 Anthony Green, Red Hat, Inc and others"); the Apache License 2.0 text (unlabelled, the OpenSSL 3.x license); and the Tcl/Tk/Tix license terms. It does NOT contain SQLite, zlib, expat, xz/liblzma or libmpdec text. `Python-and-packages.md` for Mentat says `LICENSE.txt` carries OpenSSL, libffi, SQLite, expat, zlib "and others"; that sentence overstates the file for SQLite, expat and zlib, and this section supplies them.

| Component | Version | Files | License | Copyright line | Text or official URL | In python/LICENSE.txt |
|---|---|---|---|---|---|---|
| OpenSSL | 3.0.16 | `libcrypto-3.dll`, `libssl-3.dll` (used by `_ssl.pyd`, `_hashlib.pyd`) | Apache-2.0 | Copyright 1998-2025 The OpenSSL Authors. All rights reserved. (from the DLL version resource) | https://www.apache.org/licenses/LICENSE-2.0.txt ; https://www.openssl.org/ | Apache-2.0 text yes (unlabelled); copyright line no |
| SQLite | 3.49.1.0 | `sqlite3.dll` (used by `_sqlite3.pyd`) | Public domain | None claimed (see blessing below) | https://sqlite.org/copyright.html | No |
| zlib | 1.3.1 | `zlib1.dll` | zlib license | Copyright (C) 1995-2024 Jean-loup Gailly and Mark Adler (`zlib.h` v1.3.1; the DLL resource says 1995-2022) | Full text below; https://zlib.net/zlib_license.html | No |
| expat | 2.7.1 | built into `pyexpat.pyd` | MIT | Copyright (c) 1998-2000 Thai Open Source Software Center Ltd and Clark Cooper; Copyright (c) 2001-2022 Expat maintainers (CPython `Modules/expat/COPYING`) | Full text below; https://libexpat.github.io/ | No |
| libffi | 3.4.4 | `libffi-8.dll` (used by `_ctypes.pyd`) | MIT | Copyright (c) 1996-2022 Anthony Green, Red Hat, Inc and others | https://github.com/libffi/libffi/blob/v3.4.4/LICENSE | Yes, full text |
| bzip2 / libbzip2 | 1.0.8 | built into `_bz2.pyd` (no separate DLL) | bzip2 license (BSD-style) | copyright (C) 1996-2019 Julian R Seward. All rights reserved. | https://sourceware.org/bzip2/ | Yes, full text |
| liblzma (XZ Utils) | 5.2.5 | built into `_lzma.pyd` (no separate DLL; inferred from the absence of one and from `get_externals.bat`) | Public domain (liblzma) | None claimed by the authors | https://tukaani.org/xz/ (COPYING at tag v5.2.5) | No |
| Tcl/Tk | 8.6.15 | `tcl86t.dll`, `tk86t.dll` (used by `_tkinter.pyd`) | Tcl/Tk license (BSD-style) | Copyright (c) 1987-2022 Regents of the University of California and other parties (DLL resource); LICENSE.txt names Sun Microsystems, Scriptics, ActiveState | https://www.tcl-lang.org/software/tcltk/license.html | Yes, Tcl and Tk terms plus Tix; it refers to a `docs/license.tcltk` file that is not shipped |
| libmpdec (mpdecimal) | 2.5.1 | built into `_decimal.pyd` | BSD-2-Clause | Copyright (c) 2008-2020 Stefan Krah. All rights reserved. | Full text below | No |
| CPython itself | 3.12.10 | `python312.dll`, `python3.dll`, `*.pyd` | PSF License 2.0 (with BeOpen/CNRI/CWI history) | Copyright (c) 2001-2023 Python Software Foundation (DLL resource) | https://docs.python.org/3.12/license.html | Yes |

Source for the Python build: https://www.python.org/ftp/python/3.12.10/Python-3.12.10.tar.xz ; Windows external sources and binaries: https://github.com/python/cpython-source-deps and https://github.com/python/cpython-bin-deps (tags named in `get_externals.bat`).
The statement that these DLLs are the unmodified python.org build rests on provenance and the identical version resources; the DLLs were not hash-compared with python.org's installer.

### SQLite (public domain)

```text
The author disclaims copyright to this source code.  In place of
a legal notice, here is a blessing:

   * May you do good and not evil.
   * May you find forgiveness for yourself and forgive others.
   * May you share freely, never taking more than you give.
```

### zlib 1.3.1 license

```text
Copyright (C) 1995-2024 Jean-loup Gailly and Mark Adler

This software is provided 'as-is', without any express or implied
warranty.  In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.

Jean-loup Gailly        Mark Adler
jloup@gzip.org          madler@alumni.caltech.edu
```

### expat 2.7.1 license (MIT)

```text
Copyright (c) 1998-2000 Thai Open Source Software Center Ltd and Clark Cooper
Copyright (c) 2001-2022 Expat maintainers

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

### libmpdec 2.5.1 license (BSD-2-Clause)

```text
Copyright (c) 2008-2020 Stefan Krah. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
SUCH DAMAGE.
```

### liblzma (xz 5.2.5)

liblzma is public domain according to upstream. The exact COPYING text for xz 5.2.5 was not reproduced here; it is at https://git.tukaani.org/?p=xz.git;a=blob;f=COPYING;hb=v5.2.5 (not fetched or verified in this pass).

## 2. Microsoft Visual C++ runtime and DirectX components

### 2.1 Visual C++ runtime

* `resources/runtime/mentat/python/vcruntime140.dll` (120,400 bytes) and `vcruntime140_1.dll` (49,776 bytes): FileVersion 14.42.34438.0, ProductName "Microsoft(R) Visual Studio(R)", CompanyName Microsoft Corporation, Authenticode status Valid (read on disk).
* `msvcp140*.dll` copies sit in Python wheel `.libs` directories with hashed names (7 files): `numpy.libs/msvcp140-a4c2229bdc2a2a630acdc095b4d86008.dll`, `pandas.libs/msvcp140-a4c2229bdc2a2a630acdc095b4d86008.dll`, `pyarrow.libs/msvcp140-f22b3317cfb3fad7db3a18f8f234f32b.dll`, `pyarrow.libs/msvcp140_atomic_wait-a67379821634a4f3a32730b57a436c71.dll`, `pyogrio.libs/msvcp140-a4c2229bdc2a2a630acdc095b4d86008.dll`, `pyproj.libs/msvcp140-7c26614e1d733892c2deac7e245ce115.dll`, `shapely.libs/msvcp140-90bc62d4947a5878f1dc1057312f3be2.dll`. Their version resources and signatures were not read. They are placed by the wheel builders (names with a hash suffix are typical of delvewheel).
* Microsoft terms cited: (a) Visual Studio 2022 "Distributable Code" and its "Distributable List" (REDIST.txt): https://learn.microsoft.com/en-us/visualstudio/releases/2022/redistribution ; (b) https://learn.microsoft.com/en-us/cpp/windows/redistributing-visual-cpp-files .
* What the page (a) says, in substance: the list is the REDIST.txt referred to by the Visual Studio license terms, and a person with a validly licensed copy of that software may copy and distribute the listed files unmodified with their program, subject to those terms. The page names the CRT by folder and merge module (for example `VC\Redist\MSVC\[version]\...` and `Microsoft_VC143_CRT_[arch].msm`); the literal file names `vcruntime140.dll` and `msvcp140.dll` do not appear in the fetched page text, so a filename-level match to the list is NOT confirmed.
* Not established: under whose Visual Studio license, or under which Visual C++ Redistributable terms, the python.org installer and the wheel builders redistribute these files, and therefore what this project's own obligations are. The files are upstream-supplied and were not rebuilt here.

### 2.2 DirectX and shader-compiler files (shipped by Electron/Chromium)

These files sit next to the executable. They are the Electron/Chromium distribution's files, not files this project added.

| File | Bytes | FileDescription / CompanyName | ProductVersion | Authenticode | CRC-32 |
|---|---|---|---|---|---|
| `d3dcompiler_47.dll` | 4,741,488 | Direct3D HLSL Compiler for Redistribution / Microsoft Corporation | 10.0.26100.7705 | Valid (Microsoft Windows) | 80d20879 |
| `dxil.dll` | 1,509,760 | DirectX Compiler - Out Of Band / Microsoft(r) Corporation | 1.8.2502.11 (239921522) | Valid (Microsoft Windows) | 6cd2b41a |
| `dxcompiler.dll` | 25,744,384 | DirectX Compiler - Google Dawn Custom Build / Microsoft(r) Corporation | 1.9.2607.0 | NotSigned | 2c8527f8 |

(Resource fields were read on disk from Mentat's copy.)

* **DirectX Shader Compiler (DXC) license.** The upstream repository's `LICENSE.TXT` (https://github.com/microsoft/DirectXShaderCompiler/blob/main/LICENSE.TXT, fetched read-only) is the **LLVM Release License, University of Illinois/NCSA Open Source License**, "Copyright (c) 2003-2015 University of Illinois at Urbana-Champaign". An Apache-2.0-with-LLVM-exception license for DXC was looked for and NOT found: no such text appears for DXC in the upstream LICENSE.TXT or in the Chromium notices entry. The current LLVM project uses Apache-2.0 with LLVM exceptions, but DXC's own file still shows the NCSA terms.
* **Chromium's notices.** `LICENSES.chromium.html` (20,477,229 bytes; same size and CRC-32 in all three packages) contains these relevant entries, found by reading the file: "DirectX-Shader-Compiler" (homepage https://github.com/microsoft/DirectX-Shader-Compiler; the LLVM Release License / NCSA text followed by LLVM's third-party notices, including GPL text marked as build and test dependencies only); "Headers for DirectX APIs." (DirectX-Headers, MIT, "Copyright (c) Microsoft Corporation."); "Dawn" (BSD-3-Clause, "Copyright 2017-2026 The Dawn & Tint Authors", plus an Apache-2.0 text); "Vulkan Loader Components" (Apache-2.0); and an "ffmpeg" entry. Chromium sources: https://chromium.googlesource.com/chromium/src/+/main/third_party/dawn and https://dawn.googlesource.com/dawn .
* **Correction of Mentat Addendum 1.** Addendum 1 stated that `LICENSES.chromium.html` has no entry matching "dxc" or "DirectXShaderCompiler". That was a search miss (the entry is titled with hyphens, "DirectX-Shader-Compiler"). The entry exists. It still holds that the file has NO entry for `d3dcompiler_47` and none for the Microsoft Visual C++ runtime (searched for "d3dcompiler", "vcruntime", "msvcp", "Visual C++": 0 hits).
* The pairing of the "Google Dawn Custom Build" `dxcompiler.dll` with the "DirectX-Shader-Compiler" and "Dawn" entries is an inference from the file description and from Chromium's build, not something the package records. Whether `dxil.dll` (Microsoft-signed, "Out Of Band") falls under the DXC repository license or under separate Microsoft terms is NOT established.
* **`d3dcompiler_47.dll`.** Microsoft-signed. No Microsoft redistribution terms for it were located in the package, in Chromium's notices, or on the Microsoft Learn compiler page https://learn.microsoft.com/en-us/windows/win32/direct3dtools/fxc (no redistribution wording found there). The basis for its redistribution is NOT established; Electron upstream ships it.
* **Electron/Chromium notices shipped.** `LICENSE.electron.txt` (1,096 bytes; MIT, "Copyright (c) Electron contributors", "Copyright (c) 2013-2020 GitHub Inc.") and `LICENSES.chromium.html` are present at the package root (read on disk and in the published zip).
* `vulkan-1.dll` is the Vulkan loader (FileDescription "1.4.357.0", ProductName "Vulkan Runtime", CompanyName empty, unsigned, read on Mentat's identical copy). It is not a Microsoft file; its license text is the "Vulkan Loader Components" entry above (Apache-2.0). That the loader is Khronos's is consistent with the name but not confirmed by the resource.
* Whether the NSIS installer asset carries the same files was not inspected.

## 3. R, Tcl, statically linked R libraries, vendored geospatial libraries, npm

### 3.1 R and Tcl

* R 4.6.0 for Windows (`resources/runtime/mentat/native/R`; `README.R-4.6.0` says it is a binary distribution of R). License GPL-2 or GPL-3 (`COPYING` is the GPL-2 text; GPL-2, GPL-3, LGPL-2, LGPL-2.1, LGPL-3, AGPL-3, Apache-2.0, Artistic-2.0, BSD, CC0, MIT texts are under `share/licenses/`). Source: https://cran.r-project.org/src/base/R-4/R-4.6.0.tar.gz .
* Tcl/Tk bundled with R: `R/Tcl/bin/tcl86.dll`, `tk86.dll`, `tclsh86.exe`, `wish86.exe` are version 8.6.17; `R/Tcl/bin/zlib1.dll` is 1.3.1; `sqlite3_analyzer` is present. Upstream license: Tcl/Tk license, https://www.tcl-lang.org/software/tcltk/license.html . Sources: https://github.com/tcltk/tcl and https://github.com/tcltk/tk . License files found inside `R/Tcl`: `lib/tk8.6/demos/license.terms`, `lib/BWidget/LICENSE.txt`, `lib/Tktable2.10/license.txt`. No Tcl core license file was found there. Python's `LICENSE.txt` reproduces the Tcl/Tk 8.6 terms, but it is a different copy and is not claimed to cover R's.

### 3.2 Libraries linked into CRAN Windows R packages

The exact versions of libraries statically linked into the CRAN Windows binaries are NOT recorded in the package. Only `DESCRIPTION` `SystemRequirements` (a minimum or a name) is available. Upstream license names are the projects' general licenses and are not a statement about the specific linked build.

| R package (version) | SystemRequirements (from DESCRIPTION) | Library and upstream license | Upstream source | Exact linked version |
|---|---|---|---|---|
| curl 7.1.0 | libcurl (>= 7.73) | libcurl, curl license (MIT-style) | https://curl.se/download.html | not determined |
| openssl 2.4.1 | OpenSSL >= 1.0.2 | OpenSSL: Apache-2.0 for 3.x; OpenSSL/SSLeay dual license for 1.x | https://www.openssl.org/source/ | not determined |
| websocket 1.4.4 (GPL-2) | GNU make, OpenSSL >= 1.0.2 | OpenSSL as above | https://www.openssl.org/source/ | not determined |
| pdftools 3.9.0 | Poppler C++ API (libpoppler-cpp) and poppler-data | poppler: GPL-2 or GPL-3 upstream (the CRAN package itself declares MIT); its own dependencies (fonts, images, color) not enumerated | https://poppler.freedesktop.org/ | not determined, and whether poppler is statically linked is not determined |
| qpdf 1.4.1 (Apache-2.0) | libjpeg | qpdf library, Apache-2.0 (the R package declares Apache License 2.0; whether qpdf is bundled or linked is not determined); libjpeg (libjpeg-turbo or IJG) | https://github.com/qpdf/qpdf ; https://libjpeg-turbo.org/ | not determined |
| xml2 1.5.2 | libxml2 | libxml2, MIT | https://gitlab.gnome.org/GNOME/libxml2 | not determined |
| writexl 1.5.4 | zlib | zlib license | https://zlib.net/ | not determined |
| RSQLite 3.53.3 (LGPL-2.1+) | none stated | embeds the SQLite engine, public domain | https://sqlite.org/ | not determined |
| fs 2.1.0 | libuv (system or vendored; cmake to build the vendored copy) | libuv, MIT | https://github.com/libuv/libuv | not determined |

Packages whose license was read from `DESCRIPTION` are listed with their source URLs in section 4. 97 packages were counted in `native/R/library`.

### 3.3 Libraries vendored in the pyogrio, pyproj and shapely wheels

Wheel `METADATA` (read from Mentat's package; Terrier's md lists the same wheel versions) gives: pyogrio 0.13.0 (MIT), pyproj 3.8.0 (MIT; also `LICENSE_proj`), shapely 2.1.2 (BSD-3-Clause; also `LICENSE_GEOS`, `LICENSE_win32`). `METADATA` does not state the vendored library versions. The versions below are read from the vendored DLLs' own PE version resources where one exists, which is weaker than a build manifest; "not determined" means the DLL has no version resource.

| Library (DLL in `*.libs`) | Version | Upstream license | Upstream source |
|---|---|---|---|
| GDAL (`gdal-*.dll`, pyogrio) | 3.12.4 (resource) | MIT/X-style, https://gdal.org/en/stable/license.html | https://github.com/OSGeo/gdal |
| GEOS (`geos-*.dll`, `geos_c-*.dll`; pyogrio and shapely) | not determined | LGPL-2.1 (license file `LICENSE_GEOS` shipped with shapely) | https://github.com/libgeos/geos |
| PROJ (`proj_9-*.dll`; pyogrio and pyproj) | not determined (major 9) | MIT (`LICENSE_proj` shipped with pyproj), https://proj.org/en/stable/about.html | https://github.com/OSGeo/PROJ |
| libcurl (`libcurl-*.dll`) | 8.20.0 (pyogrio), 8.19.0 (pyproj) | curl license, https://curl.se/docs/copyright.html | https://curl.se/download.html |
| OpenSSL (`libcrypto-3-x64-*.dll`, `libssl-3-x64-*.dll`) | 3.6.2 (resource) | Apache-2.0 | https://www.openssl.org/source/ |
| libxml2 (`libxml2-*.dll`) | 2.15.3 (resource) | MIT | https://gitlab.gnome.org/GNOME/libxml2 |
| expat (`libexpat-*.dll`) | 2.8.1.0 (resource) | MIT | https://github.com/libexpat/libexpat |
| liblzma / XZ Utils (`liblzma-*.dll`) | 5.8.3 (resource) | public domain / 0BSD per upstream COPYING (not verified for 5.8.3) | https://tukaani.org/xz/ |
| libtiff (`tiff-*.dll`) | 4.7.1 (resource) | libtiff license (BSD-style), "See LICENCE.md" in the resource | https://gitlab.com/libtiff/libtiff |
| libjpeg-turbo (`jpeg62-*.dll`) | 3.1.4.1 (resource; ABI 62) | BSD-3-Clause, IJG and zlib terms | https://github.com/libjpeg-turbo/libjpeg-turbo |
| zlib (`z-*.dll` in pyogrio, `zlib1-*.dll` in pyproj) | 1.3.2 (pyogrio), 1.3.1 (pyproj) (resource) | zlib license | https://zlib.net/ |
| SQLite (`sqlite3-*.dll`) | 3.53.1 (pyogrio), 3.53.0 (pyproj) (resource) | public domain | https://sqlite.org/ |
| libiconv (`iconv-2-*.dll`) | 1.18 (resource) | LGPL-2.1+ for the library | https://ftp.gnu.org/gnu/libiconv/libiconv-1.18.tar.gz |
| libspatialite (`spatialite-*.dll`) | not determined | MPL-1.1 / GPL-2+ / LGPL-2.1+ tri-license per upstream | https://www.gaia-gis.it/fossil/libspatialite/ |
| libpng (`libpng16-*.dll`) | not determined (16 series) | libpng license | http://www.libpng.org/pub/png/libpng.html |
| libgeotiff (`geotiff-*.dll`) | not determined | MIT-style per upstream | https://github.com/OSGeo/libgeotiff |
| json-c (`json-c-*.dll`) | not determined | MIT | https://github.com/json-c/json-c |
| LERC (`Lerc-*.dll`) | not determined | Apache-2.0 | https://github.com/Esri/lerc |
| minizip (`minizip-*.dll`) | not determined | zlib license | https://github.com/zlib-ng/minizip-ng or https://github.com/madler/zlib (not determined which) |
| Qhull (`qhull_r-*.dll`) | not determined | Qhull license (BSD-style) | http://www.qhull.org/ |

The upstream license names and URLs are the projects' general ones. The license files shipped inside the wheels (`LICENSE`, `LICENSE_proj`, `LICENSE_GEOS`, `LICENSE_win32`) were not re-read for this pass beyond confirming that `METADATA` lists them.

### 3.4 npm `lazy-val` 1.0.5 (MIT)

* Source: https://github.com/develar/lazy-val ; tarball https://registry.npmjs.org/lazy-val/-/lazy-val-1.0.5.tgz . `package.json` states license MIT and author "Vladimir Krivosheev".
* Neither the published tarball (files: `out/main.js`, `out/main.js.map`, `out/main.d.ts`, `package.json`, `readme.md`) nor the GitHub repository's top level contains a LICENSE file, so no upstream copyright year or holder line exists to copy. The text below is the standard MIT license with the holder taken from `package.json`; the year is not determined.

```text
MIT License

Copyright (c) Vladimir Krivosheev (year not published upstream)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## 4. Source offer note for GPL and LGPL components

**This is NOT a lawyer-reviewed written offer.** It records where corresponding source can be obtained and what is and is not established about the binaries. The owner may replace it with a reviewed offer. No contact address for source requests is set here (owner to supply).

Status of the binaries: the components below are described as unmodified upstream builds only where the evidence says so. No rebuild of any of them by this project is recorded.

### R 4.6.0 and R packages

* R 4.6.0: GPL-2 or GPL-3. Source: https://cran.r-project.org/src/base/R-4/R-4.6.0.tar.gz . Unmodified upstream: per provenance and the "binary distribution" README only; the files were not hash-compared with the CRAN installer.
* R packages with GPL or LGPL licenses, versions as installed (`native/R/library/*/DESCRIPTION`). Source tarballs at the exact version; the URL shown returned HTTP 200 on 2026-10-16. Current packages are under `/src/contrib/`, superseded ones under `/src/contrib/Archive/<pkg>/`. Several packages' `Built:` field says R 4.6.1 although the runtime is R 4.6.0; that is recorded, not explained.

| Package | Version | License (DESCRIPTION) | Source |
|---|---|---|---|
| DBI | 1.3.0 | LGPL-2.1+ | https://cran.r-project.org/src/contrib/DBI_1.3.0.tar.gz |
| MASS | 7.3-65 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/MASS/MASS_7.3-65.tar.gz |
| Matrix | 1.7-5 | GPL-2+|file-LICENCE | https://cran.r-project.org/src/contrib/Archive/Matrix/Matrix_1.7-5.tar.gz |
| RSQLite | 3.53.3 | LGPL-2.1+ | https://cran.r-project.org/src/contrib/RSQLite_3.53.3.tar.gz |
| Rcpp | 1.1.1-1.1 | GPL-2+ | https://cran.r-project.org/src/contrib/Archive/Rcpp/Rcpp_1.1.1-1.1.tar.gz |
| bit | 4.6.0 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/bit_4.6.0.tar.gz |
| bit64 | 4.8.2 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/bit64/bit64_4.8.2.tar.gz |
| class | 7.3-23 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/class/class_7.3-23.tar.gz |
| clubSandwich | 0.7.0 | GPL-3 | https://cran.r-project.org/src/contrib/clubSandwich_0.7.0.tar.gz |
| cluster | 2.1.8.2 | GPL-2+ | https://cran.r-project.org/src/contrib/Archive/cluster/cluster_2.1.8.2.tar.gz |
| codetools | 0.2-20 | GPL | https://cran.r-project.org/src/contrib/codetools_0.2-20.tar.gz |
| diffobj | 0.3.8 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/diffobj/diffobj_0.3.8.tar.gz |
| digest | 0.6.39 | GPL-2+ | https://cran.r-project.org/src/contrib/digest_0.6.39.tar.gz |
| foreign | 0.8-91 | GPL-2+ | https://cran.r-project.org/src/contrib/foreign_0.8-91.tar.gz |
| lattice | 0.22-9 | GPL-2+ | https://cran.r-project.org/src/contrib/Archive/lattice/lattice_0.22-9.tar.gz |
| mgcv | 1.9-4 | GPL-2+ | https://cran.r-project.org/src/contrib/mgcv_1.9-4.tar.gz |
| nlme | 3.1-169 | GPL-2+ | https://cran.r-project.org/src/contrib/Archive/nlme/nlme_3.1-169.tar.gz |
| nnet | 7.3-20 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/nnet/nnet_7.3-20.tar.gz |
| rpart | 4.1.27 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/rpart_4.1.27.tar.gz |
| sandwich | 3.1-3 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/sandwich_3.1-3.tar.gz |
| spatial | 7.3-18 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/spatial/spatial_7.3-18.tar.gz |
| survival | 3.8-6 | LGPL-2+ | https://cran.r-project.org/src/contrib/Archive/survival/survival_3.8-6.tar.gz |
| websocket | 1.4.4 | GPL-2 | https://cran.r-project.org/src/contrib/websocket_1.4.4.tar.gz |
| zoo | 1.8-15 | GPL-2|GPL-3 | https://cran.r-project.org/src/contrib/Archive/zoo/zoo_1.8-15.tar.gz |

The base and recommended packages shipped with R (base, stats, utils and the rest) are part of R 4.6.0 and covered by its source tarball. Rtools/MinGW-w64 runtime libraries possibly present in `R/bin` were not examined.

### Libraries inside Python wheels

* GEOS (LGPL-2.1) in `shapely.libs` and `pyogrio.libs`: https://github.com/libgeos/geos . Exact version not determined, so the exact-version source tag is not given. libiconv 1.18 (LGPL-2.1+ library): https://ftp.gnu.org/gnu/libiconv/libiconv-1.18.tar.gz . libspatialite (tri-license including LGPL-2.1+ and GPL-2+; version not determined): https://www.gaia-gis.it/fossil/libspatialite/ .
* The wheels are PyPI binary wheels (pyogrio 0.13.0, pyproj 3.8.0, shapely 2.1.2); the bundled libraries are in separate DLL files. No modification is recorded; they were not hash-compared with PyPI.

### Electron / Chromium

* `ffmpeg.dll` (3,113,472 bytes) carries FFmpeg code, much of it LGPL-2.1+ upstream; `LICENSES.chromium.html` has an "ffmpeg" entry. Source: Chromium's FFmpeg fork https://chromium.googlesource.com/chromium/third_party/ffmpeg and Electron https://github.com/electron/electron . The version and build flags of this `ffmpeg.dll` were not examined. `Mentat.exe` is described in the Mentat record as the re-branded Electron executable (not byte-identical to upstream `electron.exe`); the Electron and Chromium DLLs were not hash-compared with an upstream Electron release.

## 5. Status

**This is a notices record, not legal clearance.** It was prepared by an automated assistant from file metadata, upstream documentation and the published packages. It is not legal advice and has not been reviewed by a lawyer. Where a fact could not be established it says "not determined" and does not guess.

