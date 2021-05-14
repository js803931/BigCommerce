import $ from 'jquery';

/**
 * IntuitSolutions.net - custom JS that fires when product page loads
 */
export default function () {
    if ($('.icon--play').length) {
        $('.see-more').css("display", "block");
    } else {
        $('.see-more').css("display", "none");
    }

    const windowWidth = $(window).width();

    if (windowWidth > 800) {
        $('.prod-view-description-a').addClass('is-open');
        $('.prod-view-description-ul').addClass('is-open');
    }

    const iconOne = $('.productView-info-value.custom-icon-1').text();
    const iconTwo = $('.productView-info-value.custom-icon-2').text();
    const iconThree = $('.productView-info-value.custom-icon-3').text();
    const textOne = $('.productView-info-value.custom-text-1').text();
    const textTwo = $('.productView-info-value.custom-text-2').text();
    const textThree = $('.productView-info-value.custom-text-3').text();

   

    if ($('.productView-info-value.custom-text-1').length > 0) {
        console.log('exists');
        $('.NRinfo__icon-1').attr('src', `../content/product_icons/${iconOne}`);
        $('.NRinfo__icon-2').attr('src', `../content/product_icons/${iconTwo}`);
        $('.NRinfo__icon-3').attr('src', `../content/product_icons/${iconThree}`);
        $('.NRinfo__text-1').text(textOne);
        $('.NRinfo__text-2').text(textTwo);
        $('.NRinfo__text-3').text(textThree);
    } else {
        console.log('does not exist');
        $('.NRinfo__icon-1').attr('src', `../content/product_icons/default_1.png`);
        $('.NRinfo__icon-2').attr('src', `../content/product_icons/default_2.png`);
        $('.NRinfo__icon-3').attr('src', `../content/product_icons/default_3.png`);
    }

    $('.productView__num-of-reviews').click(() => {
        $('productView__collapse.review-collapse').addClass('is-open');
        $('productView__collapse.review-collapse').attr('aria-expanded', 'true');
        $('.productView__collapse-content.review-collapse-content').addClass('is-open');
        $('.productView__collapse-content.review-collapse-content').attr('aria-hidden', 'false');
        $('.review-collapse .productView__nav-menu-plus').css('display', 'none');
        $('.review-collapse .productView__nav-menu-minus').css('display', 'block');

    });

    $('.show-more-reviews').click(() => {
        $('.productReview').removeClass('productReview--hidden');
        $('.show-more-reviews').css('display', 'none');
    })

    if ($('.productReview').length < 3) {
        $('.show-more-reviews').css('display', 'none');
    }

    if ($('.productView-price .rrp-price--withoutTax').css('display') === 'none') {
        $('.productView-price .price--withoutTax').css('color', '#333333');
    }
    
    $('.write-review__container #revfromname').bind('DOMSubtreeModified', () => {
        console.log('in review');
        if ($('.write-review__container #revfromname .form-inlineMessage').text() === "The 'Comments' field cannot be blank.") {
            $('.write-review__container #revfromname .form-inlineMessage').text("The 'Name' field cannot be blank.");
        }
    });
}

