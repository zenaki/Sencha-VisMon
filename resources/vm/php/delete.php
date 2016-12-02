<?php
  $file = $_POST['data'];
  unlink($file);
  echo 'delete '. $file;
?>
