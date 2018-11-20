<?php
  include($_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/connectToDB.php');
  $fname = $_GET['fname'];
  $lname = $_GET['lname'];
  $email = $_GET['email'];
  $team = $_GET['team'];

  $conn = connectToDB();

  $jsonFile = $_SERVER['DOCUMENT_ROOT'].'/PS_Scheduler/webapp/Engineers.json';

  try{

    //Add to DB
    /*$sql = "INSERT INTO Engineers (email,fname,lname,team) VALUES($email,$fname,$lname,$team);";

    $conn->exec($sql);
    echo "Engineer Added";*/

    $jsonString = file_get_contents($jsonFile);
    $data = json_decode($jsonString, true);


    $appointments = Array();

    $newEngineer = Array('fname'=>$fname,'lname'=>$lname,'team'=>$team,'email'=>$email, 'appointments'=>$appointments);

    array_push($data[$team],$newEngineer);

    $newJsonString = json_encode($data);
    file_put_contents($jsonFile, $newJsonString);

  }
  catch(PDOException $e){
    echo "Connection failed: ".$e->getMessage();
  }

  echo "<script type=\"text/javascript\">
   document.location.href=\"../\";
 </script>";


?>
