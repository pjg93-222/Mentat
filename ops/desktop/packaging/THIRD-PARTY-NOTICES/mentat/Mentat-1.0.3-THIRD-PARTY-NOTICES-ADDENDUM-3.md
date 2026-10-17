# Mentat 1.0.3 - Third-Party Notices, Addendum 3 (citation corrections)

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3
Written 2026-10-16T11:01:19Z (UTC). This corrects `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-2.md` (the original is unchanged and was not replaced). Where this file and Addendum 2 disagree on the lines below, this file controls. No binary was touched.

**This is a notices record, not legal clearance.** It corrects citations in an earlier addendum. It is not legal advice and has not been reviewed by a lawyer.

## Correction 1 (required): Addendum 2 line 18, reference to a non-existent asset

**Original (line 18, last sentence):**

> `Python-and-packages.md` for Mentat says `LICENSE.txt` carries OpenSSL, libffi, SQLite, expat, zlib "and others"; that sentence overstates the file for SQLite, expat and zlib, and this section supplies them.

**Should say:**

> The Mentat release has no `Python-and-packages.md` asset. The statement about `LICENSE.txt` carrying OpenSSL, libffi, SQLite, expat and zlib "and others" is made in the `Python-and-packages.md` assets of the Terrier and Melange releases (https://github.com/pjg93-222/Geo/releases/download/desktop-preview-v1.0.3/Python-and-packages.md and https://github.com/pjg93-222/Melange/releases/download/desktop-preview-v1.0.3/Python-and-packages.md), for the same python.org CPython 3.12.10 `LICENSE.txt` (36,874 bytes, same CRC-32 in all three packages). That sentence overstates the file for SQLite, expat and zlib; Addendum 2 section 1 supplies those texts. Mentat's own record on this point is `Mentat-1.0.3-THIRD-PARTY-SOURCES.md` (lines 160 and 343-345).

**Reason:** the cited asset does not exist on the Mentat release (the release's 14 assets, listed with `gh release view` after the uploads, include no file named `Python-and-packages.md`). The sentence was carried over from the Terrier and Melange wording. Found by the Codex verifier (`third-party-notices-addendum2-verification-20261016.md`).

## Additional precision items (found on re-reading Addendum 2; not in the verifier's list)

**A. Line 191**, original: "(read from Mentat's package; Terrier's md lists the same wheel versions)". Should say: "(read from Mentat's package; the `Python-and-packages.md` asset on the Terrier release, https://github.com/pjg93-222/Geo/releases/download/desktop-preview-v1.0.3/Python-and-packages.md, lists the same wheel versions)". Reason: "Terrier's md" named no asset or link, and that asset is not on this release.

**B. Line 291**, original: "`Mentat.exe` is described in the Mentat record as the re-branded Electron executable". Should say: "`Mentat.exe` is described in `Mentat-1.0.3-THIRD-PARTY-SOURCES.md` (this release; lines 10 and 336) as the Electron 44.7.2 runtime re-branded by electron-builder, not byte-identical to upstream `electron.exe`". Reason: names the exact asset instead of "the Mentat record" (which is also the unpublished owner receipt).

## Related note (a conflict between two published files, not a citation error)

`Mentat-1.0.3-THIRD-PARTY-SOURCES.md` line 345 says `python/LICENSE.txt` is "the CPython/PSF text only (it mentions libffi and Tcl/Tk)" and that bzip2 and OpenSSL notices are not shipped. Addendum 2 section 1 reports, from reading the file on disk, that it also contains full bzip2 text (starting near line 326), the full libffi MIT text (near line 366), an unlabelled Apache License 2.0 text (near line 389) and the Tcl, Tk and Tix terms (near lines 566-700). The two statements conflict; the file itself is the evidence (`resources/runtime/mentat/python/LICENSE.txt`, 702 lines), and Addendum 2 reflects it. Both agree that SQLite, zlib, expat and xz texts are absent.

## Status

**This is a notices record, not legal clearance.** It corrects citations in an earlier addendum. It is not legal advice and has not been reviewed by a lawyer.

