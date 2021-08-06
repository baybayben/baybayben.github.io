jQuery(document).ready(function($) {

	//CREDITS
	console.log("%cDesign & Development by https://benrosati.com", "color: #4fb06f; font-style: italic");	
	
	var welcomeTL = gsap.timeline({delay:0.25});
	welcomeTL.fromTo(".intro-content", {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 1}, 0);
	welcomeTL.fromTo(".laurel-mask", {opacity: 1}, {height: 0, duration: 1.5}, 0.2);
	welcomeTL.fromTo(".project", {opacity: 0, scale: 0.6}, {opacity: 1, scale: 1, stagger: 0.2}, 0.5);
	welcomeTL.fromTo("footer", {opacity: 0, y: -10}, {opacity: 1, y: 1, duration: 0.5}, ">-0.5");
	welcomeTL.fromTo(".later img", {y: "100%"}, {y: "10px", duration: 1, ease: "back.out" }, ">0.5");

	//CURSOR
	mousePos = { x: 0, y: 0, scrollX: 0, scrollY: 0};

	var cursorTL = gsap.timeline({paused:true});
	cursorTL.to(".cursor .circle", {duration: 0.4, scale: 1, ease: "back.out"}, 0);
	
	$(window).on("mouseover", function(e){
		gsap.set(".cursor", {x: e.pageX, y: e.pageY});
		gsap.to(".cursor", {duration: 0.1, opacity: 1});
	});
	
	$(window).on("mousemove", function(e){
		mousePos.x = e.pageX; //clientX
		mousePos.y = e.pageY; //clientY
		gsap.to(".cursor-main", {duration: 0.1, x: mousePos.x, y: mousePos.y});
		gsap.to(".cursor-tail-1", {duration: 0.13, x: mousePos.x, y: mousePos.y});
		gsap.to(".cursor-tail-2", {duration: 0.15, x: mousePos.x, y: mousePos.y});
		gsap.to(".cursor-tail-3", {duration: 0.17, x: mousePos.x, y: mousePos.y});
		gsap.to(".cursor-tail-4", {duration: 0.19, x: mousePos.x, y: mousePos.y});
		gsap.to(".cursor-tail-5", {duration: 0.21, x: mousePos.x, y: mousePos.y});
		gsap.to(".cursor-tail-6", {duration: 0.23, x: mousePos.x, y: mousePos.y});
		gsap.to(".preview", {duration: 1, x: mousePos.x, y: mousePos.y});
	});

	$(window).on("scroll", function(e) {
        if(mousePos.scrollX != $(document).scrollLeft()){
            mousePos.x -= mousePos.scrollX;
            mousePos.scrollX = $(document).scrollLeft();
            mousePos.x += mousePos.scrollX;
        }
        if(mousePos.scrollY != $(document).scrollTop()){
            mousePos.y -= mousePos.scrollY;
            mousePos.scrollY = $(document).scrollTop();
            mousePos.y += mousePos.scrollY;
        }
		gsap.set(".cursor-main", { x: mousePos.x, y: mousePos.y});
		gsap.set(".cursor-tail-1", { x: mousePos.x, y: mousePos.y});
		gsap.set(".cursor-tail-2", { x: mousePos.x, y: mousePos.y});
		gsap.set(".cursor-tail-3", { x: mousePos.x, y: mousePos.y});
		gsap.set(".cursor-tail-4", { x: mousePos.x, y: mousePos.y});
		gsap.set(".cursor-tail-5", { x: mousePos.x, y: mousePos.y});
		gsap.set(".cursor-tail-6", { x: mousePos.x, y: mousePos.y});
		gsap.set(".preview", { x: mousePos.x, y: mousePos.y});
    });
	
	$("a").hover(function(e){
		cursorTL.timeScale(1).play(0);
	}, function(e){
		cursorTL.timeScale(2).reverse(0);
	});
	
});

// var portfolio = "";
// var load = "";

// for (i=0; i<art.length; i++){
//   var count = i + 1;
//    portfolio += "" +
//       "<li>"+
//         "<a data-thumbnail=\""+art[i].Preview+"?raw=1\">" +
//           "<div class=\"order\">"+(('0' + count).slice(-2))+"</div>" +
//           "<div class=\"title\">"+art[i].Title+"</div>" +
//           "<div class=\"role\">"+art[i].Role+"</div>" +
//         "</a>" +
//       "</li>";
// 	load += "<link rel=\"preload\" as=\"image\" href=\""+art[i].Preview+"?raw=1\">";
// }

// document.getElementById("portfolio").innerHTML = "<ul>" + portfolio + "</ul>";
// document.getElementById("load").innerHTML = load;