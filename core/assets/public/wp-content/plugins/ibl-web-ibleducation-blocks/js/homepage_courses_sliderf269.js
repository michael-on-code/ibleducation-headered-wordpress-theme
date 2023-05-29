jQuery(document).ready(function ($) {
    var homepageCoursesSliders = $('.courses0');
    if (!homepageCoursesSliders) return;
    // TODO: DELETE LATER
    return;

    for (i = 0; i < homepageCoursesSliders.length; ++i) {
        var slideLoader = loadHomepageCoursesSlider(homepageCoursesSliders[i]);

        var queryParams = slideLoader.retrieveQueryParams();
        queryParams = queryParams ? `?${queryParams}` : '';
        var url = `${dcomApiSettings.root}dcom-blocks/v1/courses/${queryParams}`;

        fetchResource(url).then(function (response) {
            if (!response || response.results.length < 1) {
                // slideLoader.injectEmptyResult(sliderWrapper)
            }
            console.log(response);
            var tabs = slideLoader.buildTabs(response.facets);
            var courses = slideLoader.transformCourses(response.results)
            slideLoader.sortCourses(courses);
            var slides = slideLoader.buildSlides(courses)
            slideLoader.injectSlides(slides);
            slideLoader.injectSliderArrows();

            // init webflow interactions so the slider arrows and the dot function as expected
            Webflow.require('ix2').init();
        }).catch(function (err) {
            console.log(err);
        });
    }

    function loadHomepageCoursesSlider(section) {
        return {
            retrieveQueryParams() {
                var form = section.querySelector('.facets_form');
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

            buildTabs(facets) {
                var subjects = facets.subject.terms;
                var tabContainer = section.querySelector('#myBtnContainer');
                Object.keys(subjects).forEach(function (subject, i) {
                    var button = document.createElement('button');
                    button.className = i > 0 ? "btn link" : "btn link f active2";
                    button.innerHTML = subject;
                    tabContainer.appendChild(button);
                });
                tabContainer.appendChild(this.buildSubjectStatsSummary(subjects));
            },

            transformCourses(results) {
                var courses = [];
                // results.forEach(function (course) {
                //     courses.push({
                //         'courseId': course.data.course,
                //         'title': course.data.title,
                //         'imgUrl': `${dcomApiSettings.edx_lms_base_url}${course.data.image_url}`,
                //         'duration': this.getDuration(course.data.start, course.data.end)
                //     });
                // }.bind(this));
                courses = [
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    },
                    {
                        courseId: "course-v1:GK+8944A02-004+001",
                        title: "Introduction to IT",
                        imgUrl: "/asset-v1:GK+8944A02-004+001+type@asset+block@8944_004_web.jpg",
                        duration: "2 hours, 24 minutes",
                    }

                ];

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

            buildSubjectStatsSummary(subjects) {
                var stats = '';
                Object.entries(subjects).forEach(function ([subject, number], i) {
                    if (i == 0)
                        stat = '<div id="t_b" class="counter_tech" style="display: block; font-size:12px;">' + number + ' Courses in ' + subject + '</div>';
                    else
                        stat = '<div id="devops" class="devops" style="display: none; font-size:12px;">' + number + ' Courses in ' + subject + '</div>';
                    stats += stat
                });

                var div = document.createElement('div');
                div.style = 'margin-top:20px;';
                div.innerHTML = stats;
                return div;
            },

            buildSlides(courses) {
                var NUM_COURSES_PER_SLIDE_PAGE = 4;
                var numPages = courses.length / NUM_COURSES_PER_SLIDE_PAGE;
                var slideMarkup = '';
                for (var i = 0; i < numPages; i++) {
                    var startIndex = i * NUM_COURSES_PER_SLIDE_PAGE;
                    slideMarkup += this.buildSlidePage(i, numPages, courses.slice(startIndex, startIndex + NUM_COURSES_PER_SLIDE_PAGE));
                }
                // var div = document.createElement('div');
                // div.className = "mask-5 w-slider-mask";
                // div.id = "w-slider-mask-0";
                return slideMarkup;
                // return div;
            },

            buildSlidePage(slideIndex, numPages, courses) {
                var coursesBlock = '';
                courses.forEach(function (course, courseIndex) {
                    coursesBlock += this.buildCourseItem(course, courseIndex, slideIndex);
                }.bind(this));

                // var div = document.createElement('div');
                // div.className = "w-slide"
                // div.setAttribute("aria-label", slideIndex + " of " + numPages);
                // div.setAttribute("role", "group");
                // div.style = "transform: translateX(0px); opacity: 1;";
                // if (slideIndex > 0) {
                //     div.setAttribute("aria-hidden", "true")
                //     div.innerHTML = '<div class="div-block-54 al-l" aria-hidden="true">' + coursesBlock + '</div>';
                // } else {
                //     div.innerHTML = '<div class="div-block-54 al-l">' + coursesBlock + '</div>';
                // }

                return `
                    <div class="w-slide" aria-label="${slideIndex + 1} of ${numPages}" role="group" style="transform: translateX(0px); opacity: 1;" ${slideIndex > 0 ? 'aria-hidden="true"' : ''}>
                        <div class="div-block-54 al-l" ${slideIndex > 0 ? 'aria-hidden="true"' : ''}>
                            ${coursesBlock}
                        </div>
                    </div>
                `;
            },

            buildCourseItem(course, courseIndex, slideIndex) {
                if (slideIndex === 0)
                    return this.renderActiveSlideCourse(course, courseIndex);
                return this.renderHiddenSlideCourse(course, courseIndex);
            },

            renderActiveSlideCourse(course, courseIndex) {
                var link = dcomApiSettings.edx_lms_base_url + '/courses/' + course.courseId;
                var duration = course.duration + (course.duration === '' ? '' : ' hours');
                return `
                <div class="course-rec-3 filterdiv0 pr f">
                    <a href="${link}" class="course_link w-inline-block">
                        <div class="course-header-rec-3">
                            <div style="opacity: 0;" class="overlay">
                                <div class="div-block-45"></div>
                            </div>
                            <img src="https://courses.develop.com/${course.imgUrl}" onerror="this.src='${document.location.origin}/wp-content/themes/learn-dcom-wp-theme/img/Image_FPO_Dark_1920x1080-p-800.png';" height="30" sizes="(max-width: 767px) 100vw, (max-width: 991px) 237.7777862548828px, (max-width: 1279px) 24vw, 267.9861145019531px" alt="" class="image-34">
                        </div>
                        <div class="course-body-4">
                            <div class="text-block-39 course_l" style="color: rgb(255, 255, 255);">${course.title}</div>
                            <div class="course-features">
                                <div class="div-block-30 first_row">
                                    <div class="div-block-31 right">
                                        <div class="faq-wrap-3">
                                        <img src="${document.location.origin}/wp-content/themes/learn-dcom-wp-theme/img/clock_1.png" alt="" class="img-trg-4"></div>
                                        <div class="features_block-2">
                                            <div class="features-title-5">${duration}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            },

            renderHiddenSlideCourse(course, courseIndex) {
                var link = dcomApiSettings.edx_lms_base_url + '/courses/' + course.courseId;
                var duration = course.duration + (course.duration === '' ? '' : ' hours');
                return `
                <div class="course-rec-3 filterdiv0 pr f" aria-hidden="true">
                    <a href="${link}" class="course_link w-inline-block" tabindex="-1" aria-hidden="true">
                        <div class="course-header-rec-3" aria-hidden="true">
                            <div style="opacity: 0;" class="overlay" aria-hidden="true">
                                <div class="div-block-45" aria-hidden="true"></div>
                            </div>
                            <img src="https://courses.develop.com/${course.imgUrl}" onerror="this.src='${document.location.origin}/wp-content/themes/learn-dcom-wp-theme/img/Image_FPO_Dark_1920x1080-p-800.png';" height="30" sizes="(max-width: 767px) 100vw, (max-width: 991px) 237.7777862548828px, (max-width: 1279px) 24vw, 267.9861145019531px" alt="" class="image-34" aria-hidden="true">
                        </div>
                        <div class="course-body-4" aria-hidden="true">
                            <div class="text-block-39 course_l" aria-hidden="true">${course.title}</div>
                            <div class="course-features" aria-hidden="true">
                                <div class="div-block-30 first_row" aria-hidden="true">
                                    <div class="div-block-31 right" aria-hidden="true">
                                        <div class="faq-wrap-3" aria-hidden="true">
                                        <img src="${document.location.origin}/wp-content/themes/learn-dcom-wp-theme/img/clock_1.png" alt="" class="img-trg-4" aria-hidden="true"></div>
                                        <div class="features_block-2" aria-hidden="true">
                                            <div class="features-title-5" aria-hidden="true">${duration}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            },

            injectSlides(slides) {
                slideContainer = section.querySelector('#w-slider-mask-0');
                slideContainer.insertAdjacentHTML('afterbegin', slides);
            },

            injectSliderArrows() {
                var text = `
                    <div class="left-arrow-4 w-slider-arrow-left" role="button" tabindex="0" aria-controls="w-slider-mask-0" aria-label="previous slide" style="display: none;">
                        <div class="icon-7 w-icon-slider-left"></div>
                        <img src="${document.location.origin}/wp-content/themes/learn-dcom-wp-theme/img/back-6.png" alt="" class="image-6">
                    </div>
                    <div id="r_a" class="right-arrow-3 w-slider-arrow-right" role="button" tabindex="0" aria-controls="w-slider-mask-0" aria-label="next slide">
                        <div class="icon-8 w-icon-slider-right"></div>
                        <img src="${document.location.origin}/wp-content/themes/learn-dcom-wp-theme/img/next-5.png" alt="" class="image-ra">
                    </div>
                    <div class="slide-nav-3 w-slider-nav w-round">
                        <div class="w-slider-dot w-active" data-wf-ignore="" aria-label="Show slide 1 of 2" aria-selected="true" role="button" tabindex="0"></div>
                        <div class="w-slider-dot" data-wf-ignore="" aria-label="Show slide 2 of 2" aria-selected="false" role="button" tabindex="-1"></div>
                    </div>
                `;
                slideContainer = section.querySelector('#w-slider-mask-0');
                slideContainer.insertAdjacentHTML('afterend', text);
            }
        };
    }
});

function dcomSwitchHomePageCourseTabs(elementId) {
    var prefix = getIdPrefix(elementId);
    var target = document.querySelector('#' + elementId);
    var container = target.parentElement.parentElement.parentElement;
    hideActiveTabContext(container);
    showNewActiveTabContext(prefix, target, container);
}

function getIdPrefix(elementId) {
    return elementId.replace('-tabButton', '');
}

function hideActiveTabContext(container) {
    // remove active2 from current active2
    var currentActiveTabButton = container.querySelector('.active2')
    currentActiveTabButton.classList.remove('active2');

    // hide stats
    var statsWrapper = container.querySelector('.subject-stats');
    var elements = statsWrapper.querySelectorAll('.counter_tech');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }

    // hide slider
    var sliders = container.querySelectorAll('.w-slider');
    for (var i = 0; i < sliders.length; i++) {
        if (!sliders[i].classList.value.includes('hide')) {
            sliders[i].classList.add('hide');
        }
    }
}

function showNewActiveTabContext(prefix, target, container) {
    // add active2 to target
    target.classList.add('active2');

    var statElementId = prefix + '-stat';
    var element = container.querySelector('#' + statElementId);
    element.style.display = 'block';

    var SliderId = prefix + '-desktop-content';
    element = container.querySelector('#' + SliderId);
    element.classList.remove('hide');

    SliderId = prefix + '-tablet-content';
    element = container.querySelector('#' + SliderId);
    element.classList.remove('hide');

    SliderId = prefix + '-mobile-content';
    element = container.querySelector('#' + SliderId);
    element.classList.remove('hide');
}