//查询窗口滚动条的位置
function getScrollOffsets(w) {
	w = w || window;
	//除了ie8更早版本以外，其他都能用
	if (w.pageXOffset != null) return {
			x: w.pageXOffset,
			y: w.pageYOffset;
		}
		//对标准模式下的IE(或任何浏览器)
	var d = document;
	if (document.compatMode == "CSS1compat")
		return {
			x: d.documentElement.scrollLeft,
			y: d.documentElement.scrollTop
		};
	//对怪异模式下的浏览器
	return {
		x: d.body.scrollLeft,
		y: d.body.scrollTop
	}
}