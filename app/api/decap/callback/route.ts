import { NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code') || ''
  const provider = 'github'

  const html = `<!doctype html><html><body><script>
    (function() {
      function recieveMessage(e) {
        if (!e || !e.source || e.source !== window.opener) return;
      }
      window.addEventListener('message', recieveMessage, false);
      var data = { code: '${code}', provider: '${provider}' };
      window.opener.postMessage({ type: 'authorization_response', ...data }, '*');
      window.close();
    })();
  </script></body></html>`

  return new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
