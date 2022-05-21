<?php
 
if($_POST) {
    $visitor_name = "";
    $visitor_email = "";
    $email_title = "Sugerencia";
    $visitor_message = "";
     
    if(isset($_POST['visitor_name'])) {
      $visitor_name = filter_var($_POST['visitor_name'], FILTER_SANITIZE_STRING);
    }
     
    if(isset($_POST['visitor_email'])) {
        $visitor_email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['visitor_email']);
        $visitor_email = filter_var($visitor_email, FILTER_VALIDATE_EMAIL);
    }
     
    if(isset($_POST['email_title'])) {
        $email_title = filter_var($_POST['email_title'], FILTER_SANITIZE_STRING);
    }
     
    if(isset($_POST['concerned_department'])) {
        $concerned_department = filter_var($_POST['concerned_department'], FILTER_SANITIZE_STRING);
    }
     
    if(isset($_POST['visitor_message'])) {
        $visitor_message = htmlspecialchars($_POST['visitor_message']);
    }
     
   
        $recipient = "sugerencias@dixho.com";
    
     
        $headers  = 'MIME-Version: 1.0' . "\r\n"
        .'Content-type: text/html; charset=utf-8' . "\r\n"
        .'From: ' . $visitor_email . "\r\n";
         
        if(mail($recipient, $email_title, $visitor_message, $headers)) {
            header("Location: https://dixho.com/contact.html?x=done");
        } else {
            header("Location: https://dixho.com/contact.html?x=error");
        }
     
} else {
    echo '<p>Something went wrong</p>';
}
 
?>