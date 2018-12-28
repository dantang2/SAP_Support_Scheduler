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
  $endTime = Array($endYear,$endMonth,$endDay,$endHour,$endMinutes);

  $thisAppointment = Array('start'=>$startTime, 'end'=>$endTime, 'email'=>$email);


  $jsonFile = $_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/webapp/Engineers.json';

  try{


    $jsonString = file_get_contents($jsonFile);
    $data = json_decode($jsonString, true);


    foreach ($data[$team] as $e){
      echo "test";
      if ($e['task']==$task){
        echo "test1";
        $index = array_search($e,$data[$team]);
        foreach($data[$team][$index]['appointments'] as $anAppointment){
          if($anAppointment['email']==$thisAppointment['email']&&$anAppointment['start']==$thisAppointment['start']&&$anAppointment['end']==$thisAppointment['end']){
            echo "test2";
              $a = array_search($anAppointment,$data[$team][$index]['appointments']);

              unset($data[$team][$index]['appointments'][$a]);

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
