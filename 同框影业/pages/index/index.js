//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    controls: false,
    autoplay: true,
    play: false,
    deng:false, //灯
    video: false, //视频
    ren: false, //人
    vlog: false, //vlog
    click: false,
    logo: false, //logo

  },
  //事件处理函数
  onLoad: function () {

  },

  onShow: function () {
    var _this = this
    var ren = _this.data.ren
    setTimeout(function () {
      _this.setData({
        deng: true
      })
    },500)

    if(!ren){
      setTimeout(function () {
        _this.setData({
          video: true,
        })
      },1500)
    }
  },

  goTo: function () {
    var _this = this
    setTimeout(function () {
      _this.setData({
        ren: true,
        video: false
      })
    },500)

    setTimeout(function () {
      _this.setData({
        vlog: true
      })
    },1500)

    setTimeout(function () {
      _this.setData({
        click: true
      })
    },3500)

    setTimeout(function () {
      _this.setData({
        logo: true
      })
    },2500)

    /*setTimeout(function () {
      wx.reLaunch({
        url: '../logs/logs'
      })
    },3500)*/
  },

  video: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})
