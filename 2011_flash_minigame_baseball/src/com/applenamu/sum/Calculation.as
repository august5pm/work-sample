package com.applenamu.sum 
{
	/**
	 * ...
	 * @author applenamu
	 */
	public class Calculation 
	{
		public function Calculation() {}
		
		
		// 1차 함수
		public static function linearFunction($x:Number, $a:Number, $b:Number, $c:Number, $d:Number) : Number
		{
			var x : Number = $x;
			var a : Number = $a;
			var b : Number = $b;
			
			var y : Number;
			var c : Number = $c;
			var d : Number = $d;
			
			y = (d - c) / (b - a) * (x - a) + c;
			return y;
		}	
		
		// 1차 방정식
		public static function linearEquation($a:Number, $b:Number, $c:Number):Number
		{
			var x : Number
			var a : Number = $a;
			var b : Number = $b;
			var c : Number = $c;
			
			x = (a * c) / b;
			return x;
		}
		
		public static function digit($num:Number):String
		{
			var tempStr : String;
			if ($num < 10)
			{
				tempStr = "0" + String($num);
			}
			else
			{
				tempStr = String($num);
			}
			
			return tempStr;
		}
	}
}