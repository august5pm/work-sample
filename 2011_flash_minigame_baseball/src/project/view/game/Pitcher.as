package project.view.game 
{
	import flash.display.MovieClip;
	import project.model.config.Config;
	import project.model.cons.FrameConst;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Pitcher extends MovieClip
	{
		public var pitcher0 : MovieClip;
		public var pitcher1 : MovieClip;
		public var pitcher2 : MovieClip;
		public var pitcher3 : MovieClip;
		
		public var _selectNum : uint = 0;
		
		public function Pitcher() 
		{
			
		}
		
		/**
		 * 초기화
		 */
		public function reset():void
		{
			stand();
		}
		
		/**
		 * 선수 선택
		 */
		public function select($select:uint):void
		{
			_selectNum = $select;
			for (var i:uint = 0; i < Config.PLAYER_NUM; i++)
			{
				if (i != _selectNum) this["pitcher" + i].alpha = 0;
				else this["pitcher" + i].alpha = 1;
			}
		}
		
		/**
		 * 가만히 서있기
		 */
		public function stand():void
		{
			this["pitcher" + _selectNum].gotoAndStop(1);
		}
		
		/**
		 * 와인드 업
		 */
		public function windup():void
		{
			this["pitcher" + _selectNum].gotoAndPlay(FrameConst.WIND_UP);
		}
		
		/**
		 * 투구
		 */
		public function pitching():void
		{
			this["pitcher" + _selectNum].gotoAndPlay(FrameConst.PITCHING);
		}
	}
}