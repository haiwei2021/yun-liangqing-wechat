
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
        readonlyValue: true,
        reasonValue: '',
        show: false,
        columns: ['断电', '监测设备更换', '制冷或除湿设备故障', '人为失误', '其他'],
        type: "组件",
        value1: 0,
        value: '',
        warningValue: null,
        handleValue: null,
        remarksValue: null,
        other: null,
        option1: [
            { text: '全部商品', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 },
        ],
    },


    /**
     * 组件的方法列表
     */
    methods: {
        handleSubmit: function () {
            console.log("handleSubmit!", this.data.reasonValue);
        },
        handleClickInput() {
            this.setData({ show: true });
            console.log("handleClickInput!");
        },
        onChange_picker(e) {
            console.log("handleClickInput!", e);
        },
        // 获取输入框的值
        onChange(e) {
            let name = e.currentTarget.dataset.name
            this.setData({
                [name]: e.detail
            })
            console.log("11!", e);
        },
        onClose() {
            this.setData({ show: false });
        },
        onClickIcon() {
            console.log(1)
            this.setData({ show: true });
        },
        handleConfirm(e) {


            this.setData({
                show: false,
                reasonValue: e.detail.value
            });
            console.log(e)
        },
        handleCancel(e) {
            this.setData({ show: false });
            console.log(e)
        },

    }
})