(g => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a) })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)) })({
    key: "AIzaSyDL8W7ikBLiPq1YFzp4AY_oypZ-5WueiEQ", v: "beta",
});
let map;
let lat = 0;
let long = 0;
let authors = [];

async function initMap() {
    const position = { lat: 10.183154152902322, lng: -68.00279953242793 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 14,
        center: position,
        mapId: "647d707882fb14a3",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Fundatur",
    });
    map.addListener('click', (e) => {
        map.panTo(e.latLng);
        marker.position = e.latLng;
        lat = e.latLng.lat();
        long = e.latLng.lng();
        document.getElementById("lat").value = lat;
        document.getElementById("long").value = long;
    })
}
initMap();

document.getElementById("mapForm").addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const lat = document.getElementById("lat").value;
    const long = document.getElementById("long").value;
    const date = document.getElementById("inputdate").value;
    const author = document.getElementById("selauthor").value;
    const formData = {
        title: title,
        description: description,
        category: category,
        lat: lat,
        long: long,
        eventDate: date,
        author: author
    };
    fetch(`${import.meta.env.PUBLIC_DB}mapmarker/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => {
        window.location.href = "/";
    })
});

async function getAuthors() {
    let response = await fetch(`${import.meta.env.PUBLIC_DB}/author/`)
    let data = await response.json()
    authors = data
    authors.forEach(author => {
        document.getElementById("selauthor").innerHTML += `<option value="${author.id}">${author.name}</option>`
    });
}

getAuthors()
