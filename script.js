var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text="; // wysyłanie tweetów
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"; // pobieranie cytatów

// pobieranie cytatu
function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
    $.ajaxSetup({ cache: false });
}

// tworzymy tweeta
function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = 'Unknown author';
    }

    var tweetText = 'Quote of the day - ' + quoteText + ' Author: ' + quoteAuthor;
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote').text(quoteText);
        $('.author').text('Author: ' + quoteAuthor);
        $('.tweet').attr('href', tweet);
    }
}

$(document).ready(function () {
    getQuote();
    $('.trigger').click(function(){
        $('.quote').text('Quote Loading...');
        $('.author').text('');
        getQuote();
    });
});