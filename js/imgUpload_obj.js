/********选择文件上传文件加进度条********/
	function upload(){
	}
	var p = upload.prototype;
	
	/********将文件转成base64********/
	p.fileUpload = function(obj,id){
		var me = this;
		var file=obj;
		var size=file.size;
		var type=file.type;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image(),
            width = 800,    //图片resize宽度
            quality = 1.0,  //图像质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
            var src=this.result;
            img.src = src;
            img.onload = function(){ 
            	var m=img.width/img.height;
            	canvas.width = width;
	            canvas.height = width /m;
	            drawer.drawImage(img, 0, 0, width, width /m);
	            if(size>200*1024){
	            	image_base64 = canvas.toDataURL(type);
	            }else{
	            	image_base64=src;
	            }
	            $('#'+id).data("imageUrl",image_base64);
            }
		}
		
	};
	/********显示显示进度条并且变化********/
	p.heightShow=function(obj){
		var me = this;
		obj.find(".mask").css("display","block");
		var x=0;
		var maxH=Math.round(Math.random()*10+80);
		obj.timer=setInterval(function(){
			x+=Math.round(Math.random()*9+1);
			obj.find(".bakgrd").css("height",x+"%");
			obj.find(".upload_num").text(x+"%");
			if(x>=maxH){
				clearInterval(obj.timer);
				me.heightHide(obj);
			}
	    },80);
	};
	/********隐藏进度条********/
	p.heightHide=function(obj){
		obj.find(".mask").css("display","none");
		obj.find(".bakgrd").css("height","0%");
		obj.find(".upload_num").text("0%");
	};
	
	/********显示上传照片********/
	p.setImage = function(id){
		var me = this;
		var $parent=$("#"+id);
	    var file_chart = $parent.find(".front_chart");
	    var preview, img_txt, localImag, fileELe = $parent.find(".front_input")[0],file=fileELe.files[0];
	    var accept_type=$(fileELe).attr("accept");
	    if(file){
	    	 var type=file.type;
	    	 if(type==''||accept_type.indexOf(type)<0){
	    		 hideLoader();
		 	    return alert("您上传的文件不符合要求，请重新选择格式为"+accept_type+"的文件"),fileELe.value="",
		                !1;
	    	 }
	    	 var  preview = $parent.find('.front_preview')[0];
	    	 //压缩图片并转换成base64
	    	var url=window.navigator.userAgent.indexOf("Chrome") >= 1 || window.navigator.userAgent.indexOf("Safari") >= 1 ? window.webkitURL.createObjectURL(file) : window.URL.createObjectURL(file);
	         preview.src = url;
	         me.fileUpload(file,id);
	         return $parent.find(".front_divUp").show(),file_chart.hide(),
	            !0
	    }
	};
	/********删除上传的图片********/
	p.delImg = function(parent){
		parent.find('.front_chart').css("display","block");
	    parent.find(".front_input").val("");
	    parent.find('.front_divUp').css("display","none");
	    parent.find(".photo_title").css("display","none").html("");
	    parent.find(".front_preview").attr("src","");
	    parent.find(".bakgrd").css("height","0%");
	    if(parent.timer){
	    	clearInterval(parent.timer);
	    }
	};
