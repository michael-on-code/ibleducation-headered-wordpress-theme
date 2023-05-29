var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load", function () {
    var sliderYourCoursesBlock = document.querySelector('.slider-yourcourses-block');
    if (!sliderYourCoursesBlock) { return }
    var sliderWrapper = sliderYourCoursesBlock.querySelector('.w-slider-mask');
    if (!sliderWrapper) { return }

    var slideLoader = loadYourCoursesSlides();
    // var url = 'https://develop.free.beeceptor.com/api/v1/my/courses/';
    var url = `${dcomApiSettings.root}dcom-blocks/v1/mycourses/`;
    var callingWPBackend = true;
    fetchResource(url, callingWPBackend).then(function (response) {
        var courses = response['courses'];
        var coursesBySlide = slideLoader.groupCoursesPerSlide(courses);
        slideLoader.injectCourses(sliderWrapper, coursesBySlide);
        slideLoader.injectSliderArrows(sliderWrapper);
    }).catch(function (err) {
        console.log(err);
    });
});

function loadYourCoursesSlides() {
    return {

        groupCoursesPerSlide(courses) {
            var numCoursesPerSlide = 3;
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

        injectCourses(sliderWrapper, coursesBySlider) {
            return coursesBySlider.forEach(function (courses) {
                sliderWrapper.appendChild(this.buildCoursesSlide(courses));
            }.bind(this));
        },

        buildCoursesSlide(courses) {
            var slideMarkup = '';
            courses.forEach(function (course, i) {
                slideMarkup += this.buildCourseItem(course, i);
            }.bind(this));

            var div = document.createElement('div');
            div.className = "w-slide";
            div.innerHTML = '<div class="catalog-row w-row">' + slideMarkup + '</div>';
            return div;
        },

        buildCourseItem(course, index) {
            var {
                display_name_with_default,
                course_image_url,
                duration,
                course_id,
                block_completion_percentage
            } = course;

            var imgUrl = `${dcomApiSettings.edx_lms_base_url}${course_image_url}`;
            var link = `${dcomApiSettings.edx_lms_base_url}courses/${course_id}/course/`;
            var durationText = duration ? `${duration} hours` : 'N/A';
            var progressBlock = block_completion_percentage != null
                ? (
                    `<div class="progress">
                        <div class="meta">${block_completion_percentage}% complete</div>
                        <div class="progress-bg">
                            <div class="progress-complete"></div>
                        </div>
                    </div>`
                )
                : '';

            function render0thItem() {
                return (`
                    <div class="w-col w-col-6">
                        <img src=${imgUrl} sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 20vw, (max-width: 9142px) 21vw, 1920px" alt="" />
                        <h4 class="slider-h4"><a href=${link} class="link-dark link-dark">${display_name_with_default}</a></h4>
                        <div class="meta">${durationText}</div>
                        ${progressBlock}
                    </div>
                `);
            }

            function renderOthers() {
                return (
                    `<div class="w-col w-col-3">
                        <img src=${imgUrl} sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 20vw, (max-width: 9142px) 21vw, 1920px" alt="" />
                        <h5 class="slider-h5 link-dark">${display_name_with_default}</h5>
                        <div class="meta">${durationText}</div>
                        ${progressBlock}
                    </div>`
                );
            }

            return index === 0 ? render0thItem() : renderOthers();
        },

        injectSliderArrows(sliderWrapper) {
            var text = `
                <div class="left-arrow w-slider-arrow-left">
                    <div class="left-arrow-black w-icon-slider-left"></div>
                </div>

                <div class="w-slider-arrow-right">
                    <div class="right-arrow-black w-icon-slider-right"></div>
                </div>

                <div class="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
            `;
            sliderWrapper.insertAdjacentHTML('afterend', text);
        }
    }
}
