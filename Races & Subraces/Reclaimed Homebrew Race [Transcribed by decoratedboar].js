/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, the Reclaimed
	Code by:	u/decoratedblood (decoratedboar)
	Date:		25-04-2023 (sheet v13)
*/

var iFileName = "Reclaimed Homebrew Race [Transcribed by decoratedboar],js";
RequiredSheetVersion(3); 
RaceList["reclaimed"] = { 
	regExpSearch : /^(?=.*reclaimed).*$/i, 
	name : "Reclaimed",
	source : ["HB", 0],
	plural : "Reclaimed",
	size : 3,
	speed : { 
		walk : { spd : 30, enc : 20 }, 
	},
	languageProfs : ["Common", "Sylvan"],
	improvements : "Reclaimed: +1 Strength, +2 Constitution;", 
	scores : [1, 0, 2, 0, 0, 0],
	trait : "Reclaimed (+1 Strength, +2 Constitution)"+
		"\n \u2022 Reclaimed: I count as both undead and plant. I also gain advantage on death saving throws."+
		"\n \u2022 We Are The Same: I can cast the Speak With Plants spell a number of times equal to my "+
		"proficiency bonus per long rest."+
		"\n \u2022 Practical Immortality: I am immortal while I maintain exposure to sunlight. After going without "+
		"sunlight for one day, my Exhaustion level is 1, after two days, it is 3, after three days, it is 4, and "+
		"after four days, I die. These Exhaustion levels can only be undone by exposure to sunlight, at "+
		"eight hours of exposure per level removed."+
		"\n \u2022 Bark-Like Skin: I gain +1 AC."+
		"\n \u2022 Natural sense of direction: I can always tell where South is.",
	savetxt : { text : ["Adv. on death saves"] },
	extraAC : {
		name : "Bark-Like Skin",
		mod : 1,
		text : "I gain a +1 bonus to AC."
	},
	features : {
		"speak with plants" : {
			name : "Speak With Plants",
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest",
			spellcastingBonus : {
				name : "We Are The Same",
				spells : ["speak with plants"],
				selection : ["speak with plants"],
				firstCol : 'atwill'
			},
		},
	},
}
