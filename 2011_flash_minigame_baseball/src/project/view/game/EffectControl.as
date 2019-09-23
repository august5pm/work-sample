package project.view.game 
{
	import flash.display.MovieClip;
	import project.view.game.effect.EarthquakeEffect;
	import project.view.game.effect.WindupEffect;
	/**
	 * ...
	 * @author applenam u
	 */
	public class EffectControl 
	{
		private var _arrEarthquakeTarget : Array = [];
		private var _arrEarthquakeTargetX : Array = [];
		private var _arrEarthquakeTargetY : Array = [];
		
		private var _windupEffect : WindupEffect = new WindupEffect();
		private var _selectNum : uint = 0;
		
		public function EffectControl() 
		{
			
		}
		
		public function select($select:uint):void
		{
			_selectNum = $select;
			_windupEffect.select(_selectNum);
		}
		
		public function setEarthquakeTarget(...arg):void
		{
			var len : uint = arg.length;
			for (var i:uint = 0; i < len; i++)
			{
				_arrEarthquakeTarget.push(arg[i]);
				_arrEarthquakeTargetX.push(_arrEarthquakeTarget[i].x);
				_arrEarthquakeTargetY.push(_arrEarthquakeTarget[i].y);
			}
		}
		
		public function startEarthquakeEffect():void
		{
			for (var i:uint = 0; i < _arrEarthquakeTarget.length; i++)
			{
				EarthquakeEffect.start(_arrEarthquakeTarget[i], _arrEarthquakeTargetX[i], _arrEarthquakeTargetY[i]);
			}
		}
		
		public function stopEarthquakeEffect():void
		{
			for (var i:uint = 0; i < _arrEarthquakeTarget.length; i++)
			{
				EarthquakeEffect.stop(_arrEarthquakeTarget[i], _arrEarthquakeTargetX[i], _arrEarthquakeTargetY[i]);
			}
		}
		
		public function setWindupEffect($target:MovieClip):void
		{
			_windupEffect.target = $target;
		}
		
		public function startWindupEffect():void
		{
			_windupEffect.start();
		}
		
		public function stopWindupEffect():void
		{
			_windupEffect.stop();
		}
	}
}