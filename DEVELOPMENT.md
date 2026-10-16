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
