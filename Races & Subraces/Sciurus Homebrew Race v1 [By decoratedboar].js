/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Races
	Effect:		This script adds a race, Sciurus
				These homebrew subraces were created by decoratedboar, and can be found here:
					https://homebrewery.naturalcrit.com/share/1azzFxXLUhcPJO16fmQLmuH19j7lhTc5OrfiownuOwGAa
					https://homebrewery.naturalcrit.com/share/1g7Usc3VaZpenHr4h1hdsWtta6AyuVWCFEV3X9QuavvWQ
	Code by:	u/decoratedblood (decoratedboar)
	Date:		15-08-2022 (sheet v12.999)
*/

var iFileName = "Sciurus Homebrew Race - by decoratedboar";
RequiredSheetVersion(12.999); 
RaceList["tree sciurus"] = { 
	regExpSearch : /^(?=.*tree)(?=.*sciurus).*$/i, 
	name : "Sciurus (Tree)",
	source : ["HB", 0],
	plural : "Sciuruses",
	size : 4,
	speed : { 
		walk : { spd : 30, enc : 20 }, 
		climb : { spd : "walk", enc : "walk" },
	},
	languageProfs : ["Common", 1],
	age : " reach adulthood at around age six, and don't usually live for more than 30 years.",
	height : " are rarely more than two feet tall.",
	weight : " weigh between 15 and 25 pounds.",
	heightMetric : " are rarely more than 60 centimeters tall.",
	weightMetric : " weigh between six and 11 kilograms.",
	improvements : "Tree Sciurus: +1 Wisdom, +2 Dexterity;", 
	scores : [0, 2, 0, 0, 1, 0],
	trait : "Tree Sciurus: (+1 Wisdom, +2 Dexterity) \nTreetop Tactics: Gain advantage on ranged attacks when more than 10ft above target creature. When more than 10ft above solid ground, leap up to 10ft horizontally, making a melee attack against a creature in range upon landing, dealing extra damage equal to prof. bonus on a hit. You take no fall damage and aren't knocked prone.\nNaturally Nimble: Climbing speed equal to walking speed, and suffer no penalty from difficult terrain. \nWinter Stash: You always count as medium sized when determining your carrying capacity.", 
	carryingCapacity : 3,
	
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isRangedWeapon || v.isSpell) {
						fields.Description += ', adv. on attack roll when >10ft. above target';
				}; "Gain advantage on ranged attacks when more than 10ft above target creature.";
				if (v.isMeleeWeapon) {
					fields.Description += ', when >10ft. up, leap up to 10ft. horizontally, +' + How('Proficiency Bonus') + ' damage on hit';
				}; "While you are at least ten above solid ground, you can use one of your attacks while taking the Attack action to jump up to ten feet horizontally, falling to that ground, and making a melee attack against a creature within five feet of you. On a hit, the creature takes extra damage equal to your proficiency bonus. You aren't knocked prone by this fall, and take no fall damage unless you fell more than 60 feet.";
			}
		],
	},
}
	
RaceList["ground sciurus"] = {
	regExpSearch : /^(?=.*ground)(?=.*sciurus).*$/i,
	name : "Sciurus (Ground)",
	source : ["HB", 0],
	plural : "Sciuruses", 
	size : 4,
	speed : {
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", 1],
	age : " reach adulthood at around age six, and don't usually live for more than 30 years.",
	height : " are rarely more than two feet tall.",
	weight : " weigh between 15 and 25 pounds.",
	heightMetric : " are rarely more than 60 centimeters tall.",
	weightMetric : " weigh between six and 11 kilograms.",
	improvements : "Ground Sciurus: +1 Wisdom, +2 Constitution;", 
	scores : [0, 0, 2, 0, 1, 0],
	trait : "Ground Sciurus: (+1 Wisdom, +2 Constitution) \nDefensive Burrow: Use a bonus action to dig a burrow, acting as three-quarters cover while you are inside. 5ft of movement to enter/exit, remaining until destroyed or you fill it in (bonus action). Use a number of times equal to prof. bonus per long rest.\nGroundhog Getaway: You can take Disengage as a bonus action, or Hide while within 10ft of burrow. \nStocking Up: You always count as medium sized when determining your carrying capacity.", 
	carryingCapacity : 3,
	
	features : {
		"defensive burrow" : { 
			name : "Defensive Burrow", 
			minlevel : 1,
			usages : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6], 
			recovery : "long rest",
			tooltip : " (Defensive Burrow)",
			action : ["bonus action", "Dig/destroy defensive burrow"], 
			},
		
		"groundhog getaway" : { 
			name : "Groundhog Getaway",
			minlevel : 1, 
			action : ["bonus action", "Disengage (or Hide while within 10ft. of a burrow)"],
		}
	}
}
