/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Race, Background and Background Feature
	Effect:		This script adds a class, the Ravager, and a background, the Glory Seeker
				Both the class and background are from Kisarta, support Kisarta on their website:
				https://www.kisarta.com/
	Code by:	u/decoratedblood (decoratedboar)
	Date:		8-08-2023 (sheet v13)
*/

var iFileName = "Ravager Class and Glory Seeker Background [From Kisarta, transcribed by decoratedboar].js";
RequiredSheetVersion(13);

SourceList["K"] = {
	name : "Kisarta",
	abbreviation : "K",
	group : "Kisarta",
	url : "https://www.kisarta.com/",
};

BackgroundList["Glory Seeker"] = {
	regExpSearch : /^(?=.*glory)(?=.*seeker).*$/i,
	name : "Glory Seeker",
	source : ["K", 152],
	skills : ["Intimidation", "Persuasion"], 
	gold : 0,	
	equipright : [
		["Fine clothes", "1", 6],
		["Item with family symbol", "1", ""],
		["Belt pouch (with 20 Aether Shards)", "1", 1],
	],

	feature : "Powerful Contact",
	trait : [
		"I judge others depending on their social standing, not on their merits.",
		"If there is a chance to gain fame or glory, I will always be the first to come forward.",
		"I would rather not talk or waste time with those I deem inferior or useless to my goal.",
		"I have great confidence in myself and in my skills.",
		"In a conflict I will always try to find a fair solution for all those involved, hoping the gain everyone’s appreciation.",
		"I try to talk in a more refined way to appear important.",
		"I will always follow the orders of someone who is my social superior.",
		"My trust in someone is completely shattered when I am wronged."
	],
	ideal : [
		["Generosity",
			"Generosity. Helping others is a great way to gain prestige and do some good. (Good)"
		],
		["Greed",
			"Greed. Everything I earn must be spent for my goal, using resources for anything else is a waste. (Any)"
		],
		["Egotism",
			"Egotism. I am willing to take advantage of others to gain power and glory. (Evil)"
		],
		["Respect",
			"Respect. Everyone is to be treated according to the law, nobles and farmers alike, no matter their social standing. (Lawful)"
		],
		["Power",
			"Power. I want to gain as much power as possible, so that I can control others. (Evil)"
		],
		["Independence",
			"Independence. I believe that obeying orders only helps to create more tyrants willing to give orders. (Chaotic)"
		],
	],
	bond : [
		"There is someone I am extremely fond of and whom I trust completely.",
		"I work in direct contact with an aristocrat who is helping me climb the social ladder.",
		"I own an item that reminds me of the successes of my past life.",
		"I swore vengeance upon a person or a creature that wronged me.",
		"There is someone I greatly admire and whose deeds I hope to equal.",
		"I have a rival with my same goal who will do anything to get rid of me."
	],
	flaw : [
		"I am a coward and in dangerous situations I am always the last to risk something.",
		"I am lazy and I will happily leave the heavy work to others.",
		"My honor is the most important thing.",
		"I have several vices (alcohol, gambling, etc.) and I cannot resist them.",
		"I do not know my place, and I often end up in some trouble to show off.",
		"I must have the final say!"
	],
	toolProfs : ["Forgery Kit", "Disguise Kit"],	
	languageProfs : [1],
};
BackgroundFeatureList["powerful contact"] = {
	description : "Establish, together with the GM, a powerful NPC (an aristocrat, a famous merchant, etc.) you are on the best of terms with. This NPC will help you as best as he or she can during your adventures and he or she will come to your rescue when sorely needed.",
	source : ["K", 152],
};

ClassList["ravager"] = {
	name : "Ravager",
	regExpSearch : /^(?=.*ravager).*$/i,
	source : ["K", 117],
	primaryAbility : "\n \u2022 MyClass: Strength;",
	prereqs : "",
	die : 12,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	saves : ["Str", "Dex"],
	skills : ["\n\n" + toUni("MyClass") + ": Choose two from Acrobatics, Athletics, History, Insight, Intimidation, Medicine, Perception, Stealth, and Survival", "\n\n"], //Nothing for multiclassing in the writeup
	
	armor : [
		[true, true, true, true],
		[false, false, false, false] //Nothing for multiclassing in the writeup
	],
	
	weapons : [
		[true, false, ["Heavy Crossbow"]]
		[false, false] //Nothing for multiclassing in the writeup
	],
	
	
	equipment : "MyClass starting equipment:" +
	"\n \u2022 A simple weapon;" +
	"\n \u2022 Four javelins -or- a heavy crossbow and 20 bolts;" +
	"\n \u2022 Leather armour -or- hide armor -or- chain mail;" +
	"\n \u2022 A dungeoneer's pack -or- an explorer's pack.",
	//No gold alternative in writeup

	subclasses : ["Ravager Conduit", []], 
	features : {
		"subclassfeature1" : {
			name : "Ravager Conduit",
			source : ["K", 118],
			minlevel : 1,
			description : desc ([
			"Choose your Ravager Conduit to put in the 'Class' field.",
			])
		},
		"ravager weapon" : {
			name : "Ravager Weapon",
			source : ["K", 118],
			minlevel : 1,
			description : desc ([
			"Use the \"Choose Feature\" button above to select a Ravager Weapon that I am",
			"automatically proficient in. I can manifest these weapons as a bonus action, and",
			"they dissipate at the end of my turn if it leaves my hands."
			]),
			additional : levels.map(function (n) {
				return (n < 11 ? 1 : 2) + " weapons available";
			}),
			weaponOptions : [{
					baseWeapon : "whip",
					regExpSearch : /^(?=.*coiling)(?=.*razor).*$/i,
					name : "Coiling Razor",
					source : [["K", 118]],
					ability : 1,
					type : "AlwaysProf",
					damage : [2, 4, "Slashing"],
					range : "Melee, 15 ft.",
					description : "Finesse, special",
					abilitytodamage : true,
					weight : 6,
				}, {
					baseWeapon : "dagger",
					regExpSearch : /^(?=.*butcher's)(?=.*cleavers).*$/i,
					name : "Butcher's Cleavers",
					source : [["K", 118]],
					ability : 1,
					type : "AlwaysProf",
					damage : [1, 8, "Slashing"],
					range : "Melee",
					description : "Light",
					abilitytodamage : true,
					weight : 8,
				}, {
					baseWeapon : "warhammer",
					regExpSearch : /^(?=.*mawed)(?=.*maul).*$/i,
					name : "Mawed Maul",
					source : [["K", 118]],
					ability : 1,
					type : "AlwaysProf",
					damage : [2, 6, "Bludg./Pierce."],
					range : "Melee",
					description : "Heavy; Attempt grapple after hit",
					abilitytodamage : true,
					weight : 16,
				}],
			extraTimes : levels.map(function (n) {
				return n < 11 ? 1 : 2;
			}),
			extraname : "Ravager Weapon",
			extrachoices : ["Coiling Razor", "Butcher's Cleavers", "Mawed Maul"],
			"coiling razor" : {
				name : "Coiling Razor",
				description : desc ([ 
				"\u2022 This bladed whip has a reach of 15 feet.",
				]),
				weaponsAdd : ["Coiling Razor"],
			},
			"butcher's cleavers" : {
				name : "Butcher's Cleavers",
				description : desc ([
				"\u2022 These paired cleavers weigh four pounds each.",
				]),
				weaponsAdd : ["Butcher's Cleavers"],
			},
			"mawed maul" : {
				name : "Mawed Maul",
				description : desc ([
				"\u2022 This hammer deals my choice of bludgeoning or piercing damage.",
				"\u2022 After hitting a creature, I can attempt to grapple it. I don't need a free hand for this, but",
				"I cannot attack with the Maul while grappling a creature, unless the target is adjacent to",
				"the creature. I can only grapple one creature at a time.",
			]),
				weaponsAdd : ["Mawed Maul"],
			},
		},		
		"relentless" : {
			name : "Relentless",
			source : ["K", 118],
			minlevel : 2,
			description : desc ([
			"Moving through difficult terrain costs me no extra movement speed, and I can Dash",
			"as a bonus action.",
			]),
			limfeaname : "Dash",
			action : ["bonus action", " (Relentless)"],
		},			
		"shred" : {
			name : "Shred",
			source : ["K", 118],
			minlevel : 3,
			description : desc([
			"After making an attack with my Ravager Weapon, I can roll for additional damage.",
			]),	
			additional : levels.map(function (n) {
				return (n < 9 ? "1d6" : n < 15 ? "1d10" : n < 20 ? "2d6" : "2d10") + " bonus damage";
			}),		
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/(coiling razor|butcher's cleavers|mawed maul)/i).test(v.WeaponTextName)) {
							var n = classes.known.ravager.level;
							var damg = (n < 9 ? "1d6" : n < 15 ? "1d10" : n < 20 ? "2d6" : "2d10");
							fields.Description += (fields.Description ? '; ' : '') + "+" + damg + " on hit";
						}
					},
					"My Ravager Weapons deal extra damage on hit."
				]
			}
		},
		"sharp hate" : {
			name : "Sharp Hate",
			source : ["K", 119],
			minlevel : 6,
			description : desc ([
			"My Ravager Weapon attacks count as magical.",
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/(coiling razor|butcher's cleavers|mawed maul)/i).test(v.WeaponTextName)) {
							fields.Description += (fields.Description ? '; ' : '') + "Counts as magical";
						}
					},
					"My Ravager Weapon attacks count as magical."
				]
			}
		},
		"ravager weapon improvement" : {
			name : "Ravager Weapon Improvement",
			source : ["K", 119],
			minlevel : 11,
			description : desc ([
			"I can select a second Ravager Weapon. My chosen Ravager Weapons are also improved:",
			"\u2022 Coiling Razor: Once per turn, I can knock a creature prone if I've hit it twice in that turn.",
			"\u2022 Butcher's Cleavers: The Cleavers now deal 1d10 damage, and gain the thrown property.",
			"I can retrieve them without expending an action.",
			"\u2022 Mawed Maul: Creatures grappled by the Maul are also restrained.",
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/coiling razor/i).test(v.WeaponTextName)) {
							fields.Description += (fields.Description ? '; ' : '') + "Knock prone crea. hit twice";
						}
						if ((/butcher's cleavers/i).test(v.WeaponTextName)) {
							fields.Description += (fields.Description ? '; ' : '') + "Thrown";
							fields.Range = "Melee, 20/60 ft.";
						}
						if ((/mawed maul/i).test(v.WeaponTextName)) {
							fields.Description += (fields.Description ? '; ' : '') + "Grappled creas. restrained";
						}
					}
				],
				atkCalc : [
					function (fields, v, output) {
						if ((/butcher's cleavers/i).test(v.WeaponTextName)) {
							output.die = "1d10";
						}
					}
				]
			}
		},
		"communion of pain" : {
			name : "Communion of Pain",
			source : ["K", 119],
			minlevel : 14,
			description : desc([
			"As long as I've killed a creature within the last 30 days, I don't need to eat, drink, sleep,",
			"or breath, I gain proficiency in death saving throws, and I stop aging.",
			]),
		},
		"blind fury" : {
			name : "Blind Fury",
			source : ["K", 119],
			minlevel : 17,
			description : desc([
			"When making a Ravager Weapon attack with advantage or disadvantage, if the two",
			"D20 rolls are the same (and aren't both 1), I hit automatically. If had advantage on",
			"the attack, it does critical damage.",
			]),
		},		
	},
};	

AddSubClass("ravager", "bloodhound conduit", {
	regExpSearch : /^(?=.*bloodhound)(?=.*conduit).*$/i,
	subname : "Bloodhound Conduit",
	source : ["K", 119],
	features : {
		"subclassfeature1" : {
			name : "Marked",
			source : ["K", 119],
			minlevel : 1,
			description : desc([
			"Once per short or long rest, after being damaged by a creature I can use my reaction,",
			"or bonus action on my next turn, to mark that creature. For 1 hour I have advantage on", 
			"any Wisdom (Perception) or Wisdom (Survival) checks to find the marked creature,", 
			"my attacks against it deal an additional 1d6 damage, and it can't benefit from resistances",   
			"against my attacks.",
			]),
			usages : 1,
			recovery : "short rest",
			action : [["reaction", " (after dmg.)"], ["bonus action", " (next turn after dmg.)"]],
		},
		"subclassfeature6" : {
			name : "Lifedrinker",
			source : ["K", 120],
			minlevel : 6,
			description : desc([
				"When I reduce a hostile creature to 0 Hit Points, I gain my Constitution modifier +",
				"my Ravager level in temporary Hit Points."
			]),
			additional : levels.map( function(n) {
				return n + " + Con. mod temp. HP";
			}),
		},
		"subclassfeature13" : {
			name : "Bloodletter",
			source : ["K", 120],
			minlevel : 13,
			description : desc([
				"When I hit a creature with my Ravager Weapon, I inflict it with 1 Wound. A Wounded",
				"creature takes 1d4 of the Weapon's damage type per Wound at the start of each of",
				"its turns. After taking this damage, it can make a Constitution saving throw against DC",
				"8 + my proficiency bonus + my choice between my Strength or Dexterity modifier,",
				"healing all wounds on a success.",
			]),
		},
		"subclassfeature18" : {
			name : "Hunting Grounds",
			source : ["K", 120],
			minlevel : 18,
			description : desc([
			"I gain 120 feet of Truesight and Blindsight. Additionally, while in combat I can use a",
			"bonus action to detect the location and type of any hostile creature within 120 feet,",
			"until the end of my next turn. I gain advantage on attack rolls against the revealed",
			"creature, but it cannot gain advantage on attack rolls against me.",
			]),
			vision : [
				["Truesight", 120],
				["Blindsight", 120],
			],
			action : ["bonus action", " (sense creature)"],
		},
	}
});

AddSubClass("ravager", "thrasher conduit", {
	regExpSearch : /^(?=.*thrasher)(?=.*conduit).*$/i,
	subname : "Thrasher Conduit",
	source : ["K", 120],
	features : {
		"subclassfeature1" : {
			name : "Outnumbered",
			source : ["K", 120],
			minlevel : 1,
			description : desc([
			"I gain advantage on attack rolls when at least three hostile creatures are within 5 feet of me.",
			]),
		},
		"subclassfeature6" : {
			name : "Burst of Fury",
			source : ["K", 120],
			minlevel : 6,
			description : desc([
				"As an action, I can make a melee attack with my Ravager Weapon against each creature",
				"within 15 feet of me, and within my Ravager Weapon's reach, using separate attack and",
				"damage rolls for each target.",
				"I can use this feature a number of times equal to my Strength modifier per long rest."
			]),
			action : ["action", ""],
			usages : "Strength modifier per ",
			usagescalc : "event.value = Math.max(1, What('Str Mod'));",
			recovery : "long rest"
		},
		"subclassfeature13" : {
			name : "Bulwark",
			source : ["K", 120],
			minlevel : 13,
			description : desc([
				"Once per turn, after hitting a creature with my Ravager Weapon, I can spend one of my",
				"Hit Dice to regain Hit Points equal to half the damage inflict by the attack.",
			]),
		},
		"subclassfeature18" : {
			name : "Tempest of Rage",
			source : ["K", 120],
			minlevel : 18,
			description : desc([
			"When using my Burst of Fury feature, I can make two attacks against each target.",
			]),
		},
	}
});