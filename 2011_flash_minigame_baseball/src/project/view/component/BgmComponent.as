package project.view.component
{
	import flash.display.Sprite;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.net.URLRequest;
	import flash.external.ExternalInterface;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class BgmComponent extends Sprite 
	{
		private var _sound : Sound = new Sound();
		private var _channel:SoundChannel = new SoundChannel();
		private var _transform:SoundTransform = new SoundTransform();
		
		private var _isMute : Boolean = false;
		
		public function BgmComponent():void
		{
			_sound.load(new URLRequest(Main.config.getPath("bgm")));
		}
		
		public function play():void
		{
			_channel =_sound.play(0, 1000);
		}
		
		public function set volume( num:Number ):void
		{
            _transform.volume = num;
            _channel.soundTransform = _transform;
		};
		
		public function get isMute():Boolean
		{
			return _isMute;
		}
		
		public function set isMute($boo:Boolean):void
		{
			_isMute = $boo;
		}
	}
}