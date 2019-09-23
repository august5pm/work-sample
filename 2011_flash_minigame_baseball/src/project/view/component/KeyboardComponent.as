package project.view.component 
{
	import flash.events.EventDispatcher;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	import project.view.event.GameEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class KeyboardComponent extends EventDispatcher
	{
		private var _keyDirection : String = "";
		public function KeyboardComponent() 
		{
			
		}
		
		public function addKeyboardEvent():void
		{
			Main.stage.addEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler);
		}
		
		public function removeKeyboardEvent():void
		{
			Main.stage.removeEventListener(KeyboardEvent.KEY_DOWN, keyDownHandler);
		}
		
		private function keyDownHandler(e:KeyboardEvent):void
		{
			switch(e.keyCode)
			{
				case Keyboard.SPACE :
					spaceKeyDown();
				break;
				case Keyboard.LEFT :
					leftKeyDown();
				break;
				case Keyboard.RIGHT :
					rightKeyDown();
				break;
			}
		}
		
		private function spaceKeyDown():void
		{
			dispatchEvent(new GameEvent("pitching"));
		}
		
		private function leftKeyDown():void
		{
			if (_keyDirection != "LEFT")
			{
				_keyDirection = "LEFT";
				dispatchEvent(new GameEvent("increaseSpeed"));
			}
		}
		
		private function rightKeyDown():void
		{
			if (_keyDirection != "RIGHT")
			{
				_keyDirection = "RIGHT";
				dispatchEvent(new GameEvent("increaseSpeed"));
			}
		}
		
	}

}