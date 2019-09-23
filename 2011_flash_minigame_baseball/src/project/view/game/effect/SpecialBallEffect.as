package project.view.game.effect
{
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class SpecialBallEffect 
	{
		private var _effect : MovieClip;
		private var _selectedEffect : MovieClip;
		
		public function SpecialBallEffect($effect:MovieClip)
		{
			
			_effect = $effect;
		}
		
		public function init():void
		{
			if (_selectedEffect != null) 
			{
				_selectedEffect.alpha = 0;
				_selectedEffect.gotoAndStop(1);
			}
		}
		
		public function start():void
		{
			TweenMax.to(_selectedEffect, 0.2, { alpha : 1 } );
			_selectedEffect.gotoAndPlay(2);
		}
		
		public function stop():void
		{
			TweenMax.to(_selectedEffect, 0.2, { alpha : 0, onComplete : effectStopComplete } );
		}
		
		public function select($num:uint):void
		{
			trace($num + " 번째 마구 이펙트 선택");
			var num : uint = $num;
			if (num == 2) num = 0;
			else if (num == 3) num = 1;
			
			_selectedEffect = _effect["effect" + num];
		}
		
		public function change():void
		{
			if (_selectedEffect != null)
			{
				_selectedEffect.alpha = 0;
				_selectedEffect = null;
			}
		}
		
		private function effectStopComplete():void
		{
			_selectedEffect.gotoAndStop(1);
		}
	}
	
}