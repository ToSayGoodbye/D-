var util = require('../../utils/util.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    oilList:[],
    hasMore:true,
    hidden:true,
    page:1,
    pagesize:10,
    type:0,
    order:1,
    querying: false,

    userInfo: {},
    latitude:"",
    longitude:"",
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['1', '2', '3', '4', '5', '6'],//下拉列表的数据
    selectData2: ['1', '2', '3', '4', '5', '6'],//下拉列表的数据
    selectData3: ['1', '2', '3', '4', '5', '6'],//下拉列表的数据
    index: 0//选择的下拉列表下标
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(app.globalData.userInfo)
  },
  onLoad: function () {
    var that = this;
    //获取位置
    wx.getLocation({
      success: function (e){
        that.setData({
          latitude: e.latitude,
          longitude: e.longitude
        });
        that.getData();
      }
    })
   
  },
  //查询列表
  getData:function(){
    var that = this;

    if (that.data.page == 1) {
      that.setData({
        oilList: [],
        hidden: false,
        hasMore: true
      });
    }
    

    var page = that.data.page++;
    var url = '/queryGasList?page=' + (page++) + '&pagesize=' + (that.data.pagesize) + '&type=' + (that.data.type) + '&order=' + (that.data.order) + '&latitude=' + (that.data.latitude) + '&longitude=' + (that.data.longitude);
    util.req(url,null, function (res) {
      var list =  res.data.data;
      var length = list.length;
      var more = true;
      if (length == 0 || (length < that.data.pagesize)) {
        more = false;
      }
      
      that.setData({
        oilList: that.data.oilList.concat(list),
        hasMore: more,
        hidden: true,
        querying:false
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
  },
  toDetail: function (e) {
    var oil = e.currentTarget.dataset.oil;
    wx.navigateTo({
      url: '/pages/detail/detail?oil=' + JSON.stringify(oil)
    })
  },
  daoHang:function(e){
    var oil = e.currentTarget.dataset.oil;
    console.log(oil);
    wx.openLocation({
      latitude: Number(oil.latitude),
      longitude: Number(oil.longitude),
      name: oil.name,
      address:oil.address,
      scale: 8
    })
  }
})
