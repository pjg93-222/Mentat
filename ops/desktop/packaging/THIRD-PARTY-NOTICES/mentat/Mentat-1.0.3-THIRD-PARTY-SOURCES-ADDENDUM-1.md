# Mentat 1.0.3 - Third-Party Sources, Addendum 1 (corrections)

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3
Written 2026-10-16T09:16:09Z. This addendum corrects and qualifies `Mentat-1.0.3-THIRD-PARTY-SOURCES.md` (sha256 `58d50b6c2e914d101e7c7e4d07eed6a017f43474788b4faa362ad188eef253e6`). That file, the installer, the zip and all other assets are unchanged. Where this addendum and the original disagree, this addendum controls.

**This is an incomplete inventory and source-link addendum, not a compliance clearance.**

## 1. Qualification of line 341 (source availability)

Line 341 of the original reads, in substance, that the upstream links are the corresponding source because the binaries are upstream builds. That statement is withdrawn as written.

* The upstream URLs in the original are pointers to upstream source releases for the named components (R, Node, Python, Electron/Chromium, and the CRAN and PyPI packages). They are not a complete corresponding-source mapping.
* The native and static build linkage has not been established. For example, it is not known which libcurl, OpenSSL, poppler, libxml2 or SQLite versions the CRAN Windows R packages link, nor which GDAL, GEOS, PROJ, libcurl or OpenSSL builds are vendored in the PyPI wheels (the wheels' `*.libs` directories contain DLLs with hashed names and no version record in the package).
* The claim that the R and Python components are unmodified upstream builds rests on provenance and file metadata. Only `node.exe` was hash-verified against upstream (sha256 `9a4eb5f1c29c6a2e93852ead46b999e284a6a5ca8bab4d4e241d587d025a52de`).
* Gaps listed in section 8 of the original remain open, including the missing license file for npm package `lazy-val` 1.0.5.
* GPL/LGPL source-offer wording has not been settled by the owner.

## 2. Correction of line 349 (DLL attribution)

Line 349 of the original grouped `vulkan-1.dll` with Microsoft redistributables without evidence. That grouping was wrong. Version resources were read from the files in `win-unpacked/` (B2 build) with `(Get-Item).VersionInfo` and `Get-AuthenticodeSignature`. Values are reproduced exactly as stored.

| File | Bytes | FileDescription | CompanyName | ProductName | ProductVersion | Authenticode | sha256 |
|---|---|---|---|---|---|---|---|
| vulkan-1.dll | 939,520 | 1.4.357.0 | (empty) | Vulkan Runtime | Vulkan Loader | NotSigned | 43e5e0182edb1ced86595a771e7efaa563bfaae595ea0bb74dc3c2df0de47b1a |
| d3dcompiler_47.dll | 4,741,488 | Direct3D HLSL Compiler for Redistribution | Microsoft Corporation | Microsoft Windows Operating System | 10.0.26100.7705 | Valid (Microsoft Windows) | a05f99734f7c4822fefc12b367af21fd0976ed6608752fb1e1e80b6ece7ecbbb |
| dxcompiler.dll | 25,744,384 | DirectX Compiler - Google Dawn Custom Build | Microsoft(r) Corporation | Microsoft(r) DirectX for Windows(r) - Google Dawn Custom Build | 1.9.2607.0 | NotSigned | fef76d190438ad137cfd585bd5ea340e51e66da175c3de97a3f42bed88cbd493 |
| dxil.dll | 1,509,760 | DirectX Compiler - Out Of Band | Microsoft(r) Corporation | Microsoft(r) DirectX for Windows(r) - Out Of Band | 1.8.2502.11 (239921522) | Valid (Microsoft Windows) | 77e039c905030a641e53658a008b74e90635a5ea9b6b79eabd0f2003bdfca59a |

### vulkan-1.dll
* The version resource does NOT name Khronos: CompanyName is empty. Its fields are stored in shifted positions (the version number sits in FileDescription, "Vulkan Loader" in ProductVersion), a quirk of the loader's own resource, and it carries "Copyright (C) 2015-2026" with no holder named. It is not signed.
* What the resource says is "Vulkan Loader", version 1.4.357.0, "Vulkan Runtime". That is consistent with the Khronos Vulkan loader (github.com/KhronosGroup/Vulkan-Loader) normally shipped with Electron/Chromium, but the resource alone does not confirm Khronos as the author, and no source or build record ties this file to a specific loader commit.
* License as upstream documents it: Apache-2.0 for the majority of files, with a few more-permissive exceptions. The package does contain that text: `LICENSES.chromium.html` has a "Vulkan Loader Components" entry (homepage KhronosGroup/Vulkan-Loader) reproducing "The majority of files in this project use the Apache 2.0 License" followed by the Apache 2.0 text. The pairing of that entry with this DLL is an inference, not something the package records.
* It is not a Microsoft redistributable. It is not covered by the "no Microsoft license text" gap.

### d3dcompiler_47.dll, dxcompiler.dll, dxil.dll
* All three report CompanyName Microsoft Corporation / Microsoft(r) Corporation.
* d3dcompiler_47.dll and dxil.dll carry a valid Microsoft Windows Authenticode signature. dxcompiler.dll is a "Google Dawn Custom Build" and is not signed.
* No Microsoft license or redistribution terms are in the package for these files, and `LICENSES.chromium.html` has no entry matching "d3dcompiler", "dxc" or "DirectXShaderCompiler". The basis on which they are redistributed (Microsoft redistribution terms for d3dcompiler_47; open-source DirectXShaderCompiler terms for the DXC builds) is not established by the package and was not verified here.

The Visual C++ runtime DLLs under `python/` (`vcruntime140*.dll`) were not re-examined; the original's statement about them stands as an unverified attribution.

## 3. Status

This is an incomplete inventory and source-link addendum, not a compliance clearance.
