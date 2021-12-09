jQuery(document).ready(function($) {

	//CREDITS
	console.log("%cDesign & Development by https://benrosati.com", "color: #4fb06f; font-style: italic");	
	
	//Cursor
	const options = {
		color: 'rgb(180, 180, 180)',
		focusableElementsOffsetX: 10,
		focusableElementsOffsetY: 10,
		invert: true
	};
	const blobity = new Blobity(options);

	//Init animation
	var init = gsap.timeline({delay: 0.5});
	init.to('.preload', {opacity: 0}, {duration: 0.2, opacity: 1, display: "none"});
	init.fromTo('.bar', {width: "0"}, {duration: 0.6, width: "100%"});
	init.fromTo('.section--intro', {opacity: 0}, {duration: 1, opacity: 1}, ">-0.4");
	init.fromTo('.example', {opacity: 0, scale: 0.9}, {duration: 1, stagger: 0.2, opacity: 1, scale: 1}, ">-0.4");
	init.fromTo('footer', {opacity: 0}, {duration: 1, opacity: 1}, ">-0.4");
	init.fromTo('.legal', {opacity: 0}, {duration: 1, opacity: 1}, ">-0.4");

	setTimeout(function(){
		$('.preload').hide();
	}, 1000); 

	//Overlay
	var tl = gsap.timeline({paused: true});
	tl.to('.overlay-background', .5, {y: 0});
	tl.to('.overlay-body', .4, {y: "60px"});
	tl.to('.overlay .container', .4, {opacity: 1}, ">-0.4");
	tl.to('.overlay-scroll', {duration: 0.4, scrollTo: {y:0, x:0}}, ">-0.4");

	$('.example').on('click', function(){
		$('.overlay').show();
		$(".overlay .container").html( $(".portfolio-item[data-item='"+ $(this).attr("data-item") +"']").html() );
		tl.play();
		history.pushState({page : $(this).attr("data-item")}, null, "/" + $(this).attr("data-item"));
	});

	//Close Overlay
	function close(){
		tl.reverse();
		setTimeout(function(){
			$('.overlay').hide();
		}, 1000);
		history.pushState({page : "home"}, null, "/");
	}

	$('.x').on('click', function(){
		close();
	});

	$(document).keyup(function(e) {
		if (e.key === "Escape") {
		   close();
	   }
   });

   //Change Project via Overlay
   content = "";

   function resetCursor(){
		blobity.reset();
   }

   function swap(){
		console.log( "content = " + content );
		$(".overlay .container").html( $(".portfolio-item[data-item='"+ content +"']").html() );
		gsap.to('.overlay .container', {duration: 0.4, opacity: 1, delay: 0.4, onComplete: resetCursor});
   }

   $(document).on('click', ".sample", function(){
		content = $(this).attr("data-item");
		gsap.to('.overlay-scroll', {duration: 0.4, scrollTo: {y:0, x:0}});
		gsap.to('.overlay .container', {duration: 0.4, opacity: 0, onComplete: swap});
		//history.pushState({page : $(this).attr("data-item")}, null, "/" + $(this).attr("data-item"));
	});

	//Portrait
	$(".avatar").hover(function(){
		gsap.to(".flip", {opacity: 1})
	}, function(){
		gsap.to(".flip", {opacity: 0})
	});

	//Popstate
	if (location.pathname == "/") {
		history.pushState({page : "home"}, null, "/");
	} else {
		history.pushState({page : location.pathname}, null, "/" + location.pathname);	
	}
	
	window.onpopstate = function(event) {
		if (event.state) {
			console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
			switch (event.state.page) {
				case 'home':
					tl.reverse();
					setTimeout(function(){
						$('.overlay').hide();
					}, 1000);
					break;
				default:
					$('.overlay').show();
					$(".overlay .container").html( $(".portfolio-item[data-item='"+ event.state.page +"']").html() );
					tl.play();
			}
		}
	}


});