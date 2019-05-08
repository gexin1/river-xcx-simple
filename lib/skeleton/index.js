/**
 * 骨架屛
 * @example
 * 如果要收集请添加 class skeleton     data-skeleton data-skeletonchild 会把值添加到这个class里边
 * <view class='skeleton' data-skeleton='circle' data-skeletonchild='child-3'></view>
 */
// 寻找到的节点列表
const SKELETON_LIST = `SKELETON_LIST`;
// 是否展示骨架
const SKELETON_SHOW = `SKELETON_SHOW`;

class Skeleton {
    /**
     * 阻止事件穿透
     */
    static skeletonPrevent() {}

    constructor(page) {
        this.page = page;
        this.show = true;
    }
    /**
     * 初始化查找所有的节点
     */
    init() {
        const query = wx.createSelectorQuery();
        query.selectAll('.skeleton').boundingClientRect(res => {
            if (res.length > 0 && this.show) {
                this.page.setData({
                    SKELETON_LIST: res
                });
            }
        });
        query.exec();
    }
    /**
     * 关闭
     */
    close() {
        this.show = false;
    }
    /**
     * 打开
     */
    open() {
        this.show = true;
    }

    get show() {
        return this.sk_show;
    }

    set show(flag) {
        this.sk_show = flag;
        this.page.setData({
            SKELETON_SHOW: flag
        });
    }
}

export default Skeleton;
