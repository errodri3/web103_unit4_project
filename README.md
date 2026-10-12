# WEB103 Project 4 - *Bolt Bucket*

Submitted by: **Evelyn Rodriguez**

About this web app: **Bolt Bucket lets you design your own car. Pick an exterior color, roof, wheels, and interior, and the car picture and price update as you go. You can save your car, then view, edit, or delete all the cars you've built. Some combos can't be built (like Racing Buckets in a Convertible), and the app won't save those.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] The car is drawn as an SVG, so the color, roof, wheels, and seats all change in the picture
- [x] Locked options show a short note explaining why they don't work with your other picks
- [x] A "Lock options" switch can be turned off to test the server-side error for impossible combos
- [x] The server checks combos and works out the price itself, so bad data can't be saved even without the UI
- [x] Delete asks you to click again to confirm, so you don't delete a car by accident

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

Render dashboard and table contents (`SELECT * FROM custom_items;`):

<img src='database.gif' title='Database Walkthrough' width='' alt='Database Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with Kap and Playwright

## Notes

The trickiest part was keeping the combo rules the same on the client and the server. The client uses them to lock options early, and the server uses them so an impossible car is never saved. I also had to join the `custom_items` table with the `options` table four times (once per feature) to get the option names and values for each car.

## License

Copyright 2026 Evelyn Rodriguez

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
