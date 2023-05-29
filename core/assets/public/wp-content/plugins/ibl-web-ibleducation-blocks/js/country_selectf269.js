/*global wc_country_select_params */
jQuery(function ($) {

    // wc_address_i18n_params is required to continue, ensure the object exists
    if (typeof wc_address_i18n_params === 'undefined') {
        return false;
    }


    /* State/Country select boxes */
    var states_json = wc_country_select_params.countries.replace(/&quot;/g, '"'),
        states = $.parseJSON(states_json),
        wrapper_selectors = '.woocommerce-mailing-fields';

    $(document.body).on('change refresh', 'select.country_to_state, input.country_to_state', function () {
        // Grab wrapping element to target only stateboxes in same 'group'
        var $wrapper = $(this).closest(wrapper_selectors);

        if (!$wrapper.length) {
            $wrapper = $(this).closest('.form-row').parent();
        }

        var country = $(this).val(),
            $statebox = $wrapper.find('#mailing_state'),
            $parent = $statebox.closest('.form-row'),
            input_name = $statebox.attr('name'),
            input_id = $statebox.attr('id'),
            input_classes = $statebox.attr('data-input-classes'),
            value = $statebox.val(),
            placeholder = $statebox.attr('placeholder') || $statebox.attr('data-placeholder') || '',
            $newstate;

        if (states[country]) {
            if ($.isEmptyObject(states[country])) {
                $newstate = $('<input type="hidden" />')
                    .prop('id', input_id)
                    .prop('name', input_name)
                    .prop('placeholder', placeholder)
                    .attr('data-input-classes', input_classes)
                    .addClass('hidden ' + input_classes);
                $parent.hide().find('.select2-container').remove();
                $statebox.replaceWith($newstate);
                $(document.body).trigger('country_to_state_changed', [country, $wrapper]);
            } else {
                var state = states[country],
                    $defaultOption = $('<option value=""></option>').text(wc_country_select_params.i18n_select_state_text);

                if (!placeholder) {
                    placeholder = wc_country_select_params.i18n_select_state_text;
                }

                $parent.show();

                if ($statebox.is('input')) {
                    $newstate = $('<select></select>')
                        .prop('id', input_id)
                        .prop('name', input_name)
                        .data('placeholder', placeholder)
                        .attr('data-input-classes', input_classes)
                        .addClass('state_select ' + input_classes);
                    $statebox.replaceWith($newstate);
                    $statebox = $wrapper.find('#mailing_state');
                }

                $statebox.empty().append($defaultOption);

                $.each(state, function (index) {
                    var $option = $('<option></option>')
                        .prop('value', index)
                        .text(state[index]);
                    $statebox.append($option);
                });

                $statebox.val(value).change();

                $(document.body).trigger('country_to_state_changed', [country, $wrapper]);
            }
        } else {
            if ($statebox.is('select, input[type="hidden"]')) {
                $newstate = $('<input type="text" />')
                    .prop('id', input_id)
                    .prop('name', input_name)
                    .prop('placeholder', placeholder)
                    .attr('data-input-classes', input_classes)
                    .addClass('input-text  ' + input_classes);
                $parent.show().find('.select2-container').remove();
                $statebox.replaceWith($newstate);
                $(document.body).trigger('country_to_state_changed', [country, $wrapper]);
            }
        }

        $(document.body).trigger('country_to_state_changing', [country, $wrapper]);
    });

    $(document.body).on('wc_address_i18n_ready', function () {
        // Init country selects with their default value once the page loads.
        $(wrapper_selectors).each(function () {
            var $country_input = $(this).find('#mailing_country');

            if (0 === $country_input.length || 0 === $country_input.val().length) {
                return;
            }

            $country_input.trigger('refresh');
        });
    });
});
