package com.applenamu.manager
{
     import flash.display.DisplayObject;
     import flash.display.DisplayObjectContainer;
     
     /**
     * 뎁스 관리를 위한 클래스 입니다.
     * 
     * 
     * @author applenamu
     * 
     * @langversion 3.0
     * @playerversion FlashPlayer 10
     * @productversion FlashDevelop 3.3.4
     */     
     public class DepthManager 
     {
          /**
          * 생성자
          */
          public function DepthManager() { }
          
          /**
          * 가장 앞으로 가져오기
          * 
          * @param $container     target의 부모 객체
          * @param $target          뎁스를 관리하게 될 객체
          */
          public static function highestDepth(container:DisplayObjectContainer, target:DisplayObject):void
          {
               var pos:uint = container.numChildren - 1;
               container.setChildIndex(target, pos);
          }
          
          /**
          * 가장 뒤로 보내기
          * 
          * @param container     target의 부모객체
          * @param target          뎁스를 관리하게 될 객체
          */
          public static function lowestDepth(container:DisplayObjectContainer, target:DisplayObject):void
          {
               var pos:uint = 0;
               container.setChildIndex(target, pos);
          }
          
          /**
          * 뎁스를 한단계 앞으로
          * 
          * @param container     target의 부모객체
          * @param target          뎁스를 관리하게 될 객체
          */
          public static function upDepth(container:DisplayObjectContainer, target:DisplayObject):void
          {
               var pos : int = container.getChildIndex(target);
               if (pos != container.numChildren - 1) pos += 1;
               container.setChildIndex(target, pos);
          }
          
          /**
          * 뎁스를 한단계 뒤로
          * 
          * @param container     target의 부모객체
          * @param target          뎁스를 관리하게 될 객체
          */
          public static function downDepth(container:DisplayObjectContainer, target:DisplayObject):void
          {
               var pos : int = container.getChildIndex(target);
               if (pos != 0) pos -= 1;
               container.setChildIndex(target, pos);
          }
     }
}
 

