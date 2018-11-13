var app = getApp();
var util = require('../../utils/util.js');
Page({
    data:{
        userInfo:{},
        phone:"",
        infoNum:'0'
    },
    onLoad:function(){
        var that = this;
      var phone = wx.getStorageSync('doudingphone');
      var infoNum = wx.getStorageSync('doudinginfoNum');
      that.setData({
        phone: phone,
        infoNum: infoNum
      })
    },
    onShow:function(){
      app.globalData.fresh += 1;
    },
  //分享
  onShareAppMessage(e) {
    return {
      title: "豆丁加油，加油省不停",
      path: 'pages/home/home' // 路径，传递参数到指定页面。
    }
  },
  logout:function(){
    wx.showModal({
      title: '豆丁加油',
      content: '确定退出登录吗？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (e) {
        if (e.confirm){
          var cookieid = wx.getStorageSync('doudingcoo1kieid');
          wx.clearStorageSync('doudingcoo1kieid');
          var url = "/logout"
          util.req(url, { uuid: cookieid }, function (res) { })
          wx.reLaunch({
            url: '../home/home',
          })
        }
      }
    })
   
  }
})
