package project.view.game.effect
{
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class EarthquakeEffect
	{
		private static var _minusNum : int = -3;
		private static var _plusNum : int = 3;
		
		public function EarthquakeEffect()
		{
			
		}
		
		public static function start($target:MovieClip, $x:int, $y:int):void
		{
			var ranX : int = (_minusNum * Math.random()) + (_plusNum * Math.random());
			var ranY : int = (_minusNum * Math.random()) + (_plusNum * Math.random());
			
			$target.x = $x+ranX;
			$target.y = $y+ranY;
		}
		
		public static function stop($target:MovieClip, $x:int, $y:int):void
		{
			$target.x = $x;
			$target.y = $y;
		}
	}
}