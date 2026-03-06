# https://kellymarino.github.io/knowledge-graphs-2026/data.ttl

## Response headers (curl -I)

```
HTTP/2 200 
server: GitHub.com
content-type: text/turtle; charset=utf-8
last-modified: Mon, 02 Mar 2026 21:29:51 GMT
access-control-allow-origin: *
strict-transport-security: max-age=31556952
etag: "69a6014f-236"
expires: Wed, 04 Mar 2026 15:54:10 GMT
cache-control: max-age=600
x-proxy-cache: MISS
x-github-request-id: 16B2:3F0A0C:164347:167070:69A8534A
accept-ranges: bytes
age: 0
date: Wed, 04 Mar 2026 15:44:10 GMT
via: 1.1 varnish
x-served-by: cache-fra-etou8220135-FRA
x-cache: MISS
x-cache-hits: 0
x-timer: S1772639050.495945,VS0,VE111
vary: Accept-Encoding
x-fastly-request-id: c5ddcec13071491a0f7dfb395856468ee9ffb7fd
content-length: 566
```

## Comments on publication features

- **Content-Type:** The server sends `text/turtle; charset=utf-8`, which is the correct media type for RDF in Turtle. RDF clients can interpret the resource as Turtle without relying on the file extension.

- **CORS:** CORS is enabled via `access-control-allow-origin: *`, so any web origin can request this resource. This is suitable for in-browser Linked Data clients or apps that fetch your RDF from another domain.

- **HTTPS:** The resource is served over HTTPS, and `strict-transport-security: max-age=31556952` (HSTS) instructs browsers to use HTTPS only for this host for about a year. The publication is secure and integrity-protected in transit.

- **Caching:** Caching is supported. The server sends `cache-control: max-age=600` (10 minutes), `etag` for validation, `expires`, and `last-modified`. CDN/proxy headers (`x-cache`, `via`, `x-served-by`) show that responses can be cached at the edge. This reduces load and can improve performance for repeated access.

- **Compression:** There is no `content-encoding` header (e.g. `gzip` or `br`) on this response, so the body is sent uncompressed. `vary: Accept-Encoding` indicates the server may vary by encoding for some requests, but this particular response is not compressed. For a small file (566 bytes), the impact is minor; for larger RDF datasets, enabling compression would improve transfer size and speed. So this aspect is only partly covered by the current setup.