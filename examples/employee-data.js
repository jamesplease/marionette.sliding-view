(function() {

  // 70 random employees that we use to generate our data
  var employeeList = [
    {
      "name": "Frank Dunn",
      "company": "BIOLIVE",
      "email": "frankdunn@biolive.com",
      "phone": "+1 (983) 456-2948",
      "address": "328 Caton Place, Ventress, North Carolina, 6876"
    },
    {
      "name": "Joyce Rich",
      "company": "ARCTIQ",
      "email": "joycerich@arctiq.com",
      "phone": "+1 (806) 503-2355",
      "address": "970 Putnam Avenue, Highland, Nebraska, 4592"
    },
    {
      "name": "Margie Romero",
      "company": "GORGANIC",
      "email": "margieromero@gorganic.com",
      "phone": "+1 (959) 491-3368",
      "address": "864 Montauk Avenue, Corriganville, Colorado, 6962"
    },
    {
      "name": "Elisabeth Guerrero",
      "company": "POLARIUM",
      "email": "elisabethguerrero@polarium.com",
      "phone": "+1 (915) 422-3963",
      "address": "269 Lake Avenue, Torboy, Wisconsin, 6543"
    },
    {
      "name": "Donna Forbes",
      "company": "ENQUILITY",
      "email": "donnaforbes@enquility.com",
      "phone": "+1 (966) 408-3314",
      "address": "259 Hale Avenue, Crawfordsville, Utah, 5046"
    },
    {
      "name": "Romero Flynn",
      "company": "ECLIPSENT",
      "email": "romeroflynn@eclipsent.com",
      "phone": "+1 (868) 518-3219",
      "address": "230 Noble Street, Volta, Alaska, 7717"
    },
    {
      "name": "Jordan Norton",
      "company": "SUNCLIPSE",
      "email": "jordannorton@sunclipse.com",
      "phone": "+1 (938) 527-2665",
      "address": "732 Cass Place, Centerville, Indiana, 6092"
    },
    {
      "name": "Ofelia Benson",
      "company": "CINESANCT",
      "email": "ofeliabenson@cinesanct.com",
      "phone": "+1 (850) 478-3167",
      "address": "968 Dictum Court, Advance, Massachusetts, 6508"
    },
    {
      "name": "Vang Garcia",
      "company": "AVENETRO",
      "email": "vanggarcia@avenetro.com",
      "phone": "+1 (878) 517-3167",
      "address": "860 Richmond Street, Temperanceville, South Carolina, 1867"
    },
    {
      "name": "Francesca Buckner",
      "company": "GENMY",
      "email": "francescabuckner@genmy.com",
      "phone": "+1 (923) 443-2604",
      "address": "801 Caton Avenue, Kirk, New Jersey, 5873"
    },
    {
      "name": "Petra Prince",
      "company": "MAROPTIC",
      "email": "petraprince@maroptic.com",
      "phone": "+1 (930) 460-3029",
      "address": "812 Montague Street, Choctaw, Mississippi, 714"
    },
    {
      "name": "Roach Matthews",
      "company": "NURALI",
      "email": "roachmatthews@nurali.com",
      "phone": "+1 (904) 479-3786",
      "address": "163 Baycliff Terrace, Edmund, Guam, 2886"
    },
    {
      "name": "Clayton Kline",
      "company": "OPTYK",
      "email": "claytonkline@optyk.com",
      "phone": "+1 (924) 589-2256",
      "address": "333 Farragut Road, Shindler, Georgia, 1161"
    },
    {
      "name": "Shelby Tyler",
      "company": "KLUGGER",
      "email": "shelbytyler@klugger.com",
      "phone": "+1 (810) 540-2538",
      "address": "785 Taylor Street, Woodlands, Montana, 9379"
    },
    {
      "name": "Pitts Hensley",
      "company": "COMTRAK",
      "email": "pittshensley@comtrak.com",
      "phone": "+1 (834) 572-2718",
      "address": "876 Falmouth Street, Richmond, New Mexico, 2634"
    },
    {
      "name": "Turner Ballard",
      "company": "SEQUITUR",
      "email": "turnerballard@sequitur.com",
      "phone": "+1 (875) 525-3263",
      "address": "904 Throop Avenue, Crumpler, Tennessee, 790"
    },
    {
      "name": "Diane Noble",
      "company": "ESCHOIR",
      "email": "dianenoble@eschoir.com",
      "phone": "+1 (844) 564-3875",
      "address": "953 Porter Avenue, Dunnavant, Iowa, 7441"
    },
    {
      "name": "Dawson Decker",
      "company": "SYNKGEN",
      "email": "dawsondecker@synkgen.com",
      "phone": "+1 (813) 513-2740",
      "address": "564 Remsen Avenue, Unionville, Oregon, 5285"
    },
    {
      "name": "Nikki Witt",
      "company": "RAMJOB",
      "email": "nikkiwitt@ramjob.com",
      "phone": "+1 (915) 567-2396",
      "address": "130 Brighton Court, Brenton, Vermont, 7144"
    },
    {
      "name": "Olivia Lynch",
      "company": "POLARAX",
      "email": "olivialynch@polarax.com",
      "phone": "+1 (866) 479-2736",
      "address": "129 Dahl Court, Santel, Oklahoma, 1073"
    },
    {
      "name": "Mann Olson",
      "company": "NETAGY",
      "email": "mannolson@netagy.com",
      "phone": "+1 (976) 592-3383",
      "address": "138 Wythe Avenue, Bagtown, Palau, 7187"
    },
    {
      "name": "Roy Vincent",
      "company": "MAGMINA",
      "email": "royvincent@magmina.com",
      "phone": "+1 (938) 409-2867",
      "address": "265 Franklin Street, Allensworth, Rhode Island, 3475"
    },
    {
      "name": "Bowers Lewis",
      "company": "CYTREK",
      "email": "bowerslewis@cytrek.com",
      "phone": "+1 (904) 555-2488",
      "address": "294 Butler Street, Grantville, Minnesota, 6907"
    },
    {
      "name": "Ballard Hardin",
      "company": "REALYSIS",
      "email": "ballardhardin@realysis.com",
      "phone": "+1 (816) 576-3463",
      "address": "480 Pilling Street, Springhill, Arkansas, 5425"
    },
    {
      "name": "Leigh Mcmahon",
      "company": "GEEKOSIS",
      "email": "leighmcmahon@geekosis.com",
      "phone": "+1 (928) 403-2666",
      "address": "446 Arlington Place, Stonybrook, North Dakota, 6420"
    },
    {
      "name": "Mcdaniel Curry",
      "company": "GEEKOL",
      "email": "mcdanielcurry@geekol.com",
      "phone": "+1 (955) 496-2163",
      "address": "306 Canarsie Road, Manila, Puerto Rico, 3237"
    },
    {
      "name": "Walls Frost",
      "company": "ACCUPRINT",
      "email": "wallsfrost@accuprint.com",
      "phone": "+1 (856) 455-2261",
      "address": "614 Montrose Avenue, Homeland, Illinois, 6304"
    },
    {
      "name": "Whitaker Barber",
      "company": "PLASMOSIS",
      "email": "whitakerbarber@plasmosis.com",
      "phone": "+1 (871) 456-2272",
      "address": "853 Rapelye Street, Delco, Northern Mariana Islands, 7489"
    },
    {
      "name": "Dominguez Gentry",
      "company": "TSUNAMIA",
      "email": "dominguezgentry@tsunamia.com",
      "phone": "+1 (971) 550-3086",
      "address": "715 Grattan Street, Craig, New York, 7706"
    },
    {
      "name": "Nona Jacobson",
      "company": "STREZZO",
      "email": "nonajacobson@strezzo.com",
      "phone": "+1 (985) 595-3744",
      "address": "273 Raleigh Place, Westerville, Kansas, 6352"
    },
    {
      "name": "Dolores Boyer",
      "company": "NITRACYR",
      "email": "doloresboyer@nitracyr.com",
      "phone": "+1 (867) 541-3055",
      "address": "933 Sumner Place, Salvo, West Virginia, 5359"
    },
    {
      "name": "Selma Atkins",
      "company": "ASIMILINE",
      "email": "selmaatkins@asimiline.com",
      "phone": "+1 (833) 566-2050",
      "address": "475 Stratford Road, Movico, Louisiana, 4603"
    },
    {
      "name": "Angelia Hansen",
      "company": "PYRAMI",
      "email": "angeliahansen@pyrami.com",
      "phone": "+1 (851) 536-3827",
      "address": "865 Bills Place, Hatteras, Kentucky, 6683"
    },
    {
      "name": "Marci Schultz",
      "company": "DOGSPA",
      "email": "marcischultz@dogspa.com",
      "phone": "+1 (947) 591-3046",
      "address": "380 Bush Street, Dawn, Texas, 5926"
    },
    {
      "name": "Willa Hooper",
      "company": "OBONES",
      "email": "willahooper@obones.com",
      "phone": "+1 (999) 500-3213",
      "address": "726 Ralph Avenue, Dexter, District Of Columbia, 9577"
    },
    {
      "name": "Conley Monroe",
      "company": "XIXAN",
      "email": "conleymonroe@xixan.com",
      "phone": "+1 (827) 581-2585",
      "address": "547 Ridge Boulevard, Carlton, Washington, 2916"
    },
    {
      "name": "Cathryn Parsons",
      "company": "SIGNITY",
      "email": "cathrynparsons@signity.com",
      "phone": "+1 (976) 431-3851",
      "address": "934 Calyer Street, Coral, Federated States Of Micronesia, 7316"
    },
    {
      "name": "Simon Vazquez",
      "company": "RODEOMAD",
      "email": "simonvazquez@rodeomad.com",
      "phone": "+1 (837) 521-3698",
      "address": "295 Ditmars Street, Sylvanite, Marshall Islands, 1163"
    },
    {
      "name": "Bridget Davidson",
      "company": "CIRCUM",
      "email": "bridgetdavidson@circum.com",
      "phone": "+1 (885) 415-2381",
      "address": "906 Dwight Street, Sandston, South Dakota, 3447"
    },
    {
      "name": "Kimberly Fuller",
      "company": "IDETICA",
      "email": "kimberlyfuller@idetica.com",
      "phone": "+1 (878) 498-3990",
      "address": "769 Beayer Place, Chloride, Wyoming, 5096"
    },
    {
      "name": "Justine Figueroa",
      "company": "MAXIMIND",
      "email": "justinefigueroa@maximind.com",
      "phone": "+1 (990) 417-3800",
      "address": "222 Prince Street, Drytown, Florida, 8859"
    },
    {
      "name": "Townsend Short",
      "company": "ISOTRONIC",
      "email": "townsendshort@isotronic.com",
      "phone": "+1 (934) 573-3271",
      "address": "631 Furman Avenue, Courtland, Alabama, 2230"
    },
    {
      "name": "Howard Dale",
      "company": "BLURRYBUS",
      "email": "howarddale@blurrybus.com",
      "phone": "+1 (800) 468-2262",
      "address": "992 Kensington Walk, Trexlertown, Missouri, 288"
    },
    {
      "name": "Gilmore Dunlap",
      "company": "HINWAY",
      "email": "gilmoredunlap@hinway.com",
      "phone": "+1 (804) 523-2885",
      "address": "241 Kenilworth Place, Kempton, Nevada, 4462"
    },
    {
      "name": "Frankie Acosta",
      "company": "TALKOLA",
      "email": "frankieacosta@talkola.com",
      "phone": "+1 (839) 563-3376",
      "address": "978 Woodpoint Road, Lewis, Delaware, 4589"
    },
    {
      "name": "Chasity Rhodes",
      "company": "ZILLIDIUM",
      "email": "chasityrhodes@zillidium.com",
      "phone": "+1 (885) 405-2041",
      "address": "562 Rewe Street, Wilmington, Michigan, 8909"
    },
    {
      "name": "Cristina Watson",
      "company": "DREAMIA",
      "email": "cristinawatson@dreamia.com",
      "phone": "+1 (910) 545-2678",
      "address": "101 Rugby Road, Cuylerville, Connecticut, 1115"
    },
    {
      "name": "Isabella Newton",
      "company": "LIQUICOM",
      "email": "isabellanewton@liquicom.com",
      "phone": "+1 (828) 558-2588",
      "address": "978 Ivan Court, Kenwood, Ohio, 7281"
    },
    {
      "name": "Baird Montgomery",
      "company": "GENEKOM",
      "email": "bairdmontgomery@genekom.com",
      "phone": "+1 (862) 426-3313",
      "address": "863 Garden Street, Condon, Maine, 1653"
    },
    {
      "name": "Deena Fischer",
      "company": "FLUM",
      "email": "deenafischer@flum.com",
      "phone": "+1 (990) 543-3447",
      "address": "837 Division Avenue, Morgandale, California, 7543"
    },
    {
      "name": "Elba Espinoza",
      "company": "LUNCHPOD",
      "email": "elbaespinoza@lunchpod.com",
      "phone": "+1 (998) 426-3809",
      "address": "424 Thornton Street, Coloma, Arizona, 4457"
    },
    {
      "name": "Ana Mckay",
      "company": "PROWASTE",
      "email": "anamckay@prowaste.com",
      "phone": "+1 (843) 476-3910",
      "address": "176 Kossuth Place, Baden, American Samoa, 4110"
    },
    {
      "name": "Macdonald Blake",
      "company": "FROSNEX",
      "email": "macdonaldblake@frosnex.com",
      "phone": "+1 (953) 517-2332",
      "address": "885 Berriman Street, Alfarata, New Hampshire, 1374"
    },
    {
      "name": "Lina Sanchez",
      "company": "MARVANE",
      "email": "linasanchez@marvane.com",
      "phone": "+1 (987) 564-2717",
      "address": "528 Chauncey Street, Lavalette, Hawaii, 755"
    },
    {
      "name": "Cecelia Mccall",
      "company": "UNIWORLD",
      "email": "ceceliamccall@uniworld.com",
      "phone": "+1 (824) 587-2114",
      "address": "228 Milton Street, Gilmore, Virginia, 7284"
    },
    {
      "name": "Johnnie Dean",
      "company": "FURNAFIX",
      "email": "johnniedean@furnafix.com",
      "phone": "+1 (805) 560-2631",
      "address": "275 Keap Street, Leroy, Virgin Islands, 4240"
    },
    {
      "name": "Coffey Levy",
      "company": "CRUSTATIA",
      "email": "coffeylevy@crustatia.com",
      "phone": "+1 (817) 475-2636",
      "address": "386 Virginia Place, Matheny, Idaho, 9851"
    },
    {
      "name": "Judy Benjamin",
      "company": "GEEKETRON",
      "email": "judybenjamin@geeketron.com",
      "phone": "+1 (854) 436-3132",
      "address": "504 Cropsey Avenue, Dowling, Pennsylvania, 5052"
    },
    {
      "name": "Megan Palmer",
      "company": "COMTEST",
      "email": "meganpalmer@comtest.com",
      "phone": "+1 (993) 486-2628",
      "address": "218 Fiske Place, Celeryville, North Carolina, 5428"
    },
    {
      "name": "Becky Franks",
      "company": "EPLODE",
      "email": "beckyfranks@eplode.com",
      "phone": "+1 (941) 483-2095",
      "address": "485 Hubbard Street, Cleary, Nebraska, 5706"
    },
    {
      "name": "Rios Young",
      "company": "UNISURE",
      "email": "riosyoung@unisure.com",
      "phone": "+1 (934) 481-3848",
      "address": "420 Townsend Street, Woodburn, Colorado, 1464"
    },
    {
      "name": "Claudette Hampton",
      "company": "SPEEDBOLT",
      "email": "claudettehampton@speedbolt.com",
      "phone": "+1 (950) 568-3117",
      "address": "932 Perry Place, Whitewater, Wisconsin, 6867"
    },
    {
      "name": "Ida Snyder",
      "company": "WATERBABY",
      "email": "idasnyder@waterbaby.com",
      "phone": "+1 (883) 484-2344",
      "address": "615 Commercial Street, Albany, Utah, 5038"
    },
    {
      "name": "Boyer Herrera",
      "company": "SYBIXTEX",
      "email": "boyerherrera@sybixtex.com",
      "phone": "+1 (982) 464-3818",
      "address": "724 Norwood Avenue, Waterloo, Alaska, 7493"
    },
    {
      "name": "Cherie Navarro",
      "company": "GEOFARM",
      "email": "cherienavarro@geofarm.com",
      "phone": "+1 (835) 486-2943",
      "address": "529 Essex Street, Rosine, Indiana, 9800"
    },
    {
      "name": "Warren Benton",
      "company": "QUORDATE",
      "email": "warrenbenton@quordate.com",
      "phone": "+1 (992) 497-2735",
      "address": "485 Montague Terrace, Emison, Massachusetts, 5154"
    },
    {
      "name": "Woods Lee",
      "company": "GRUPOLI",
      "email": "woodslee@grupoli.com",
      "phone": "+1 (909) 541-3609",
      "address": "781 Jay Street, Kapowsin, South Carolina, 3339"
    },
    {
      "name": "Perez Goodwin",
      "company": "SYNTAC",
      "email": "perezgoodwin@syntac.com",
      "phone": "+1 (863) 526-3041",
      "address": "845 Eldert Lane, Westmoreland, New Jersey, 6684"
    },
    {
      "name": "Gail Murphy",
      "company": "ROTODYNE",
      "email": "gailmurphy@rotodyne.com",
      "phone": "+1 (835) 425-2683",
      "address": "983 Fleet Street, Calvary, Mississippi, 1902"
    },
    {
      "name": "Ebony Brock",
      "company": "COMBOGENE",
      "email": "ebonybrock@combogene.com",
      "phone": "+1 (938) 475-2445",
      "address": "636 Rutland Road, Geyserville, Guam, 9386"
    }
  ];

  // An array of 10k employees. Used in our collection
  var bigEmployeeList = Array
    .apply(null, new Array(10000))
    .map(function() {
      return _.sample(employeeList);
  });

  // Create our employees collection, and expose it on the window
  window.employeesCollection = new Backbone.Collection(bigEmployeeList);
})();



