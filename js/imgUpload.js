$(function(){
	var flag=false;
	var upload_js=new upload();
	/***点击删除图标***/
	$('.myDel').on('click',function(){
		var parent = $(this).parents('.photo_area');
		upload_js.delImg(parent);
		$(parent).removeClass("hasImg");
	});
	/***点击选择确定图片***/
    $('.front_input').on('change',function(){
    	var parentId=$(this).parents(".photo_area").attr("id");
    	var uploadFlag=upload_js.setImage(parentId);
    	if(uploadFlag){
    		$(this).parents(".photo_area").addClass("hasImg");
    		upload_js.heightShow($("#"+parentId));
    	}else{
    		$(this).parents(".photo_area").removeClass("hasImg");
    	}
    	
    });
    
    
    /***点击提交***/
    var needBreak=false;
    $("#sum").on("click",function(){
    	//needBreak判断是否还有进度条
    	$(".mask").each(function(i){
    	    if($(".mask").eq(i).css("display")=="block"){
    	    	tipAlert("图片正在加载，请稍后");
    	    	needBreak=true;
    	        return false;
    	    }
    	});
    	if(needBreak==true){
    		needBreak=false;
    		return ;
    	}
		var dataArray=[];
    	$(".photo_area.hasImg").each(function(){
    		var name=$(this).find(".front_input").attr("fileName");
    		var dataUrl=$(this).data("imageUrl");
    		var code=$(this).attr("id");
    		var data={
					code:code,
					name:name,
					value:dataUrl
			};
    		dataArray.push(data);
    	});
    	if(dataArray.length<=0){//必须选择一张以上
 	    	alert("请上传相应的图片");
 	    	return ;
 	    }
 	    $("#sum").attr("disabled",true);
 	    var dataObj={
 	    	"uploadImages":dataArray
 	    };
 	    console.log(dataObj)
    	//callBack(dataObj);
    });
});

/********逐张照片上传的ajax请求********/
function callBack(uploadImages,obj){
	$.ajax({
		type : "post",
		jsonType:"json",
		url : ctx+"UploadFile",
		headers:{
			"Content-Type":"application/json;charset=UTF-8"
		},
		contentType : "application/json",
		data : JSON.stringify(uploadImages),
		beforeSend : function(){ showLoader()},
		success : function (resSt) {
			var res=JSON.parse(resSt);
           if(res.state==1){
           	
           }else{
           }
            $("#sum").removeAttr("disabled");
		},
		error : function() {
			alert("交互失败");
			$("#sum").removeAttr("disabled");
		}
	});
};
