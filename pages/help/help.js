//help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clicked:false,
    id:"",
    oilList: [],

    latitude: "",
    longitude: "",
    markers: [{
      id: '{"id":1,"name":"来往商贸","imgUrl":"","address":"北京市东城区东长安街","type":"0","price":"7.47","order_count":"1","distance":"11.0Km","latitude":"39.908823","longitude":"116.39747"}',
      latitude: 39.85856,
      longitude: 116.28616,
      width: 35,
      height: 35,
      iconPath: "/resources/images/jiayou.png",
      callout: {
        content: "A加油站\n7.74/升", 
        color: "#000000",
        fontSize: "16",
        borderRadius: 10,
        bgColor: "#ffffff",
        padding: 3,
        display: "ALWAYS",
        textAlign:"center"
      },
    }, {
        id: "2",
        latitude: 39.908823,
        longitude: 116.39747,
        width: 35,
        height: 35,
        iconPath: "/resources/images/jiayou.png",
        callout: {
          content: "B加油站\n7.74/升",
          color: "#000000",
          fontSize: "16",
          borderRadius: 10,
          bgColor: "#ffffff",
          padding: 3,
          display: "ALWAYS",
          textAlign: "center"
        },
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }

    })
  },

  markertap(e) {  
    var object = JSON.parse(e.markerId);
    var list = [object];

    this.setData({
      oilList: list,
      clicked: true,
    })
  },
  controltap(e) {
    console.log(e.controlId)
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
      scale: 8
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