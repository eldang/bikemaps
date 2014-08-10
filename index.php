<!DOCTYPE html>
<html>
  <head>
  
		<meta charset="utf-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    
    <title>Google Maps optimised for bike tour planning</title>

    <link rel="stylesheet" href="./styles.css">
    
    <?php require_once("./APIloader.php"); ?>

    <script type="text/javascript" src="./mapsetup.js"></script>

  </head>
  
  <body>
    <div id="map-canvas"></div>
    
    <div id="directions-input" class="mapctl dynamic">
    	<input type="text" id="dirFrom" class="textbox" size="30" value="From"  onfocus="if (this.value=='From') this.value=''" onchange="findRoute();" />
    	to
    	<input type="text" id="dirTo" class="textbox" size="30" value="To"  onfocus="if (this.value=='To') this.value=''" onchange="findRoute();" />
    	<span id="dirSubmit" class="submit-button" onclick="findRoute();">Go</span>
    </div> <!-- directions-input -->
    
    <div id="credit-big" class="mapctl static">
    	Wordy credits go here
    </div> <!-- credit-big -->
    
    <div id="credit-small" class="mapctl static">
    	Minimised credits here
    </div> <!-- credit-small -->
    
  </body>
</html>