const DEFAULT_API_ORIGIN = 'https://warrantx-api.onrender.com';
const DEFAULT_FALLBACK_API_ORIGIN = 'https://warrantx-app.onrender.com';
const UPSTREAM_TIMEOUT_MS = 8_000;

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

type RouteContext = { params: Promise<{ path: string[] }> };

function apiOrigins(): string[] {
  return [
    process.env.WARRANTX_API_URL,
    process.env.WARRANTX_API_FALLBACK_URL,
    DEFAULT_API_ORIGIN,
    DEFAULT_FALLBACK_API_ORIGIN,
  ].reduce<string[]>((origins, value) => {
    const normalized = value?.trim().replace(/\/+$/, '');
    if (normalized && !origins.includes(normalized)) origins.push(normalized);
    return origins;
  }, []);
}

function shouldTryFallback(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function upstreamRequestHeaders(request: Request): Headers {
  const headers = new Headers();
  for (const name of ['accept', 'authorization', 'content-type']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

function proxyResponse(response: Response, origin: string): Response {
  const headers = new Headers();
  response.headers.forEach((value, name) => {
    if (!HOP_BY_HOP_HEADERS.has(name.toLowerCase())) headers.set(name, value);
  });
  headers.set('x-warrantx-api-origin', origin);
  return new Response(response.body, { status: response.status, headers });
}

async function proxy(request: Request, context: RouteContext): Promise<Response> {
  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const pathname = `/api/${path.map(encodeURIComponent).join('/')}`;
  const body = request.method === 'GET' || request.method === 'HEAD'
    ? undefined
    : await request.arrayBuffer();

  for (const origin of apiOrigins()) {
    const target = new URL(pathname, `${origin}/`);
    target.search = incomingUrl.search;

    try {
      const response = await fetch(target, {
        method: request.method,
        headers: upstreamRequestHeaders(request),
        body: body && body.byteLength > 0 ? body : undefined,
        cache: 'no-store',
        redirect: 'manual',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (!shouldTryFallback(response.status)) return proxyResponse(response, origin);
    } catch {
      // Continue to the next API after network errors or timeouts.
    }
  }

  return Response.json(
    { error: 'The WarrantX API is temporarily unavailable' },
    { status: 503, headers: { 'cache-control': 'no-store' } }
  );
}

export const GET = proxy;
export const HEAD = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
