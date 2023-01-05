# Tourguide / Event Platform [name?]

The Project idea is a Application that allows providers and customers to join and create guided travel tours or events that customers should be able to purchase.

## What this application supposed to do in detail?

Base App description: This app is a solution for providing guided tours and events.
The main functionality of the app is that a provider can join the app and create tours & events for customers. Visitors can search and explore every offering (tours & events) that providers created within the App. The regular customer is able to sign up with email address or with his google account.
Customers can then purchase a tour or event and handle the details of the purchased product in their Dashboard. Further they should be able to handle the details of their profile + settings in the Dashboard.
Providers can do the same things as customers in the Dashboard but also have the ability to create new offers. On creating a new offer, the Provider can decide whether to create a tour or a event. The offer (product) itself should contain the Provider (UserId), Title, a short description, a thumbnail Picture, the Price of the Offering and a ID to the "Product type". The Product type could be a tour or an event and is composed of 2 chunks of data. The first chunk is the detailed event/tour description which is generated with a WYSIWYG editor. The second chunk consist of Maps data with all the Places on which this tour takes place or the laction of the event as an array of objects.

When the tour / event is over, the customer should be able to Leave a rating + comment.
For the Base app should a simple internationalization also be available. Which means that the basic frontend UI should be available in a minimum of two languages.

Roles:

- Customer

  - Should be able to register with email address or with a google account.
  - Can explore, purchase and handle purchased tours
  - Can Setup a simple profile if they want to.
  - Can rate + comment completed tours / events
  - Should be able to pay with stripe.
  - User can edit his own comments

- Provider

  - Can do what customers can do.
  - Can create a product with a rich text editor and with the ability to set custom places on the map.
  - Can overview and edit his tours in the dashboard.
  - If a provider replies to comment made by an customer, they should be able to delete the costumer comment [Mod functionality]

- Mod/Admin (Wishlist)
  - Access to everything
  - Can change role permissions for the user and provider
  - Can deactivate and delete products.

## Server

### Models

- User Model:

  - username: type: String, required: true, unique, trim
  - email: type: String, unique, lowercase: true, required: true, trim: true
  - passwordHash: type: String, required: false (because of google auth)
  - firstName: type: String
  - lastName: type: String
  - role: type: String, default: "user || provider",
  - email-verified: type: Boolean, default: false
  - with timestamps

- Product Model:

  - UserId: type: Schema.Types.ObjectId, ref: "user", required: true
  - title: type: String, required: true
  - price: type: Number, required: true
  - tagline: type: String, maxLength: 230
  - productThumbnail: type: String
  - productItem type: Schema.Types.ObjectId,
  - productType:
  - productLimit: type: Number, required: true.
  - rating:: Schema.Types.ObjectId -> new model schema
  - with timestamps

- Places Model:

  - UserId: type: Schema.Types.ObjectId, ref: "user", required: true
  - title: type: String, required: true
  - description: type: String, required: true
  - picture: type: String
  - moreLink: type: String
  - timestamps

- productItem: (Type: event / tour)

  - productId: type: Schema.Types.ObjectId, ref: "product", required: true
  - eventDate: type: Date, required: true
  - description: type: Object, required: true
  - mapData: [Object], required: true // optional idea would be that a provider can extra create "places" and reference it here by [Schema.Types.ObjectId]

- user (Provider and Special user) Profile

  - UserId : type: Schema.Types.ObjectId, required: true, ref: 'user'
  - aboutMe: type: String
  - payment credential: (ToDo)
  - Rating: type: Number
  - kind of provider: type: String, required: true.

- Rating Model:

  - ProductId: type: Schema.Types.ObjectId, required: true, ref: 'product'
  - UserId: type: Schema.Types.ObjectId, required: true, ref: 'user'
  - rating: type: Number, required: true
  - comment: type: String
  - timestamps

- purchase:

  - userId: type: Schema.Types.ObjectId, required: true, ref: 'user'
  - productId: type: Schema.Types.ObjectId, required: true, ref: 'product'
  - status: type: String, enum: ["open", "payed", "Visited"]
  - timestamps

- Follow Model:

  - follower: type: Schema.Types.ObjectId, required: true, ref: 'user'
  - followee: type: Schema.Types.ObjectId, required: true, ref: 'user'
  - timestamps

- purchaseHistory (wishlist .. a timeline in frontend would be cool?):
  - userId: type: Schema.Types.ObjectId, required: true, ref: 'user'
  - purchaseId: type: Schema.Types.ObjectId, required: true, ref: 'purchase'
  - timestamps

### Endpoints (Not logically sorted yet)

- tours, events & experiences (products)

  - app.use('/event', eventRouter) (the word "event" doesn't fit well in here )

    - GET -> router.get('/', (req, res, next) => {}) (get all the events from the DB (not tours))
    - GET -> router.get('/:productId' (req, res, next) => {}) (get the product: productItem detail page data)
    - GET -> router.get('/travel', (req, res, next) => {}) (get all the tours from the db)
    - GET -> router.get('/:productId/rating' (req, res, next) => {}) (get the ratings for a specific product)
    - POST-> router.post('/:productId/rating/new/' (req, res, next) )
      //- POST- > router.get('/create/:id', (req, res, next) => {}) ...see Product Handling (create new event/tour and assign to userID)
    - POST-> router.get('/booking/:productId', (req, res, next) => {}) (if customer purchase a tour or event)
    - PUT -> router.put('/booked/:productId', (req, res, next) => {}) (update the status of a purchase)

- Places handling:

  - app.use(/place/ placeRouter)
    - GET -> router.get( "/", (req, res, next) => {}) ... Get all places of current provider
    - POST-> router.post("/create", (req, res, next) => {}) ...Add a new place to the DB
    - PUT -> router.put("/edit/:placeId/, (req, res, next) => {}) ...update a specific
    - DEL -> router.delete("/delete/:placeId", (req, res, next) => {}) ...delete a place

- Product handling

  - app.use('/product' productRouter)
    - GET -> router.get('/', (req, res, next) => {}) ...if user === provider, get all created products
    - GET -> router.get('/:productId' (req, res, next) => {}) (get the product: productItem detail page data)
    - GET - router.get('/:id', (req, res, next) => {}) ...get all events and tours created by the provider (public)
    - POST -> router.post('/create', (req, res, next) => {}) ...if user === provider, can create a base product
    - POST -> router.post('/:productId/add-event', (req, res, next) => {}) ...then adding the productItem
    - PUT -> router.put('/edit/:productId', (req, res, next) => {}) ...editing/updating the product, like price / thumbnail
    - PUT -> router.put('/edit/:productItemId', (req, res, next) => {}) ...editing/updating the offered "Item"
    - DEL -> router.delete('/delete/:id/:productId', (req, res, next) => {}) (provider ability to delete a productItem!)

- authentication:

  - app.use('/authentication', authenticationRouter)
    - POST -> router.post('/google/login', (req, res, next) => {})
    - POST -> router.post('/google/signup', (req, res, next) => {})
    - POST -> router.post('/signup', (req, res, next) => {})
    - POST -> router.post('/login', (req, res, next) => {})
    - GET -> router.get('/verify', (req, res, next) => {})
    - POST -> router.get('/password-reset', (req, res, next) => {})
    - PUT -> router.put('/password-reset/:id/:token' (req, res, next) => {}) ...update PW.

- User

  - app.use('/user', userRouter)
    - GET -> router.get('/', (req, res, next) => {}) ...get own user data if logged in
    - GET -> router.get('/:purshaseId', (req, res, next) => {}) ... get specific purchase data
    - GET -> router.get('/purchase-history',(req, res, next) => {})
    - GET -> router.get('/:id', (req, res, next) => {}) .. get user profiles to show up for everyone
    - POST-> router.post('/:id/follow', (req, res, next) => {})
    - DEL -> router.delete('/:id/follow', (req, res, next) => {})
    - PUT -> router.put('/:id/role', (req, res, next) => {}) (to level a user up to a provider & vice versa)
    - ->

- Provider

  - app.use('/provider', providerRouter) (Rating for providers? Wishlist? )

- Profile
  - app.use('/profile', profileRouter)
    - GET -> router.get('/', (req, res, next) => {}) ...get own extra profile data if logged in as a provider
    - GET -> router.get('/:id', (req, res, next) => {}) ...get a provider profile for everyone
    - POST-> router.post('/new/provider/', (req, res, next) => {}) ...providers have to create additional profile
    - PUT -> router.put('/provider/edit', (req, res, next) => {}) => {} ...providers can edit their profile
    - PUT -> router.put('/edit', (req, res, next) => {}) ...edit user profile
    - DEL -> router.delete('/delete', (req, res, next) => {}) ... handle delete own user data. (wishlist)

## Client

### Pages

### Components

### Services

### Layout & Design guidelines

- Navbar(UI Component)

  - Should contain a SVG logo
  - Navigation: Links to pages (Right now there is too much)
  - Add a Internationalizion menu
    - undecided: whether open on hover or dropdown to select
    - Language: English
    - Language: undecided (2 languages should be enough for the UI)
  - Conditional show "Signup" / "Login"
  - Show A notification bell on the right (when the followed provider has new events, for billig notifications or notify about a new follower)
  - Conditional show the Profile Picture (with or without the username?) as a dropdown menu
    - Menu contains a link to dashboard
    - Contains a link to profile (it should be a page in the dashboard)
    - A Logout Link/Button

- Footer(UI Component)

- Main-Page
  - Should have a nice Hero section with a search bar.
  - Show Events/Tours as Cards
  - More solutions to display products under different parameters.
  -

#### i18n / wysiwyg / product models: product itself, product date (event / tour etc) / product location
