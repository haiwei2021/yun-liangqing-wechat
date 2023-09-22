
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

        startHandle(e) {
            this.triggerEvent('startHandle', { data: e.currentTarget.dataset })

        },
        handleClick() {
            let i = JSON.stringify(this.properties.item)
            wx.navigateTo({
                url: '/pages/listDetails/listDetails?dataItem=' + i
            })

        },

    }
})