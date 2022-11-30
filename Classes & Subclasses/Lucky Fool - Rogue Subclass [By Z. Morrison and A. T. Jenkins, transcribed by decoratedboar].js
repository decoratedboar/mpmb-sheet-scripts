/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		
				This script adds a Rogue subclass, the Lucky Fool.
				This subclass is a homebrew creation by Glamoured Glade, from their book of subclass options, Lyric's Ledger of Legends.
				You can find it here: https://glamouredglade.itch.io/lyrics-ledger-of-legends
	Code by:	u/decoratedblood (decoratedboar)
	Date:		30-11-2022 (sheet v13.0.6")
*/

var iFileName = "Lucky Fool - Rogue Subclass [By Z. Morrison and A. T. Jenkins, transcribed by decoratedboar].js";

RequiredSheetVersion("13.0.6");

AddSubClass("rogue", "lucky fool", {
	regExpSearch : /^(?=.*lucky)(?=.*fool).*$/i,
	subname : "Lucky Fool",
	fullname : "Lucky Fool",
	source : [["HB", 0]],
	features : {
		"subclassfeature3" : {
			name : "Lucky Shot",
			source : [["HB", 0]],
			minlevel : 3,
			description : "\n   When I miss a creature with an attack on my turn, and end that turn without dealing damage," + "\n   that creature suffers disadvantage on its next attack roll before the start of my next turn" + "\n   Additionally, I automatically apply my Sneak Attack damage to attacks if I have disadvantage" + "\n   on the attack roll"
		},
		"subclassfeature3.1" : {
			name : "Fortunes Redoubled",
			source : [["HB", 0]],
			minlevel : 3,
			description : "\n   Whenever I make an attack roll, saving throw, or ability check with advantage or disadvantage" + "\n   and get the same number on both rolls, treat the result as a roll of 20 on both dice"
		},
		"subclassfeature9" : {
			name : "Legendary Coincidence",
			source : [["HB", 0]],
			minlevel : 9,
			description : "\n   Whenever I fail a saving throw, I can use my reaction to succeed on it instead, randomly" + "\n   suffering a blunder as a result, and rolling a d6 on the Legendary Coincidence table" + "\n   I can use this feature once per short or long rest. If I roll a one on the d20 to fail a saving" + "\n   throw however, I can use this feature without expending a use, even if I have already used it",
			
			action : ["reaction", ""],
			toNotesPage : [{
				name : "Legendary Coincidence Table",
				note : "\nd6\tOutcome" + desc([
					" 1\tYou become tangled up in the environment or in your own clothing and are",
					"  \trestrained until the end of your next turn.",
					" 2\tYou are momentarily dazed and distracted, and can't use Cunning Action on your",
					"  \tnext turn.",
					" 3\tYou immediately drop any objects you are holding, and they slip from your fingers",
					"  \tif you attempt to pick them back up before the end of your next turn.",
					" 4\tYou become blinded until the end of your next turn.",
					" 5\tYou immediately fall prone.",
					" 6\tNothing of consequence happens.",
				])
			}],
		},
		"subclassfeature13" : {
			name : "Critical Error",
			source : [["HB", 0]],
			minlevel : 13,
			description : "\n   Whenever I roll a result of 1 on the d20 for an attack roll, I can treat the roll as a 20 instead"
		},
		"subclassfeature17" : {
			name : "Lucky Sevens",
			source : [["HB", 0]],
			minlevel : 17,
			description : "\n   Whenever I roll for my Sneak Attack damage, I treat any roll of 1 on my Sneak Attack dice" + "\n   as a 7 instead"
		}
	}
});
