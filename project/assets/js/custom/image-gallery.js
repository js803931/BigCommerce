import $ from 'jquery';
// import 'easyzoom';
import _ from 'lodash';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default class ImageGallery {
    constructor($gallery) {
        this.$mainImage = $gallery.find('[data-image-gallery-main]');
        this.$selectableImages = $gallery.find('[data-image-gallery-item]');
        this.currentImage = {};

        // PhotoSwipe stuff

        if (this.$selectableImages.length === 0) { // If no thumbnails pull the image info from the main gallery image

            const imageCount = this.$mainImage.length;
            const theImage = new Image();

            this.photoswipeItems = Array(imageCount).fill(null);
            theImage.src = this.$mainImage.attr('data-zoom-image');

                theImage.onload = (event) => {
                    const newImage = {
                        src: event.target.src,
                        w: event.target.width,
                        h: event.target.height
                    };

                    this.photoswipeItems.splice(0, 1, newImage);
                };

        } else { // Use the thumbnails

            const imageCount = this.$selectableImages.length;
            this.photoswipeItems = Array(imageCount).fill(null);

            this.$selectableImages.each((index, el) => {
                const theImage = new Image();
                theImage.src = $(el).attr('data-image-gallery-zoom-image-url');
                theImage.onload = (event) => {
                    const newImage = {
                        src: event.target.src,
                        w: event.target.width,
                        h: event.target.height
                    };
                    this.photoswipeItems.splice(index, 1, newImage);
                };
            });
        }

    }

    init() {
        this.bindEvents();
        // this.setImageZoom();
    }

    setMainImage(imgObj) {
        this.currentImage = _.clone(imgObj);

        this.setActiveThumb();
        this.swapMainImage();
    }

    setAlternateImage(imgObj) {
        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImage.find('img').attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }
        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    selectNewImage(e) {
        e.preventDefault();

        const $target = $(e.currentTarget);
        const imgObj = {
            mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
            zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
            $selectedThumb: $target,
        };

        this.setMainImage(imgObj);
    }

    setActiveThumb() {
        this.$selectableImages.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
    }

    swapMainImage() {
        // this.easyzoom.data('easyZoom').swap(this.currentImage.mainImageUrl, this.currentImage.zoomImageUrl);
        this.$mainImage.find('img').attr('src', this.currentImage.mainImageUrl);
        if (this.currentImage.$selectedThumb) {
            this.$mainImage.find('a').attr('data-index', this.currentImage.$selectedThumb.data('index'));
        } else {
            this.$mainImage.find('a').attr('data-index', '0');
        }

        // this.$mainImage.attr({
        //     'data-zoom-image': this.currentImage.zoomImageUrl,
        // });
    }

    // setImageZoom() {
    //     this.easyzoom = this.$mainImage.easyZoom({ errorNotice: '', loadingNotice: '' });
    // }

    // custom image gallery
    openPhotoSwipe(imageIndex) {
        const pswpElement = document.querySelectorAll('.pswp')[0];
        const options = {
            index: Number(imageIndex),
            bgOpacity: 0.9
        };
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, this.photoswipeItems, options);
        gallery.init();
    };

    handleClickImage(e) {
        e.preventDefault();
        const imageIndex = $(e.currentTarget).attr('data-index');
        this.openPhotoSwipe(imageIndex);
    }

    bindEvents() {
        this.$selectableImages.on('mouseenter', this.selectNewImage.bind(this)); // change main image on thumbnail hover
        this.$selectableImages.on('click', this.handleClickImage.bind(this)); // open photoswipe on thumbnail click
        this.$mainImage.find('a').on('click', this.handleClickImage.bind(this)); // open photoswipe on main image click

        // unqiue for STG
        $('.productView-seeMorePictures').on('click', () => {
            this.openPhotoSwipe(0);
        });
    }
}
