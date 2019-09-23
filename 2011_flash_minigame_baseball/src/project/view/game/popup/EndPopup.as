package project.view.game.popup
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.net.navigateToURL;
	import flash.net.URLRequest;

	/**
	 * ...
	 * @author applenamu
	 */
	public class EndPopup extends Sprite
	{
		private var _popup : MovieClip = LoaderMaxUtil.getMovieClip("game_asset", "lib.mcClosePopup");
		private var _joinNum : uint = 0;

		public function EndPopup()
		{
			_popup.btContinue.addEventListener(MouseEvent.MOUSE_DOWN, btContinueDown);
			_popup.btClose.addEventListener(MouseEvent.MOUSE_DOWN, btEndDown);
			_popup.btContinue.buttonMode = true;
			_popup.btClose.buttonMode = true;

			addChild(_popup);
		}

		public function showPopup():void
		{
			if (!this.contains(_popup)) addChild(_popup);
		}

		public function hidePopup():void
		{
			if (this.contains(_popup)) removeChild(_popup);
		}

		public function set joinNum($num:Number):void
		{
			_joinNum = GameConfig.JOIN_NUM - $num;
			_popup.field.text = String(_joinNum);
		}

		private function btContinueDown(e:MouseEvent):void
		{
			trace("계속하기");
			dispatchEvent(new GameEvent("hideEndPopup"));
		}

		private function btEndDown(e:MouseEvent):void
		{
			trace("종료하기");
			dispatchEvent(new GameEvent("endDown"));
		}
	}
}
