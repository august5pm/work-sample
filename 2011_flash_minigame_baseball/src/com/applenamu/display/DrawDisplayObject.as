package com.applenamu.display
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class DrawDisplayObject 
	{
		public function DrawDisplayObject() { }
		
		public static function DrawSolidArc (sp : Sprite, centerX:uint, centerY:uint, innerRadius:Number, outerRadius:Number, startAngle:Number, arcAngle:Number, steps:uint=5, mc:MovieClip = null) : void
		{
			// 2파이
			var twoPI : Number = 2 * Math.PI;
			
			// 각도의 부드러운 단계
			var angleStep : Number = arcAngle / steps;
			
			// 각도
			var angle : Number;
			
			// 마침 각도
			var endAngle : Number;
			var xx : Number = centerX + Math.cos(startAngle * twoPI) * innerRadius;
			var yy : Number = centerY + Math.sin(startAngle * twoPI) * innerRadius;
			var startPoint : Object = {x:xx, y:yy};
			sp.graphics.moveTo(xx, yy);
			
			for (var i:uint = 1; i <= steps; i++)
			{
				angle = (startAngle + i * angleStep) * twoPI;
				xx = centerX + Math.cos(angle) * innerRadius;
				yy = centerY + Math.sin(angle) * innerRadius;
				sp.graphics.lineTo(xx, yy);
				
			}
			
			if (mc != null) 
			{
				mc.x = -xx+124;
				mc.y = yy+91;
			}
		
			endAngle = startAngle + arcAngle;
			for (i = 0; i <= steps; i++)
			{
				angle = (endAngle - i * angleStep) * twoPI;
				xx = centerX + Math.cos(angle) * outerRadius;
				yy = centerY + Math.sin(angle) * outerRadius;
				sp.graphics.lineTo(xx, yy);
			}
			sp.graphics.lineTo(startPoint.x, startPoint.y);
		}
	}
	
}