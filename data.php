<?php
  // echo '<pre>';
  // echo json_encode(
  // var_dump(array(
  //     'data' => array(
  //       array('onlocal' => 'png/piping-ca-e1.png'),
  //       array('onlocal' => 'png/piping-ca-e2.png'),
  //       array('onlocal' => 'png/piping-ca-e3.png'),
  //       array('onlocal' => 'png/piping-ca-e4.png'),
  //       array('onlocal' => 'png/piping-ca-h.png'),
  //       array('onlocal' => 'png/piping-ca-t1.png'),
  //       array('onlocal' => 'png/piping-ca-t2.png'),
  //       array('onlocal' => 'png/piping-ca-t3.png'),
  //       array('onlocal' => 'png/piping-ca-t4.png'),
  //       array('onlocal' => 'png/piping-ca-v.png')
  //     )
  //   ));
  // , JSON_PRETTY_PRINT);

  $dir = 'png/';
  // $ignore = Array('.', '..');
  // $images = scandir($dir);
  $images = glob($dir.'*.png');
  // var_dump($images);
  // $result = array();
  // $result['data'] = $images;
  // array_push($result, $images);
  // var_dump($result);
  $imgArray = array();
  foreach($images as $curimg){
    // if(!in_array($curimg, $ignore)) {
    //   echo 'file name : ' . $curimg . '<br>';
    // };
    $onlocal['onlocal'] = $curimg;
    array_push($imgArray, $onlocal);
  }
  $result['data'] = $imgArray;
  // var_dump($result);
  echo json_encode($result);
?>
