jQuery(document).ready(function ($) {
    $('#reset_password').on('click', function (e) {
        e.preventDefault();
        var element = $(this);
        var errorMessage = 'Failed to send recovery email. Please try again!';

        $.ajax({
            url: '?dcom-ajax=reset_password',
            type: 'post',
            data: {
                security: dcomApiSettings.nonce,
                action: 'reset_password'
            },
            beforeSend: function () {
                console.log(element);
                element.prop("disabled", true);
            },
            complete: function () {
            },
            error: function (error) {
                console.log(error.responseJSON);
                $('#reset_password_message').text(errorMessage);
                element.prop("disabled", false);
            },
            success: function (response) {
                if (response.error) {
                    console.log(response.error);
                    $('#reset_password_message').text(errorMessage);
                    element.prop("disabled", false);
                };

                $('#reset_password_message').html(JSON.parse(response.data).value);
            }
        })
    })
})
