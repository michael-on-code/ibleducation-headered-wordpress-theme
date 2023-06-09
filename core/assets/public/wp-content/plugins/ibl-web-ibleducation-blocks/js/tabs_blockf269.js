function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablink;




    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }




    // Get all elements with class="tablink" and remove the class "active"

    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].className = tablink[i].className.replace("active", "");
    }



    // Show the current tab, and add an "active" class to the button that opened the tab

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



// Get the element with id="defaultOpen" and click on it
if (document.querySelector('.tabs')) {
    var defaultOpen = document.getElementById("defaultOpen");
    if (defaultOpen)
        defaultOpen.click();
}
