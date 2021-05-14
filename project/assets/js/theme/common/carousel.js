import $ from 'jquery';
import 'slick-carousel';

export default function () {

    function htmlArrow(next) {
        const orientation = next ? 'next' : 'prev';
        const direction = next ? 'right' : 'left';
        const label = next ? 'Next' : 'Previous';

        return (
            `<button type="button" class="slick-${orientation} slick-arrows-container">`
            +   label
            // adding svg to prev / next buttons so that it can more easily be changed
            +   `<span class="icon slick-${orientation}__icon">`
            // +       `<svg><use xlink:href="#icon-chevron-${direction}"/></svg>`
            +       `<img class="lazyload" data-src="/content/images/carousel_arrow.png" src="/assets/img/loading.svg">`
            +   `</span>`
            + `</button>`
        );
    }

    // all carousels will have these options by default
    const defaultOptions = {
        mobileFirst: true,
        nextArrow: htmlArrow(true),
        prevArrow: htmlArrow(false),
    };

    const $carousel = $('[data-slick]');

    if ($carousel.length) {
        $carousel.slick(defaultOptions);
    }

    // Alternative image styling for IE, which doesn't support objectfit
    if (typeof document.documentElement.style.objectFit === 'undefined') {
        $('.heroCarousel-slide').each(() => {
            const $container = $(this);
            const imgUrl = $container.find('img').data('lazy');

            if (imgUrl) {
                $container.css('backgroundImage', `url(${imgUrl})`).addClass('compat-object-fit');
            }
        });
    }
}
