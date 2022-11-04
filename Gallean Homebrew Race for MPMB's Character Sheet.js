var iFileName = "Gallean Homebrew Race - By decoratedboar";
RequiredSheetVersion(12.999);

RaceList["gallean"] = { 

	regExpSearch : /^(?=.*gallean).*$/i,

	name : "Gallean", 

	source : ["HB", 0],

	plural : "Galleans",

	size : 3, //required;  the size of the race (Gargantuan = 0, Huge = 1, Large = 2, Medium = 3, Small = 4, Tiny = 5)

	speed : { 

		walk : { spd : 30, enc : 20 },

		fly : { spd : "walk", enc : "walk" },

		// allModes : "+10" // the 'allModes' attribute can only consist of a modifier. This modifier is applied to all speed modes, both normal and encumbered. It is only applied if the speed mode exists, it won't give the character a burrow speed if it would otherwise have none, for example
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

	trait : "Gallean (+2 Dexterity, +1 Charisma)\nTalons: My unarmed strikes deal 1d6 + Strength modifier slashing damage. \nCocksure: I have proficiency in the Performance and Intimidation skills. \nFlourish: As a bonus action, I can distract a target within 30ft with my plumage and give them disadvantage on their next attack roll, saving throw, or ability check. Use a number of times equal to prof. bonus per long rest. \nFeather Falling: I have flying speed equal to my walking speed, but when I end a turn in the air or use all of my flying speed, I fall to the ground.",

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

			action : ["bonus action", ""], //optional; adds the name of the feature to the action list when chosen. The options are "action", "bonus action", and "reaction" //the second value in the array is added as a suffix for the "name" of the feature when entered into the action field
		}
	}

};
