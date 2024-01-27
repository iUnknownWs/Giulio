(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "AIzaSyDL8W7ikBLiPq1YFzp4AY_oypZ-5WueiEQ", v: "beta",});

let map;

async function initMap() {
    const position = { lat: 10.183154152902322, lng: -68.00279953242793 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const parser = new DOMParser();
    const infoWindow = new google.maps.InfoWindow();
    const events = [{ position: position, title: "Fundatur", }, { position: { lat: 12, lng: -70 }, title: "Donde esta yan", }];

    map = new Map(document.getElementById("map"), {
        zoom: 14,
        center: position,
        mapId: "647d707882fb14a3",
    });

    for (const event of events) {
        const glyphImg = document.createElement("span");
        glyphImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M10.95 18.35L7.4 14.8l1.45-1.45l2.1 2.1l4.2-4.2l1.45 1.45zM5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/></svg>';


        const glyphSvgPinView = new google.maps.marker.PinView({
            scale: 1.4,
            background: '#6a012d',
            borderColor: '#4f0020', 
            glyph: glyphImg,
        });

        const marker = new AdvancedMarkerElement({
            map,
            position: event.position,
            title: event.title,
            content: glyphSvgPinView.element,
        })

        marker.addListener("click", ({ domEvent, latLng }) => {
            const { target } = domEvent;

            infoWindow.close();
            infoWindow.setContent(`<span><strong>${marker.title}</strong> <br/> ${latLng}</span>`);
            infoWindow.open(marker.map, marker);
        });
    }
}

initMap();