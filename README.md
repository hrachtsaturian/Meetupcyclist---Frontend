## MeetupCyclist
### Overview
Whether a seasoned rider, weekend cruiser, or someone who admires the motorcycle lifestyle, MeetupCyclist as a platform connects people with opportunities to engage, explore, and share passion. With a user-friendly interface, MeetupCyclist offers an all-in-one experience to dive into the motorcycling community.

The 'Events' section lets users find and host activities like group rides, motorcycle rallies, workshops, and charity fundraisers. Event pages allow users to RSVP, share comments, and collaborate on event details, making it easier to plan and enjoy riding experiences together.

In the 'Groups' section, riders can join or create communities based on riding styles or bike types. Whether it’s track day enthusiasts, long-distance touring fans, or vintage bike lovers, users can find their niche, plan activities, and exchange tips and stories.

The 'Locations' section helps riders discover exciting spots such as twisty roads, scenic routes, biker-friendly pubs, and tracks. Each location includes maps, reviews, and descriptions to give users an idea of what to expect.

Users can save events, groups, and locations to their profiles for easy access. Event pages and group discussions are lively spaces for sharing excitement, asking questions, and connecting with the community. Users can also leave reviews and ratings on locations, offering valuable insights to fellow riders.

### Tech Stack
#### Front End
- Frameworks
 - React.js
- Main Libraries
 - Reactstrap
#### Back End
- Frameworks
  - Express.js
- Main Libraries
  - NodePG
#### Database  
- PostgreSQL
  
### Goal
MeetupCyclist aims to be the ultimate hub for riders to connect, explore, and celebrate their love of motorcycling. From finding next ride to planning an epic road trip, the platform fosters connections and unforgettable memories within the motorcycling community.

### Target Users
MeetupCyclist is a web application designed for motorcycle enthusiasts and bike lovers. 

### API
The following APIs were used for:

1. Google Cloud Storage - to upload and save images: 
 - [Documentation](https://cloud.google.com/storage/docs)

2. Google Cloud Maps - to include a map showing event destinations or other locations: 
 - [Documentation](https://developers.google.com/maps/documentation?hl=en&_gl=1*1c1ymmb*_ga*MjA2Mjk2MDczNi4xNzMzNDg1MTc1*_ga_NRWSTWS78N*MTczNDQ0MDg1OC41LjAuMTczNDQ0MDg1OC4wLjAuMA..)

### Live Demo
Check out the live demo: MeetupCyclist on Render

https://.onrender.com

### Project Breakdown
#### Database Models
- Users: Represents registered users
- Events: Represents hosting or hosted events
- Event_attendees: Represents users who attend event 
- Event_posts: Represents posts which were created within event community
- Event_saves: Represents event which was bookmarked/saved by user
- Groups: Represents founded groups
- Group_members: Represents users who joined group
- Group_events: Represents events which are linked to group
- Group_posts: Represents posts which were created within group community
- Group_saves: Represents group which was bookmarked/saved by user
- Locations: Represents created locations
- Location_reviews: Represents reviews which were posted by users for location
- Location_saves: Represents location which was bookmarked/saved by user
  
#### Example Endpoints
- GET `/users/:id` Retrieve user data
- GET `/users` Retrieve users data
- PATCH `/users/:id` Update user's data
- POST `/events` Create event
- GET `/events/:id` Retrieve event data
- GET `/events` Retrieve events data
- PATCH `/events/:id` Update event's data
- DELETE `/events/:id` Delete event data
- POST `/groups` Create group
- GET `/groups/:id` Retrieve group data
- GET `/groups` Retrieve groups data
- PATCH `/groups/:id` Update group's data
- DELETE `/groups/:id` Delete group data
- POST `/locations` Create location
- GET `/locations/:id` Retrieve location data
- GET `/locations` Retrieve locations data
- PATCH `/locations/:id` Update location's data
- DELETE `/locations/:id` Delete location data
  
#### Functionality Features
- User Authentication/Authorization: Signup and login functionality.
- Events - creating, editing data/deleting, attending/unattending events, leaving posts.
- Groups - creating, editing data/deleting, joining/leaving groups, creating group events or ability to link existing events, leaving posts.
- Locations - only admins permitted to implement Create, Update, Delete while any user can leave reviews and rating.
- Profile functionality: viewing user's upcoming/past events, joined groups, as well as bookmarked events, groups, and locations
- Admin authorization - website admin is able to delete any event, group, location, post, review, as well as deactivate user's account

#### How to run locally
1. Set up database 
  - install PostgreSQL
  - create new database named `meetupcyclist`
  - Create schemas from `meetupcyclist-schema.sql`
  - (optional) seed database from `meetupcyclist-seed.sql`
2. Install packages
  - suggested node v22.11.0 and npm 10.9.0
  - `npm install`
3. (Optional) Google Cloud
  - Setup role for Google Storage
     - enable storage permission
     - export json containing keys to env var `GOOGLE_APPLICATION_CREDENTIALS`
  - Setup role for Google Maps
     - enable Google Maps API permission
     - change `GOOGLE_API_KEY` constant in front-end MapFrame.js file
4. Launch Express and React servers
  - `npm start`
5. Navigate to the following URL in your browser
  - `http://127.0.0.1:3000/`
  
###### Start exploring today and discover the world of motorcycling like never before!
