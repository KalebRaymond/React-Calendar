# User stories

## 1. View Current Month
As a user, I want to be able to view the current month, so I can see what events are in the calendar

### Acceptance Criteria
- The calendar displays the name of the month
- The calendar displays the year
- Calendar dates in the top row of the calendar should display days of the week above the card date number, in order of Sunday to Saturday
- Each day of the month will indicate that there is an event on that date if there are any

## 2. View Other Months
As a user, I want to be able to navigate to past and future months in the calendar, so that I can see what events are in the past and future
	
### Acceptance Criteria
- Calendar dates in the current month view that are part of previous/future months are grayed out
- Grayed out dates will indicate that there is an event on that date if there are any
- The calendar will display navigation arrows at the top to allow for navigating forward and backward

## 3. View Event Details
As a user, I want to be able to view event details, so that I can plan for it and be reminded of the location, time, etc.

### Acceptance Criteria
- The calendar should display the name of events on each calendar date
- Clicking on an event should display the event details
	* Time
	* Location
	* Name

## 4. Add New Events
As a user, I want to be able to add new events to my calendar, so that I can keep track of events coming up in my life

### Acceptance Criteria	
- Clicking on a calendar date should allow the user to enter details for a new event
	* Time
	* Location
	* Name
- User should be able to cancel the form without creating a new event
- Submitting the form should create a new event
- The new event should be displayed on the calendar on the date specified by the user

## 5. Delete Events
As a user, I want to be able to delete events, so that I can manage space on my calendar and remove events that have been cancelled in real life

### Acceptance Criteria	
- Clicking on an event should display an option for deleting the event
- Clicking delete should produce an "Are you sure" confirmation
- Deleting an event should remove it from the calendar

## 6. Edit Events
As a user, I want to be able to edit events, so that I can update information in case the event changes
	
### Acceptance Criteria
- Clicking on an event should display the event details
- Clicking on the fields for the event details (ex. the title field) should allow the user to change the name
- Removing focus from the field (ex. by clicking elsewhere or tabbing out of the field) should automatically save any changes
- Changes to the event (ex. date, name) should be automatically reflected on the calendar
