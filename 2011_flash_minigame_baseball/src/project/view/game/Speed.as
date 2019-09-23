package project.view.game
{
	import com.applenamu.display.DrawDisplayObject;
	import com.applenamu.sum.Calculation;
	import com.greensock.TweenMax;
	import com.greensock.easing.Strong
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	import project.model.config.Config;
	import project.view.event.GameEvent;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class Speed extends Sprite 
	{
		private var _container : MovieClip;
		private var _gauge : MovieClip;
		private var _speed : Number = 0;
		private var _timer : Timer = new Timer(Config.MINUS_MINUTE, 0);
		private var _isTimer : Boolean = false;
		private var _isLock : Boolean = false;
		
		private var _gaugeMask : Sprite = new Sprite();
		
		private var _rad : Number = Math.PI / 180	// 라디안
		private var _innerRadius : Number = 50		// 내부반지름
		private var _outerRadius : Number = 76		// 외부반지름

		private var _startAngle : Number = 90		// 시작각도
		private var _arcAngle : Number = 78			// 부채꼴 각도

		private var _plusAngleNum : Number = 0;
		
		private var _keyboardClickCheck : uint = 0;
		
		public function Speed($container : MovieClip)
		{
			_container = $container;
			_gauge = _container.mcSpeedGauge;
			makeGaugeMask();
			makeTimerEvent();
		}
		
		public function reset():void
		{
			_speed = 0;
			_isTimer = false;
			_isLock = false;
			TweenMax.to(_gauge, 0, { alpha:1 } );
			_gaugeMask.graphics.clear();
		}
		
		public function start():void
		{
			_timer.start();
			_isTimer = true;
		}
		
		public function increase():void
		{
			if (!_isLock)
			{
				_keyboardClickCheck = 0;
				var num : Number = Calculation.linearFunction(_speed, 0, Config.MAX_SPEED, Config.PLUS_SPEED_MIN, Config.PLUS_SPEED_MAX);
				_speed += num;
				
				if (_speed > Config.MAX_SPEED) _speed = Config.MAX_SPEED;
				speedCheck();
			}
			else
			{
				stop();
			}
		}
		
		public function get isTimer():Boolean
		{
			return _isTimer;
		}
		
		public function get speed():Number
		{
			return _speed;
		}
		
		public function set lock($boo : Boolean):void
		{
			_isLock = $boo;
			TweenMax.to(_gauge, 0.2, {alpha:0 } );
		}
		
		
		
		//---------------------------------------------------------------------------------------------------
		// private
		//---------------------------------------------------------------------------------------------------
		
		private function makeGaugeMask() : void
		{
			_plusAngleNum = _arcAngle;
			
			_gaugeMask.x = 125;
			_gaugeMask.y = 100;
			_gaugeMask.alpha = 1;
			_gaugeMask.scaleX = -1;
			_container.addChild(_gaugeMask)
			
			_gaugeMask.graphics.clear();
			_gaugeMask.graphics.beginFill(0xFF8A00, 1);
			DrawDisplayObject.DrawSolidArc (_gaugeMask, 0, 0, _innerRadius, _outerRadius, _startAngle / 360, 0/360);
			
			_gauge.upper.mask = _gaugeMask;
		}
		
		private function makeTimerEvent():void
		{
			_timer.addEventListener(TimerEvent.TIMER, timerHandler);
			_timer.start();
			_isTimer = true;
		}
		
		private function timerHandler(e:TimerEvent):void
		{
			_keyboardClickCheck++
			decrease();
		}
		
		private function timerCheck():void
		{
			if (_speed == 0)
			{
				_timer.stop();
				_isTimer = false;
			}
			else if (_speed > 0 && !_isTimer)
			{
				_timer.start();
				_isTimer = true;
			}
		}
		
		private function decrease():void
		{
			if (!_isLock)
			{
				if (_keyboardClickCheck > Config.KEY_DOWN_CHECK) _speed -= Config.MINUS_SPEED_MAX;
				else _speed -= Config.MINUS_SPEED_MIN;
				
				if (_speed < 0) _speed = 0;
				speedCheck();
			}
			else
			{
				stop();
			}
		}
		
		private function speedCheck():void
		{
			timerCheck();
			gaugeMotion();
			update();
		}
		
		private function gaugeMotion():void
		{
			var num : Number = Calculation.linearFunction(_speed, 0, Config.MAX_SPEED, 0, _arcAngle);
			_gaugeMask.graphics.clear();
			_gaugeMask.graphics.beginFill(0xFF8A00, 1);
			DrawDisplayObject.DrawSolidArc (_gaugeMask, 0, 0, _innerRadius, _outerRadius, _startAngle / 360, num/360, 150);
		}
		
		private function stop():void
		{
			_timer.stop();
			_isTimer = false;
		}
		
		private function update():void
		{
			this.dispatchEvent(new GameEvent("update"));
		}
	}
}