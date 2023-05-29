window.addEventListener("load", function () {
    var sliderCoursesBlock = document.querySelectorAll('.slider-block-courses');
    if (!sliderCoursesBlock) { return }

    for (i = 0; i < sliderCoursesBlock.length; ++i) {
        var sliderWrapper = sliderCoursesBlock[i].querySelector('.w-slider-mask');
        if (!sliderWrapper) { return }

        var slideLoader = loadCoursesSlides(sliderCoursesBlock[i]);

        var queryParams = slideLoader.retrieveQueryParams();
        queryParams = queryParams ? `?${queryParams}` : '';
        var url = `${dcomApiSettings.root}dcom-blocks/v1/courses/${queryParams}`;
        fetchResource(url).then(function (response) {
            if (!response || response.results.length < 1) {
                slideLoader.injectEmptyResult(sliderWrapper)
            }
            var courses = slideLoader.buildCourses(response.results)
            slideLoader.sortCourses(courses);
            var coursesBySlide = slideLoader.groupCoursesPerSlide(courses);
            slideLoader.injectCourses(sliderWrapper, coursesBySlide);
            slideLoader.injectSliderArrows(sliderWrapper);

            // init webflow interactions so the slider arrows and the dot function as expected
            Webflow.require('ix').init([
                { "slug": "new-interaction", "name": "New Interaction", "value": { "style": {}, "triggers": [] } }
            ]);
        }).catch(function (err) {
            console.log(err);
        });
    }
});


function loadCoursesSlides(section) {
    return {

        retrieveQueryParams() {
            var form = section.querySelector('#slider_courses_form');
            var facets = ['subscription', 'level', 'subject'];
            var queryParams = {};
            facets.forEach(function (facet) {
                value = form.querySelector('#' + facet).value;
                if (value)
                    queryParams[facet] = value
            });
            if (!queryParams) return null;
            return convertObjToQueryParamString(queryParams);
        },

        buildCourses(results) {
            var courses = [];
            results.forEach(function (course) {
                courses.push({
                    'courseId': course.data.course,
                    'name': course.data.content.display_name,
                    'imgUrl': `${dcomApiSettings.edx_lms_base_url}${course.data.image_url}`,
                    'duration': this.getDuration(course.data.start, course.data.end)
                });
            }.bind(this));
            return courses;
        },

        sortCourses(courses) {
            function compare(courseA, courseB) {
                var comparison = 0;
                if (courseA.courseId > courseB.courseId) {
                    comparison = 1;
                } else if (courseA.courseId < courseB.courseId) {
                    comparison = -1;
                }
                return comparison;
            }
            courses.sort(compare);
        },

        getDuration(start, end) {
            if (!end) return '';
            return Math.abs(Date.parse(end) - Date.parse(start)) / (60 * 60 * 1000)
        },

        groupCoursesPerSlide(courses) {
            var numCoursesPerSlide = 4;
            var start = 0
            var end = numCoursesPerSlide;

            var coursesPerSlide = [];
            while (start < courses.length) {
                coursesPerSlide.push(courses.slice(start, end));
                start = end;
                end = end + numCoursesPerSlide;
                end = end > courses.length ? courses.length : end;
            }
            return coursesPerSlide;
        },

        injectEmptyResult(searchResultsWrapper) {
            var content = `
                <div class="catalog-row w-row">
                    <h4>No Course was Returned from the LMS.</h4>
                </div>
            `;
            var div = document.createElement('div');
            div.className = "w-slide";
            div.innerHTML = content;
            searchResultsWrapper.appendChild(div);
        },

        injectCourses(sliderWrapper, coursesBySlider) {
            coursesBySlider.forEach(function (courses) {
                sliderWrapper.appendChild(this.buildSlide(courses));
            }.bind(this));
        },

        buildSlide(courses) {
            var slideMarkup = '';
            courses.forEach(function (course) {
                slideMarkup += this.buildCourseItem(course);
            }.bind(this));

            var div = document.createElement('div');
            div.className = "w-slide";
            div.innerHTML = '<div class="catalog-row w-row">' + slideMarkup + '</div>';
            return div;
        },

        buildCourseItem(course) {
            var link = dcomApiSettings.edx_lms_base_url + '/courses/' + course.courseId;
            var duration = course.duration + (course.duration === '' ? '' : ' hours');
            return `
                <div class="w-col w-col-3">
                    <div class="content-card">
                        <img class="card-image course-slider" src="${course.imgUrl}" onerror="this.src='${document.location.origin}/wp-content/plugins/${PLUGIN_DIRECTORY_NAME}/img/Image_FPO_Dark_1920x1080-p-800.png';" sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 20vw, (max-width: 9142px) 21vw, 1920px" alt="">
                        <div class="content-info course-slider${this.getContentInfoColor()}">
                            <h5 class="content-info-header"><a href="${link}">${course.name}</a></h5>
                            <div class="meta">${duration}</div>
                        </div>
                    </div>
                </div>
            `;
        },

        getContentInfoColor() {
            var form = section.querySelector('form');
            return form.querySelector('#contentInfoBackgroundColorClass').value;
        },

        injectSliderArrows(sliderWrapper) {
            var text = `
                <div class="left-arrow w-slider-arrow-left" >
                    <div class="icon-left w-icon-slider-left"></div>
                </div>

                <div class="right-arrow w-slider-arrow-right">
                    <div class="icon-right w-icon-slider-right"></div>
                </div>

                <div class="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
            `;
            sliderWrapper.insertAdjacentHTML('afterend', text);
        }
    }
}
