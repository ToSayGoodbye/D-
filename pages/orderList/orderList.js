var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    orderList: [],
    hasMore: true,
    hidden: true,
    page: 1,
    pagesize: 10,
    type: 0,
    order: 1,
    querying: false,

    oilId:""
  },
  //事件处理函数
  bindViewTap: function () {
    console.log(app.globalData.userInfo)
  },
  onLoad: function (options) {
    var that = this;
    //获取位置
    wx.getLocation({
      success: function (e) {
        that.setData({
          latitude: e.latitude,
          longitude: e.longitude,
          oilId: options.id
        });
        that.getData();
      }
    })

  },
  //查询列表
  getData: function () {
    var that = this;

    if (that.data.page == 1) {
      that.setData({
        orderList: [],
        hidden: false,
        hasMore: true
      });
    }


    var page = that.data.page++;
    var phone = wx.getStorageSync('doudingphone');
    var url = '/queryOrderList?page=' + (page++) + '&pagesize=' + (that.data.pagesize) + 
    '&phone='+phone;
    if(that.data.oilId!='0'){
      url = url + '&id=' + that.data.oilId;
    }
    util.req(url, null, function (res) {
      var list = res.data.data;
      var length = list.length;
      var more = true;
      if (length == 0 || (length < that.data.pagesize)) {
        more = false;
      }

      that.setData({
        orderList: that.data.orderList.concat(list),
        hasMore: more,
        hidden: true,
        querying: false
      });
    });
  },
  //加载更多
  onReachBottom: function (e) {
    console.log('加载更多');
    var that = this;
    var querying = that.data.querying;
    if (!that.data.hasMore) return;
    if (querying) {
      return;
    }
    that.setData({
      hasRefesh: true,
      querying: true
    });
    that.getData();
  }
})
