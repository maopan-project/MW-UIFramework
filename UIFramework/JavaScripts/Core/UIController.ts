import UIManager from "./UIManager";
import { TClass, UILayer, UILife, UIPopup } from "./UITypes";

export default abstract class UIController<V extends UIScript> {
    private _closeTime: number = undefined;

    private _layer: UILayer = undefined;

    private _life: UILife = undefined;

    private _openType: UIPopup = undefined;

    private _uiClass: TClass<V> = undefined;

    private _uiBehavior: V = null;

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

    public get panelClass() {
        return this._uiClass;
    }

    public get panel() {
        return this._uiBehavior;
    }

    public set panel(v) {
        if (!this._uiBehavior) {
            this._uiBehavior = v;
        }
    }

    /**
     * UI控制器
     * @param layer 层级 
     * @param uiClass 控制的面板类 
     * @param life 面板生命周期
     * @param openType 打开类型
     */

    constructor(layer: UILayer, uiClass: TClass<V>, life: UILife = UILife.ONE, openType: UIPopup = UIPopup.NONE) {
        this._eventListeners = [];

        this._layer = layer;
        this._uiClass = uiClass;
        this._life = life;
        this._openType = openType;
    }

    /**
     * UI创建时调用（只会调用一次）
     */
    abstract onCreate(...params: any[]): void;

    /**
     * UI打开时调用
     */
    abstract onOpen(...params: any[]): void;

    /**
     * UI关闭时调用
     */
    abstract onClose(): void;

    /**
     * UI关闭(内部调用关闭唯一接口)
     */
    protected closeUI() {
        UIManager.ins.close(this);
    }

    /**
     * 管理器调用（禁止手动调用）
     */
    open(...params: any[]) {
        console.log('MW----open ', this._uiClass.name);
        this._uiBehavior.setVisible(true);
        this.onOpen(...params);
    }

    /**
     * 管理器调用（禁止手动调用）
     */
    close() {
        console.log('MW----close ', this._uiClass.name);

        for (let i = 0; i < this._eventListeners.length; i++) {
            this._eventListeners[i].disconnect();
        }

        this._eventListeners.length = 0;
        this._closeTime = Math.floor(Date.now() / 1000);
        this._uiBehavior.setVisible(false);
        this.onClose();
    }

    /**
     * 管理器调用（禁止手动调用）
     */
    destroy() {
        console.log('MW----destroy ', this._uiClass.name);
        this.panel.uiObject.destroyObject();
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