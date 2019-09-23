package project.view
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import project.model.config.Config;
	import project.view.component.BgmComponent;
	import project.view.event.CustomMouseEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class ContentsContainer extends Sprite
	{
		private var _index : IndexContainer = IndexContainer(LoaderMaxUtil.getMovieClip("asset_game", "libs.mcStartPage"));
		private var _game : GameContainer = GameContainer(LoaderMaxUtil.getMovieClip("asset_game", "libs.mcContainer"));
		private var _bgm : BgmComponent = new BgmComponent();

		private var _mask : Sprite;

		public function ContentsContainer()
		{
			makeMask();
			_index.btnStart.addEventListener(CustomMouseEvent.DOWN, btnStartDown);
			showIndexPage();
			_bgm.play();
		}

		private function makeMask():void
		{
			_mask = new Sprite();
			_mask.graphics.beginFill(0xFFFFFF, 1);
			_mask.graphics.drawRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT);
			_mask.x = Config.GAME_X;
			_mask.y = Config.GAME_Y;
			addChild(_mask);

			this.mask = _mask;
		}
		private function btnStartDown(e:CustomMouseEvent):void
		{
			hideIndexPage();
			showGamePage();
			_game.init();
		}

		private function showIndexPage():void
		{
			_index.x = Config.GAME_X;
			_index.y = Config.GAME_Y;
			if(!this.contains(_index)) addChild(_index);
			_index.startMotion();
		}

		private function hideIndexPage():void
		{
			if(this.contains(_index)) removeChild(_index);
		}

		private function showGamePage():void
		{
			_game.x = Config.GAME_X;
			_game.y = Config.GAME_Y;
			if(!this.contains(_game)) addChild(_game);
		}

		private function hideGamePage():void
		{
			if(this.contains(_game)) removeChild(_game);
		}
	}
}
