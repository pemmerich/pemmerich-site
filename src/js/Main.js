var thumb_scroll;
var thumbnails=[];

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
	
	$('#thumb_scroll_container').append('<div class="scroller"><ul class="list"></ul></div>');
	//$('#thumb_scroll_container > .scroller').append('<div id="reflection_fade"></div>');
	 
	
	 $('#thumb_scroll_container > .scroller > .list').append('<li><img class="no_border" src="images/instructions.png"></li>');
	 
	$(thumbnails).each(function (i,elem) {
		  //console.log(" build thumb "+i+" "+elem.title);
		  $('#thumb_scroll_container > .scroller > .list').append('<li><div class="thumb_container" id="thumb_container_'+i+'"><a href="'+elem.full_file+'" id=thumb_anchor_"'+i+'" title="'+elem.title+'"><img src="'+elem.thumb_file+'"><img src="'+elem.thumb_file+'" class="flip-vertical "></a></div></li>');
		  var translateY = Math.floor(Math.random() * 50) - 25;
		  $('#thumb_container_'+i+' > a > img').css({"-webkit-transform":"translateY("+translateY+"px) rotateX(60deg) rotateZ(35deg)"});
		 
	  });
	
	var thumbWidth = $('#thumb_scroll_container > .scroller li').css('width').replace("px","");
	var thumbBorder = $('#thumb_scroll_container > .scroller li img').css('border-width').replace("px","");
	var thumbMargin = $('#thumb_scroll_container > .scroller li').css('margin-right').replace("px","");
	var scrollWidth = ($(thumbnails).length+1) * (Number(thumbWidth) + (thumbMargin*2) + (thumbBorder*2) );
	 $('#thumb_scroll_container > .scroller').css("width",scrollWidth);
	 console.log("scroller width = "+scrollWidth);
	 
	thumb_scroll = new IScroll("#thumb_scroll_container",{scrollX:true, eventPassthrough:true});
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
	
	$('#thumb_scroll_container > .scroller li a').click(function(e) {
		
		e.stopPropagation();
    	e.preventDefault();
    	
    	console.log("a click lightbox = "+html5Lightbox);
    	
    	
    	if(!$(this).hasClass('scrolling')){                  
	    	html5Lightbox.showLightbox(0, $(this).attr('href'), $(this).attr('title'));
	    }
	}
	);
	
	
}