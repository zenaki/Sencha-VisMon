<?php
if (isset($_FILES['new_item']['name'])) {
    $file_count = count($_FILES['new_item']['name']);
    if ($file_count > 0) {
      $errCount = 0; $file = '';
      for ($i = 0; $i < $file_count; $i++) {
        $file_tmp  = $_FILES['new_item']['tmp_name'][$i];
        $file_name = $_FILES['new_item']['name'][$i];
        $file_size = $_FILES['new_item']['size'][$i];

        move_uploaded_file($file_tmp, "../Upload_Items/".$file_name);
        if(!is_uploaded_file($file_tmp)) {
          if(strlen($file) > 0) {
            $file = $file . ', ' . $file_name;
          } else {
            $file = $file_name;
          }
        } else {
          $errCount++;
          if(strlen($file) > 0) {
            $file = $file . ', (x)' . $file_name . ' (tmp)' . $file_tmp . ' (size)' . $file_size;
          } else {
            $file = '(x)'.$file_name . ' (tmp)' . $file_tmp . ' (size)' . $file_size;
          }
        }
      }
      if ($errCount >= $file_count) {
        $response = array('success' => false, 'message' => 'ERROR Files: '.$file);
      } else {
        $response = array('success' => true, 'message' => 'OK', 'file' => $file);
      }
      echo json_encode($response);
    } else {
      $file_tmp  = $_FILES['new_item']['tmp_name'][0];
      $file_name = $_FILES['new_item']['name'][0];
      $file_size = $_FILES['new_item']['size'][0];

      move_uploaded_file($file_tmp, "../Upload_Items/$file_name");
      if(!is_uploaded_file($file_tmp)) {
          $response = array('success' => true, 'message' => 'OK', 'file' => $file_name);
      } else {
          $response = array('success' => false, 'message' => 'ERROR File: '.$file_name);
      }
      echo json_encode($response);
    }

    // $file_tmp  = $_FILES['new_item']['tmp_name'];
    // $file_name = $_FILES['new_item']['name'];
    // $file_size = $_FILES['new_item']['size'];
    //
    // //echo ($file_tmp.", ".$file_name.", ".$file_size);
    // move_uploaded_file($file_tmp, "tmp/$file_name");
    // if(!is_uploaded_file($file_tmp)) {
    //     // echo '{success: true}';
    //     // echo '{"success": true, "message": "OK"}';
    //     $response = array('success' => true, 'message' => 'OK', 'file' => $file_name . ' jml_file = ' . $file_count);
    //     echo json_encode($response);
    // } else {
    //     // echo '{success: false}';
    //     // echo '{"success": false, "message": "ERROR"}';
    //     $response = array('success' => false, 'message' => 'ERROR');
    //     echo json_encode($response);
    // }
}
// echo '{"success": false, "message": "ERROR"}';
?>
