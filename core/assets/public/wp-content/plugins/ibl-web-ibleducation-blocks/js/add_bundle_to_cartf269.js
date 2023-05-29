jQuery(document).ready(function ($) {
  $('.dcom_add_bundle_to_cart').each(function (index, item) {
    $(item).on('click', function (e) {
      e.preventDefault();
      var dataset = $(this).data();
      var product1 = dataset.product_id;
      var product2 = dataset.product_id_2;
      var $elem = $(this);

      $.ajax({
        url: addBundleSetting.url,
        type: 'post',
        data: {
          action: addBundleSetting.action,
          nonce: addBundleSetting.nonce,
          product_1: product1,
          product_2: product2
        },
        beforeSend: function () {
          $elem.removeClass('added').addClass('loading');
        },
        complete: function () {
          $elem.addClass('added').removeClass('loading');
        },
        success: function (response) {
          if (response.error) return;

          $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $elem]);
        }
      })
    })
  })
})
