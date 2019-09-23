package project.view.component
{
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	import project.view.game.Pow;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class GroundComponent extends MovieClip
	{
		public var mcGroundBg:MovieClip;
		public var mcPow:Pow;
		public var mcSpectators:MovieClip;
		
		public function GroundComponent()
		{
		
		}
		
		public function reset():void
		{
			setBrightness(1);
			mcPow.reset();
		}
		
		public function setBrightness($num:Number):void
		{
			TweenMax.to(this, 0.2, {colorMatrixFilter: {brightness: $num}});
		}
		
		public function fail():void
		{
			mcPow.show();
		}
	
	}

}