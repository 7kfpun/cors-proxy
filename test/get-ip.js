import config from 'config';
import fetch from 'node-fetch';
import test from 'ava';


test('Return "URL is empty." while calling without url in GET request', async t => {
  const request = fetch(`http://localhost:8010/${config.get('project_id')}/us-central1/cors`)
    .then(r => r.text());

  const response = await request;
  t.is(response, 'URL is empty.');
});


test('Return "URL is empty." while calling without url in POST request', async t => {
  const request = fetch(`http://localhost:8010/${config.get('project_id')}/us-central1/cors`, {
    method: 'POST'
  })
    .then(r => r.text());

  const response = await request;
  t.is(response, 'URL is empty.');
});


test('Return ip while calling text api in GET request', async t => {
  const request = fetch(`http://localhost:8010/${config.get('project_id')}/us-central1/cors?url=https%3A%2F%2Fapi.ipify.org`)
    .then(r => r.text());

  const response = await request;
  t.regex(response, /^\d+\.\d+\.\d+\.\d+$/);
});


test('Return ip while calling text api in POST request', async t => {
  const request = fetch(`http://localhost:8010/${config.get('project_id')}/us-central1/cors`, {
    method: 'POST',
    body: JSON.stringify({ url: 'https://api.ipify.org' }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(r => r.text());

  const response = await request;
  t.regex(response, /^\d+\.\d+\.\d+\.\d+$/);
});


test('Return ip while calling json api in GET request', async t => {
  const request = fetch(`http://localhost:8010/${config.get('project_id')}/us-central1/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson`)
    .then(r => r.json());

  const response = await request;
  t.regex(response.ip, /^\d+\.\d+\.\d+\.\d+$/);
});


test('Return ip while calling json api in POST request', async t => {
  const request = fetch(`http://localhost:8010/${config.get('project_id')}/us-central1/cors`, {
    method: 'POST',
    body: JSON.stringify({ url: 'https://api.ipify.org/?format=json' }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(r => r.json());

  const response = await request;
  t.regex(response.ip, /^\d+\.\d+\.\d+\.\d+$/);
});
