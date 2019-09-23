package project.model.config 
{
	/**
	 * ...
	 * @author applenamu
	 */
	public class Config 
	{
		public static const GAME_WIDTH : uint = 661;
		public static const GAME_HEIGHT : uint = 498;
		public static const GAME_X : uint = 50;				// 게임 X좌표
		public static const GAME_Y : uint = 50;				// 게임 Y좌표
		
		public static const MAX_SPEED : uint = 300;			// 최고 속도
		public static const MIN_SPEED : uint = 0;			// 최저 속도
		public static const DEFAULT_SPEED : uint = 120;		// 기본 스피드
		public static const SPECIAL_SPEED : uint = 200;		// 마구를 던질 수 있는 스피드
		
		public static const MAX_ANGLE : uint = 360;			// 최대 각
		
		public static const MINUS_MINUTE : Number = 10;		// MINUS_MINUTE / 1000 초
		
		public static const PLUS_SPEED_MAX : Number = 1.5;	// 키보드 연타에 따라 증가할 스피드(숫자가 작을수록 어렵다)
		public static const PLUS_SPEED_MIN : Number = 8;	// 키보드 연타에 따라 증가할 스피드
		public static const MINUS_SPEED_MAX : Number = 10;	// MINUS_MINUTE에 따라 감소하게 될 스피드
		public static const MINUS_SPEED_MIN : Number = 1;	// MINUS_MINUTE에 따라 감소하게 될 스피드
		
		public static const KEY_DOWN_CHECK : uint = 10;		// 키보드 치고 있는지 여부 체크
		
		public static const COUNTER_NUM : int = 5;			// 카운터
		public static const TIMING_SPEED : uint = 20;		// 타이밍 그래프 속도
		
		public static const JOIN_NUM : uint = 3;			// 하루에 참여할 수 있는 기회
		public static const PLAY_NUM : uint = 3;			// 게임 기회
		public static const PLAYER_NUM : uint = 4;			// 플레이어 수
		
		public static const GROUND_DARK_BRIGHTNESS : Number = 0.5	// 그라운드가 어두워 졌을 때 Brightness
		public static const GROUND_DEFAULT_BRIGHTNESS : Number = 1	// 그라운드의 기본 Brightness
		
		public static const TIMER_COUNT : uint = 5;
		public static const BALL_ROTATION_COUNT : uint = 3;
		
		public function Config() 
		{
			
		}
	}
}