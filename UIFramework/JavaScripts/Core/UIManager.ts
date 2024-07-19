import UIController from "./UIController";
import { TController, UILayer, UILife } from "./UITypes";

export default class UIManager {
    private static _ins: UIManager = null;

    private constructor() {
        setInterval(() => {
            this.update();
        }, 1000);
    }

    public static get ins() {
        if (!this._ins) {
            this._ins = new UIManager();
        }

        return this._ins;
    }

    private _uiList: Map<string, TController> = new Map();

    private _layerList: Map<number, TController[]> = new Map();

    private _layerContent: Map<number, mw.Canvas> = new Map();

    private _uiCloseList: Set<TController> = new Set();

    /**
     * 预加载（编辑器暂时用不到）
     */
    public load() {

    }

    /**
     * 打开一个UI控制器
     * @param cls UI控制类
     * @param params UI打开需要携带的参数
     * @returns 
     */
    public open<T extends TController>(cls: { new(): T, prototype: T }, ...params: Parameters<typeof cls.prototype['onOpen']>) {
        let uiIns = this._uiList.get(cls.name);
        if (uiIns) {
            if (uiIns.panel.visible) {
                console.log(`Panel --- ${cls.name} is opening`);
                return;
            }

            uiIns.open(...params);
        } else {
            let controller = new cls();

            let panel = UIService.create(controller.panelClass);
            if (!panel) {
                console.log(`Panel --- ${cls.name} create fail`);
                return;
            }

            let content = this.getContent(controller.layer);
            content.addChild(panel.uiObject);
            controller.panel = panel;

            this._uiList.set(cls.name, controller);
            let arr = this._layerList.get(controller.layer) ?? [];
            arr.push(controller);
            this._layerList.set(controller.layer, arr);

            // 这里应该有资源加载部分，但是编辑器UI默认都是是加载过的
            controller.onCreate(...params);
            controller.open(...params);
        }
    }

    /**
     * 关闭一个UI控制器
     * @param controller 控制器类或者控制器实体对象
     */
    public close<T extends TController>(controller: { new(): T } | T) {
        let name = typeof controller === 'function' ? controller.name : controller['constructor'].name;
        let ctrl = this._uiList.get(name);
        if (!ctrl) {
            console.log('Panel not exists');
            return;
        }

        let index = (this._layerList.get(ctrl.layer) ?? []).findIndex(val => val === ctrl);
        if (index === -1) {
            console.log('Panel not display');
            return;
        }

        this._layerList.get(ctrl.layer).splice(index, 1);
        ctrl.close();

        if (ctrl.life === UILife.ONE) {
            this._uiList.delete(name);
            ctrl.destroy();
        } else if (ctrl.life === UILife.SOMETIME) {
            this._uiCloseList.add(ctrl);
        }
    }

    /**
     * 获取一个UI控制器
     * @param controller 控制器类
     * @returns 控制器实体
     */
    public queryPanelByControl<T extends TController>(controller: { new(): T }): T {
        let c = this._uiList.get(controller.name);
        if (c) {
            if (c.panel.visible) {
                return c as T;
            }
        }

        return null;
    }

    private update() {
        if (this._uiCloseList.size > 0) {
            let ctrlPassed: TController[] = [];
            let time = Math.floor(Date.now() / 1000);
            for (const val of this._uiCloseList.values()) {
                if (time - val.openTime > 5) {// 大于5秒未使用
                    ctrlPassed.push(val);
                }
            }

            for (let i = 0; i < ctrlPassed.length; i++) {
                let ctrl = ctrlPassed[i];
                this._uiCloseList.delete(ctrl);
                this._uiList.delete(ctrl['constructor'].name);
                ctrl.destroy();
            }
        }
    }

    private getContent(layer: UILayer) {
        let content = this._layerContent.get(layer);
        if (!content) {
            content = Canvas.newObject(UIService.canvas, 'layer_' + layer);
            content.constraints.constraintHorizontal
            this._layerContent.set(layer, content);
        }

        return content;
    }
}