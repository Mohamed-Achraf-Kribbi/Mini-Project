// <---- Loading Screen -->
window.addEventListener('load', function() {
  var loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(function() {
      loadingScreen.style.opacity = '0';
      setTimeout(function() {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 800);
  }
});
// <---- Star Rating System -->
document.addEventListener('DOMContentLoaded', function() {
  var ratingContainer = document.querySelector('.star-rating');
  var feedbackText = document.querySelector('.rating-feedback');
  
  if (!ratingContainer || !feedbackText) {
    return;
  }
  
  var allStars = ratingContainer.querySelectorAll('[data-value]');
  
  var selectedRating = 5;
  
  function updateFeedbackText(rating) {
    var message = 'You rated ' + rating + ' star';
    if (rating !== 1) {
      message = message + 's';
    }
    message = message + '.';
    feedbackText.textContent = message;
  }
  
  function updateStarDisplay(rating, isPreview) {
    for (var i = 0; i < allStars.length; i++) {
      var star = allStars[i];
      var starValue = Number(star.getAttribute('data-value'));
      
      var shouldHighlight = starValue <= rating;
      
      if (isPreview && shouldHighlight) {
        star.classList.add('hover');
        star.classList.remove('active');
      } 
      else if (!isPreview && shouldHighlight) {
        star.classList.add('active');
        star.classList.remove('hover');
      } 
      else {
        star.classList.remove('active');
        star.classList.remove('hover');
      }
      
      if (starValue === selectedRating) {
        star.setAttribute('aria-checked', 'true');
      } else {
        star.setAttribute('aria-checked', 'false');
      }
    }
    
    if (!isPreview) {
      updateFeedbackText(rating);
      ratingContainer.setAttribute('aria-label', 'Rating: ' + rating + ' out of 5 stars');
    }
  }
  
  for (var i = 0; i < allStars.length; i++) {
    var star = allStars[i];
    var starValue = Number(star.getAttribute('data-value'));
    
    star.addEventListener('mouseenter', function(value) {
      return function() {
        updateStarDisplay(value, true);
      };
    }(starValue));
    
    star.addEventListener('click', function(value) {
      return function() {
        selectedRating = value;
        updateStarDisplay(value, false);
      };
    }(starValue));
    
    star.addEventListener('keydown', function(value) {
      return function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectedRating = value;
          updateStarDisplay(value, false);
        }
      };
    }(starValue));
    
    star.addEventListener('focus', function(value) {
      return function() {
        updateStarDisplay(value, true);
      };
    }(starValue));
  }
  
  ratingContainer.addEventListener('mouseleave', function() {
    updateStarDisplay(selectedRating, false);
  });
  
  ratingContainer.addEventListener('blur', function() {
    updateStarDisplay(selectedRating, false);
  }, true);
  
  updateStarDisplay(selectedRating, false);
});
// <---- Quote Carousel -->
document.addEventListener('DOMContentLoaded', function() {
  var allQuotes = document.querySelectorAll('.quote');
  
  if (allQuotes.length === 0) {
    return;
  }
  
  var currentQuoteIndex = 0;
  
  function showQuote(index) {
    for (var i = 0; i < allQuotes.length; i++) {
      allQuotes[i].classList.remove('active');
    }
    
    if (allQuotes[index]) {
      allQuotes[index].classList.add('active');
    }
  }
  
  function nextQuote() {
    currentQuoteIndex = currentQuoteIndex + 1;
    
    if (currentQuoteIndex >= allQuotes.length) {
      currentQuoteIndex = 0;
    }
    
    showQuote(currentQuoteIndex);
  }
  
  setInterval(nextQuote, 5000);
  
  showQuote(0);
});
