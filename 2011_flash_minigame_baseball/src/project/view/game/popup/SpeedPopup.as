package project.view.game.popup
{
	import com.greensock.TweenMax;
	import com.greensock.easing.*;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import project.model.config.Config;
	import project.model.cons.PopupConst;
	import project.view.event.CustomMouseEvent;
	import project.view.event.GameEvent;

	/**
	 * ...
	 * @author applenamu
	 */
	public class SpeedPopup extends Sprite
	{
		private var _popup : MovieClip = LoaderMaxUtil.getMovieClip("asset_game", "lib.mcSpeedPopup");
		private var _resultNum : uint = 0;	// 0: 1키로 이상, 1: 100키로 이상, 2: 200키로 이상, 3: 실패
		private var _speed : String;

		public function SpeedPopup():void
		{
			_popup.alpha = 0;
			_popup.x = uint((Config.GAME_WIDTH / 2) - (_popup.width / 2));
			_popup.btClose.addEventListener(CustomMouseEvent.DOWN, btCloseDown);
		}

		public function showPopup($speed:String):void
		{
			_speed = $speed;
			checkResult();
			setTitle();
			setSpeed();
			setDesciption();
			if (!this.contains(_popup)) addChild(_popup);
			TweenMax.to(_popup, 0, {y:-_popup.height });
			TweenMax.to(_popup, 0.4, { alpha : 1, y:uint((Config.GAME_HEIGHT / 2) - (_popup.height / 2)), ease:Back.easeOut, delay:0.5 } );
		}

		public function hidePopup():void
		{
			if (this.contains(_popup)) removeChild(_popup);
			dispatchEvent(new GameEvent("reset"));
		}

		private function checkResult():void
		{
			if (Number(_speed) > 0 && Number(_speed) < 100)
			{
				_resultNum = PopupConst.SPEED_ONE;
			}
			else if (Number(_speed) >= 100 && Number(_speed) < 200)
			{
				_resultNum = PopupConst.SPEED_TWO;
			}
			else if (Number(_speed) >= 200)
			{
				_resultNum = PopupConst.SPEED_THREE;
			}
			else
			{
				_resultNum = PopupConst.FAIL;
			}
		}

		private function setTitle():void
		{
			if (_resultNum != PopupConst.FAIL)
			{
				_popup.mcTitle.gotoAndStop(1);	// 성공
			}
			else
			{
				_popup.mcTitle.gotoAndStop(2);	// 실패
			}
		}

		private function setSpeed():void
		{
			if(_resultNum != PopupConst.FAIL) _popup.mcSpeedText.field.text = String(_speed)+"km/h";
			else _popup.mcSpeedText.field.text = "0.0km/h";

		}

		private function setDesciption():void
		{
			_popup.mcDescription.gotoAndStop(_resultNum);
		}

		private function btCloseDown(e:CustomMouseEvent):void
		{
			TweenMax.to(_popup, 0.4, {alpha: 0, y:(Config.GAME_HEIGHT+_popup.height), ease:Back.easeIn, onComplete:hidePopup} );
		}
	}
}
