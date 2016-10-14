// encode emails
function convertMailAddress() {
	var emailElements;
  		if (document.getElementsByClassName)
    		emailElements = document.getElementsByClassName("email");
  		else
    		emailElements = document.getElementsByClassNameForOldies("email");
  			var elementContent, replaceContent;

  			for (var i=0; i<emailElements.length; i++) {
    			elementContent = emailElements[i].innerHTML;
    			replaceContent = elementContent.replace(" [at] ", "&#64;");
    			emailElements[i].innerHTML =
      			"<a href=\"mailto:" + replaceContent + "\">" + replaceContent + "</a>";
  			}
}

// http://javascript.about.com/library/bldom08.htm
document.getElementsByClassNameForOldies = function(cl) {
  	var retnode = [];
  	var myclass = new RegExp('\\b'+cl+'\\b');
  	var elem = this.getElementsByTagName('*');

  	for (var i = 0; i < elem.length; i++) {
    	var classes = elem[i].className;
    	if (myclass.test(classes)) retnode.push(elem[i]);
  	}
  	return retnode;
};

window.onload = convertMailAddress;

(function($) {

	$(function(){
	    $(document).foundation();

	    // Orbit
	    var testimonial = new Foundation.Orbit($('#testimonial'), {
	    	containerClass: 'testimonial-container',
	    	slideClass: 'item',
	    	prevClass: 'item-previous',
	    	nextClass: 'item-next'
	    });

	    function stickyHeader() {
		    $(window).scroll(function() {
		    	var $header = $('.header-container');
		        if ($(this).scrollTop() >= 200) {
		            $header.addClass('smaller');
		        }
		        else {
		            $header.removeClass('smaller');
		        }
		    });

	    }
	    stickyHeader();


	    // midnight header
	    function headerAndContolls() {
	    	var $headerNav = $('.header-container');
	    	var $verticalNav =  $('.vertical-nav');
	    	$headerNav.midnight();
	    	$verticalNav.midnight();
	    }
	    headerAndContolls();

	    // hambuger
	    function hamburgerNav() {
	    	var $hb = $('.hamburger');
	    	$hb.on('click', function(e){
	    		e.preventDefault();
	    		$(this).toggleClass('is-active');
	    	})
	    }
	    hamburgerNav();

	    function smoothScroll(target) {
	        $('body,html').animate(
	        	{'scrollTop':target.offset().top},
	        	600
	        );
		}

	    // smooth anchors
	    function smoothAnchor() {
	    	$('a').on('click', function(event) {
			    if (this.hash !== "") {
			    	// Prevent default anchor click behavior
			      	event.preventDefault();

			      	// Store hash
			      	var hash = this.hash;

			      	$('html, body').animate({
			        	scrollTop: $(hash).offset().top
			      	}, 600, function(){
			   
				        // Add hash (#) to URL when done scrolling (default click behavior)
				        window.location.hash = hash;
			      	});
			    } 
			});
	    }
	    smoothAnchor();

	    // Vertical Nav
	    function verticalNav() {
	    	var contentSections = $('.cd-section'),
			navigationItems = $('#cd-vertical-nav a');

			updateNavigation();
			$(window).on('scroll', function(){
				updateNavigation();
			});

			//smooth scroll to the section
			navigationItems.on('click', function(event){
		        event.preventDefault();
		        smoothScroll($(this.hash));
		    });
		    //smooth scroll to second section
		    $('.cd-scroll-down').on('click', function(event){
		        event.preventDefault();
		        smoothScroll($(this.hash));
		    });

		    //open-close navigation on touch devices
		    $('.touch .cd-nav-trigger').on('click', function(){
		    	$('.touch #cd-vertical-nav').toggleClass('open');
		  
		    });
		    //close navigation on touch devices when selectin an elemnt from the list
		    $('.touch #cd-vertical-nav a').on('click', function(){
		    	$('.touch #cd-vertical-nav').removeClass('open');
		    });

			function updateNavigation() {
				contentSections.each(function(){
					var $this = $(this);
					var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
					if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
						navigationItems.eq(activeSection).addClass('is-selected');
					}else {
						navigationItems.eq(activeSection).removeClass('is-selected');
					}
				});
			}
	    }
	    
	    // Open-Close Primary Navigation
		$('.hamburger').on('click', function(){
			
			//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			if( $('.cd-primary-nav').hasClass('is-visible') ) {
				$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
					$('body').removeClass('overflow-hidden nav-open');
				});
			} else {
				$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
					$('body').addClass('overflow-hidden nav-open');
				});	
			}
		});


		function scrollMagik() {
			// Init ScrollMagic
		    var controller = new ScrollMagic.Controller();

		    // loop scenes
		    $('.cd-section .entry').each(function(){
		    	var fadeScene = new ScrollMagic.Scene({
			    	triggerElement: this,
			    	duration: '100%'
			    })
			    .setClassToggle(this, 'enter')
			    .addTo(controller);
		    });

		    // parallax
		    $('.dk').each(function(){
		    	var backgroundSlide = new ScrollMagic.Scene({
			    	triggerElement: this,
			    	triggerHook: 1,
			    	duration: '200%'
			    })
			    .setTween(TweenMax.from('.bcg', 1, {y: '-30%', ease:Power0.easeNone}))
			    .addTo(controller);
		    });
		}
		scrollMagik();
		

	    // Form Labels
		function floatLabels() {
			var inputFields = $('.floating-labels .cd-label').next();
			inputFields.each(function(){
				var singleInput = $(this);
				//check if user is filling one of the form fields 
				checkVal(singleInput);
				singleInput.on('change keyup', function(){
					checkVal(singleInput);	
				});
			});
		}

		function checkVal(inputField) {
			( inputField.val() == '' ) ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
		}
		

		if ($('#home-page').length) {
			verticalNav();
		} else if($('#contact-page')) {
			if( $('.floating-labels').length > 0 ) floatLabels();
		}
	    

	    
	});

	
})(jQuery);
