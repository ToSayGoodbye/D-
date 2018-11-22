// pages/detail/detail.js
var util = require('../../utils/util.js');
var app = getApp();

var navList = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    oil: null,
    activeIndex: 0,
    tab: '0',
    navList: navList,

    activeShootIndex: -1,

    doudingPrice: '',
    marketSavePrice: '',

    background: ['车主189***6902 消费200 节省10元', '车主186***7504 消费250 节省20元'],
    fiveOrders:[],
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    circular: true,
    interval: 4000,
    duration: 1000,
    previousMargin: 0,
    nextMargin: 0
  },
  /**
   * 根据type判断具体油型号
   */
  getType: function (e) {
    console.log(e);
  },
  /**
   * 导航
   */
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
  },

  /**
   * 选择枪事件
   */
  onTapTag: function (e) {
    var that = this;
    var tab = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    that.setData({
      activeIndex: index,
      tab: tab,
      activeShootIndex: -1
    });
    var url = '/selectOilById?infoNum=' + that.data.oil.infoNum + '&type=' + type
    util.req(url, null, function (res) {
      var distance = that.data.oil.distance;//复用距离

      var oil = res.data.data;
      var shoots = oil.shoots.split(',');
      var imgUrl = 'https://www.wangjicheng.xyz/' + oil.imgUrl;
      oil.imgUrl = imgUrl;
      oil.distance = distance;
      oil.shoots = shoots;

      var doudingPrice = Number(oil.price - oil.savePrice).toFixed(2);
      var marketSavePrice = Number(oil.marketPrice - doudingPrice).toFixed(2);

      that.setData({
        oil: oil,
        doudingPrice: doudingPrice,
        marketSavePrice: marketSavePrice
      });
    })
  },
  onTapShoot: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeShootIndex: index
    });
    var oil = JSON.stringify(that.data.oil);
    wx.navigateTo({
      url: '../zhifu/zhifu?oil=' + oil + '&shootIndex=' + index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.globalData.fresh += 1;

    var oil = JSON.parse(options.oil);
    var shoots = oil.shoots.split(',');
    var doudingPrice = Number(oil.price - oil.savePrice).toFixed(2);
    var marketSavePrice = Number(oil.marketPrice - doudingPrice).toFixed(2);
    var that =this;

    var imgUrl = 'https://www.wangjicheng.xyz/' +oil.imgUrl;
    oil.imgUrl = imgUrl;
    oil.shoots = shoots;

    this.setData({
      oil: oil,
      doudingPrice: doudingPrice,
      marketSavePrice: marketSavePrice,
      activeIndex: oil.type
    })
    var infoNum = oil.infoNum;
    var url = '/queryOilTypes?infoNum=' + infoNum
    util.req(url, null, function (res) {
      var navList = res.data.data;
      that.setData({
        navList: navList
      });
    })

    var url = '/queryFiveOrder?infoNum=' + infoNum
    util.req(url, null, function (res) {
      var fiveOrders = res.data.data;
      that.setData({
        fiveOrders: fiveOrders
      });
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
  //分享
  onShareAppMessage(e) {
    return {
      title: "豆丁加油，加油省不停",
      imageUrl: "/resources/images/zhuanfa.png",
      path: 'pages/home/home' // 路径，传递参数到指定页面。
    }
  }
})