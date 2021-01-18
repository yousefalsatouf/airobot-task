import React, { useState, useEffect, useRef} from "react";
import * as L from "leaflet";
import LeafletLayers from './helpers/ProvidersLeafletLayers'
import { baseMaps, overlayMaps } from './helpers/LayerController'
import Button from '@material-ui/core/Button';
import { Card, CardContent } from "@material-ui/core";  
import axios from 'axios'
//import data from './helpers/data.js'
import 'leaflet-draw'
import "../css/Map.css"
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const DrawMap = ({ center, zoom}) => {

  const [layer] = useState(LeafletLayers.defaultLayer)
  const refContainer = useRef(null)
  const redIcon= require( '../imgs/red-marker.png')
  const prettyIcon= require('../imgs/lovely-marker.png')
  const blackIcon= require('../imgs/black-marker.png')
  const icon = L.icon({
    iconUrl: redIcon,
    iconSize: [50, 50]
  });
  const marker= L.marker(center, {icon: icon, draggable: true})
  const url= 'http://localhost:4000/draws/store'
  // export data
  const handelExportGeoJson= async (data) =>{
    await axios({
        method: 'post',
        url: url,
        data: data,
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
  }


  useEffect(() => {
    // display Map
    let map = L.map(refContainer.current).setView(center, zoom);

     layer.addTo(map);

     marker.bindPopup(`Airobot location on Lat:  ${marker.getLatLng().lat} / Lng: ${ marker.getLatLng().lng}`)
     marker.addTo(map)

     L.control.layers(baseMaps, overlayMaps).addTo(map)

    // Leaflet Draw
     var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
       edit: {
         featureGroup: drawnItems,
         poly : {
           allowIntersection : false
         }
       },
       draw: {
         circle: false,
         circlemarker: false,
         polygon : {
           allowIntersection: false,
           showArea:true,
           showLength: true,
         },
         polyline: {
          allowIntersection: false,
           showLength: true,
           showArea: true
         },
         marker: {
           icon:  icon,
         }
       }
     });
     map.addControl(drawControl);

     var _round = function(num, len) {
       return Math.round(num*(Math.pow(10, len)))/(Math.pow(10, len));
     };

     // Generate popup content based on layer type

     var getPopupContent = function(layer) {
       // Marker
       if (layer instanceof L.Marker) // if marker give me the lat and the lng
       {
         return`Lat: ${ layer.getLatLng().lat } / Lng:  ${layer.getLatLng().lng}`
       } 
       else if (layer instanceof L.Polygon) 
       {
          // Rectangle/Polygon - area
          var latLngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
          area = L.GeometryUtil.geodesicArea(latLngs);

          var sqMils= L.GeometryUtil.readableArea(area);
         
          return `Area in meters: ${area.toFixed(2)} ㎡ <br/> Area in mils ${sqMils}` // square mils
       // Polyline - distance
       } 
       else if (layer instanceof L.Polyline) 
       {
        var distance = 0
         latLngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs()
         area = L.GeometryUtil.geodesicArea(latLngs);
         sqMils= L.GeometryUtil.readableArea(area);

         if (latLngs.length < 2) {
           return "Distance: N/A";
         } else {
           for (var i = 0; i < latLngs.length-1; i++) {
             distance += latLngs[i].distanceTo(latLngs[i+1]);
           }
           if (_round(distance, 2) > 1000) {
             return  `Area: ${sqMils} <br/> Distance: ${_round(distance, 2)/1000 } km`// kilometers and miles
           } else {
             return  `Area: ${area.toFixed(2)} ㎡ <br/> Distance: ${_round(distance, 2) } m`/// meters
           }
         }
       }
       return null;
     };

     let linkElement = document.getElementById('export');
   
     // Object created - bind popup to layer, add to feature group
    map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        var content = getPopupContent(layer);
        if (content !== null) {
          layer.bindPopup(content);
        }
    
        // Add info to feature properties
        var feature = layer.feature = layer.feature || {};
        feature.type = feature.type || "Feature";
        var props = feature.properties = feature.properties || {}; // Intialize feature.properties
        props.info = content;
        drawnItems.addLayer(layer);
        //let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(drawnItems.toGeoJSON()));
        //let exportFileDefaultName = 'export_draw_CREATE.geojson';
        //linkElement.setAttribute('href', dataUri);
        //linkElement.setAttribute('download', exportFileDefaultName);

        console.log(JSON.stringify(drawnItems.toGeoJSON()));
        var geoObject = JSON.parse(JSON.stringify(drawnItems.toGeoJSON()))
        var data = geoObject.features[0]
        linkElement.addEventListener("click", ()=>handelExportGeoJson(data), true)
        console.log(data);
     });
   
     // Object(s) edited - update popups
      map.on(L.Draw.Event.EDITED, function(event) {
        var layers = event.layers,
        content = null;
        layers.eachLayer(function(layer) {
          content = getPopupContent(layer);
          if (content !== null) {
            layer.setPopupContent(content);
          }
          // Update info to feature properties
        
          var feature = layer.feature = layer.feature || {};
          var props = feature.properties = feature.properties || {};
          props.info = content;
        });
        console.log(JSON.stringify(drawnItems.toGeoJSON()));
        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(drawnItems.toGeoJSON()));
        let exportFileDefaultName = 'export_draw_EDIT.geojson';
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
     });
   
     // Object(s) deleted - update console log
      map.on(L.Draw.Event.DELETED, function(event) {
        console.log(JSON.stringify(drawnItems.toGeoJSON()));
        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(drawnItems.toGeoJSON()));
        let exportFileDefaultName = 'export_draw_DELETE.geojson';
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
     });

  }, [center, zoom, icon, layer]);


  return (
    <Card className="app__left">
        <CardContent >
          <div className="app__header map-header">
              <div>
              <h1>Map</h1>
              <small>Create some features with drawing tools then export to <strong>GeoJSON</strong> and<strong>mongoDB</strong></small>
              </div>
              <Button id="export" href="#" color="secondary">Export GeoJSON.</Button>
          </div>
          <div id="map" className="map" ref={refContainer}></div> 
        </CardContent>
      </Card>
  );
};

export default DrawMap;