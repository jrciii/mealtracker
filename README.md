# mealtracker
Google Sheet that helps you track and plan your meals so you can meet your daily goals.

At the moment, this is not available as a sheets add on.
To get this working, import the Meal Tracker.xlsx sheet into a new spreadsheet.

Then go to Tools -> Script Editor and then paste the contents of MealTracker.gs into the script editor.

Finally, in the script editor, go to Resources -> Current Project's Triggers and then add the following two triggers:

| Run    | Events           |         |
|--------|------------------|---------|
| onEdit | From spreadsheet | On edit |
| onOpen | From spreadsheet | On open |

You can change how often failures for these events happen by clicking the "notifications" link next to these triggers.

[jrciii's meal tracker](https://docs.google.com/spreadsheets/d/1LKBG1TOvgxSE58UwgxCAMFshzSjQd5FtKENLDglbqiQ/pubhtml)
