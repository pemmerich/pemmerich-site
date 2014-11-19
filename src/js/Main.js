var thumb_scroll;
var thumbnails=[];
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

document.write("<script src='js/Thumbnail.js' type='text/javascript' charset='UTF-8'></script>");


$(document).ready
(
    function()
    {
      //init();
    	$.ajax(
    		{
    			type: "GET",
    	        url: "xml/content.xml",
    	        dataType: "xml",
    	        success: xmlParser
    		}
    	);

    }
);


$(window).resize(function() {
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	setScrollerHeight();
	console.log("Viewport Width = "+viewportWidth);
	console.log("Viewport Height = "+viewportHeight);
	//update survey container size
	//survey.sizeContent();

});

function xmlParser(xml) {
	 var self=this;
    //$('#load').fadeOut();
 
    $(xml).find("thumb").each(function (i,elem) {
    	
    	var thumbObject = new Thumbnail($(this).find("title").text(),i);
    	thumbObject.thumb_file=$(this).find("thumbnail").text();
    	thumbObject.full_file=$(this).find("filename").text();
    	thumbnails.push(thumbObject);
    	 
    });
    
    init();
 
}


function init()
{
	var self=this;
	
	//$('#thumb_scroll_container').append('<div class="scroller"><ul class="list"></ul></div>');
	//$('#thumb_scroll_container > .scroller').append('<div id="reflection_fade"></div>');
	 
	
	
	 /*$('#thumb_scroll_container > .scroller > .list').append('<li><div class="thumb_container" id="thumb_container_no_border"><a><img class="no_border" src="images/instructions.png"></div></li>');*/
	 
	$(thumbnails).each(function (i,elem) {
		  //console.log(" build thumb "+i+" "+elem.title);
		  $('#content > .scroller > .list').append('<li><div class="thumb_container" id="thumb_container_'+i+'"><a href="'+elem.full_file+'" id=thumb_anchor_"'+i+'" title="'+elem.title+'"><img src="'+elem.thumb_file+'"></a></div></li>');
		//$('.list_test').append('<li><div class="thumb_container" id="thumb_container_'+i+'"><a href="'+elem.full_file+'" id=thumb_anchor_"'+i+'" title="'+elem.title+'"><img src="'+elem.thumb_file+'"></a></div></li>');
		 
		 
	  });
	
	

	setScrollerHeight();

	
	 
	 
	 
	
	thumb_scroll = new IScroll("#content",{mouseWheel:true,scrollbars:true,tap:'scrollTap'});
	thumb_scroll.on('scrollStart', function () {
		$('a').addClass('scrolling');
	});
	thumb_scroll.on('scrollEnd', function () {
		setTimeout(function(){
			$('a').removeClass('scrolling');
		},500);
		
	});

	$('body').append("<script src='js/html5lightbox/html5lightbox.js' type='text/javascript' charset='UTF-8'></script>");
	
	console.log("light box = "+html5Lightbox);
	
	var evt;
	if(isTouch){
		evt = "scrollTap";
	}else{
		evt = "click";
	}

	$('#content > .scroller li a').on(evt, function(e) {
    	console.log("a click lightbox = "+html5Lightbox);
		
		e.stopPropagation();
    	e.preventDefault();

    	if(!$(this).hasClass('scrolling')){                  
	    	html5Lightbox.showLightbox(0, $(this).attr('href'), $(this).attr('title'));
	    }
		
		
	});


	
}

function setScrollerHeight()
{
	console.log("set scroller height");
	var listHeight = $('#content > .scroller > .list').innerHeight();
	var listWidth = $('#content > .scroller > .list').innerWidth();
	var headerHeight = $('#header').innerHeight();
	var footerHeight = $('#footer').innerHeight();

	var thumbWidth = $('#content > .scroller li').css('width').replace("px","");
	var thumbBorder = $('#content > .scroller li img').css('border-width').replace("px","");
	var thumbMargin = $('#content > .scroller li').css('margin-right').replace("px","");
	var thumbInnerWidth = Number(thumbWidth)+Number(thumbMargin)+Number(thumbBorder*2);
	var numThumbs = Math.floor((listWidth+Number(thumbMargin))/thumbInnerWidth);
	var scrollWidth = (numThumbs*thumbInnerWidth)-Number(thumbMargin);
	var bodyInnerWidth = $('body').innerWidth();
	var marginLeft = (bodyInnerWidth/2)-(scrollWidth/2);
	$('#content > .scroller > .list').css("margin-left",marginLeft);

	console.log("num thumbs = "+numThumbs);
	console.log("num thumbs floored = "+Math.floor(numThumbs));
	console.log("header height = "+headerHeight);
	console.log("list height = "+listHeight);
	console.log("footer height = "+footerHeight);
	console.log("thumb border = "+thumbBorder);
	console.log("thumb margin = "+thumbMargin);
	console.log("thumb width = "+thumbWidth);
	console.log("list width = "+listWidth);
	console.log("body width "+bodyInnerWidth+" scrollWidth "+scrollWidth+" num thumbs "+numThumbs+" thumb inner width "+thumbInnerWidth);
	console.log("margin left = "+marginLeft);

		
	 $('#content > .scroller').css("height",headerHeight+listHeight+footerHeight);
}