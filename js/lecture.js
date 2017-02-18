function getElementsByClass(classname){ 
	var classobj = [];//定义数组 
	var classint = 0;//定义数组的下标 
	var tags = document.getElementsByTagName("*");//获取HTML的所有标签 
	var classnames, i, j;
	for(i in tags){//对标签进行遍历 
		if(tags[i].nodeType == 1){//判断节点类型 
			classnames = tags[i].getAttribute("class");
			if(classnames){
				classnames = tags[i].getAttribute("class").split(' ');
				for(j in classnames){
					if(classnames[j] == classname){//判断和需要CLASS名字相同的，并组成一个数组 
						classobj[classint] = tags[i]; 
						classint++;
						break;				 
					} 
				}					
			}
		} 	 
	} 		 
	return classobj;//返回组成的数组 
} 

;(function(){
	
	var pages = getElementsByClass('page');
	var curPageNum = 0, totalPageNum = pages.length;

	if(window.sessionStorage.curPageNum){
		curPageNum = +window.sessionStorage.curPageNum;
	}else{
		window.sessionStorage.curPageNum = 0;
	}

	var jumpToPage = function(num){
		curPageNum = num;
		for(var i = 0; i < totalPageNum; i++){
			if(curPageNum !== i){
				pages[i].className = 'page';
			}else{
				pages[i].className = 'page active';
			}		
		}
	};

	var init = function(){
		var screenHeight = window.innerHeight;

		document.getElementById('prev').setAttribute("style", "top:" + (screenHeight/2 - 60) + "px");
		document.getElementById('next').setAttribute("style", "top:" + (screenHeight/2 - 60) + "px");
		for(var i = 0; i < totalPageNum; i++){
			pages[i].setAttribute("style", "height:" + screenHeight + "px");
		}
	};

	init();
	jumpToPage(curPageNum);

	document.getElementById('prev').addEventListener('click', function(e){
		if(curPageNum > 0){
			pages[curPageNum--].className = 'page';
			pages[curPageNum].className = 'page active';
			window.sessionStorage.curPageNum = curPageNum;
		}
	});

	document.getElementById('next').addEventListener('click', function(e){
		if(curPageNum < totalPageNum - 1){
			pages[curPageNum++].className = 'page';
			pages[curPageNum].className = 'page active';
			window.sessionStorage.curPageNum = curPageNum;
		}
	});

	window.onresize = function(){
		init();
	};

})();