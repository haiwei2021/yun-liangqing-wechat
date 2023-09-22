import uCharts from '../../utils/u-charts.js';
const app = getApp()
const httpRequest = getApp().httpRequest
var _self;

var canvaLineA = null;
Page({
    data: {
        typeHidden: false,
        cWidth: '',
        cHeight: '',
        value1: 5,
        houseId: '',
        option1: [

            // { text: '记录个数1', value: 1 },
            // { text: '记录个数2', value: 2 },
            // { text: '记录个数3', value: 3 },
            // { text: '记录个数4', value: 4 },
            // { text: '记录个数5', value: 5 },

            // { text: '记录个数1', value: 6 },
            // { text: '记录个数2', value: 7 },
            // { text: '记录个数3', value: 8 },
            // { text: '记录个数4', value: 9 },
            // { text: '记录个数5', value: 10 },

        ],
    },
    onLoad: function (options) {
        _self = this;
        this.cWidth = wx.getSystemInfoSync().windowWidth;
        this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;

        let o = []

        for (let i = 1; i < 21; i++) {
            o.push({ text: '记录个数' + i, value: i })
        }
        this.setData({
            option1: o,
            houseId: options.houseId
        })
        console.log(this.data.option1)
        // this.getServerData();
        this.getList(options.houseId)
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
        this.getList(this.data.houseId)
        console.log(e, '111')
    },
    getList(houseId) {
        wx.showLoading({
            title: '加载中',
        })
        let data = {
            houseId: houseId,
            "num": this.data.value1
        }

        let this_ = this

        httpRequest('/lq/house/history', data, 'POST', false).then(res => {
            wx.hideLoading()
            console.log(res.data.columnX)
            if (res.code == app.globalData.successCode) {
                let d = {

                    data: res.data.windTemList,

                    legendShape: "rect",

                    name: "外温",
                    pointShape: "circle",
                    show: true,

                }
                let dd = {

                    data: res.data.houseTemList,

                    legendShape: "rect",

                    name: "仓温",
                    pointShape: "circle",
                    show: true,

                }
                let ddd = {

                    data: res.data.averageList,

                    legendShape: "rect",

                    name: "平均温",
                    pointShape: "circle",
                    show: true,

                }
                let a = [d, dd, ddd]


                this_.setData({
                    categories: res.data.columnX,
                    series: [d, dd, ddd]
                })

                let LineA = { categories: [], series: [] };
                LineA.categories = res.data.columnX || ["2012", "2013", "2014", "2015", "2016", "2017"]
                LineA.series = [
                    {
                        area: [58.94999999999999, 182.33333333333331, 129.64999999999998, 193.33333333333331],
                        color: "#1890FF",
                        data: res.data.windTemList,
                        index: 0,
                        legendShape: "line",
                        linearIndex: 0,
                        name: "外温",
                        pointShape: "circle",
                        show: true,
                        type: "line"
                    },

                    {
                        area: [129.64999999999998, 182.33333333333331, 200.34999999999997, 193.33333333333331],
                        color: "#91CB74",
                        data: res.data.houseTemList,
                        index: 0,
                        legendShape: "line",
                        linearIndex: 1,
                        name: "仓温",
                        pointShape: "circle",
                        show: true,
                        type: "line"
                    },

                    {
                        area: [200.34999999999997, 182.33333333333331, 271.04999999999995, 193.33333333333331],
                        color: "#FAC858",
                        data: res.data.averageList,
                        index: 0,
                        legendShape: "line",
                        linearIndex: 2,
                        name: "平均温",
                        pointShape: "circle",
                        show: true,
                        type: "line"
                    }
                ];
                console.log(LineA)
                _self.showLineA("canvasLineA", LineA);

                // this.showColumn('canvasColumn', chartData)
            }

        })
    },
    getServerData: function () {
        wx.request({
            url: 'https://www.ucharts.cn/data.json',
            data: {
            },
            success: function (res) {
                console.log(res.data.data)
                let Column = { categories: [], series: [] };
                Column.categories = res.data.data.ColumnB.categories;
                Column.series = res.data.data.ColumnB.series;
                //自定义标签颜色和字体大小
                Column.series[1].textColor = 'red';
                Column.series[1].textSize = 18;
                let LineA = { categories: [], series: [] };
                //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                LineA.categories = res.data.data.LineA.categories;
                LineA.series = res.data.data.LineA.series;



                console.log('LineA', LineA)

                // _self.showLineA("canvasLineA", LineA);

            },
            fail: () => {
                console.log("请点击右上角【详情】，启用不校验合法域名");
            },
        });
    },


    showLineA(canvasId, chartData) {
        console.log('数据格式', chartData)
        let ctx = wx.createCanvasContext(canvasId, this);
        canvaLineA = new uCharts({
            type: 'line',
            context: ctx,
            fontSize: 11,
            legend: true,
            dataLabel: true,
            dataPointShape: true,
            background: '#FFFFFF',
            pixelRatio: 1,
            categories: chartData.categories,
            series: chartData.series,
            animation: true,
            enableScroll: true,//开启图表拖拽功能
            xAxis: {
                disableGrid: false,
                type: 'grid',
                gridType: 'dash',
                itemCount: 4,
                scrollShow: true,
                scrollAlign: 'left',
                rotateLabel: true, //X轴刻度（数值）标签是否旋转（仅在文案超过单屏宽度时有效）
                //scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
                //scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
            },
            yAxis: {
                //disabled:true
                // gridType: 'dash',
                // splitNumber: 8,
                // min: 10,
                // max: 180,
                // formatter: (val) => { return val.toFixed(0) + '元' }//如不写此方法，Y轴刻度默认保留两位小数
            },
            width: _self.cWidth,
            height: _self.cHeight,
            extra: {
                line: {
                    type: 'straight'
                }
            },
        });

    },
    touchLineA(e) {
        canvaLineA.scrollStart(e);
    },
    moveLineA(e) {
        canvaLineA.scroll(e);
    },
    touchEndLineA(e) {
        canvaLineA.scrollEnd(e);
        //下面是toolTip事件，如果滚动后不需要显示，可不填写
        canvaLineA.showToolTip(e, {
            formatter: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },

})
