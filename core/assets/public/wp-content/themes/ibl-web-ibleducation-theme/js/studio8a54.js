$ = jQuery;

$(document).ready(function () {

$('.studio-image-holder').on("click", function () {
  let img_src = $(this).data("image-src");
  $('.studio-image-placeholder').attr("src",img_src);
  $('.image_p-2')[0].style.display="block";
});

$('.img_close_div').on("click", function () {
  $('.studio-image-placeholder').attr("src",'');
  $('.image_p-2')[0].style.display="none";
})


//click away
$(window).click(function() {
  $('.studio-image-placeholder').attr("src",'');
  $('.image_p-2')[0].style.display="none";
});

$('.studio-image-holder').click(function(event){
  event.stopPropagation();
});

$('.html_cont.s-image').click(function(event){
  event.stopPropagation();
});

})
