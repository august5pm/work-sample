package project.view
{
	import com.greensock.TweenMax;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
	import flash.utils.clearTimeout;
	import flash.utils.setTimeout;
	import project.model.config.Config;
	import project.model.cons.SoundConst;
	import project.view.component.GaugeComponent;
	import project.view.component.GroundComponent;
	import project.view.component.KeyboardComponent;
	import project.view.component.SoundComponent;
	import project.view.event.GameEvent;
	import project.view.game.Ball;
	import project.view.game.Board;
	import project.view.game.EffectControl;
	import project.view.game.Hitter;
	import project.view.game.Pitcher;
	import project.view.game.popup.SpeedPopup;
	import project.view.game.SpeedSum;
	/**
	 * ...
	 * @author applenamu
	 */
	public class GameContainer extends MovieClip
	{
		public var mcScreen : MovieClip;
		public var mcReady : MovieClip;
		public var mcBoard : Board;
		public var mcGuage : GaugeComponent;
		public var mcSpecialBallEffect : MovieClip;
		public var mcWindupEffect : MovieClip;
		public var mcKeyMotion : MovieClip;
		public var mcPitcher : Pitcher;
		public var mcBall : Ball;
		public var mcHitter : Hitter;
		public var mcCatcher : MovieClip;
		public var mcGround : GroundComponent;

		private var _speedPopup : SpeedPopup = new SpeedPopup();
		private var _gamePlayCount : uint = 0;
		private var _gameJoinCount : uint = 0;
		private var _keyboard : KeyboardComponent = new KeyboardComponent();
		private var _isPitching : Boolean = false;
		private var _isWindup : Boolean = false;
		private var _selectNum : uint = 0;
		private var _ballSpeed : String;

		private var _effectControl : EffectControl = new EffectControl();
		private var _id : uint;

		public function GameContainer()
		{
			mcBall.addEventListener(GameEvent.BALL_MOVE_COMPLETE, ballMoveComplete);
			mcReady.addEventListener(Event.COMPLETE, readyComplete);

			_speedPopup.addEventListener(GameEvent.RESET, reset);
			_keyboard.addEventListener(GameEvent.INCREASE_SPEED, increaseSpeed);
			_keyboard.addEventListener(GameEvent.PITCHING, pitching);
			mcGuage.speed.addEventListener(GameEvent.UPDATE, speedUpdate);
			mcGuage.timing.addEventListener(GameEvent.PITCHING, pitching);

			setEffect();
			addChild(_speedPopup);
		}

		public function select():void
		{
			_selectNum = Math.random() * Config.PLAYER_NUM;
			mcPitcher.select(_selectNum);
			_effectControl.select(_selectNum);
		}

		public function init():void
		{
			select();
			_isPitching = false;
			_gameJoinCount = 1;
			mcBoard.join = _gameJoinCount;
			ready();
		}

		public function reset(e:GameEvent = null):void
		{
			TweenMax.to(mcScreen, 0.2, { alpha:0 } );
			_isPitching = false;
			_isWindup = false;
			mcGround.reset();
			mcBall.reset();
			mcPitcher.reset();
			mcHitter.reset();
			mcGuage.reset();
			_id = setTimeout(ready, 500);
		}

		public function ready():void
		{
			clearTimeout(_id);
			mcReady.gotoAndPlay(2);
			SoundComponent.play(SoundConst.SOUND_READY);
			Main.stage.focus = Main.stage;
		}

		private function readyComplete(e:Event):void
		{
			_keyboard.addKeyboardEvent();
			mcGuage.startCount();
		}

		private function increaseSpeed(e:GameEvent):void
		{
			mcGuage.speed.increase();
		}

		private function pitching(e:GameEvent):void
		{
			if (!_isPitching)
			{
				trace("pitching");
				_isPitching = true;
				_keyboard.removeKeyboardEvent();
				mcGuage.timing.stop();
				_ballSpeed = SpeedSum.sum(mcGuage.timing.isTimingOver, mcGuage.speed.speed, mcGuage.timing.angle);
				stopEffect();
				checkKindOfBall();
				mcPitcher.pitching();
			}
		}

		private function checkKindOfBall():void
		{
			var num : uint = uint(_ballSpeed);
			if (num == 0)
			{
				mcBall.fail();
				mcGround.fail();
			}
			else if (num >= Config.SPECIAL_SPEED)
			{
				mcBall.strike();
				mcHitter.swing();
			}
			else
			{
				mcBall.strike();
				mcHitter.swing();
			}
		}

		private function speedUpdate(e:GameEvent):void
		{
			var speed : uint = e.currentTarget.speed;
			if (speed > 0)
			{
				if (!_isWindup)
				{
					_isWindup = true;
					mcPitcher.windup();
				}
				startEffect();
			}
			else
			{
				_isWindup = false;
				mcPitcher.stand();
				stopEffect();
			}
		}

		private function startEffect():void
		{
			_effectControl.startEarthquakeEffect();
			_effectControl.startWindupEffect();
			mcGround.setBrightness(Config.GROUND_DARK_BRIGHTNESS);
		}

		private function stopEffect():void
		{
			_effectControl.stopEarthquakeEffect();
			_effectControl.stopWindupEffect();
			mcGround.setBrightness(Config.GROUND_DEFAULT_BRIGHTNESS);
		}

		private function setEffect():void
		{
			_effectControl.setWindupEffect(mcWindupEffect);
			_effectControl.setEarthquakeTarget(mcGround, mcCatcher, mcHitter, mcPitcher);
		}

		private function ballMoveComplete(e:GameEvent):void
		{
			trace("ball move complete")
			showSpeedPopup();
		}

		private function showSpeedPopup():void
		{
			TweenMax.to(mcScreen, 0.2, {alpha:1 } );
			_speedPopup.showPopup(_ballSpeed);
		}
	}
}
