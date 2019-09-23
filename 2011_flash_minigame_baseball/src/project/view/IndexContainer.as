package project.view 
{
	import flash.display.MovieClip;
	import project.model.vo.item.index.BtnStart;
	/**
	 * ...
	 * @author applenamu
	 */
	public class IndexContainer extends MovieClip
	{
		public var btnStart : BtnStart;
		
		public function IndexContainer() 
		{
			
		}
		
		public function startMotion():void
		{
			this.gotoAndPlay(2);
		}	
	}
}