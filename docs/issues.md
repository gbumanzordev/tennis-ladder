# Issues -- Tennis Ladder

# I0: Ladder - UI
Area: Ladder management

[Case 1]
Steps to reproduce:
- Sign in with alice@test.dev.

[Case 2]
Steps to reproduce:
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click "Standing".
- Click "Players".
- Click "Matches".

Observed behavior:
When click any those options do not show [there is no data] when the data is empty.

Expected behavior: 
When the user click any link should frame or dialog with "There is no data".

additional: 
The players without matches should be - in the column WIN "Nan%"

Status: Open

# I1: Do not load new ladder
Area: Ladder management

Steps to reproduce:
- Sign in with alice@test.dev.
- fill to input "new ladder test".
- the view doesn't show the new item.

Observed behavior:
When refresh the page, the data reload and show the new item. The function to add new ladder is ok but no reload new items.

Expected behavior: 
When the user click "Add" to add the ladder should be reload new items to rename, to manage or to delete.

Status: Open

# I2: Ladder management do not have confirm to delete
Area: Ladder management - Delete

Steps to reproduce:
- Sign in with alice@test.dev.
- Click "Delete".
- The ladder was deleted without confirm.

Observed behavior:
When click "Delete" in the ladder item, was deleted without confirm or warning before to delete

Expected behavior: 
When the user click "Delete", the action should be ask confirm to delete or warning about this action.

Status: Open

# I3: Matches to [New matches with the same players]
Area: Matches management
Data for this example:
- Match Name: NewLadder
- Player Name: Gerson Umanzor

Steps to reproduce: 
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Matches".
- Select player A "Gerson Umanzor".
- Select player B "Gerson Umanzor".
- Select WINNER.
- fill SCORE.
- Click "Add match".


Observed behavior:
When click "Add match" with the same player in player A & B, the match was added without validation

Expected behavior: 
When the user click "Add match", the action should be validate it and do not add match with the same player in the input player A & B.

Status: Open

# I4: Matches to [New matches with the same or different players with the same date]
Area: Matches management
Data for this example:
- Match Name: NewLadder
- Player Name: Gerson Umanzor

Steps to reproduce: 
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Matches".
--- repeat this
- Select player A "Gerson Umanzor".
- Select player B "Gerson Umanzor".
- Select WINNER.
- fill SCORE.
- Played on Today {08/09/2026}.
- Click "Add match".


Observed behavior:
When click "Add match" with the same player in player A & B, the match was added without validation

Expected behavior: 
When the user click "Add match", the action should be validate it and do not add match with the same player in the input player A & B.

Status: Open

# I5: Matches to [New matches without scored | No validation]
Area: Matches management
Data for this example:
- Match Name: NewLadder
- Player Name: Gerson Umanzor
- Player Name: German Gonzalez

[Case 1]
Steps to reproduce:
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Matches".
- Select player A "Gerson Umanzor".
- Select player B "German Gonzalez".
- Select WINNER.
- Do not fill SCORE.
- Click "Add match".

Observed behavior:
When click "Add match" without scored, the match was added without validation

Expected behavior: 
When the user click "Add match", the action should be validate it and do not add match without scored of player A & B.
Do not have structured validation

Status: Open

[Case 2]
Steps to reproduce:
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Matches".
- Select player A "Gerson Umanzor".
- Select player B "German Gonzalez".
- Select WINNER.
- fill SCORE "6060" or "6-26-2".
- Click "Add match".

Observed behavior:
When click "Add match" with these scored, the match was added without validation

Expected behavior: 
When the user click "Add match", the action should be validate it and do not add match with those scored of player A & B.

Status: Open

# I6: Matches management - Editing is not avialable
Area: Matches management

Data for this example:
- Match Name: NewLadder

Steps to reproduce:
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Matches".
- Look for an option to edit or change the match.

Observed behavior:
When click "Matches", there is no visible way to edit an existing match.

Expected behavior: 
When the user click "Match", should be able to edit an existing match, including its players, winner, and score, according to the application

Status: Open

# I7: Ladder management do not have confirm to delete
Area: Ladder management - Delete players

Data for this example:
- Match Name: NewLadder
- Player Name: Gerson Umanzor

Steps to reproduce:
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Players".
- Click "Delete" to "Gerson Umanzor"

Observed behavior:
When click "Delete" in the player, no delete, no show massage

Expected behavior: 
When the user click "Delete", the action should be ask confirm to delete or warning about this action.

Status: Open

# I8: Ladder management - Errors in browser console
Area: Ladder management - Delete players

Data for this example:
- Match Name: NewLadder

Steps to reproduce:
- Sign in with alice@test.dev.
- Click "NewLadder".
- Click to tab "Players".
- Click to tab "Matches".
- Click to tab "Standing".
- Click to tab "Matches".
- Click to tab "Players".
Error: Uncaught TypeError: Cannot read properties of undefined (reading 'startTime')

Observed behavior:
When toggle with these links in ladder management show that error.

Expected behavior: 
The action shouldn't show errrors in browser console.

Status: Open