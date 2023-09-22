// app.js

import Notify from './miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from './miniprogram_npm/@vant/weapp/dialog/dialog';
App({


    onLaunch() {
        // 展示本地存储能力
        // const logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // })
    },
    globalData: {
        userInfo: null,
        baseURL: 'https://wx.lqinfo.top', //接口域名地址，
        successCode: '000',// 接口成功 code
        token: null,
    },
    httpRequest(url, data, method, showToast) {
        let this_ = this
        let header = {
            'content-type': 'application/json',
            'access_token': this_.globalData.token
        }
        // this_.globalData.token

        return new Promise((resolve, reject) => {
            wx.request({
                url: this_.globalData.baseURL + url,
                method: method,
                data: data,
                header: header,
                success(res) {
                    //请求成功
                    console.log(showToast ? '1' : '22', '请求成功', res)
                    if (res.data.code == this_.globalData.successCode) {
                        showToast && wx.showToast({
                            title: res.data.message,
                            icon: 'success',
                            duration: 2000
                        })

                        resolve(res.data);
                    } else {
                        console.log(1, res)
                        if (res.data.code == '998') {
                            wx.removeStorageSync('token')
                            wx.showToast({
                                title: '登录失效,请重新登录',
                                icon: "none",
                                success: () => {
                                    setTimeout(() => {
                                        wx.redirectTo({
                                            url: '/pages/index/index',
                                        })

                                    }, 1200);
                                }
                            })
                        }


                        // Notify(res.data.message || '系统错误');
                        wx.hideLoading()
                        //其他异常
                        reject(res.data);






                    }



                },
                fail(err) {
                    console.log('err', err)
                    // Notify(err.data.message || '系统错误');
                    wx.hideLoading()
                    //请求失败
                    reject(err)
                }
            })
        })
    }
})
