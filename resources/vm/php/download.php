<?php
  $data = $_POST['data'];
  // $data = '{"items":[{"xtype":"panel","height":50,"width":50,"x":749,"y":209,"html":"<img src=\"png/Combustion-GasTurbines.png\" height=50 width=50/>"},{"xtype":"panel","height":50,"width":50,"x":477,"y":221,"html":"<img src=\"png/Drawing1.png\" height=50 width=50/>"}]}';
  header('Content-disposition: attachment; filename=Visual_Monita.json');
  header('Content-type: application/json');
  echo($data);
?>
