const AV = require('../../utils/av-live-query-weapp-min');
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '记录美好生活',
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('首页页面');
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
 
  getUserInfo: function(e) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.globalData.userInfo = e.detail.userInfo
    

    const { avatarUrl, nickName } = e.detail.userInfo
    var user = new AV.User();

    if (nickName) {
      user.set({ username: nickName });
      user.set({ password: 'wzskyline' });
      user.set({ avatarUrl: avatarUrl });
    }


    user.save().then((user) => {
      app.globalData.lcID = user.id;
      wx.showToast({ title: '已保存用户信息', icon: 'success' });
      console.log("完成初始化sign:")
      console.log(app.globalData.lcID)
      console.log(app.globalData.userInfo)
    }).catch(error => {
      AV.User.logIn(nickName, 'wzskyline').then(function (loginedUser) {
        console.log(loginedUser)
        app.globalData.lcID = loginedUser.id;
        app.globalData.userInfo.nickName = loginedUser.attributes.username;
        app.globalData.userInfo.avatarUrl = loginedUser.attributes.avatarUrl;
        console.log("完成初始化login:")
        console.log(app.globalData.lcID)
        console.log(app.globalData.userInfo)
      }, function (error) {

      });

    });



   
  },
  toBox:function(){

    console.log('page toBox');
    wx.navigateTo({
       url: '../box/box',
    })
  },
  toSentence: function () {

    console.log('page toSentence');
    wx.navigateTo({
      url: '../sentence/index',
    })
  }

})
