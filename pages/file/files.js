const util = require('../../utils/util.js');
const AV = require('../../utils/av-live-query-weapp-min');
var app = getApp()
Page({
  data: {
    /**
         * 页面配置
         */
    winWidth: 0,
    winHeight: 0, 
    datalist: [  ], 
    page: 0,
    finish:false,
    imagesHeightList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    /**
    * 获取系统信息
    */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    that.loadData();
  },
  loadData: function () {
    /**
    * 发送请求数据
    */
    var that = this
 
    if(!this.data.finish){
    var res =   [{ "stories": [
     // { "image": "http:\/\/pic3.zhimg.com\/375028026e5fbe10996f37a2f50f74b2.jpg", "id": 8950487,   "desc": "其次的" }, 
      ]
  }]  
    const query = new AV.Query('file').descending('createdAt');
    const size = 1;
      query.limit(size);// 最多返回 size 条结果
      query.skip(this.data.page * size);// 跳过 n 条结果
      query.find().then(function (list) {
          console.log("加载到数据list:")
          console.log(list)
      var arr = []
      for (var i in list) {
        var tmp = {
          image: "data:image/png;base64," + list[i].attributes.base64,
          desc: list[i].attributes.desc,
          id: list[i].id,
        }
        res[0].stories.push(tmp)
      }
      var finish = false;

      if (list.length < size){
        finish = true;
      }
      var list = that.data.datalist;

      // 然后重新写入数据
      that.setData({
        datalist: list.concat(res),
        page: that.data.page + 1  ,    // 统计加载次数
        finish: finish,

      });

    })  
  
    } else { // 没有数据了
      that.setData({
        hothidden: false
      });

    }
  },
  toFilePage :function(){
    console.log(1)

    wx.navigateTo({
      url: './file'
    });
  },
  flashBtn: function () {
    this.setData({ 
      winWidth: 0,
      winHeight: 0,
      datalist: [],
      page: 0,
      finish: false});
    this.loadData()
  },
  /**
     * 事件处理
     * scrolltolower 自动加载更多
     */
  scrolltolower: function (e) {

    var that = this;

    // 加载更多 loading
    that.setData({
      hothidden: true
    })
 
    this.loadData() 
  },
   
   
  fileDetail: function (data) { 
  
    app.globalData.noun = {
      desc: data.currentTarget.dataset.desc,
      src: data.currentTarget.dataset.src,
      id: data.currentTarget.dataset.id,
    }
     

    wx.navigateTo({
      url: './fileDetail/index'
    });
  },
  WxMasonryImageLoad: function (e) {
    var that = this;
 
  }

})
