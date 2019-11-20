// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    poster:'',
    title: '我有一个想法',
    introduction:'视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍视频介绍',
    deng:true, //灯
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var url = ''
    url = 'https://www.chaochuanbo.com/video/' + options.id + '.mp4'
    this.setData({
      url: url,
      poster:'https://www.chaochuanbo.com/video/' + options.id + '.png',
      title: options.title,
      text: options.text,
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this
    let title = _this.data.title
    let id = _this.data.id
    return {
      title: title,
      desc: '为了好故事',
      imageUrl: 'https://www.chaochuanbo.com/video/' + id + '.png',
      path: '/pages/video/video?id=' + id + '&title=' + title
    }
  }
})