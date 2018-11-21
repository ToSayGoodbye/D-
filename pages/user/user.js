var app = getApp();
var util = require('../../utils/util.js');
Page({
    data:{
        userInfo:{},
        phone:"",
        infoNum:'0',
        isHost:'0'
    },
    onLoad:function(){
        var that = this;
      var phone = wx.getStorageSync('doudingphone');
      var infoNum = wx.getStorageSync('doudinginfoNum');
      var isHost = wx.getStorageSync('doudingisHost');
      that.setData({
        phone: phone,
        infoNum: infoNum,
        isHost: isHost
      })
    },
    onShow:function(){
      app.globalData.fresh += 1;
    },
  //分享
  onShareAppMessage(e) {
    return {
      title: "豆丁加油，就是省钱。使用豆丁加油最低八折起！",
      imageUrl: "/resources/images/zhuanfa.png",
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
          wx.clearStorageSync('doudingphone');
          wx.clearStorageSync('doudinginfoNum');
          wx.clearStorageSync('doudingisHost');
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
