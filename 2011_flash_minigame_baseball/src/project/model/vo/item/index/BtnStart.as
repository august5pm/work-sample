package project.model.vo.item.index 
{
	import flash.events.MouseEvent;
	import project.model.base.BaseButton;
	import project.view.event.CustomMouseEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class BtnStart extends BaseButton
	{
		
		public function BtnStart() 
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