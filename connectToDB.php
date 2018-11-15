<?php
  function connectToDB(){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "PS_SchedulerDB";

    try{
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      //echo "Connected successfully";
      return $conn;

    }
    catch(PDOException $e){
      echo "Connection failed: " . $e->getMessage();
    }

  }



?>
