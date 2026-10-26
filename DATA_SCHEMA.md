# Rootline JSON backup schema — version 1

The backup is a complete JSON object exported from **Data & backups**. All dates are stored as ISO 8601 strings when recorded in the app. This schema is intended to be stable and portable.

```json
{
  "format": "rootline-emotional-atlas",
  "exportedAt": "2026-10-26T12:00:00.000Z",
  "version": 1,
  "episodes": [],
  "roots": [],
  "trust": [],
  "tags": [],
  "draft": {},
  "settings": {"welcomeSeen": false}
}
```

## Episode (record)

- `id`: stable unique string ID. Maintained when revising.
- `status`: `staged` or `committed`.
- `title`, `when`, `createdAt`, `updatedAt`, `person`.
- Series 100: `presentEvent`, `emotions[]`, `intensity` (0–10), `body`.
- Series 200: `firstMeaning`, `memoryHook`, `associationTrail` (newline-separated sequence), `rootIds[]`, `memoryConfidence`.
- Series 300: `tagIds[]` references taxonomy records.
- Series 400: `protectiveUrge`, `actualResponse`.
- Series 500: `impact`, `need`, `boundary`, `uncertainty`, `appraisal`, `counterEvidence`, `unknowns`, `chosenResponse`, `repair`, `outcome`, `reviewDate`.

The app intentionally stores **your own working assessment** in `appraisal`, never a computed moral/clinical verdict.

## Origin (`roots[]`)

`id`, `createdAt`, `updatedAt`, `title`, `period`, `person`, `description`, `lesson`, `source`, `today`.

`source` expresses the kind of evidence: firsthand memory, contemporaneous writing, secondhand report, inference, or uncertainty.

## Trust observation (`trust[]`)

`id`, `createdAt`, `updatedAt`, `title`, `when`, `person`, `behavior`, `boundary`, `evidence`, `repair`, `contact`.

`evidence` is self-selected: `honored`, `mixed`, `crossed`, or `unknown`.

## Taxonomy (`tags[]`)

`id`, `name`, `description`, `createdAt`.

The built-in pressure-point IDs are `P01`–`P16`; custom tags have `CUSTOM-` IDs. An episode can reference multiple tags and origins. Removing an origin clears the matching link IDs without deleting the episode.

## Import behavior

Import rejects unknown schema versions and malformed high-level collection shapes. Merge uses stable IDs, preserving an existing local row when both backups have that ID. The UI supports editing and exporting after import. This is a self-contained format; it does not depend on any online service.

**Privacy:** The backup is plain, unencrypted text and may contain highly sensitive personal information. Keep copies in secure storage and do not commit them to your source repository.
