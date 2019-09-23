package project.model.api
{
	import flash.utils.ByteArray;
	import mx.utils.Base64Decoder;
	import mx.utils.Base64Encoder;

	
	/**
	 * ...
	 * @author applenamu
	 */
	public class Base64  
	{
		public function Base64() { }
		
		public static function encoder($str:String):String
		{
			var responseString:String = $str;
			
			var encoder:Base64Encoder = new Base64Encoder();
			encoder.encode(responseString);
			var responseBase64:String = encoder.toString();
			
			return responseBase64;
		}
		
		public static function decoder($str:String):String
		{
			var responseBase64:String = $str;
			
			var decoder:Base64Decoder = new Base64Decoder();
			decoder.decode(responseBase64);
			var byteArray:ByteArray = decoder.flush();
			var decodedString:String = byteArray.toString();
			
			return decodedString;
		}
	}
}