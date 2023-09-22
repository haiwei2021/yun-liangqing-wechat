
Component({
    options: {
        styleIsolation: 'shared',
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // name: {
        //     type: String,
        //     value: ''
        // }
    },

    /**
     * 组件的初始数据
     */
    data: {
        radio: '0',
        radioType: '0',
        envetList: [
            { name: '0', text: '全部', type: 'event' },
            { name: '1', text: '温度', type: 'event' },
            { name: '2', text: '湿度', type: 'event' },
        ],
        typeList: [
            { name: '0', text: '全部', type: 'type' },
            { name: '1', text: '预警', type: 'type' },
            { name: '2', text: '报警', type: 'type' },
        ]
    },


    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            this.setData({
                radio: event.detail,
            });
        },
    }
})