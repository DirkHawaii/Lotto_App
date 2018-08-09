  /*
    MEGA MILLIONS LOTTERY APPLICATION
  */
  (function (w, $) {
    var PickAr = [];        /* Array of pick numbers for the pick five set  */
    var PBallAr = [];       /* Array of power ball numbers                  */
    var CurrentPick = 0;    /* Pointer to the current pick number           */
    var CurrentBlock = 0;   /* Pointer to current pick block                */
    var MaxRow = 0;         /* Max number of ticket rows                    */
    var RowLimit = 25;      /* Limit of rows                                */
    var Multdraw = 1;       /* Multidraw number for multiple play ticket    */
    var Megaplier = false;  /* Megaplier boolean toggle                     */

    /**  AddTicket - Adds a new ticket to the Lottery Ticket Section
    **********************************************************************************************/
    var AddTicket = function () {
      var HtmlStr = "";
      var lStartRow = MaxRow;
      var lEndRow = MaxRow + 5;

      if (MaxRow + 5 > RowLimit) {
        ShowMessage("Max Tickets", "You Have Reached Maximum Number Of Tickets Per Order");
      }
      else {
        MaxRow += 5;

        // BUILD OR ADD TO ARRAY
        for (var i = lStartRow; i < lEndRow; i++) {PickAr[i] = new Array(5);}
        // INITIALIZE NEW ARRAY ITEMS TO NULL
        for (var j = lStartRow; j < lEndRow; j++) {
          PBallAr[j] = null;
          for (var k = 0; k < 5; k++) {
            PickAr[j][k] = null;
          }
        }

        // BUILD OR ADD TO PICK GRID
        for (var r = lStartRow; r < lEndRow; r++) {   // ITERATE THROUGH ROWS
          for (var c = 0; c < 6; c++) { // ITERATE THROUGH COLUMNS
            if (c == 5) { HtmlStr += "<div id=\"PBall" + r + "\" class=\"PDiv-PBNorm\"></div>"; }  // POWERBALL
            else { HtmlStr += "<div id=\"PickDiv" + r + c + "\" class=\"PDiv-PickNorm\"></div>"; } // PICK 5
          }
        }
        $('#dPickGrid').append(HtmlStr);  // APPEND HTML TO TICKET
      }
    };
    /**  PickNumber - Adds a new number to the Lottery Ticket
    **********************************************************************************************/
    var PickNumber = function (PickNum) {
      var i;
      var ItemPointer = -1;
      var LastIndex = 0;

      // CHECK FOR FIRST PICK
      if ((CurrentPick == 0) && (CurrentBlock == 0)) {       // INITIAL PICK
        ToggleBtn(PickNum);
        SetBlock();                                               // HIGHLIGHT THE FIRST BLOCK
        PickAr[CurrentBlock][CurrentPick] = PickNum;    // SET FIRST PICK
        CurrentPick++;                                            // INCREMENT POINTER
      }
      else {                                                           // NOT INITIAL PICK
        ItemPointer = CheckExistingItem(PickNum);                 // CHECK FOR EXISTING ITEM
        if (ItemPointer == -1) {                                       // ITEM DOESNT EXIST IN ARRAY
          if (RowFilled()) {                                      // CHECK TO SEE IF ROW HAS BEEN FILLED
            if (PBallAr[CurrentBlock] != null) {             // POWERBALL IS SET

              SetBlock();
              CurrentPick = 0;                                    // RESET PICK
            }
            else {
              ShowMessage("Finished Picks", "You must choose a PowerBall number");
            }
          }
          else {                                                          // ROW NOT YET FILLED
            ToggleBtn(PickNum);
            PickAr[CurrentBlock][CurrentPick] = PickNum;   // SET PICK
            if (CurrentPick < 4) {                                   // STILL MORE PICKS TO MAKE
              CurrentPick++;                                         // INCREMENT POINTER
            }
            else {
              if (PBallAr[CurrentBlock] != null) {
                SetBlock();
              }

            }
          }
        }
        else {                                          // ITEM IS ALREADY IN ARRAY
          ToggleBtn(PickNum);
          LastIndex = GetLastIndex();
          //alert("Not Initial - Duplicate Found - ItemPointer: " + ItemPointer +", LastIndex: "+ LastIndex);
          if (ItemPointer == LastIndex) {
            //alert("Item in array at last position:" + ItemPointer);
            PickAr[CurrentBlock][ItemPointer] = null;
          }
          else {
            for (i = ItemPointer; i < LastIndex; i++) {
              //alert("Loop:" + i);
              PickAr[CurrentBlock][i] = PickAr[CurrentBlock][i + 1];  // COPY NEXT ITEM
            }
            PickAr[CurrentBlock][LastIndex] = null;
          }
          CurrentPick--;
        }
      }
      SortPickAr();
      RenderAr();
    };
    /**  ToggleBtn - Changes class on button when picked or un-picked
    **********************************************************************************************/
    var ToggleBtn = function (PickNum) {
      if (document.getElementById("PickBtn" + PickNum).className == "PBtn-Active") {   // BUTTON CLASS TOGGLE
        document.getElementById("PickBtn" + PickNum).className = "PBtn-Picked";
      }
      else {
        document.getElementById("PickBtn" + PickNum).className = "PBtn-Active";
      }
    };
    /**  SetBlock - Sets up a row for input
    **********************************************************************************************/
    var SetBlock = function () {
      var j;

      if ((CurrentBlock == 0) && (CurrentPick == 0)) {                                     // INITIAL ENTRY
        for (j = 0; j < 5; j++) {
          document.getElementById("PickDiv" + CurrentBlock + j).className = "PDiv-PickActive";    // SET PICK FIVE TO ACTIVE CLASS
        }
        document.getElementById("PBall" + CurrentBlock).className = "PDiv-PBActive";                // SET POWER BALL TO ACTIVE
      }
      else {                                                                                         // NOT INITIAL
        if (CurrentBlock < MaxRow - 1) {                                                       // STILL MORE BLOCKS AVAILABLE *************************************************
          for (j = 0; j < 5; j++) {
            document.getElementById("PickDiv" + CurrentBlock + j).className = "PDiv-PickNorm";  // SET CURRENT BLOCK TO INACTIVE
          }
          document.getElementById("PBall" + CurrentBlock).className = "PDiv-PBNorm";              // SET CURRENT POWERBALL TO INACTIVE
          CurrentBlock++;                                                                         // MOVE TO NEXT BLOCK
          for (j = 0; j < 5; j++) {
            document.getElementById("PickDiv" + CurrentBlock + j).className = "PDiv-PickActive";  // SET PICK FIVE TO ACTIVE CLASS
          }
          document.getElementById("PBall" + CurrentBlock).className = "PDiv-PBActive";            // SET POWER BALL TO ACTIVE
          ResetButtons();                                                                         // RESET BUTTON CLASSES
          CurrentPick = 0;                                                                        // RESET PICK
        } else {                                                                                         // DONE WITH PICKS
          ResetButtons();                                                                         // RESET BUTTON CLASSES
          CurrentPick = 0;
          ShowMessage("Finished", "Done With Game");
        }
      }
    };
    /**  CheckExistingItem - Check for existing item
    **********************************************************************************************/
    var CheckExistingItem = function (PickNum) {
      var ItemIndex = -1;

      for (var j = 0; j < 5; j++) {
        if (PickAr[CurrentBlock][j] == PickNum) {
          ItemIndex = j;
          break;
        }
      }
      return ItemIndex;
    };
    /**  RowFilled - Check to see if the row has been filled
    **********************************************************************************************/
    var RowFilled = function () {
      var bResult = true;

      for (var j = 0; j < 5; j++) {
        if (PickAr[CurrentBlock][j] == null) {
          bResult = false;
          break;
        }
      }
      return bResult;
    };
    /**  GetLastIndex - Get the last non empty index
    **********************************************************************************************/
    var GetLastIndex = function () {
      var LastIndex = 0;

      if (RowFilled()) {
        LastIndex = 4;
      }
      else {
        for (var j = 0; j < 5; j++) {
          if (PickAr[CurrentBlock][j] == null) {
            LastIndex = j - 1;
            break;
          }
        }
      }
      return LastIndex;
    };
    /**  SortPickAr - Sort the array display in ascending order
    **********************************************************************************************/
    var SortPickAr = function () {
      var d, t;

      for (var c = 1; c <= 5; c++) {
        d = c;
        while (d > 0 && PickAr[CurrentBlock][d] < PickAr[CurrentBlock][d - 1]) {
          if ((PickAr[CurrentBlock][d] != null) && (PickAr[CurrentBlock][d] != null)) {
            t = PickAr[CurrentBlock][d];
            PickAr[CurrentBlock][d] = PickAr[CurrentBlock][d - 1];
            PickAr[CurrentBlock][d - 1] = t;
          }
          d--;
        }
      }
    };
    /**  RenderAr - Display the ticket
    **********************************************************************************************/
    var RenderAr = function () {
      var itemVal;
      var PBallVal;

      for (var i = 0; i < PBallAr.length; i++) {
        PBallVal = PBallAr[i];
        if (PBallVal != null) {
          //alert("PBall:" + PBallVal);
          document.getElementById("PBall" + i).innerHTML = FormatNumber(PBallVal);
        }
        else {
          document.getElementById("PBall" + i).innerHTML = "";
        }
        for (var j = 0; j < 5; j++) {
          itemVal = PickAr[i][j];
          if (itemVal != null) {
            document.getElementById("PickDiv" + i + j).innerHTML = FormatNumber(itemVal);
          }
          else {
            //alert("PickDiv"+ i + j);
            document.getElementById("PickDiv" + i + j).innerHTML = "";
          }
        }
      }
    };
    /**  FormatNumber - Format number as a two digit string
    **********************************************************************************************/
    var FormatNumber = function (amount) {
      var sReturn = "";
      var minus = '';

      if (amount < 10) {
        switch (amount) {
          case 1:
            sReturn = "01";
            break;
          case 2:
            sReturn = "02";
            break;
          case 3:
            sReturn = "03";
            break;
          case 4:
            sReturn = "04";
            break;
          case 5:
            sReturn = "05";
            break;
          case 6:
            sReturn = "06";
            break;
          case 7:
            sReturn = "07";
            break;
          case 8:
            sReturn = "08";
            break;
          case 9:
            sReturn = "09";
            break;
        }
      }
      else {
        sReturn = amount;
      }
      return sReturn;
    };
    /**  Powerball - Adds the Power Ball number
    **********************************************************************************************/
    var Powerball = function (PBNum) {
      PBallAr[CurrentBlock] = PBNum;                                // ADD POWER BALL PICK TO ARRAY
      document.getElementById("PBall" + CurrentBlock).innerHTML = FormatNumber(PBNum);   // SET THE DIV WITH PICK
      if (RowFilled()) {                                                 // CHECK TO SEE IF ROW COMPLETE
        SetBlock();                                                      // IF SO SET BLOCK
      }
      return false;
    };
    /**  ResetButtons -
    **********************************************************************************************/
    var ResetButtons = function () {
      for (var i = 1; i <= 75; i++) {
        document.getElementById("PickBtn" + i).className = "PBtn-Active";
      }
    };
    /**  ClearAll -
    **********************************************************************************************/
    var ClearAll = function () {
      for (r = 0; r < PickAr.length; r++) {
        PBallAr[r] = null;
        document.getElementById("PBall" + r).className = "PDiv-PBNorm";
        for (c = 0; c < 5; c++) {
          PickAr[r][c] = null;
          document.getElementById("PickDiv" + r + c).className = "PDiv-PickNorm";
        }
        CurrentBlock = 0;
        CurrentPick = 0;
      }
      SetBlock();
      RenderAr();
    };
    /**  ClearCurrent -
    **********************************************************************************************/
    var ClearCurrent = function () {

      PBallAr[CurrentBlock] = null;
      document.getElementById("PBall" + CurrentBlock).className = "PDiv-PBNorm";
      for (c = 0; c < 5; c++) {
        PickAr[CurrentBlock][c] = null;
        document.getElementById("PickDiv" + CurrentBlock + c).className = "PDiv-PickNorm";
      }
      CurrentBlock -= 1;
      CurrentPick = 0;
      SetBlock();
      RenderAr();
    };
    /**  QuickPick -
    **********************************************************************************************/
    var QuickPick = function () {
      var lPickAr = new Array(75);
      var PBall = 0;
      var RandomNum = 0;
      var DisplayStr = "";

      for (var i = 0; i < 75; i++) { lPickAr[i] = i + 1; }      // BUILD PICK ARRAY
      RandomNum = Math.floor(Math.random() * 75);               // GET FIRST PICK
      CurrentPick = 0;                                          // SET CURRENT PICK TO FIRST ITEM
      PickAr[CurrentBlock][CurrentPick] = lPickAr[RandomNum];   // GET PICK PickAr[1-75]
      lPickAr.splice(RandomNum, 1);                             // REMOVE ITEM PICKED FROM ARRAY
      CurrentPick++;                                            // INCREMENT CURRENT PICK

      RandomNum = Math.floor(Math.random() * 74);               // GET SECOND PICK
      PickAr[CurrentBlock][CurrentPick] = lPickAr[RandomNum];   // GET PICK PickAr[1-74]
      lPickAr.splice(RandomNum, 1);                             // REMOVE ITEM PICKED FROM ARRAY
      CurrentPick++;                                            // INCREMENT CURRENT PICK

      RandomNum = Math.floor(Math.random() * 73);               // GET THIRD PICK
      PickAr[CurrentBlock][CurrentPick] = lPickAr[RandomNum];   // GET PICK PickAr[1-73]
      lPickAr.splice(RandomNum, 1);                             // REMOVE ITEM PICKED FROM ARRAY
      CurrentPick++;                                            // INCREMENT CURRENT PICK

      RandomNum = Math.floor(Math.random() * 72);               // GET FOURTH PICK
      PickAr[CurrentBlock][CurrentPick] = lPickAr[RandomNum];   // GET PICK PickAr[1-72]
      lPickAr.splice(RandomNum, 1);                             // REMOVE ITEM PICKED FROM ARRAY
      CurrentPick++;                                            // INCREMENT CURRENT PICK

      RandomNum = Math.floor(Math.random() * 71);               // GET FIFTH PICK
      PickAr[CurrentBlock][CurrentPick] = lPickAr[RandomNum];   // GET PICK PickAr[1-71]
      PBallAr[CurrentBlock] = Math.floor((Math.random() * 15) + 1);
      SortPickAr();
      SetBlock();
      RenderAr();
    }
    /**  MultiDraw -
    **********************************************************************************************/
    var MultiDraw = function (DDList) {
      var PNum = DDList.options[DDList.options.selectedIndex].value;
      Multdraw = PNum;                                      // ADD MULTI DRAW
      document.getElementById("MultDiv").innerHTML = PNum;   // SET THE DIV WITH PICK
      return false;
    };
    /**  SetMegaplier -
    **********************************************************************************************/
    var SetMegaplier = function () {
      if (Megaplier == false) {
        Megaplier = true;
        document.getElementById("MegaDiv").innerHTML = "On";
      }
      else {
        Megaplier = false;
        document.getElementById("MegaDiv").innerHTML = "Off";
      }

      return false;
    };
    /**  ShowMessage -
    **********************************************************************************************/
    var ShowMessage = function(sTitle, sMessage) {
      if ($("#DynoMessage").is(":visible")) {      // CHECK TO SEE IF #DivI01 IS VISIBLE
        $("#DynoMessage").fadeOut("slow");         // IF SO HIDE #DivI01
        $("#DynoBackdrop").fadeOut("slow");         // IF SO HIDE #DivI01
      }
      else {
        $("#DynoBackdrop").delay(400).fadeIn("slow");  // IF SO HIDE #DivI01
        $("#DynoMessage").delay(800).fadeIn("slow");   // SHOW "#DivI02"
        $("#DynoMessage > h1").text(sTitle);
        $("#DynoMessage > p").text(sMessage);
      }
    }
    /**  HideMessage -
    **********************************************************************************************/
    var HideMessage = function () {
      if ($("#DynoMessage").is(":visible")) {      // CHECK TO SEE IF #DivI01 IS VISIBLE
        $("#DynoMessage").fadeOut("slow");         // IF SO HIDE #DivI01
        $("#DynoBackdrop").fadeOut("slow");         // IF SO HIDE #DivI01
      }
      else {
        $("#DynoBackdrop").delay(400).fadeIn("slow");         // IF SO HIDE #DivI01
        $("#DynoMessage").delay(800).fadeIn("slow"); // SHOW "#DivI02"
      }
    }

    /**  Expose Functions
    **********************************************************************************************/
    w.AddTicket = AddTicket;
    w.PickNumber = PickNumber;
    w.Powerball = Powerball;
    w.ClearAll = ClearAll;
    w.ClearCurrent = ClearCurrent;
    w.QuickPick = QuickPick;
    w.MultiDraw = MultiDraw;
    w.SetMegaplier = SetMegaplier;
    w.ShowMessage = ShowMessage;
    w.HideMessage = HideMessage;
  })(window, jQuery);
