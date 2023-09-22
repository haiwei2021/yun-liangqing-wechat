// logs.js
const util = require('../../utils/util.js')

const app = getApp()
const httpRequest = getApp().httpRequest

Page({
    data: {
        list: []
    },
    onLoad() {
        // this.setData({
        //     logs: (wx.getStorageSync('logs') || []).map(log => {
        //         return {
        //             date: util.formatTime(new Date(log)),
        //             timeStamp: log
        //         }
        //     })
        // })

        this.getList()
    },
    onPullDownRefresh: function () {
        console.log('下拉刷新了')
        wx.showNavigationBarLoading()

        // this.setData({

        //     p: 1

        // })

        // this.getData(1, 0)

        setTimeout(() => {
            wx.hideNavigationBarLoading()

            wx.stopPullDownRefresh();  //停止下拉刷新
        }, 3000)



    },
    getList() {
        wx.showLoading({
            title: '加载中',
        })
        let data = {
            pageNo: 1, pageSize: 1000
        }

        let this_ = this

        httpRequest('/lq/house/list', data, 'POST', false).then(res => {
            wx.hideLoading()
            if (res.code == app.globalData.successCode) {

                this_.setData({
                    list: res.data
                })
            }

        }).catch(err => {
            wx.hideLoading()
            if (res.data.code == '998') {

                wx.navigateTo({
                    url: '/pages/index/index'
                })

                return


            }
            console.log(err, '111111111111111')
        })
    },
    // 子组子传递的值
    getSelectValue(e, i) {
        console.log(e, i)
    },
    onClose() {
        this.setData({ show: false });
    },
    // 筛选
    handleSelect(e) {
        if (e && e.detail.type == 'select') {
            this.setData({
                show: true,
                showType: 'right'
            });
        }

        console.log('x', e)
    },
    // 发生时间
    handleTime() { console.log('xxx') },
    startHandle(e) {
        console.log(e, 'x')
        this.setData({
            show: true,
            showType: 'bottom'
        });
    },
})
