<?php

session_start();

$ticket = md5(uniqid(mt_rand(), TRUE));

$_SESSION['ticket'][] = $ticket;

function h($string) {
   return htmlspecialchars($string, ENT_QUOTES);
}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-Style-Type" content="text/css">
		<meta http-equiv="Content-Script-Type" content="text/javascript">
		<title>送信フォーム</title>
	</head>
	<body>

   <div id="mailbox">
      <h2>送信フォーム</h2>

<?php
   if(isset($_SESSION['error'])){
      echo "\n";
      foreach ($_SESSION['error'] as $value){
         echo "<font color='red'>" . $value . "</font><br />" . "\n";
      }
   }
?>
   <br />

   <p>*印は必須入力項目です。タグは無効化します。</p>

   <br />

   <form action="./ajax/mail/check.php" method="post">
      <dl>
      	<dt>
      		<label for="name">お名前*</label>
      	</dt>
         <dd>
         	<input type="text" name="name" id="name" size="30" value="<?php echo h(@$_SESSION['name']);?>" />
         </dd>
      </dl>

      <br />
      
      <dl>
      	<dt>
      		<label for="email">メールアドレス*</label>
      	</dt>
         <dd>
         	<input type="text" name="email" id="email" size="30" value="<?php echo h(@$_SESSION['email']);?>" />
         </dd>
      </dl>

      <br />
      
      <dl>
      	<dt>
      		<label for="comment">本文*(500文字以内)</label>
      	</dt>
         <dd>
            <textarea id="comment" name="comment" rows="10" cols="60"><?php echo h(@$_SESSION['comment']);?></textarea>
         </dd>
      </dl>

      <br />
      
      
      <input type="hidden" name="ticket" value="<?php echo h($ticket);?>"/>
      <input type="submit" name="submit" value="入力内容チェック" />
   </form>
   </div>

	</body>
</html>
