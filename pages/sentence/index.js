const AV = require('../../utils/av-live-query-weapp-min');
const Util = require('../../utils/util'); 
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    list:[],
    wordColor: [ ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("完成初始化:")
    console.log(app.globalData.lcID)
    console.log(app.globalData.userInfo)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  loadData: function () {
    var _this = this;
    const query = new AV.Query('sentence').ascending('createdAt');
    
    var colors = ["LightPink", "Pink", "Crimson", "LavenderBlush", "PaleVioletRed", "HotPink", "DeepPink", "MediumVioletRed", "Orchid", "Thistle", "plum", "Violet", "Magenta", "Fuchsia", "MediumOrchid", "DarkVoilet", "DarkOrchid", "MediumPurple", "MediumSlateBlue", "SlateBlue", "Lavender", "GhostWhite", "RoyalBlue", "CornflowerBlue", "LightSteelBlue", "DoderBlue", "AliceBlue", "SteelBlue", "LightSkyBlue", "SkyBlue", "DeepSkyBlue", "LightBLue", "PowDerBlue", "CadetBlue", "Azure", "LightCyan", "PaleTurquoise", "Cyan", "Aqua", "Teal", "MediumTurquoise", "LightSeaGreen", "Turquoise", "MediumAquamarine", "MediumSpringGreen", "MintCream", "SpringGreen", "Honeydew", "LightGreen", "PaleGreen", "DarkSeaGreen", "LimeGreen", "Lime", "Chartreuse", "LawnGreen", "GreenYellow", "Beige", "LightGoldenrodYellow", "Ivory", "LightYellow", "DarkKhaki", "LemonChiffon", "Khaki", "FloralWhite", "OldLace", "Wheat", "Moccasin", "Orange", "PapayaWhip", "BlanchedAlmond", "NavajoWhite", "AntiqueWhite", "Tan", "Linen", "LightSalmon", "Coral", "OrangeRed", "DarkSalmon", "Tomato", "MistyRose", "Salmon", "Snow", "LightCoral", "RosyBrown", "IndianRed", "White", "WhiteSmoke", "Gainsboro", "LightGrey", "Silver"]

    var list = []
    query.find().then(function (list) {
      console.log("加载到数据 sentence list:")
      console.log(list)
    
      for (var j in list) {
        var item = {
          uid: list[j].attributes.uid,
          s1: list[j].attributes.s1,
          s2: list[j].attributes.s2,
          s3: list[j].attributes.s3,
          id: list[j].id,
          createdAt: Util.formatTime(list[j].createdAt)
        }
        list.push(item)
      }
       var wordColor = []
       for(var i in list){
         var color1 = colors[Math.floor(Math.random() * colors.length)];
         var color2 = colors[Math.floor(Math.random() * colors.length)];
         var color3 = colors[Math.floor(Math.random() * colors.length)];
         wordColor.push(color1)
         wordColor.push(color2)
         wordColor.push(color3)
       }
        _this.setData({ list: list, wordColor: wordColor })
    }) 
  },
   
  save: function () {
    var _this = this
    var arr = [this.data.s1, this.data.s2, this.data.s3]
    if (arr.join("")){
      var obj = AV.Object.extend('sentence');
      var obj = new obj();
      obj.set('uid', app.globalData.lcID);
      obj.set('username', app.globalData.userInfo.nickName);
      obj.set('s1', arr[0]);
      obj.set('s2', arr[1]);
      obj.set('s3', arr[2]);
      obj.set('state', 0);
      obj.save().then(function (obj) {
        _this.setData({ s1: null, s2: null,s3: null, })
        wx.showToast({
          title: '新录句子成功',
          icon: 'success',
          duration: 2000
        })
        
        console.log('New object created with objectId: ' + obj.id);
      }, function (error) {
        console.error('Failed to create new object, with error message: ' + error.message);
      });
    }
  },
  textarea1: function (e) {
    this.setData({ s1: e.detail.value, })
  },
  textarea2: function (e) {
    this.setData({ s2: e.detail.value, })
  },
  textarea3: function (e) {
    this.setData({ s3: e.detail.value, })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
     this.loadData()
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