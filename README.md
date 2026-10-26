# Rootline — Emotional Pattern Atlas

A fully native, installable progressive web app for personal emotional-pattern reflection. It is designed to record the present event, the memory it evokes, the protective response, the effect on other people, and the evidence needed to revisit a conclusion.

No React, frameworks, CDNs, trackers, external JavaScript, npm packages, build step, account, or server-side database are involved.

## What it can do

- **Stage a reaction** in four steps: Present → Echo → Protection → End point. Save an incomplete intake and finish later.
- **File across six record series**: `100` present event, `200` memory echo, `300` pressure point, `400` protective strategy, `500` impact/repair, `600` trust evidence.
- **Trace associative detours** as a thought-by-thought chain without forcing a memory.
- **Link one event to multiple pressure-point labels and origin records.** Create custom labels.
- **Explore a weighted word cloud and a connected SVG map** built from the links you entered. It does not infer a causal link you did not record.
- **Review behaviour over time** for any person, including respectful boundaries, violations, uncertainty, and observed repair.
- **Reopen and revise an entry** when new evidence arrives.
- **Search, filter, and examine trends** without an algorithm judging who is right or wrong.
- **Export and import a versioned JSON backup**, with merge-by-ID or replacement.

This app is a personal record and learning tool, not a diagnostic instrument or mental health treatment. It does not determine someone's motives, diagnose them, decide whether you can trust them, or establish the cause of a memory.

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `rootline-atlas`.
2. Upload **the files in this folder** to the repository root. Keep `index.html`, `app.js`, `db.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, and the icons together. Do not upload your exported JSON records.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source: Deploy from a branch**.
5. Select branch **main**, folder **/(root)**, and save.
6. Open the HTTPS URL GitHub provides. Use your browser's **Install app** or **Add to Home Screen** option.

GitHub Pages is a static host. Your app code is served publicly on many GitHub Pages setups even if your repository is private; do not put your personal entries into source files. Your actual Rootline entries stay in your browser's local database and are **not synced** to GitHub.

## Run locally

The app needs HTTPS or `localhost` for PWA installation/offline service workers. For example, if Python is installed:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`. There is no dependency installation.

## Your data and portability

The app uses browser **IndexedDB**, with localStorage fallback when IndexedDB is unavailable. On each device/browser profile, the entries are separate. There is **no automatic sync or encrypted vault**. A person with access to your unlocked browser profile may be able to inspect entries, and clearing website data can erase them.

Use **Data & backups → Export JSON** routinely, ideally after important sessions. Backups are readable JSON, so keep them somewhere private and protected. Import supports:

- **Merge:** add imported records with new IDs, preserve existing IDs and the current draft.
- **Replace:** overwrite the current database and draft after confirmation.

The JSON is a complete snapshot with `format: "rootline-emotional-atlas"` and `version: 1`. See [DATA_SCHEMA.md](DATA_SCHEMA.md).

## File structure

| File | Purpose |
| --- | --- |
| `index.html` | App shell and accessible navigation |
| `styles.css` | Responsive visual design, no external fonts |
| `db.js` | Native IndexedDB persistence and fallback |
| `app.js` | Forms, archive, cross-linking, map, trust ledger, export/import |
| `sw.js` | Offline cache for static app files only |
| `manifest.webmanifest`, icons | Installable PWA metadata |
| `.nojekyll` | GitHub Pages static-file publishing |

## Updating the app

For any future source change, bump the `CACHE` name in `sw.js` (for example `rootline-shell-v2`) to ensure that offline clients receive the updated app files. **Do not** clear IndexedDB as part of a source update.

## Clinical boundary

Trauma reminders and learned responses may contribute to how present events feel, but no single label or parent diagnosis establishes causation. A feeling can be legitimate while an interpretation remains uncertain and a behaviour warrants repair. The app is intentionally designed to preserve those distinctions. Stop an exercise if it becomes overwhelming. Seek a trained clinician for trauma-processing work or personalized BPD treatment.

If you may harm yourself or cannot stay safe, seek immediate human support. In Canada, call or text **988** for crisis support, or call **911** in immediate danger.

## References

- [VA National Center for PTSD — Trauma reminders](https://www.ptsd.va.gov/understand/what/trauma_triggers.asp)
- [APA — PTSD patients and families](https://www.apa.org/ptsd-guideline/patients-and-families)
- [MDN — IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [MDN — Service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [GitHub Docs — Publishing Pages from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
