package project.model.api
{
	import com.designfever.events.customEvent;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	import flash.net.URLLoader;
	import flash.net.URLRequest;

	import com.adobe.serialization.json.JSON;
	import com.designfever.util.javascriptExecute;



	public class JSON_Call extends EventDispatcher
	{
		public static var GET_USER_INFO:String = "getUserInfo";				//유저의 정보를 가져옵니다.

		public static var DO_GAME_START:String = "doGameStart";				//게임이 시작되면 호출하여 게임참여 횟수를 올립니다.

		public static var DO_SAVE_TOP_SPEED:String = "doSaveTopSpeed";		//유저의 최고점수를 등록합니다.

		public static var POPUP_GAME_RECORD : String = "popupGameRecord";	// 유저의 게임 정보를 보여줍니다.

		public static var DO_PUBLISH : String = "doPublish";				// 각각의 SNS를 담벼락에 공유

		private var callFunc:Function;

		private var requestFunction:Function;

		public function JSON_Call()
		{
			jsCallBack()
		}

		private function jsCallBack():void
		{
			var ObjectId:String = ExternalInterface.objectID;
			var jArray:Array = new Array();
			jArray = [ 	"function jsCallBack( obj ){",
						"getMovieName('" + ObjectId + "').callBackFuntion( obj )}",

						"function getMovieName(movieName){",
						"if (navigator.appName.indexOf('Microsoft') != -1){",
						"return window[movieName]}",
						"else{",
						"return document[movieName]}}",
						]

			try
			{
				javascriptExecute.execute ( jArray );
				ExternalInterface.addCallback ( "callBackFuntion" , callBackFuntion );
			}catch ( e:Error ) { };
		}

		private function callBackFuntion ( obj:Object ):void
		{
			this.callFunc.apply( this , [obj] );
		}

		/**
		 *
		 * @param	type
		 * @param	callbackFunction
		 * @param	obj
		 */


		public function setExternal( type:String , callbackFunction:Function , obj:Object = null ):void
		{
			this.callFunc = callbackFunction;

			try
			{
				ExternalInterface.call ( "setFlashFunction" , type , "jsCallBack" , obj );
			}
			catch ( e:Error )
			{
				//ExternalInterface.call ( "alert" ,"error"  );
			};
		}

		private function returnFunc( url:String ):void
		{
			var request:URLLoader = new URLLoader ( new URLRequest ( url ) );
			request.addEventListener ( Event.COMPLETE , returnComplete );
		}

		private function returnComplete ( e:Event ):void
		{
			var obj:Object = JSON.decode ( e.target.data );
			this.callFunc.apply( this , [obj] );
		}

		public function setRequest( url:String , callBack:Function ):void
		{
			this.requestFunction = callBack;
			var request:URLLoader = new URLLoader ( new URLRequest ( url ) );
			request.addEventListener ( Event.COMPLETE , requestComplete );
		}

		private function requestComplete ( e:Event ):void
		{
			this.removeEventListener ( Event.COMPLETE , requestComplete );

			var obj:Object = JSON.decode ( e.target.data );
			this.requestFunction.apply( this , [obj] );
		}
	}

}
