package project.view.component 
{
	import flash.display.MovieClip;
	import project.view.event.CustomEvent;
	import project.view.game.Counter;
	import project.view.game.Speed;
	import project.view.game.Timing;

	/**
	 * ...
	 * @author applenamu
	 */
	public class GaugeComponent extends MovieClip
	{
		public var mcBall : MovieClip;
		public var mcBallHall : MovieClip;
		public var mcSpeedGauge : MovieClip;
		public var mcTimingGauge : MovieClip;
		public var mcCounter : Counter;
		
		public var speed : Speed;
		public var timing : Timing;
		
		public function GaugeComponent() 
		{
			speed = new Speed(this);
			timing = new Timing(this);
			
			mcCounter.addEventListener(CustomEvent.COUNT_COMPLETE, countComplete);
		}
		
		public function reset():void
		{
			speed.reset();
			timing.reset();
			mcCounter.reset();
		}
		
		public function startCount():void
		{
			mcCounter.start();
		}
		
		private function countComplete(e:CustomEvent):void
		{
			speed.lock = true;
			timing.start();
		}
	}
}