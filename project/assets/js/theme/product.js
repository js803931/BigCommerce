/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
// custom
import customProduct from './custom/product';
import ReviewOptionButtons from './custom/review-option-buttons';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();

        /*
         * IntuitSolutions.net - product page custom scripts
         */
        customProduct();
        ReviewOptionButtons();
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    openProductDescription() {

        if ( $(window).width() > 801) {
            $('.prod-view-description-a').attr('aria-expanded', 'true');
            $('.prod-view-description-a').addClass('is-open');
            $('.prod-view-description-ul').attr('aria-hidden', 'false');
            $('.prod-view-description-ul').addClass('is-open');
            $('.prod-view-description-ul').css('display', 'block');
        } 
        else {
            $('.prod-view-description-a').attr('aria-expanded', 'false');
            $('.prod-view-description-a').removeClass('is-open');
            $('.prod-view-description-ul').attr('aria-hidden', 'true');
            $('.prod-view-description-ul').removeClass('is-open'); 
        }
    }
}

// Customizes size chart
    if ($('.size-guide').text() === "") {
        $('.size-guide-image').attr("data-src", "/content/images/default-size-guide.png");
    } else {
        $('.size-guide-image').attr("data-src", `/content/images/${$('.productView-info-value.size-guide').text()}`);
    }
