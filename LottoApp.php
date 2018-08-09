<!DOCTYPE html>
<html>
<head>
<title>PHP Lotto Application Page</title>
<meta charset="UTF-8" />
<meta name="description" content="lotto application" />
<meta name="keywords" content="lotto,pick 6,lottery,powerball" />
<meta name="author" content="Dirk Harriman" />
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" type="image/png" href="favicon.png" />
<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css" />
<link type="text/css" rel="stylesheet" href="css/jquery-ui.min.css" />
<link type="text/css" rel="stylesheet" href="css/lotto-app.css" />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/lotto-app.js"></script>
<script type="text/javascript">
  $(document).ready(function () {
    AddTicket();
  });
</script>
</head>
<body>
<form>
<div class="container main-container" id="main-container">
  &nbsp;<br/>
  <h2>The Lotto Application</h2>
  <div id="MainWrap">
    &nbsp;<br />
    &nbsp;<br />
    &nbsp;<br />
    <div class="Controls" id="divControls">
      <div class="Picker">
        <div class="PickerControl">
          <input type="button" class="Btn1" value="Add Ticket" onclick="return AddTicket()"/>
          <input type="button" class="Btn1" value="Quick Pick" id="btnQPick" onclick="return QuickPick();" />
          <input type="button" class="Btn1" value="Megaplier" id="btnMegaplier" onclick="return SetMegaplier();" />
          <select id="ddlMultiDraw" class="FormInput1" onchange="MultiDraw(this);">
            <option value="1" selected="selected">Multidraw</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <input type="button" class="Btn1" value="Clear Current" onclick="return ClearCurrent()"/>
          <input type="button" class="Btn1" value="Clear All" onclick="return ClearAll()"/>
        </div>
        <div class="PickerMain">
          <h1>Pick Five</h1>
          <input type="button" value="01" id="PickBtn1" class="PBtn-Active" onclick="return PickNumber(1);" />
          <input type="button" value="02" id="PickBtn2" class="PBtn-Active" onclick="return PickNumber(2);" />
          <input type="button" value="03" id="PickBtn3" class="PBtn-Active" onclick="return PickNumber(3);" />
          <input type="button" value="04" id="PickBtn4" class="PBtn-Active" onclick="return PickNumber(4);" />
          <input type="button" value="05" id="PickBtn5" class="PBtn-Active" onclick="return PickNumber(5);" />
          <input type="button" value="06" id="PickBtn6" class="PBtn-Active" onclick="return PickNumber(6);" />
          <input type="button" value="07" id="PickBtn7" class="PBtn-Active" onclick="return PickNumber(7);" />
          <input type="button" value="08" id="PickBtn8" class="PBtn-Active" onclick="return PickNumber(8);" />
          <input type="button" value="09" id="PickBtn9" class="PBtn-Active" onclick="return PickNumber(9);" />
          <input type="button" value="10" id="PickBtn10" class="PBtn-Active" onclick="return PickNumber(10);" />
          <input type="button" value="11" id="PickBtn11" class="PBtn-Active" onclick="return PickNumber(11);" />
          <input type="button" value="12" id="PickBtn12" class="PBtn-Active" onclick="return PickNumber(12);" />
          <input type="button" value="13" id="PickBtn13" class="PBtn-Active" onclick="return PickNumber(13);" />
          <input type="button" value="14" id="PickBtn14" class="PBtn-Active" onclick="return PickNumber(14);" />
          <input type="button" value="15" id="PickBtn15" class="PBtn-Active" onclick="return PickNumber(15);" />
          <input type="button" value="16" id="PickBtn16" class="PBtn-Active" onclick="return PickNumber(16);" />
          <input type="button" value="17" id="PickBtn17" class="PBtn-Active" onclick="return PickNumber(17);" />
          <input type="button" value="18" id="PickBtn18" class="PBtn-Active" onclick="return PickNumber(18);" />
          <input type="button" value="19" id="PickBtn19" class="PBtn-Active" onclick="return PickNumber(19);" />
          <input type="button" value="20" id="PickBtn20" class="PBtn-Active" onclick="return PickNumber(20);" />
          <input type="button" value="21" id="PickBtn21" class="PBtn-Active" onclick="return PickNumber(21);" />
          <input type="button" value="22" id="PickBtn22" class="PBtn-Active" onclick="return PickNumber(22);" />
          <input type="button" value="23" id="PickBtn23" class="PBtn-Active" onclick="return PickNumber(23);" />
          <input type="button" value="24" id="PickBtn24" class="PBtn-Active" onclick="return PickNumber(24);" />
          <input type="button" value="25" id="PickBtn25" class="PBtn-Active" onclick="return PickNumber(25);" />
          <input type="button" value="26" id="PickBtn26" class="PBtn-Active" onclick="return PickNumber(26);" />
          <input type="button" value="27" id="PickBtn27" class="PBtn-Active" onclick="return PickNumber(27);" />
          <input type="button" value="28" id="PickBtn28" class="PBtn-Active" onclick="return PickNumber(28);" />
          <input type="button" value="29" id="PickBtn29" class="PBtn-Active" onclick="return PickNumber(29);" />
          <input type="button" value="30" id="PickBtn30" class="PBtn-Active" onclick="return PickNumber(30);" />
          <input type="button" value="31" id="PickBtn31" class="PBtn-Active" onclick="return PickNumber(31);" />
          <input type="button" value="32" id="PickBtn32" class="PBtn-Active" onclick="return PickNumber(32);" />
          <input type="button" value="33" id="PickBtn33" class="PBtn-Active" onclick="return PickNumber(33);" />
          <input type="button" value="34" id="PickBtn34" class="PBtn-Active" onclick="return PickNumber(34);" />
          <input type="button" value="35" id="PickBtn35" class="PBtn-Active" onclick="return PickNumber(35);" />
          <input type="button" value="36" id="PickBtn36" class="PBtn-Active" onclick="return PickNumber(36);" />
          <input type="button" value="37" id="PickBtn37" class="PBtn-Active" onclick="return PickNumber(37);" />
          <input type="button" value="38" id="PickBtn38" class="PBtn-Active" onclick="return PickNumber(38);" />
          <input type="button" value="39" id="PickBtn39" class="PBtn-Active" onclick="return PickNumber(39);" />
          <input type="button" value="40" id="PickBtn40" class="PBtn-Active" onclick="return PickNumber(40);" />
          <input type="button" value="41" id="PickBtn41" class="PBtn-Active" onclick="return PickNumber(41);" />
          <input type="button" value="42" id="PickBtn42" class="PBtn-Active" onclick="return PickNumber(42);" />
          <input type="button" value="43" id="PickBtn43" class="PBtn-Active" onclick="return PickNumber(43);" />
          <input type="button" value="44" id="PickBtn44" class="PBtn-Active" onclick="return PickNumber(44);" />
          <input type="button" value="45" id="PickBtn45" class="PBtn-Active" onclick="return PickNumber(45);" />
          <input type="button" value="46" id="PickBtn46" class="PBtn-Active" onclick="return PickNumber(46);" />
          <input type="button" value="47" id="PickBtn47" class="PBtn-Active" onclick="return PickNumber(47);" />
          <input type="button" value="48" id="PickBtn48" class="PBtn-Active" onclick="return PickNumber(48);" />
          <input type="button" value="49" id="PickBtn49" class="PBtn-Active" onclick="return PickNumber(49);" />
          <input type="button" value="50" id="PickBtn50" class="PBtn-Active" onclick="return PickNumber(50);" />
          <input type="button" value="51" id="PickBtn51" class="PBtn-Active" onclick="return PickNumber(51);" />
          <input type="button" value="52" id="PickBtn52" class="PBtn-Active" onclick="return PickNumber(52);" />
          <input type="button" value="53" id="PickBtn53" class="PBtn-Active" onclick="return PickNumber(53);" />
          <input type="button" value="54" id="PickBtn54" class="PBtn-Active" onclick="return PickNumber(54);" />
          <input type="button" value="55" id="PickBtn55" class="PBtn-Active" onclick="return PickNumber(55);" />
          <input type="button" value="56" id="PickBtn56" class="PBtn-Active" onclick="return PickNumber(56);" />
          <input type="button" value="57" id="PickBtn57" class="PBtn-Active" onclick="return PickNumber(57);" />
          <input type="button" value="58" id="PickBtn58" class="PBtn-Active" onclick="return PickNumber(58);" />
          <input type="button" value="59" id="PickBtn59" class="PBtn-Active" onclick="return PickNumber(59);" />
          <input type="button" value="60" id="PickBtn60" class="PBtn-Active" onclick="return PickNumber(60);" />
          <input type="button" value="61" id="PickBtn61" class="PBtn-Active" onclick="return PickNumber(61);" />
          <input type="button" value="62" id="PickBtn62" class="PBtn-Active" onclick="return PickNumber(62);" />
          <input type="button" value="63" id="PickBtn63" class="PBtn-Active" onclick="return PickNumber(63);" />
          <input type="button" value="64" id="PickBtn64" class="PBtn-Active" onclick="return PickNumber(64);" />
          <input type="button" value="65" id="PickBtn65" class="PBtn-Active" onclick="return PickNumber(65);" />
          <input type="button" value="66" id="PickBtn66" class="PBtn-Active" onclick="return PickNumber(66);" />
          <input type="button" value="67" id="PickBtn67" class="PBtn-Active" onclick="return PickNumber(67);" />
          <input type="button" value="68" id="PickBtn68" class="PBtn-Active" onclick="return PickNumber(68);" />
          <input type="button" value="69" id="PickBtn69" class="PBtn-Active" onclick="return PickNumber(69);" />
          <input type="button" value="70" id="PickBtn70" class="PBtn-Active" onclick="return PickNumber(70);" />
          <input type="button" value="71" id="PickBtn71" class="PBtn-Active" onclick="return PickNumber(71);" />
          <input type="button" value="72" id="PickBtn72" class="PBtn-Active" onclick="return PickNumber(72);" />
          <input type="button" value="73" id="PickBtn73" class="PBtn-Active" onclick="return PickNumber(73);" />
          <input type="button" value="74" id="PickBtn74" class="PBtn-Active" onclick="return PickNumber(74);" />
          <input type="button" value="75" id="PickBtn75" class="PBtn-Active" onclick="return PickNumber(75);" />
          <h1>Pick One - Power Ball</h1>
          <input type="button" value="01" id="PowerBall1" class="PBtn-Active" onclick="return Powerball(1);" />
          <input type="button" value="02" id="PowerBall2" class="PBtn-Active" onclick="return Powerball(2);" />
          <input type="button" value="03" id="PowerBall3" class="PBtn-Active" onclick="return Powerball(3);" />
          <input type="button" value="04" id="PowerBall4" class="PBtn-Active" onclick="return Powerball(4);" />
          <input type="button" value="05" id="PowerBall5" class="PBtn-Active" onclick="return Powerball(5);" />
          <input type="button" value="06" id="PowerBall6" class="PBtn-Active" onclick="return Powerball(6);" />
          <input type="button" value="07" id="PowerBall7" class="PBtn-Active" onclick="return Powerball(7);" />
          <input type="button" value="08" id="PowerBall8" class="PBtn-Active" onclick="return Powerball(8);" />
          <input type="button" value="09" id="PowerBall9" class="PBtn-Active" onclick="return Powerball(9);" />
          <input type="button" value="10" id="PowerBall10" class="PBtn-Active" onclick="return Powerball(10);" />
          <input type="button" value="11" id="PowerBall11" class="PBtn-Active" onclick="return Powerball(11);" />
          <input type="button" value="12" id="PowerBall12" class="PBtn-Active" onclick="return Powerball(12);" />
          <input type="button" value="13" id="PowerBall13" class="PBtn-Active" onclick="return Powerball(13);" />
          <input type="button" value="14" id="PowerBall14" class="PBtn-Active" onclick="return Powerball(14);" />
          <input type="button" value="15" id="PowerBall15" class="PBtn-Active" onclick="return Powerball(15);" />
        </div>
      </div><!-- .Picker -->
      <div class="Ticket" id="divTicket">
        <div class="TicketMain" id="dPickGrid">
          <div class="PDivTitle">Lottery Ticket</div>
          <div class="PDivLabel">MultiDraw</div><div id="MultDiv" class="PDiv-PickNorm"></div>
          <div class="PDivLabel">Megaplier</div><div id="MegaDiv" class="PDiv-PickNorm"></div>
        </div>
        <div class="TicketControl" id="divTickCtrl"><span id="ContentPlaceHolder1_lblResult"></span></div>
      </div><!-- .Ticket -->
    </div><!-- .Controls -->
    <div id="DynoBackdrop"></div>
    <div id="DynoMessage"><h1></h1><p></p><input class="Btn1" type="button" value="Okay" onclick="HideMessage();"/></div>
  </div><!-- #MainWrap -->
  &nbsp;<br/>
  &nbsp;<br/>
  &nbsp;<br/>
  &nbsp;<br/>
  &nbsp;<br/>
  &nbsp;<br/>
</div><!-- .container #main-container -->
<div id="Footer" class="text-center">
  <p>Dirk Harriman - Lotto Application</p>
</div>
</form>
<script type="text/javascript" src="js/vendor/popper.min.js?ver=1.0.0"></script>
<script>window.jQuery || document.write('<script src="js/jquery.min.js"><\/script>')</script>
<script type="text/javascript" src="js/bootstrap.min.js?ver=1.0.0"></script>
<script type="text/javascript" src="js/docs.min.js?ver=1.0.0"></script>
<script type="text/javascript" src="js/ie10-viewport-bug-workaround.js?ver=1.0.0"></script>

</body>
</html>



