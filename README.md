# mealtracker
# Google Sheet that helps you track and plan your meals so you can meet your daily goals.

At the moment, this is not available as a sheets add on.

# Setup
To get this working, import the Meal Tracker.xlsx sheet into a new spreadsheet.

Then go to Tools -> Script Editor and then paste the contents of MealTracker.gs into the script editor.

Finally, in the script editor, go to Resources -> Current Project's Triggers and then add the following two triggers:

| Run    | Events           |         |
|--------|------------------|---------|
| onEdit | From spreadsheet | On edit |
| onOpen | From spreadsheet | On open |

You can change how often failures for these events happen by clicking the "notifications" link next to these triggers.

# How To Use
Currently, you can track the calories, protein, fat, total carbs, and fiber you eat a day and how much money you spent. To track this, ingredients are combined into meals, and then meals are combined to give daily totals.

## Add ingredients.
Go to the Ingredients tab.
One row is one ingredient. Enter the ingredient name in the first column. The next two columns are used to calculate calories and cost per serving. In colums D-G, enter in the protein, fat, total carbs and fiber amounts per serving. In the $ column, enter in the price paid per unit. And in the servings section enter in the servings per unit. Then go to columns B and C and auto fill the calculations to your added ingredient.

## Create a new meal.
Go to the Meals tab.

Each row with a value in the Name columns denotes the first ingredient of a meal. These lines are colored blue.
Ingredients underneath a blue line are a part of the meal denoted by the value in the first column of the blue line ingredient.

### To create a meal of a banana and a cup of milk using the ingredients in either of the example spreadsheets
Make sure youre in the Meals tab.
Enter in "Milk and Banana" in the Name column. The row should turn blue. In this same row, go to the Ingredients cell. Click the dropdown and select: milk, creamline whole, trickling springs. Then in the servings cell enter the number 1.
Then in the cell directly below the milk, creamline whole... value, click the dropdown and select banana, peeled, wegmans, 100g. Then in the servings cell next to it enter the number 1.

You should then see the following totals calculated shortly after entering these values in:

| Name          | Calories | Price $ | Protein g | Fat g | Carbs g | Fiber g | Ingredients                              | Servings |
|---------------|----------|---------|-----------|-------|---------|---------|------------------------------------------|----------|
|Milk and Banana|	241	     | 0.59	   |9          | 9     | 34      | 3       | banana, peeled, wegmans, 100g            | 1        |
|               |	         |     	   |           |       |         |         | milk, creamline whole, trickling springs | 1        |

This is one meal. To create a new meal underneath, enter the meal name in the first column of a new row underneath the last row containing the milk ingredient. This line should turn blue, denoting the start of a new meal.

## Combining meals to get daily totals
Go to Diet tab. Use the dropdown options in the cells for the day you want to add meals to and select meals you want.
Combine meals for a day by placing them underneath each other in that days column. Totals for that day will be calculated automatically in the frozen rows for that day's column.

# [jrciii's meal tracker](https://docs.google.com/spreadsheets/d/1LKBG1TOvgxSE58UwgxCAMFshzSjQd5FtKENLDglbqiQ/pubhtml)
