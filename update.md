# Weekly Content Update Guide

This document outlines the steps required to update the LRICBC website with the latest worship programs and pastor's messages from Gmail.

## 1. Fetch Latest Emails

By default, the script now only searches the last **30 days** of emails to ensure fast weekly updates.

### Local Environment
Run the following command in the `lricbc-web` directory:
```bash
npm run fetch-updates
```

**Options:**
- To search a specific number of days: `npm run fetch-updates -- --days 7`
- To search all history: `npm run fetch-updates -- --all`

### GCP / Production
If running inside the container or via a CI/CD pipeline, ensure `credentials.json` and `token.json` are present in the root. The command is the same:
```bash
npm run fetch-updates
```

---

## 2. Process Emails into Content

This step parses the downloaded JSON files in the `pending/` directory and generates Markdown files in `src/content/updates/`.

```bash
npm run process-updates
```

---

## 3. Verify Changes

Check the `src/content/updates/` directory for new `.md` files. You can run the development server to see how they look:
```bash
npm run dev
```

---

## 4. Deployment

### Local Version (Testing/Dev)
No further steps are needed once the Markdown files are generated; Next.js will pick them up.

### GCP Platform (Production)
Since this project uses a Dockerized deployment (as seen in `Dockerfile` and `deploy.ps1`), follow these steps to push updates:

1. **Commit the new content:**
   ```bash
   git add src/content/updates/*.md
   git commit -m "docs: add weekly updates for [Date]"
   ```

2. **Deploy:**
   If using the provided PowerShell script:
   ```powershell
   ./deploy.ps1
   ```
   *Note: Ensure your GCP SDK is authenticated and the project is set correctly.*

---

## Troubleshooting

- **No emails found:** Verify the lookback period using `--days 60` or `--all`.
- **Authentication Error:** If `token.json` is expired or invalid, delete it and run `npm run fetch-updates` locally to trigger a new browser-based OAuth flow.
- **Parsing Issues:** If a specific email fails to process, check `scripts/process-emails.ts` for updated markers (e.g., if the email subject or structure changed).

## For any questions, please reach out to chinesechurch@icbc.org