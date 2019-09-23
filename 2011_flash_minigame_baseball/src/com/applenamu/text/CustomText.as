package com.applenamu.text
{
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFieldAutoSize;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.text.Font;

	/**
	 * 커스텀 텍스트 필드 클래스 입니다.
	 * 
	 * 
	 * @author applenamu
	 * 
	 * @langversion 3.0
	 * @playerversion FlashPlayer 10
	 * @productversion FlashDevelop 3.3.4
	 */	
	public class CustomText
	{
		/**
		 * 생성자
		 */
		public function CustomText(){}
		
		/**
		 * 임베드 텍스트 필드 만들기
		 * 
		 * @param $font		폰트종류
		 * @param $txt		텍스트
		 * @param $size	텍스트 크기
		 * @param $color	텍스트 색상
		 * @param $isBold	볼드처리
		 * 
		 * @return 임베드 된 텍스트 필드
		 */
		public static function embedTextField($txt : String="", $font : String="Rix고딕 B", $size : uint = 12, $color : Number = 0x000000, $isBold : Boolean = false, $letter : Number = 0) : TextField
		{
			var TF : TextFormat = new TextFormat ($font, $size);
			TF.bold = $isBold
			TF.font = $font
			TF.letterSpacing = $letter;
			
			var TX:TextField = new TextField();
			TX.selectable = false;
			TX.embedFonts = true;
			TX.autoSize = TextFieldAutoSize.LEFT;
			
			TX.textColor = $color;
			TX.defaultTextFormat = TF;
			TX.text = $txt;
			
			return TX
		};
		
		/**
		 * 일반 텍스트 필드 만들기
		 * 
		 * @param $font		폰트종류
		 * @param $txt		텍스트
		 * @param $size		텍스트 크기
		 * @param $color	텍스트 색상
		 * @param $isBold	볼드처리
		 * @param $ker
		 * @param $lea
		 * 
		 * @return 임의로 제한한 넓이가 적용된 텍스트
		 */
		public static function customTextField($txt : String = "", $font : String="돋움", $size : uint = 12, $color:Number=0x000000, $isBold : Boolean = false, $ker : Number = 0, $lea : Number = 0) : TextField
		{
			var TF : TextFormat = new TextFormat($font, $size);
			TF.bold = $isBold
			TF.kerning = $ker
			TF.leading = $lea;
			var TX:TextField = new TextField();
			TX.height = 15
			TX.selectable = false;
			TX.autoSize = TextFieldAutoSize.LEFT;
			TX.textColor = $color;
			TX.defaultTextFormat = TF;
			TX.text = $txt;
			return TX;
		};
		
		public static function embedComponentField($tx:TextField, $txt:String = "", $size : uint = 12, $color : Number = 0x000000, $isBold : Boolean = false, $letter : Number = 0, $isHtml:Boolean = false, $isMulti:Boolean=false) : TextField
		{
			var TF : TextFormat = new TextFormat ();
			TF.size = $size;
			TF.bold = $isBold
			TF.letterSpacing = $letter;
			
			var TX:TextField = $tx;
			TX.selectable = false;
			TX.embedFonts = true;
			TX.autoSize = TextFieldAutoSize.LEFT;
			
			TX.textColor = $color;
			TX.defaultTextFormat = TF;
			
			if (!$isMulti) TX.multiline = false;
			else TX.multiline = true;
			
			if (!$isHtml) TX.text = $txt;
			else TX.htmlText = $txt;
			
			return TX
		}
		
		/*
		 * 텍스트를 받아서 이미지로 반환한다.
		 */
		public static function getTextImage (textfield : TextField) : Bitmap
		{
			//var sp : Sprite = new Sprite ();
			//sp.addChild (textfield);
			var bitmapData : BitmapData = new BitmapData (textfield.width, textfield.height, true, 0x000000);			
			bitmapData.draw (textfield);			
			var bitmap : Bitmap = new Bitmap (bitmapData);
			//sp = null;
			return bitmap;
		};
	};
};