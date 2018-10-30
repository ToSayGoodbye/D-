// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:""
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
    var cookieid = wx.getStorageSync('doudingcoo0kieid');
    if (cookieid != null && cookieid != "") {
      wx.reLaunch({
        url: '../index/index'
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
    wx.setStorageSync('doudingphone', phone);
    wx.setStorageSync('doudingcoo0kieid', phone);
    app.globalData.phone = phone
    app.globalData.cookieid = phone
    wx.reLaunch({
      url: '../index/index'
    })
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