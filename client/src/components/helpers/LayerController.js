import LeafletLayers from './ProvidersLeafletLayers'  
  
  // layers control
  const baseMaps= {
     "Default: ( OSM )": LeafletLayers.defaultLayer,
     "World Imagery":  LeafletLayers.worldImagery,
     "Open Street Map": LeafletLayers.openStreetMap,
     "Dark": LeafletLayers.dark,
   }
 
   const overlayMaps= {
     "WMS GrAdpf": LeafletLayers.wms,
     "WMS World Area ": LeafletLayers.wmsWorldCountries,
     "WMS World Line ": LeafletLayers.wmsWorldLine,
     "Google Street": LeafletLayers.googleStreets,
     "Google Satellite": LeafletLayers.googleSat,
     "Google Hybrid": LeafletLayers.googleHybrid,
     "Google Terrain": LeafletLayers.googleTerrain,
   }

   export {baseMaps, overlayMaps}