<?php include 'connection.php';?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="v1iewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
        
    <!--LEAFLET-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="L.Geoserver.js"></script>
    <script src="leaflet-geojson-vt.js"></script>
    <script src="https://unpkg.com/geojson-vt@3.2.0/geojson-vt.js"></script>
    <!--LEAFLET/geojson-->
    <!--<script src="http://localhost:8080/geoserver/admin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=admin%3Acholera_join&maxFeatures=50&outputFormat=application%2Fjson" type="text/javascript"></script>
    -->


    <!--ESRI stuff -->
    <link rel="stylesheet" href="https://js.arcgis.com/4.23/esri/themes/light/main.css">
    <script src="https://js.arcgis.com/4.23/"></script>

    <!--My Stuff -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="popup.css">
    <!--<link rel="stylesheet" href="dropdown.css">-->
    
    <!--Goooogle stuff-->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATAFpMe3f-2e2yYE_VM8tg2ee08KvOZHg"></script>
    <title>ESRI Test</title>
</head>

<body>
    
    <div class="heading">
            <div id="logo_container">
                <div id="space"></div>
                <a href="https://www.google.com/"><img id="logo" src="Africa_CDC.png"></a>
                <p id="title">Africa CDC Disaster Risk Monitoring</p>
            </div>
    </div>

    <div class="filter-container">
        <from class="form"> 
            <div class="form__group">
            <label for="disease" id ="filter_title">Start</label>
            <select id="country" name="country"  onchange="tchange()" >
            <option value=""></option>
            </select>
             </div>
    </div>


    <div class="filter-container2">
        <from class="form"> 
            <div class="form__group">
            <label for="disease" id ="filter_title">End</label>
            <select id="country_2" name="country" data-dropdown>
            <option value=""></option>
            </select>
            </div>
    </div>
    
    
    <div class="number_highlight">
<!--      <div id="lines_r"><img src="Logo/lines_reverse.svg"></div> -->
        <p id="number">1,3000</p>
        <p id="number_title">Cholera Cases</p>
        <div id="lines"><img src="Logo/lines.svg"></div>
    </div>

    <button id="ind" onclick="toogleC()">Infectious Diseases</button>

    <div class="body-container">
        <div id="viewDiv"></div>
        <div id="legend1"></div>
        <div id="bottom-bar">Copyrights</div>   
    </div>


    <script src="main-leaflet_2.js"></script> 
   <!-- <script src="dropdown.js"></script> --> 
</body>
   
</html>

