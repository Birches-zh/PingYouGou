window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth;


    // 2.鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 4000);
    })


    // 3.动态生成小圆圈 有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性
        li.setAttribute('index', i);
        ol.appendChild(li);


        // 4.排它思想，干掉所有人
        // 直接在这里生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 留下我自己



            // 5.点击小圆圈，移动图片，移动的是ul
            // ul的移动距离 =  小圆圈的索引号  X   乘以图片的宽度，注意是负值
            // focus容器的宽度刚刚好就是图片的宽度
            // 当我们点击了某个小li，就拿到当前小li的索引号
            var index = this.getAttribute('index');
            // 点击某个小li就要把li的索引号给num
            num = index;
            circle = num;
            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';


    // 6.克隆第一张图片，放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);


    // 7.点击右侧按钮，图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;

    // 10.节流阀flag，在动画的过程中不触发事件，利用回调函数动画执行完返回true，减少事件频繁触发
    var flag = true;
    // 右侧按钮的做法
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;//关闭节流阀
            // 如果走到了最后复制的一张图片，此时我们的ul需要快速复原left值改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });



            // 8.点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了  我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    })
    // 左侧按钮的做法
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的一张图片，此时我们的ul需要快速复原left值改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            // 8.点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle<0说明第一张图片，则改成第四张图片的小圆圈
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    })

    function circleChange() {
        // 先清除其它小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 9.自动轮播图片，定时器
    var timer = setInterval(function () {
        arrow_r.click();
    }, 4000);
})



// 电梯导航
$(function () {
    // 当我们点击了小li 此时不需要执行页面滚动事件里面的li的背景选择，不需要current,通过节流阀，点击事件执行animate的时候
    // flag为false，animate执行完用回调函数把flag改为true
    var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $('.recommend').offset().top;
    toggleTool();
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }
    $(window).scroll(function () {
        toggleTool();
        if (flag) {
            $('.floor .w').each(function (index, domEle) {
                if ($(document).scrollTop() >= $(domEle).offset().top) {
                    $('.fixedtool li').eq(index).addClass('current').siblings('li').removeClass('current');
                }
            })
        }
    });

    // 2.点击电梯导航页面可以滚动到对应的内容区域
    $('.fixedtool li').click(function () {
        flag = false;
        // console.log($(this).index());//小li的索引号
        // 当我们每次点击小li就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子  计算它的.offset().top;
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag=true;
        });
        // 点击之后，让当前的小li添加current类名，移除兄弟姐妹
        $(this).addClass("current").siblings('li').removeClass('current');

    })
})
