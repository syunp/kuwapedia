<?php

function checkInput($var) {
   if(is_array($var)) {
      return array_map('checkInput', $var);
   } else{
      if(get_magic_quotes_gpc()){
         $var = stripslashes($var);
      }
      
      if(preg_match('/\0/', $var)){
         die('不正な入力です。');
      }
      return $var;
   }
}

session_start();

$_POST = checkInput($_POST);

if(isset($_POST['ticket']) && isset($_SESSION['ticket'])) {
   $ticket = $_POST['ticket'];
   
   if(!in_array($ticket, $_SESSION['ticket'])){
      die('不正アクセスの疑いがあります。');
   }
} else{
   die('不正アクセスの疑いがあります。');
}

$name = isset($_POST['name']) ? $_POST['name'] : NULL;
$email = isset($_POST['email']) ? $_POST['email'] : NULL;
$comment = isset($_POST['comment']) ? $_POST['comment'] : NULL;

$error = array();

if(trim($name) == ''){
   $error[] = 'お名前は必須項目です。';
} else if(mb_strlen($name) > 100) {
   $error[] = 'お名前は100文字以内でお願い致します。';
}

if(trim($email) == ''){
   $error[] = 'メールアドレスは必須項目です。';
} else{
   $pattern = '/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/iD';
}

if($email!=NULL){
   if(!preg_match($pattern, $email)){
      $error[] = 'メールアドレスの形式が正しくありません。';
   }
}

if(trim($comment) == ''){
   $error[] = '本文は必須項目です。';
} else if(mb_strlen($comment) > 500) {
   $error[] = 'コメントは500文字以内でお願い致します。';
}

$_SESSION['name']    = $name;
$_SESSION['email']   = $email;
$_SESSION['comment'] = $comment;
$_SESSION['error']   = $error;

if(count($error) > 0) {
  $dirname = dirname($_SERVER['SCRIPT_NAME']);
  $dirname = $dirname == DIRECTORY_SEPARATOR ? '' : $dirname;
  $uri = 'http://' . $_SERVER['SERVER_NAME'] .
         $dirname . '/form.php';
  header('HTTP/1.1 303 See Other');
  header('Location: ' . $uri);

} else {
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>内容確認</title>
</head>
<body>
<div id="mailbox">
  <p>以下の内容でよろしければ送信ボタンを押してください。</p>

  <br />
  
  <dl>
    <dt>お名前：</dt>
    <dd><?php echo h($name);?></dd>
  </dl>

  <br />
  
  <dl>
    <dt>メールアドレス：</dt>
    <dd><?php echo h($email);?></dd>
  </dl>

  <br />
  
  <dl>
    <dt>本文：</dt>
    <dd><?php echo nl2br(h($comment));?></dd>
  </dl>

  <br />

  <form action="./ajax/mail/form.php" method="post">
    <input type="submit" name="submit" value="入力画面に戻る" />
  </form>
  <form action="./ajax/mail/submit.php" method="post">
    <input type="hidden" name="ticket" value="<?php echo h($ticket);?>" />
    <input type="submit" name="submit" value="送信する" />
  </form>
</div>
</body>
</html>
<?php
}

function h($string) { 
  return htmlspecialchars($string, ENT_QUOTES);
}
