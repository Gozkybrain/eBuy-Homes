# eBuy Property Listing
**eBuy Homes** is a Real Estate Broker Startup, and this is the first version of the proposed eBuy Mobile Application and it is aimed at simply listing valid and available housing properties. 

`Note that the data provided in this version of the public app does not point to any real property, but are made up for presentation purpose.`

The app is a simple starter point both for developers and users alike, only simple firebase authentication needed.

The app simply has navigation and search bars that help you find property from search results.

The documentation for this project contains series of explanatory steps, it also has a [Data API Documentation](https://github.com/Gozkybrain/eBuy-API).

There is also a json file with my demo dataset for this project which can use for your projects as well. This project is a prototype for the developers to build the official app, so basically this release is the initial concept and I've been given permission to share for educational purposes.

## About the Application 
Name: eBuy Houses

Features: Just like zillow, it has a listing for houses that can be found by search based on `type`, `amenities`, and `closestLandmark`.

Payment subscription:
The app at this stage does not require any form of payment, but future and official releases, the app promises a subscription panel to handle plans. These plans will give agents access to add properties to the list, and help buyers get even better deeper searches.

## User POV
The POV of a regular user is self explanatory. After onboarding, the app loads up some properties, maybe on random, and has some navigation system below: `Home` with search component, `Cheap` with a random property with pricing below $500,000, `New` with a random property generally, and `Account` with the logged in user's profile details.

When a property is selected, the screen opens up with all the property details and a button to contact seller. All product available at this point were made by one seller, and the board is yet to decide how to handle seller permissions so all the buttons will link to a single seller page.

## Developer Guide
The project has been documented such that it can be understood by any level of developer as each component has been carefully commented, it should be a piece of cake for future management even by a junior developer.

### Project Technologies
1. React Native
2. Expo Go
3. Firebase & Firestore
4. FontAwesome
5. Render (API Server)
6. GitHub

To start the project,
```
npx expo start
```

Select `i` to open an ios version of the app on simulator, or `a` to open an andriod version.

For Authenticating with Firebase, I have also provided a [Simple YouTube Guide to this regard](https://www.youtube.com/watch?v=MGBfr3WwIyw), I have commented my codes such that anyone can work with this repo as a guide. The Authentication will enable you create a Sign In and Sign Up System, but I have modified it to include forgot password. The profile at `Account` tab will contain the user's information, and options to change password, edit details, and logout.

The API Server and Data are documented on Github at [eBuy API](https://github.com/Gozkybrain/eBuy-API), all parts of this project can be replicated.

### Future Upgrades
1. **Subscription Plans:** A subscription plan to handle Agents getting certain abilities to add properties.
2. **Commissions:** A commission system where the Agent gets 80% of both mobilization fee for physical tour, and Agency fee; while the broker keeps 20% for smooth running and escrow service.
3. **Payment System & Gateway:** A payment gateway to enable user's fund their account, and withdraw back if need be.
4. **Virtual Tour:** This will consist of a very detailed video mapping around the house, its rooms, and environs, just as if the user were to see it themselves.
5. **Location Mapping:** This will consist of a map lining and calculating the distance between the user's address and the one selected.
