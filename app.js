const AV = require('./utils/av-live-query-weapp-min');
const Util = require('./utils/util');
const { User } = require('utils/av-live-query-weapp-min');
 
AV.init({
  appId: "08FnTvj7J288iBqRM5k2MRrw-MdYXbMMI",
  appKey: "OqHRmajFS3rfzqRnuROfyHf0",
});
 
//app.js
App({
  onLaunch: function () {
    var _this = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
       
      }
    })
    // 获取用户信息
    console.log("并不是每次都会有 获取用户信息")
    console.log(_this.globalData.userInfo)
    wx.getSetting({
      success: res => {
         if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
             
              _this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)

              const { avatarUrl, nickName } = res.userInfo;
              var user = new AV.User();

              if (nickName) {
                user.set({ username: nickName });
                user.set({ password: 'wzskyline' });
                user.set({ avatarUrl: avatarUrl });
              }


              user.save().then((user) => {
                _this.globalData.lcID = user.id;
                wx.showToast({ title: '已保存用户信息', icon: 'success' });
                console.log("app.JS 完成初始化sign:")
                console.log(_this.globalData.lcID)
                console.log(_this.globalData.userInfo)
              }).catch(error => {
                AV.User.logIn(nickName, 'wzskyline').then(function (loginedUser) {
                  console.log(loginedUser)
                  _this.globalData.lcID = loginedUser.id;
                  _this.globalData.userInfo.nickName = loginedUser.attributes.username;
                  _this.globalData.userInfo.avatarUrl = loginedUser.attributes.avatarUrl;
                  console.log("APP.JS 完成初始化login:")
                  console.log(_this.globalData.lcID)
                  console.log(_this.globalData.userInfo)
                }, function (error) {

                });

              });
              
              
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {
     // username:'wzskyline'
    },
    lcID: "", // 5cbd20fcc1fa970008365e88
    noun:null,
  }
})