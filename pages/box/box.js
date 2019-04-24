const AV = require('../../utils/av-live-query-weapp-min');
 
  
//获取应用实例
const app = getApp()

Page({
  data: {
    newNoun: '',
    selectType:' ',
    selectOne: 0,
    typeArr: [],
    navTab: ['系统收录', '我分享的'],
    currentTab: 0,
    allNouns:[],
    myNouns: [], 
    colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"],
    randomColorArr: [],
  },
  
  // 业务函数 部分
  newNoun: function ({ detail: {value }}) {
    // Android 真机上会诡异地触发多次时 value 为空的事件
    if (!value) return;
    this.setData({ newNoun: value});
  },
  select: function (data) {
    var that = this;
    that.setData({ selectOne: data.currentTarget.dataset.id })
    that.setData({ selectType: data.currentTarget.dataset.text})
  },
  addNoun: function () {
    console.log("添加新词")
    console.log(app.globalData.lcID)

    var noun = this.data.newNoun && this.data.newNoun.trim()
    var selectType = this.data.selectType 
    if (!noun) { return; }
    var obj = AV.Object.extend('noun');
    var obj = new obj();
    obj.set('uid', app.globalData.lcID);
    obj.set('noun', noun);
    obj.set('type', selectType);
    obj.set('state', 0);
    obj.save().then(function (obj) {
      wx.showToast({
        title: '新录词语成功',
        icon: 'success',
        duration: 2000
      })
      console.log('New object created with objectId: ' + obj.id);
        
    }, function (error) {
      // 异常处理
      console.error('Failed to create new object, with error message: ' + error.message);
    });

    this.setData({ newNoun: '' });
    this.getMyNouns()
  },
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.id) { return; }
    this.setData({ currentTab: e.currentTarget.dataset.id }) 
  },
  getAllNouns: function () {
    var _this = this;
    const query = new AV.Query('noun')
      .equalTo('state', 1)
      .ascending('createdAt');

    query.find().then(function (list) {
      var arr =[]
      for(var i in list){
        var tmp = list[i].attributes
        tmp.id = list[i].id
        console.log(tmp)
        arr.push(tmp)
      }
      console.log(list)
      _this.setData({ allNouns: arr })
      var labLen = _this.data.allNouns.length,
        colorArr = _this.data.colorArr,
        colorLen = colorArr.length,
        randomColorArr = []; 
      do {
        let random = colorArr[Math.floor(Math.random() * colorLen)];
        randomColorArr.push(random);
        labLen--;
      } while (labLen > 0)
      console.log(randomColorArr) 
      _this.setData({ randomColorArr: randomColorArr });
    }).catch(function (error) {
      
    });
     
   
  },
  getMyNouns: function () {
    var _this = this;
    const query = new AV.Query('noun').equalTo('uid', app.globalData.lcID).ascending('createdAt');

    query.find().then(function (list) {
      console.log("加载到数据list:")
      console.log(list) 
      var arr = []
      for (var i in list) {
        var tmp = list[i].attributes
        console.log(tmp)
        arr.push(tmp)
      }
      _this.setData({ myNouns: arr })
       
    }).catch(function (error) {

    });


  },
 
  showNoun: function (data) { 
    app.globalData.noun =  {
      id: data.currentTarget.dataset.id,
      noun: data.currentTarget.dataset.noun,
      view: data.currentTarget.dataset.view,
    }
    var obj = AV.Object.createWithoutData('noun', data.currentTarget.dataset.id);
    obj.set('view', data.currentTarget.dataset.view+1);
    obj.save()
    console.log(app.globalData.noun )
    this.getAllNouns()
    wx.navigateTo({
      url: './oneNoun/index'
   });
  },

  // 生命周期函数 部分
  onLoad: function () {
    var that = this;
    console.log("新词页面:")
    console.log(app.globalData.userInfo )
    // 查询 config 表进行更新 数组
    const query = new AV.Query('config')
      .equalTo('key','nounTypes')
    .descending('createdAt');

    query.find().then(function (config) { 
      const typeArrStr = config[0].attributes.value
      const typeArr = JSON.parse(typeArrStr)
      that.setData({
        navData: typeArr
      }) 
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
    
  },
  onReady: function () {
    this.getAllNouns() 
    this.getMyNouns()
  },
  deleteMyNoun: function () {
   
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  }
})