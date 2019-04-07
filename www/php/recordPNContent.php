<?php
include("../../includes/db.php");
//Creates a new record each time a student completes a Picture Naming assessment 

$level = mysql_real_escape_string($_POST["level"]);
$progress = mysql_real_escape_string($_POST["progress"]);
$pictureIds = $_POST["pictureIds"];
$userId = $_POST['username'];

mysql_query("INSERT INTO pn_assessments (userId, assessmentType, dateTaken) VALUES ('$userId', 0, NOW());"); 

// Get the assessment id of the row just inserted
$assessmentId = mysql_insert_id();

// Add the pictureIds to the assessment contents
$it = new ArrayIterator($pictureIds);
$cit = new CachingIterator($it);

$sql = "INSERT INTO pn_assessment_contents (assessmentId, pictureId) VALUES ";

foreach($cit as $value) {
    $sql .= "('" . $assessmentId . "','" . $value . "')";
    if($cit->hasNext()) {
        $sql .= ",";
    }
}

mysql_query($sql);

// Add the start level and progress
$sql = "INSERT INTO pn_levels (assessmentId, startLevel, startProgress) VALUES ('$assessmentId', '$level', '$progress')";

mysql_query($sql);

echo json_encode(['assessmentId' => $assessmentId]);

//Close the db
mysql_close();

?>

