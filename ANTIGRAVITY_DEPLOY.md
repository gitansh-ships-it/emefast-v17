# Antigravity deployment checklist

Open this repository in Antigravity and deploy it using the included configs.

1. Deploy `backend` as a Render Node web service using `render.yaml`.
2. Wait for `GET /api/health` to return `{"status":"ONLINE"}`.
3. Deploy the repository root to Vercel using `vercel.json`.
4. Set Vercel environment variable `NEXT_PUBLIC_API_URL` to the Render API URL ending in `/api`.
5. Set Render `CORS_ORIGINS` to the exact Vercel origin.
6. Keep Render `DEMO_MODE=0` for the real Accept/Decline workflow.
7. Open the Vercel URL in a normal browser and test the complete multi-hospital flow.

Do not change the current Liquid Glass UI or location logic while deploying.
Do not add Google Maps keys; the current map is Leaflet/OpenStreetMap.
Do not introduce an ambulance-dispatch workflow; EMEFast coordinates an ambulance that already exists.

Final QA must include:
- emergency creation
- simultaneous hospital query visibility
- hospital Accept
- hospital Decline + required reason
- accepted-hospital comparison
- recommendation / fastest / cheapest views
- voice recording + hospital playback
- manual incident pin
- browser GPS permission behavior
- light/dark theme
- mobile 390x844
- no localhost API requests in production
- no CORS errors
