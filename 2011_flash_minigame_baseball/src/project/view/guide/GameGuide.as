package project.view.game.guide
{
	import com.applenamu.manager.DepthManager;
	import com.greensock.TweenMax;
	import com.greensock.easing.*;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import project.view.game.event.BackgroundEvent;
	/**
	 * ...
	 * @author applenamu
	 */
	public class GameGuide extends Sprite
	{
		private var _stepCon : MovieClip = LoaderMaxUtil.getMovieClip("game_guide", "lib.mcStepContainer");
		private var _frame : MovieClip = LoaderMaxUtil.getMovieClip("game_guide", "lib.mcFrame");
		private var _stepMask : Sprite;

		private var _page : int = 0;
		private const TOTAL_PAGE : uint = 7;

		public function GameGuide()
		{
			_stepCon.x = 14;
			_stepCon.y = -256;

			_frame.y = -3;

			addChild(_stepCon);
			addChild(_frame);

			makeStepMask();
			addCloseBtEvent();
		}

		public function init():void
		{
			_page = 0;
			_stepCon["mcStep" + _page].x = 0;
			for (var i:uint = 1; i <= TOTAL_PAGE; i++)
			{
				_stepCon["mcStep" + i].alpha = 0;
			}

			TweenMax.to(_frame.btPrevOut, 0.2, { alpha:1 } );
			TweenMax.to(_frame.btNextOut, 0.2, { alpha:0 } );
			DepthManager.highestDepth(_stepCon, _stepCon["mcStep" + _page]);
			removeMoveBtEvent();
			addMoveBtEvent();
		}

		private function makeStepMask():void
		{
			_stepMask = new Sprite();
			_stepMask.graphics.beginFill(0x000000, 1);
			_stepMask.graphics.drawRect(0, 0, 661, 498);
			_stepMask.x = 10;
			_stepMask.y = 0;
			addChild(_stepMask);
			_stepCon.mask = _stepMask;
		}

		private function addCloseBtEvent():void
		{
			_frame.btClose.addEventListener(MouseEvent.CLICK, btCloseClick);
			_frame.btClose.buttonMode = true;
		}

		private function addMoveBtEvent():void
		{
			_frame.btPrev.addEventListener(MouseEvent.CLICK, btPrevClick);
			_frame.btNext.addEventListener(MouseEvent.CLICK, btNextClick);

			if(_page != 0) _frame.btPrev.buttonMode = true;
			if(_page != TOTAL_PAGE) _frame.btNext.buttonMode = true;
		}

		private function removeMoveBtEvent():void
		{
			_frame.btPrev.removeEventListener(MouseEvent.CLICK, btPrevClick);
			_frame.btNext.removeEventListener(MouseEvent.CLICK, btNextClick);

			_frame.btPrev.buttonMode = false;
			_frame.btNext.buttonMode = false;
		}

		private function btPrevClick(e:MouseEvent):void
		{
			_page--
			if (_page == 0) TweenMax.to(_frame.btPrevOut, 0.2, { alpha:1 } );

			if (_page < 0)
			{
				_page = 0;
				return;
			}
			TweenMax.to(_frame.btNextOut, 0.2, { alpha:0 } );
			removeMoveBtEvent();
			prevPage();
		}

		private function btNextClick(e:MouseEvent):void
		{
			_page++
			if (_page == TOTAL_PAGE) TweenMax.to(_frame.btNextOut, 0.2, { alpha:1 } );

			if (_page > TOTAL_PAGE)
			{
				_page = TOTAL_PAGE;
				return;
			}
			TweenMax.to(_frame.btPrevOut, 0.2, { alpha:0 } );
			removeMoveBtEvent();
			nextPage();
		}

		private function btCloseClick(e:MouseEvent):void
		{
			this.dispatchEvent(new BackgroundEvent("hideGuide"));
		}

		private function prevPage():void
		{
			var oldPage : int = _page + 1;
			if (oldPage > TOTAL_PAGE) oldPage = TOTAL_PAGE;
			_stepCon["mcStep" + oldPage].gotoAndStop(1);
			TweenMax.to(_stepCon["mcStep" + oldPage], 0.4, {x:_stepCon["mcStep" + _page].width, ease:Cubic.easeOut } );

			_stepCon["mcStep" + _page].x = -_stepCon["mcStep" + _page].width
			_stepCon["mcStep" + _page].alpha = 1;
			_stepCon["mcStep" + _page].gotoAndStop(1);
			DepthManager.highestDepth(_stepCon, _stepCon["mcStep" + _page]);
			TweenMax.to(_stepCon["mcStep" + _page], 0.4, {x:0, ease:Cubic.easeOut, onComplete:pageMotionComplete } );
		}

		private function nextPage():void
		{
			var oldPage : int = _page - 1;
			if (oldPage < 0) oldPage = 0;
			_stepCon["mcStep" + oldPage].gotoAndStop(1);
			TweenMax.to(_stepCon["mcStep" + oldPage], 0.4, {x:-_stepCon["mcStep" + _page].width, ease:Cubic.easeOut} );

			_stepCon["mcStep" + _page].x = _stepCon["mcStep" + oldPage].width;
			_stepCon["mcStep" + _page].alpha = 1;
			_stepCon["mcStep" + _page].gotoAndStop(1);
			DepthManager.highestDepth(_stepCon, _stepCon["mcStep" + _page]);
			TweenMax.to(_stepCon["mcStep" + _page], 0.4, {x:0, ease:Cubic.easeOut, onComplete:pageMotionComplete } );
		}

		private function pageMotionComplete():void
		{
			addMoveBtEvent();
			_stepCon["mcStep" + _page].gotoAndPlay(2);
		}
	}
}
