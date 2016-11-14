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
	var startX =
}