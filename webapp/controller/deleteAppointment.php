<?php
  include($_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/connectToDB.php');

  $email = $_GET['email'];
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



  //$startDate = Array($startYear,$startMonth,$startDay,$startHour,$startMinutes);
  //$endDate = Array($endYear,$endMonth,$endDay,$endHour,$endMinutes);

  $startTime = Array($startYear,$startMonth,$startDay,$startHour,$startMinutes);
  $endTime = Array($startYear,$startMonth,$startDay,$endHour,$endMinutes);

  $thisAppointment = Array('start'=>$startTime, 'end'=>$endTime, 'title'=>$task);



  $conn = connectToDB();

  $jsonFile = $_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/webapp/Engineers.json';

  try{


    $jsonString = file_get_contents($jsonFile);
    $data = json_decode($jsonString, true);


    foreach ($data[$team] as $e){
      if ($e['email']==$email){
        foreach($e['appointments'] as $anAppointment){
            if($anAppointment['title']==$thisAppointment['title']&&$anAppointment['start']==$thisAppointment['start']&&$anAppointment['end']==$thisAppointment['end']){
              $user = array_search($e,$data[$team]);

              $index = array_search($anAppointment,$data[$team][$user]['appointments']);

              unset($data[$team][$user]['appointments'][$index]);

              $newJsonString = json_encode($data);
              file_put_contents($jsonFile, $newJsonString);

              echo "<script type=\"text/javascript\">
               document.location.href=\"../\";
               </script>";
            }

        }
      }
    }

  }
  catch(PDOException $e){
    echo "Connection failed: ".$e->getMessage();
  }


?>
