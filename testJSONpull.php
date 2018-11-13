<?php
  $jsonString = file_get_contents('./webapp/Engineers.json');
  $data = json_decode($jsonString, true);

  print_r($data);
  echo "<br><br>";
  print_r($data['Engineers'][0]['EngineerName']);


?>
