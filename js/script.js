
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street+","+city;
    console.log(street, city);
    //get Google street view pic:
    var imageUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+address;
    console.log(imageUrl);
    $body.append('<img class="bgimg" src="'+imageUrl+'">');

    // get nyt article:
    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "a4e5b4d8992e41d5b0078ed631f0521d",
      'q': address,
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
    });

    return false;
};

$('#form-container').submit(loadData);
