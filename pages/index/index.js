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
    order:0,
    querying: false,

    userInfo: {},
    latitude:"",
    longitude:"",
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    show2: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    show3: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:'切换地图',//下拉列表的数据
    mapShow:false,
    selectData2: ['距离最近', '价格最低'],//下拉列表的数据
    selectData3: ['#92', '#93', '#95'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    index2: 0,//选择的下拉列表下标
    index3: 0,//选择的下拉列表下标

    clicked: false,
    id: "",
    markers: [{
      id: '{"id":1,"name":"来往商贸","imgUrl":"","address":"北京市东城区东长安街","type":"0","price":"7.47","order_count":"1","distance":"8.4Km","latitude":"39.908823","longitude":"116.39747"}',
      latitude: 39.85856,
      longitude: 116.28616,
      width: 35,
      height: 35,
      iconPath: "/resources/images/jiayou.png",
      callout: {
        content: "来往商贸\n7.74/升",
        color: "#000000",
        fontSize: "16",
        borderRadius: 10,
        bgColor: "#ffffff",
        padding: 3,
        display: "ALWAYS",
        textAlign: "center"
      },
    }, {
        id: '{"id":2,"name":"中国石油","imgUrl":"","address":"北京市东城区东长安街","type":"0","price":"7.47","order_count":"1","distance":"11.0Km","latitude":"39.908823","longitude":"116.39747"}',
      latitude: 39.908823,
      longitude: 116.39747,
      width: 35,
      height: 35,
      iconPath: "/resources/images/jiayou.png",
      callout: {
        content: "中国石油\n7.74/升",
        color: "#000000",
        fontSize: "16",
        borderRadius: 10,
        bgColor: "#ffffff",
        padding: 3,
        display: "ALWAYS",
        textAlign: "center"
      },
    }],
    item:""
  },

  markertap(e) {
    var object = JSON.parse(e.markerId);
    this.setData({
      item: object,
      clicked: true,
    })
  },
  // 点击下拉显示框
  selectTap() {
    var selectData = "切换列表";
    var mapShow = false;
    if (this.data.selectData == "切换地图"){
      selectData = "切换列表";
      mapShow = true;
    }else{
      selectData = "切换地图";
    }
    this.setData({
      selectData: selectData,
      mapShow: mapShow
    });
  },
  // 点击下拉显示框
  selectTap2() {
    this.setData({
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
      page:1
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
  bindViewTap: function() {
   
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
