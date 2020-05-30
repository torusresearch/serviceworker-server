/* eslint-disable */
function getScope() {
  return self.registration.scope;
}

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", function (event) {
  try {
    const url = new URL(event.request.url);
    if (url.pathname.includes("redirect") && url.href.includes(getScope())) {
      event.respondWith(
        new Response(
          new Blob(
            [
              `
REDIRECT_HTML                        
${""}
  `,
            ],
            { type: "text/html" }
          )
        )
      );
    }
  } catch (error) {
    console.error(error);
  }
});
