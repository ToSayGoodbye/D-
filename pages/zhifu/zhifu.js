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
    activePriceIndex:-1,
    youhui:0.00,
    shifu:0.00
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
    that.getYouhui();
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
    that.getYouhui();
  },
  /**
   * 计算优惠
   */
  getYouhui:function(){
    var that = this;
    var num = that.data.num;
    var savePrice = 0.2;
    var youhui = num * savePrice;
    var shifu = that.data.jine - youhui;
    that.setData({
      youhui: youhui.toFixed(2),
      shifu: shifu.toFixed(2)
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
  //调用支付
  toPay: function (e) {
    var that = this;
    var index = that.data.shootIndex;
    wx.redirectTo({
      url: '../success/success?oilName='+that.data.oil.name+'&shootNum='+
        that.data.oil.shoots[index]+'&jine='+that.data.jine+
        '&youhui='+that.data.youhui+'&shifu='+that.data.shifu
    }) 
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
    util.req(url, { js_code: code }, function (res) {
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
      'openid': openId,
      'phone': phone,
      info_id: that.data.oil.id,
      infoNum: that.data.oil.infoNum,
      type: that.data.oil.type,
      shootNum: that.data.oil.shoots[that.data.shootIndex],
      real_price: that.data.shifu,
      save_price: that.data.youhui
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
        if (res.errMsg == "requestPayment:ok"){
          wx.redirectTo({
            url: '../success/success'
          }) 
        }
      },
      'fail': function (res) {
      }
    })
  }

})