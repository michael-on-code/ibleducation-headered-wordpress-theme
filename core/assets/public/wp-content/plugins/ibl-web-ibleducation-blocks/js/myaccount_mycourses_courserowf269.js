var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load", function () {
    var mycoursesBlocks = document.querySelectorAll('.myaccount-mycourses-courserow');
    if (!mycoursesBlocks) { return }

    var blockLoader = myAccountMyCoursesCourseRowBlockLoader();
    var url = `${dcomApiSettings.root}dcom-blocks/v1/mycourses/`;
    var callingWPBackend = true;
    mycoursesBlocks.forEach(function (mycoursesBlock) {
        // TODO: You need to determine when to load this better
        // for now we are just going to see if we are on the my-account page
        if (document.location.pathname.includes('my-account')) {
            fetchResource(url, callingWPBackend).then(function (response) {
                if (!response) {
                    blockLoader.injectEmptyResult(mycoursesBlock);
                    return;
                }
                var courses = response['courses'];

                var coursesByRow = blockLoader.groupCoursesPerRow(courses);
                blockLoader.injectCourses(mycoursesBlock, coursesByRow);
            }).catch(function (err) {
                console.log(err);
            });
        }
    });
});

function myAccountMyCoursesCourseRowBlockLoader() {
    var numCoursesPerRow = 4;

    return {

        groupCoursesPerRow(courses) {
            var numCoursesPerRow = 4;
            var start = 0
            var end = numCoursesPerRow;

            var coursesPerRow = [];
            while (start < courses.length) {
                coursesPerRow.push(courses.slice(start, end));
                start = end;
                end = end + numCoursesPerRow;
                end = end > courses.length ? courses.length : end;
            }
            return coursesPerRow;
        },

        injectEmptyResult(myCoursesBlock, msg) {
            if (!msg) {
                msg = 'You have no enrolled courses!';
            }

            var content = `
                <div class="course-row w-row">
                    <h4>${msg}</h4>
                </div>
            `;
            var div = document.createElement('div');
            div.className = "w-container";
            div.innerHTML = content;
            myCoursesBlock.appendChild(div);
        },

        injectCourses(block, coursesByRow) {
            return coursesByRow.forEach(function (courses) {
                block.appendChild(this.buildRow(courses));
            }.bind(this));
        },

        buildRow(courses) {

            var rowMarkup = '';
            courses.forEach(function (course, i) {
                rowMarkup += this.buildCourseItem(course, i);
            }.bind(this));

            var div = document.createElement('div');
            div.className = "search-results";
            div.innerHTML = rowMarkup;
            return div;
            //
            // console.log(rowMarkup);
            // return rowMarkup;


        },

        buildCourseItem(course, index) {
            var {
                course_id,
                course_image_url,
                display_name_with_default,
                duration,
            } = course;
            // TODO: eventually, we might want to surround the title in an anchor tag
            var imgUrl = `${dcomApiSettings.edx_lms_base_url}${course_image_url}`;
            // var imgUrl = `https://courses.develop.com/${course_image_url}`;
            var courseUrl = `${dcomApiSettings.edx_lms_base_url}/courses/${course_id}/course/`;




            // <div class="w-col w-col-3">
            //     <div class="content-card">
            //         <img
            //             src=${imgUrl}
            //             onerror="this.src='${document.location.origin}/wp-content/plugins/${PLUGIN_DIRECTORY_NAME}/img/courses-results-default-image.jpeg';"
            //             sizes="(max-width: 479px) 100vw, (max-width: 767px) 82vw, (max-width: 991px) 20vw, (max-width: 8727px) 22vw, 1920px"
            //             alt=""
            //         >
            //         <h4><a href="${courseUrl}">${display_name_with_default}</a></h4>
            //         <div class="meta">${duration || ''}</div>
            //     </div>
            // </div>

            return (`
                <div data-w-id="610b062d-9a61-cb27-623a-2899e9f113fa" class="course-rec-3 filterdiv0 pr f">
                  <a href="${courseUrl}" class="course_link w-inline-block">
                    <div class="course-header-rec-3">
                      <div style="opacity:0" class="overlay">
                        <div class="div-block-45"></div>
                      </div><img src=${imgUrl} height="30" srcset=${imgUrl} 500w, ${imgUrl} 800w" sizes="(max-width: 479px) 280px, (max-width: 767px) 271.9965515136719px, (max-width: 991px) 35vw, 267.9861145019531px" alt="" class="image-34"></div>
                    <div class="course-body-4">
                      <div class="text-block-39 course_l">${display_name_with_default}</div>
                      <div class="course-features">
                        <div class="div-block-30 first_row">
                          <div class="div-block-31 right">
                            <div class="faq-wrap-3"><img src="../wp-content/themes/dcom-wp-theme/img/clock_1.png" alt="" class="img-trg-4"></div>
                            <div class="features_block-2">
                              <div class="features-title-5">${duration || ''}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

            `);
        },

        injectPagination(loadResultsFunction, query, resultBlockClassPath, myCoursesBlock, previousPageIndex,currentPageIndex,nextPageIndex, coursesLength, totalResults) {
          var page_size = 20;
          var number_of_pages = totalResults/20;
          if (number_of_pages % 1 != 0){
            number_of_pages = Math.floor(number_of_pages);
          }
          var page_links='';
          var dot_block='';
          var last_page_link='';

          for (var i = currentPageIndex; i <=number_of_pages ; i++) {
            if(i<currentPageIndex+4){
              var number_class ='';

              if (i ==currentPageIndex){
                number_class = 'act';

              }
               page_links += `<a
              onclick="emptyResults();${loadResultsFunction}('${query}', '${resultBlockClassPath}', '${i}', true)"
              href="#" class="pag_num-2 w-inline-block">
                                      <div class="page_num-2 `+number_class+`">`+(i+1)+`</div>
                                    </a>`;
            }else {
              dot_block =`<div class="page_dots">...</div>`;
              if (i==number_of_pages){
                if (i ==currentPageIndex){
                  number_class = 'act';

                }
                last_page_link = `<a
                onclick="emptyResults();${loadResultsFunction}('${query}', '${resultBlockClassPath}', '${i}', true)"
                href="#" class="pag_num-2 w-inline-block">
                                       <div class="page_num-2 `+number_class+`">`+(i+1)+`</div>
                                     </a>`
              }
            }

          }

          if (currentPageIndex == 0){
            previous_arrow ='';
          }else{
            previous_arrow =`<a onclick="emptyResults();${loadResultsFunction}('${query}', '${resultBlockClassPath}', '${previousPageIndex}', true)"
                                  href="#" class="rig_pa has_link w-inline-block"><img src="../wp-content/themes/dcom-wp-theme/img/back-6.png" alt="" class="image-59">
                                  </a>`
          }

          if (currentPageIndex == number_of_pages){
            next_arrow ='';
          }else{
            next_arrow =`<a onclick="emptyResults();${loadResultsFunction}('${query}', '${resultBlockClassPath}', '${nextPageIndex}', true)"
                                  href="#" class="rig_pa has_link w-inline-block"><img src="../wp-content/themes/dcom-wp-theme/img/next-5.png" alt="" class="image-59">
                                  </a>`
          }


          var pagination_div = `<div class="pagination_cont">
                    <div class="pag_row">`
                      +previous_arrow
                      +page_links+
                      `<div>`
                        +dot_block+
                      `</div>`
                      +last_page_link+
                      next_arrow+
                      `</div>
                  </div>`;

            // if ((coursesLength % 4) !== 0) return;
            //
            // var content = `
            //         <div class="course-row w-row loadMoreButton" style="text-align: center">
            //             <a
            //                 onclick="${loadResultsFunction}('${query}', '${resultBlockClassPath}', '${nextPageIndex}', true)"
            //                 class="button w-button"
            //                 aria-label="Load More"
            //                 rel="nofollow"
            //             >
            //                 Load More
            //             </a>
            //         </div>
            //     `;
            var pag_parent = document.querySelector('.pagination-2');
            pag_parent.innerHTML ='';

            var pag_container = document.querySelector('.w-container-pagination-2');
            if (!pag_container){
              var div = document.createElement('div');
              div.className = "w-container-pagination";
              div.innerHTML = pagination_div;
              pag_parent.appendChild(div);


            }
        },

        // injectLoadMoreButton(loadResultsFunction, query, resultBlockClassPath, myCoursesBlock, nextPageIndex, coursesLength) {
        //     if ((coursesLength % 4) !== 0) return;
        //
        //     var content = `
        //             <div class="course-row w-row loadMoreButton" style="text-align: center">
        //                 <a
        //                     onclick="${loadResultsFunction}('${query}', '${resultBlockClassPath}', '${nextPageIndex}', true)"
        //                     class="button w-button"
        //                     aria-label="Load More"
        //                     rel="nofollow"
        //                 >
        //                     Load More
        //                 </a>
        //             </div>
        //         `;
        //     var div = document.createElement('div');
        //     div.className = "w-container";
        //     div.innerHTML = content;
        //     myCoursesBlock.appendChild(div);
        // },

        // deleteLoadMoreButton(resultsBlockClassPath, myCoursesBlock) {
        //     var loadMoreButton = myCoursesBlock.querySelector(`${resultsBlockClassPath} .loadMoreButton`);
        //     loadMoreButton.remove();
        // },

        // disableLoadMoreButton(resultsBlockClassPath, myCoursesBlock) {
        //     var loadMoreButton = myCoursesBlock.querySelector(`${resultsBlockClassPath} .loadMoreButton .button`);
        //     loadMoreButton.removeAttribute('onclick');
        //     loadMoreButton.style.backgroundColor = '#0a0a0a';
        // }
    }
}
