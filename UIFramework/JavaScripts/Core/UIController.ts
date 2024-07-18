import { TClass, UILayer, UILife, UIPopup } from "./UITypes";

export default abstract class UIController<T extends UIScript> {
    private _closeTime: number = undefined;

    private _layer: UILayer = undefined;

    private _life: UILife = undefined;

    private _openType: UIPopup = undefined;

    private _uiBehavior: T = null;

    private _eventListeners: mw.EventListener[] = null;

    public get openTime() {
        return this._closeTime;
    }

    public get layer() {
        return this._layer;
    }

    public get life() {
        return this._life;
    }

    public get openType() {
        return this._openType;
    }

    public get panel() {
        return this._uiBehavior;
    }

    /**
     * UI控制器
     * @param layer 层级 
     * @param uiClass 控制的面板类 
     * @param life 面板生命周期
     * @param openType 打开类型
     */

    constructor(layer: UILayer, uiClass: TClass<T>, life: UILife = UILife.ONE, openType: UIPopup = UIPopup.NONE) {
        this._layer = layer;
        this._life = life;
        this._openType = openType;
        this._uiBehavior = UIService.create(uiClass);
        this._eventListeners = [];
    }

    /**创建时调用 */
    abstract onCreate(...params: any[]): void;

    /**窗口打开时调用 */
    abstract onOpen(...params: any[]): void;

    /**弹窗关闭时调用 */
    abstract onClose(): void;

    hide() {

    }

    open(...params: any[]) {
        this.onOpen(...params);
    }

    close() {
        for (let i = 0; i < this._eventListeners.length; i++) {
            this._eventListeners[i].disconnect();
        }

        this._eventListeners.length = 0;
        this._closeTime = Math.floor(Date.now() / 1000);
        this.onClose();
    }

    destroy() {
        this.panel.destroy();
    }

    /**
     * 添加事件
     * @param eventName 事件名称
     * @param fn 回调函数
     */
    addEvent(eventName: string, fn: (...params: unknown[]) => void) {
        this._eventListeners.push(Event.addLocalListener(eventName, fn));
    }
}