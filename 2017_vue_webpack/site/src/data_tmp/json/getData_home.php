<?
	header("Content-Type: application/json; charset=UTF-8");
?>


{
	"status" : 200,
	<? include "common/getData_navigation.php"; ?>,
	<? include "common/getData_footer.php"; ?>,
	"home":{
		"keyvisual":{
			"lists":[
				{
					"type":"image",
					"title":"",
					"img_url":"",
					"mp4_url":"",
					"youtube_url":""
				}
			]
		}
	}
}