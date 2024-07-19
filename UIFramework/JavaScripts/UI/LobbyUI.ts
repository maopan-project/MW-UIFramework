import UIController from "../Core/UIController";
import { UILayer, UILife } from "../Core/UITypes";
import UILobby_Generate from "../ui-generate/Lobby/UILobby_generate";

export default class LobbyUI extends UIController<UILobby_Generate> {
    constructor() {
        super(UILayer.POPUP, UILobby_Generate, UILife.SOMETIME);
    }

    onCreate(): void {
        this.panel.btnBag.onClicked.add(() => {
            this.closeUI();
        });
    }

    onOpen(pid: number): void {
        this.panel.textTest.text = 'MW-UI-' + pid;
    }

    onClose(): void {
    }

}