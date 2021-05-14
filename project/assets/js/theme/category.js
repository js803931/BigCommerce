import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';
// custom
import customCategory from './custom/category';
import customCategoryUpdate from './custom/categoryUpdate';
import CategorySwatches from './custom/category-swatches';
import RandomPromoImage from './custom/random-image-promo';

export default class Category extends CatalogPage {
   onReady() {
       if ($('#facetedSearch').length > 0) {
           this.initFacetedSearch();
       } else {
           this.onSortBySubmit = this.onSortBySubmit.bind(this);
           hooks.on('sortBy-submitted', this.onSortBySubmit);
       }
       const categorySwatches = new CategorySwatches();

       /*
        * IntuitSolutions.net - category custom scripts
        */
       customCategory();
       RandomPromoImage();
       window.onscroll = function() {
        scrollFunction();
        stickyBar();
       }
   }

   initFacetedSearch() {
       const $productListingContainer = $('#product-listing-container');
       const $facetedSearchContainer = $('#faceted-search-container');
       const productsPerPage = this.context.categoryProductsPerPage;
       const requestOptions = {
           config: {
               category: {
                   shop_by_price: true,
                   products: {
                       limit: productsPerPage,
                   },
               },
           },
           template: {
               productListing: 'category/product-listing',
               sidebar: 'category/sidebar',
           },
           showMore: 'category/show-more',
       };

       this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
           $productListingContainer.html(content.productListing);
           $facetedSearchContainer.html(content.sidebar);

           $('html, body').animate({
               scrollTop: 0,
           }, 100);

           /*
            * IntuitSolutions.net - category update custom scripts
            */
           customCategoryUpdate();
   
        });
   }
}

// Close filter menu

$(".filter-subMenu__close").on( "click", function() {
    $('.facetedSearch-toggle.toggleLink').attr('aria-expanded', 'false');
    $('.facetedSearch-toggle.toggleLink').removeClass('is-open');
    $('.filter-subMenu').removeClass('is-open');
    $('.filter-dark').css('display', 'none');
  });

$('.filter-subMenu__done-btn').on('click', function () {
    $('.filter-subMenu__close').click();
});

// Display only first 3 sub-category cards

const subcats = document.querySelectorAll('.subcat');

if (subcats[2]) {
    subcats[2].style.display = 'block';
    subcats[1].style.display = 'block';
    subcats[0].style.display = 'block';
} else if (subcats[1]) {
    subcats[1].style.display = 'block';
    subcats[0].style.display = 'block';
} else if (subcats[0]) {
    subcats[0].style.display = 'block';
} else {
    console.log('No subcategories');
}

$('.productGrid .product .card-figure').hover(
	function() {
		var image = $(this).find('.card-image');
		var altImageSrc = image.data('alt-image');
		if (altImageSrc.length) {
			altImageSrc = altImageSrc.replace('{:size}', '500x500');
			image.attr('src', altImageSrc);
		}
	}, function() {
		var image = $(this).find('.card-image');
		var altImageSrc = image.data('alt-image');
		if (altImageSrc.length) {
			image.attr('src', image.data('src'));
		}
	}
);

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
        navbar.classList.add("sticky")
        $('.header-icon-container').css('margin-top', '0');
        $('.mobileMenu-container').css('height', '70px');
    } else {
        navbar.classList.remove("sticky");
        if( $(window).width() > 800 ) {
            $('.mobileMenu-container').css('height', '110px');
        }
    }
}
