
  var prioritize_video_array = [
  "https://www.youtube.com/embed/TWwxu8oSh2A",
  "https://www.youtube.com/embed/Wzumcnm-vO0",
  "https://www.youtube.com/embed/uFjkd_0Zc9I",
  "https://www.youtube.com/embed/hbywBZNtoMs"
  ];

  var pr_video_play = document.getElementsByClassName('pr_video_play');
  var pr_right = document.getElementsByClassName('pr_right');
  var panel_video = document.getElementsByClassName('panel_video');

  if(pr_video_play){
  for (var i = 0; i < pr_video_play.length; i++) {
    pr_video_play[i].addEventListener('click', function(i) {
  // alert(pr_right[i]);
  // pr_right[i].innerHTML = "<iframe src='https://www.youtube.com/embed/TWwxu8oSh2A?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0' frameborder='0' style='position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto' allow='autoplay; encrypted-media' allowfullscreen=""></iframe>";
  pr_right[i].innerHTML = "<iframe class='pr_iframe' style='position:absolute;left:0;top:0;width:100%;height:100%; ' src='"+prioritize_video_array[i]+"?autoplay=1&mute=0' width=\"100%\" height=\"100%\" allow='autoplay; encrypted-media'></iframe>";
  // var pr_iframe = document.getElementsByClassName('pr_iframe');
  // alert(pr_iframe);
  // pr_iframe(i).play();
  pr_right[i].style.paddingTop="53%";
  panel_video[i].style.paddingBottom="17px";
  style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto"
   }.bind(null, i));
  }



  $('.pr_right').click(function(e) {
      e.preventDefault();
  });

  }
