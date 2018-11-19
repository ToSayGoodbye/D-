// pages/fankui/fankui.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //提交保存
  formSubmit: function (e) {

    var that = this;
    let { content } = e.detail.value;
    console.log(content);
    var phone = wx.getStorageSync("doudingphone");
    if(content == ""){
      wx.showToast({
        title: '请您填写意见后再提交!',
        icon: 'none',
        duration: 1000
      })
      return
    }
    var url = "/addMessage?content="+content+"&phone="+phone
    util.req(url, null, function (res) {
      if (res.data.code == 0) {
        wx.redirectTo({
          url: '../chenggong/chenggong?tab=1'
        })
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

  }
})