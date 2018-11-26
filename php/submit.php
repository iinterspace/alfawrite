<?php
CONST emailTO = 'redweb7@gmail.com';
CONST subject = 'AlphaWrite';
CONST FROM = 'alphawrite <alphawrite.ru>';
CONST BCC = 'alphawrite';

ini_set('upload_max_filesize', '2M');
$uploaddir = 'uploads/';

function sendMail($uploadfile=false) {
    $to = emailTO;
    $subject = subject;
    $message = "
Email: " . $_POST['email'] . " \r\n                    
Сообщение: " . $_POST['message'] . " \r\n   					
";
    if(isset($uploadfile) && $uploadfile) {
        $uploadfile = $_SERVER['HTTP_HOST'].'/'.$uploadfile;
        $message.= "Файл: " . $uploadfile . " \r\n  ";
    }
    $headers = "Content-type: text/plain; charset=utf-8 \r\n";
    $headers .= "From: ".FROM." \r\n";
    $headers .= "Bcc: ".BCC." \r\n";
    mail($to, $subject, $message, $headers);
}
    if(isset($_FILES['file']['tmp_name']) && $_FILES['file']['name']) {
        $uploadfile = $uploaddir . basename($_FILES['file']['name']);
        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
            sendMail($uploadfile);
        } else {
            ?>
            Ошибка, попробуйте ещё раз</a>
            exit;
            <?php
        }
    } else {
        sendMail();
    }

$data['message'] = 'Данные успешно отправлены!';
echo json_encode($data);
?>