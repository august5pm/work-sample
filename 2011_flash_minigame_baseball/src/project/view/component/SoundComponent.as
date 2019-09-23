package project.view.component
{
	import flash.display.MovieClip;
	import project.model.cons.FrameConst;
	/**
	 * ...
	 * @author applenamu
	 */
	public class SoundComponent
	{
		public static var snd : MovieClip = LoaderMaxUtil.getMovieClip("asset_game", "libs.soundContainer");

		public function SoundComponent()
		{

		}

		public static function play($name:String):void
		{
			MovieClip(snd.getChildByName($name)).gotoAndPlay(FrameConst.PLAY);
		}

		public static function stop($name:String):void
		{
			MovieClip(snd.getChildByName($name)).gotoAndStop(1);
		}

	}

}
