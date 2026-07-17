# Awin integration

This branch adds Awin support alongside Rakuten.

## Environment variables

Set these on the server before syncing or generating links:

```bash
AWIN_OAUTH_TOKEN=
AWIN_PUB_ID=
AWIN_CAMPAIGN_NAME=kanqoo
AWIN_API_BASE_URL=https://api.awin.com
```

`AWIN_ACCESS_TOKEN` and `AWIN_PUBLISHER_ID` are also accepted as aliases.

## Sync Awin merchants

Use this admin endpoint:

```bash
POST /api/admin/awin/merchants/sync
```

It fetches joined Awin programmes and upserts them into the shared `Merchant` collection with `network: "awin"`. After sync, the existing admin merchants page can show them with the Awin network filter because `/api/admin/merchants` already supports `network=awin`.

## Publisher tracking links

The existing endpoint now supports both networks:

```bash
POST /api/publisher/marketplace/deep-links
```

Body example:

```json
{
  "network": "awin",
  "merchantId": "12345",
  "url": "https://merchant.example/product"
}
```

The route uses Awin Link Builder and stores a cloaked `/go/<shortId>` link in the existing `Link` model.

## Important database index note

`models/Merchant.js` now uses a compound unique index:

```js
{ network: 1, mid: 1 }
```

If MongoDB already created the old unique index on `mid`, drop it once before syncing Awin:

```js
db.merchants.dropIndex("mid_1")
db.merchants.createIndex({ network: 1, mid: 1 }, { unique: true })
```

Without this, a Rakuten merchant and an Awin merchant with the same numeric MID can collide.

## Security note

The old `.txt` file with live environment values was removed from this branch. Rotate any keys that were committed there and set fresh values only in deployment environment variables.
