// pages/code/code.js
var app = getApp();
var countdown = 10;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      codeIsCanClick: true
    })
    countdown = 10;
    return;
  } else {
    that.setData({
      codeIsCanClick: false,
      last_time: countdown
    })
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000
  )
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"111",
    codeIsCanClick:false,
    last_time:"",
    code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: options.phone
    })
    var that = this;
    settime(that)
  },

  /**
 * 点击验证码按钮
 */
  clickCode: function () {
    var that = this;
    settime(that)
  },

  /**
   * 登录
   */
  login:function(){

    var code = this.data.code;
    var myreg = /^\d{4}$/;
    if (code.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 800
      })
      return
    }
    if (!myreg.test(code)) {
      wx.showToast({
        title: '验证码有误',
        icon: 'none',
        duration: 800
      })
      return
    }

    wx.reLaunch({
      url: '../index/index'
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

  },
  saveCode: function (e) {
    this.setData({
      code: e.detail.value
    });
  }
})