<?php
include("../../includes/db.php");

$userId = mysql_real_escape_string($_GET["userId"]);

// Default level to throw back if an error occurs or no previous level/progress
$level = 1;
$progress = 1;

// Find the most recently graded assessment and the resulting level of the student
$levelInfo = mysql_query("SELECT endLevel, endProgress FROM pn_levels WHERE assessmentId=(SELECT max(assessmentId) FROM pn_assessments WHERE dateGraded IS NOT NULL AND assessmentType=0 AND userId='$userId')");
if(mysql_num_rows($levelInfo) > 0) {
    $levelInfo = mysql_fetch_assoc($levelInfo);

    $level = $levelInfo["endLevel"];
    $progress = $levelInfo["endProgress"];
}

echo json_encode(['level' => $level, 'progress' => $progress]);    

mysql_close();
?>