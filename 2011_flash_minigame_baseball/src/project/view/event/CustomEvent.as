package project.view.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class CustomEvent extends Event 
	{
		public static const LOAD_COMPLETE : String = "loadComplete";
		public static const COUNT_COMPLETE : String = "countComplete";
		
		public function CustomEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			
		} 
		
		public override function clone():Event 
		{ 
			return new CustomEvent(type, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("CustomEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}