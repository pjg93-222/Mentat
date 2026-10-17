# Mentat 1.0.3 - Third-Party Notices, Addendum 5 (correction to Addendum 4)

Release: https://github.com/pjg93-222/Mentat/releases/tag/desktop-preview-v1.0.3
Written 2026-10-16T12:25:24Z (UTC). Additive: `Mentat-1.0.3-THIRD-PARTY-NOTICES-ADDENDUM-4.md` and every earlier addendum are unchanged and remain published. Where this file conflicts with Addendum 4 section 4 or section 1, this file controls. No binary was touched.

**This addendum is not legal clearance.** It is not legal advice and has not been reviewed by a lawyer.

## 1. What this corrects

This addendum corrects Addendum 4 (dated 2026-10-16), section 4, "libsndfile". That section said that libsndfile "is therefore not a Mentat component". The inspection does not support that conclusion.

## 2. What the inspection found

The inspection looked for the file name libsndfile and for the string "libsndfile" in every .dll, .pyd, .exe, .json, .txt and .md file under runtime\mentat. It found no libsndfile file name and no "libsndfile" string in any of them.

## 3. What that means

It means libsndfile was not identified by the inspection. It is not proof that every possible embedded copy is absent. A statically linked or renamed copy, or a copy inside a file type that was not scanned, would not necessarily have been found by a file-name and string search.

The sentence "libsndfile is therefore not a Mentat component" is withdrawn. It is replaced by this sentence: "libsndfile was not identified in Mentat by filename/string inspection."

Nothing in Addendum 2 or Addendum 3 claims libsndfile for Mentat, and this addendum does not add such a claim. It only removes the statement of absence.

## 4. Installer and zip parity

Addendum 4 section 1 compared the installer payload with the published zip by file name, size and normalized CRC-32. That is the whole basis of the agreement it reports. It is not per-file cryptographic identity, and it is not proof of build order. Any reading that the installer and the zip were built from the same tree is an inference from that agreement, not an established fact, and should be read that way wherever Addendum 4 or an earlier addendum suggests it.

## 5. Still open

The native component versions that Addendum 4 section 5 lists as not determined remain unresolved. Establishing them is open technical evidence work. Nothing in this addendum resolves any of them.

## 6. Status

**This is a notices record, not legal clearance.** It has not been reviewed by a lawyer.
