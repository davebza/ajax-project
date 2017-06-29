
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
    var address = street+", "+city;
    //get Google street view pic:
    var imageUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+address;
    $body.append('<img class="bgimg" src="'+imageUrl+'">');

    // Wiki Api request goes here:
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback";
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        // jsonp: this can be updated if needed
        success: function(response){
            var articleList = response[1];

            for(var i = 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/"+articleStr;
                $wikiElem.append('<li><a href="'+url+'" target="_blank">'+articleStr+'</a></li>');
            };
        }

    });

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
      var articles = result.response.docs;
      $nytHeaderElem.text('New York Times articles about '+address);
      for (var i = 0; i < articles.length; i++){
          var article = articles[i];
          $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'" target="_blank">'+article.headline.main+'</a><p>'+article.snippet+'</p>'+'</li>');
      }
  }).error(function(e) {
      $nytHeaderElem.text('New York Times Articles could not be found for this location.');
    });
    return false;
};




$('#form-container').submit(loadData);
