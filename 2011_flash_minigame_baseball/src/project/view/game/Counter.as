package project.view.game 
{
	import com.greensock.TweenMax;
	import com.greensock.easing.*;
	import flash.display.MovieClip;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	import project.model.config.Config;
	import project.model.cons.SoundConst;
	import project.view.component.SoundComponent;
	import project.view.event.CustomEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Counter extends MovieClip
	{
		public var num0:MovieClip;
		public var num1:MovieClip;
		public var num2:MovieClip;
		public var num3:MovieClip;
		public var num4:MovieClip;
		public var num5:MovieClip;
		
		private var _count : int = Config.TIMER_COUNT;
		private var _timer : Timer = new Timer(1000, Config.TIMER_COUNT);
		
		public function Counter() 
		{
			_timer.addEventListener(TimerEvent.TIMER, timerHandler);
		}
		
		public function start():void
		{
			SoundComponent.play(SoundConst.SOUND_COUNT);
			_count = Config.TIMER_COUNT;
			_timer.start();
			showCount(Config.TIMER_COUNT);
		}
		
		public function reset():void
		{
			_timer.stop();
			_timer.reset();
			TweenMax.to(this["num" + 0], 0.6, { alpha : 0, y:this["num" + _count].height, ease:Back.easeOut } )
		}
		
		private function timerHandler(e:TimerEvent):void
		{
			hideCount(_count)
			_count--
			showCount(_count);
			if (_count == 0) this.dispatchEvent(new CustomEvent("countComplete"));
		}
		
		private function showCount($count:int):void
		{
			TweenMax.to(this["num"+$count], 0, {alpha : 0, y:-this["num"+$count].height})
			TweenMax.to(this["num"+$count], 0.6, {alpha : 1, y:0, ease:Back.easeOut})
		}
		
		private function hideCount($count:int):void
		{
			TweenMax.to(this["num" + _count], 0.6, { alpha : 0, y:this["num" + _count].height, ease:Back.easeOut } )
		}
	}

}