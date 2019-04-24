/*
 

https://mp.weixin.qq.com/wxopen/authprofile?action=index&use_role=1&token=460756932&lang=zh_CN

wzskyline@qq.com
WZlove23
https://us.leancloud.cn/data.html?appid=08FnTvj7J288iBqRM5k2MRrw-MdYXbMMI#/_User



domo
http://www.wxapp-union.com/thread-4251-1-1.html
https://leancloud.cn/docs/weapp.html


appId = "08FnTvj7J288iBqRM5k2MRrw-MdYXbMMI"
appKey = "OqHRmajFS3rfzqRnuROfyHf0"
<web-view src="{{url}}"></web-view>



user.save().then((user) => {
                this.globalData.userInfo.lcID = user.id;
                wx.showToast({ title: '已保存用户信息',icon: 'success'});
              }).catch(error => {
                AV.User.logIn(nickName, 'wzskyline').then(function (loginedUser) {
                  console.log(loginedUser)
                  this.globalData.userInfo.lcID = loginedUser.id;
                  this.globalData.userInfo.nickName = loginedUser.attributes.username;
                  this.globalData.userInfo.avatarUrl = loginedUser.attributes.avatarUrl;
                }, function (error) {

                });

              });
https://blog.csdn.net/qq_36901488/article/details/82287832

"tabBar": {
    "borderStyle": "black",
    "position": "bottom",
    "backgroundColor": "#FFFFFF",
    "color": "gray",
    "selectedColor": "#DF5054",
    "list": [
      {
        "pagePath": "pages/file/file",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home.png"
      },
      {
        "pagePath": "pages/index/index",
        "iconPath": "/images/file.png",
        "selectedIconPath": "/images/file.png"
      }

    ],


    https://www.iconfont.cn/











     const query = new AV.Query('file').descending('createdAt');
    query.find().then(function (list) {
      console.log("加载到数据list:")
      console.log(list)
      var arr = []
      for (var i in list) {
        var tmp = {
          pic:" data: image/png;base64,"+ list[i].attributes.base64,
          desc: list[i].attributes.uid,
          height: 0
        }
        images.push(tmp)
      }

      https://github.com/CodingPub/wx-waterfall.git
      https://github.com/zarknight/wx-falls-layout
      https://github.com/icindy/WxMasonry


      评论 与回复评论 在 leancloud
      https://valine.js.org/quickstart.html

       <button style="display: {{uid==commentList[i].uid ? 'none': 'inline'}} background-color:{{btnID==i?'#3090e4':'#fff'}}"
                      class="commentLineBtn" bindtap='isReply'>
                      回复
              </button>

app.json 存在这个就不能进行 跳转。。。。
"tabBar": {
    "borderStyle": "black",
    "position": "bottom",
    "backgroundColor": "#FFFFFF",
    "color": "gray",
    "selectedColor": "#DF5054",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home2.png"
      },
      {
        "pagePath": "pages/file/file",
        "iconPath": "images/file.png",
        "selectedIconPath": "images/file2.png"
      }
    ]
  },


  整合进度:
  页面布局
  index --box -- oneNoun
        --sentence
  files -- file  
  头像不加载 不影响内容

  图片分页加载 与备注信息
  评论回复的构造

  图片与评论的对接    

  系统bug

  1.数据加载量 < 100 
  2.VM10101:1 vdSyncBatch 数据传输长度为 1781954 已经超过最大长度 1048576


  集中的bug 体现
  1. files 头部信息没有显示
  
  3. 图片素材的优化


  2. userinfo 无法加载 后续业务无法对接上
  4. textarea 的替换
  5. swipper 默认显示了空白页面
<button  style="display: {{finish ? 'inline': 'none'}}"
                      class="flashBtn"  bindtap='flashBtn'>刷新图片</button>
*/