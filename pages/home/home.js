// pages/home/home.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    show:false
  },
  //分享
  onShareAppMessage(e) {
    return {
      title: "豆丁加油，加油省不停",
      path: 'pages/home/home' // 路径，传递参数到指定页面。
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var cookieid = wx.getStorageSync('doudingcoo1kieid');
    if (cookieid != null && cookieid != "") {
      wx.reLaunch({
        url: '../index/index'
      })
    }else{
      this.setData({
        show:true
      })
    }
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
  nextPage:function(){
    var phone = this.data.phone;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone.length==0){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 800
      })
      return
    }
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 800
      })
      return
    }
    wx.navigateTo({
      url: '../code/code?phone=' + phone
    })
    var url = '/getCode?phone=' + phone;
    util.req(url, null, function (res) {})
   
  },
  clearValue: function () {
    wx.removeStorage('cookieid');
  },
  savePhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
    app.globalData.phone = e.detail.value
  }
})