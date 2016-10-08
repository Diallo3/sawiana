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


	    // midnight header
	    $('.header-container').midnight();
	    $('.vertical-nav').midnight();

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
	    	$('a[href^="#"').on('click', function(e){
	    		e.preventDefault();

	    		var target = this.hash;
	    		var $target = $(target);
	    		smoothScroll($target);
	    		
	    	})
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
					$this = $(this);
					var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
					if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
						navigationItems.eq(activeSection).addClass('is-selected');
					}else {
						navigationItems.eq(activeSection).removeClass('is-selected');
					}
				});
			}

			

	    }
	    verticalNav();

	    //open/close primary navigation
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

	    // Init ScrollMagic
	    var controller = new ScrollMagic.Controller();

	    // loop scenes
	    $('.cd-section .entry').each(function(){
	    	var fadeScene = new ScrollMagic.Scene({
		    	triggerElement: this,
		    	// duration: '95%'
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
	    })
	    

	    
	});

	
})(jQuery);


// //common.init
// 	if($("#gallery").length)
// 	{
// 		//gallery page
// 	}
// 	else if($("#contacts").length)
// 	{
// 		//contacts page
// 	}
	
// 	if($(".classname").length)
// 	{
// 		// do all the *needed* classes too.
// 	}
// 	//common.finalize