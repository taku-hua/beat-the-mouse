// 显示相关变量
// 分数变量
var score = 0;
// 初始地鼠变量
var count = 3;
// 记录实时地鼠数量
var count_now = count;
/*随机显示count个图*/
var img = $("#img");

// 时间倒计时相关
// 每次累加的
var countDown;

// 默认倒计时时间1min
var min = 1;
var second = 0;

// 默认1.5s后消失
var time = 1500;
// 设置每一个的消失时间
var timeout = time;

function start() {
    timerCounter();
    for (var i = 0; i < count; i++) {
        createImg();
    }
    load();
    $("#startId").prop("disabled", true);

}

// 给每个img对象绑定click()事件;
function load() {
    // 需要先解绑所有的img对象 click时间
    $("img").off("click").click(function () {
        // $("img").click(function () {
        $(this).remove();
        add();
        // 单击时分数+ 1;
        score++;
        $("#score").html(score);
        count_now--;
    })
}

// 复制图片并放置图片
function createImg() {
    var $container = $("#container");
    // 随机地址放置图片
    var top = Math.random() * $container.height() * 0.9;
    var left = Math.random() * $container.width() * 0.9;
    img.clone().appendTo($container).css("position", "absolute").css("top", top).css("left", left).hide().slideDown("100");
}


// 鼠标单击后,如果count_now < count,则添加图片
function add() {
    count_now = $("img").length;
    if (count_now > 1 && count_now < (count + 1)) {
        createImg();
        load();
    }
    // $("#test").html(count_now);
}

var miceAdd = setInterval(function () {
    // 时间自增
    var imgs = $("img");
    imgs[1].remove();
    add();
    // 每张图设置自杀时间time
    timeout += time;
}, timeout);


function timerCounter() {
    countDown = setInterval("Count()", 1000);
}


function Count() {
    if (second <= 0) {
        second = 59;
        min--;
    }
    if (min < 0) {
        clearInterval(countDown);
        clearInterval(miceAdd);
        $("#timer").css("color", "red").html("time's up!");
        $("img").off("click");


    } else {
        if (second < 10) {
            second = "0" + second;
        }
        $("#timer").html("timer:" + min + ":" + second);
        second--;

    }

}