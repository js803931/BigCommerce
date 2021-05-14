import $ from 'jquery';

/**
 * IntuitSolutions.net - custom JS that fires when the category page loads
 */
export default function () {
    $('.promo-header-banner').insertBefore('.container');

    $('.category__list-container > p').appendTo('.category__SEO-text');

    if ($('.pagination').length === 0) {
        $('.sort-filter-container .form-select').addClass('no-pag');
    }

    for (let i = 0; i < $('.price--withoutTax').length; i++) {
        if ($('.non-sale-price--withoutTax').eq(i).css('display') === 'none') {
            $('.price--withoutTax').eq(i).css('color', 'black');
        }
    }
}
