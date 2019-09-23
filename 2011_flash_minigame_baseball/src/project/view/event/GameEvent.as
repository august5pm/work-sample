package project.view.event 
{
	import flash.events.Event;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class GameEvent extends Event 
	{
		public static const PITCHING : String = "pitching";
		public static const INCREASE_SPEED : String = "increaseSpeed";
		public static const UPDATE : String = "update";
		
		public static const BALL_MOVE_COMPLETE : String = "ballMoveComplete";
		
		public static const RESET : String = "reset";
		
		public function GameEvent(type:String, bubbles:Boolean=false, cancelable:Boolean=false) 
		{ 
			super(type, bubbles, cancelable);
			
		} 
		
		public override function clone():Event 
		{ 
			return new GameEvent(type, bubbles, cancelable);
		} 
		
		public override function toString():String 
		{ 
			return formatToString("GameEvent", "type", "bubbles", "cancelable", "eventPhase"); 
		}
		
	}
	
}