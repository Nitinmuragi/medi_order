# Medical Delivery - Render Deployment Guide

This project is ready for Render with small production settings already added.

## What was prepared

- Added production server dependency: gunicorn
- Added database driver dependency used by your config: PyMySQL
- Added Render blueprint file: render.yaml
- Updated DB config to safely read DATABASE_URL in production

## Deploy on Render

1. Push this project to GitHub.
2. In Render, click New + and choose Blueprint.
3. Select your repository.
4. Render will read render.yaml and create the web service.
5. In Render dashboard, set required environment variables:
   - DATABASE_URL (your production database)
   - SECRET_KEY (already auto-generated if using blueprint)
   - MAIL_USERNAME, MAIL_PASSWORD, MAIL_DEFAULT_SENDER
   - RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET (if online payment is used)
   - GOOGLE_MAPS_API_KEY (if location autocomplete/geocoding is used)
6. Deploy.

## Local run

If you want to run the same project locally, keep `DATABASE_URL` pointed at your local database and set:

- `FLASK_APP=Med_run_final.py`
- `FLASK_ENV=development`

Then run:

flask run

## Database notes

- If you use Render PostgreSQL, DATABASE_URL is provided by Render.
- If you use external MySQL, set DATABASE_URL with SQLAlchemy URL format.

## Run migrations on Render shell

After first deploy, open Render Shell and run:

flask db upgrade

If Flask app path is not auto-detected, run:

set FLASK_APP=Med_run_final.py
flask db upgrade

## Important production notes

- The uploads directory on Render web services is ephemeral.
- Files uploaded at runtime can be lost on restart/redeploy.
- For permanent file storage, move uploads to cloud storage (S3, Cloudinary, etc.).

## Current project structure feedback

Your structure is acceptable and deployable now.

Recommended future improvements:
- Move routes out of Med_run_final.py into blueprint modules for maintainability.
- Add tests for auth, order flow, payment callback, and admin flow.
- Add a small health endpoint like /health for uptime checks.
