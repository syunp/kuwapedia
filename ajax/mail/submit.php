<?php
// メール宛て先
$mailTo  = 'tomoyuki.kuwayama@gmail.com';
// メールのタイトル
$subject = 'お問い合わせが入りました';
// Return-Pathに指定するメールアドレス
$returnMail = 'tomoyuki.kuwayama@gmail.com';

function checkInput($var) {
  if (is_array($var)) {
    return array_map('checkInput', $var);
  } else {
    if (get_magic_quotes_gpc()) { 
      $var = stripslashes($var);
    }
    if (preg_match('/\0/', $var)) { 
      die('不正な入力です。');
    }
    if (!mb_check_encoding($var, 'UTF-8')) {  
      die('不正な入力です。');
    }
    return $var;
  }
}

session_start();

$_POST = checkInput($_POST);

if (isset($_POST['ticket']) && isset($_SESSION['ticket'])) {
  $ticket = $_POST['ticket'];
  if (!in_array($ticket, $_SESSION['ticket'])) {
    die('不正アクセスの疑いがあります。');
  }
} else {
  die('不正アクセスの疑いがあります。');
}

$name    = $_SESSION['name'];
$email   = $_SESSION['email'];
$comment = $_SESSION['comment'];

mb_language('ja');
mb_internal_encoding('UTF-8');
$header = 'From: ' . mb_encode_mimeheader($name) . ' <' . $email . '>';
$message = '';
if (ini_get('safe_mode')) {
  $result = mb_send_mail($mailTo, $subject, $comment, $header);
} else {
  $result = mb_send_mail($mailTo, $subject, $comment, $header, '-f' . $returnMail);
}

if ($result) {
  $message =  '送信完了しました。';
  $_SESSION = array();
  session_destroy();
} else {
  $message = '送信失敗しました。';
}
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>メール送信</title>
</head>
<body>
<div id="mailbox">
  <p><?php echo $message;?></p>
</div>
</body>
</html>
