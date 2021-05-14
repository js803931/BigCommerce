import PageManager from './page-manager';

export default class Home extends PageManager {
    onReady() {
        window.onscroll = () => {
            scrollFunction();
            stickyBar();
        };
        headerCropImage();
    }
}

function scrollFunction() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000 && window.innerWidth > 800) {
        document.querySelector(".top-of-page").style.display = "flex";
    } else {
        document.querySelector(".top-of-page").style.display = "none";
    }
};

var navbar = document.querySelector(".header__main");
var sticky = navbar.offsetTop;
function stickyBar() {
    if (window.pageYOffset >= sticky && window.innerWidth > 800) {
        navbar.classList.add("sticky");
        $('.header-icon-container').css('margin-top', '0');
        $('.mobileMenu-container').css('height', '70px');
    } else {
        navbar.classList.remove("sticky");
        if( $(window).width() > 800 ) {
            $('.mobileMenu-container').css('height', '110px');
        }
    }
}

function headerCropImage() {
    $('.heroCarousel-image').css('display', 'none');
    if (window.innerWidth > 800 ) {

        if ($('.heroCarousel-image').length === 1) {
            $(window).on('load', () => {
                for (var i = 0; i < $('.heroCarousel-image').length; i++) {
                    $(`.heroCarousel-image`).attr('src', `/content/hero_images/hero_image_0.png?123`);
                }
                $('.heroCarousel-image').css('display', 'block');
            });
        } else {

        $(window).on('load', () => {
            for (var i = 0; i < $('.heroCarousel-image').length; i++) {
                $(`#slick-slide0${i} .heroCarousel-image`).attr('src', `/content/hero_images/hero_image_${i}.png?123`);
            }
            $('.heroCarousel-image').css('display', 'block');
        });
    }

    } else if (window.innerWidth > 551) {

        if ($('.heroCarousel-image').length === 1) {
            $(window).on('load', () => {
                for (var i = 0; i < $('.heroCarousel-image').length; i++) {
                    $(`.heroCarousel-image`).attr('src', `/content/hero_images/hero_image_tablet_0.png?123`);
                }
                $('.heroCarousel-image').css('display', 'block');
            });

            $('.heroCarousel-image').on('load', () => {    
                    let imageHeight = $(`.heroCarousel-image`).height();
                    $(`.heroCarousel-image-wrapper`).height(imageHeight);    
            });
        } else {

        $(window).on('load', () => {
            for (var i = 0; i < $('.heroCarousel-image').length; i++) {
                $(`#slick-slide0${i} .heroCarousel-image`).attr('src', `/content/hero_images/hero_image_tablet_${i}.png?123`); 
            }

            $('.heroCarousel-image').css('display', 'block');
            });

            $('.heroCarousel-image').on('load', () => {
                    
                for (var i = 0; i < $('.heroCarousel-image').length; i++) {             
                    let imageHeight = $(`#slick-slide0${i} .heroCarousel-image`).height();
                    $(`#slick-slide0${i} .heroCarousel-image-wrapper`).height(imageHeight);    
                }
            });
        }

    } else if (window.innerWidth > 0) {

        if ($('.heroCarousel-image').length === 1) {
            $(window).on('load', () => {
                for (var i = 0; i < $('.heroCarousel-image').length; i++) {
                    $(`.heroCarousel-image`).attr('src', `/content/hero_images/hero_image_mobile_0.png?123`);
                }
                $('.heroCarousel-image').css('display', 'block');
            });

            $('.heroCarousel-image').on('load', () => {    
                let imageHeight = $(`.heroCarousel-image`).height();
                $(`.heroCarousel-image-wrapper`).height(imageHeight);    
        });
        } else {

        $(window).on('load', () => {
            for (var i = 0; i < $('.heroCarousel-image').length; i++) {
                $(`#slick-slide0${i} .heroCarousel-image`).attr('src', `/content/hero_images/hero_image_mobile_${i}.png?123`); 
            }

            $('.heroCarousel-image').css('display', 'block');
        });

        $('.heroCarousel-image').on('load', () => {
                    
            for (var i = 0; i < $('.heroCarousel-image').length; i++) {             
                let imageHeight = $(`#slick-slide0${i} .heroCarousel-image`).height();
                $(`#slick-slide0${i} .heroCarousel-image-wrapper`).height(imageHeight);    
            }
        });
        }
    } else {
        console.log('GNARLY');        
    }
}
