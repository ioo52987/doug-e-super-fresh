DROP TABLE fish.fishingSites;


CREATE TABLE fish.fishingSites (
    pk int NOT NULL AUTO_INCREMENT,
    siteName nvarchar(128) NOT NULL,
    siteType nvarchar(128) NOT NULL,
    longitude DECIMAL(13,10) NOT NULL,
    latitude DECIMAL(13,10) NOT NULL,
    siteURL nvarchar(128),
    descrb nvarchar(1000) NOT NULL,
    showInDropdown int(1) NOT NULL,
    PRIMARY KEY (pk)
);


INSERT INTO fish.fishingSites(siteName,siteType,longitude,latitude,siteURL,descrb,showInDropdown) 
VALUES 
    ("Hilton Fishing Pier","tidal",-76.4655500,37.0286310,"https://www.newport-news.org/visitors/things-to-do/outdoors-and-recreation/31/hilton-pier-and-ravine/","Close walking distance from apartment. Seem to regularly catch croaker and spot here. Beautiful views! Free! Never too busy with people. Fishing license required.",1),
    ("Yorktown Fishing Pier","tidal",-76.5047070,37.2349150,"https://www.yorkcounty.gov/Facilities/Facility/Details/-20","Too far to drive since the Hilton Pier is closer. We lost two rigs in the left side of the pier. Saw dolphins. You do not need a fishing license to fish here.",1),
    ("James River Fishing Pier","tidal",-76.4564725,37.0133489,"https://fishingstatus.com/fishing/directory/groupid/811","Close to Hilton. You have to pay to get on but can leave with 24hr accessiblity. It is really long and always has plenty of room to fish.",1),
    ("Rodgers S. Smith Landing","tidal",-76.4323096,37.1340305,"https://www.yorkcounty.gov/facilities/facility/details/rodgers-a.-smith-landing-18","Dock was too small. Mostly a place to put in boats.",1),
    ("Buckroe Pier (James T Wilson)","tidal",-76.2912231,37.0365827,"https://mrc.virginia.gov/vsrfdf/buckroe.shtm","Pay $7 to get on and you don't need a fishing license",1),
    ("Harwood's Mill Fishing Area","non-tidal",-76.4781436,37.1487190,"https://www.newport-news.org/visitors/things-to-do/outdoors-and-recreation/9/harwoods-mill/","Fishing pier off Oriana Rd on the Newport News Waterworks Reservoir.",1),
    ("Virginia Beach Fishing Pier","tidal",-75.9711601,36.8435831,"https://www.vabeach.com/virginia-beach-things-to-do/pier-beach-fishing/virginia-beach-fishing-pier/","Venerable wood fishing pier, open seasonally, with a tackle shop, seafood restaurant & rod rentals. The pier is open from 8:00 to 8:00 April 2nd through May 29th then will be open 6:00 am until midnight through the summer. Pet friendly spot. $2 to spectate. $10 to fish.",1),
    ("Ocean View Fishing Pier","tidal",-76.2585155,36.9628608,"https://oceanviewfishingpier.com/","Ocean View Fishing Pier offers complete facilities and equipment for everyone who lives - and loves - to fish. Just off Interstate 64 in Norfolk, Virginia, the Pier stretches out 1690 feet into the Bay into one of East Coast's most bountiful fishing grounds. Located on site are a Bait House, a restaurant, a game room and restrooms.",1),
    ("Newport News Park Campsite Launch","non-tidal",-76.5573895,37.1871754,"https://nnparksandrec.org/fishing/","Boat fishing only! John or paddle boat rental is $8 per day. People who don't bring their own boats typically bring a motor. The facility does offer oars and life vests. The oars are splintered and large. No pets in the rental boats.",1),
    ("Anderson Park (M&M Overlook)","tidal",-76.4008956,36.9849442,"https://nnparksandrec.org/directory-parks/listing/anderson-park/","Also known as the Monitor-Merrimac overlook. Updated! :)",1),
    ("Avalon Pier","tidal",-75.6744821,36.0442422,"http://www.avalonpier.com/","Iconic pier in Kill Devil Hills OBX. $17.50 to fish. 6am-10pm. Re-entry allowed. Open until mid-night on Friday's and Saturdays. There are bathrooms, full bar, and an arcade. Check out their live-cam footage!",0),
    ("Huntington Park Fishing Pier","non-tidal",-76.4553227,37.0189067,"","A small pier that extends out into Lake Biggins. This lake is located within one of the oldest public parks in Newport News. The pond is located on approximately three acres of the 60 acre park. Lake Biggins provides a scenic area for anglers to try their luck while being close to urban areas of Newport News and Hampton. Fishing hours are daily from sunrise to sunset and vary according to the season.",1),
    ("Green Mile Fishing Pier (King-Lincoln Park)","tidal",-76.4110675,36.9657697,"https://mrc.virginia.gov/vsrfdf/nnwavescreen.shtm","The concrete fishing area is approximately 1600 feet long and 8 feet wide. The side of the pier designated for fishing has periodic cut-outs (3 1/2 ft. in height) to provide easier access for handicapped anglers and children. The railing toward the small boat harbor is 5 feet high to discourage people from fishing in that direction. There is no fee to fish off of the pier, but you must purchase your own individual saltwater license (unless exempt by age). The pier is open to the public from 7 a.m. until 10 p.m. Lighting is provided for the evening hours. Water depth ranges from 13 to 17 feet as you move towards the end of the fishing pier area. This pier should provide access to a variety of species such as croaker, spot, flounder, striped bass, and gray trout.",1);

select * from fish.fishingSites;


