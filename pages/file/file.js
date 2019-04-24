const AV = require('../../utils/av-live-query-weapp-min');



//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
    base64:null,
    desc:null,
    uping:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //添加上传图片

  textarea: function (e) {
    console.log(e.detail.value)
    this.setData({
      desc: e.detail.value,
    })
  },
  chooseImageTap: function () {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        var base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
        _this.setData({
          base64: base64
        });
      },
    })
  },
  upFile:function(){
    var _this = this
    var base64 = this.data.base64
    var desc = this.data.desc
    if ( !desc ){
      wx.showToast({
        title: '描述一下哦', 
        icon: 'loading', //warn
        duration: 1500
      })
      return;
    }
    if (!base64 ) {
      wx.showToast({
        title: '选图片哦',
        icon: 'loading', //warn
        duration: 1500
      })
      return;
    }
    wx.showToast({
      title: '上传中...',
      icon: 'loading', //warn
      duration: 2000
    }) 
    if(!this.data.uping){
      this.setData({ uping: true  })
      var obj = AV.Object.extend('file');
      var obj = new obj();
      obj.set('uid', app.globalData.lcID);
      obj.set('base64', base64);
      obj.set('desc', desc);
      obj.save().then(function (obj) {
        wx.showToast({
          title: '上传图片成功',
          icon: 'success',
          duration: 2000
        })
        console.log('New object created with objectId: ' + obj.id);
        _this.setData({ 
          base64:null,
          desc: null,
        uping: false })
      }, function (error) {
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });
      this.setData({ uping: false  })
    }
    
  }, 
})