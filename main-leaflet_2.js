
//intiating the map
var map = L.map('viewDiv',{
  //to make sure fractions are also accepted in setView
  zoomSnap: 0.5,
	//faster rendering otherwise var map = L.map('viewDiv) is enough
	renderer: L.canvas(),
  //so ppl cannot zoomout more
  minZoom: 3.4
});

//setting where the map should headed
map.setView([3, 19], 3.4);
map.setMaxBounds(map.getBounds());

//defining the OSM layer
osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

//defning the carto layer
var carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});


//removing the gird lines
(function(){
  var originalInitTile = L.GridLayer.prototype._initTile
  L.GridLayer.include({
      _initTile: function (tile) {
          originalInitTile.call(this, tile);

          var tileSize = this.getTileSize();

          tile.style.width = tileSize.x + 1 + 'px';
          tile.style.height = tileSize.y + 1 + 'px';
      }
  });
})()


//toogle button strategy
var toggle = false;

function toogleC() {
    if(!toggle) {
      map.removeLayer(data1);
    } else {
      map.addLayer(data1);
    }
    toggle = !toggle;
  }

var GL = L.tileLayer('https://storage.googleapis.com/gee_test_test/precipitation_test/{z}/{x}/{y}', {});

//adding layers to the maps
carto.addTo(map);
GL.addTo(map);



//populating data from the geojson
fetch("http://localhost:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3Aall_country_africa&maxFeatures=50&outputFormat=application%2Fjson")
.then(function(response) {
return response.json();
})
//bring things for filter
.then(json => {
  var htmlToAdd = "";
  json.features.forEach(function(feature){
    $('#country').append('<option>'+feature.properties.adm0_name+"</option");
    $('#country_2').append('<option>'+feature.properties.year+"</option");
});
})


// Adding the hover to the countries on the map step one pop up then the style then the addition.

//referencing the style for the pop up so we can edit in css
var pop_options =
    {
    'maxWidth': '400',
    'width': '200',
    'className' : 'popupCustom'
    }

//styling the all countries from web to here
function polystyle(feature) {
  return {
      fillColor: '#B4A269',
      weight: 0,
      opacity: 100,
      color: 'white',  //Outline color
      fillOpacity: 0.0
  };
}


//bringing the all countries fr om geoserver to here
fetch("http://localhost:8080/geoserver/admin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=admin%3Aafrica_countries_v4&maxFeatures=50&outputFormat=application%2Fjson")
.then(function(response) {
return response.json();
})
.then(function(data) {

var country = L.geoJSON(data,  {style:polystyle, onEachFeature: function (feature, layer) {
  layer.bindPopup(feature.properties.adm0_name,pop_options);
  layer.on('mouseover', function (event) {
    layer.openPopup(layer.getBounds().getCenter());
    this.setStyle({
      fillOpacity: 0.4
    });
  });
  layer.on('mouseout', function (event) {
    country.closePopup(layer.getBounds().getCenter());
    this.setStyle({
      fillOpacity: 0.0
    });
  });
}}).addTo(map);

})





//getting data from the dropdown
var select = document.getElementById('country');

function show(){
  var text = select.options[select.selectedIndex].text;
  console.log(text); // en

var region= "";
var conc = region.concat("adm0_name= ","'",text,"'");
//"adm0_name= 'Egypt'"
console.log(conc);
const cholera_url_2 = "http://localhost:8080/geoserver/admin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=admin%3Acholera_join_5&maxFeatures=1000&outputFormat=application%2Fjson";
async function cholera_url(){
  const response = await fetch(cholera_url_2);
  const data = await response.json();
  const data_layer = await L.geoJSON(data,{style:polycolor2, filter: conditions}).addTo(map);
  function conditions(feature){ if (feature.properties.adm0_name === text) return true }
}
cholera_url()
}

select.onchange = show;
show();



//adding earthquake to the map
//styling the marker for earthquake
// replace Leaflet's default blue marker with a custom icon
var createCustomIcongreen = L.icon({
  iconUrl: 'Logo/earthquake_green.svg',
  iconSize:     [25, 25], // width and height of the image in pixels
  shadowSize:   [35, 20], // width, height of optional shadow image
  iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
}); 

var createCustomIconred = L.icon({
  iconUrl: 'Logo/earthquake_red.svg',
  iconSize:     [25, 25], // width and height of the image in pixels
  shadowSize:   [35, 20], // width, height of optional shadow image
  iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
}); 

var createCustomIconyellow = L.icon({
  iconUrl: 'Logo/earthquake_yellow.svg',
  iconSize:     [25, 25], // width and height of the image in pixels
  shadowSize:   [35, 20], // width, height of optional shadow image
  iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

function iconcat(feature){
  var icon;
  if (feature.properties.mag < 4) icon = createCustomIcongreen;
  else if (feature.properties.mag >= 4 && feature.properties.mag < 6) icon = createCustomIconyellow;
  else icon = createCustomIconred;

  return icon;
}
  
// create an options object that specifies which function will called on each feature 
let myLayerOptions = {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon: iconcat(feature)})
    }
  }


//bringing the earthauke  data from web to here
fetch("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson")
.then(function(response) {
return response.json();
})
.then(function(data) {
  var earth = L.geoJSON(data,myLayerOptions).addTo(map).bindPopup("Earthquake");

});


//styling the all countries from web to here cholera join_5
function polycolor1(feature) {
  if (feature.properties.sum < 500) {
      return {
          weight: 0,
          opacity: 1,
          color: '#E4D4D5',
          dashArray: '3',
          fillOpacity: 0.5,
          fillColor: '#E4D4D5'
      };
  } else if (feature.properties.sum > 500) {
      return {
          weight: 0,
          opacity: 1,
          color: '#A06B6C',
          dashArray: '3',
          fillOpacity: 0.5,
          fillColor: '#A06B6C'
      }
    }
      else{
        return {
          weight: 0,
          opacity: 1,
          color: '#782C2D',
          dashArray: '3',
          fillOpacity: 0.5,
          fillColor: '#782C2D'
      }
    };
  
}

function polycolor2(feature) {
  return {
    weight: 0,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5,
    fillColor: '#782C2D'
  }}






// //adding the countries again to the map
// fetch("http://localhost:8080/geoserver/admin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=admin%3Acholera_join_5&maxFeatures=1000&outputFormat=application%2Fjson")
// .then(function(response) {
// return response.json();
// })
// .then(function(data) {
// var cholera = L.geoJSON(data,{style:polycolor2}).addTo(map);
// console.log("map added",data) 
// var start = $(document).on('change','#country',function(e){
//   var toogle = false;
//     var start1 = e.target.value;
//     var start2 = console.log(start1);

//   function filter_year(feature) {
//   if (feature.properties.year > start1) return true
//   }


//     if(map.hasLayer(cholera)){map.removeLayer(cholera);
//       L.geoJSON(data,{style:polycolor1,filter: filter_year}).addTo(map);
//         console.log("done")
//       }
   
//     return
// })
 
// })


// function wfsstyle(feature,layer) {
//   if (feature.properties.sum < 500) {
//       return {
//           weight: 0,
//           opacity: 1,
//           color: '#E4D4D5',
//           dashArray: '3',
//           fillOpacity: 0.5,
//           fillColor: '#E4D4D5'
//       };
//   } else if (feature.properties.sum > 500) {
//       return {
//           weight: 0,
//           opacity: 1,
//           color: '#A06B6C',
//           dashArray: '3',
//           fillOpacity: 0.5,
//           fillColor: '#A06B6C'
//       }
//     }
//       else{
//         return {
//           weight: 0,
//           opacity: 1,
//           color: '#782C2D',
//           dashArray: '3',
//           fillOpacity: 0.5,
//           fillColor: '#782C2D'
//       }
//     };
  
// }


//adding the countries again to the map
// fetch("http://localhost:8080/geoserver/admin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=admin%3Acholera_join_5&maxFeatures=100&outputFormat=application%2Fjson")
// .then(function(response) {
// return response.json();
// })
// .then(function(data) {
// var cholera = L.geoJSON(data,{style: {
//       color: "black",
//       fillOpacity: "0",
//       opacity: "0.5",
//     }}).addTo(map);
// console.log("map added") });



// // var countries = L.Geoserver.wfs("http://localhost:8080/geoserver/admin/wfs", {
//   layers: "admin:cholera_join_5",
//   style: {
//     color: "black",
//     fillOpacity: "0",
//     opacity: "0.5",
//   },
//   CQL_FILTER: "adm0_name = 'Ethiopia'",
// }).addTo(map);


