//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    num1:0,
    num2:0,
    count: 0,
    opSymbol:'',
    output: 0,
    Number:[],
    sign:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  //清除输出区域
  clearOutPut:function(){
    this.data.output = 0
    this.data.opSymbol = ''
    this.setData({
      output: this.data.output,
      opSymbol: this.data.opSymbol
    })
  },
  //数字按键
  btnNum(event){
    let output = event.target.dataset.hi
    if (this.data.opSymbol == ''){
      this.data.output = this.data.output + '' + output
      this.setData({
        output: this.data.output.replace(/\b(0+)/gi, ""),
        num1: this.data.output
      })
    }else{
      this.data.output = this.data.output + '' + output
      this.setData({
        output: this.data.output.replace(/\b(0+)/gi, ""),
        num2: this.data.output
      })
    }
    
    
    
    console.info(this.data.num1)
    
  },
  //符号按键
  btnSym(event){
    console.info(event.target.dataset.hi)
    this.data.opSymbol = event.target.dataset.hi
  },
  //正负号
  btnChangeSymbole(){
    this.data.count = this.data.count + 1
    if(this.data.count%2==0){
      this.data.opSymbol = ''
    }else{
      this.data.opSymbol = '-'
    }
    this.setData({
      opSymbol: this.data.opSymbol
    })
  },
  //计算
  btncalc(){
    if (this.data.opSymbol == "+") {
      this.setData({
        output: parseInt(this.data.num1) + parseInt(this.data.num2)
      })
    } else if (this.data.opSymbol == "-") {
      this.setData({
        output: parseInt(this.data.num1) - parseInt(this.data.num2)
      })
    } else if (this.data.opSymbol == "×") {
      this.setData({
        output: parseInt(this.data.num1) * parseInt(this.data.num2)
      })
    } else if (this.data.opSymbol == "÷") {
      this.setData({
        output: parseInt(this.data.num1) / parseInt(this.data.num2)
      })
    }
  }
})
