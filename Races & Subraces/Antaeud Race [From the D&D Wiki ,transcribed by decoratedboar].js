/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, the Antaeud
				This homebrew race can be found on the D&D Wiki, here:
					https://www.dandwiki.com/wiki/Antaeud_(5e_Race)
	Code by:	u/decoratedblood (decoratedboar)
	Date:		03-08-2023 (sheet v13)
*/

var iFileName = "Antaeud Race [From the D&D Wiki ,transcribed by decoratedboar]";
RequiredSheetVersion(13);

RaceList["antaeud"] = { 
	regExpSearch : /^(?=.*antaeud).*$/i,
	name : "Antaeud", 
	source : ["HB", 0],
	plural : "Antaeuds",
	size : 2, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Giant"],
	age : " typically finish growing in their late thirties and are only legally considered an adult at 40. An antaeud typically lives for around three hundred years",
	improvements : "Antaeud: +2 Strength;",
	scores : [2, 0, 0, 0, 0, 0],
	skills : ["Athletics"],
	trait : "Antaeud (+2 Strength)"+
	"\n \u2022Giant Power: I gain proficiency in Strength (Athletics)."
};

AddRacialVariant("antaeud", "cloud bloodline", {
		regExpSearch : /^(?=.*cloud)(?=.*bloodline)(?=.*antaeud).*$/i, 
		name : "Cloud Bloodline Antaeud",
		source : ["HB", 0],
		plural : "Cloud Bloodline Antaeuds",
		scores : [2, 0, 0, 1, 0, 0],

		trait : "Clood Bloodline Antaeud (+2 Strength, +1 Intelligence)"+
		"\n \u2022Giant Power: I gain proficiency in Strength (Athletics)."+
		"\n \u2022Cloudwalking: Once per long rest as a bonus action, I gain 30 feet of flying speed for a minute, but cannot fly higher than 5 feet.",
		height : " are usually more than 10 feet tall",
		weight : " usually weigh around 400 lbs",
		heightMetric : " are usually more than 3 meters tall",
		weightMetric : " usually weigh around 180 kg", 
		features : {
		"cloudwalking" : {
			name : "Cloudwalking",
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", " (+30 ft. fly for 1 min.)"],
			}
		}
});
AddRacialVariant("antaeud", "ice bloodline", {
		regExpSearch : /^(?=.*ice)(?=.*bloodline)(?=.*antaeud).*$/i, 
		name : "Ice Bloodline Antaeud",
		source : ["HB", 0],
		plural : "Ice Bloodline Antaeuds",
		scores : [2, 0, 0, 0, 1, 0],

		dmgres : ["Cold"],
		trait : "Ice Bloodline Antaeud (+2 Strength, +1 Wisdom)"+
		"\n \u2022Giant Power: I gain proficiency in Strength (Athletics)."+
		"\n \u2022Coldblood: I have resistance to cold damage.",
		height : " average around 10 feet tall",
		weight : " usually weigh around 450 lbs",
		heightMetric : " average around 3 meters tall",
		weightMetric : " weigh around 200 kg",
});
AddRacialVariant("antaeud", "stone bloodline", {
		regExpSearch : /^(?=.*stone)(?=.*bloodline)(?=.*antaeud).*$/i, 
		name : "Stone Bloodline Antaeud",
		source : ["HB", 0],
		plural : "Stone Bloodline Antaeuds",
		scores : [2, 0, 1, 0, 0, 0],

		trait : "Stone Bloodline Antaeud (+2 Strength, +1 Constitution)"+
		"\n \u2022Giant Power: I gain proficiency in Strength (Athletics)."+
		"\n \u2022Stoneheart: I have advantage on saving throws against being charmed or frightened.",
		height : " average around 9 feet tall",
		weight : " usually weigh around 500 lbs",
		heightMetric : " average around 2.7 meters tall",
		weightMetric : " weigh around 230 kg",
		savetxt :{ adv_vs : ["charmed", "frightened"]},
});
AddRacialVariant("antaeud", "storm bloodline", {
		regExpSearch : /^(?=.*storm)(?=.*bloodline)(?=.*antaeud).*$/i, 
		name : "Storm Bloodline Antaeud",
		source : ["HB", 0],
		plural : "Storm Bloodline Antaeuds",
		scores : [2, 0, 0, 0, 0, 1],

		trait : "Storm Bloodline Antaeud (+2 Strength, +1 Charisma)"+
		"\n \u2022Giant Power: I gain proficiency in Strength (Athletics)."+
		"\n \u2022Child of the Tempest: I have resistance to either lightning or thunder damage, choosing one.",
		height : " average around 11 feet tall",
		weight : " usually weigh around 450 lbs",
		heightMetric : " average around 3.3 meters tall",
		weightMetric : " weigh around 200 kg",
		dmgres : ["Lightning/Thunder"],
});
