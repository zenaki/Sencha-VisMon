<?php
  $dir = '../Local_Items/';
  $images = glob($dir.'*.png');
  // $images = glob($dir.'.{jpg,png,gif,svg}', GLOB_BRACE);
  $imgArray = array();
  foreach ($images as $curimg) {
    $onlocal['onlocal'] = $curimg;
    array_push($imgArray, $onlocal);
  }
  $result['data'] = $imgArray;
  // echo '<pre>';
  // echo json_encode($result, JSON_PRETTY_PRINT);
  // echo '</pre>';
  echo json_encode($result);
?>
