import $ from 'jquery';
import collapsibleFactory from './../common/collapsible';
import CategorySwatches from './category-swatches';
import { loadavg } from 'os';
var json = require('../../../../lang/en.json');
import 'jquery.simple-text-rotator';
/**
 * IntuitSolutions.net - Custom JS that fires on ALL pages
 */
export default function (context) {
    /*
     * toggle search bar open on mobile when click search icon
     */
    $('#toggle-mobileSearch').on('click', (event) => {
        event.preventDefault(); // prevent default link click action
        $('.header__main-search').toggle(0); // toggle the search bar open
        $('#search_query').focus(); // try to put cursor inside the search input field
    });

    /**
     * log context while developing
     */
    if (context.inDevelopment) {
        console.log('context:', context);
    }


    /* Click on navDark to close mobile menu */

    const navDark = document.querySelector('.nav-dark');
    const navPages = document.querySelector('.navPages');
    const mobileMenuToggle = document.querySelector('.mobileMenu-toggle');
    const navPagesContainer = document.querySelector('.navPages-container');
    const header = document.querySelector('.header');

    navDark.addEventListener('click', () => {

        if (mobileMenuToggle.querySelector('.is-open') !== null) {
            mobileMenuToggle.classList.add('is-open');
            navPagesContainer.classList.add('is-open');
            header.classList.add('is-open');
            $('.navPages-container').attr('aria-hidden', 'false');
            $('.mobileMen-toggle').attr('aria-expanded', 'true');
            $('body').addClass('has-activeNavPages');

        } else {
            mobileMenuToggle.classList.remove('is-open');
            navPagesContainer.classList.remove('is-open');
            header.classList.remove('is-open');
            $('.navPages-container').attr('aria-hidden', 'true');
            $('.mobileMen-toggle').attr('aria-expanded', 'false');
            $('body').removeClass('has-activeNavPages');
        }
    });

    // Add underline to mobile menu when sub category is expanded

    const subMenuChildItem = document.querySelectorAll('.navPages-subMenu-child-item');
    const subMenuChildTitle = document.querySelectorAll('.navPages-subMenu-child-title');

    for (var i = 0; i < subMenuChildItem.length; i++) {
        subMenuChildItem[i].addEventListener('click', () => {
            for (var j = 0; j < subMenuChildTitle.length; j++) {
                if (subMenuChildItem[j].classList.contains('is-open')) {
                    subMenuChildTitle[j].style.textDecoration = 'underline';
                } else {
                    subMenuChildTitle[j].style.textDecoration = 'none';
                };
            }
        });
    }

    // Removes overlapping dark divs

    const userSigninBtn = document.querySelector('.user-signin');
    const searchDark = document.querySelector('.search-dark');

    userSigninBtn.addEventListener('click', () => {
        searchDark.style.display = 'none';
    });

    const mobileSearch = document.querySelector('.mobileSearch-toggle');

    mobileSearch.addEventListener('click', () => {
        searchDark.style.display = 'block';
    });

    searchDark.addEventListener('click', () => {
        document.querySelector('.mobileSearch-input').style.display = 'none';
    });

    // For collapsible menus
    collapsibleFactory();

    const categorySwatches = new CategorySwatches();

    $('.footer__headline-legal-link').hover(function () {
        $('.subscribe-legal-text').css('display', 'flex');
    }, function () {
        $('.subscribe-legal-text').css('display', 'none');
    });
    
    // creates sticky nav menu

    $(document).ready(function(){
        window.onscroll = () => {
            stickyBar();
        };
    });
    

    var navbar = document.querySelector(".header__main");
    var sticky = navbar.offsetTop;
    function stickyBar() {
        if (window.pageYOffset >= sticky && window.innerWidth > 800) {
            sticky = 70;
            navbar.classList.add("sticky")
            $('.header-icon-container').css('margin-top', '0');
            $('.mobileMenu-container').css('height', '70px');
        } else {
            navbar.classList.remove("sticky");
            if ($(window).width() > 800) {
                $('.mobileMenu-container').css('height', '110px');
            }
        }
    }

    if( $(window).width() > 800 ) {
        $('.navPages-list').hover(
            function() {
                $('.new-nav-dark').css('display', 'block');
            },
            function() {
                $('.new-nav-dark').css('display', 'none');
            }
        );
    }
    
    // rotates nag bar text
    // var langData = json.nag_bar;
    // var langArr = [];

    // $(window).load(function() {    
    //     langArr.push(Object.values(langData));
    // });
    
    // setInterval(function() {
    //     $('.custom-nag-bar').html(langArr[0][0]);
    //     langArr[0].push(langArr[0].shift());
    // }, 5000);

    $(".rotate").textrotator({
        animation: "spin", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 5000 // How many milliseconds until the next word show.
      });

    $(window).load(() => {
        $('.rotate').addClass('is-loaded');
    })

}

if($('.countPill.cart-quantity').text() <= 1) {
    $('.cart__header-container').addClass('change-height');
} else {
    $('.cart__header-container').removeClass('change-height');
}
 
$('.cart-button').ajaxStop(function () {
    for (var i = 0; i < $('.cart__header-qty').length; i++) { 
        if ($('.cart__header-qty')[i].innerText > 1) {
            $('.each-span').eq(i).css('visibility', 'visible');
        }
    }
});

if ($('.page--blog_post').length) {
    $('.blog-post p').css('max-width', '72.66667rem');
}

if ($('.logged-in').length) {
    $('.custom-dropdown .dropdown-menu-item').eq(0).text('View Account');
    $('.custom-dropdown .dropdown-menu-link').eq(0).attr('href', '/account.php');
    $('.custom-dropdown .dropdown-menu-item').eq(1).text('Wish List');
    $('.custom-dropdown .dropdown-menu-link').eq(1).attr('href', '/wishlist.php');
    $('.custom-dropdown .dropdown-menu-item').eq(2).text('Sign Out');
    $('.custom-dropdown .dropdown-menu-link').eq(2).attr('href', '/login.php?action=logout');
}

$('.cart-dropdown-container').click((e) => {
    e.stopPropagation();
});

if ($('.page--createaccount').length) {
    $('#FormField_6 .form-label').append('<span>Company Name:</span>');
    $('#FormField_9 .form-label').append('<span>Address Line 2:</span>');
}
if ($('.page--shippingaddressform').length) {
    $('#FormField_6 .form-label').append('<span>Company Name:</span>');
    $('#FormField_9 .form-label').append('<span>Address Line 2:</span>');
}

if ($(window).width() < 425) {
    $('.navPage-childList .navPage-childList-item .navPages-subMenu-child').css('line-height', '20px');
    $('.navPage-childList .navPage-childList-item').css('margin-top', '10px');
    $('.navPage-childList .navPage-childList-item').css('margin-bottom', '10px');
}

