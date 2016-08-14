function getMealStats(cell) {
  var meals = SpreadsheetApp.getActiveSheet();
  var ingredients = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Ingredients");
  var rows = meals.getLastRow();
  var theCell = meals.getRange(cell);
  var mealNameRange = meals.getRange("A" + theCell.getRow() +":I" + theCell.getRow());
  if (mealNameRange.getRow() > rows + 1 || mealNameRange.getCell(1,1).getValue() == '') {
    return ["","","","","",""];
  }
  var nextMealRow = mealNameRange.getRow();
  while ((meals.getRange(nextMealRow + 1, 1).getValue() == '') && (nextMealRow + 1) <= rows) {
    ++nextMealRow;
  }
  ingVals = meals.getRange("H" + mealNameRange.getRow() + ":H" + nextMealRow).getValues();
  servVals = meals.getRange("I" + mealNameRange.getRow() + ":I" + nextMealRow).getValues();
  Logger.log("Generating stats for meal with ingredients in rows: " + mealNameRange.getRow() + " - " + nextMealRow);
  var calories = 0;
  var protein = 0;
  var cost = 0;
  var fat = 0;
  var carbs = 0;
  var fiber = 0;
  for (var i = 0;i<ingVals.length;++i) {
    var ingredient = ingVals[i][0];
    var row = findInColumn("Ingredients","A",ingredient);
    Logger.info("Getting ingredient info for " + ingredient + " from cell B" + row + ":G" + row);
    ingStats = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Ingredients").getRange("B" + row + ":G" + row).getValues();
    calories += ingStats[0][0] * servVals[i];
    cost += ingStats[0][1] * servVals[i];
    protein += ingStats[0][2] * servVals[i];
    fat += ingStats[0][3] * servVals[i];
    carbs += ingStats[0][4] * servVals[i];
    fiber += ingStats[0][5] * servVals[i];
  }
  return [calories, cost, protein, fat, carbs, fiber];
}

function getDayStats() {
  var allMeals = SpreadsheetApp.getActiveSheet().getRange("B8:H").getValues();
  var allMealStats = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Meals").getRange("A2:G").getValues();
  Logger.info("All meal stats: " + JSON.stringify(allMealStats));
  var calorieRow = [0,0,0,0,0,0,0];
  var costRow = [0,0,0,0,0,0,0];
  var proteinRow = [0,0,0,0,0,0,0];
  var fatRow = [0,0,0,0,0,0,0];
  var carbRow = [0,0,0,0,0,0,0];
  var fiberRow = [0,0,0,0,0,0,0];
  var calcGrid = [calorieRow, costRow, proteinRow, fatRow, carbRow, fiberRow];
  var mealStatMemo = {};
  for (var i=0;i<allMeals.length;++i) {
    for (var j=0;j<7;++j) {
      var meal = allMeals[i][j];
      if (meal == "") {
        continue;
      }
      var mealStats = mealStatMemo[meal];
      if (mealStats == null) {
        Logger.log("No meal stats memo found, generating.");
        mealStats = findRowInMatrix(meal,allMealStats);
        mealStatMemo[meal] = mealStats;
        Logger.log("Generated meal stats: " + JSON.stringify(mealStats));
      }
      calorieRow[j] += mealStats[1];
      costRow[j] += mealStats[2];
      proteinRow[j] += mealStats[3];
      fatRow[j] += mealStats[4];
      carbRow[j] += mealStats[5];
      fiberRow[j] += mealStats[6];
    }
  }
  Logger.log("Calc grid: " + JSON.stringify(calcGrid));
  return calcGrid;
}

function findRowInMatrix(key,matrix) {
  for (var i=0;i<matrix.length;++i) {
    if (matrix[i][0] == key) {
      Logger.info("Found row for key " + key + " " + JSON.stringify(matrix[i]));
      return matrix[i];
    }
  }
}

function findInColumn(sheet,column,data) {
 
  var sheet  = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
  var column = sheet.getRange(column + "2:" + column);  // like A:A
  
  var values = column.getValues(); 
  var row = 0;
  
  while ( values[row] && values[row][0] !== data ) {
    row++;
  }
  
  if (values[row][0] === data) 
    return row+2;
  else 
    return -1;
}

function onEdit(event) {
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() == "Meals") {
    var last = lastRow("A");
    // Dont delete meal headers if no meals present.
    if (last == 1) {
      return;
    }
    var range = sheet.getRange("B2:G" + last);
    var rangeValues = range.getValues();
    for (var i=0;i<range.getHeight();++i) {
      Logger.log("Generating meal stats for meal at: A" + (i+2));
      rangeValues[i] = getMealStats("A" + (i + 2));
    }
    range.setValues(rangeValues);
  } else if(sheet.getName().indexOf("Diet") !== -1) {
    var calcRange = sheet.getRange("B2:H7");
    calcRange.setValues(getDayStats());
  }
}

function onOpen(event) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ingSheet = ss.getSheetByName("Ingredients");
  var mealSheet = ss.getSheetByName("Meals");
  var dietSheet = ss.getSheetByName("Diet");
  
  var ingNameRange = ingSheet.getRange("A2:A");
  var mealIngNameRange = mealSheet.getRange("H2:H");
  var mealIngServRange = mealSheet.getRange("I2:I");
  var mealIngRule = SpreadsheetApp.newDataValidation().requireValueInRange(ingNameRange).build();
  var mealServingRule = SpreadsheetApp.newDataValidation().requireNumberGreaterThan(0).build();
  
  mealIngNameRange.setDataValidation(mealIngRule);
  mealIngServRange.setDataValidation(mealServingRule);
  
  var dietMealRange = dietSheet.getRange("B8:H");
  var mealNameRange = mealSheet.getRange("A2:A");
  
  var dietMealRule = SpreadsheetApp.newDataValidation().requireValueInRange(mealNameRange).build();
  dietMealRange.setDataValidation(dietMealRule);
}


function lastRow(column) {
  var lastRow = SpreadsheetApp.getActiveSheet().getMaxRows();
  var values = SpreadsheetApp.getActiveSheet().getRange(column + "1:" + column + lastRow).getValues();

  for (var none = 0; values[lastRow - 1] == "" && lastRow > 0; --lastRow) {}
  return lastRow;
}
