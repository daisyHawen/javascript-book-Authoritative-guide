#文档坐标和视口坐标
##说明
元素的位置是以像素来度量的：
向右表示X坐标的增加，
向下代表Y坐标的增加。

但是有两个不同的点作为坐标系的原点：元素的X和Y坐标可以相对于文档的左上角或者相对于在其中显示文档的左上角。

所谓”视口“：**只是浏览器的一部分**，不包括浏览器的外壳（菜单、工具条和标签页）。
针对框架页中显示的文档，视口是定义了框架页的iframe元素。
因此，无论在何种情况下，讨论元素的位置时，必须弄清楚所使用的坐标是文档还是视口（或者叫做窗口）

如果文档比视口要小，或者说它还未出现滚动，则文档的左上角就是视口的左上角，两者的坐标系统是同一个。
但是一般来说，要在两种坐标系之间相互转换，必须加上或者减去滚动的偏移量。
例如，在文档坐标系中，如果一个元素的Y坐标是200像素，并且用户已经把浏览器向下滚动75元素了，那么视口坐标中元素的Y坐标就是125像素。
如图：
![示例图](https://github.com/daisyHawen/javascript-book-Authoritative-guide/blob/master/%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86/demo_%E6%8B%96%E5%8A%A8%E6%96%87%E6%A1%A3%E5%85%83%E7%B4%A0/img/1.png?raw=true)
##使用
文档坐标比视口坐标更加基础，并且在用户滚动时它们不会发生变化。
但是在客户端编程中，使用视口坐标非常常见。
文档坐标：**当时用CSS指定元素时运用了文档坐标****
视口坐标：
- 最常见的查询元素位置的方法返回视口坐标中的位置；
- 为鼠标事件注册事件处理程序函数时
- 报告鼠标指针的坐标

因此为了在坐标系中进行转换，我们需要判定浏览器窗口滚动条的位置。
window的pageXoffset和PageYOffset属性在所有的浏览器提供这些值（IE8除外）；
另外，IE也可以通过scrollLeft和scrollTop属性来获得滚动条的位置。

值得一提的是，正常情况下通过查询文档的根节点（document.documentElement）来获取这些属性，但是在怪异模式下，要通过查询body元素（document.body）来获取滚动条的位置。

##方法函数
###查询元素的几何尺寸
getBoundingClientRect()
不需要参数，返回视口坐标中的位置：left,right,top,bottom
测试demo
```
    <style type="text/css">
        .big-box{
            height: 1000px;
        }
        div{
            border:1px solid blue;
        }
        #div1{
            border:1px solid green;
        }
    </style>
</head>

<body>
    <div class="big-box">box1</div>
    <div id="div1">Test</div>
    <div class="big-box">box2</div>
</body>
<script type="text/javascript">
/*演示视口坐标——查询元素的几何尺寸*/
var div1 = document.getElementById('div1');
var box = div1.getBoundingClientRect();
console.log(box.left);
console.log(box.right);

console.log(box.top);
console.log(box.bottom);
```

代码在[getBoundingClientRect-demo](https://github.com/daisyHawen/javascript-book-Authoritative-guide/blob/master/%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86/demo_%E6%8B%96%E5%8A%A8%E6%96%87%E6%A1%A3%E5%85%83%E7%B4%A0/getclient.html) 
可以试一下滑动滚动条，并且看一下打印的是什么。确实是视口窗口的坐标
因此要结合滚动条的位置，才是元素真正在文档中的位置。

###判定元素在某点
Document.elementFromPoint()
接收参数 X坐标和Y坐标
demo也写在了这个后面：
代码在[getBoundingClientRect-demo](https://github.com/daisyHawen/javascript-book-Authoritative-guide/blob/master/%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86/demo_%E6%8B%96%E5%8A%A8%E6%96%87%E6%A1%A3%E5%85%83%E7%B4%A0/getclient.html) 
###滚动
scrollTop和scrollLeft查询滚动条的位置，
scrollTo 可以设置滚动条的位置


###关于元素尺寸、位置和溢出的更多信息
offsetWidth 和offsetTop返回元素的X和Y坐标(针对文档的)

即每个HTML元素都有下面这些属性：
文档坐标：offsetWidth offsetHeight offsetTop offsetLeft offsetParent; 
视口坐标：clientWidth clientHeight clientLeft clientTop;
滚动条坐标：scrollWidth scrollHeight scrollLeft scrollTop;

#js中事件监听的方法总共三种
1. element.addEventLisener(type,listener[,useCapture]);//IE6-8不支持
2. element.attachEvent