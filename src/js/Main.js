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
	 
	
	$(thumbnails).each(function (i,elem) {
		  //console.log(" build thumb "+i+" "+elem.title);
		  $('#thumb_scroll_container > .scroller > .list').append('<li><a href="'+elem.full_file+'" id="'+i+'" title="'+elem.title+'"><img src="'+elem.thumb_file+'"></a></li>');
		  var thumbPos = 400*i;
		 
	  });
	
	var thumbWidth = $('#thumb_scroll_container > .scroller li').css('width').replace("px","");
	var thumbMargin = $('#thumb_scroll_container > .scroller li').css('margin-right').replace("px","");
	var scrollWidth = $(thumbnails).length * (Number(thumbWidth) + (thumbMargin*2) );
	 $('#thumb_scroll_container > .scroller').css("width",scrollWidth);
	 console.log("scroller width = "+scrollWidth);
	 
	thumb_scroll = new iScroll("thumb_scroll_container",{useTransform:true, vScrollbar: false, hideScrollbar: true, onScrollMove: function(){ $('a').addClass('scrolling'); },
		onScrollEnd: function(e){ setTimeout(canClickNow, 500); function canClickNow(){ $('a').removeClass('scrolling'); } }});
	

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