var iFileName = "Sciurus Homebrew Race - by decoratedboar"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999); // Optional; This is the minimum required version number of the sheet for the script to work. If the sheet being used to import the script is of an earlier version, the user will be warned

RaceList["tree sciurus"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*tree)(?=.*sciurus).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something catlike/i

	name : "Sciurus (Tree)", //required; the name to use for the race

	// sortname : "Catlike, Something", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	plural : "Sciurus\'", //required; the name to use for the race when the plural form is used

	size : 4, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)

	speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"

		// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)

		walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.

		climb : { spd : "walk", enc : "walk" }, // instead of numbers, you can also have modifiers. Modifiers are a string, starting with a mathematical operator, followed by a number (e.g. "-10", "+20"). // a value that is zero is ignored

		// allModes : "+10" // the 'allModes' attribute can only consist of a modifier. This modifier is applied to all speed modes, both normal and encumbered. It is only applied if the speed mode exists, it won't give the character a burrow speed if it would otherwise have none, for example
	},

	languageProfs : [1, "Common"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	age : " reach adulthood at around age six, and don't usually live for more than 30 years.",

	height : " are rarely more than two feet tall.",

	weight : " weigh between 15 and 25 pounds.",

	heightMetric : " are rarely more than 60 centimeters tall.",

	weightMetric : " weigh between six and 11 kilograms.",

	improvements : "Tree Sciurus: +1 Wisdom, +2 Dexterity;", //required; the text that is displayed when listing all the ability score improvements

	scores : [0, 2, 0, 0, 1, 0], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]

	trait : "Tree Sciurus: (+1 Wisdom, +2 Dexterity) \nTreetop Tactics: Gain advantage on ranged attacks when more than 10ft above target creature. When more than 10ft above solid ground, leap up to 10ft horizontally, making a melee attack against a creature in range upon landing, dealing extra damage equal to prof. bonus on a hit. You take no fall damage and aren't knocked prone.\nNaturally Nimble: Climbing speed equal to walking speed, and suffer no penalty from difficult terrain. \nWinter Stash: You always count as medium sized when determining your carrying capacity.", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).
	carryingCapacity : 3,
	
	calcChanges : {
		atkAdd : ["if (isRangedWeapon) {fields.Description += ', adv. on attack roll when >10ft. above target';}; ", "Gain advantage on ranged attacks when more than 10ft above target creature."],
		atkAdd : ["if (isSpell) {fields.Description += ', adv. on attack roll when >10ft. above target';}; ", "Gain advantage on ranged attacks when more than 10ft above target creature."],
		atkAdd : ["if (isMeleeWeapon) {fields.Description += ', when >10ft. up, leap up to 10ft. horizontally, add prof. bonus to damage on hit';}; ", "While you are at least ten above solid ground, you can use one of your attacks while taking the Attack action to jump up to ten feet horizontally, falling to that ground, and making a melee attack against a creature within five feet of you. On a hit, the creature takes extra damage equal to your proficiency bonus. You aren't knocked prone by this fall, and take no fall damage unless you fell more than 60 feet."],
	}
}
	
RaceList["ground sciurus"] = { //Object name; Note the use of only lower case! Also note the absence of the word "var" and the use of brackets []

	regExpSearch : /^(?=.*ground)(?=.*sciurus).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "something" and "catlike" in it, disregarding capitalization). If this looks too complicated, just write: /something catlike/i

	name : "Sciurus (Ground)", //required; the name to use for the race

	// sortname : "Catlike, Something", //optional; this is the name used to fill the drop-down boxes. If you don't include this, the 'name' will used instead

	source : ["HB", 0], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]

	plural : "Sciurus\'", //required; the name to use for the race when the plural form is used

	size : 4, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)

	speed : { //required; This sets a value for one or more speed modes, and/or a value to be added to a specific speed mode or to all speed modes // the attributes of this object can be "walk", "burrow", "climb", "fly", "swim", and "allModes"

		// all of the following attributes are optional and you can add more ("burrow" isn't part of this example!)

		walk : { spd : 30, enc : 20 }, // the objects "walk", "burrow", "climb", "fly", "swim" are all the same, they are an object with two attributes, 'spd' for the speed in feet, and 'enc' for the encumbered speed in feet.

		// allModes : "+10" // the 'allModes' attribute can only consist of a modifier. This modifier is applied to all speed modes, both normal and encumbered. It is only applied if the speed mode exists, it won't give the character a burrow speed if it would otherwise have none, for example
	},

	languageProfs : [1, "Common"], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	age : " reach adulthood at around age six, and don't usually live for more than 30 years.",

	height : " are rarely more than two feet tall.",

	weight : " weigh between 15 and 25 pounds.",

	heightMetric : " are rarely more than 60 centimeters tall.",

	weightMetric : " weigh between six and 11 kilograms.",

	improvements : "Ground Sciurus: +1 Wisdom, +2 Constitution;", //required; the text that is displayed when listing all the ability score improvements

	scores : [0, 0, 2, 0, 1, 0], //required; the ability score improvements as used by the Ability Score dialog. The syntax is: [Str, Dex, Con, Int, Wis, Cha]

	trait : "Ground Sciurus: (+1 Wisdom, +2 Constitution) \nDefensive Burrow: Use a bonus action to dig a burrow, acting as three-quarters cover while you are inside. 5ft of movement to enter/exit, remaining until destroyed or you fill it in (bonus action). Use a number of times equal to prof. bonus per long rest.\nGroundhog Getaway: You can take Disengage as a bonus action, or Hide while within 10ft of burrow. \nStocking Up: You always count as medium sized when determining your carrying capacity.", //required; the racial trait as it will be put in the Racial Trait field on the second page (note that "\n" is a line break).
	carryingCapacity : 3,
	
	features : { //optional; the racial features. Each works the same way, so only a couple of example are given. You can add as many as you want. If the race has no level-dependent or limited features, you can just delete the whole feature entry all together

		"defensive burrow" : { //note the use of lower case characters

			name : "Defensive Burrow", //required; the name of the racial feature
			minlevel : 1, //required; the level at which the feature is gained

			usages : [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6], //optional; number of times it can be used. This can be one value, but can also be an array of 20 values, one for each level

			recovery : "long rest", //required if "usages" is defined; way of getting the limited feature recharged. If you can use anything, but use either "long rest" or "short rest" (note the lower case) for best compatibility with the limited features section. This can be one value, but can also be an array of 20 values, one for each level

			tooltip : " (Defensive Burrow)", //optional; the tooltip added to the entry in the Limited Feature section, this example will read "Lesser Restoration is gained from Something Catlike (Celestial Legacy)"

			action : ["bonus action", "Dig/destroy defensive burrow"], //optional; adds the name of the feature to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
			},
		
		"droundhog getaway" : { //note the use of lower case characters

			name : "Groundhog Getaway", //required; the name of the racial feature
			minlevel : 1, //required; the level at which the feature is gained
			
			action : ["bonus action", "Disengage (or Hide while within 10ft. of a burrow)"],
		}
	}
}
