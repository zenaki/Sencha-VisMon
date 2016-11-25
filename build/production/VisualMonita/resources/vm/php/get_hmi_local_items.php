<?php
  $dir = '../Local_Items/';
  $images = glob($dir.'*.png');
  $imgArray = array();
  foreach($images as $curimg){
    $onlocal['onlocal'] = $curimg;
    array_push($imgArray, $onlocal);
  }
  $result['data'] = $imgArray;
  echo json_encode($result);
?>
