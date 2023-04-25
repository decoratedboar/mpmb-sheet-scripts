/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, Gallean
				This homebrew race was created by decoratedboar, and can be found here:
					https://homebrewery.naturalcrit.com/share/V2Mqi5YQjbEt
	Code by:	u/decoratedblood (decoratedboar)
	Date:		18-09-2022 (sheet v12.999)
*/

var iFileName = "Gallean Homebrew Race - By decoratedboar";
RequiredSheetVersion(12.999);

RaceList["gallean"] = { 
	regExpSearch : /^(?=.*gallean).*$/i,
	name : "Gallean", 
	source : ["HB", 0],
	plural : "Galleans",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : "walk", enc : "walk" },
	},
	languageProfs : ["Common", "Aarakocra"],
	weapons : ["talons"],
	skills : ["Performance", "Intimidation"],
	age : " reach adulthood at around age five and can live up to 120 years",
	height : " are around the size of an average human, ranging from as short as five feet to as tall as seven",
	weight : " usually weigh around 176 lbs",
	heightMetric : " range from 1.5 to over 2.1 metres tall",
	weightMetric : " weigh around 80 kg", 
	improvements : "Gallean: +2 Dexterity, +1 Charisma;",
	scores : [0, 2, 0, 0, 0, 1],
	trait : "Gallean (+2 Dexterity, +1 Charisma)"+
	"\n \u2022Talons: My unarmed strikes deal 1d6 + Strength modifier slashing damage."+
	"\n \u2022 Cocksure: I have proficiency in the Performance and Intimidation skills."+
	"\n \u2022 Flourish: As a bonus action, I can distract a target I can see within 30ft with my plumage, imposing disadvantage on their next attack roll, saving throw, or ability check. Use a number of times equal to prof. bonus per long rest."+
	"\n \u2022 Falling with style: I have flying speed equal to my walking speed, but when I end a turn in the air or use all of my flying speed in one go, I fall to the ground.",

	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /talon/i,
		name : "Talons",
		source : ["HB", 0],
		damage : [1, 6, "slashing"]
	},
	weaponsAdd : ["Talons"],
	
	features : {
		"flourish" : {
			name : "Flourish",
			minlevel : 1,
			usages : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
			recovery : "long rest",
			tooltip : " (Flourish)",
			action : ["bonus action", ""],
		}
	}
};
