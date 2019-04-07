<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PictureNaming Student</title>
    <link rel="stylesheet" type="text/css" href="style/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
</head>
<?php 
	session_start();
    
    if (empty($_SESSION["username"])){
		$_SESSION["username"]="2421";
	}
?>
<body>
    <div class="flex-container"> 
        <div id="pictureContainer" style="display:flex; flex-direction: column; flex: 0.3;">
            <div style="flex:0.5;" class="progressbar center">
            </div>
            <div style="flex:0.5;">
                <image id="picture" class="img_icon"></image>
            </div>
        </div>
        <div class="center" style="flex-direction: column; flex: 0.3">
            <video autoplay="true" id="camPreview"></video>
            <div>
                <button id="beginButton" disabled>Begin</button>
                <button id="tempButton">Temp End Session Button</button>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript">
	var username = <?php echo $_SESSION["username"] ?>;
</script>
<script src="pn-student-a.js"></script>
</html>
