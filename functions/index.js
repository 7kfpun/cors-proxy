'use strict';

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const fetch = require('node-fetch');

const blockedPhrases = new RegExp(/porn|sexy/);  // No thank you.

/**
 * Returns the response body of the requested url, url should be encoded with encodeURIComponent if there are additional
 * parameters for the requested url.
 *
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' \
 *        -d '{"url": "https://api.ipify.org/?format=json"}' \
 *        https://us-central1-<project-id>.cloudfunctions.net/cors
 *
 * This endpoint supports CORS.
 */
exports.cors = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log('Query:', req.query);
    console.log('Body:', req.body);

    let url = req.query.url;

    if (!url) {
      url = req.body.url;
    }

    if (!url) {
      res.status(403).send('URL is empty.');
    }

    console.log('Request:', url);

    // disallow blocked phrases
    if (url.match(blockedPhrases)) {
      res.status(403).send('Phrase in URL is disallowed.');
    }

    fetch(url, {
      method: req.method,
      body: req.get('content-type') === 'application/json' ? JSON.stringify(req.body) : req.body,
      headers: {
        'Content-Type': req.get('Content-Type'),
      },
    })
    .then(r => r.headers.get('content-type') === 'application/json' ? r.json() : r.text())
    .then(body => res.status(200).send(body));
  });
});
