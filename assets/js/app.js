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
		var ref = $(this).attr("data-item");
		$(".overlay .container").html( $(".portfolio-item[data-item='"+ref+"']").html() );
		tl.play();
	});

	//Close Overlay
	function close(){
		tl.reverse();
		setTimeout(function(){
			$('.overlay').hide();
		}, 1000); 
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
   $(document).on('click', ".sample", function(){
		var ref = $(this).attr("data-item");
		gsap.to('.overlay-scroll', {duration: 0.4, scrollTo: {y:0, x:0}});
		gsap.to('.overlay .container', {duration: 0.4, opacity: 0});
		setTimeout(function(){
			$(".overlay .container").html( $(".portfolio-item[data-item='"+ref+"']").html() );
		}, 400);
		gsap.to('.overlay .container', {duration: 0.4, opacity: 1, delay: 0.4});
		setTimeout(function(){
			blobity.reset();
		}, 800);
	});

	//Portrait
	$(".avatar").hover(function(){
		gsap.to(".flip", {opacity: 1})
	}, function(){
		gsap.to(".flip", {opacity: 0})
	});

});

// var portfolio = "";
// var load = "";

// for (i=0; i<art.length; i++){
//   var count = i + 1;
//    portfolio += "" +
//       "<li><span class=\"icon color-red\">//</span>"+
//         "<a data-thumbnail=\"#"+i+"\">" +
//           art[i].Title +
//           "<span class=\"color-steel f-12 ml-1\">"+art[i].Role+"</span>" +
//         "</a>" +
//       "</li>";
// 	///load += "<link rel=\"preload\" as=\"image\" href=\""+art[i].Preview+"?raw=1\">";
// }

// document.getElementById("portfolio").innerHTML = "<ul>" + portfolio + "</ul>";
// //document.getElementById("load").innerHTML = load;