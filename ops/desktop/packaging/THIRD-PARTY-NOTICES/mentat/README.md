# Mentat desktop - third-party notices (in the package)

The build (`.github/workflows/desktop-windows.yml`) copies this folder unchanged into
`resources/runtime/mentat/THIRD-PARTY-NOTICES/` and checks every file byte for byte in the final win-unpacked tree and
in the preview zip before any upload. The build adds `Python-and-packages.md` there, generated from each bundled wheel.

## R is free software under the GNU General Public License

Mentat bundles R 4.6.0 and R packages, unmodified CRAN Windows binaries, at `resources/runtime/mentat/native/R/`.
R is licensed under the GNU General Public License, version 2 or version 3 (`native/R/COPYING`; full texts in
`native/R/share/licenses/GPL-2` and `GPL-3`; other component terms in `native/R/doc/COPYRIGHTS`). Many bundled R
packages are GPL or LGPL; each one's license and license files are listed in `R-and-Node-SOURCES.md`. These programs
come with ABSOLUTELY NO WARRANTY. The corresponding source of R and of every bundled R package, with the sha256 of the
exact upstream file, is listed in `R-and-Node-SOURCES.md`.

## Files

| File | What it is |
|---|---|
| `R-and-Node-SOURCES.md` | Upstream source URL and sha256 for R 4.6.0, each of the 97 R library directories and Node.js 24.18.0; license and license files per R package. Written for 1.0.5. |
| `Mentat-1.0.3-THIRD-PARTY-SOURCES.md` | The 1.0.3 sources and licenses document, unchanged (published asset sha256 `58d50b6c2e914d101e7c7e4d07eed6a017f43474788b4faa362ad188eef253e6`). |
| `Mentat-1.0.3-THIRD-PARTY-SOURCES-ADDENDUM-1.md` | Its corrections (sha256 `f966295d21be96295bd300ec3dae5cd78e24ac4d07d14ca2b485167d96b236d0`). |
| `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-2.md` | **Redacted copy** of the published 1.0.3 asset of that name (published sha256 `1442cfd07b8e4dd01e8450ff7431f625f35f4b80e2b7c4b89b35ec171cb849d3`, 30,151 bytes). One change only: on line 10 the local build path prefix is replaced by `<local build folder>`. This copy's sha256 is `e7c2bbab93ef67cc445e3d5a6356775839dc36e5a762440a747e73db6d78fffc` (30,133 bytes). Citations of the published sha256 in the other addenda refer to the published asset at <https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3>. |
| `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-3.md` .. `-6.md` | The other 1.0.3 notices addenda, unchanged (sha256 `3024e0df…`, `7dce78a5…`, `84e9a918…`, `1ff75252…`). |

The 1.0.3 documents describe the same native R and Node bytes that 1.0.5 ships (every file is checked against
`ops/desktop/packaging/mentat-native-runtime.sha256`, generated from the 1.0.3 preview zip) and the same Electron
44.7.2. Their Python sections describe 1.0.3 (23 wheels, cryptography 46.0.7); for 1.0.5 the Python list is
`Python-and-packages.md` (cryptography 49.0.0, hash-locked in `mentat-runtime.constraints.txt`).

## Open (owner)

- **GPL written source offer and contact: NOT SET.** No contact address for source requests is given in this package.
  The release owner must decide the offer wording and supply the contact. Until then this folder records where the
  corresponding source is; it is not a written offer.
- These files are notices, not legal clearance. The gaps listed in the 1.0.3 documents (section 8 of the sources
  document; Addenda 4-6 "still not determined") are unchanged.
