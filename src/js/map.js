(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "AIzaSyDL8W7ikBLiPq1YFzp4AY_oypZ-5WueiEQ", v: "beta",});

let map;

async function initMap() {
    const position = { lat: 10.183154152902322, lng: -68.00279953242793 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const parser = new DOMParser();
    const glyphImg = document.createElement("img");

    glyphImg.src =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/google_logo_g.svg";

    const glyphSvgPinView = new google.maps.marker.PinView({
        glyph: glyphImg,
    });

    map = new Map(document.getElementById("map"), {
        zoom: 14,
        center: position,
        mapId: "647d707882fb14a3",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Fundatur",
        content: glyphSvgPinView.element,
    });
}

initMap();