<?php
  // error_reporting(E_ALL);
  // ini_set('display_errors', 1);

  if (isset($_GET['slave_id']) && isset($_GET['titik_ukur'])) {
    $slave_id = $_GET['slave_id'];
    $titik_ukur = $_GET['titik_ukur'];

    $redis = new Redis();
    $redis->connect('119.18.154.235', 6379);
    $current_date = date("d_m_Y");
    $query = "monita_service:data_jaman_" . $current_date;
    // echo 'slave_id = ' . $slave_id . '</br>titik_ukur = ' . $titik_ukur . '</br>current_date = ' . $current_date . '</br>query = ' . $query;
    $array_result = $redis->hGetAll($query);
    ksort($array_result);
    $allowed = [$slave_id . ';' . $titik_ukur . ';'];
    $filtered = array();
    $array_keys_result = array_keys($array_result);
    for ($i = 0; $i < count($array_keys_result); $i++) {
      $temp = '#'.$array_keys_result[$i];
      if (strpos($temp, $slave_id . ';' . $titik_ukur . '_') != '') {
        $data['time'] = explode("_", $array_keys_result[$i])[2];
        $data['value'] = (float)$array_result[$array_keys_result[$i]];
        array_push($filtered, $data);
      }
    }
    while (count($filtered) > 1000) {
      $len = (count($filtered) - 1000);
      $filtered = array_slice($filtered, $len);
    }
    $result['data'] = $filtered;
    echo json_encode($result);
    // echo '</br><pre>';
    // var_dump($filtered);
    // echo json_encode($result, JSON_PRETTY_PRINT);
    // var_dump($result);
    // var_dump($array_result);
    // echo count($array_keys_result);
    // echo var_dump($array_keys_result);
    // echo '</pre>';
  }
?>
