package com.applenamu.events 
{ 
	import flash.events.*; 

	public class OnReleaseOutside
	{ 
	   public function OnReleaseOutside() {} 

	   private static var dir_to:Object; 
	   // :: releaseOutside구현 
	   public static function addReleaseOutside(to:Object):void 
	   { 
		  to.addEventListener('mouseDown', addReleaseOutside_mouseDown); 
	   } 
	   private static function addReleaseOutside_mouseDown(e:Event):void 
	   { 
		  dir_to = e.target; 
		  dir_to.stage.addEventListener('mouseUp', addReleaseOutside_stageMouseDown); 
	   } 
	   private static function addReleaseOutside_stageMouseDown(e:Event):void
	   { 
	   if(dir_to.stage == null)
	   {
		   return
	   }
		  dir_to.stage.removeEventListener('mouseUp', addReleaseOutside_stageMouseDown); 
		  if(e.target != dir_to) 
			 dir_to.dispatchEvent(new MouseEvent('releaseOutside')); 
	   } 
	   public static function removeReleaseOutside(to:Object):void
	   { 
		  to.removeEventListener('mouseDown', addReleaseOutside_mouseDown); 
		  to.stage.removeEventListener('mouseUp', addReleaseOutside_stageMouseDown); 
		  dir_to = null; 
	   };
	}; 
};