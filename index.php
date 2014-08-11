<!DOCTYPE html>
<html>
  <head>
  
		<meta charset="utf-8" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    
    <title>Google Maps optimised for bike tour planning</title>

    <link rel="stylesheet" href="./styles.css">
    
    <script src="https://www.google.com/jsapi"></script>
    <?php require_once("./APIloader.php"); ?> <!-- the php include loads the Google Maps JS API with my key -->

    <script type="text/javascript" src="./mapsetup.js"></script>

  </head>
  
  <body>
    <div id="map-canvas"></div>
    
    <div id="controls-holder" class="placeholder">
			<div id="directions-input" class="mapctl dynamic">
				<input 
					type="text" 
					id="dirFrom" 
					class="textbox" 
					size="30" 
					value="From" 
					onfocus="if (this.value=='From') this.value=''" 
					onchange="findRoute();" 
				/>
				to
				<input 
					type="text" 
					id="dirTo" 
					class="textbox" 
					size="30" 
					value="To" 
					onfocus="if (this.value=='To') this.value=''" 
					onchange="findRoute();" 
				/>
				<span 
					id="dirSubmit" 
					class="submit-button" 
					onclick="findRoute();"
				>
					Go
				</span>
			
			</div> <!-- directions-input -->

			<div id="directions-picker" class="mapctl static">
				<strong>Pick a route</strong>
				<ol id="routes-list"></ol>
			</div>

			<div id="elevation-panel" class="mapctl static">
			</div>
    </div> <!-- controls-holder -->
    
    <div id="credit-big" class="mapctl static" onclick="toggle('credit-big', 'credit-small');">
    	Made by <a href="http://eldan.co.uk/">Eldan Goldenberg</a>
			<br />
			This is a very rough sketch of something.
			<br />
			Please see the <a href="https://github.com/eldang/bikemaps">Github  page</a> for a sense of what still needs doing.
			<br />
			Patches welcome!
    </div> <!-- credit-big -->
    
    <div id="credit-small" class="mapctl static" onclick="toggle('credit-small', 'credit-big');">
    	Made by <a href="http://eldan.co.uk/">Eldan Goldenberg</a>
    </div> <!-- credit-small -->

    <div id="directions-container">
			<div id="directions-panel">
			</div>
		</div>
    
  </body>
</html>