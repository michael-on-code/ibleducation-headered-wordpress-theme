var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load", function () {
    var sliderCoursesBlock = document.querySelector('.catalog-slider-block');
    if (!sliderCoursesBlock) { return }
    var sliderWrapper = sliderCoursesBlock.querySelector('.w-slider-mask');
    if (!sliderWrapper) { return }

    var slideLoader = loadCatalogSlides();
    var url = `${dcomApiSettings.root}dcom-blocks/v1/courses/`;
    fetchResource(url).then(function (response) {
        var courses = slideLoader.buildCourses(response.results)
        var coursesBySlide = slideLoader.groupCoursesPerSlide(courses);

        while (sliderWrapper.firstChild) sliderWrapper.removeChild(sliderWrapper.firstChild);

        slideLoader.injectCourses(sliderWrapper, coursesBySlide);
        slideLoader.injectSliderArrows(sliderWrapper);
    }).catch(function (err) {
        console.log(err);
    });
});


function loadCatalogSlides() {
    return {

        buildCourses(results) {
            var courses = [];
            results.forEach(function (course) {
                courses.push({
                    'friendlySlug': course.data.course,
                    'name': course.data.content.display_name,
                    'imgUrl': `${dcomApiSettings.edx_lms_base_url}${course.data.image_url}`,
                    'duration': this.getDuration(course.data.start, course.data.end)
                });
            }.bind(this));
            return courses;
        },

        getDuration(start, end) {
            if (!end) return 'N/A';
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

        injectCourses(sliderWrapper, coursesBySlider) {
            coursesBySlider.forEach(function (courses) {
                sliderWrapper.appendChild(this.buildCoursesSlide(courses));
            }.bind(this));
        },

        buildCoursesSlide(courses) {
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
            var link = document.location.origin + '/courses/' + course.friendlySlug;
            var duration = course.duration + (course.duration === 'N/A' ? '' : ' hours');

            return `
                <div class="w-col w-col-3">
                    <img src=${course.imgUrl} sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 20vw, (max-width: 9142px) 21vw, 1920px" alt="" />
                    <h5><a href=${link}>${course.name}</a></h5>
                    <div class="meta">${duration}</div>
                </div>`;
        },

        injectSliderArrows(sliderWrapper) {
            var text = `
                <div class="w-slider-arrow-left">
                    <div class="left-arrow-black w-icon-slider-left"></div>
                </div>

                <div class="w-slider-arrow-right">
                    <div class="right-arrow-black w-icon-slider-right"></div>
                </div>
            `;
            sliderWrapper.insertAdjacentHTML('afterend', text);
        }
    }
}

