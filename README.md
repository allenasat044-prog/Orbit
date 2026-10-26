# Orbit EO

Orbit EO is a web app for exploring satellite imagery and describing it with AI. You drop a pin on a 3D globe, find real Sentinel satellite scenes that cover that exact spot, cut a preview image centred on the pin, and ask an AI model to describe it. You can also watch locations over time and see the history of update runs on a dashboard.

This README describes everything built so far, how it fits together, how to run it, and what is and is not finished.

- [What it does](#what-it-does)
- [Status at a glance](#status-at-a-glance)
- [How it fits together](#how-it-fits-together)
- [Repository layout](#repository-layout)
- [Running it locally](#running-it-locally)
- [Configuration](#configuration)
- [Feature guide](#feature-guide)
- [API reference](#api-reference)
- [Database](#database)
- [AI models](#ai-models)
- [Security notes](#security-notes)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Data and model licences](#data-and-model-licences)

---

## What it does

1. **Explore.** Search a place name, type coordinates (`28.6129,77.2295`), or click the globe. A red pin marks the spot and the app lists Sentinel scenes whose footprint actually contains that point, newest first, with cloud cover filtering.
2. **Preview.** Press *Preview* on a scene. The server downloads the scene's true-colour image from the Copernicus Data Space Ecosystem and cuts a north-up image centred exactly on your pin (1.3, 2.6 or 5.1 km wide). The preview is laid on the globe at the pin.
3. **Describe.** Press *Describe this image* and a vision-language model writes a short, cautious caption. Every caption is stored with the model, version, device, prompt and timing, and is labelled AI-generated.
4. **Compare models.** Press *Compare models* to run every available caption model on the same preview and see GeoRSCLIP scene tags and an image-to-caption match score next to each caption. Models that cannot run on this machine are listed with the reason.
5. **Captions page.** Lists your saved captions with their preview images, scene date, location and model, with delete.
6. **Monitor and update.** Save a pin as a monitored location, then run an update. The app looks for new scenes over each monitored location since the last successful check, registers them, and can optionally preview and caption the newest ones. Runs appear on the Dashboard.
7. **Accounts.** Sign up and log in with email and password.

## Status at a glance

"Confirmed" means you ran it on your own Mac and told me it works. "Delivered" means the code is written and tested in my sandbox but you have not confirmed it yet.

| Stage | What | Status |
|---|---|---|
| 1 | Backend skeleton: Express API, FastAPI ML service, Supabase Postgres and PostGIS, health checks | Confirmed |
| 2 | Accounts: sign up, log in, token check | Confirmed |
| 3 | Imagery search with pin-point location, click-the-globe pin, footprints, register scene | Confirmed |
| 4a | Download and preview: north-up pin-centred image placed on the globe | Confirmed |
| 4b | AI captions with SmolVLM-Instruct (warm-up confirmed on your Mac, Apple GPU) | Confirmed |
| 4c | Captions page: list and delete saved captions | Confirmed |
| 4d | Sharper previews (1024 px display image) | Delivered, feedback pending |
| 5 | Monitored locations and update runs feeding the Dashboard | Delivered, awaiting your test |
| 6a | Research model registry: EarthGPT, SkySenseGPT, TerraScope, RS-LLaVA, MTRS paper recorded honestly as unavailable, with reasons | Delivered |
| 6b | GeoRSCLIP scene tags, caption match scores, Compare models | Delivered, real weights not yet run on your Mac |
| 7 | Historical change (same pin across dates, change maps) | Done |
| 8 | Weather forecast | in progress done mostly |
| 9 | Personal library (Bookmarks, Lists, Labels, Records, profile data) | Planned |
| 10 | Automation and hardening (scheduled runs, API docs, security review) | Planned |
| Hosting | Vercel + Supabase, Google and GitHub sign-in, SEO, one URL | Planned |
| Final | Frontend enhancement (Dock, Slidebar, search bar, background, themes, profile page, F&Q) | Planned |

The **Analysis** and **Updates** pages are still the original "Not built yet" placeholders.

## How it fits together

```
Browser (React + Cesium, port 5173)
   |  /api/*  (Vite dev proxy)
   v
Express API (Node, port 3000) ---------------> Supabase Postgres + PostGIS
   |  \--> Copernicus STAC search, Copernicus downloads, OpenStreetMap Nominatim
   |  in-process job queue (chips, captions, comparisons, update runs)
   v
FastAPI ML service (Python, port 8000)
   - raster: cut and resample the preview image (rasterio)
   - models: SmolVLM-Instruct (captions), GeoRSCLIP (scene tags and match scores)
   |
   v
Local storage folder (storage/): downloaded scene files and preview images
```

- **Frontend**: Vite, React, TypeScript, Tailwind, shadcn components, CesiumJS with OpenStreetMap base tiles. The dev server proxies `/api` to the Express API.
- **API**: Node 20+, Express. Validation with zod, rate limits, structured JSON errors (`{"error": {"code", "message"}}`).
- **ML service**: Python 3.11, FastAPI. Models load lazily and one at a time. The service only reads and writes inside the storage folder.
- **Database**: PostgreSQL with PostGIS on Supabase, reached through the session pooler with SSL.
- **Jobs**: long work runs as jobs with a status you can poll. One job runs at a time by default. Retryable failures (provider outages, ML service down) are retried with exponential backoff up to three attempts. Jobs left running when the server restarts are marked failed.
- **Storage**: a local folder. Large files are never stored in the database; the database keeps paths, checksums and metadata.

## Repository layout

```
.
├── src/                         Frontend
│   ├── App.tsx                  Routes
│   ├── pages/
│   │   ├── Explore.tsx          Globe, search, pin, previews, captions, compare, monitor
│   │   ├── Captions.tsx         Saved captions list
│   │   ├── AuthPage.tsx         Log in and sign up
│   │   ├── PageShell.tsx        Shared page frame
│   │   └── ComingSoon.tsx       Placeholder (Analysis, Updates)
│   ├── lib/auth.ts              Token storage and auth calls
│   └── components/ui/           Design components (search group, dashboard, ...)
├── server/                      Express API
│   ├── src/
│   │   ├── index.js             Wiring and startup
│   │   ├── app.js               Express app, rate limits, error handling
│   │   ├── config.js            Environment settings
│   │   ├── auth/                Passwords (scrypt), tokens, routes, middleware
│   │   ├── providers/           Copernicus STAC search, login, downloads
│   │   ├── imagery/             Search routes, acquisitions, chips, geometry helpers
│   │   ├── captions/            Caption job, repo, routes
│   │   ├── comparisons/         Compare-models job, repo, routes
│   │   ├── regions/             Monitored locations
│   │   ├── updates/             Update engine, runs repo, routes
│   │   ├── jobs/                Job repo and in-process runner
│   │   ├── geocode.js           Place search with caching and throttling
│   │   ├── storage.js           Safe local storage paths
│   │   └── scripts/cdse-check.js  Copernicus login check
│   ├── migrations/              001 to 007 SQL migrations
│   └── test/                    Unit, route and real-database tests
├── ml-service/                  FastAPI ML service
│   ├── app/
│   │   ├── main.py              Endpoints
│   │   ├── raster.py            Preview image extraction
│   │   └── models/              Adapters: SmolVLM, GeoRSCLIP, candidates, registry, warm-up
│   ├── requirements.txt         Service only
│   ├── requirements-ml.txt      Adds the AI model libraries
│   └── tests/
├── storage/                     Downloaded scenes and previews (git-ignored)
├── docker-compose.yml           Optional local Postgres (not needed when using Supabase)
└── .gitignore
```

## Running it locally

You need three things running: the API, the ML service and the website.

### Prerequisites

- Node.js 20 or newer
- Python 3.11 (on a Mac with Homebrew: `/opt/homebrew/bin/python3.11`)
- A Supabase project with the **PostGIS** extension enabled (Database, then Extensions, then `postgis`)
- A free Copernicus Data Space account at `dataspace.copernicus.eu` (needed to download scenes)
- About 6 GB of free disk for model weights, and 16 GB of memory is comfortable

### 1. Install the website

```
npm install
```

### 2. Set up the API

```
cd server
npm install
cp .env.example .env
```

Open `server/.env` and fill in at least these values (see [Configuration](#configuration)):

- `DATABASE_URL`: the Supabase **session pooler** connection string, with the password URL-encoded
- `DATABASE_SSL=true`
- `JWT_SECRET`: at least 32 characters. Generate one with `openssl rand -hex 32`
- `COPERNICUS_USERNAME` and `COPERNICUS_PASSWORD`
- `GEOCODER_USER_AGENT`: include your contact email, as the OpenStreetMap usage policy asks

Then create the database tables and check the Copernicus login:

```
npm run migrate
npm run cdse:check
```

### 3. Set up the ML service

```
cd ml-service
/opt/homebrew/bin/python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements-ml.txt
```

Download and test the models once (the first run downloads several GB):

```
python -m app.models.warmup
python -m app.models.warmup georsclip-vit-b-32
```

Each should end with `OK on mps` (or `cpu`) and a result.

### 4. Start everything

Terminal 1, the ML service:

```
cd ml-service
source .venv/bin/activate
uvicorn app.main:app --port 8000
```

Terminal 2, the API:

```
cd server
npm run dev
```

Terminal 3, the website:

```
npm run dev
```

Open `http://localhost:5173`, sign up, and go to **Explore**.

Check the API itself with:

```
curl -s localhost:3000/api/health
```

You want `"status":"ok"` with the database and ML service both `ok`.

## Configuration

All API settings live in `server/.env`. Never commit this file.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | API port |
| `DATABASE_URL` | local Postgres on 5433 | Supabase session pooler connection string |
| `DATABASE_SSL` | `false` | Set `true` for Supabase |
| `JWT_SECRET` | none | **Required**, 32 or more characters. The server refuses to start without it |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `ML_SERVICE_URL` | `http://localhost:8000` | Where the ML service runs |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed website origin |
| `COPERNICUS_USERNAME`, `COPERNICUS_PASSWORD` | none | Needed to download scenes |
| `COPERNICUS_STAC_URL` | CDSE STAC v1 | Catalogue address |
| `COPERNICUS_TOKEN_URL` | CDSE identity service | Login service |
| `DOWNLOAD_ALLOWED_HOSTS` | `dataspace.copernicus.eu` | Hosts the downloader may contact |
| `MAX_DOWNLOAD_BYTES` | `400000000` | Largest download allowed |
| `DOWNLOAD_TIMEOUT_MS` | `300000` | Download timeout |
| `STORAGE_DIR` | `../storage` | Where files are kept. The API and ML service must point at the same folder |
| `GEOCODER_URL`, `GEOCODER_USER_AGENT` | Nominatim, `orbit-eo/0.1` | Place search |
| `PROVIDER_TIMEOUT_MS`, `PROVIDER_RETRIES` | `20000`, `2` | Catalogue request behaviour |
| `JOB_CONCURRENCY` | `1` | Jobs run at once |
| `RATE_LIMIT_PER_MIN`, `AUTH_RATE_LIMIT`, `SEARCH_RATE_LIMIT` | `300`, `30` per 15 min, `60` | Rate limits |
| `HEALTH_TIMEOUT_MS` | `3000` | Health check timeout |

ML service settings (environment variables, all optional):

| Variable | Purpose |
|---|---|
| `STORAGE_DIR` | Same folder as the API (default `../storage`) |
| `ORBIT_DEVICE` | Force `cpu`, `mps` or `cuda` |
| `ORBIT_DTYPE` | Force `float16`, `bfloat16` or `float32` if the Apple GPU gives trouble |

## Feature guide

### Search and the pin

The search endpoint accepts a place name, `lat,lon`, an explicit `lat` and `lon`, or a bounding box. For a point, the app searches a tiny box around it and then keeps only scenes whose footprint contains the point exactly, so you get the scenes that really cover your pin, not every tile that touches a city. Place names are resolved to one point with OpenStreetMap's Nominatim (results are cached and requests are throttled to follow its usage policy). Results are paged with an opaque cursor that remembers the pin.

Supported collections: `sentinel-2-l2a` (default), `sentinel-2-l1c`, `sentinel-1-grd`. Cloud filtering applies to Sentinel-2 only.

### Registering scenes

Registering a scene stores its metadata in the `acquisitions` table: footprint (PostGIS), platform, cloud cover, resolution, the chosen true-colour asset, a compact index of all assets (including band information) and attribution. A scene is stored once, no matter how many times it is registered.

### Previews

The preview job:

1. Registers the scene if needed.
2. Logs in to Copernicus (the token is cached and refreshed) and downloads the 10 m true-colour file once per scene. Downloads only go to allow-listed Copernicus hosts, follow redirects safely, enforce a size limit, and are checksummed.
3. Reads the needed part of the scene and resamples it onto a north-up grid centred exactly on the pin, so the pin is always in the middle of the image.
4. Rejects previews that are mostly empty (scene edge or no data).
5. Saves a native-resolution PNG and a sharper 1024 px display PNG (Lanczos enlargement plus a moderate sharpen).

Sizes: Close 128 px (1.3 km), Medium 256 px (2.6 km), Wide 512 px (5.1 km). The preview is placed on the globe, and the large blue scene outline is hidden while it shows.

Sentinel-2 true colour is 10 m per pixel, so roads, fields, water and large buildings show, but individual houses and cars do not. The sharpened display image only improves how it looks; it adds no real detail. *Show pixels* switches to the true 10 m pixels.

### Captions

The default model is SmolVLM-Instruct. The prompt asks it to describe only what is visible (land cover, vegetation, water, roads, built-up areas and their arrangement), not to name places, count objects or guess dates, and to say when something is unclear. Each caption is stored once per preview, model and prompt, with the model checkpoint, revision, device, data type, prompt and latency. The interface labels every caption as AI-generated and says the model is general-purpose, not trained on satellite imagery.

### Compare models

Runs every available caption model on a preview and stores the comparison. GeoRSCLIP adds the top scene tags (forest, farmland, water body, urban built-up area, clouds and others) and an image-to-caption cosine similarity ("image match") per caption. That score is a rough signal and not a measure of truth. A model that fails is reported next to the ones that worked. Models that cannot run are listed with their reasons.

### Monitored locations and update runs

- *Monitor this location* saves the current pin (up to 20 per user), with an optional "also describe new scenes" setting.
- *Check for new scenes now* starts an update run. For each of your active locations the run searches for scenes since the last successful check (14 days back the first time, then from the last success with a one-day overlap), keeps scenes covering the pin, skips ones already known, and registers new ones. With auto-describe on, it previews and captions the newest three new scenes per location.
- Only one run can be active at a time, enforced by the database.
- A provider outage fails only that location. A location only moves its "last success" forward when its search and registrations worked, so missed scenes are retried next time.
- A run is marked failed only if every location's search failed. Individual problems are counted in `failed_tasks` and listed in the run's details.
- There is no automatic scheduler yet. Runs are started manually.

### Dashboard

The Dashboard reads `GET /api/updates/history` without logging in, so history and status are public and contain counts only (status, new scenes, captions created, failed tasks, times). Per-location details and error messages require login and are visible only to the run's owner or an admin.

## API reference

All routes are under `/api`. Errors look like `{"error": {"code": "...", "message": "..."}}`.

### Public

| Method | Path | Notes |
|---|---|---|
| GET | `/health` | Database and ML service status (503 if degraded) |
| GET | `/providers` | Provider health (Copernicus) |
| GET | `/imagery/search` | `q`, `lat`, `lon`, `bbox`, `start`, `end`, `collection`, `cloud_max`, `limit`, `cursor`, `type` |
| GET | `/imagery/:id` | A registered scene |
| GET | `/chips/:id` | Preview metadata (bounds, pin position, resolution) |
| GET | `/chips/:id/image` | Preview PNG. Add `?variant=display` for the sharper version |
| GET | `/captions/:id` | One caption with provenance |
| GET | `/comparisons/:id` | One saved comparison |
| GET | `/models`, `/models/:id` | Model registry from the ML service, with availability and reasons |
| GET | `/updates/status` | Running run, last run, last success |
| GET | `/updates/history` | Runs, newest first (`limit` up to 200, `cursor`) |
| POST | `/auth/signup`, `/auth/login` | Returns `{token, user}` |

### Requires login

| Method | Path | Notes |
|---|---|---|
| GET | `/auth/me` | Current user |
| POST | `/imagery/ingest` | Register a scene |
| POST | `/imagery/:id/chip` | Body: `lat`, `lon`, `size_px` (128 to 1024). Returns the preview, or a job |
| GET | `/jobs/:id` | Job status. Only the owner or an admin |
| POST | `/captions` | Body: `chip_id`, optional `model_id`, `prompt`. Returns the caption or a job |
| GET | `/captions` | Your captions (`limit`, `cursor`) |
| DELETE | `/captions/:id` | Owner or admin |
| POST | `/captions/compare-models` | Body: `chip_id`, optional `model_ids`. Returns a job |
| GET, POST | `/regions` | List or add monitored locations |
| PATCH, DELETE | `/regions/:id` | Edit or remove |
| POST | `/updates/run` | Start an update run (409 if one is running) |
| GET | `/updates/runs/:id` | Full run details with per-location results |

Rate limits: general 300 per minute, auth 30 per 15 minutes, search 60 per minute, captions 20 per minute, comparisons 10 per minute, update runs 6 per minute.

### ML service (internal, port 8000)

`GET /health`, `GET /models`, `GET /models/{id}`, `POST /caption`, `POST /classify`, `POST /score`, `POST /raster/chip`. It only reads and writes inside the storage folder and rejects any path that escapes it.

## Database

Migrations run in order with `npm run migrate` and are safe to run again.

| Migration | Adds |
|---|---|
| `001_init` | PostGIS and the provider table |
| `002_users` | Users (email, scrypt password hash, role `user` or `admin`) |
| `003_acquisitions` | Scenes with PostGIS footprints, assets and attribution |
| `004_jobs_assets_chips` | Jobs, downloaded assets, preview images |
| `005_captions` | Captions with full provenance |
| `006_regions_updates` | Monitored locations and update runs (one running run at a time) |
| `007_comparisons` | Saved model comparisons |

Row Level Security is enabled on every table, so Supabase's public Data API cannot read them. The Express API connects directly as the database owner.

## AI models

The registry (`GET /api/models`) lists every candidate with its status and the reason when it cannot run.

| Model | Role | Runs here? | Licence note |
|---|---|---|---|
| SmolVLM-Instruct (2B) | Default captions | Yes, confirmed on an Apple GPU (about 4.5 GB) | Apache-2.0 |
| GeoRSCLIP (ViT-B/32) | Scene tags, caption match, retrieval | Integrated; warm-up not yet confirmed on your Mac (about 1 GB download) | Tagged "cc" on Hugging Face with no specific variant; the GitHub repo states none. Check before commercial use |
| RS-LLaVA (7B LoRA) | Remote-sensing captions | No: needs a CUDA GPU and about 14 GB | Licence file present, type not confirmed |
| EarthGPT | Remote-sensing assistant | No: the repository has only a README and images, no weights or code | None stated |
| SkySenseGPT | Remote-sensing assistant | No: dataset and benchmarks only, no public weights found | Apache-2.0 (repository) |
| TerraScope (8B) | Pixel-grounded reasoning, change over time | Not yet: about 16 GB of weights does not fit in 16 GB of shared memory; strong candidate for Stage 7 | Code Apache-2.0; checkpoint licence not confirmed |
| MVLT-LoRA-CC (MTRS paper) | Change captioning | No: 24B model, no code or weights link in the paper | Paper is open access (CC BY) |

SkySense and SkySense++, OSM-CLIP, "Mind the Modality Gap" and the CLIP captioning papers have not been checked yet.

A useful finding from the MTRS paper: general-purpose models do very badly at describing change between two dates (CIDEr 7.0 for Mistral 24B and 2.5 for Qwen2-VL-72B, against 72.3 for the trained model). Stage 7 therefore plans to detect change with image methods and use captions only to narrate it, with stated uncertainty.

The ML service never fabricates output. A model that cannot run reports why, and an empty model answer is an error, not a blank caption.

## Security notes

- Secrets live in `server/.env`, which is git-ignored. There are no credentials in the frontend.
- Passwords are hashed with scrypt and a unique salt. Login failures give the same message whether or not the email exists.
- Tokens are signed JWTs with a fixed algorithm; expired, tampered and "none" algorithm tokens are rejected.
- Downloads only go to allow-listed hosts, over https, with the Copernicus token sent only to those hosts, including after redirects. Pagination cursors are checked so the server cannot be pointed at other sites.
- File paths are checked on both services so nothing outside the storage folder can be read or written.
- Row Level Security is on for every table. Users can only list and delete their own captions, monitored locations and job details.
- Rate limits are applied to everything, with stricter ones on login, search and the expensive AI endpoints.

## Testing

Run these from the repository folders.

```
cd server
npm test
```

```
cd ml-service
source .venv/bin/activate
python -m pytest -q
```

At the time of writing the Node suite has 98 passing tests and the Python suite has 45. Real-database tests are skipped unless you point them at a database:

```
cd server
TEST_DATABASE_URL="your-connection-string" TEST_DATABASE_SSL=true node --test test/*.integration.test.js
```

Use a throwaway database for this, as the tests create and remove their own rows.

Tests use fakes for the network (Copernicus, geocoder, ML service) and for the AI model weights. That means the real weights and the real Copernicus downloads are only exercised when you run the app yourself.

## Troubleshooting

| Problem | Fix |
|---|---|
| `python: command not found` in a new terminal | Activate the environment first: `source .venv/bin/activate` inside `ml-service` |
| Server exits saying `JWT_SECRET is missing` | Add a 32 or more character `JWT_SECRET` to `server/.env` |
| `ECONNREFUSED` to the database | Check `DATABASE_URL` is the session pooler string, the password is URL-encoded, and `DATABASE_SSL=true` |
| Health shows `ml_service` down | Start the ML service on port 8000 |
| "Searching Captions is not available yet" | The dropdown next to the search box is set to Captions. Switch it to Location or All |
| Preview says to log in | Previews, captions and updates need an account |
| Preview fails with a login or download error | Run `npm run cdse:check` in `server` and check the Copernicus credentials |
| Caption says "Missing Python packages" | Run `pip install -r requirements-ml.txt` in `ml-service` |
| `cannot import name 'AutoModelForVision2Seq'` | Update to the latest code. Newer versions of `transformers` renamed the class and the loader handles both |
| Apple GPU gives odd or empty results | Set `ORBIT_DTYPE=float32` before starting the ML service |
| An update run says no monitored locations | Press *Monitor this location* on Explore first |
| `docker: command not found` | Docker is not needed. The project uses Supabase for the database |

## Known limitations

- **Resolution.** Free Sentinel-2 imagery is 10 m per pixel. Close previews look soft by nature. Finer detail would need paid very-high-resolution imagery.
- **Caption quality.** The default captioner is a small general-purpose model and can describe things that are not there. Treat captions as rough, which is why they are labelled AI-generated.
- **No scheduler.** Update runs are manual until the automation stage.
- **Public run history.** History and status are public, counts only. This is fine for a single-user project and should be reviewed before real multi-user use.
- **Single job runner.** Jobs run inside the API process, one at a time. A restart marks interrupted jobs as failed.
- **Not deployed.** It runs locally. The ML service needs a machine with enough memory (an Apple GPU or CUDA GPU for good speed) and cannot run on Vercel or Supabase themselves.
- **Unverified details.** Sorting by newest uses a catalogue option that falls back to unsorted if rejected. The Sentinel-1 result parser has not been checked against live Sentinel-1 data. The exact wording of the Copernicus attribution should be confirmed against their terms.
- **Place search policy.** OpenStreetMap's Nominatim asks for a contact in the user agent and at most one request per second. Set `GEOCODER_USER_AGENT` and keep the limits in place.

## Roadmap

Planned stages, in order:

- **6 (remaining).** Confirm GeoRSCLIP on your machine. Optional: add more runnable models.
- **7. Historical change.** The same pin across dates, change maps, evidence masks, and an evaluation approach that scores change and no-change cases separately.
- **8. Weather forecast.** A weather data service and a forecast time slider. The provider is still to be chosen and its licence checked.
- **9. Personal library.** Bookmarks, Lists, Labels and Records, plus profile data.
- **10. Automation and hardening.** Weekly scheduled runs, API documentation, security review, rollback.
- **Hosting.** Host on Vercel with Supabase for the database and Google and GitHub sign-in, set up SEO, and serve everything from one URL with no manual terminal steps. The ML service and job queue will need a separate always-on host.
- **Final. Frontend enhancement.** Explore layout from the design board (search on top, side list of views, globe), Dock, Slidebar, search bar, space background, themes, GitHub-style profile page, F&Q page.

## Data and model licences

- **Imagery:** contains Copernicus Sentinel data, accessed through the Copernicus Data Space Ecosystem. Keep the attribution visible in the app.
- **Place search and map tiles:** © OpenStreetMap contributors.
- **SmolVLM-Instruct:** Apache-2.0.
- **GeoRSCLIP:** licence unclear, see the table above. Check before commercial use.
- **Other research models:** see the AI models table. Weights and checkpoints keep their own licences, and several are not published at all.
