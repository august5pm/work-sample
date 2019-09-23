package
{

	import com.greensock.events.LoaderEvent;
	import com.greensock.TweenMax;
	import com.greensock.easing.*;
	import project.view.Background;
	import project.view.ContentsContainer;
	import project.view.event.CustomEvent;


	import flash.display.*;
	import flash.events.*;



	/**
	 * @author
	 */

	public class Main extends Appication
	{
		private static var _stage:Stage;
		private static var _config:Config;

		private static var _container : ContentsContainer;

		private var _background : Background;
		private var _progress : MovieClip = new MovieClip();

		public function Main():void
		{
			super(localSetting(), "config");
		}

		private function localSetting():String
		{
			stage.scaleMode = StageScaleMode.NO_SCALE
			stage.align = StageAlign.TOP_LEFT;

			var localPath:String;

			if (mcUtil.isLocal())
				localPath = "./config/config.txt";
			else
				localPath = loaderInfo.parameters.configURL;
			return localPath;
		}

		/**
		 * 초기화
		 * @param	$config
		 */
		public override function init($config:Config):void
		{
			trace("init");
			_stage = stage;
			_config = $config;

			_background = Background(LoaderMaxUtil.getMovieClip("asset_background", "libs.mcBackground"));
			_background.addEventListener(CustomEvent.LOAD_COMPLETE, progressRremoveComplete);
			addChild(_background);
			gameAssetLoad();
			_progress.progress = 0;
		};

		/**
		 * 게임 Asset 로드
		 */
		public function gameAssetLoad():void
		{
			trace(_config.getPath("asset_game"));
			swfLoader([{vars:"asset_game", path:_config.getPath("asset_game")}] , "loader" );
		}

		/**
		 * 게임 Asset 로드 프로그래스
		 * @param	e
		 */
		public override function progressHandler( e:* ):void
		{
			TweenMax.to ( _progress , 1 , { progress:uint(e.target.progress * 100 ) , onUpdate:progressMotion, ease:Strong.easeOut } );
		}

		/**
		 * 게임 Asset 로드 완료
		 * @param	e
		 */
		public override function completeHandler(e:LoaderEvent ):void
		{
			trace("game_asset load complete");
		}

		/**
		 *  get / set
		 */
		public static function get config():Config
		{
			return _config;
		};

		public static function get stage():Stage
		{
			return _stage
		};

		public static function get container():ContentsContainer
		{
			return _container;
		}

		/**
		 * 게임 Asset 로드 프로그래스 모션
		 */
		private function progressMotion():void
		{
			_background.update(_progress.progress);
		}

		private function progressRremoveComplete(e:CustomEvent):void
		{
			_container = new ContentsContainer();
			_container.alpha = 0;
			addChild(_container);
			TweenMax.to(_container, 0.4, {alpha:1 } );
		}
	};
};
