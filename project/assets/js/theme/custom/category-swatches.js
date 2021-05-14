import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import LZString from 'lz-string';

const VERSION = '1.0.1';

export default class CategorySwatches {
    constructor() {
        console.log('IntuitSolutions.net - Category Swatches', VERSION);

        this.class__pageHasSwatches = 'page--hasSwatches'; // for styling down from <body>
        this.class__hasOptions = 'hasOptions';
        this.class__optionsLoaded = 'optionsLoaded';
        this.class__activeSwatch = 'active';

        this.scrapeDebounceMultiple = 8; // check missed products after every X product images have loaded

        this.$scope = $('#product-listing-container');
        this.$productImages = $('.card-image', this.$scope); // grab the category card product images

        // listen for when product card images are loaded
        this.$productImages.on('lazyloaded', (event) => {
            this.productImageLoaded(event);
        });

        // add class for styling if there's at least one product that will load options
        if ($(`.card.${this.class__hasOptions}`, this.$scope).length) {
            $('body').addClass(this.class__pageHasSwatches); // this just helps equalize heights of cards
        }

        // check missed images incase JS loaded after images loaded on the page
        setTimeout(() => {
            this.scrapeForMissedProducts(true);
        }, 1500);



    }

    /**
     * when a product image loads, see if we need to act
     */
    productImageLoaded(event) {
        const $thisProduct = $(event.target).parents('.card');
        if ($thisProduct.hasClass(`.${this.class__hasOptions}`) && !$thisProduct.hasClass(this.class__optionsLoaded)) {  // if has options AND options NOT loaded
            this.applyProductSwatches($thisProduct);
        }

        this.scrapeForMissedProducts(false); // if all product images have loaded, check to see if any were missed
    }

    /**
     * Apply product swatches to the passed product card
     * --- when a product has options that haven't been loaded, get their options either from localStorage or AJAX'ing
     */
    applyProductSwatches($product) {
        $product.addClass(this.class__optionsLoaded); // add class so we only hit each product once
        const productId = $product.data('id');
        // if browser supports localStorage AND we aren't storing this product's options
        
        this.ajaxProductSwatches($product);

    }

    /**
     * AJAX product's options
     */
    ajaxProductSwatches($product) {
        const productId = $product.data('id');

        utils.api.product.getById(productId, { template: 'custom/category-swatches' }, (err, response) => {
 console.log("response ", response);
            if (err) {
                return $product.removeClass(this.class__optionsLoaded);
            }

            $('.card-options', $product).append(response); // append markup to product card
            this.applySwatchHandlers($product); // apply handlers

            $(".show-card-options").click(function (e) {
                let parent = $(e.currentTarget).parent();
                $(parent).addClass('more-card-options');
                $(parent).parent().parent().addClass('more-card-options');
                $('.more-card-options .show-card-options').css('display', 'none');
            });
        });
    }

    /**
     * Apply handlers to a product's loaded swatches
     */
    applySwatchHandlers($product) {
        const mainProductImage = $('.card-image', $product);

        $('.card-option__option', $product).on('click', (event) => {
            const $thisOption = $(event.target);
            $thisOption.siblings().removeClass(this.class__activeSwatch);
            $thisOption.addClass(this.class__activeSwatch);

            const productId = $thisOption.parents('.hasOptions').attr('data-id');
            const optName = $thisOption.attr('data-option-name');
            const optValue = $thisOption.attr('data-option-value');
    
            const image = $thisOption.attr('data-option-image') || '';
    
            if (image.length) {
                mainProductImage.attr('src', image);
            } else {
                $.get(`/remote.php?w=getProductAttributeDetails&product_id=${productId}&${optName}=${optValue}`, res => {
                    if (res.details.image) {
                        mainProductImage.attr('src', res.details.image);
                        $thisOption.attr('data-option-image', res.details.image);
                    }
                });
            }
        });
    }

    /**
     * find products that may have been missed on page load, then load their swatches if needed
     * @param {boolean} skipDebounce - skip the check on how many images have been loaded, go right to looking for missed products
     */
    scrapeForMissedProducts(skipDebounce) {
        if (
            skipDebounce ||
            (this.$productImages.filter('.lazyloaded').length % this.scrapeDebounceMultiple === 0) ||
            (this.$productImages.filter('.lazyloaded').length === this.$productImages.length)
        ) {
            const missedProducts = this.getMissedProducts();

            missedProducts.forEach((product) => { // have to test if this will work when have to AJAX multiple missed items.
                this.applyProductSwatches($(product)); // need to make each item a jQuery element
            });
        }
    }

    /**
     * return array of products that
     * --- have options
     * --- do not have their options loaded
     * --- have their card-image loaded (ie. missed by lazyloaded trigger)
     */
    getMissedProducts() {
        return $(`.card.${this.class__hasOptions}`, this.$scope)
            .not(`.${this.class__optionsLoaded}`)
            .filter((index, el) => $('.card-image', el).hasClass('lazyloaded'))
            .toArray();
    }
}

