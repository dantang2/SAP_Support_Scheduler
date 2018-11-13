<?php
  $jsonString = file_get_contents('./webapp/Engineers.json');
  $data = json_decode($jsonString, true);

  print_r($data);
  echo sizeof($data);
  echo "<br><br>";
  //print_r($data['Engineers'][0]['fname']);

  $ken = Array('fname'=>'Kenneth','lname'=>'Tsang','team'=>'WEBI','email'=>'kenneth.tsang@sap.com');

  array_push($data['Engineers'],$ken);

  print_r($data);

  $newJsonString = json_encode($data);
  file_put_contents('./webapp/Engineers.json', $newJsonString);


?>
