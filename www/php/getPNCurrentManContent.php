<?php
include("../../includes/db.php");

$assessmentId = mysql_real_escape_string($_GET["assessmentId"]);

$indexResult = mysql_query("SELECT imageIndex FROM `pn_man_assessments` WHERE assessmentId = $assessmentId");

$index = mysql_fetch_assoc($indexResult)["imageIndex"];

$result = mysql_query("SELECT pictureId FROM `pn_assessment_contents` WHERE assessmentId = $assessmentId ORDER BY assessmentContentId LIMIT $index, 1;");  
    
$data = array("pictureId" => mysql_fetch_assoc($result)["pictureId"]);
   
echo json_encode($data);   
   
//Close the db
mysql_close();
?>