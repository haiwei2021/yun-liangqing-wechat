
Component({
    options: {
        styleIsolation: 'shared',
    },
    /**
     * 组件的属性列表
     */
    properties: {
        typeName: {
            type: String,
        }
    },
    observers: {
        'typeName': function (val) {

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        type: true
    },


    /**
     * 组件的方法列表
     */
    methods: {

        handleSelect: function (e) {

            this.triggerEvent('handleSelect', e.currentTarget.dataset)
        },
        //下拉框
        handleChange(e) {
            this.setData({
                value1: e.detail
            })


            this.triggerEvent('getSelectValue', { value: e.detail, type: 'dropdown' })
        },
        //搜索
        onSearch(e) {

            this.triggerEvent('getSelectValue', { value: e.detail, type: 'search' })
        }
    }
})