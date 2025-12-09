<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        //Configuration
        $smtpUsername = "";
        $smtpPassword = "";
        $message = str_replace('<br />', PHP_EOL, $_GET['message']);
        $email = $_GET['email'];
        $mail->setLanguage('pl', './phpmailer/language/phpmailer.lang-pl.php');
        $mail->CharSet = 'UTF-8';
        $mail->SMTPDebug = 0;                   
        $mail->isSMTP();                                       
        $mail->Host       = '';                   
        $mail->SMTPAuth   = true;                                 
        $mail->Username   = $smtpUsername;              
        $mail->Password   = $smtpPassword;                             
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;       
        $mail->Port       = 587;                      
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );         

        //Recipients
        $mail->setFrom($smtpUsername, '');
        $mail->addAddress('', '');     

        // Content
        $mail->isHTML(true);                                 
        $mail->Subject = 'Message sent from contact form on your page from: ' . $email;
        $mail->Body    = $message;
        $mail->AltBody = $message;

        $mail->send();
        echo json_encode(1);
    } catch (Exception $e) {
        echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }
?>   