((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({
  key: "AIzaSyDL8W7ikBLiPq1YFzp4AY_oypZ-5WueiEQ",
  v: "beta",
});

let map;

const eventBtn = document.getElementById("eventBtn");
const tourBtn = document.getElementById("tourBtn");
let tab = "event";

eventBtn.addEventListener("click", () => {
  tab = "event";
  initMap();
});

tourBtn.addEventListener("click", () => {
  tab = "tour";
  initMap();
});

async function initMap() {
  const position = { lat: 10.183154152902322, lng: -68.00279953242793 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const infoWindow = new google.maps.InfoWindow();
  let events = [];

  fetch(`${import.meta.env.PUBLIC_DB}mapmarker/`)
    .then((response) => response.json())
    .then((data) => {
      events = data;
      Markers(events);
    });

  map = new Map(document.getElementById("map"), {
    zoom: 14,
    center: position,
    mapId: "647d707882fb14a3",
  });

  function Markers(events) {
    for (const event of events) {
      const date = new Date(event.eventDate);
      const formatdate = date.toLocaleDateString("en-GB");

      function markerContent(bg, border, glyph) {
        const glyphImg = document.createElement("img");
        glyphImg.src = glyph;

        const glyphSvgPinView = new google.maps.marker.PinView({
          scale: 1.4,
          background: bg,
          borderColor: border,
          glyph: glyphImg,
        });

        return glyphSvgPinView.element;
      }

      function genMarker(event, content) {
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: event.lat, lng: event.long },
          title: event.title,
          content: content,
        });

        marker.addListener("click", () => {
          infoWindow.close();
          if (event.category === "event" && tab === "event") {
            infoWindow.setContent(`
                        <div>
                        <p class="font-bold">${event.title}</p>
                        <p>${event.description}</p>
                        <p>Fecha del evento: ${formatdate}</p>
                        </div>
                        `);
          } else if (tab === "tour" && event.category !== "event") {
            infoWindow.setContent(`
                        <div>
                        <p class="font-bold">${event.title}</p>
                        <p>${event.description}</p>
                        </div>
                        `);
          }
          infoWindow.open(marker.map, marker);
        });
      }

      if (event.category === "event" && tab === "event") {
        const icon = markerContent("#6a012d", "#4f0020", "/icons/event.svg");
        genMarker(event, icon);
      } else if (tab === "tour" && event.category !== "event") {
        const icon = markerContent("#6a012d", "#4f0020", "/icons/event.svg");
        genMarker(event, icon);
      }
    }
  }
}

initMap();
