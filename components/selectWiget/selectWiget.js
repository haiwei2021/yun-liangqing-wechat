
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
    observers: {
        'typeName': function (val) {
            if (val === 'store') {
                this.setData({
                    value1: '1'
                })
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
        option1: [
            { text: '所有仓库', value: '0' },
            { text: '搜索仓库', value: '1' },
            { text: 'xxxxxxxxxxxxxc仓库', value: '2' },
            { text: 'xxxxxxxxxxxxxxc仓库', value: '3' },
            { text: 'xxxxxxxxxxxc仓库', value: '4' },
            { text: 'xxxxxxxxxxxxxxxxxxxc仓库', value: '5' },
            { text: 'xxxxxxxxxxxc仓库', value: '6' },
            { text: 'xxxxxxxxxxxxxxxc仓库', value: '7' },
            { text: 'xxxxxxxxxxxxxxxxc仓库', value: '8' },
            { text: 'xxxxxxxxxxxxxxxxc仓库', value: '9' },
            { text: 'xxxxxxxxxxxxc仓库', value: '00' },
            { text: 'xxxxxxxxxxxxxxxc仓库', value: '111' },
            { text: 'xxxxxxxxxxxxxxxc仓库', value: '12' },
            { text: 'xxxxxxxxxxxc仓库', value: '32' },
            { text: 'xxxxxxxxxxxxc仓库', value: '42' },
            { text: 'xxxxxxxxxxxxc仓库', value: '52' },
        ],
    },


    /**
     * 组件的方法列表
     */
    methods: {
        click: function () {
            console.log("component!");
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