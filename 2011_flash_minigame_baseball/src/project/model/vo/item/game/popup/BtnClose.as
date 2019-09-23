package project.model.vo.item.game.popup 
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import project.model.base.BaseButton;
	import project.view.event.CustomMouseEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class BtnClose extends BaseButton
	{
		
		public function BtnClose() 
		{
			
		}
		
		protected override function over(e:MouseEvent):void
		{
			
		}
		
		protected override function out(e:MouseEvent):void
		{
			
		}
		
		protected override function down(e:MouseEvent):void
		{
			dispatchEvent(new CustomMouseEvent("down"));
		}
		
	}

}