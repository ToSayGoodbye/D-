var util = require('../../utils/util.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    oilList: [],
    hasMore: true,
    hidden: true,
    page: 1,
    pagesize: 10,
    type: 0,
    order: 0,
    querying: false,

    userInfo: {},
    latitude: "",
    longitude: "",
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    show2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    show3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: '切换地图',//下拉列表的数据
    mapShow: false,
    selectData2: ['距离最近', '价格最低'],//下拉列表的数据
    selectData3: ['92#(93#)', '95#(97#)', '98#','0#柴油','-10#柴油'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    index2: 0,//选择的下拉列表下标
    index3: 0,//选择的下拉列表下标

    clicked: false,
    id: "",
    markers: [],
    item: ""
  },

  markertap(e) {
    var object = e.markerId;
    this.setData({
      item: object,
      clicked: true,
    })
  },
  // 点击下拉显示框
  selectTap() {
    var selectData = "切换列表";
    var mapShow = false;
    if (this.data.selectData == "切换地图") {
      selectData = "切换列表";
      mapShow = true;
    } else {
      selectData = "切换地图";
    }
    this.setData({
      selectData: selectData,
      mapShow: mapShow
    });
  },
  // 点击下拉显示框
  selectTap2() {
    var animation = wx.createAnimation({

      duration: 1000,
      timingFunction: "ease",

    })

    this.animation = animation;
    this.setData({
      animationData: animation.export(),
      show2: !this.data.show2
    });
  },
  // 点击下拉显示框
  selectTap3() {
    this.setData({
      show3: !this.data.show3
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
      page: 1
    });
  },
  // 点击下拉列表
  optionTap2(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index2: Index,
      show2: !this.data.show2,
      page: 1,
      order: Index
    });
    this.getData();
  },
  // 点击下拉列表
  optionTap3(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index3: Index,
      show3: !this.data.show3,
      type: Index,
      page: 1
    });
    this.getData();
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that = this;
    //获取位置
    wx.getLocation({
      success: function (e) {
        that.setData({
          latitude: e.latitude,
          longitude: e.longitude
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
        oilList: [],
        hidden: false,
        hasMore: true
      });
    }


    var page = that.data.page++;
    var url = '/queryGasList?page=' + (page++) + '&pagesize=' + (that.data.pagesize) + '&type=' + (that.data.type) + '&order=' + (that.data.order) + '&latitude=' + (that.data.latitude) + '&longitude=' + (that.data.longitude);
    util.req(url, null, function (res) {
      var list = res.data.data;
      var length = list.length;
      var more = true;
      if (length == 0 || (length < that.data.pagesize)) {
        more = false;
      }

      that.setData({
        oilList: that.data.oilList.concat(list),
        hasMore: more,
        hidden: true,
        querying: false
      });
      var oilList = that.data.oilList;
      var markers = new Array();
      for (var i = 0; i < oilList.length; i++) {
        var marker = new Object();
        var callout = new Object();
        marker.id = oilList[i];
        marker.latitude = oilList[i].latitude;
        marker.longitude = oilList[i].longitude;
        marker.width = 35;
        marker.height = 35;
        marker.iconPath = "/resources/images/jiayou.png";
        callout.content = oilList[i].name;
        callout.color = "#000000";
        callout.fontSize = "16";
        callout.borderRadius = 10;
        callout.bgColor = "#ffffff";
        callout.padding = 3;
        callout.display = "ALWAYS";
        callout.textAlign = "center";
        marker.callout = callout;
        markers[i] = marker;
      }
      that.setData({
        markers: markers,
        clicked: false
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
  daoHang: function (e) {
    var oil = e.currentTarget.dataset.oil;
    console.log(oil);
    wx.openLocation({
      latitude: Number(oil.latitude),
      longitude: Number(oil.longitude),
      name: oil.name,
      address: oil.address,
      scale: 11
    })
  }
})
