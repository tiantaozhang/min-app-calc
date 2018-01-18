// pages/calc/.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      count: 0,
      screenData: 0,
      idb:"back",
      idc:"clear",
      idt:"toggle",
      idadd:"＋",
      id9:"9",
      id8:"8",
      id7:"7",
      idsub:"－",
      id6:"6",
      id5:"5",
      id4:"4",
      idx:"×",
      id3:"3",
      id2:"2",
      id1:"1",
      iddiv:"÷",
      id0:"0",
      idd:".",
      ide:"＝",
      iconType: "waiting_circle",
      arr: [],
      operaSymbo: {"＋":"+","－":"-","×":"*","÷":"/",".":"."},
      logs: []
  },

  clickBtn: function (event) {
    var id = event.target.id;
    console.log(id);
    switch (id) {
        case this.data.idb:   //back
            var data = this.data.screenData;
            if (data == "0") {
                return ;
            }
            data = data.substring(0, data.length - 1);
            if (data == "" || data == "-") {
                data = "0";
            }
            this.setData({"screenData": data});
            this.data.arr.pop();
            break;
        case this.data.idc:     //清屏C
            this.setData({"screenData": "0"});
            this.data.arr.length = 0;
            break;
        case this.data.ide:
            var data = this.data.screenData;
            if(data == "0"){
                return;
            }
            var lastWord = data.charAt(data.length);
            if (isNaN(lastWord)) {
                return;
            }

            var num = "";
            var arr = this.data.arr;
            var optarr = [];

            for (var i in arr) {
                if(isNaN(arr[i]) == false || arr[i] == this.data.idd) {
                    num += arr[i];
                } else{
                    optarr.push(num);
                    optarr.push(arr[i]);
                    num = "";
                }
            }
            // 最后一个
            optarr.push(Number(num));
            var result = Number(optarr[0]) * 1.0;
            console.log(optarr);
            for(var i=1; i<optarr.length; i++) {
                if (isNaN(optarr[i])) {
                    console.log(optarr[i]);
                    switch (optarr[i]) {
                        case this.data.idadd:
                            result += Number(optarr[i+1]);
                            break;
                        case this.data.idsub:
                            result -= Number(optarr[i+1]);
                            break;
                        case this.data.idx:
                            result *= Number(optarr[i+1]);
                            break;
                        case this.data.iddiv:
                            result /= Number(optarr[i+1]);
                            break;
                    }
                }
            }
            this.data.logs.push(data + '=' + result);
            wx.setStorageSync('calclogs', this.data.logs);

            this.data.arr.length = 0;
            this.data.arr.push(result);
            if(result == 520) {
                this.setData({"screenData":  "我爱你"});
            } else{
                this.setData({"screenData": result + ""});
            }
            break;
        default:
            var sd = this.data.screenData;
            var data;
            if (sd == 0) {
              data = id;
            } else {
              data = sd + id;
            }
            this.setData({'screenData': data})
            this.data.arr.push(id);
            console.log(this.data.arr);
            break;

    }

  },

  history: function () {
      wx.navigateTo({
          url: '../history/history'
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})