// logs.js
const util = require('../../utils/util.js')

const app = getApp()
const httpRequest = getApp().httpRequest

Page({
    data: {
        dataItem: {},
        item: {},
        value1: 0,
        option1: [



        ],

        listBotton: [
            {
                "childList": [
                    { "index": 1, "layerList": ["22.5", "24.0", "24.5", "24.0", "23.5"] },
                    { "index": 2, "layerList": ["21.5", "23.0", "22.0", "22.5", "22.0"] },
                    { "index": 3, "layerList": ["21.5", "23.5", "23.5", "23.5", "25.0"] },
                    { "index": 4, "layerList": ["21.5", "23.0", "24.0", "24.0", "24.0"] },
                    { "index": 5, "layerList": ["21.5", "22.5", "23.0", "23.5", "23.0"] },
                    { "index": 6, "layerList": ["23.0", "25.0", "25.0", "25.5", "24.0"] }
                ],
                "rowName": "第1排"
            },

            {
                "childList": [{ "index": 7, "layerList": ["21.5", "18.5", "17.0", "18.5", "21.0"] },
                { "index": 8, "layerList": ["21.0", "21.5", "16.0", "12.0", "15.0"] },
                { "index": 9, "layerList": ["20.5", "14.5", "13.0", "17.0", "19.0"] },
                { "index": 10, "layerList": ["20.0", "16.0", "13.5", "16.5", "19.5"] },
                { "index": 11, "layerList": ["21.0", "16.5", "13.5", "15.0", "19.0"] },
                { "index": 12, "layerList": ["22.5", "23.0", "23.5", "23.0", "24.0"] }],
                "rowName": "第2排"
            },


            {
                "childList": [{ "index": 13, "layerList": ["22.0", "19.5", "17.5", "17.5", "19.5"] },
                { "index": 14, "layerList": ["20.5", "21.0", "14.5", "12.0", "14.5"] }, { "index": 15, "layerList": ["20.5", "15.5", "12.5", "14.5", "18.0"] }, { "index": 16, "layerList": ["21.0", "15.5", "13.0", "14.5", "18.0"] }, { "index": 17, "layerList": ["21.5", "16.0", "12.5", "14.0", "18.0"] }, { "index": 18, "layerList": ["23.5", "26.5", "26.0", "25.0", "26.5"] }],
                "rowName": "第3排"
            },


            { "childList": [{ "index": 19, "layerList": ["22.0", "22.5", "20.0", "19.0", "21.5"] }, { "index": 20, "layerList": ["21.0", "16.5", "13.0", "14.5", "18.0"] }, { "index": 21, "layerList": ["21.0", "15.5", "13.0", "14.5", "18.0"] }, { "index": 22, "layerList": ["21.0", "15.5", "12.5", "14.5", "18.5"] }, { "index": 23, "layerList": ["21.5", "15.5", "12.5", "14.5", "18.5"] }, { "index": 24, "layerList": ["23.0", "25.0", "23.0", "22.0", "22.5"] }], "rowName": "第4排" },

            { "childList": [{ "index": 25, "layerList": ["22.5", "23.0", "23.5", "24.0", "23.5"] }, { "index": 26, "layerList": ["21.5", "17.0", "12.5", "14.0", "18.0"] }, { "index": 27, "layerList": ["21.0", "16.0", "13.0", "14.5", "18.0"] }, { "index": 28, "layerList": ["20.5", "18.5", "13.5", "13.5", "16.5"] }, { "index": 29, "layerList": ["21.0", "16.0", "12.5", "15.0", "18.5"] }, { "index": 30, "layerList": ["21.5", "22.0", "23.5", "21.5", "21.0"] }], "rowName": "第5排" },

            { "childList": [{ "index": 31, "layerList": ["23.5", "27.0", "27.5", "29.5", "31.5"] }, { "index": 32, "layerList": ["21.5", "19.5", "19.0", "20.0", "19.5"] }, { "index": 33, "layerList": ["21.5", "19.0", "18.0", "18.5", "20.0"] }, { "index": 34, "layerList": ["21.5", "19.5", "19.0", "19.0", "19.5"] }, { "index": 35, "layerList": ["21.5", "20.0", "19.5", "19.0", "20.5"] }, { "index": 36, "layerList": ["22.0", "26.0", "26.0", "25.0", "24.0"] }], "rowName": "第6排" }
        ]
    },
    onLoad(e) {
        let dataItem = JSON.parse(e.dataItem)
        this.setData({
            dataItem: dataItem
        })
        wx.setNavigationBarTitle({
            title: dataItem.houseName + '详情展示'
        })

        this.getTime(dataItem)


    },
    handleOpen(e) {
        console.log(e, '11')
        this.setData({
            typeHidden: true
        })
    },
    handleClose(e) {
        console.log(e, '22222222222')
        this.setData({
            typeHidden: false
        })
    },
    onSwitch1Change(e) {
        this.setData({
            value1: e.detail
        })
        this.getList(this.data.dataItem)

    },
    getTime(dataItem) {
        console.log(dataItem, 'xxxxxxxxxxxxxxxxxxxxx111111111111111111111')
        let this_ = this
        let data = {
            houseId: dataItem.houseId
        }
        httpRequest('/lq/house/time', data, 'POST', false).then(res => {

            if (res.code == app.globalData.successCode) {
                let o = []
                res.data.forEach((i, index) => {
                    o.push({ text: i, value: index })
                })

                this_.setData({
                    option1: o
                })
                this_.getList(dataItem)
                // console.log(this.data.value1)
            }

        })
    },

    getList(dataItem) {
        wx.showLoading({
            title: '加载中',
        })
        let data = {
            houseId: dataItem.houseId,
            time: this.data.option1[this.data.value1].text
        }

        let this_ = this

        httpRequest('/lq/house/sensor', data, 'POST', false).then(res => {
            wx.hideLoading()
            if (res.code == app.globalData.successCode) {

                this_.setData({
                    item: res.data
                })
            }

        })
    },
    handleClick_l() {
        wx.showLoading({
            title: '加载中',
        })
        let data = {
            houseId: this.data.dataItem.houseId,
            time: this.data.option1[this.data.value1].text
        }

        let this_ = this

        httpRequest('/lq/house/download', data, 'POST', false).then(res => {
            wx.hideLoading()
            if (res.code == app.globalData.successCode) {
                wx.downloadFile({

                    url: res.data,

                    success: r => {
                        console.log(r, '下载结果')
                        wx.openDocument({
                            filePath: r.tempFilePath,
                            showMenu: true,
                            success: function (res) {
                                console.log('打开文档成功')
                            }
                        })
                        // if (res.statusCode == 200) {

                        //     file.push(res.tempFilePath)

                        //     console.log(file)

                        // }

                    }

                })


            }

        })
    },
    handleClick_listDetails(e) {
        let this_ = this
        wx.navigateTo({
            url: '/pages/testPoint/testPoint?houseId=' + this_.data.item.houseId
        })
    }
})
