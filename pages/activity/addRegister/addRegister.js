// pages/activity/addRegister/addRegister.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
var app = getApp()
import {
  Register,
  addRegister
} from '../../../service/activity.js'
Page({
  data: {
    act_id: '',
    warnEsg: "",
    isError: false,
    isDisplay: "none",
    index: 0,
    nums: [1, 2, 3, 4, 5]
  },
  bindPickerChange: function (e) {
    console.log('bindPicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  testTel(e) {
    const phone = e.detail.value
    if(!util.checkPhone(phone)){
      this.setData({
        warnMsg: "输入手机号格式不正确",
        isError: true,
        isDisplay: "none"
      })
    }else{
      this.setData({
        isDisplay: "",
        isError: false
      })
    }
  },
  //存疑
  submit(e) {
    if (this.data.isDisplay == "" && isError == false) {
      const data = e.detail.value
      //picker获取的是下标 重新设置为选取到的值
      data.nums = this.data.nums[this.data.index]
      const register = new Register(data)
      //设置报名住户id和报名活动id
      register.hh_id = app.globalData.hh_id
      register.act_id = this.data.act_id
      console.log("提交的报名信息:" )
      console.log(register)
      //提交网络请求
      addRegister(register).then(res => {
        const result = res.data
        if(result.status == 1){
          wx.showToast({
            title: '报名成功',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000)
            }
          })
        }else {
          common.system_busy()
        }
      })
    } else {
      this.setData({
        warnMsg: "请检查输入是否完整/准确",
        isError: true
      })
    }
  },
  onLoad: function (options) {
    //拿到报名活动的id
    this.setData({
      act_id: options.act_id
    })
  }
})