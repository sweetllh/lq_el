//获取本地文件路径
export function	getObjectURL(file) {
	  let url = null;
	  if (window.createObjectURL != undefined) {
	    // basic
	    url = window.createObjectURL(file);
	  } else if (window.URL != undefined) {
	    // mozilla(firefox)
	    url = window.URL.createObjectURL(file);
	  }else if (window.webkitURL != undefined) {
	    // webkit or chrome
	    url = window.webkitURL.createObjectURL(file);
	  } 
	  return url;
	};
	
	
	//dataURL转换为Blob对象
export function	dataURLtoBlob(dataurl){
	   var arr = dataurl.split(','), 
	   	   mime = ((arr[0].split(';'))[0].split(':'))[1],
	   	   //mime = arr[0].match(/:(.*?);/)[1],
	       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new Blob([u8arr], {type:mime});
};
	
	//dataURL转换为file对象
export function	dataURLtoFile(dataurl, filename) {
	    var arr = dataurl.split(','),
	    	mime = ((arr[0].split(';'))[0].split(':'))[1],
	    	//mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new File([u8arr], filename, {type:mime});
};

//文件转换成dataUrl
export function	 readBlobAsDataURL(blob, callback) {
		    var a = new FileReader();
		    a.onload = function(e) {callback(e.target.result);};
		    a.readAsDataURL(blob);
	};
		
//数组去重
export function	 distinct(arr){
			  let result = [],
			  i,
			  j,
			  len = arr.length;
			  for(i = 0; i < len; i++){
				  for(j = i + 1; j < len; j++){
					   if(arr[i].Name === arr[j].Name && arr[i].User === arr[j].User){
					    j = ++i;
				    }
				  }
			  result.push(arr[i]);
			 }
			 return result;
	};
	
	
export function	convertBase64UrlToBlob(urlData,type){
   		//console.log('urlData',urlData)
	    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
	    //处理异常,将ascii码小于0的转换为大于0
	    var ab = new ArrayBuffer(bytes.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < bytes.length; i++) {
	        ia[i] = bytes.charCodeAt(i);
	    }
	    return new Blob( [ab] , {type : 'image/'+type});
};