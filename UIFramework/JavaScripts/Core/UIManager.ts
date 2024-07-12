export default class UIManager {
    private static _layerList: Map<number, any[]> = new Map();

    public static open(uiClass: { new(): UIScript }, openFunc?: Function, closeFunc?: Function) {
        let uiIns = UIService.create(uiClass);

        if (1) {
            
        }

    }

    public static close() {

    }
}