// pages/detail/detail.js
var util = require('../../utils/util.js');

var navList = [
  { id: "0", title: "92#" },
  { id: "1", title: "93#" },
  { id: "2", title: "95#" }
];

var shootIndex = [1,2,3,4]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oil:null,
    activeIndex:0,
    tab:'0',
    navList: navList,

    activeShootIndex:'',
    shootIndex: shootIndex
  },

  onTapTag:function(e){
    var that = this;
    var tab = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeIndex: index,
      tab: tab
    });
  },
  onTapShoot: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeShootIndex: index
    });
  },

  //调用支付
  toPay: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
        that.getOpenId(res.code);
      }
    });
  },
  //获取openid
  getOpenId: function (code) {
    var that = this;
    var url = "/getOpenid"
    util.req(url, {js_code: code}, function (res) {
      var openId = res.data;
      that.xiadan(openId);
    })
  },
  //下单
  xiadan: function (openId) {
    console.log(openId);
    var that = this;
    var url = "/wxPay"
    var phone = wx.getStorageSync('doudingphone'); 
    util.req(url, {
       'openid': openId ,
       'phone': phone,
        info_id: that.data.oil.id,
        type: that.data.oil.type,
        shootNum: '3号枪',
        real_price: '1',
        save_price: '20'
       }, function (res) {
      that.requestPayment(res.data);
    })
  },
  //申请支付
  requestPayment: function (obj) {
    console.log(obj);
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': 'MD5',
      'paySign': obj.paySign,
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.oil);
    this.setData({
      oil: JSON.parse(options.oil )
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