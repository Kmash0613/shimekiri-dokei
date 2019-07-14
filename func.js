

var input_time;

var output_date_txt;

//配列

var database_time = {
  "朝イチ":"09:30:00",
  "朝1.5":"10:30:00",
  "朝二":"11:00:00",
    "AM中":"11:59:59",
    "昼前後":"12:00:00",
    "お昼めど":"12:30:00",
    "午後イチ":"13:00:00",
    "午後早め":"13:30:00",
    "午後二":"14:00:00",
    "夕方":"16:00:00",
    "夕方め":"17:00:00",
    "得意先営業時間内":"18:00:00",
    "夜まえ":"19:00:00",
    "夜早め":"20:00:00",
    "夜め":"22:00:00",
    "夜遅め":"23:00:00",
    "終電までには":"23:59:59",
    "中":"09:30:00"


    };
//今日を定義
var date_today=new Date();

set_date_year=date_today.getFullYear();
    set_date_month=date_today.getMonth()+1;
    set_date_date=date_today.getDate();
    set_date_date=date_today.getDate();
    set_date_day = date_today.getDay() ;	// 曜日(数値)
    set_date_day = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ][set_date_day] ;	// 曜日(日本語表記)



$("span#now").text(set_date_year+"/"+ set_date_month+"/"+set_date_date+" "+set_date_day);

$("#submit").click(function(){


    $("a#gc").hide();
    $("i").hide();
    $("#output_wrap").hide();


    //変数定義：今日に設定
    
    var output_date=new Date();
    //入力値を元に配列から時刻を取得
    input_time=$("#select_time").val();

    //テキスト出力：時刻
    output_time_txt=database_time[input_time];
    

    //選択された日を取得
    var input_date=$("#select_date").val();

    //例外処理："XX中の場合は明日扱い";
     var date_add=0;
     if (input_time=="中"){date_add=date_add+1};

     
     
    //今日の日付に+
    output_date.setDate(date_today.getDate()+Number(input_date)+Number(date_add));

//ここからループ？
//チェック判定
if($('input#chk_holiday').prop('checked')){
  //window.alert("チェックボックスON");
  //チェックされていた場合


 //休日判定：日なら+1日、土なら+2日;
 var output_date_day = output_date.getDay() ;	// 曜日(数値)
 var output_date_day = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"  ][output_date_day] ;	// 曜日(日本語表記)
//window.alert(output_date_day );
 if(output_date_day=='SUN'){
     date_add=1;
     //朝イチ扱いに
     output_time_txt="00:09:30";
    }else{
    if(output_date_day=='SAT'){date_add=2;
    //朝イチ扱いに
    output_time_txt="00:09:30";
    }else{date_add=0};

}

output_date.setDate(output_date.getDate()+Number(date_add));

////

var output_date_year=output_date.getFullYear();
var output_date_month=output_date.getMonth()+1;
var output_date_date=+output_date.getDate();
var output_date_date=+output_date.getDate();

 //曜日を除いてテキストで結合
    output_date_txt=output_date_year+"/"+output_date_month+"/"+output_date_date;

    //祝日判定：祝日ならさらに+1

  var holiday_name = Holiday.getHolidayName(new Date(output_date_txt));
  //window.alert(holiday_name);
  if(holiday_name!==''){date_add=1;
//朝イチ扱いに
output_time_txt="09:30:00";
};
    
  output_date.setDate(output_date.getDate()+Number(date_add));

  //条件終了
}
////ここまでループ
   
    

    
    
   
    //テキスト出力：日付
    output_date_year=output_date.getFullYear();
    output_date_month=output_date.getMonth()+1;
    output_date_date=+output_date.getDate();
    output_date_day = output_date.getDay() ;	// 曜日(数値)
    output_date_day = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"  ][output_date_day] ;	// 曜日(日本語表記)

    output_date_txt=output_date_year+"/"+output_date_month+"/"+output_date_date+" "+output_date_day+"  ";

    
    
    //テキスト出力をHTMLへ
    $("span#output_date").text(output_date_txt);
    $("span#output_time").text(output_time_txt);

    //Googleカレンダー設定

    var date_and_time_forG="T"+output_time_txt.replace( /:/g , "" ) ;

    //月日の桁数を整える
    if(output_date_month.toLocaleString().length==1)
    {output_date_month="0"+output_date_month;}
    if(output_date_date.toLocaleString().length==1)
    {output_date_date="0"+output_date_month;}


    var a_href=
    "http://www.google.com/calendar/event?action=TEMPLATE&text=締切：&details=締切ですよ。&dates="+output_date_year+output_date_month+output_date_date+date_and_time_forG+"/"+output_date_year+output_date_month+output_date_date+date_and_time_forG;

    
    $("a#gc").attr("href", a_href).fadeIn();
    $("i").fadeIn();
    $("#output_wrap").fadeIn();
});
   


$("select").change(function() {
  $("a#gc").fadeOut(200);
  $("i").fadeOut(200);
  $("#output_wrap").fadeOut(200);

})