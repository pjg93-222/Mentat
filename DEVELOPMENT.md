# Developing Mentat

This repository (https://github.com/pjg93-222/Mentat, branch `main`) is the independent home of the Mentat source. Develop here, with its own `origin`.

## Workflow

1. Clone into its own folder, not inside any Melange checkout:

   ```
   git clone https://github.com/pjg93-222/Mentat.git
   cd Mentat
   ```

2. Work on a branch, commit, and push to this clone's `origin`:

   ```
   git switch -c my-change
   git commit -am "Describe the change"
   git push -u origin my-change
   ```

   Merge to `main` by fast-forward or pull request. Never force-push `main`.

## Do not push Mentat changes from the old local worktree

The older local folder `C:\Users\pgoff\Mentat` is a git worktree that shares Melange's git metadata. Its `origin` is the Melange remote. Do not use it to push Mentat changes: they would go into Melange. Treat it as read-only history; port anything unfinished there into a clone of this repository.

## What this repository does not contain

The published tree excludes private and runtime data on purpose; see `FILTER_REPORT.txt` (ADDENDUM) for the per-file list and reasons:

- `mentat/inputs/` (analyst workbooks and curated overrides), `mentat/state/`, `mentat/audits/`, `mentat/.cache/`.
- FEC donor data. It is staff-only and must never be committed here. This includes `mentat/tests/fixtures/memo_redisclosure_cases.json`, which holds real contributor names.
- Licensed IBISWorld figures and the built `mentat/tools/pocket/mentat-pocket.html` data snapshot.

Supply these locally from the staff data store when running the full pipeline or the tests that read them. Keep them out of commits: the tracked `.gitignore` files help, but check `git status` before every commit.

## Isolated acceptance testing

Test a packaged build from the unpacked output, never by running the installer. Launch the unpacked executable with an isolated profile:

```
<unpacked build>\<App>.exe --melange-isolated-profile=C:\absolute\path\to\scratch-profile
```

The directory must be absolute, local and separate from production application state (`Documents\MelangeApplicationState`, `Documents\MelangeApplications`, legacy `MelangeApps` and the install folder); the app refuses an overlapping, relative or repeated switch. In this mode login startup, OS registration and native update installation are disabled, and the window title carries "[isolated test profile]". Trust, enrollment and signature checks are unchanged. The mode writes a log at `<profile>\logs\isolated-profile.log`.

Cleanup: delete the scratch profile directory when finished. Device credentials are not stored in the profile. Enrolling or authenticating during a test writes Windows Credential Manager entries whose target names start with `MelangeSystems.Desktop.` (for example `MelangeSystems.Desktop.Access.Token/...`). Remove the ones created by the test (Control Panel, Credential Manager, Windows Credentials, or `cmdkey /list` then `cmdkey /delete:<target>`) so they do not carry into later runs or a real install.
