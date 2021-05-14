import $ from 'jquery';

/**
 * IntuitSolutions.net - custom JS that fires when the Category page refreshes / reloads (ie. a faceted search filter was clicked)
 */
export default function () {
    $(".filter-subMenu__close").on( "click", function() {
        $('.facetedSearch-toggle.toggleLink').attr('aria-expanded', 'false');
        $('.facetedSearch-toggle.toggleLink').removeClass('is-open');
        $('.filter-subMenu').removeClass('is-open');
        $('.filter-dark').css('display', 'none');
      });

      $('.filter-subMenu__done-btn').on('click', function() {
          $('.filter-subMenu__close').click();
      });
}
