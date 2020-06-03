// 缓动动画函数封装obj目标对象target目标位置
// 思路
// 1.让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
// 2.核心算法：（目标值-现在的位置）/ 10做为每次移动的距离  不长
// 3.停止的条件是：让当前盒子位置等于目标位置就停止定时器
function animate(obj, target, callback) {//obj是哪一个对象，哪个目标结束的位置
    // 清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // var step = Math.ceil((target - obj.offsetLeft)) / 10;
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到函数结束，也就是定时器结束，函数执行完再执行传进来的函数，才叫回调函数，就是回头调用函数的意思
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 每次加1 这个步长值改为一个慢慢变小的值  步长公式：（目标值-现在的位置）/10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}