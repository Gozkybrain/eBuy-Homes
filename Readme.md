# eBuy Property Listing
eBuy is a Real Estate Broker Startup, and this is the first version of the proposed eBuy Mobile Application and it is aimed at simply listing valid and available housing properties. `Note that the data provided in this version of the public app does not point to any real property, but are made up for presentation purpose.`

The app is a simple starter point both for developers and users alike, no authentication needed!

The app simply has navigation and search bars that help you find property from search results.

The documentation for this project contains series of explanatory steps, it also has a [Data API Documentation](./assets/data/documentation.md).

There is also a [list.json](./assets/data/list.json) file with my demo dataset for this project which can use for your projects as well.


To start the project,
```
npx expo start
```

Select `i` to open an ios version of the app on simulator, or `a` to open an andriod version.

## About the Application 
Name: eBuy Houses

Features: Just like zillow, it has a listing for houses that can be found by search based on `type`, `amenities`, and `closestLandmark`.

Payment subscription:
The app at this stage does not require any form of payment, but future and official releases, the app promises a subscription panel to handle plans. These plans will give agents access to add properties to the list, and help buyers get even better deeper searches.

## User POV
The POV of a regular user is self explanatory. After onboarding, the app loads up some properties, maybe on random, and has some navigation system below: `Home`, `Cheapest`, `New`, and `Help`.
When a property is selected, the screen opens up with all the property details and a button to contact seller. All product available at this point were made by one seller, and the board is yet to decide how to handle seller permissions so all the buttons will link to a single seller page.

## Developer Guide
The project has been documented such that it can be understood by any level of developer as each component has been carefully commented, it should be a piece of cake for future management.

