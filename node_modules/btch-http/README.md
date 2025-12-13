# btch-http

A lightweight, type-safe HTTP client built on Node.js `https` module.  
Includes a quick `HttpGet` function and a full-featured `HttpClient` class with GET/POST, timeout, headers, and error handling.

---

## Features

- **Zero dependencies** – uses only Node.js `https`
- **TypeScript-first** – full type safety
- **HttpGet** – one-liner GET with URL encoding
- **HttpClient** – reusable client with config, headers, query params, POST
- **Smart error handling** – `HttpError` with status & response
- **Timeout support** – automatic cleanup on timeout

---

## Installation

Using npm:

```bash
npm install btch-http
```

Using yarn:

```bash
yarn add btch-http
```

Using pnpm:

```bash
pnpm add btch-http
```

Using bun:

```bash
bun add btch-http
```

---

## Usage

### 1. Quick GET with `HttpGet`

```ts
import { HttpGet } from 'btch-http';

const result = await HttpGet<any>(
  'ttdl',                                          // endpoint
  'https://tiktok.com/@user/video/123',            // url to scrape
  '1.0.0',                                         // client version
  30000,                                           // timeout (ms)
  'https://backend1.tioo.eu.org'                   // base URL
);

console.log(result);
```

> Automatically appends `?url=...` and sets proper headers.

---

### 2. Full Client with `HttpClient`

```ts
import { HttpClient } from 'btch-http';

const client = new HttpClient({
  baseUrl: 'https://api.example.com',
  version: '2.0.0',
  timeout: 10000,
});

// GET with query params
const res1 = await client.get<{ id: number }>('users', { active: '1' });
console.log(res1.data);

// POST with JSON body
const res2 = await client.post<{ success: boolean }>('login', {
  username: 'john',
  password: 'secret'
});
console.log(res2.status, res2.data);

// POST with custom headers
const res3 = await client.post('upload', { file: '...' }, {
  Authorization: 'Bearer xyz'
});
```

---

## Configuration

```ts
interface HttpClientConfig {
  baseUrl: string;
  version: string;
  timeout?: number;           // default: 60000
  defaultHeaders?: Record<string, string>;
}
```

---

## Response Format

```ts
interface HttpResponse<T> {
  status: number;
  statusText: string;
  data: T | null;
  headers: Record<string, string>;
}
```

---

## Error Handling

```ts
try {
  await client.get('not-found');
} catch (error) {
  if (error instanceof HttpError) {
    console.log(error.status);      // e.g. 404
    console.log(error.message);     // e.g. "Not Found"
    console.log(error.response?.data);
  }
}
```

> `HttpError` is thrown for:
> - HTTP status ≥ 300
> - Network errors
> - Timeouts
> - JSON parse failures

---

## Exports

```ts
export { HttpGet, HttpClient, HttpError };
export type { HttpClientConfig, HttpResponse };
```

---

## Example: TikTok Downloader

```ts
import { HttpGet } from 'btch-http';

const url = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243';
const data = await HttpGet(
  'ttdl',
  url,
  '1.0.0',
  30000,
  'https://backend1.tioo.eu.org'
);

console.log('Download URL:', data.video);
```

---

## License

MIT
