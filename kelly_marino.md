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

## Comments on publication features (simple version)

- **Content-Type:** The server sends `text/turtle; charset=utf-8`. This is the right format for RDF written in Turtle. Programs that read RDF can understand this as Turtle without needing to look at the `.ttl` file ending.

- **CORS:** The header `access-control-allow-origin: *` turns on CORS for everyone. This means any website is allowed to request this file. This is good for web apps that want to load your RDF from another site or from the browser.

- **HTTPS:** The file is sent over HTTPS. The header `strict-transport-security: max-age=31556952` (HSTS) tells browsers to always use HTTPS for this site for about a year. This keeps the connection secure and helps protect the data while it moves over the network.

- **Caching:** Caching is turned on. The server sends `cache-control: max-age=600` (10 minutes), an `etag`, `expires`, and `last-modified`. Extra headers like `x-cache`, `via`, and `x-served-by` show that copies of the response can be stored on servers close to the user. This can make the file load faster when people request it again.

- **Compression:** There is no `content-encoding` header like `gzip` or `br`, so the file is sent without compression. `vary: Accept-Encoding` means the server might use compression for some requests, but not for this one. For a small file (566 bytes) this is not a big problem. For bigger RDF files, turning on compression would help send less data and speed things up.