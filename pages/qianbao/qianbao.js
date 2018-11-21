// pages/qianbao/qianbao.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
    infoNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var infoNum = options.id;
    var url = '/selectBalance?infoNum='+infoNum
    util.req(url, null, function (res) {
      that.setData({
        balance: res.data.data,
        infoNum:infoNum
      });
    })
  },

  /**
   * 更新价格
   */
  fresh:function(){
    var that = this;
    var infoNum = that.data.infoNum;
    var url = '/selectBalance?infoNum=' + infoNum
    util.req(url, null, function (res) {
      that.setData({
        balance: res.data.data
      });
    })
  },

  /**
   * 去提现
   */
  toTixian:function(){
    wx.redirectTo({
      url: '../tixian/tixian?id='+this.data.infoNum +
        '&balance=' + this.data.balance
    })
  },
  /**
   * 提现记录
   */
  toJilu:function(){
    wx.navigateTo({
      url: '../txJilu/txJilu?infoNum=' + this.data.infoNum
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