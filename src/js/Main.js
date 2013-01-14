var thumb_scroll;
var thumbnails=[];

document.write("<script src='js/Thumbnail.js' type='text/javascript' charset='UTF-8'></script>");
document.write("<script src='js/html5lightbox/html5lightbox.js' type='text/javascript' charset='UTF-8'></script>");

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
	
	//thumbnails=[new Thumbnail("thumb 1",1), new Thumbnail("thumb 2",2), new Thumbnail("thumb 3",3)];
	
	$(thumbnails).each(function (i,elem) {
		  console.log(" build thumb "+elem.title);
		
	    
	  });
	
}