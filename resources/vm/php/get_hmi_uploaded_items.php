<?php
  $dir = '../Upload_Items/';
  $images = glob($dir.'*.png');
  // $images = glob($dir.'.{jpg,png,gif,svg}', GLOB_BRACE);
  $imgArray = array();
  foreach ($images as $curimg) {
    $onlocal['uploaded'] = $curimg;
    array_push($imgArray, $onlocal);
  }
  $result['data'] = $imgArray;
  echo json_encode($result);
?>
