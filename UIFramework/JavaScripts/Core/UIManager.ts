import UIController from "./UIController";
import { TController, UILayer } from "./UITypes";

export default class UIManager {
    private static _uiList: Map<string, TController> = new Map();

    private static _layerList: Map<number, TController[]> = new Map();

    private static _uiCloseList: Set<TController> = new Set();

    public static open<T extends UIScript, V extends UIController<T>>(cls: { new(): V, prototype: V }, param: Parameters<typeof cls.prototype.open>) {
        let uiIns = this._uiList.get(cls.name);
        if (uiIns) {
            if (uiIns.panel.visible) {
                console.log(`Panel --- ${cls.name} is opening`);
                return;
            }

            uiIns.onOpen(param);
        } else {
            let controller = new cls();
            this._uiList.set(cls.name, controller);

            controller.onCreate(param);
            controller.onOpen(param);
        }
    }

    public static close<T extends UIScript, V extends UIController<T>>(controller: { new(): V }) {
        let c = this._uiList.get(controller.name);
    }

    public static queryPanelByControl<T extends UIScript, V extends UIController<T>>(controller: { new(): V }): T {
        let c = this._uiList.get(controller.name);
        if (c) {
            if (c.panel.visible) {
                return c.panel as T;
            }
        }

        return null;
    }

    static update() {
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
}