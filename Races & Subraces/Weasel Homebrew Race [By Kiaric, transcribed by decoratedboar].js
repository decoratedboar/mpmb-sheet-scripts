/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, the Weasel
				This homebrew race was created by Kiaric, and can be found here:
					https://homebrewery.naturalcrit.com/share/8EQBEUjyyEWm
	Code by:	u/decoratedblood (decoratedboar)
	Date:		30-11-2022 (sheet v12.999)
*/

var iFileName = "Weasel Homebrew Race [By Kiaric, transcribed by decoratedboar].js";
RequiredSheetVersion(12.999); 
RaceList["weasel"] = { 
	regExpSearch : /^(?=.*Weasel).*$/i, 
	name : "Weasel",
	source : ["HB", 0],
	plural : "Weasels",
	size : [3, 4],
	speed : { 
		walk : { spd : 40, enc : 30 }, 
	},
	languageProfs : ["Common", "Druidic", 1],
	vision : [["Darkvision", 60]],
	skills : ["Stealth"],
	improvements : "Weasel: +1 Intelligence, +2 Dexterity;", 
	scores : [0, 2, 0, 1, 0, 0],
	trait : "Weasel: (+1 Intelligence, +2 Dexterity) \nWeasel War Dance: As a bonus action, I can make a target I can see, and that can see me make a Wisdom saving throw against a DC equal to 8 + my Dex modifier + my Proficiency bonus. If the target fails, it has disadvantage on its next attack roll or saving throw until the end of my next turn. \nEvasive Scamper: As a reaction to taking damage, I can move up to half my walking speed. Opportunity attacks against me while using this movement are made with disadvantage. \nSlinky: I can fit through spaces as small as 10 inches in diameter. \nNatural Stealth: I gain proficiency in the Stealth skill.", 

	features : {
		"weasel war dance" : {
			name : "Weasel War Dance",
			minlevel : 1,
			//usages : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
			//recovery : "long rest",
			tooltip : " (Weasel War Dance)",
			action : ["bonus action", ""],
		},
		"evasive scamper" : {
			name : "Evasive Scamper",
			minlevel : 1,
			//usages : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],
			//recovery : "long rest",
			tooltip : " (Evasive Scamper)",
			action : ["reaction", ""],
		}
	}
}
