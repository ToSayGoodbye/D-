// pages/tixian/tixian.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oil:null,
    jine:'',
    shootIndex:'',
    num:0,
    activePriceIndex:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var oil = JSON.parse(options.oil);
    var shootIndex = options.shootIndex;
    that.setData({
      shootIndex: shootIndex,
      oil: oil
    });
  },

  /**
   * 监控输入框
   */
  ifChange:function(e){
    var value = e.detail.value;
    var that =this;
    var price = 7.16;
    var num = value/price;
    that.setData({
      jine: value,
      num: num.toFixed(2)
    })
  },

  onTapPrice: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var value = e.currentTarget.dataset.price;
    var price = 7.16;
    var num = value / price;
    that.setData({
      activePriceIndex: index,
      jine: value,
      num: num.toFixed(2)
    });
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