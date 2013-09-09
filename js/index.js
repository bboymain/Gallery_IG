// Get Instagram Info
var user = {
 'access_token':'406839337.674061d.4ccee6c461c348028e9c775e1b173226',
 'user': {
    'username':'',
    'bio':'',
    'website':'',
    'profile_picture':'',
    'full_name':'',
    'id':'406839337'
  }
};

var account = user;
var count = -1;
var photos = [];

var animationDelay = 5000;
var action = 'fadeInUp';

// action options: flash, bounce, shake, tada, swing, wobble, wiggle, pulse 
// fade actions: fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeInUpBig, fadeInDownBig, fadeInLeftBig, fadeInRightBig
// bouncing actions: bounceIn, bounceInDown, bounceInUp, bounceInLeft, bounceInRight
// rotating actions: rotateIn, rotateInDownLeft, rotateInDownRight, rotateInUpLeft, rotateInUpRight


var getNextPhoto = function() {
  // set interval counter
  var photoCount = 0;
  // determine total number of Instagram photos
  var arrayLength = photos.length;

    // start timer
    var interval = setInterval(function() {
    
      // get random number
      var random = Math.round(Math.random()*15);
      // select random div
      var target = $('.animate').eq(random);

      // determine if there are photos that haven't been shown
      if ( arrayLength > photoCount ) {

        // get random div and hide it
        $(target).fadeOut(function() {
          // change photo in to the next one in line
          $(this).find('img').attr('src', photos[photoCount]);
          // show the photo
          $(target).fadeIn();
        });

        // add one to interval counter
        photoCount++;

      } else {

        // there aren't any more photos in array, stop interval
        clearInterval(interval);

      }

    }, animationDelay);

}

var zoom = function() {

  $('.animate').on('click', function() {
    var picture = $('img', this).attr('src');
    $('<div class="big hide"><img src="' + picture + '"></div>').appendTo('body').fadeIn('fast');

    $('.big').on('click', function() {
      $(this).fadeOut(function() {
        $(this).remove();
      });
    });

  });
  
}


// get Instagram photos
$.getJSON('https://api.instagram.com/v1/users/' + account.user.id+ '/media/recent?access_token=' + account.access_token + '&count=' + count + '&callback=?',
  function(data) {

    $.each(data.data, function(i, image) {

      // if photo is one of the first 10...
      if ( i < 15 ) {
        // wrap it in a div and add it to .instagram
        $('<div class="animate animated '+ action +'"><img src="'+ image.images.standard_resolution.url +'" /></div>').appendTo('.instagram').delay(200).css('visibility', 'visible');
      } else {
        // if not, add it to the photo array
        photos.push(image.images.standard_resolution.url);
      }

    });

  getNextPhoto();
  zoom();

});