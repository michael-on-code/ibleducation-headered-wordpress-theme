var mobile_menu_btn = document.querySelector(".open_menu");
var close_menu_btn = document.querySelector(".close_mobile_menu.w-inline-block");
var mob_menu_wr = document.querySelector(".mob_menu_wr");
if(mobile_menu_btn){
    mobile_menu_btn.addEventListener("click", function(){
        mob_menu_wr.style.display = "block";
    });
}
if(close_menu_btn){
    close_menu_btn.addEventListener("click", function(){
        mob_menu_wr.style.display = "none";
    });
}