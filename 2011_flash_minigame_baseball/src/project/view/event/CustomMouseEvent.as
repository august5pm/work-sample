package project.view.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class CustomMouseEvent extends Event 
	{
		public static const UP : String = "up";
		public static const DOWN : String = "down";
		
		public function CustomMouseEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			
		} 
		
		public override function clone():Event 
		{ 
			return new CustomMouseEvent(type, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("CustomMouseEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}