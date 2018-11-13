// pages/tixian/tixian.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,
    infoNum: '',

    jine:0,
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var infoNum = options.id;
    var balance = options.balance;
    that.setData({
      balance: balance,
      infoNum: infoNum
    });
    that.getOpenid();
  },

  /**
   * 提现
   */
  tixian:function(){
    var that = this;
    var jine = that.data.jine;
    var balance = that.data.balance;
    console.log('balance==' + balance);
    if(jine ==  0||jine == ''){
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
        duration: 800
      })
      return
    }
    var a = /^[0-9]*(\.[0-9]*)?$/;
    if (!a.test(jine)) {
      wx.showToast({
        title: '请输入正确金额',
        icon: 'none',
        duration: 800
      })
      return;
    }
    if (jine > Number(balance)){
      wx.showToast({
        title: '超出可用余额',
        icon: 'none',
        duration: 800
      })
      return
    }
    var infoNum = that.data.infoNum;
    var openid = that.data.openid;
    var phone = wx.getStorageSync('doudingphone');
    var url = '/wxPaySome';
    util.reqp(url, {
      infoNum: infoNum,
      openid: openid,
      jine: jine,
      phone: phone
    }, function (res) {
     if(res.data.code == 0){
       wx.showToast({
         title: '申请提现成功',
         icon: 'success',
         duration: 800
       })
       wx.redirectTo({
         url: '../chenggong/chenggong'
       }) 
     }else{
       var errorMsg = res.data.msg;
       wx.showToast({
         title: errorMsg,
         icon: 'none',
         duration: 1000
       })
     }
    })
  },

  getOpenid:function(){
    var that = this;
      //调用登录接口
      wx.login({
        success: function (e) {
              var url = '/getOpenid?js_code='+e.code;
              util.req(url, null, function (res) {
                console.log(res);
                that.setData({
                  openid: res.data
                });
              })
        }
      });
  },

  /**
   * 监控输入框
   */
  ifChange:function(e){
    var value = e.detail.value;
    var that =this;
    that.setData({
      jine: value
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