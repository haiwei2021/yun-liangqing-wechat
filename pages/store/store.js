// logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        show: false
    },
    onLoad() {
        this.setData({

        })
    },
    handleColick(e) {
        console.log('点击', e.currentTarget.dataset.item)
        wx.navigateTo({
            url: '/pages/storeDetails/storeDetails'
        })
    },
    getSelectValue(e) {
        console.log('搜索', e)
    },
    onClose(e) {
        this.setData({
            show: false
        })
    },
    handleSelect(e) {
        if (e && e.detail.type === 'select') {
            this.setData({
                show: true
            })
        }


    }
})
