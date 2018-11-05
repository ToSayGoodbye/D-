var app = getApp();
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
    }
})
