import L from "leaflet";
// leaflet stuffs

const defaultLayer =   L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {});
 
const worldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' , {
	maxZoom: 20,
});
const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const dark= L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	subdomains: 'abcd',
	maxZoom: 19
});
const water= L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
const  terrain= L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

// wms stuffs ...

const wms = L.tileLayer.wms("https://geoservices.informatievlaanderen.be/raadpleegdiensten/Adpf/wms", {
    layers: 'Adpf2020',
    format: 'image/png',
    transparent: true,
    attribution: "ADPF2020 layer added",
});

const wmsWorldCountries= L.tileLayer.wms("https://ahocevar.com/geoserver/wms", {
    layers: 'ne:ne_10m_admin_0_countries',
    format: 'image/png',
    transparent: true,
});

const wmsWorldLine= L.tileLayer.wms("https://ahocevar.com/geoserver/wms", {
    layers: "ne_10m_admin_0_boundary_lines_land",
    format: 'image/png',
    transparent: true,
});


//google stuffs 

const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 });
const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 });
 const googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 });
 const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
     maxZoom: 20,
     subdomains:['mt0','mt1','mt2','mt3']
 }); 


const LeafletLayers= {
    wms,
    wmsWorldCountries,
    wmsWorldLine,
    terrain,
    worldImagery,
     defaultLayer, 
     dark,
     water,
     openStreetMap,
     googleSat,
     googleStreets,
     googleTerrain,
     googleHybrid
}

export default LeafletLayers
