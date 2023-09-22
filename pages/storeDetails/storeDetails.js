// logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        logs: [],
        show: false,
        showOverlay: false,
        showOverlayList: [1, 2, 3, 4, 5]
    },
    onLoad() {
        this.setData({

        })
    },
    getSelectValue(e) {
        console.log(e, 'xxxxxxxx------')
    },
    handleSelect(e) {
        if (e && e.detail.type == 'select') {
            this.setData({
                show: true
            })
        } else if (e && e.detail.type == 'tips') {
            this.setData({
                showOverlay: true
            })

        }
        console.log(e, 'xxxxxxzzzzzzzzzzzzzz------')
    },
    handleNoop() {
        this.setData({
            showOverlay: false
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    onClickHide() {
        this.setData({
            showOverlay: false
        })
    },
    onClickItme(e) {
        console.log(e.currentTarget.dataset.type)
        wx.navigateTo({
            url: '/pages/testPoint/testPoint?active=' + e.currentTarget.dataset.type
        })
    }
})
