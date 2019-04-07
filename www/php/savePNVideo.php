<?php
$fileName = $_POST["video-filename"];
$uploadDirectory = '../recordings/'.$fileName;

$moved = move_uploaded_file($_FILES["video-blob"]["tmp_name"], $uploadDirectory);

if ($moved) {
    echo "Video has been uploaded";
} else {
    echo "Video has not been uploaded because of error #".$_FILES["video-blob"]["error"];
}

?>