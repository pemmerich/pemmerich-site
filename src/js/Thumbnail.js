
//set up section, question, answer classes
function Thumbnail(title,id)
{
  
  this.id=id;
  this.title=title;
  this.thumb_file;
  this.full_file;
}

Thumbnail.prototype = {
		
		launch:function()
		{
			console.log(" launch thumbnail ="+title);
			
		}

};

