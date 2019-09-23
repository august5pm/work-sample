package project.view.game 
{
	import flash.display.MovieClip;
	import flash.utils.clearTimeout;
	import flash.utils.setTimeout;
	import project.model.cons.FrameConst;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Hitter extends MovieClip
	{
		private var _delayTime : Number;
		public function Hitter() 
		{
			
		}
		
		public function reset():void
		{
			this.gotoAndStop(1);
		}
		
		public function swing():void
		{
			_delayTime = setTimeout(delayTime, 100);
		}
		
		private function delayTime():void
		{
			clearTimeout(_delayTime);
			this.gotoAndPlay(FrameConst.SWING);
		}
		
	}

}