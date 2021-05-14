import $ from 'jquery';
import Papa from 'papaparse';

export default function () {
    const defaultImage = "/content/random_category_image/default.png";
    const defaultURL = "##";

    Papa.parse(`/content/random_category_image/default.csv`, {
        download: true,
        header: true,
        complete: (results) => {
            const urlLocation = window.location.pathname;
            let categoryArr = results.data.filter(result => result.category_url === urlLocation);
            let randomIndex = Math.floor(Math.random() * categoryArr.length);
            let randomPromo = categoryArr[randomIndex];

            if (categoryArr.length === 0) {
                $('.random-cat-pic').attr("src", defaultImage);
                $('.random-cat-link').attr("href", defaultURL);
                $('.random-cat-link').css('cursor', 'initial');
            } else {
                $('.random-cat-pic').attr("src", `/content/random_category_image/${randomPromo.image}`);
                $('.random-cat-link').attr("href", `${randomPromo.url}`);
            }
        }
    });
};
