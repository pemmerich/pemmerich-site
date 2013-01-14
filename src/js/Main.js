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
	
	$('#thumb_scroll_container').append('<div class="scroller"><ul id="list"></ul></div>');
	 
	$(thumbnails).each(function (i,elem) {
		  console.log(" build thumb "+i+" "+elem.title);
		  $('#list').append('<li><a href="'+elem.full_file+'" class="html5lightbox" title="'+elem.title+'"><img src="'+elem.thumb_file+'"></a></li>');
		  var thumbPos = 400*i;
		 
	  });
	
	var thumbWidth = $('#thumb_scroll_container > .scroller li').css('width').replace("px","");
	var thumbMargin = $('#thumb_scroll_container > .scroller li').css('margin-right').replace("px","");
	var scrollWidth = $(thumbnails).length * (Number(thumbWidth) + (thumbMargin*2) );
	 $('#thumb_scroll_container > .scroller').css("width",scrollWidth);
	 console.log("scroller width = "+scrollWidth);
	 
	thumb_scroll = new iScroll("thumb_scroll_container",{useTransform:true, vScrollbar: false, hideScrollbar: true});
	
	$('body').append("<script src='js/html5lightbox/html5lightbox.js' type='text/javascript' charset='UTF-8'></script>");

}