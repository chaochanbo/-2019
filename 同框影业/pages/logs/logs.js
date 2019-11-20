//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        logs: [
            {
                poster: 'http://www.chaochuanbo.com/video/1.png',
                title: '我有一个想法',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/2.png',
                title: '满京华One Paper',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/3.png',
                title: '白字人生',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/4.png',
                title: '我们定义城市',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/5.png',
                title: '一座城市的荣耀',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/6.png',
                title: '再见深圳',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/7.png',
                title: '就是正岩',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/8.png',
                title: '我与深圳是什么关系',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/9.png',
                title: '我不在汕尾好多年',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/10.png',
                title: '我被通缉了',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/11.png',
                title: '我被困在周四了',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/12.png',
                title: '你丢失的那1㎡',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            },
            {
                poster: 'http://www.chaochuanbo.com/video/13.png',
                title: '偷听闺蜜的秘密',
                introduction: '视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍'
            }
        ],
        full: false
    },
    onLoad: function () {

    },

    onShow: function(){
        var height = wx.getSystemInfoSync().windowHeight
        console.log(height)
        if(height > 700){
            this.setData({
                full: true
            })
        }
    },

    video: function (e) {
        console.log(e)
        var id = e.currentTarget.dataset.id
        var title = e.currentTarget.dataset.title
        var text = e.currentTarget.dataset.text
        wx.navigateTo({
            url: '/pages/video/video?id=' + id + '&title=' + title
        })
    },

    onShareAppMessage: function () {
        return {
            title: '同框影业',
            desc: '为了好故事',
            imageUrl: '/images/share.jpg',
            path: '/pages/index/index'
        }
    }
})
