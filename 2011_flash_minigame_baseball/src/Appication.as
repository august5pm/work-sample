package
{
	import com.greensock.events.LoaderEvent;
	import com.greensock.loading.LoaderMax;
	import com.greensock.loading.SWFLoader;

	import flash.display.*;
	import flash.events.*;
	import flash.net.URLRequest;
	import flash.system.LoaderContext;



	public class Appication extends Sprite
	{
		private var configPath:String;
		private var configValue:String;

		private var config:Config;
		private var multiLoader:XMLMultiLoader;
		private var swfMultiLoader:MultiLoader;

		public function Appication( configPath:String , configValue:String )
		{
			this.configPath = configPath;
			this.configValue = configValue;

			this.addEventListener ( Event.ADDED_TO_STAGE , stageInit );

		}

		public function swfLoader($arr:Array, type:String =""):void
		{

			this.swfMultiLoader = new MultiLoader();
			var loaderContext:LoaderContext = new LoaderContext();
			loaderContext.checkPolicyFile = false;

			var queue:LoaderMax;
			if( type  != "") queue = new LoaderMax( { name:"mainQueue",  onComplete:completeHandler , onProgress:progressHandler } );
			else queue = new LoaderMax( { name:"mainQueue" , onComplete:swfLoadComplete } );

			for ( var i:int; i < $arr.length; i++ )
			{
				queue.append( new SWFLoader($arr[i].path, { name:$arr[i].vars } ) );
			}
			queue.load();
		}

		public function progressHandler( e:* ):void
		{

		}

		public function completeHandler( e:LoaderEvent ):void
		{

		}

		private function stageInit( e:Event = null ):void
		{
			this.removeEventListener ( Event.ADDED_TO_STAGE , stageInit );
			configLoader();
		}

		private function configLoader():void
		{
			this.config = new Config ( configPath , configValue );
			config.addEventListener ( ConfigEvent.CONFIG_DATA_COMPLETE , configDataComplete );
		}

		private function configDataComplete ( e:ConfigEvent ):void
		{
			config.removeEventListener ( ConfigEvent.CONFIG_DATA_COMPLETE , configDataComplete );
			this.config = config;
			load();
		};

		private function load():void
		{
			if ( config.XML_DATA_Array.length != 0 ) xmlLoader();
			else if ( config.FontName !=  null ) fontLoader();
			else init( config );
		}

		private function xmlLoader():void
		{
			this.multiLoader = new XMLMultiLoader();

			for ( var i:int; i < config.XML_DATA_Array.length; i++ )
			{
				multiLoader.addTask( config.XML_DATA_Array[i].path	,	config.XML_DATA_Array[i].vars );
			}

			multiLoader.addEventListener( ProgressEvent.PROGRESS , xmlProgressEvent );
			multiLoader.addEventListener( Event.COMPLETE, xmlLoadComplete );
			multiLoader.start();
		}

		private function xmlProgressEvent( e:ProgressEvent ):void	{	};


		private function xmlLoadComplete( e:Event ):void
		{
			multiLoader.removeEventListener( ProgressEvent.PROGRESS , xmlProgressEvent );
			multiLoader.removeEventListener( Event.COMPLETE, xmlLoadComplete );

			for ( var i:int; i < config.XML_DATA_Array.length; i++ )
			{
				XMLModel.setAddList( new XML( multiLoader.getContentByRegistrationName( config.XML_DATA_Array[i].vars ) ) , config.XML_DATA_Array[i].vars );
			}

			if ( config.SWF_Array.length != 0 ) swfLoader(config.SWF_Array);
			else if ( config.FontName !=  null ) fontLoader();
			else init( config );
		}

		private function swfLoadProgress(e:LoaderEvent):void
		{
			//
		}

		private function swfLoadComplete( e:LoaderEvent ):void
		{
			if ( config.FontName !=  null )fontLoader();
			else init( config );
		}

		private function fontLoader():void
		{
			var font:FontManager = new FontManager( config.getPath(config.FontName) );
			font.addEventListener ( ProgressEvent.PROGRESS , fontProgress );
			font.addEventListener ( Event.COMPLETE , fontComplete );
		}

		private function fontProgress ( e:ProgressEvent ):void
		{
			Debug.log ( this , " font Progress : " + e.bytesLoaded );
		}

		private function fontComplete( e:Event ):void
		{

			init( config  );
		};

		public function init( config:Config ):void 		{	};
	}
}
