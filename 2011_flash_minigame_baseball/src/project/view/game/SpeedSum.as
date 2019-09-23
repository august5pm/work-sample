package project.view.game 
{
	import com.designfever.debug.Debug;
	import project.model.config.Config;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class SpeedSum
	{
		public function SpeedSum() { }
		
		public static function sum($boo:Boolean, $speed:Number, $angle:Number):String
		{
			var tempSpeed : Number
			var isPoint : Boolean = false;
			
			if ($boo) // 타임오버
			{
				if ($speed > Config.MIN_SPEED)
				{
					tempSpeed = Config.MIN_SPEED;
				}
				else
				{
					tempSpeed = $speed;
				}
			}
			else // 시간안에 던졌을 때
			{
				tempSpeed = ($speed * $angle) / Config.MAX_ANGLE;
			}
			
			trace("is timing over : " + $boo);
			trace("speed : " + $speed);
			trace("angle : " + $angle);
			Debug.log(Main.stage,"angle : "+$angle);
			trace("ball speed : " + tempSpeed);
			
			var strSpeed : String = String(tempSpeed.toFixed(1));
			
			for (var i:uint = 0; i < strSpeed.length; i++)
			{
				var strTemp : String = strSpeed.substr(i, 1);
				if (strTemp == ".") isPoint = true;
			}
			
			if (!isPoint) strSpeed += ".0";
			
			trace("speedsum : "+strSpeed)
			return strSpeed;
		}
	}
}