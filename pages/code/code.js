// pages/code/code.js
var util = require('../../utils/util.js');
var app = getApp();
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      codeIsCanClick: true
    })
    countdown = 60;
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
    phone:"",
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
    settime(that);
    var phone = taht.data.phone;
    var url = '/getCode?phone=' + phone;
    util.req(url, null, function (res) {})
  },

  /**
   * 登录
   */
  login:function(){

    var code = this.data.code;
    var phone= this.data.phone;
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
        title: '验证码错误',
        icon: 'none',
        duration: 800
      })
      return
    }
    wx.showToast({
      title: "登录中",
      duration: 200000,
      mask: true,
      icon: "loading"
    });
    var url = '/login?phone=' + phone + '&code=' + code;
    util.req(url, null, function (res) {
      console.log(res);
      if (res.data.code == 0) {
        util.hideLoading();
        wx.setStorageSync('doudingphone', phone);
        wx.setStorageSync('doudingcoo1kieid', res.data.data.uuid);
        var infoNum = 0;
        var isHost = 0;
        if (null != res.data.data.oil){
          infoNum = res.data.data.oil.infoNum;
          isHost = res.data.data.oil.isHost;
        }
        wx.setStorageSync('doudinginfoNum', infoNum);
        wx.setStorageSync('doudingisHost', isHost);
        wx.reLaunch({
          url: '../index/index'
        })
      } else {
        util.hideLoading();
        var title = res.data.msg;
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 800
        })
        return
      }
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