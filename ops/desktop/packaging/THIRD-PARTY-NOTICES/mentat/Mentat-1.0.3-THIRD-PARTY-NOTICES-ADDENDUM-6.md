# Mentat 1.0.3 - Third-Party Notices, Addendum 6 (native component evidence reconciliation)

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3
Written 2026-10-16T16:40:53Z (UTC). Additive: `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-4.md`, `-ADDENDUM-5.md` and every earlier addendum are unchanged and remain published. Where this file conflicts with Addendum 4 on the components below, this file controls. No binary was touched, no application was built, and no package, wheel, installer or release archive was downloaded for this addendum.

**Not legal clearance; not lawyer-reviewed. Unresolved versions remain open technical evidence work.**

## 1. Evidence classes used here

* Shipped metadata: a file inside the shipped tree (for example a build configuration file, a package DESCRIPTION or a documentation file) read as data.
* Pinned build provenance: a fixed-version upstream recipe or manifest that names the build inputs. It identifies the recipe, not a runtime query of the binary.
* Byte-matched: identical bytes (SHA-256) across the named copies.
* Size and CRC-32 only: agreement of file size and the ZIP central-directory CRC-32. CRC-32 is not a cryptographic hash.
* Inference and unresolved: stated as such.

## 2. Findings that change Addendum 4

### 2.1 OpenBLAS in the numpy wheel: 0.3.30 (shipped metadata)

Addendum 4 section 5 said OpenBLAS had only a fragment "0.3.30 H" beside "openblas64_.dll" and no label. The shipped file `python/Lib/site-packages/numpy/__config__.py` (lines 77 to 91) explicitly records scipy-openblas / OpenBLAS 0.3.30 for BLAS and LAPACK. That file is byte-identical to its entry in the published ZIP (SHA-256 `849406fba43baad5a8ac35539ed3959b34e54ea8d5acc67e4fb35371a6d962a7`). The numpy 2.3.5 wheel RECORD lists hashes for that file and for the bundled DLL `numpy.libs/libscipy_openblas64_-9e3e5a4229c1ca39f10dc82bba9e2b2b.dll` (SHA-256 `9e3e5a4229c1ca39f10dc82bba9e2b2bf48037790932566f37aff1a7ccf3588f`), and both match the build tree. The ZIP copy of the DLL matches on size (20,403,712 bytes) and CRC-32 (`4f0616ad`) only; it was not separately decompressed and hashed. Limits: this is build metadata, not a new runtime version query, and any build-time patches in the scipy-openblas packaging were not examined. Upstream license named earlier: BSD-3-Clause (https://github.com/OpenMathLib/OpenBLAS).

### 2.2 libgeotiff 1.7.4 and LERC 4.1.1 in the pyogrio wheel (pinned build provenance, byte-matched)

Addendum 4 section 5 listed both as not determined. The pyogrio 0.13.0 Windows wheel (`pyogrio-0.13.0-cp311-abi3-win_amd64.whl`, 23,824,927 bytes, SHA-256 `1b91f6d6e6757a6ea84b9459d24f479dcb52bbf4ebcdb16baf39e49d2836a1cf`) matches PyPI's published checksum and its published provenance, which links the wheel to pyogrio commit `d5ce9ca03d15e4477b91fa4aee3732d256692f32`, build run 28244366191 (https://pypi.org/project/pyogrio/0.13.0/#files). That commit's Windows workflow checks out vcpkg `89dac9685f8d0ebd0a07d8b93ed51215c3a2fb2c` and its manifest uses the same baseline (https://github.com/geopandas/pyogrio/blob/d5ce9ca03d15e4477b91fa4aee3732d256692f32/.github/workflows/release.yml#L211-L227 ; https://github.com/geopandas/pyogrio/blob/d5ce9ca03d15e4477b91fa4aee3732d256692f32/ci/vcpkg.json). At that baseline vcpkg pins libgeotiff 1.7.4#0 (https://github.com/microsoft/vcpkg/blob/89dac9685f8d0ebd0a07d8b93ed51215c3a2fb2c/ports/libgeotiff/vcpkg.json) and LERC 4.1.1#0 (https://github.com/microsoft/vcpkg/blob/89dac9685f8d0ebd0a07d8b93ed51215c3a2fb2c/ports/lerc/vcpkg.json).

| DLL under `python/Lib/site-packages/pyogrio.libs/` | Bytes | SHA-256 | Version | Class |
|---|---:|---|---|---|
| `geotiff-0f08c58b982b142224f2707f8e49d843.dll` | 161792 | `3efb92302c8cd7d2d7251df8676c20455c4a2655878106e1b75a11788030d20c` | libgeotiff 1.7.4 | pinned build provenance; byte-matched wheel RECORD, cached wheel, build tree and published ZIP |
| `Lerc-c10f5743f8921c17b85576614838c379.dll` | 540672 | `7d8b17a260ff29f98d141814d64974d3cb51fa46b8adfff8392688dde601e3e8` | LERC 4.1.1 | pinned build provenance; byte-matched as above |

Limits: these are build-provenance versions of vcpkg ports, and vcpkg applies its own patches, so neither DLL is claimed to be an unmodified upstream build. The DLLs do not report these versions themselves. The historical Windows build job is recorded as successful, but its log endpoint returns HTTP 410, so the resolved `vcpkg list` output was not available; the finding rests on the verified shipped-byte linkage and the pinned recipe, not on a quoted build log. Licenses are as named earlier by upstream (libgeotiff: MIT-style, https://github.com/OSGeo/libgeotiff ; LERC: Apache-2.0, https://github.com/Esri/lerc); the license texts shipped with the wheel are unchanged by this addendum.

### 2.3 R's TRE: derived from tre-0.8.0 (shipped metadata)

Addendum 4 listed TRE (R.dll) as not determined. R's shipped `native/R/doc/COPYRIGHTS` (lines 446 to 454; SHA-256 `b1c1f64278edec8fdf9272badeaf5e6ed0b5ff3608192b71ffbd6dfd747f783a`, byte-identical to its ZIP entry) states that R's included TRE source is derived from tre-0.8.0. Limits: this describes derivation, not an unmodified TRE 0.8.0 binary, and the R-specific patches are not enumerated. The license terms are those recited in that file; they are not analysed here.

### 2.4 RSQLite 3.53.3: a documented purpose for the curl stack (shipped metadata; enablement not proven)

Addendum 4 section 3 reported the strings "curl 8.18.0", "OpenSSL 3.6.0", "nghttp2-1.68.0", "libidn2/2.3.8" and "libpsl-0.21.5" inside `RSQLite.dll` and called the purpose unexplained. The shipped `native/R/library/RSQLite/DESCRIPTION` (lines 24 to 32; SHA-256 `6a75992107dae43a0a22d77ee57e0516ea6380bf586d304aa604a9a1bea763aa`) documents static linking and an optional HTTP/HTTPS virtual file system through libcurl, and `NEWS.md` (lines 3 to 21; SHA-256 `d7a4bdc703457f6a7a361a8aa7a64312b3b8094ab572cd6228997f1509fc889d`) describes that feature in the 3.53.x series. Both files match their ZIP entries. Limits: this documents what the feature is for. It does not prove that the optional feature was enabled in this build or ever exercised, and the version strings remain unlabelled-string evidence. Whether the libraries named in the strings are linked, and which upstream licenses follow, remains as stated in Addendum 4: not determined.

### 2.5 curl 7.1.0 libcurl stack: build-recipe corroboration, and Brotli and Zstandard unestablished

The shipped curl 7.1.0 DESCRIPTION records a build dated 30 May 2026. The versioned recipe for that package (https://raw.githubusercontent.com/cran/curl/7.1.0/tools/winlibs.R) downloads `curl-8.14.1-ucrt-x86_64.tar.xz` from the fixed-version bundle release (https://github.com/r-windows/bundles/releases/tag/curl-8.14.1 ; generation script https://raw.githubusercontent.com/r-windows/bundles/curl-8.14.1/lib/functions.sh). The archive (3,352,308 bytes, SHA-256 `da31bdb4e3d018f9cb84e032ee2255d3018dff13434b41db3aadf0cefd90a2d2`, equal to GitHub's digest) was read for its manifest text only; no library inside it was extracted, installed or executed. Its manifest lists libcurl 8.14.1-1, OpenSSL 3.5.0-1, libssh2 1.11.0-2, nghttp2 1.65.0-1 and zlib 1.3-9000. This agrees with the versions in Addendum 4 section 3 (libcurl 8.14.1, OpenSSL 3.5.0, libssh2 1.11.0, nghttp2 1.65.0), which were read from embedded strings; it is build-recipe evidence that corroborates them, not a replacement for them.

Limits. No byte identity between the bundle's static objects and the shipped curl DLL was established. The bundle's zlib version is not transferred to the shipped DLL (which resolves zlib at run time), to any other DLL, or to the runtime-loaded zlib.

Correction to Addendum 4 section 5, which said brotli and zstd are "present but unversioned" in the curl DLL. Brotli and Zstandard are unestablished: feature-name strings do not prove presence, and the bundle manifest does not prove absence. Neither appears in the bundle manifest or its pkg-config records. No version, and no presence, is claimed for either.

### 2.6 pdftools 3.9.0: Poppler stays not determined

Addendum 4 listed Poppler as not determined, and that stands. The package's Windows recipe uses the Rtools pkg-config first and falls back to Poppler 25.09.1 only when that is absent (https://raw.githubusercontent.com/cran/pdftools/3.9.0/src/Makevars.win ; https://raw.githubusercontent.com/cran/pdftools/3.9.0/tools/winlibs.R). The fallback does not prove which Poppler is in the shipped DLL, so 25.09.1 is not a shipped fact and is not asserted. The HarfBuzz and libpng values recorded in Addendum 4 align with an Rtools45 snapshot (6768), but that linkage is inference, and R's Makeconf names Rtools45 without a revision (https://cran.r-project.org/bin/windows/Rtools/rtools45/news.html). The Poppler, Little CMS, xz and FreeType versions are not promoted to shipped facts. The JPEG library (pdftools and qpdf) and the bzip2 and xz versions in R.dll remain unresolved.

## 3. Unchanged by this addendum

The "probable" rows of Addendum 4 (json-c, SpatiaLite, minizip, OpenJPEG, QPDF, libxml2 in xml2, libxlsxwriter) are unchanged. The libsndfile statement in Addendum 5 is unchanged. The legal basis for redistributing `d3dcompiler_47.dll`, `dxil.dll` and the Visual C++ runtime copies, the xz 5.2.5 COPYING text and the source-offer contact are unchanged. These source and build-manifest findings do not replace redistribution review.

## 4. Status

**Not legal clearance; not lawyer-reviewed. Unresolved versions remain open technical evidence work.**
