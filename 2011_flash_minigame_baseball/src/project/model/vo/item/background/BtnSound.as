package project.model.vo.item.background 
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import project.model.base.BaseButton;
	/**
	 * ...
	 * @author applenamu
	 */
	public class BtnSound extends BaseButton
	{
		public var soundOn : MovieClip;
		public var soundOffOut : MovieClip;
		public var soundOffOver : MovieClip;
		
		private var _isMute : Boolean = false;
		
		public function BtnSound() 
		{
			
		}
		
		protected override function over(e:MouseEvent):void
		{
			if (_isMute) 
			{
				soundOffOut.alpha = 0;
				soundOffOver.alpha = 1;
			}
		}
		
		protected override function out(e:MouseEvent):void
		{
			if (_isMute) 
			{
				soundOffOut.alpha = 1;
				soundOffOver.alpha = 0;
			}
		}
		
		protected override function down(e:MouseEvent):void
		{
			if (_isMute)
			{
				soundOffOver.alpha = 0;
				soundOffOut.alpha = 0;
				soundOn.alpha = 1;
			}
			else
			{
				soundOffOut.alpha = 1;
				soundOn.alpha = 0;
			}
			_isMute = !_isMute;
		}
		
	}

}