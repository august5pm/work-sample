package project.model.api
{
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class Encrypiton
	{
		public function Encrypiton() { }
		
		public static function encoder($str:String):String
		{
			trace("1 : "+$str)
			var fakeTxt:String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
			var tempStr : String = "";
			var frontStr : String = "";
			var backStr : String = "";
			if ($str.length == 3) $str = "00" + $str;
			else if ($str.length == 4) $str = "0" + $str;
			trace("2 : "+$str)
			
			for (var i:uint = 0; i < $str.length; i++)
			{
				var str : String = $str.substr(i, 1);
				switch(str)
				{
					case ".":
						tempStr += "a"
						break;
					case "9":
						tempStr += "b"
						break;
					case "8":
						tempStr += "c"
						break;
					case "7":
						tempStr += "d"
						break;
					case "6":
						tempStr += "e"
						break;
					case "5":
						tempStr += "f"
						break;
					case "4":
						tempStr += "g"
						break;
					case "3":
						tempStr += "h"
						break;
					case "2":
						tempStr += "i"
						break;
					case "1":
						tempStr += "j"
						break;
					case "0":
						tempStr += "k"
						break;
				}
			}
			
			for (var j:uint = 0; j < 5; j++)
			{
				var frontRanNum:Number = Math.floor(Math.random()*fakeTxt.length);
				var backRanNum:Number = Math.floor(Math.random()*fakeTxt.length);
				frontStr += fakeTxt.charAt(frontRanNum);
				backStr += fakeTxt.charAt(backRanNum);
			}
			
			tempStr = frontStr + tempStr + backStr;
			trace("Encryption endcoder : " + tempStr);
			return tempStr;
		}
		
		public static function decoder($str:String):String
		{
			var tempStr : String = "";
			for (var i:uint = 0; i < $str.length; i++)
			{
				var str : String = $str.substr(i, 1);
				switch(str)
				{
					case "k":
						tempStr += "0"
						break;
					case "j":
						tempStr += "1"
						break;
					case "i":
						tempStr += "2"
						break;
					case "h":
						tempStr += "3"
						break;
					default :
						tempStr += "4"
						break;
				}
			}
			tempStr = tempStr.substr(7, 1);
			trace(tempStr);
			return tempStr;
		}
	}
	
}