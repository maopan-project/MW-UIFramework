import UIController from "./UIController";

export enum UILayer {
    /**基层 */
    BASE,
    /**摇杆控制 */
    JOY_STICK,
    /**弹窗 */
    POPUP,
    /**抬头显示 */
    HUD,
    /**引导层 */
    Guide,
    /**提示 */
    ALERT
}

export enum UIPopup {
    /**没有 */
    NONE,
    /**淡出 */
    FADE,
    /**缩放 */
    SCALE,
    /**从上往下 */
    TOP2DOWN,
    /**从左往右 */
    LEFT2RIGHT,
    /**从右往左 */
    RIGHT2LEFT,
}

export enum UILife {
    /**一次性 */
    ONE,
    /**永久存在 */
    FOREVER,
    /**存在一定时间销毁 */
    SOMETIME,
}


export type TClass<T> = new (...params: any[]) => T;

export type TController = UIController<UIScript>;