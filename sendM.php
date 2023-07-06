<?php
ob_start();
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once('vendor/autoload.php');

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
// header('Content-Type: application/json; charset=utf-8');
try {
    
    $request = $_POST;
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                                  //Enable verbose debug output
    $mail->isSMTP();                                                        //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                                   //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                               //Enable SMTP authentication
    $mail->Username   = 'piosastro2022@gmail.com';                          //SMTP username
    $mail->Password   = 'fysptdcbjkcdyqmp';                                 //SMTP password
    $mail->SMTPSecure = 'tls';                                              //Enable implicit TLS encryption
    $mail->Port       = 587;                                                //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('piosastro2022@gmail.com', 'AstroNeed');
    $mail->addAddress('piosastro2022@gmail.com', 'AstroNeed');             //Add a recipient
    $mail->addReplyTo('no-reply@astroneed.in', 'AstroNeed');

    //Content
    $mail->isHTML(true);                                                    //Set email format to HTML
    $mail->Subject = 'AstroNeed - Contact Us';
    $mail->Body    = '
    Name:- ' . ($_POST['f_name'] ?? "") . '<br/>
    Phone no.:- ' . ($_POST['phone'] ?? "") . '<br/>';
    
    if(!!$_POST['u_need'])
        $mail->Body .= 'Need:- ' . $_POST['u_need'] . '<br/>';
    
    $mail->Body .= 'Message:- ' . ($_POST['message'] ?? "") . '<br/>';

    if(!!$_POST['enquiry_for'])
    $mail->Body .= 'Enquiry for:- ' . $_POST['enquiry_for'];

    $mail->send();
    // some statement that removes all printed/echoed items
    ob_end_clean();
    echo json_encode([
        "success"   =>  "1",
        "message"   =>  "Message sent successfully.",
        "get" => $_GET,
        "post"=>$_POST,
    ]);
    exit;
} catch (Exception $e) {
    // some statement that removes all printed/echoed items
    ob_end_clean();
    echo json_encode([
        "success"   =>  "0",
        "message"   =>  "Something went wrong, please try again later.",
    ]);
    exit;
}
