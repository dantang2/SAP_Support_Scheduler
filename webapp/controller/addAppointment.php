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

  $numOfDays = $_GET['numOfDays'];


  //$startDate = Array($startYear,$startMonth,$startDay,$startHour,$startMinutes);
  //$endDate = Array($endYear,$endMonth,$endDay,$endHour,$endMinutes);

  $appointments = Array();

  while($numOfDays >= 0){


    $startTime = Array($startYear,$startMonth,$startDay,$startHour,$startMinutes);
    $endTime = Array($startYear,$startMonth,$startDay,$endHour,$endMinutes);

    $appointments[$numOfDays] = Array('start'=>$startTime, 'end'=>$endTime, 'title'=>$task, 'info'=>"test", 'type'=>"Type07");

    $startDay = $startDay + 1;
    $numOfDays = $numOfDays - 1;
  }



  $conn = connectToDB();

  $jsonFile = $_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/webapp/Engineers.json';

  try{

    //Add to DB
    /*$sql = "INSERT INTO Engineers (email,fname,lname,team) VALUES($email,$fname,$lname,$team);";

    $conn->exec($sql);
    echo "Engineer Added";*/


    $jsonString = file_get_contents($jsonFile);
    $data = json_decode($jsonString, true);


    foreach ($data[$team] as $e){
      if ($e['email']==$email){
        $index = array_search($e,$data[$team]);
        foreach($appointments as $app){
          array_push($data[$team][$index]['appointments'],$app);
          $newJsonString = json_encode($data);
        }
        file_put_contents($jsonFile, $newJsonString);
        echo "success";
        break;
      } else{
        //echo "engineer not found";
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
