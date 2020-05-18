
   wow = new WOW(
     {
       animateClass: 'animated',
       offset:       100
     }
   );
   wow.init();


// script to get utm
var getUrlParameter = function getUrlParameter(sParam)
{
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++)
  {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam)
    {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};


function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}


function clearF1Cookie() {
	setCookie("name","",-1);
	setCookie("email","",-1);
	setCookie("last1","",-1);
}
$(window).load(function() {
	$("input.name").val(getCookie("name"));
	$("input.email").val(getCookie("email"));
	$("input.phone").val(getCookie("phone"));
});

$('.btn-anchor').on('click', function(e) {
	e.preventDefault();
	anchorScroller(this, 1500);
});

$('.slider').slick({
	arrows: true
})

   $('.slider-map').slick({
	   arrows: true,
	   asNavFor: '.map'
   })
   $('.map').slick({
	   arrows: false,
   })


$('.question').on('click', function(){
	$(this).toggleClass('active');
	$(this).find('.answer-text').slideToggle();
});

$(document).ready(function(){
	var w_width = $(document).width();

	if(w_width > 1170) {
		$('.founder-content').hover( function(){
			$(this).toggleClass('active');
		})
	}
	else {
		$('.sec3 .container-block .item').removeClass('wow');
		$('.founder-content').on('click', function(){
			$(this).toggleClass('active');
		})
	}
});

