//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (e) {
          //微信js_code
          that.globalData.js_code = e.code;
          wx.getUserInfo({
            success: function (res) {
              var url = that.globalData.requestUrl + '/task-server/getUserInfo';
              wx.request({
                url: url,
                method: "GET",
                data: {
                  js_code: e.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                success: function (result) {
                  that.globalData.userInfo = result.data;
                }
              })
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    cookieid:"",
    phone:"",
    requestUrl: 'http://localhost:8080/Douding'
    //requestUrl:'https://www.wangjicheng.xyz/Douding'
  }
})
