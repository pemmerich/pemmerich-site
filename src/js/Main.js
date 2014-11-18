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
		  $('#content > .scroller > .list').append('<li><div class="thumb_container" id="thumb_container_'+i+'"><a href="'+elem.full_file+'" id=thumb_anchor_"'+i+'" title="'+elem.title+'"><img src="images/instructions.png"></a></div></li>');
		
		 
		 
	  });
	
	
	setScrollerHeight();
	 
	 
	 
	
	thumb_scroll = new IScroll("#content",{mouseWheel:true,scrollbars:true});
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
	
	$('#content > .scroller li a').click(function(e) {
		
		e.stopPropagation();
    	e.preventDefault();
    	
    	console.log("a click lightbox = "+html5Lightbox);
    	
    	
    	if(!$(this).hasClass('scrolling')){                  
	    	html5Lightbox.showLightbox(0, $(this).attr('href'), $(this).attr('title'));
	    }
	}
	);
	
	
}

function setScrollerHeight()
{
	var listHeight = $('#content > .scroller > .list').innerHeight();
	var listWidth = $('#content > .scroller > .list').innerWidth();
	var headerHeight = $('#header').innerHeight();
	var footerHeight = $('#footer').innerHeight();

	var thumbWidth = $('#content > .scroller li').css('width').replace("px","");
	var thumbBorder = $('#content > .scroller li img').css('border-width').replace("px","");
	var thumbMargin = $('#content > .scroller li').css('margin-right').replace("px","");
	var thumbInnerWidth = Number(thumbWidth)+Number(thumbMargin*2)+Number(thumbBorder*2);
	var numThumbs = Math.floor(listWidth/thumbInnerWidth);
	var scrollWidth = numThumbs*thumbInnerWidth;
	var bodyInnerWidth = $('body').innerWidth();
	var paddingLeft = (bodyInnerWidth/2)-(scrollWidth/2);
	 $('#content > .scroller > .list').css("padding-left",paddingLeft);

	console.log("header height ="+headerHeight);
	console.log("list height ="+listHeight);
	console.log("footer height ="+footerHeight);
	console.log("body width "+bodyInnerWidth+" scrollWidth "+scrollWidth+" num thumbs "+numThumbs+" thumb inner width "+thumbInnerWidth);

		
	 $('#content > .scroller').css("height",headerHeight+listHeight+footerHeight);
}