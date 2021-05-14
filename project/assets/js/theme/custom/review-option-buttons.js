import $ from 'jquery';

export default function () {
    var radioState = "";

    $('.review-btn').on('click', function () {
        if (radioState === this) {
            this.checked = false;
            radioState = "";
            $('.empty-btn').checked = true;
        } else {
            radioState = this;
        }
    });

    const reviewArray = $('input.review-btn').toArray().map(btn => btn.name).filter((item, pos, self) => {
        return self.indexOf(item) == pos;
    }).reverse();

    $('.review-submit').click(function () {
        if ($('.nod-success-message').length === 5) {
            $.each(reviewArray, function (index, value) {
                $('#revtext_input').val(`<span class="review-option-render-${index}">` +
                    $(`.review-btn[name="${value}"]:checked`).val() + '</span>' + $('#revtext_input').val());
            });
        } else {
            console.log('Missing form.');
            setTimeout(() => {
                var x = document.querySelectorAll('.form-inlineMessage');
                x[0].scrollIntoView();           
            }, 1000);
        } 
    });

}
