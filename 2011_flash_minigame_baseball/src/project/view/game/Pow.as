package project.view.game 
{
	import com.greensock.TweenMax;
	import com.greensock.easing.Elastic;
	import flash.display.MovieClip;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Pow extends MovieClip
	{
		
		public function Pow() 
		{
			reset();
		}
		
		public function reset():void
		{
			this.scaleX = 0.5
			this.scaleY = 0.5;
			this.alpha = 0;
		}
		
		public function show():void
		{
			TweenMax.to(this, 0.4, {alpha:1, scaleX:1, scaleY:1, ease:Elastic.easeOut, delay:0.6 } );
		}
		
	}

}