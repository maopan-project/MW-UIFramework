
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Lobby/UILobby.ui
*/



@UIBind('UI/Lobby/UILobby.ui')
export default class UILobby_Generate extends UIScript {
		private btnBag_Internal: mw.Button
	public get btnBag(): mw.Button {
		if(!this.btnBag_Internal&&this.uiWidgetBase) {
			this.btnBag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/btnBag') as mw.Button
		}
		return this.btnBag_Internal
	}
	private textTest_Internal: mw.TextBlock
	public get textTest(): mw.TextBlock {
		if(!this.textTest_Internal&&this.uiWidgetBase) {
			this.textTest_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textTest') as mw.TextBlock
		}
		return this.textTest_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 