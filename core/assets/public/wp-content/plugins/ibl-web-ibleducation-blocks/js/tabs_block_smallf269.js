function openTabSmall(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinksmall;



    // Get all elements with class="tabcontent" and hide them

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }



    // Get all elements with class="tablinksmall" and remove the class "active"

    tablinksmall = document.getElementsByClassName("tablinksmall");
    for (i = 0; i < tablinksmall.length; i++) {
        tablinksmall[i].className = tablinksmall[i].className.replace("active", "");
    }



    // Show the current tab, and add an "active" class to the button that opened the tab

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



// Get the element with id="defaultOpen" and click on it
if (document.querySelector('.tabs-small')) {
    var defaultOpenSmall = document.getElementById("defaultOpen");
    if (defaultOpenSmall)
        defaultOpenSmall.click();
}
