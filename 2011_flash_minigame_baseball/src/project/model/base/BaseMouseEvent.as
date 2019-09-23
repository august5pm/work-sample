package project.model.base 
{
	import com.applenamu.events.OnReleaseOutside;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class BaseMouseEvent extends MovieClip
	{
		private var _isAddEvent : Boolean = false;
		
		public function BaseMouseEvent() 
		{
			addMouseEvent();
		}
		
		protected function up(e:MouseEvent):void
		{
			
		}
		
		protected function down(e:MouseEvent):void
		{
			
		}
		
		protected function over(e:MouseEvent):void
		{
			
		}
		
		protected function out(e:MouseEvent):void
		{
			
		}
		
		public function addMouseEvent():void
		{
			_isAddEvent = true;
			OnReleaseOutside.addReleaseOutside(this);
			addEventListener(MouseEvent.MOUSE_UP, up);
			addEventListener(MouseEvent.MOUSE_DOWN, down);
			addEventListener(MouseEvent.MOUSE_OVER, over);
			addEventListener(MouseEvent.MOUSE_OUT, out);
			this.addEventListener("releaseOutside", up);
			this.buttonMode = true;
			
		}
		
		public function removeMouseEvent():void
		{
			_isAddEvent = false;
			OnReleaseOutside.removeReleaseOutside(this);
			removeEventListener(MouseEvent.MOUSE_UP, up);
			removeEventListener(MouseEvent.MOUSE_DOWN, down);
			removeEventListener(MouseEvent.MOUSE_OVER, over);
			removeEventListener(MouseEvent.MOUSE_OUT, out);
			this.removeEventListener("releaseOutside", up)
			this.buttonMode = false;
		}
		
		public function get isAddEvent():Boolean
		{
			return _isAddEvent;
		}
	}
}