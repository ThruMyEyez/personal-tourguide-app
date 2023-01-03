# Tourguide / Event Platform [name?]

The Project idea is a Application that allows providers and customers to join and create guided travel tours or events that customers should be able to purchase.

## What this application supposed to do in detail?

Base App description: This app is a solution for providing guided tours and events.
The main functionality of the app is that a provider can join the app and create tours & events for customers. Visitors can search and explore every offering (tours & events) that providers created within the App. The regular customer is able to sign up with email address or with his google account.
Customers can then purchase a tour or event and handle the details of the purchased product in their Dashboard. Further they should be able to handle the details of their profile + settings in the Dashboard.
Providers can do the same things as customers in the Dashboard but also have the ability to create new offers. On creating a new offer, the Provider can decide whether to create a tour or a event. The offer (product) itself should contain the Provider (UserId), Title, a short description, a thumbnail Picture, the Price of the Offering and a ID to the "Product type". The Product type could be a tour or an event and is composed of 2 chunks of data. The first chunk is the detailed event/tour description which is generated with a WYSIWYG editor. The second chunk consist of Maps data with all the Places on which this tour takes place or the laction of the event as an array of objects.

When the tour / event is over, the customer should be able to Leave a Rating + Comment.
For the Base app should a simple internationalization also be available. Which means that the basic frontend UI should be available in a minimum of two languages.

Roles:

- Customer
- Should be able to register with email address or with a google account.
- Can explore, purchase and handle purchased tours
- Can Setup a simple profile if they want to.
- Can rate + comment completed tours / events

- Provider
- Can do what customers can do.

## Server

-

### Models

### Endpoints

## Client

### Pages

### Components

### Services

#### i18n / wysiwyg / product models: product itself, product date (event / tour etc) / product location
