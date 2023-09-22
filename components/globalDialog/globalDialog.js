

import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Component({
    options: {
        styleIsolation: 'shared',
    },
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            observer: function (newVal, oldVal) {
                console.log('properties-num', newVal)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        type: "组件",
        value1: '0',
        value: '',

    },


    /**
     * 组件的方法列表
     */
    methods: {
        handletap() {
            wx.showModal({
                title: '警告',
                content: '退出当前登录，是否继续？',
                success(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.removeStorageSync('token')
                        wx.reLaunch({
                            url: '/pages/index/index'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })



        },

        // startHandle(e) {
        //     this.triggerEvent('startHandle', { data: e.currentTarget.dataset })

        // },
        // handleClick() {
        //     let i = JSON.stringify(this.properties.item)
        //     wx.navigateTo({
        //         url: '/pages/listDetails/listDetails?dataItem=' + i
        //     })

        // },

    }
})