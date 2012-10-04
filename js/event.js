$(function (){
   var flag = true, R = 370;
   var first = true;
   var dur = 200;
   var facebook_x = R * 0.9238795325112867;
   var facebook_y = R * 0.3826834323650897;
   var hatena_x = R * 0.7071067811865476;
   var hatena_y = R * 0.7071067811865476;
   var test_x = R * 0.3826834323650897;
   var test_y = R * 0.9238795325112867;

   var userAgent = window.navigator.userAgent.toLowerCase();
   var appVersion = window.navigator.appVersion.toLowerCase();
   var blows;
   var end_flag = false;
   var moving = false;

// ブラウザの判定
   if(userAgent.indexOf('msie') != -1){
      if(appVersion.indexOf("msie 8.") != -1){
         blows = 'IE';
      } else if(appVersion.indexOf("msie 7.") != -1){
         blows = 'IE';
      } else if(appVersion.indexOf("msie 6.") != -1){
         blows = 'IE';
      } else {
         blows = 'other';
      }
   } else{
      blows = 'other';
   }

// 移動する関数
   function move( s, t, l){
      $( s ).animate( { top: t, left: l }, { duration: 800, easing: 'easeInOutExpo' , complete: function(){ 
         end_flag = true; 
         moving = false;
      } } );
   }

// マウスオン時の関数
   function over( c, m, a){

      // IE以外
      if(blows == 'other'){
         $( c ).hover(function(){
            
            // 移動中じゃなかったら
            if(end_flag==true){
               $( c ).stop(true, false).animate( { opacity: '1' }, 200 ); 

               $( a ).stop(true, false).animate( { opacity: '1' }, 200 ); 
            }
         },
         function(){
            if(end_flag==true){
               $( c ).stop(true, false).animate( { opacity: '0' }, 200 );

               $( a ).stop(true, false).animate( { opacity: '0' }, 200 );
            }
         });
      }
      // IE
      else{
         $( m ).hover(function(){

            if(m == '#twitter'){
               $( m ).attr('src', 'img/ver1/twitter_color.png');
            } else if(m == '#facebook'){
               $( m ).attr('src', 'img/ver1/facebook_color.png');
            } else if(m == '#diary'){
               $( m ).attr('src', 'img/ver1/diary_color_g.png');
            } else if(m == '#hatena'){
               $( m ).attr('src', 'img/ver1/hatena_color.png');
            } else if(m == '#intro'){
               $( m ).attr('src', 'img/ver1/intro_color.png');
            } else if(m == '#tumblr'){
               $( m ).attr('src', 'img/ver1/tumblr_color.png');
            } else if(m == '#grow'){
               $( m ).attr('src', 'img/ver1/grow_color.png');
            } else if(m == '#blogger'){
               $( m ).attr('src', 'img/ver1/blogger_color.png');
            } else if(m == '#mail'){
               $( m ).attr('src', 'img/ver1/mail_color.png');
            }

            $( a ).css('display', 'inline');
         },
         function(){

            if(m == '#twitter'){
               $( m ).attr('src', 'img/ver1/twibird_110.png');
            } else if(m == '#facebook'){
               $( m ).attr('src', 'img/ver1/facebook_90_110.png');
            } else if(m == '#diary'){
               $( m ).attr('src', 'img/ver1/diary_110.png');
            } else if(m == '#hatena'){
               $( m ).attr('src', 'img/ver1/hatena_90_110.png');
            } else if(m == '#intro'){
               $( m ).attr('src', 'img/ver1/intro.png');
            } else if(m == '#tumblr'){
               $( m ).attr('src', 'img/ver1/tumblr_90_110.png');
            } else if(m == '#grow'){
               $( m ).attr('src', 'img/ver1/grow_90_110.png');
            } else if(m == '#blogger'){
               $( m ).attr('src', 'img/ver1/blogger_90_110.png');
            } else if(m == '#mail'){
               $( m ).attr('src', 'img/ver1/mail_gray_90_110_2.png');
            }

            $( a ).css('display', 'none');
         });
      }
   }

   $(document).ready(function(){
//      $('a[rel^="prettyPopin"]').prettyPopin({width: 550, followScroll: false}); 
      $('a[rel^="prettyPopin"]').prettyPopin({width: 600, followScroll: false}); 

// IEの時の初期設定
      if(blows == 'IE'){
         $('.arrow_box').css('display', 'none');
         $('#open').css('visibility', 'hidden');
         $('.button_color').css('display', 'none');
      }

// 鍵を閉めるアニメｰション
      setTimeout(function(){
         $('.button_key, #close').stop(true, false).animate( { opacity: '1' }, {duration: 500});
      }, 500 );
   });

// クリック時
   $('#key, .key').click(function (){

      if(first == true){
         $('.button').css('opacity', '1');
         first = false;
      }

      if(moving == false){

         if(flag == true){

// 鍵を開けるアニメーション
            if(blows == 'other'){
               $('#close').stop(true, false).animate( { opacity: '0' }, dur );
               $('#open').stop(true, false).animate( { opacity: '1' }, dur );
            } else {
               $('#close').css('visibility', 'hidden');
               $('#open').css('visibility', 'visible');
            }

// 移動させる
            setTimeout(function(){

               move('#twitter', '-=0px', '-=' + R + 'px');
               move('#twitter_color', '-=0px', '-=' + R + 'px');
               move('#facebook', '-=' + facebook_y + 'px', '-=' + facebook_x + 'px' );
               move('#facebook_color', '-=' + facebook_y + 'px', '-=' + facebook_x + 'px' );
               move('#diary', '-=' + hatena_y + 'px', '-=' + hatena_x + 'px' );
               move('#diary_color', '-=' + hatena_y + 'px', '-=' + hatena_x + 'px' );
               move('#hatena', '-=' + test_y + 'px', '-=' + test_x + 'px' );
               move('#hatena_color', '-=' + test_y + 'px', '-=' + test_x + 'px' );
               move('#intro', '-=' + R + 'px', '-=0px' );
               move('#intro_color', '-=' + R + 'px', '-=0px' );
               move('#tumblr', '-=' + test_y + 'px', '+=' + test_x + 'px' );
               move('#tumblr_color', '-=' + test_y + 'px', '+=' + test_x + 'px' );
               move('#grow', '-=' + hatena_y + 'px', '+=' + hatena_x + 'px' );
               move('#grow_color', '-=' + hatena_y + 'px', '+=' + hatena_x + 'px' );
               move('#blogger', '-=' + facebook_y + 'px', '+=' + facebook_x + 'px' );
               move('#blogger_color', '-=' + facebook_y + 'px', '+=' + facebook_x + 'px' );
               move('#mail', '-=0px', '+=' + R + 'px' );
               move('#mail_color', '-=0px', '+=' + R + 'px' );

            }, dur);

// マウスオン
            over('#twitter_color', '#twitter', '#arrow_twitter');
            over('#facebook_color', '#facebook', '#arrow_facebook');
            over('#hatena_color', '#hatena', '#arrow_hatena');
            over('#diary_color', '#diary', '#arrow_diary');
            over('#intro_color', '#intro', '#arrow_profile');
            over('#tumblr_color', '#tumblr', '#arrow_tumblr');
            over('#grow_color', '#grow', '#arrow_grow');
            over('#blogger_color', '#blogger', '#arrow_blogger');
            over('#mail_color', '#mail', '#arrow_mail');

            flag = false;
         }
         else{

// 閉じるアニメーション
            $('.button').animate( { top: 500, left: 450 }, { duration: 800, easing: 'easeInOutExpo' } );
            $('.button_color').animate( { top: 500, left: 450 }, { duration: 800, easing: 'easeInOutExpo' } );

            setTimeout(function(){

// 鍵のアニメーション
               if(blows == 'other'){
                  $('#close').stop(true, false).animate( { opacity: '1' }, dur );
                  $('#open').stop(true, false).animate( { opacity: '0' }, dur );
               } else {
                  $('#close').css('visibility', 'visible');
                  $('#open').css('visibility', 'hidden');
               }

               moving = false;

            }, 800);

// 移動中にstopしてしまわないためのフラグ
            end_flag = false;

            flag = true;
         }
      
         moving = true;
      
      }
   });
});
