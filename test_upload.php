<?php
if(isset($_FILES['new_item']['name'])){
    $file_tmp  = $_FILES['new_item']['tmp_name'];
    $file_name = $_FILES['new_item']['name'];
    $file_size = $_FILES['new_item']['size'];

    //echo ($file_tmp.", ".$file_name.", ".$file_size);
    move_uploaded_file($file_tmp, "tmp/$file_name");
    if(!is_uploaded_file($file_tmp)) {
        // echo '{success: true}';
        // echo '{"success": true, "message": "OK"}';
        $response = array('success' => true, 'message' => 'OK', 'file' => $file_name);
        echo json_encode($response);
    } else {
        // echo '{success: false}';
        // echo '{"success": false, "message": "ERROR"}';
        $response = array('success' => false, 'message' => 'ERROR 1');
        echo json_encode($response);
    }
}
// echo '{"success": false, "message": "ERROR"}';
?>
