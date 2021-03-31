Page({
    data: {
        num: 0
    },
    oneinput(e) {
        console.log(e.detail.value);
        this.setData({
            num: e.detail.value
        })
    },

    handletap(e) {
        console.log(e);
        const operation = e.currentTarget.dataset.operation;
        this.setData({
            num: this.data.num + operation
        })
    }

})