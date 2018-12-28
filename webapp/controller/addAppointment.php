<?php
  include($_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/connectToDB.php');

  $email = $_GET['email'];
  $eng_name = $_GET['eng_name'];
  $task = $_GET['task'];
  $team = $_GET['team'];

  $startYear = $_GET['startYear'];
  $startMonth = $_GET['startMonth'];
  $startDay =$_GET['startDay'];
  $startHour = $_GET['startHour'];
  $startMinutes = $_GET['startMinutes'];

  $endYear = $_GET['endYear'];
  $endMonth = $_GET['endMonth'];
  $endDay = $_GET['endDay'];

  $endHour = $_GET['endHour'];
  $endMinutes = $_GET['endMinutes'];

  $numOfDays = $_GET['numOfDays'];


  //$startDate = Array($startYear,$startMonth,$startDay,$startHour,$startMinutes);
  //$endDate = Array($endYear,$endMonth,$endDay,$endHour,$endMinutes);

  $appointments = Array();

  while($numOfDays >= 0){


    $startTime = Array($startYear,$startMonth,$startDay,$startHour,$startMinutes);
    $endTime = Array($startYear,$startMonth,$startDay,$endHour,$endMinutes);

    $appointments[$numOfDays] = Array('start'=>$startTime, 'end'=>$endTime, 'title'=>$eng_name, 'info'=>$task, 'team' => $team, 'email'=> $email);

    $startDay = $startDay + 1;
    $numOfDays = $numOfDays - 1;
  }


  $jsonFile = $_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/webapp/Engineers.json';

  try{

    $jsonString = file_get_contents($jsonFile);
    $data = json_decode($jsonString, true);

    foreach($data[$team] as $t){
      if($t['task']==$task){
        $index = array_search($t, $data[$team]);
        foreach($appointments as $a){
          array_push($data[$team][$index]['appointments'],$a);
        }
        $newJsonString = json_encode($data);
        file_put_contents($jsonFile, $newJsonString);
        break;
      }
    }

  }
  catch(PDOException $e){
    echo "Connection failed: ".$e->getMessage();
  }

  echo "<script type=\"text/javascript\">
   document.location.href=\"../\";
   </script>";

?>
