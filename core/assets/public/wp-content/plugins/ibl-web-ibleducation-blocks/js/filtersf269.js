function openDropdown1() {
  document.getElementById("Filter1").classList.toggle("show");
}

function openDropdown2() {
  document.getElementById("Filter2").classList.toggle("show");
}

function openDropdown3() {
  document.getElementById("Filter3").classList.toggle("show");
}

function openDropdown4() {
  document.getElementById("Filter4").classList.toggle("show");
}

function openDropdown5() {
  document.getElementById("Filter5").classList.toggle("show");
}


window.onclick = function (event) {
  if (!event.target.matches('.ddtoggle')) {
    var dropdowns = document.getElementsByClassName("ddmenu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



function openFilters() {
  var x = document.getElementById("filters");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


/**
 * IBL ADDITIONS
 */
function updateFilterSelection(menuItem) {
  menuItem.parentElement.parentElement.firstElementChild.firstElementChild.innerText = menuItem.innerText;
  menuItem.parentElement.parentElement.firstElementChild.firstElementChild.setAttribute('data-value', menuItem.innerText);

  var filterContainer = getFilterContainer(menuItem);
  if (!filterContainer) {
    throw Error('Filter Container was not found')
  }
  loadCatalogResults();

  // get previous selected menuItem
  var previousSelectedMenuItem = filterContainer.querySelector('.dropdown-link-active');
  if (previousSelectedMenuItem)
    previousSelectedMenuItem.classList.remove('dropdown-link-active');
  menuItem.classList.add('dropdown-link-active');
  menuItem.parentElement.classList.remove('w--open');
}


function dcomShowAllCourses(element) {
  var filterContainer = getFilterContainer(element);
  if (!filterContainer) {
    throw Error('Filter Container was not found')
  }
  dcomResetFilters(element);
  loadCatalogResults();
}

function dcomResetFilters(element) {
  var filterContainer = getFilterContainer(element);
  if (!filterContainer) {
    throw Error('Filter Container was not found')
  }
  var allFilterSelectors = filterContainer.querySelectorAll('.filter-label');
  var filterIdFilterNameMap = [
    'SUBSCRIPTION',
    'SUBJECT',
    'LEVEL',
    // 'TOPIC',
    // 'SUBTOPIC',
  ];

  allFilterSelectors.forEach(function (filterSelector, i) {
    filterSelector.innerText = filterIdFilterNameMap[i];
  });
}

function getFilterContainer(element) {
  var node = element;
  var filterContainerClassName = 'filters_row';
  var count = 0;
  var iterationLimit = 10;
  while (node && !node.classList.contains(filterContainerClassName) && count < iterationLimit) {
    node = node.parentElement;
    count += 1;
  }
  return (node && count < iterationLimit) ? node : null;
}
