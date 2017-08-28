# cors-proxy

## Introduction

*CORS Proxy calls with Cloud Functions*

## Initial setup, build tools and dependencies

### 1. Clone this repo

```bash
git clone git@github.com:7kfpun/cors-proxy.git
```

### 2. Create a Firebase project and configure the quickstart

Create a Firebase Project on the [Firebase Console](https://console.firebase.google.com).

Set up your Firebase project by running `firebase use --add`, select your Project ID and follow the instructions.

### 3. Install the Firebase CLI and enable Functions on your Firebase CLI

You need to have installed the Firebase CLI. If you haven't run:

```bash
npm install -g firebase-tools
```

> Doesn't work? You may need to [change npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

## Deploy the app to prod

First you need to install the `npm` dependencies of the functions:

```bash
cd functions && npm install; cd ..
```

This installs locally:
 - The Firebase SDK and the Firebase Functions SDK.
 - The [cors](https://www.npmjs.com/package/cors) npm package to allow Cross Origin AJAX requests on the endpoint.
 - The [node-fetch](https://www.npmjs.com/package/node-fetch) npm package to bring window.fetch to Node.js.

Deploy to Firebase using the following command:

```bash
firebase deploy
```

This deploys and activates the cors Function.

> The first time you call `firebase deploy` on a new project with Functions will take longer than usual.

## Try the sample

After deploying the function you can open the following URLs in your browser:

```
curl https://us-central1-<project-id>.cloudfunctions.net/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson
```

You can also send the format in the request body. For instance using cURL in the command line:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://api.ipify.org/?format=json"}' \
  https://us-central1-<project-id>.cloudfunctions.net/cors
```

## License

Released under the [MIT License](http://opensource.org/licenses/MIT).
