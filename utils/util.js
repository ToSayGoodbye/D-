var rootDocment = getApp().globalData.requestUrl;

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//不需要token的请求
function req(url, data, callback) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'GET',    //大写
    header: { 'Content-Type': 'application/json' },
    success(res) {
      callback(res)
    }
  })
}
//不需要token的请求
function reqp(url, data, callback) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'POST',    //大写
    header: { 'Content-Type': 'application/json' },
    success(res) {
      callback(res)
    }
  })
}
/**
 * 封装loadding
 */
function loading() {
  wx.showToast({
    title: "加载中",
    duration:200000,
    mask: true,
    icon: "loading"
  });
};

/**
 * 封装hideLoading
 */
function hideLoading() {
  wx.hideToast();
};
 
module.exports = {
  formatTime: formatTime,
  req: req,
  reqp: reqp,
  loading: loading,
  hideLoading: hideLoading
}
