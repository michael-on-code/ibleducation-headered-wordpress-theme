window.addEventListener("load", function () {
    if (!dcomApiSettings.username) { return }

    var courseFeatures = document.querySelectorAll('.singleCourseFeature');
    if (!courseFeatures) { return }

    var courseFeatureLoader = SingleCourseFeatureLoader();
    courseFeatures.forEach(function (courseFeature, i) {
        var courseId = courseFeatureLoader.getCourseId(courseFeature);
        var url = `${dcomApiSettings.root}dcom-blocks/v1/enrollment-eligibility/?username=${dcomApiSettings.username}&course_id=${courseId}`;
        fetchResource(url, true).then(function (response) {
            if (response.is_enrolled) {
                courseFeatureLoader.updateButtonText(courseFeature);
                courseFeatureLoader.updateButtonHref(courseFeature, courseId, 'RESUME');
            } else {
                courseFeatureLoader.updateButtonHref(courseFeature, courseId, 'START');
            }
        }).catch(function (err) {
            console.log(err);
        })
    });
});

function SingleCourseFeatureLoader() {
    return {

        getCourseId(courseFeature) {
            return courseFeature.querySelector('.courseId').value;
        },

        updateButtonText(courseFeature) {
            var button = courseFeature.querySelector('.button');
            button.innerText = 'Resume Course';
        },

        updateButtonHref(courseFeature, courseId, status) {
            var button = courseFeature.querySelector('.button');
            if (status === 'RESUME')
                button.href = `${dcomApiSettings.edx_lms_base_url}courses/${courseId}/course/`;
            else
                button.href = `${document.location.origin}/course/${courseId}`
        }
    }
}
