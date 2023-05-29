window.addEventListener("load", function () {
  var searchString = ' ';
  if (document.location.pathname == '/search/') {
    // get search string
    var queryStringPattern = new RegExp('query=([^&]+)');
    var searchResult = queryStringPattern.exec(document.location.search);
    if (searchResult) {
      searchString = searchResult[1];
      document.querySelector('#search').value = searchString;
    }
    document.querySelector('#input_search_icon').click();
  }
});



var subscription_filter = document.querySelectorAll('.w-checkbox-input.checkbox.subscription');
for (var i = 0; i < subscription_filter.length; i++) {
  subscription_filter[i].addEventListener('change', filter_change, false);
}

var topics_filter = document.querySelectorAll('.w-checkbox-input.checkbox.topics');
for (var i = 0; i < topics_filter.length; i++) {
  topics_filter[i].addEventListener('change', filter_change, false);
}

var level_filter = document.querySelectorAll('.w-checkbox-input.checkbox.level');
for (var i = 0; i < level_filter.length; i++) {
  level_filter[i].addEventListener('change', filter_change, false);
}

var duration_filter = document.querySelectorAll('.w-checkbox-input.checkbox.duration');
for (var i = 0; i < duration_filter.length; i++) {
  duration_filter[i].addEventListener('change', filter_change, false);
}


var type_filter = document.querySelectorAll('.w-checkbox-input.checkbox.type');
for (var i = 0; i < type_filter.length; i++) {
  type_filter[i].addEventListener('change', filter_change, false);
}

var sort_by_filter = document.querySelectorAll('.dl.w-dropdown-link');
for (var i = 0; i < sort_by_filter.length; i++) {
  sort_by_filter[i].addEventListener('click', sort_by_change, false);

}



function validate_filters() {
  var search_info_message = document.querySelector('#search_info_message');

  var search_query = document.querySelector('.text-field-8.w-input').value;

  if (search_query != '') {
    search_info_message.innerHTML = '';
    setSearchMetaData(search_query)
    showSearchmeta();
    filter_change();
  } else {
    this.checked = false;
    search_info_message.innerHTML = 'Please enter a value';
  }
}

function has_filters() {
  var all_filters = document.querySelectorAll('.w-checkbox-input.checkbox');
  for (var i = 0; i < all_filters.length; i++) {
    if (all_filters[i].checked == true) {
      return true;
    }
  }
  return false;
}

function sort_by_change() {
  var sort_by_text = document.querySelector('.text-block-45');
  sort_by_text.innerHTML = this.innerHTML;
}

function showFilterByText() {
  var filtered_by = document.querySelector('#filtered_by');
  filtered_by.style.display = 'inline-block';
}

function hideFilterByText() {
  var filtered_by = document.querySelector('#filtered_by');
  filtered_by.style.display = 'none';
}



function deleteBlock() {
  //uncheck checkbox
}

function emptyPagination() {
  var pagination_cont = document.querySelector('.pagination_cont');
  pagination_cont.innerHTML = '';

}

function filter_change() {
  var search_query = document.querySelector('.text-field-8.w-input').value;

  // if (search_query != '') {
    search_info_message.innerHTML = '';
    setSearchMetaData(search_query)
    showSearchmeta();
    //check if user has enter a search query
    if (this.name == 'subscription') {
      if (this.checked == true);
      for (var i = 0; i < subscription_filter.length; i++) {
        if (subscription_filter[i] != this) {
          subscription_filter[i].checked = false;
        }
      }
    } else if (this.name == 'topics') {
      if (this.checked == true);
      for (var i = 0; i < topics_filter.length; i++) {
        if (topics_filter[i] != this) {
          topics_filter[i].checked = false;
        }
      }
    } else if (this.name == 'level') {
      if (this.checked == true);
      for (var i = 0; i < level_filter.length; i++) {
        if (level_filter[i] != this) {
          level_filter[i].checked = false;
        }
      }
    } else if (this.name == 'duration') {
      if (this.checked == true);
      for (var i = 0; i < duration_filter.length; i++) {
        if (duration_filter[i] != this) {
          duration_filter[i].checked = false;
        }
      }
    } else if (this.name == 'type') {
      if (this.checked == true);
      for (var i = 0; i < type_filter.length; i++) {
        if (type_filter[i] != this) {
          type_filter[i].checked = false;
          deleteFilterBlocks(type_filter[i].value);

        }
      }
      if (this.value == "Webinar" || this.value == "Press Releases" || this.value == "Blog Post") {
        emptyResults();
        emptyPagination();
        var filters_block = document.querySelector('.sf_grid');

        var div = document.createElement('div');
        filtersMarkup = buildFilterBlocks(this.value);
        div.className = "search-results-f";
        div.innerHTML = filtersMarkup;
        filters_block.appendChild(div);
        //add clear all btn
        var div = document.createElement('div');
        clearMarkup = buildClearBlocks();
        div.className = "search-results-f";
        div.innerHTML = clearMarkup;
        filters_block.appendChild(div);

        var filter_blocks = document.querySelectorAll('.f_option:not(.btn)');
        var all_filters = document.querySelectorAll('.w-checkbox-input.checkbox');
        var clear_filters_btn = document.getElementById('clear_all_option');

        for (var i = 0; i < filter_blocks.length; i++) {
          filter_blocks[i].addEventListener('click', function () {
            var block_id = this.id;
            block_id = block_id.replace('_bl', "");
            for (var x = 0; x < all_filters.length; x++) {
              if (all_filters[x].value == block_id) {
                all_filters[x].checked = false;
                if (!has_filters()) {
                  hideFilterByText();
                }
                filter_change();
              }
            }

          }, false);
        }
        if (clear_filters_btn) {
          clear_filters_btn.addEventListener('click', function () {
            for (var x = 0; x < all_filters.length; x++) {
              if (all_filters[x].checked) {
                all_filters[x].checked = false;
              }
            }
            clear_filters_btn.parentNode.remove(clear_filters_btn);
            hideSearchmeta();
            hideFilterByText();
            filter_change();


          }, false);
        }
        emptyResults();
        loadNativeWordpressResults(search_query)
        return;
      }
    }
    emptyResults();
    loadCatalogResults();
  // } else {
  //   this.checked = false;
  //   search_info_message.innerHTML = 'Please enter a value';
  // }
}


// });

function emptyResults() {
  var searchResultsWrapper = document.querySelector('.w-layout-grid.grid_large');
  searchResultsWrapper.innerHTML = '';
}

function emptySearch(e) {
  if (e.parentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector('.tabs-small')) {
    loadNativeWordpressResults('#search');
    loadCourseDiscoveryResults('', '#Tab2 .myaccount-mycourses-courserow');
    loadEligibleCoursesResults('', '#Tab3 .myaccount-mycourses-courserow');
  } else {
    loadCatalogResults();
  }
}

function loadResourcesResults(query) {
  console.log(query)
}


function edxSearch(e) {
  var search_info_message = document.querySelector('#search_info_message');
  var searchResultsWrapper = document.querySelector('.w-layout-grid.grid_large');

  var search_query = document.querySelector('.text-field-8.w-input').value;

    emptyResults();
    setSearchMetaData(e.query.value);
    // loadResourcesResults(e.query.value)
    loadNativeWordpressResults(e.query.value);
    // loadCourseDiscoveryResults(e.query.value, '.w-layout-grid, .grid_large');
    // loadEligibleCoursesResults(e.query.value, '#Tab3 .myaccount-mycourses-courserow');
    loadCatalogResults();
    showSearchmeta(e.query.value);
    // addPagination();


}

function addPagination() {
  var search_results_number = document.querySelector('#search_results_number');
  var search_results_number_h = document.querySelector('#search_results_number_h');

  search_results_number.innerHTML = search_results_number_h.value;

}

function setSearchMetaData(query) {
  // TODO: number and filters
  var search_query = document.querySelector('#search_query');
  search_query.innerHTML = query;

}

function showSearchmeta(query) {
  // TODO: number and filters
  var search_meta_div = document.querySelector('.results_nim');
  search_meta_div.style.display = "block";

}

function hideSearchmeta() {
  // TODO: number and filters
  var search_meta_div = document.querySelector('.results_nim');
  search_meta_div.style.display = "none";

}



function loadNativeWordpressResults(query) {
  search_results_number = '';
  var searchResultsWrapper = document.querySelector('.w-layout-grid.grid_large');
  var search_results_number = document.querySelector('#search_results_number');
  var search_results_number_h = document.querySelector('#search_results_number_h');


  if (!searchResultsWrapper) { return }
  var resultsLoader = NativeWordpressResultsLoader();
  var url = `${dcomApiSettings.root}wp/v2/search?search=${query}&type=post&subtype=post`;
  fetchResource(url).then(function (results) {
    if (results.length === 0) {
      return false;
    }

    search_results_number_h.value = parseInt(search_results_number_h.value) + results.length;



    results = resultsLoader.buildResults(results);
    resultsLoader.injectSearchResults(searchResultsWrapper, results);
  }).catch(function (err) {
    console.log(err);
  });
}

function loadCourseDiscoveryResults(query, resultBlockClassPath, pageIndex, append) {
  if (pageIndex == null) {
    pageIndex = 0;
  }
  if (append == null) {
    append = false;
  }

  var myAccountMyCoursesCourseRowBlock = document.querySelector(resultBlockClassPath);
  if (!myAccountMyCoursesCourseRowBlock) { return }

  var resultsLoader = myAccountMyCoursesCourseRowBlockLoader();


  var searchParams = '';
  if (query !== ' ') {
    searchParams = searchParams.concat(`&search_string=${query}`);
  }

  var url = `${dcomApiSettings.root}dcom-blocks/v1/courses/?page_size=20&page_index=${pageIndex}${searchParams}`;
  fetchResource(url).then(function (response) {

    var results = (response && response.results) ? response.results : [];
    if (results.length === 0) {
      if (append) return;
      return;
    }
    var courses = buildCoursesFromCatalogResults(results);
    var coursesByRow = resultsLoader.groupCoursesPerRow(courses);
    resultsLoader.injectCourses(myAccountMyCoursesCourseRowBlock, coursesByRow);
  }).catch(function (err) {
    console.log(err);
  });
}


function loadCatalogResults(queryParams = null, searchResultClass = '.w-layout-grid, .grid_large', pageIndex, append) {
  var all_filters = document.querySelectorAll('.w-checkbox-input.checkbox');
  var searchResultsWrapper = document.querySelector('.w-layout-grid, .grid_large');
  var search_query = document.querySelector('.text-field-8.w-input').value;
  var filters_block = document.querySelector('.sf_grid');
  if (pageIndex == null) {
    pageIndex = 0;
  }
  if (append == null) {
    append = false;
  }

  var searchResultsWrapper = document.querySelector(searchResultClass);
  if (!searchResultsWrapper) { return }

  if (!queryParams) {
    // queryParams = buildCourseCatalogQueryParams();
    var subscription_filter = document.querySelectorAll('.w-checkbox-input.checkbox.subscription');
    var topics_filter = document.querySelectorAll('.w-checkbox-input.checkbox.topics');
    var level_filter = document.querySelectorAll('.w-checkbox-input.checkbox.level');
    var duration_filter = document.querySelectorAll('.w-checkbox-input.checkbox.duration');
    var type_filter = document.querySelectorAll('.w-checkbox-input.checkbox.type');


    if (search_query != null) {
      if (queryParams != null) {
        queryParams += '&search_string=' + search_query;

      } else {
        queryParams = '&search_string=' + search_query;
      }
    }

    for (var i = 0; i < subscription_filter.length; i++) {
      qp = '&subscription=' + subscription_filter[i].value;

      var filter_bl = document.getElementById(subscription_filter[i].value + '_bl');

      if (subscription_filter[i].checked) {
        queryParams += qp;
        var div = document.createElement('div');
        filtersMarkup = this.buildFilterBlocks(subscription_filter[i].value);
        if (filtersMarkup) {
          div.className = "search-results-f";
          div.innerHTML = filtersMarkup;
          filters_block.appendChild(div);
          //add clear all btn
          var div = document.createElement('div');
          clearMarkup = this.buildClearBlocks();
          div.className = "search-results-f";
          div.innerHTML = clearMarkup;
          filters_block.appendChild(div);
        }
      } else {
        queryParams = queryParams.replace(qp, "");
        this.deleteFilterBlocks(subscription_filter[i].value);
      }
    }
    for (var i = 0; i < topics_filter.length; i++) {
      qp = '&TOPIC=' + topics_filter[i].value
      if (topics_filter[i].checked) {
        queryParams += qp;
        var div = document.createElement('div');
        filtersMarkup = this.buildFilterBlocks(topics_filter[i].value);
        if (filtersMarkup) {
          div.className = "search-results-f";
          div.innerHTML = filtersMarkup;
          filters_block.appendChild(div);
          //add clear all btn
          var div = document.createElement('div');
          clearMarkup = this.buildClearBlocks();
          div.className = "search-results-f";
          div.innerHTML = clearMarkup;
          filters_block.appendChild(div);
        }

      } else {
        queryParams = queryParams.replace(qp, "");
        this.deleteFilterBlocks(topics_filter[i].value);
      }
    }
    for (var i = 0; i < level_filter.length; i++) {
      qp = '&LEVEL=' + level_filter[i].value;

      if (level_filter[i].checked) {
        queryParams += qp;
        var div = document.createElement('div');
        filtersMarkup = this.buildFilterBlocks(level_filter[i].value);
        if (filtersMarkup) {
          div.className = "search-results-f";
          div.innerHTML = filtersMarkup;
          filters_block.appendChild(div);
          //add clear all btn
          var div = document.createElement('div');
          clearMarkup = this.buildClearBlocks();
          div.className = "search-results-f";
          div.innerHTML = clearMarkup;
          filters_block.appendChild(div);
        }

      } else {
        queryParams = queryParams.replace(qp, "");
        this.deleteFilterBlocks(level_filter[i].value);
      }
    }

    for (var i = 0; i < duration_filter.length; i++) {
      qp = '&DURATION=' + duration_filter[i].value;
      if (duration_filter[i].checked) {
        queryParams += qp;
        var div = document.createElement('div');
        filtersMarkup = this.buildFilterBlocks(duration_filter[i].value);
        div.className = "search-results-f";
        div.innerHTML = filtersMarkup;
        filters_block.appendChild(div);
        //add clear all btn
        var div = document.createElement('div');
        clearMarkup = this.buildClearBlocks();
        div.className = "search-results-f";
        div.innerHTML = clearMarkup;
        filters_block.appendChild(div);
      } else {
        queryParams = queryParams.replace(qp, "");
        this.deleteFilterBlocks(duration_filter[i].value);
      }
    }

    for (var i = 0; i < type_filter.length; i++) {
      qp = '&TYPE=' + type_filter[i].value;
      if (type_filter[i].checked) {
        if (type_filter[i].value == 'Free Course') {



          if (queryParams.includes('&subscription=Foundation')) {
            queryParams = queryParams.replace('&subscription=Foundation', '');
            qp = '&subscription=Free';
          }

          else if (queryParams.includes('&subscription=Data%20Academy')) {
            queryParams = queryParams.replace('&subscription=Data%20Academy', '');
            qp = '&subscription=Free';
          } else {
            qp = '&subscription=Free';
          }
        }
        queryParams += qp;
        var div = document.createElement('div');
        filtersMarkup = this.buildFilterBlocks(type_filter[i].value);
        div.className = "search-results-f";
        div.innerHTML = filtersMarkup;
        filters_block.appendChild(div);
        //add clear all btn
        var div = document.createElement('div');
        clearMarkup = this.buildClearBlocks();
        div.className = "search-results-f";
        div.innerHTML = clearMarkup;
        filters_block.appendChild(div);
      } else {
        queryParams = queryParams.replace(qp, "");
        this.deleteFilterBlocks(type_filter[i].value);
      }
    }
    var filter_blocks = document.querySelectorAll('.f_option:not(.btn)');
    var clear_filters_btn = document.getElementById('clear_all_option');
    if (filter_blocks.length == 0 && clear_filters_btn) {
      clear_filters_btn.parentNode.remove(clear_filters_btn);
    }
    for (var i = 0; i < filter_blocks.length; i++) {
      filter_blocks[i].addEventListener('click', function () {
        var block_id = this.id;
        block_id = block_id.replace('_bl', "");
        for (var x = 0; x < all_filters.length; x++) {
          if (all_filters[x].value == block_id) {
            all_filters[x].checked = false;
            if (!has_filters()) {
              hideFilterByText();
            }
            filter_change();
          }
        }

      }, false);
    }

    if (clear_filters_btn) {
      clear_filters_btn.addEventListener('click', function () {
        for (var x = 0; x < all_filters.length; x++) {
          if (all_filters[x].checked) {
            all_filters[x].checked = false;
          }
        }
        clear_filters_btn.parentNode.remove(clear_filters_btn);
        hideSearchmeta();
        hideFilterByText();
        filter_change();
      }, false);
    }
  }
  var resultsLoader = myAccountMyCoursesCourseRowBlockLoader();
  var url = `${dcomApiSettings.root}dcom-blocks/v1/courses/?page_size=20&page_index=${pageIndex}${queryParams}`;
  var search_results_number_h = document.querySelector('#search_results_number_h');
  fetchResource(url).then(function (response) {
    var results = (response && response.results) ? response.results : [];
    if (results.length === 0) {
      if (append) return;
      return;
    }
    if (parseInt(search_results_number_h.value)) {
      search_results_number_h.value = parseInt(search_results_number_h.value) + response.total;
    } else {
      search_results_number_h.value = response.total;
    }

    var courses = buildCoursesFromCatalogResults(results);
    var coursesByRow = resultsLoader.groupCoursesPerRow(courses);
    //adds courseshere
    var search_results_number = document.querySelector('#search_results_number');
    // search_results_number.innerHTML=(response.total);

    resultsLoader.injectCourses(searchResultsWrapper, coursesByRow);

    resultsLoader.injectPagination('loadCatalogResults', queryParams, searchResultClass, searchResultsWrapper, parseInt(pageIndex) - 1, parseInt(pageIndex), parseInt(pageIndex) + 1, courses.length, response.total);
  }).catch(function (err) {
    console.log(err);
  });
}






function buildFilterBlocks(f) {

  var filter_bl = document.getElementById(f + '_bl');
  if (!filter_bl) {
    return `<div class="f_option" id="${f}_bl">
                <a  href="#" class="filter_l_block w-inline-block w-clearfix">
                  <div class="text-block-54">${f}</div>
                  <div class="div-block-75"></div>
                </a>
              </div>`;
  } else
    return '';
}

function buildClearBlocks() {
  var clear_filters_btn = document.getElementById('clear_all_option');
  if (!clear_filters_btn) {
    showFilterByText();
    return `<div id="w-node-d8f1b0e85e14-abd80d42" class="f_option btn">
    <a data-w-id="3d2b313c-55ac-5a56-be9a-ba035ab3aa04" href="#" id="clear_all_option" class="button-blue-2 main-button hover ca w-button">Clear All Options<br>
    </a></div>`;
  }
  else {
    return '';
  }
}

function deleteFilterBlocks(f) {


  var filter_bl = document.getElementById(f + '_bl');
  if (filter_bl) {
    // return filter_bl.parentNode.removeChild(filter_bl);
    var sort_by_text = document.querySelector('.text-block-45');
    sort_by_text.innerHTML = 'SORT BY';
    return filter_bl.parentNode.remove();



  } else
    return null;

}


function buildCoursesFromCatalogResults(results) {
  var courses = [];
  results.forEach(function (result) {
    courses.push({
      'course_id': result.data.id,
      'display_name_with_default': result.data.content.display_name,
      'course_image_url': result.data.image_url,
      'duration': result.data.duration,
    });
  });
  return courses;
}


function loadEligibleCoursesResults(query, resultBlockClassPath) {
  var myAccountMyCoursesCourseRowBlock = document.querySelector(resultBlockClassPath);
  if (!myAccountMyCoursesCourseRowBlock) { return }

  var resultsLoader = myAccountMyCoursesCourseRowBlockLoader();
  var url = `${dcomApiSettings.root}dcom-blocks/v1/eligible-courses/?query=${query}`;
  fetchResource(url, true).then(function (results) {
    deleteChildren(myAccountMyCoursesCourseRowBlock);

    if (results.length === 0) {
      resultsLoader.injectEmptyResult(myAccountMyCoursesCourseRowBlock, 'You have no eligible courses matching your search.');
      return;
    }
    var courses = buildCoursesFromEligibleCourses(results);
    var coursesByRow = resultsLoader.groupCoursesPerRow(courses)
    resultsLoader.injectCourses(myAccountMyCoursesCourseRowBlock, coursesByRow);
  }).catch(function (err) {
    console.log(err);
  });
}


function buildCoursesFromEligibleCourses(_courses) {
  var courses = [];
  _courses.forEach(function (_course) {
    courses.push({
      'course_id': _course.course_id,
      'display_name_with_default': _course.name,
      'course_image_url': _course.image_url,
      'duration': '5',
    });
  });
  return courses;
}


function buildCourseCatalogQueryParams() {
  var searchContainer = document.querySelector('.search-block');
  var filterContainer = document.querySelector('.filter-container');
  var queryParams = getFilterQueryParams(filterContainer);
  queryParams += getSearchQueryParams(searchContainer);
  return queryParams;
}


function getFilterQueryParams(filterContainer) {
  filter = Filter(filterContainer);
  queryParams = filter.buildQueryParamString();
  queryParams = queryParams ? `&${queryParams}` : '';
  return queryParams
}


function getSearchQueryParams(searchContainer) {
  var searchBox = searchContainer.querySelector('#search');
  var value = searchBox && searchBox.value;
  return value ? `&search_string=${value}` : '';
}


function Filter(filterContainer) {
  return {
    filterIndexMap: [
      'SUBSCRIPTION',
      'SUBJECT',
      'LEVEL'
    ],

    buildQueryParamString() {
      var filterSelections = this.extractFilterSelections();
      var queryParams = {};
      filterSelections.forEach(function (filterValue, i) {
        if (filterValue)
          queryParams[this.filterIndexMap[i].toLowerCase()] = filterValue;
      }.bind(this));
      return this.convertQueryParamsToString(queryParams);
    },

    convertQueryParamsToString(queryParams) {
      var string = '';
      for (var [name, value] of Object.entries(queryParams)) {
        if (string) string += '&';
        string += `${name}=${value}`
      }
      return string;
    },

    extractFilterSelections() {
      var filterSelectionElements = filterContainer.querySelectorAll('.filter-label');
      var filterSelections = [];
      filterSelectionElements.forEach(function (element, i) {
        if (!this.filterIndexMap.includes(element.innerText))
          filterSelections[i] = element.getAttribute('data-value');
      }.bind(this));
      return filterSelections;
    }
  }
}

function buildResultItem2(result) {
  var post_date = result.date;
  post_date = post_date.split("T")[0];
  post_date = new Date(post_date);
  var year = post_date.getFullYear();
  var webinar_time = '';
  var cat = result._embedded['wp:term']['0']['0'].link;
  cat = cat.split("/");
  var cat = cat[5];
  if (cat == 'blog') {
    cat = 'Blog Post';
  } else if (cat == 'webinar') {
    cat = 'Webinar';
    webinar_time = '<div class="text-block-52 blog_time">1:00 PM EST<br></div>'
  } else if (cat == 'press-release') {
    cat = 'Press Release';

  }
  // console.log(res);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var month = monthNames[post_date.getMonth()];
  var day = post_date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  var date_string = month + ' ' + day + ', ' + year;

  var post_content = result.content.rendered;
  var div = document.createElement("div");
  div.innerHTML = post_content;
  var text = div.textContent || div.innerText || "";
  var maxLength = 224; // maximum number of characters to extract
  trimmedString = "";
  //Trim and re-trim only when necessary (prevent re-trim when string is shorted than maxLength, it causes last word cut)
  if (text.length > trimmedString.length) {
    //trim the string to the maximum length
    var trimmedString = text.substr(0, maxLength);
    //re-trim if we are in the middle of a word and
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    text = (trimmedString);
  }
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

  var type_filter = document.querySelectorAll('.w-checkbox-input.checkbox.type');

  for (var i = 0; i < type_filter.length; i++) {
    // if (type_filter[i].checked){
    //   console.log(type_filter[i].value);
    //
    // }

    if (type_filter[i].checked && (type_filter[i].value == 'Webinar' || type_filter[i].value == 'Blog Post' || type_filter[i].value == 'Press Releases')) {
      if (cat == type_filter[i].value) {
        return `
      <div id="w-node-2899e9f113e4-abd80d42" data-w-id="610b062d-9a61-cb27-623a-2899e9f113e4" class="post_block filterdiv0 pr f">
        <div class="course-header-rec-4">
          <a href="${baseUrl}/post/?${result.slug}" id="post_image" class="w-inline-block">
            <div style="opacity:0" class="overlay-2"></div><img src=">${result._embedded['wp:featuredmedia']['0'].source_url}" height="30" srcset="${result._embedded['wp:featuredmedia']['0'].source_url} 500w, ${result._embedded['wp:featuredmedia']['0'].source_url} 800w, ${result._embedded['wp:featuredmedia']['0'].source_url} 1024w" sizes="(max-width: 479px) 85vw, (max-width: 767px) 87vw, (max-width: 1279px) 93vw, 1023.9931030273438px" alt="" class="image-55"></a>
        </div>
        <div class="course-body-5">
          <div class="upper_bd">
            <div class="name">
              <div class="text-block-39 o"><a href="${baseUrl}/post/?${result.slug}" class="course_l-2">${result.title.rendered}</a></div>
              <div class="div-block-69">
                <div class="text-block-52 blog_date">${date_string}<br></div>` + webinar_time +
          `<div class="text-block-53">${cat}</div>
              </div>
            </div>
            <div class="text-block-52 block_text">
            ${text}...
            <a href="${baseUrl}/post/?${result.slug}" id="read_more" class="r_m">Read More</a><br></div>
          </div>
        </div>
      </div>

      `;

      }
      return '';
    }
  }

  return `
    <div id="w-node-2899e9f113e4-abd80d42" data-w-id="610b062d-9a61-cb27-623a-2899e9f113e4" class="post_block filterdiv0 pr f">
      <div class="course-header-rec-4">
        <a href="${baseUrl}/post/?${result.slug}" id="post_image" class="w-inline-block">
          <div style="opacity:0" class="overlay-2"></div><img src=">${result._embedded['wp:featuredmedia']['0'].source_url}" height="30" srcset="${result._embedded['wp:featuredmedia']['0'].source_url} 500w, ${result._embedded['wp:featuredmedia']['0'].source_url} 800w, ${result._embedded['wp:featuredmedia']['0'].source_url} 1024w" sizes="(max-width: 479px) 85vw, (max-width: 767px) 87vw, (max-width: 1279px) 93vw, 1023.9931030273438px" alt="" class="image-55"></a>
      </div>
      <div class="course-body-5">
        <div class="upper_bd">
          <div class="name">
            <div class="text-block-39 o"><a href="${baseUrl}/post/?${result.slug}" class="course_l-2">${result.title.rendered}</a></div>
            <div class="div-block-69">
              <div class="text-block-52 blog_date">${date_string}<br></div>` + webinar_time +
    `<div class="text-block-53">${cat}</div>
            </div>
          </div>
          <div class="text-block-52 block_text">
          ${text}...
          <a href="${baseUrl}/post/?${result.slug}" id="read_more" class="r_m">Read More</a><br></div>
        </div>
      </div>
    </div>

    `;
}

function NativeWordpressResultsLoader() {
  return {
    buildResults(results) {
      var _results = [];
      results.forEach(function (result) {
        _results.push({
          'id': result.id,
          'title': result.title,
          'link': result.url,
          'meta': null,
        });
      });
      return _results;
    },

    injectSearchResults(searchResultsWrapper, results) {

      var searchResultsMarkup = this.buildSearchResults(results, searchResultsWrapper);
      // console.log(searchResultsMarkup);
      // console.log('check this2');
      // var div = document.createElement('div');
      // div.className = "search-results";
      // div.innerHTML = searchResultsMarkup;
      //
      // searchResultsWrapper.appendChild(div);

    },

    buildSearchResults(results, searchResultsWrapper) {


      var searchResultsMarkup = '';
      var div = document.createElement('div');
      div.className = "search-results";

      results.forEach(function (result) {
        data = this.ajax1(result);
        jQuery.when(this.ajax1(result)).done(function (a1) {
          searchResultsMarkup += buildResultItem2(a1);
          div.innerHTML = searchResultsMarkup;
          searchResultsWrapper.appendChild(div);

        });
      }.bind(this));
      return searchResultsMarkup;
    },

    ajax1(result) {
      //ajax
      var post_id = result.id;
      return jQuery.ajax({
        url: 'http://localhost/develop-wp/wp-json/wp/v2/posts/' + post_id + '?_embed',
        method: "GET",
        dataType: "json",
        success: function (data) {

        }
      });

      // request.done(function( data ) {
      //     console.log('went here');
      //     return data;
      // });
      //
      // request.fail(function( jqXHR, textStatus ) {
      //     console.log('fail')
      // });
    },



    // buildResultItem(result) {
    //     return `
    //         <div class="searchresult-item">
    //             <div class="searchresult-link"><a href="${result.link}">${result.title}</a></div>
    //             <div class="searchresult-meta">${result.link}</div>
    //         </div>
    //     `;
    // },

    injectEmptySearchResult(searchResultsWrapper) {

    }
  }
}

function CatalogResultsLoader() {
  return {
    buildResults(results) {
      var _results = [];
      results.forEach(function (result) {
        _results.push({
          'title': result.data.content.display_name,
          'link': dcomApiSettings.edx_lms_base_url + '/courses/' + result.data.course,
          'meta': `${dcomApiSettings.edx_lms_base_url}${result.data.image_url}`,
        });
      });
      return _results;
    },

    injectSearchResults(searchResultsWrapper, results) {
      var searchResultsMarkup = this.buildSearchResults(results);
      var div = document.createElement('div');
      div.className = "searchresult-list";
      div.innerHTML = searchResultsMarkup;
      searchResultsWrapper.appendChild(div);
    },

    buildSearchResults(results) {
      var searchResultsMarkup = '';
      results.forEach(function (result) {
        searchResultsMarkup += this.buildResultItem(result);
      }.bind(this));

      return searchResultsMarkup;
    },

    buildResultItem(result) {
      return `
                <div class="searchresult-item">
                    <div class="searchresult-link"><a href="${result.link}">${result.title}</a></div>
                    <div class="searchresult-meta">${result.link}</div>
                </div>
            `;
    },

    injectEmptySearchResult(searchResultsWrapper) {
      var content = `
                <div class="searchresult-item">
                    <h4>No results matching your search were found.</h4>
                </div>
            `;
      var div = document.createElement('div');
      div.className = "searchresult-list";
      div.innerHTML = content;
      searchResultsWrapper.appendChild(div);
    }
  }
}
