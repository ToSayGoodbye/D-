var util = require('../../utils/util.js');

Page({
  onShareAppMessage() {
    
  },

  data: {
    array: ['90#', '92#', '93#', '95#', '97#', '98#', '101#'],
    index: 0,
    date: '2016-09-01',
    time: '12:01',

    oilPrices: [],
    id0:'111'
  },
  /**
   * 修改
   */
  xiugai:function(e){
    var id = e.detail.target.dataset.id;
    var price = e.detail.value.price;
    var saveprice = e.detail.value.sprice;

    var url = '/updatePrice?id=' +id + '&price=' + price+'&saveprice='+saveprice

    util.req(url, null, function (res) {
      if(res.data.code==0){
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 800
        })
      }
    })
  },

  onLoad: function (options) {
    var that = this;

    var url = '/queryGasPrices?infoNum=' + options.infoNum


    util.req(url, null, function (res) {
        console.log(res);
      that.setData({
        oilPrices: res.data.data
      });
    })

  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  }
})
