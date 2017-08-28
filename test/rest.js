import config from 'config';
import fetch from 'node-fetch';
import test from 'ava';

test('header', async t => {
  const request = fetch(
    `http://localhost:8010/${config.get('project_id')}/us-central1/cors?url=${encodeURIComponent('https://httpbin.org/headers')}`
  )
  .then(r => r.json());

  const response = await request;
  t.truthy(response.headers);
  t.truthy(response.headers.Accept);
  t.truthy(response.headers['Accept-Encoding']);
  t.is(response.headers.Connection, 'close');
  t.is(response.headers.Host, 'httpbin.org');
  t.regex(response.headers['User-Agent'], /node-fetch/);
});


test('https://httpbin.org/get', async t => {
  const request = fetch(
    `http://localhost:8010/${config.get('project_id')}/us-central1/cors?url=${encodeURIComponent('https://httpbin.org/get')}`
  )
  .then(r => r.json());

  const response = await request;
  t.is(response.url, 'https://httpbin.org/get');
});


test('https://httpbin.org/post', async t => {
  const request = fetch(
    `http://localhost:8010/${config.get('project_id')}/us-central1/cors?url=${encodeURIComponent('https://httpbin.org/post')}`,
    {
      method: 'POST',
      body: JSON.stringify({ name: 'cors-proxy', author: 'kf' }),
      headers: { 'Content-Type': 'application/json' },
    }
  )
  .then(r => r.json());

  const response = await request;
  t.is(response.url, 'https://httpbin.org/post');
  t.is(response.data, JSON.stringify({ name: 'cors-proxy', author: 'kf' }));
});
