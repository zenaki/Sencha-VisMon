<?php
  $dir = '../Visual_Items/';
  $files = glob($dir.'*.json');
  $fileArray = array();
  foreach ($files as $curFile) {
    $visualFile['visualFile'] = $curFile;
    array_push($fileArray, $visualFile);
  }
  $result['data'] = $fileArray;
  // echo '<pre>';
  // echo json_encode($result, JSON_PRETTY_PRINT);
  // echo '</pre>';
  echo json_encode($result);
?>
