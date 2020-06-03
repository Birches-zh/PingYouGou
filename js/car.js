$(function () {
    // 1.全选 全不选功能模块
    // 事件可以使用change
    $(".checkall").change(function () {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {//添加背景颜色
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
    })
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {//添加背景颜色
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })
    // 2.增减商品数量，首先声明一个变量，当我们点击+号，就让这个值++，然后给文本框

    $('.increment').click(function () {
        // 得到向前兄弟文本框的值
        var num = $(this).siblings('.itxt').val();
        num++;
        $(this).siblings('.itxt').val(num)
        var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1);
        var total = price * num;
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + total.toFixed(2));
        getSum()
    })
    $('.decrement').click(function () {
        // 得到向前兄弟文本框的值
        var num = $(this).siblings('.itxt').val();
        if (num == 1) {
            return false;
        } else {
            num--;
            $(this).siblings('.itxt').val(num);
            var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1);
            var total = price * num;
            $(this).parents('.p-num').siblings('.p-sum').text('￥' + total.toFixed(2));
            getSum()
        }
    })
    // 3.用户修改文本框的值 计算 小计模块
    $('.itxt').change(function () {
        var num = $(this).val();
        var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1);
        var total = (num * price).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + total);
        getSum()
    })
    getSum();
    function getSum() {
        var count = 0;// 计算总件数
        var money = 0;// 计算总价钱
        $('.itxt').each(function (index, domEle) {
            count += parseInt($(domEle).val());
        })
        $('.amount-sum em').text(count);
        $('.p-sum').each(function (index, domEle) {
            money += parseInt($(domEle).text().substr(1));
        })
        $('.price-sum em').text("￥" + money.toFixed(2));
    }
    // 4.删除商品模块
    // (1)商品后面的删除按钮
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();
        getSum();
    })
    // (2)删除选中的商品
    $('.remove-batch').click(function () {
        // 删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents('.cart-item').remove();
        getSum();
    })
    // (3)清理购物车 删除所有商品
    $('.clear-all').click(function () {
        $('.cart-item').remove();
        getSum();
    })
})