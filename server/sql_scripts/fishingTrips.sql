DROP TABLE fish.fishingTrips;

CREATE TABLE fish.fishingTrips (
    pk int NOT NULL AUTO_INCREMENT,
    date nvarchar(128) NOT NULL,
    siteName nvarchar(128) NOT NULL,
    descrb nvarchar(1500) NOT NULL,
    rating int(1) NOT NULL,
    url nvarchar(128),
    fishCaught int(100) NOT NULL,
    tideType nvarchar(28) NOT NULL,
    PRIMARY KEY (pk)
);

INSERT INTO fish.fishingTrips(date,siteName,descrb,rating,url,fishCaught,tideType) 
VALUES
("2023-05-27","Hilton Fishing Pier","It was a cooler than usual day for late May. Windy, but sunny! We caught quite a few croaker and one flounder (see photo album!) Can't wait to get back out here!",5,"https://photos.app.goo.gl/TmFzfUUudr87wo9F6",8,"high tide"),
("2023-06-18","James River Fishing Pier","Mainly crabs were pulling. Dad caught one small one. No one around us was really catching anything. We did see dolphins! Kept our wrist bands in case we wanted to come back later. We did see a few people put lines and when they didn't any hits leave. We assume they were going to come back for the night high tide? Check out this cool sign using a dolphin for covid spacing! lol",3,"https://photos.app.goo.gl/kNdbRDwuiV6qobs26",1,"high tide"),
("2023-09-02","Newport News Park Campsite Launch","This was our first time here! We didn't get very far since we rented a John Boat and had to paddle with some ancient oars into the lake. The oars had splinters and were made for viking-type people. We though next time it would be best to bring a motor. I caught some seaweed (see pic). Despite our luck we had fun! It was our first go and learned quite a bit. We'll be better prepared for next time. Can't wait to see what the lake looks like with all the colored foliage in the fall!",2,"https://photos.app.goo.gl/BZpyoBbyriRJvRNPA",0,"na"),
("2023-07-30","Hilton Fishing Pier","Caught a bunch of little baby croaker! They were SMALL! A school of fish were jumping around the pier and towards the end of our adventure (as our worms began to run low) I caught the moby dick! A rainbow trout! We were sure this was one of jumper fish in our watery midst. I had never caught one of these before. It wasn't spiny but instead seemed to be something I'd consider eating. None of the fish we've caught this season we've kept. I threw this one back to meet the sweet fated freedom we gave the rest. We will never forget you moby dick! Hilton Pier for the win.... once again!",5,"https://photos.app.goo.gl/EMqA3g9hpF37fQpYA",7,"high tide"),
("2023-06-08","Yorktown Fishing Pier","We caught a few here, but lost a rig at the end. Apparently, losing rigs is a common thing at this pier. Dad caught a couple croaker and I caught a baby black sea bass! (see album) Gave it a three star because the fishing wasn't that great, but the bridge view is awesome. Plus we saw dolphins! ",3,"https://photos.app.goo.gl/qzGgHjL9o4ZdmT197",4,"high tide"),
("2023-09-10","Hilton Fishing Pier","Dad for the win! (4-3) We each caught 1 spot. The rest were croaker. All were returned to their rightful home in the Jimmy James. It started out cloudy, but then got hot. Saw some rays swimming around and the jumpers taunted us per usual. Once again, Hilton Village Pier delivers with beautiful views and decent catches.",5,"https://photos.app.goo.gl/JbrePiuBZsJQgXBS6",7,"ebb tide"),
("2023-09-19","Avalon Pier","Caught two in total. Used both squid and blood worms. LOTS of bites. They kept nibbling their way through the bait, none were really brave enough (or had mouths large enough) to commit to a full bite! Despite its size, one (the one dad caught) decided to go for it! We believed it to be a small yellow fin. The one I caught was smaller and unfortunately was caught by yanking aggressively yanking on the line out of frustration and hooking it by its gill. Beautiful day! Beautiful scenery! The perfect temperature. Not too crowded, but plenty going on.",4,"https://photos.app.goo.gl/BzNE5T1keXLRv6mcA",2,"ebb tide"),
("2023-10-08","Anderson Park (M&M Overlook)","It was a great day to fish! I got out early to the pier and into a nice clear sunny, slightly windy day. I could clearly see the Navy Base across the water.
This is my first-time fishing at Anderson Pier. It's a wooden pier that tees at the end, and open to the public, no cost. Also, I should mention the pier is easy to get too with plenty of parking and lighted at night.
Billy came along but didn't bring his pole, just a cooler of beer. When we arrived, there were two other guys fishing; by the time we left there was about 12 fishermen and fisherwomen filling the main pier.
The current is heavy, so I suggest a larger than normal weight. But the nice thing about this spot is the variety of fish. I caught a Blow-Toad, a Spot and a Crocker, and there were a couple of guys wading, trying to catch Puppy Drum. All the fish I caught were bigger than what I normally catch at the Hilton Pier. I'll attach photos.",4,"https://photos.app.goo.gl/6Qmq4nbwptTYyPcA8",3,"na"),
("2023-10-28","Anderson Park (M&M Overlook)","It was a beautiful day. The Hilton Fall Festival was happening so Jeri and I decided to get out of town and fish. We attempted to get to Fort Monroe, but the traffic was backed up and even stopped at one point, so we changed our mind and went to Andersons Pier.
The T spot at the top was full so we fished off the rock jetty until Jeri's reel broke. We packed up, went back to Hilton to get another reel and fish the Hilton Pier. The water was as clear as I have ever seen it, but the fish were not biting. We were visited by a pair of Eagles, apparently having the same luck as us.
we packed up again and went to the pizza shop.",1,"https://photos.app.goo.gl/Gm5iY4xCB4ER56YL7",1,"high tide"),
("2023-11-13","Hilton Fishing Pier","I thought a last-minute early morning super high tide fishing trip would yield Plenty O Fish at the Hilton Pier; I was wrong. I should have known when I arrived and the pier was empty, but the sky was a beautiful gray, looking like it may snow, too beautiful to pass up. Other than a few ducks scooting across the water, that was it. Not even a bite. But It gave me a chance to read about the Spanish Mackerel and Blue fish running at Sandbridge and the Outer Banks of NC. I decided to wrap it up and visit my buddy Claude, an avid fisherman of Hatteras Island in the 70s and after bestowing some secrets on me, I decided I need to expand.",1,"https://photos.app.goo.gl/WJrRsEZbJfypYyyP9",0,"high tide"),
("2023-11-19","James River Fishing Pier","After attempting two different piers with no luck we decided to test out the James River Pier. We rang the bell for the attendant to take our money but no one appeared and we got to fish for free! I have never seen this pier so dead. Dad kept jokingly commenting on the rapture lol because there were almost no people and no fish to be caught. The deadest I'd ever seen it. (Apparently we'd been skipped over) :) We did see a school of fish in the distance (see photo) where a bunch of birds were having a feast. Luckily near the end of packing up I snagged a little guy! I gave it a 3 star because the view was nice, we didn't have to pay, and it wasn't crowded.",3,"https://photos.app.goo.gl/soaV3a3QDB7Jtp7B7",1,"high tide"),
("2023-11-19","Huntington Park Fishing Pier","Tried this spot for a short time. The water was so low you could see the top of the aerator. Lots of ducks! One turtle head siting. Dad managed to get his rig caught in a tree and had to sacrifice his lure. Apparently, that was his second lost to that same tree and in that tree you'll see a lure graveyard where previous fisherman had experienced the same. No bites at all. ",1,"https://photos.app.goo.gl/wnJrTANDTkfyKwX1A",0,"na"),
("2023-11-19","Green Mile Fishing Pier (King-Lincoln Park)","Tried this new spot. It was very windy and thus choppy. Didn't get any bites using worms. Asked some people walking by if they had any luck. All responded 'no'. Didn't stay long. We decided to try it when it wasn't windy and cold and when the fish be bitin'. We'll give in another go. It's only fair.",1,"",0,"high tide");


select * from fish.fishingTrips;