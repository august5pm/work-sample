package project.view.game 
{
	import flash.display.MovieClip;
	import project.model.config.Config;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Board extends MovieClip
	{
		public var pitching0 : MovieClip;
		public var pitching1 : MovieClip;
		public var pitching2 : MovieClip;
		
		public var join0 : MovieClip;
		public var join1 : MovieClip;
		public var join2 : MovieClip;
		
		public function Board() 
		{
			
		}
		
		public function set pitching($num:uint):void
		{
			for (var i:uint = 0; i < Config.PLAY_NUM; i++)
			{
				if (i <= $num) this["pitching" + i].over.alpha = 1;
				else this["pitching" + i].over.alpha = 0;
			}
		}
		
		public function set join($num:uint):void
		{
			for (var i:uint = 0; i < Config.JOIN_NUM; i++)
			{
				if (i < $num) this["join" + i].over.alpha = 1;
				else this["join" + i].over.alpha = 0;
			}
		}
		
	}

}