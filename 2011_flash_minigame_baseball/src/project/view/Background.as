package project.view 
{
	import com.applenamu.sum.Calculation;
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	import project.model.vo.item.background.BtnFacebook;
	import project.model.vo.item.background.BtnGoRank;
	import project.model.vo.item.background.BtnInfo;
	import project.model.vo.item.background.BtnSound;
	import project.model.vo.item.background.BtnTwitter;
	import project.model.vo.PreLoader;
	import project.view.event.CustomEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class Background extends MovieClip
	{
		public var btnGoRank : BtnGoRank;
		public var btnFacebook : BtnFacebook;
		public var btnTwitter : BtnTwitter;
		public var btnSound : BtnSound;
		public var btnInfo : BtnInfo;
		
		public var mcPreLoader : PreLoader;
		public function Background() 
		{
			
		}
		
		public function update($num : uint):void
		{
			mcPreLoader.mcMask.mcMiddle.width = Calculation.linearFunction($num, 0, 100, 0, 209);
			mcPreLoader.mcMask.mcRight.x = mcPreLoader.mcMask.mcMiddle.x +mcPreLoader.mcMask.mcMiddle.width;
			mcPreLoader.txt.text = String($num) + "%"
			if ($num == 100) TweenMax.to(mcPreLoader, 0.4, {alpha:0, onComplete:progressRemoveComplete});
		}
		
		private function progressRemoveComplete():void
		{
			this.dispatchEvent(new CustomEvent("loadComplete"));
		}
	}
}