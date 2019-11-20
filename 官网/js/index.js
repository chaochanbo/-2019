var deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
    window.addEventListener('resize', function () {
        setHtmlFontSize()
    }, false)
}
function setHtmlFontSize () {
    // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
    deviceWidth = document.documentElement.clientWidth > 1366 ? 1366 : document.documentElement.clientWidth
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 13.66 + 'px !important'
}



$('.home').mouseover(function () {
    $('.home a span').text('首页')
})

$('.home').mouseout(function () {
    $('.home a span').text('HOME')
})

$('.anli').mouseover(function () {
    $('.anli a span').text('案例')
})

$('.anli').mouseout(function () {
    $('.anli a span').text('CASE')
})

$('.video').mouseover(function () {
    $('.video a span').text('影视')
})

$('.video').mouseout(function () {
    $('.video a span').text('FILM')
})

$('.about').mouseover(function () {
    $('.about a span').text('关于我们')
})

$('.about').mouseout(function () {
    $('.about a span').text('ABOUT')
})
