//获取应用实例
const app = getApp()
const AV = require('../../../utils/av-live-query-weapp-min'); 
Page({

  /**
   * Page initial data
   */
  data: {
      noun:null,
      url: "https://baike.baidu.com/item/中国", 
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
      this.setData({ 
        noun: app.globalData.noun,
        url: 'https://baike.baidu.com/item/' + app.globalData.noun.noun
      });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})