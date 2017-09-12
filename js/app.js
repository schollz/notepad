var saved = true;

$(document).ready(function(){
  $('#note').keydown(function(){
    if (saved == true) {
      console.log('unsaved!')
      $("#note").removeClass('saved');      
      $("#note").addClass('unsaved');      
      saved = false;
    }
  });
  $('#note').keyup(debounce(function(){
    localStorage.setItem("note", $(this).val());
    console.log('saved!');
    $("#note").removeClass('unsaved');      
    $("#note").addClass('saved');      
    saved = true;
  },500));

  if(localStorage.getItem("note") && localStorage.getItem("note")!=''){
    var noteItem = localStorage.getItem("note")
    $('#note').val(noteItem);
  }
  $("#note").addClass('unsaved'); 
});

setInterval(function() {
      $("#flash").addClass('hidden');
  }, 5000);

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Registering ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
