/*
 *这个模块定义一个drag()函数，它用于mousedown事件处理程序的调用
 *随后的mousedown事件将移动指定元素，mouseup事件将终止拖动
 *这些实现能同标准和IE两种事件一起工作
 *它需要用到本书其他地方介绍的getScrollOffsets
 *参数：
 *elementToDrag:接收mouseDown事件的元素或某些包含元素
 *它必须是绝对定位
 *它的style.left和style.top值将随着用户的拖动而改变
 
 *event:mousedown对象
 */



function drag(elementToDrag, event) {
	//初始鼠标位置，转换为文档坐标
	var scroll = getScrollOffsets();
	var startX = event.clientX + scroll.x;
	var startY = event.clientY + scroll.y;

	//在文档坐标下，待拖动元素的初始位置
	//因为elementTodrag是绝对定位的，
	//所以我们可以假设它的offsetParent就是文档的body元素。
	var origX = elementToDrag.offsetLeft;
	var origY = elementToDrag.offsetTop;

	//计算mousedown事件和元素左上角之间的距离
	//我们将它另存为鼠标移动的距离
	var deltaX = startX - origX;
	var deltaY = startY - origY;

	//注册用于响应接着mousedown事件发生的mousedown时间的处理程序
	if (document.addEventListener) { //标准事件模型
		//在document对象上注册捕获事件处理程序
		document.addEventListener('mousemove', moveHandler, true);
		document.addEventListener('mouseup', upHandler, true);
	} else if (document.attachEvent) { //用于IE5~8的IE事件模型
		//在IE模型中，
		//捕获事件是通过调用元素上的色setcapture()捕获它们的
		elementToDrag.setCapture();
		elementToDrag.attachEvent("onmousemove", moveHandler);
		elementToDrag.attachEvent("onmouseup", upHandler);

		//作为mouseup事件看待鼠标的丢失
		elementToDrag.attachEvent("onlosecapture", upHandler);
	}

	//我们处理了这个事件，不让任何其他元素看到它
	if (event.stopPropagation) event.stopPropagation(); //标准模式
	else event.cancelBubble = true;
	//阻止任何默认事件
	if (event.preventDefault) event.preventDefault();
	else event.returnValue = false;

	/*当元素正在被拖动时*/
	function moveHandler(e) {
		if (!e) e = window.event; //IE事件模型

		//移动这个元素到当前鼠标位置
		//通过滚动条的位置和初始单机的偏移量来调整
		var scroll = getScrollOffsets();
		elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + 'px';
		elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + 'px';
		//同时不让其他元素看到这个事件

		if (e.stopPropagation) e.stopPropagation(); //标准
		else e.cancelBubble = true;
	}

	/*这是捕获在拖动结束时发生的最终mouseup事件的处理程序*/
	function upHandler(e) {
		if (!e) e = window.event;
		//注销捕获事件处理程序
		if (document.removeEventListener) {
			document.removeEventListener("mouseup", upHandler, true);
			document.removeEventListener('mousemove', moveHandler, true);
		} else if (document.detachEvent) { //IE5+ 事件模型
			elementToDrag.detachEvent("onlosecapture", upHandler);
			elementToDrag.detachEvent("onmouseup", upHandler);
			elementToDrag.detachEvent("onmousemove", moveHandler);
			elementToDrag.releaseCapture();
		}
		//并且不让事件进一步传播
		if (e.stopPropagation) e.stopPropagation() //标准模型
		else e.cancelBubble = true;
	}
}