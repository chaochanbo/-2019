function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//获取code
let code = getQueryString('code');
let link = getQueryString('link');
var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4339a8e895f69b5&redirect_uri=https://www.chaochuanbo.com/vivo&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
if(link != null){
    url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4339a8e895f69b5&redirect_uri=https://www.chaochuanbo.com/vivo/ht.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}
var storage = window.localStorage;
if (code == null) {
    //location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4339a8e895f69b5&redirect_uri=https://www.chaochuanbo.com/vivo&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect') //后台接口地址
    location.replace(url) //后台接口地址
} else {
    var test = (function () {
        let result;
        $.ajax({
            type: 'GET',
            dataType: "json",
            headers: {
                'Content-Type': 'application/Json'
            },
            async: false,
            url: 'https://www.chaochuanbo.com/tp5/getUserInfo',
            data: {
                code: code
            },
            success: function (res) {
                result = res
            }
        })
        return result;
    })()
}
var haerImg = test.headimgurl
var nickname = test.nickname
var openid = test.openid

//获取权限
function wxCofig() {
    var url = window.location.href

    var config = (function () {
        let result;
        $.ajax({
            type: 'GET',
            dataType: "json",
            headers: {
                'Content-Type': 'application/Json'
            },
            async: false,
            url: 'https://www.chaochuanbo.com/tp5/getInfo',
            data: {
                url: url
            },
            success: function (res) {
                console.log(res)
                if (res) {
                    result = res
                }
            }
        })
        return result
    })()

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appId, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    });

    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
            title: 'vivo Lab社区', // 分享标题
            desc: '玩家，轮到你发言了。', // 分享描述
            link: 'https://www.chaochuanbo.com/vivo', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://www.chaochuanbo.com/vivo/logo.jpg', // 分享图标
            success: function (res) {
                // 设置成功
                console.log(res)
            }
        })

        wx.updateTimelineShareData({
            title: 'vivo Lab社区', // 分享标题
            link: 'https://www.chaochuanbo.com/vivo', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://www.chaochuanbo.com/vivo/logo.jpg', // 分享图标
            success: function (res) {
                // 设置成功
                console.log(res)
            }
        })
    });
}
wxCofig()


//提交评论
$('.btn').click(function () {
    var text = $('.texts').val()
    if(text != ''){
        $.ajax({
            type: "GET",
            dataType: 'json',
            headers: {
                'Content-Type': 'application/Json'
            },
            url: 'https://www.chaochuanbo.com/tp5/addComment',
            dataType: 'json',
            data: {
                'headimgurl': haerImg,
                'nickname': nickname,
                'openid': openid,
                'comment': text
            },
            success: function (res) {
                if (res.code = 1) {
                    $('.texts').val('')
                    $('.success').css('display', 'block')
                    $('.btn').attr('src', './images/2.png')
                    setTimeout(function () {
                        $('.success').css('display', 'none')
                    }, 2000)

                    $.ajax({
                            type: 'GET',
                            headers: {
                                'Content-Type': 'application/Json'
                            },
                            url: 'https://www.chaochuanbo.com/tp5/getComment',
                            dataType: 'json',
                            data: {
                                openid: openid
                            },
                            success: function (res) {
                                console.log(res)
                                var data = res.data.list[0]
                                data.date = data.date.substring(5, 16)
                                console.log(data)
                                var str = ''
                                str += '<div class="list">\n' +
                                    '            <div class="tximg">\n' +
                                    '               <img src="' + data.user_img + '" alt="">\n' +
                                    '               <div class="name"> ' + data.user_name + '</div>\n' +
                                    '               <div class="text">' + data.comment + '</div>\n' +
                                    '               <div class="time">' + data.date + '</div>\n' +
                                    '               <div class="zan" data-fab="' + data.fab + '" data-id="' + data.id + '">\n' +
                                '                  <img class="zanimg" src="./images/zan.png" alt="">\n' +
                                '                  <div class="num">' + data.num + '</div>\n' +
                                '               </div>\n' +
                                '               <div class="huifuimg" data-id="' + data.id + '">\n' +
                                '                  <img src="./images/huifu.png" alt="">\n' +
                                '               </div>\n' +
                                '               <div class="xian">\n' +
                                '                  <div></div>\n' +
                                '               </div>\n' +
                                '            </div>\n' +
                                '         </div>'
                                $('.pl-list').prepend(str)
                                $('.jiazai').html('加载更多')
                            }
                        }
                    )
                }
            }
        })
    }

})

//评论列表
function list() {
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/Json'
        },
        url: 'https://www.chaochuanbo.com/tp5/getComment',
        dataType: 'json',
        data: {
            openid: openid
        },
        success: function (res) {
            console.log(res)
            var data = res.data.list
            for (let i = 0; i < data.length; i++) {
                var date = data[i].date

                data[i].date = date.substring(5, 16)
            }
            if (data.length == 0) {
                $('.jiazai').html('暂无评论')
            }
            var str = ''
            var plr = ''
            $.each(data, function (i, item) {
                var list = this.reply.list
                for(let i=0;i<list.length;i++){
                    if(list[i].touser){
                        plr += '<p data-pid="'+ list[i].pid +'" data-id="'+ list[i].id +'" data-name="'+ list[i].user_name +'" class="hfpl"><span class="hf-name">'+ list[i].user_name +'</span>回复<span class="hf-name"> '+ list[i].touser +'</span>：'+ list[i].comment +'</p>'
                    }else {
                        plr += ' <p class="hfpl" data-pid="'+ list[i].pid +'" data-id="'+ list[i].id +'" data-name="'+ list[i].user_name +'"><span class="hf-name">'+ list[i].user_name +'</span>: '+ list[i].comment +'</p>'
                    }
                }
                if (data[i].fab == 1) {
                    str += '<div class="list">\n' +
                        '            <div class="tximg">\n' +
                        '               <img src="' + data[i].user_img + '" alt="">\n' +
                        '               <div class="name"> ' + data[i].user_name + '</div>\n' +
                        '               <div class="text">' + data[i].comment + '</div>\n' +
                        '               <div class="time">' + data[i].date + '</div>\n' +
                        '               <div class="zan" data-fab="' + data[i].fab + '" data-id="' + data[i].id + '">\n' +
                        '                  <img class="zanimg" src="./images/zan.png" alt="">\n' +
                        '                  <div class="num">' + data[i].num + '</div>\n' +
                        '               </div>\n' +
                        '               <div class="huifuimg" data-id="' + data[i].id + '">\n' +
                        '                  <img src="./images/huifu.png" alt="">\n' +
                        '               </div>\n' +
                        '               <div class="huifu" data-id="' + data[i].id + '\">'+ plr +'\n' +
                        '               </div>\n' +
                        '               <div id="read-more"></div>\n' +
                        '               <div class="xian">\n' +
                        '                  <div></div>\n' +
                        '               </div>\n' +
                        '            </div>\n' +
                        '         </div>'
                } else {
                    str += '<div class="list" data-index="'+ i +'">\n' +
                        '            <div class="tximg">\n' +
                        '               <img src="' + data[i].user_img + '" alt="">\n' +
                        '               <div class="name"> ' + data[i].user_name + '</div>\n' +
                        '               <div class="text">' + data[i].comment + '</div>\n' +
                        '               <div class="time">' + data[i].date + '</div>\n' +
                        '               <div class="zan" data-fab="' + data[i].fab + '" data-id="' + data[i].id + '">\n' +
                        '                  <img class="zanimg" src="./images/zan1.png" alt="">\n' +
                        '                  <div class="num active">' + data[i].num + '</div>\n' +
                        '               </div>\n' +
                        '               <div class="huifuimg" data-index="'+i+'" data-id="' + data[i].id + '">\n' +
                        '                  <img src="./images/huifu.png" alt="">\n' +
                        '               </div>\n' +
                        '               <div class="huifu" data-id="' + data[i].id + '\">'+ plr +'\n' +
                        '               </div>\n' +
                        '               <div id="read-more"></div>\n' +
                        '               <div class="xian">\n' +
                        '                  <div></div>\n' +
                        '               </div>\n' +
                        '            </div>\n' +
                        '         </div>'
                }
                plr = ''
                $('.pl-list').html(str)
            })
        }
    })
}
list()


//点赞or取消点赞
$('.pl-list').on('click', '.zan', function () {
    // $('.zan').index(this)
    var num = $(this).children().eq(1).text()
    var id = $(this).attr('data-id')
    var fab = $(this).attr('data-fab')
    var _this = $(this)
    if (fab == 1) {
        $.ajax({
            type: 'GET',
            headers: {
                'Content-Type': 'application/Json'
            },
            url: 'https://www.chaochuanbo.com/tp5/addFab',
            dataType: 'json',
            data: {
                openid: openid,
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 10001) {
                    num++
                    _this.children().eq(1).text(num)
                    _this.children().eq(1).css('color', '#fff100')
                    _this.children().eq(0).attr('src', './images/zan1.png')
                    _this.attr('data-fab', '0')
                }
            }

        })
    } else {
        $.ajax({
            type: 'GET',
            headers: {
                'Content-Type': 'application/Json'
            },
            url: 'https://www.chaochuanbo.com/tp5/delFab',
            dataType: 'json',
            data: {
                openid: openid,
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 10001) {
                    num--
                    _this.children().eq(1).text(num)
                    _this.children().eq(1).css('color', '#7f95ff')
                    _this.children().eq(0).attr('src', './images/zan.png')
                    _this.attr('data-fab', '1')
                }
            }

        })
    }
})

//加载更多
var index = 1
$('.jiazai').on('click', function () {
    index += 1
    $.ajax({
        type: 'GET',
        headers: {
            'Content-Type': 'application/Json'
        },
        url: 'https://www.chaochuanbo.com/tp5/getComment?page=' + index,
        dataType: 'json',
        data: {
            openid: openid
        },
        success: function (res) {
            console.log(res)
            var data = res.data.list
            if (data.length == 0) {
                $('.jiazai').html('没有更多了')
            }
            var str = ''
            var plr = ''
            $.each(data, function (i, item) {
                var list = data[i].reply.list
                for(let i=0;i<list.length;i++){
                    if(list[i].touser){
                        plr += ' <p class="hfpl" data-pid="'+ list[i].pid +'" data-id="'+ list[i].id +'" data-name="'+ list[i].user_name +'"><span class="hf-name">'+ list[i].user_name +' 回复 '+ list[i].touser +':</span>'+ list[i].comment +'</p>'
                    }else {
                        plr += ' <p class="hfpl" data-pid="'+ list[i].pid +'" data-id="'+ list[i].id +'" data-name="'+ list[i].user_name +'"><span class="hf-name">'+ list[i].user_name +':</span>'+ list[i].comment +'</p>'
                    }
                }
                if (data[i].fab == 1) {
                    str += '<div class="list">\n' +
                        '            <div class="tximg">\n' +
                        '               <img src="' + data[i].user_img + '" alt="">\n' +
                        '               <div class="name"> ' + data[i].user_name + '</div>\n' +
                        '               <div class="text">' + data[i].comment + '</div>\n' +
                        '               <div class="time">' + data[i].date + '</div>\n' +
                        '               <div class="zan" data-fab="' + data[i].fab + '" data-id="' + data[i].id + '">\n' +
                        '                  <img class="zanimg" src="./images/zan.png" alt="">\n' +
                        '                  <div class="num">' + data[i].num + '</div>\n' +
                        '               </div>\n' +
                        '               <div class="huifuimg" data-id="' + data[i].id + '">\n' +
                        '                  <img src="./images/huifu.png" alt="">\n' +
                        '               </div>\n' +
                        '               <div class="huifu">'+ plr +'\n' +
                        '               </div>\n' +
                        '               <div id="read-more"></div>\n' +
                        '               <div class="xian">\n' +
                        '                  <div></div>\n' +
                        '               </div>\n' +
                        '            </div>\n' +
                        '         </div>'
                } else {
                    str += '<div class="list">\n' +
                        '            <div class="tximg">\n' +
                        '               <img src="' + data[i].user_img + '" alt="">\n' +
                        '               <div class="name"> ' + data[i].user_name + '</div>\n' +
                        '               <div class="text">' + data[i].comment + '</div>\n' +
                        '               <div class="time">' + data[i].date + '</div>\n' +
                        '               <div class="zan" data-fab="' + data[i].fab + '" data-id="' + data[i].id + '">\n' +
                        '                  <img class="zanimg" src="./images/zan1.png" alt="">\n' +
                        '                  <div class="num active">' + data[i].num + '</div>\n' +
                        '               </div>\n' +
                        '               <div class="huifuimg" data-id="' + data[i].id + '">\n' +
                        '                  <img src="./images/huifu.png" alt="">\n' +
                        '               </div>\n' +
                        '               <div class="huifu">'+ plr +'\n' +
                        '               </div>\n' +
                        '               <div id="read-more"></div>\n' +
                        '               <div class="xian">\n' +
                        '                  <div></div>\n' +
                        '               </div>\n' +
                        '            </div>\n' +
                        '         </div>'
                }
                $('.pl-list').append(str)
            })
        }
    })
})

//监听输入事件
$('.texts').keyup(function () {
    var text = $('.texts').val()
    console.log(123)
    if (text != '') {
        $('.btn').attr('src', './images/3.png')
    } else {
        $('.btn').attr('src', './images/2.png')
    }
})

//评论
var plId
var dataId
var toid
var name
var self
$('.pl-list').on('click', '.huifuimg', function (event) {
    $('.inputs').css('display','block')
    $('.ht').css('bottom','0.7rem')
    $('.pl-text').attr('autofocus',true)
    plId = $(this).attr('data-id')
    dataId = 1
    event.stopPropagation()
    self = $(this).next()
    return plId
    return dataId
})

//回复评论
$('.pl-list').on('click', '.hfpl', function (event) {
    $('.inputs').css('display','block')
    $('.ht').css('bottom','0.7rem')
    plId = $(this).attr('data-id')
    toid = $(this).attr('data-pid')
    name = $(this).attr('data-name')
    self = $(this).parent('.huifu')
    dataId = 2
    event.stopPropagation()
    $('.pl-text').attr('placeholder','回复'+ name)
    $('.pl-text').attr('autofocus',true)
    return plId
    return dataId
    return toid
    return name
})

//评论->评论
$('.inBtn').click(function () {
    var text = $('.pl-text').val()
    let str
    $('.pl-text').attr('autofocus')
    if(dataId == 1){
        console.log(index)
        $.ajax({
            type: "GET",
            dataType: 'json',
            headers: {
                'Content-Type': 'application/Json'
            },
            url: 'https://www.chaochuanbo.com/tp5/addComment',
            dataType: 'json',
            data: {
                'headimgurl': haerImg,
                'nickname': nickname,
                'openid': openid,
                'comment': text,
                'pid': plId,
                'to_id': plId
            },
            success: function (res) {
                console.log(res)
                $('.inputs').css('display','none')
                $('.ht').css('bottom','0.2rem')
                // $('.pl-text').attr('placeholder','请输入内容')
                $('.pl-text').attr('autofocus',false)
                $('.pl-text').val('')
                str += '<p data-id="'+ res.id +'"  class="hfpl"><span class="hf-name">'+ nickname +':</span>'+ text +'</p>'
                $(self).append(str)
            }
        })
    }else {
        $.ajax({
            type: "GET",
            dataType: 'json',
            headers: {
                'Content-Type': 'application/Json'
            },
            url: 'https://www.chaochuanbo.com/tp5/addComment',
            dataType: 'json',
            data: {
                'headimgurl': haerImg,
                'nickname': nickname,
                'openid': openid,
                'comment': text,
                'pid': plId,
                'to_id': toid,
                'code': 1
            },
            success: function (res) {
                $('.inputs').css('display','none')
                $('.ht').css('bottom','0.2rem')
                $('.pl-text').attr('placeholder','请输入内容')
                $('.pl-text').attr('autofocus',false)
                $('.pl-text').val('')
                str += '<p data-id="'+ res.id +'" data-pid="'+ plId +'" data-name="'+ nickname +'" class="hfpl"><span class="hf-name">'+ nickname +'</span>回复<span class="hf-name"> '+ name +'</span>：'+ text +'</p>'
                $(self).append(str)
            }
        })
    }
})

$('.inputs').click(function (event) {
    event.stopPropagation()
})

$(document).click(function () {
    if($('.inputs').css('display') == 'block'){
        $('.inputs').css('display','none')
        $('.ht').css('bottom','0.2rem')
        $('.pl-text').val('')
        $('.pl-text').attr('autofocus',false)
        $('.pl-text').attr('placeholder','请输入内容')

    }
})


//往期话题
$('.ht').click(function () {
    window.location.replace('./ht.html?link=ht')
})

function goIndex() {
    window.location.replace('./index.html')
}
