package project.view.game 
{
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	import project.view.event.GameEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Ball extends MovieClip
	{
		private var _ballX : uint;
		private var _ballY : uint;
		
		private const TARGET_X : uint = 342;
		private const TARGET_Y : uint = 125;
		private const TARGET_SCALE : Number = 0.58;
		
		private const FAIL_X : uint = 570;
		private const FAIL_Y : uint = 33;
		private const FAIL_SCALE : Number = 0.3;
		
		public function Ball() 
		{
			_ballX = this.x;
			_ballY = this.y;
		}
		
		public function reset():void
		{
			this.x = _ballX;
			this.y = _ballY;
			this.alpha = 0
		}
		
		public function strike():void
		{
			TweenMax.to(this, 0.3, { x:TARGET_X, y:TARGET_Y, scaleX:TARGET_SCALE, scaleY:TARGET_SCALE, alpha:1 , onComplete : ballMoveComplete } );
		}
		
		public function fail():void
		{
			TweenMax.to(this, 0.6, {x:FAIL_X, y:FAIL_Y, scaleX:FAIL_SCALE, scaleY:FAIL_SCALE, alpha:1, onComplete : ballMoveComplete } );
		}
		
		private function ballMoveComplete():void
		{
			dispatchEvent(new GameEvent("ballMoveComplete"));
		}
		
	}

}