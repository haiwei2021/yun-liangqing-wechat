
Component({
    options: {
        styleIsolation: 'shared',
    },
    /**
     * 组件的属性列表
     */
    properties: {
        typeName: {
            type: String
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
        click: function () {
            console.log("component!");
        },
        handleClick(e) {

            this.triggerEvent('handleClick_listDetails', { data: e.currentTarget.dataset })

        },
        // toDetails() {
        //     wx.navigateTo({
        //         url: '/pages/listDetails/listDetails'
        //     })
        //     console.log("toDetails!");
        // },

    }
})