package project.view.game
{
	import com.applenamu.display.DrawDisplayObject;
	import com.designfever.debug.Debug;
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent
	import flash.filters.DropShadowFilter;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import project.model.config.Config;
	import com.greensock.easing.*
	import project.view.event.GameEvent;
	
	/**
	 * ...
	 * @author applenamu
	 */
	public class Timing extends Sprite
	{
		private var _container : MovieClip;
		private var _gauge : MovieClip;
		private var _gaugeMask : Sprite;
		
		private var _rad : Number = Math.PI / 180 // 라디안
		private var _innerRadius : Number = 68 // 내부반지름
		private var _outerRadius : Number = 82 // 외부반지름
		
		private var _startAngle : Number = 180// 시작각도
		private var _arcAngle : Number = 360 // 부채꼴 각도
		
		// 엔터프레임마다 증가시킬 각도
		private var _plusAngleNum : Number = 0;
		
		private var _ballX : Number;
		private var _ballY : Number;
		
		private var _isTimingOver : Boolean = false;
		private var _timingCount : uint  = 0;
		
		public function Timing($container:MovieClip)
		{
			_container = $container;
			_gauge = $container.mcTimingGauge;
			
			setMcBall();
			makeGaugeMask();
		}
		
		public function start():void
		{
			TweenMax.to(_container.mcBallHall.over, 0.2,{alpha:1} );
			TweenMax.to(_container.mcBallHall.out, 0.2, { alpha:0 } );
			_container.mcBallHall.light.gotoAndPlay(2);
			
			_container.mcBall.playCount  = 0;
			TweenMax.to ( _container.mcBall , 1.5 , {playCount:360 , ease:Strong.easeIn, onUpdate:onEnter, onComplete : timingOver} );
		}
		
		public function reset():void
		{
			_isTimingOver = false;
			TweenMax.to(_container.mcBallHall.out, 0.2,{alpha:1} );
			TweenMax.to(_container.mcBallHall.over, 0.2, { alpha:0 } );
			_container.mcBallHall.light.gotoAndStop(1);
			
			_gaugeMask.graphics.clear();
			_plusAngleNum = 0;
			
			TweenMax.to(_container.mcBall, 0.4,{alpha:1,scaleX:1, scaleY:1} );
			_container.mcBall.x = _ballX;
			_container.mcBall.y = _ballY;
		}
		
		public function stop():void
		{
			trace("::::::: timing tween killTweensOf :::::::");
			TweenMax.killTweensOf(_container.mcBall);
		}
		
		public function get isTimingOver():Boolean
		{
			return _isTimingOver;
		}
		
		public function get angle() : Number
		{
			return _plusAngleNum-20;
		}
		
		
		//---------------------------------------------------------------------------------------------------
		// private
		//---------------------------------------------------------------------------------------------------
		
		private function setMcBall():void
		{
			_ballX = _container.mcBall.x;
			_ballY = _container.mcBall.y;
		}
		
		// 게이지 마스크 만들기
		private function makeGaugeMask() : void
		{
			_gaugeMask = new Sprite();
			_gaugeMask.x = 117;
			_gaugeMask.y = 90
			_gaugeMask.scaleX = -1;
			_gauge.upper.mask = _gaugeMask;
			_container.addChild(_gaugeMask);
		}
		
		// 엔터프레임마다 게이지를 채워준다
		private function onEnter() : void
		{
			_plusAngleNum = _container.mcBall.playCount;
			
			_gaugeMask.graphics.clear();
			_gaugeMask.graphics.beginFill(0xFF8A00, 0.5);
			
			DrawDisplayObject.DrawSolidArc (_gaugeMask, 0, 0, _innerRadius, _outerRadius, _startAngle / 360, _plusAngleNum / 360 , 150);
			ballMotion(_plusAngleNum); 
		}
		
		private function timingOver():void
		{
			trace("::::::: timing over :::::::")
			TweenMax.killTweensOf(_container.mcBall);
			_isTimingOver = true;
			TweenMax.to(_container.mcBall, 0.4, { alpha:0, scaleX:0.5, scaleY:0.5 } );
			this.dispatchEvent(new GameEvent("pitching"));
		}
		
		private function ballMotion($num:Number):void
		{
			_plusAngleNum = _plusAngleNum + Config.TIMING_SPEED;
			var obj : Object = Point.polar(78, (Math.PI * 2 / 360) * -$num);
			_container.mcBall.x = obj.x+114;
			_container.mcBall.y = obj.y+91;
		}
		
		private function timingCount():void
		{
			_timingCount++
			_container.mcBall.playCount = 0
			
			TweenMax.killTweensOf(_container.mcBall);
			if (_timingCount < Config.BALL_ROTATION_COUNT)
			{
				TweenMax.to ( _container.mcBall , 0.6 , {playCount:360, onUpdate:onEnter, ease:Linear.easeNone, onComplete : timingCount} );
			}
			else
			{
				TweenMax.to ( _container.mcBall , 0.6 , {playCount:360, onUpdate:onEnter, ease:Linear.easeNone, onComplete : timingOver} );
			}
		}
	}
}