var app = getApp();
Page({
    data:{
        userInfo:{},
        phone:""
    },
    onLoad:function(){
        var that = this;
      var phone = wx.getStorageSync('doudingphone');
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo;
                that.setData({
                    userInfo:{
                        avatar:userInfo.avatarUrl,
                        nickname:userInfo.nickName
                    },
                    phone: phone
                })
            },
            fail:function(err){}
        });
    }
})
