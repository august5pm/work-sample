package project.view.game.effect
{
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class WindupEffect 
	{
		private var _effect : MovieClip;
		private var _isStart : Boolean = false;
		
		private var _selectedEffect : MovieClip;
		
		public function WindupEffect():void
		{
			
		}
		
		public function set target($target:MovieClip):void
		{
			_effect = $target;
		}
		
		public function init():void
		{
			if (_selectedEffect != null) _selectedEffect.gotoAndStop(1);
		}
		
		public function start():void
		{
			if (!_isStart)
			{
				TweenMax.to(_selectedEffect, 0.2, { alpha : 1 } );
				_selectedEffect.gotoAndPlay(2);
				_isStart = true;
			}
		}
		
		public function stop():void
		{
			_isStart = false;
			if (_selectedEffect != null) TweenMax.to(_selectedEffect, 0.2, { alpha : 0, onComplete : effectStopComplete } );
		}
		
		public function select($num:uint):void
		{
			trace($num + " 번째 와인드 업 이펙트 선택");
			var num : uint = $num;
			if (num == 2) num = 0;
			else if (num == 3) num = 1;
			
			trace("num : "+num)
			
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