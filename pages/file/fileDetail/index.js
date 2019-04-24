const AV = require('../../../utils/av-live-query-weapp-min'); 
const Util = require('../../../utils/util'); 
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
  item:{
   uid:'1',
   topicID:'1',
   cid:'1',
  
  },   
  msg:null,
  isComment:true,
  commentList:null

  },
  isComment:function(){
    this.setData({ isComment: true });
  },
  isReply:function(e){
    var _this = this;
    console.log(e.currentTarget.dataset.uid )
    console.log(app.globalData.lcID)
    if ( e.currentTarget.dataset.uid == app.globalData.lcID){
      wx.showModal({
        title: '提示',
        content: '是否删除信息',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            var type = e.currentTarget.dataset.type
            var obj = AV.Object.createWithoutData(type, e.currentTarget.dataset.id);
            obj.destroy().then(function (success) {
              console.log('删除成功')
              _this.loadCommentReply()
              // _this.setData({ commentList: commentList })
            }, function (error) {
              console.log('删除失败')
              
            });
           
          } else {
            console.log('用户点击取消')
          }

        }
      }) 
      
    } else {
      // 回复
      var item = {
        uid: e.currentTarget.dataset.uid ,
        username: e.currentTarget.dataset.username ,
        cid: e.currentTarget.dataset.cid ,
      }
      this.setData({
        isComment: false,
        item: item
      })
      console.log(this.data.item)

    }
    
  },
  send:function(){
    var _this = this;
    if (!this.data.msg){
      return;
    }
    if(this.data.isComment){
     console.log(this.data.msg) 
       
      var obj = AV.Object.extend('comment');
      var obj = new obj();
      obj.set('uid', app.globalData.lcID);
      obj.set('username', app.globalData.userInfo.nickName);
      obj.set('msg', this.data.msg);
      obj.set('topicID', app.globalData.noun.id);
      obj.set('state', 0);
      obj.save().then(function (obj) {
        _this.loadCommentReply()
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1000
        })
        console.log('New object created with objectId: ' + obj.id);
        _this.setData({
          msg: null,
        })
      }, function (error) { 
        console.error('Failed to create new object, with error message: ' + error.message);
      });

      
    } else {
      var obj = AV.Object.extend('reply');
      var obj = new obj();
      obj.set('uid', app.globalData.lcID);
      obj.set('msg', this.data.msg);
      obj.set('cid', this.data.item.cid);
      obj.set('username', app.globalData.userInfo.username);
      obj.set('toname', this.data.item.username);
      obj.set('group', this.spliceID(this.data.item.uid, app.globalData.lcID));
      obj.set('state', 0);
      obj.save().then(function (obj) {
        _this.loadCommentReply()
        wx.showToast({
          title: '回复成功',
          icon: 'success',
          duration: 1000
        })
        console.log('New object created with objectId: ' + obj.id);
        _this.setData({
          msg: null,
        })
      }, function (error) { 
        console.error('Failed to create new object, with error message: ' + error.message);
      });
    }

  },
  /*
     * 失焦事件
     **/
  textarea: function (e) {
    console.log(e.detail.value)
    this.setData({
       msg:e.detail.value,
    })
  } ,
  /**
   * Lifecycle function--Called when page load
   */
  spliceID: function (a, b) {
    return a < b ? a + "" + b : b + "" + a
  },
  onLoad: function (options) {
    this.setData({
      uid: app.globalData.lcID,
      noun:app.globalData.noun
    })
    console.log("页面初始化信息:")
    console.log(app.globalData.lcID)
    console.log(this.data.uid)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  
  loadCommentReply(){
    console.log(app.globalData.userInfo)
    
    var _this = this;
    var commentList = []
    const query = new AV.Query('comment').equalTo('topicID', app.globalData.noun.id).ascending('createdAt');
    query.find().then(function (comment) {
      console.log("加载到数据comment:")
      console.log(comment)
      for (var i in comment) {
        var tmp = { uid: comment[i].attributes.uid, username: comment[i].attributes.username, msg: comment[i].attributes.msg, id: comment[i].id, createdAt: Util.formatTime(comment[i].createdAt)}
        
        
        const query = new AV.Query('reply').equalTo('cid', tmp.id).ascending('createdAt');
        var replys = []
        query.find().then(function (reply) {
          console.log("加载到数据reply:")
          console.log(reply)
          var sortReply = reply // .sort(_this.compare("group"));
          console.log(sortReply)
          for (var j in sortReply) {
            var item = { 
              uid: sortReply[j].attributes.uid,
             username: sortReply[j].attributes.username, 
              toname: sortReply[j].attributes.toname, 
             msg: sortReply[j].attributes.msg, 
              id: sortReply[j].id, 
              createdAt: Util.formatTime(sortReply[j].createdAt ) 
              }
            replys.push(item)
          }
          tmp.replys = replys
          commentList.push(tmp)
          _this.setData({ commentList: commentList })
        }) //2 

      }
    })  //1
  },
  onShow: function () {
    this.loadCommentReply()
  },
  compare: function(property){
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 < value2;     // 升序
    }
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