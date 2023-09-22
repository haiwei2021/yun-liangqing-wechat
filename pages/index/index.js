// index.js
// 获取应用实例
const app = getApp()
const httpRequest = getApp().httpRequest

import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
    data: {
        userName: '',
        password: '',
        checked: false,
    },


    onChangeUser(event) {

        this.setData({
            userName: event.detail
        })
    },

    onChangePassword(event) {
        this.setData({
            password: event.detail
        })
    },
    onChange(event) {


        this.setData({
            checked: event.detail
        })
    },
    // 事件处理函数
    handleLog(token, source) {
        console.log(token, 'xxxxxxxxxxxxxxxxxx')
        if (token && source === 'token') {
            app.globalData.token = token
            wx.navigateTo({
                url: '/pages/warning/warning'
            })
        }

        if (!this.data.userName || !this.data.password) {
            return
        }
        let data = {
            userName: this.data.userName, password: this.data.password
        }

        httpRequest('/lq/login', data, 'POST', false).then(res => {

            if (res.code == app.globalData.successCode) {
                app.globalData.token = res.data
                wx.setStorageSync('token', res.data)

                wx.navigateTo({
                    url: '/pages/warning/warning'
                })
            }

        }).catch(err => {
            Notify(err.message)
            console.log(err, 'xxx')
        })


    },
    onLoad() {
        let token = null
        token = wx.getStorageSync('token')


        this.handleLog(token, 'token')

    },
    onShow() {


    },
    locationStorageSync() {
        if (!this.data.checked) {

            wx.removeStorageSync('userInfoData')
            return
        } else {

            let data_ = {
                user: this.data.user,
                password: this.data.password,
                checked: this.data.checked
            }
            wx.setStorageSync('userInfoData', data_)
        }


    },


})
