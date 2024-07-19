import UIManager from "./Core/UIManager";
import LobbyUI from "./UI/LobbyUI";

@Component
export default class GameMain extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        console.log('游戏加载启动中...');


        if (SystemUtil.isClient()) {
            InputUtil.onKeyDown(Keys.Q, () => {
                UIManager.ins.open(LobbyUI, 1);
            });
        }

        if (SystemUtil.isServer()) {
        }
    }

    /*
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}