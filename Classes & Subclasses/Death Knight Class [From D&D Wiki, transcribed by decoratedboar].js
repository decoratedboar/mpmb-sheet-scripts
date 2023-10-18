/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the Death Knight class, a homebrew creation from the D&D Wiki, alongside the Necro Blast cantrip, also from there.
				They can be found at https://www.dandwiki.com/wiki/Death_Knight_(5e_Class)
				https://www.dandwiki.com/wiki/Necro_Blast_(5e_Spell)
	Code by:	u/decoratedblood (decoratedboar)
	Date:		07-09-2023 (sheet v13)
*/

var iFileName = "Death Knight Class [From D&D Wiki, transcribed by decoratedboar]js";

RequiredSheetVersion("13.0.0");

[//This code adds the array of spells above to the list. Not defining a specific list means that more spells can be added later, without having to edit this script.
	//Cantrips (0 level)
	"chill touch", "spare the dying", "toll the dead", "necro blast", 
	//1st level
	"bane", "command", "compelled duel", "cause fear", "dissonant whispers", "inflict wounds", "false life", "hex", "detect evil and good", "searing smite",
	//2nd level
	"blindness/deafness", "crown of madness", "darkness", "gentle repose", "hold person", "magic weapon", "mind spike", "ray of enfeeblement", "shatter",
	//3rd level
	"animate dead", "bestow curse", "dispel magic", "elemental weapon", "fear", "feign death", "haste", "life transference", "revivify", "speak with dead", "vampiric touch", "fireball",
	//4th level
	"blight", "banishment", "death ward", "staggering smite", "shadow of moil",
	//5th level
	"cloudkill", "contagion", "danse macabre", "destructive wave", "enevartion", "geas", "negative energy flood", "raise dead"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("death knight") === -1) SpellsList[s].classes.push("death knight");
});

ClassList["death knight"] = {
	name : "Death Knight",
	regExpSearch : /^(?=.*death)(?=.*knight).*$/i,
	source : ["HB", 0],
	primaryAbility : "\n \u2022 MyClass: Charisma;",
	prereqs : "13 in Constitution and Charisma",
	die : 10,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	saves : ["Con", "Cha"],
	skills : ["\n\n" + toUni("MyClass") + ": Choose three from Acrobatics, Arcana, Athletics, Animal Handling, Insight, Intimidation, Investigation, Perception, and Survival.", "\n\n" + toUni("MyClass") + ""],
	
	armor : [
		[true, true, true, true],
		[true, true, false, true]
	],
	
	weapons : [
		[true, true],
		[true, true]
	],
	
	abilitySave : 6,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3],
		spells : "list",
		prepared : true
	},
	
	equipment : "MyClass starting equipment:" +
	"\n \u2022 Two martial weapons -or- a martial weapon and a shield;" +
	"\n \u2022 Scale mail -or- chain mail;" +
	"\n \u2022 Four javelins -or- two handaxes;" +
	"\n \u2022 A dungeoneer's pack -or- an explorer's pack." +
	"\n \nAlternatively, you may start with 5d4 \xD7 10 gp to buy your own equipment.",

	subclasses : ["Dark Orders", []], //addSubclass() creates it's own entries here
	features : {
		"spellcasting" : {
			name : "Spellcasting",
			source : ["HB", 0],
			minlevel : 1,
			description : desc([
				"I can cast Death Knight spells that I know, using Charisma as my spellcasting ability.",
				"I can use my rune weapon as a spellcasting focus for my Death Knight spells.",
				"I can cast my prepared spells as rituals if they have the ritual tag."
			]),
			additional : levels.map(function (n, idx) {
				var cantr = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3][idx];
				return cantr + " cantrips known";
			})
		},
		"honor bound, death's pact" : {
			name : "Honor Bound, Death's Pact",
			source : ["HB", 0],
			minlevel : 1,
			description : desc ([
			"For every ten years that pass, my body ages 1 year. I'm immune to being magically aged.",
			]),			
		},		
		"rune weapon" : {
			name : "Rune Weapon",
			source : ["HB", 0],
			minlevel : 1,
			description : desc ([
			"I designate a weapon I'm proficient with as my Rune Weapon. This weapon uses",
			"my Charisma modifier for attack and damage rolls, and its attacks count as magical.",
			"I can stow or draw this weapon as a free action.",
			"Adding \"Rune\" to an attack entry on the first page designates a weapon as my Rune",
			"Weapon. I can only have one Rune Weapon at a time.",
			]),
			
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/\brune\b/i).test(v.WeaponTextName)) {
							fields.Mod = 6;
							fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
						};
					},
					"If I include the word \"Runic\" in the name of a weapon I'm proficient with, it gets treated as my Rune Weapon.",
				]
			}
		},			
		"eyes of fear" : {
			name : "Eyes of Fear",
			source : ["HB", 0],
			minlevel : 1,
			description : desc([
			"A number of times equal to my Charisma modifier per long rest, as a bonus action,",
			"I make one target within 60 feet succeed on a Wisdom saving throw or become",
			"frightened of me until the start of my next turn.",
			"Undead and Constructs are immune to this ability.",
			"I also gain advantage on saving throws against being frightened."
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			
			savetxt : { adv_vs : ["being frightened"] }
		},
		"fighting style" : {
				name : "Fighting Style",
				source : ["HB", 0],
				minlevel : 2,
				description : desc('Choose a Fighting Style using the "Choose Feature" button above'),
				choices : ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
				"archery" : FightingStyles.archery,
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"great weapon fighting" : FightingStyles.great_weapon,
				"protection" : FightingStyles.protection,
				"two-weapon fighting" : FightingStyles.two_weapon
			},
		"necrostrike" : {
			name : "Necrostrike",
			source : ["HB", 0],
			minlevel : 2,
			description : desc ([
			"A number of times equal to my Charisma modifier per long rest, as a bonus action,",
			"I cause my first attack on a turn to deal an extra 1d6 necrotic damage for each",
			"rune on my Rune Weapon.",
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
		},
		"runeforging" : {
			name : "Runeforging",
			source : ["HB", 0],
			minlevel : 2,
			description : desc ([
			"I learn to craft a number of runes for my Rune Weapon. This process takes 1 hour",
			"per rune, and I can change one inscribed rune each time I gain a level in this class.",
			"Creatures other than me take 1d6 necrotic damage per rune at the start of their",
			"turns while holding my inscribed Rune Weapon.",
			]),
			additional : levels.map(function (n) {
				return (n < 3 ? 1 : n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6) + ' total runes';
			}),
			extraname : "Runeforging",	
			extraTimes : levels.map(function (n) {
			return (n < 3 ? 1 : n < 5 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6) 
			}),
			extrachoices : ["Rune of Razorice", "Rune of Razorice (2)", "Rune of the Fallen Crusader", "Rune of the Fallen Crusader (2)", "Rune of the Fallen Crusader (3)", "Rune of the Fallen Crusader (4)", "Rune of the Fallen Crusader (5)", "Rune of the Fallen Crusader (6)", "Rune of the Stoneskin Gargoyle", "Rune of the Stoneskin Gargoyle (2)", "Rune of the Deathbringer", "Rune of the Deathbringer (2)", "Rune of Cinderglacier (prereq: 5th level)", "Rune of Lichbane (prereq: 5th level)", "Rune of Spellbreaking", "Rune of Spellbreaking (2)", "Rune of Swordbreaking"],
			
			"rune of razorice" : {
				name : "Rune of Razorice",
				source : ["HB", 0],
				description : desc([
					"My Rune Weapon gains +1 to attack and damage rolls.",
					"I can inscribe this rune a second time at 10th level."
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/\brune\b/i).test(v.WeaponTextName)) {
								
								if (GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of razorice (1)')) {
									fields.To_Hit_Bonus += 2;
									fields.Damage_Bonus += 2;
								} else {
									fields.To_Hit_Bonus += 1;
									fields.Damage_Bonus += 1;
								}
							};
						},
						"My Rune Weapon gain +1 to attack and damage rolls.",
					]
				}
			},
			"rune of razorice (2)" : {
				name : "Rune of Razorice (2)",
				source : ["HB", 0],
				description : desc([
					"My Rune Weapon gains an additional +1 to attack and damage rolls."
				]),
				prereqeval : function (v) { 
					return ((GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of razorice') != -1) && (classes.known['death knight'].level >= 10) ? true : "skip") //Checks for the first of this rune, and for the appropriate level it's available at.
				}
			},
			"rune of the fallen crusader" : {
				name : "Rune of the Fallen Crusader",
				source : ["HB", 0],
				description : desc([
					"I can use my bonus action to expend a spell slot, regaining 2d6 per spell slot level +",
					"my Constitution modifier hit points. Each additional time I inscribe this rune, I can",
					"regain another 2d6 hit points."
				]),
				action : ["bonus action", ""],
				additional : levels.map(function (n) {
					return "Restore 2d6 per spell lvl + Con. HP";
				}),
			},
			"rune of the fallen crusader (2)" : {
				name : "Rune of the Fallen Crusader (2)",
				source : ["HB", 0],
				description : desc([
					"I restore an additional 2d6 with Rune of the Fallen Crusader"
				]),
				prereqeval : function (v) { 
					return (GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the fallen crusader') != -1 ? true : "skip") //Checks for the prior rune.
				}
			},
			"rune of the fallen crusader (3)" : {
				name : "Rune of the Fallen Crusader (3)",
				source : ["HB", 0],
				description : desc([
					"I restore an additional 2d6 with Rune of the Fallen Crusader"
				]),
				prereqeval : function (v) { 
					return (GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the fallen crusader (2)') != -1 ? true : "skip") //Checks for the prior rune.
				}
			},
			"rune of the fallen crusader (4)" : {
				name : "Rune of the Fallen Crusader (4)",
				source : ["HB", 0],
				description : desc([
					"I restore an additional 2d6 with Rune of the Fallen Crusader"
				]),
				prereqeval : function (v) { 
					return (GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the fallen crusader (3)') != -1 ? true : "skip") //Checks for the prior rune.
				}
			},
			"rune of the fallen crusader (5)" : {
				name : "Rune of the Fallen Crusader (5)",
				source : ["HB", 0],
				description : desc([
					"I restore an additional 2d6 with Rune of the Fallen Crusader"
				]),
				prereqeval : function (v) { 
					return (GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the fallen crusader (4)') != -1 ? true : "skip") //Checks for the prior rune.
				}
			},
			"rune of the fallen crusader (6)" : {
				name : "Rune of the Fallen Crusader (6)",
				source : ["HB", 0],
				description : desc([
					"I restore an additional 2d6 with Rune of the Fallen Crusader"
				]),
				prereqeval : function (v) { 
					return (GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the fallen crusader (6)') != -1 ? true : "skip") //Checks for the prior rune.
				}
			},
			"rune of the stoneskin gargoyle" : {
				name : "Rune of the Stoneskin Gargoyle",
				source : ["HB", 0],
				description : desc([
					"I gain a +1 bonus to Constitution or Strength. At 10th level, I can inscribe this rune again,",
					"gaining the bonus to whichever score I haven't already chosen."
				]),
				scorestxt : "+1 Strength or Constitution",
			},
			"rune of the stoneskin gargoyle (2)" : {
				name : "Rune of the Stoneskin Gargoyle (2)",
				source : ["HB", 0],
				description : desc([
					"I gain a +1 bonus to Constitution or Strength, whichever score I haven't already chosen."
				]),
				scorestxt : "+1 Strength or Constitution (whichever hasn't already been chosen)",
				prereqeval : function (v) { 
					return ((GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the stoneskin gargoyle') != -1) && (classes.known['death knight'].level >= 10) ? true : "skip") //Checks for the first of this rune, and for the appropriate level it's available at.
				}
			},
			"rune of the deathbringer" : {
				name : "Rune of the Deathbringer",
				source : ["HB", 0],
				description : desc([
					"My Rune Weapon has its critical strike range increased by 1, or",
					"deals an additional damage die on a crit. At 10th level I can inscribe this rune again,",
					"gaining whichever effect I hadn't previously chosen."
				]),
			},
			"rune of the deathbringer (2)" : {
				name : "Rune of the Deathbringer (2)",
				source : ["HB", 0],
				description : desc([
					"My Rune Weapon has its critical strike range increased by 1, or",
					"deals an additional damage die on a crit, whichever I hadn't previously chosen."
				]),
				prereqeval : function (v) { 
					return ((GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of the deathbringer') != -1) && (classes.known['death knight'].level >= 10) ? true : "skip") //Checks for the first of this rune, and for the appropriate level it's available at.
				}
			},
			"rune of cinderglacier (prereq: 5th level)" : {
				name : "Rune of Cinderglacier (prereq: 5th level)",
				source : ["HB", 0],
				description : desc([
					"My Rune Weapon deals additional cold damage equal to my Charisma modifier."
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/\brune\b/i).test(v.WeaponTextName)) {
								fields.Description += (fields.Description ? '; ' : '') + 'Cha mod. bonus cold dmg. on hit';
							};
						},
						"My Rune Weapon does bonus cold damage equal to my charisma modifier.",
					]
				},
				prereqeval : function (v) { 
					return classes.known['death knight'].level >= 5 
				}
			},
			"rune of lichbane (prereq: 5th level)" : {
				name : "Rune of Lichbane (prereq: 5th level)",
				source : ["HB", 0],
				description : desc([
					"I have advantage on all attacks against undead."
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/\brune\b/i).test(v.WeaponTextName)) {
								fields.Description += (fields.Description ? '; ' : '') + 'Atk. adv. against undead';
							};
						},
						"I have advantage on all attacks against undead.",
					]
				},
				prereqeval : function (v) { 
					return classes.known['death knight'].level >= 5 
				}
			},
			"rune of spellbreaking" : {
				name : "Rune of Spellbreaking",
				source : ["HB", 0],
				description : desc([
					"I gain +1 to all saving throws against spells, and to any checks to counter or dispel",
					"magic. I can inscribe this rune a second time at 10th level."
				]),
			},
			"rune of spellbreaking (2)" : {
				name : "Rune of Spellbreaking (2)",
				source : ["HB", 0],
				description : desc([
					"I gain an additional +1 to all saving throws against spells, and to any checks to",
					"counter or dispel magic."
				]),
				prereqeval : function (v) { 
					return ((GetFeatureChoice('class', 'death knight', 'runeforging', true).indexOf('rune of spellbreaking') != -1) && (classes.known['death knight'].level >= 10) ? true : "skip") //Checks for the first of this rune, and for the appropriate level it's available at.
				}
			},
			"rune of swordbreaking" : {
				name : "Rune of Swordbreaking",
				source : ["HB", 0],
				description : desc([
					"I can use my reaction to give myself +2 AC until the end of my next turn. Additionally, I can no longer be disarmed."
				]),
				action : ["reaction", " (+2 AC)"],
				savetxt : { immune : ["being disarmed"] },
			},
		},
		"subclassfeature3" : {
			name : "Dark Order",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
			"Choose your Dark Order to put in the \"Class\" field.",
			]),
		},
		"profanities" : {
			name : "Profanities",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
			"I can choose a number of Profanities. I can have one Profanity active at a time",
			"(two at 14th level), and I can use a bonus action to active them.",
			"When I gain a level in this class I can swap one Profanity I know for a new one.",
			]),
			additional : levels.map(function (n) {
				return (n < 3 ? 0 : n < 4 ? 1 : n < 7 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5) + ' Profanities known, ' + (n < 14 ? 1 : 2) + " active max.";
			}),
			extraname : "Profanities",	
			extraTimes : levels.map(function (n) {
			return (n < 3 ? 0 : n < 4 ? 1 : n < 7 ? 2 : n < 13 ? 3 : n < 17 ? 4 : 5) 
			}),
			extrachoices : ["Etherfloat", "Grave Armor", "Unholy Vigor", "Aura of the Damned", "Deathwind", "Gravemist", "Pale Horse", "Soulreaver", "Terrorize", "Frightening Presence"], //It is unclear to me whether the profanities listed in individual subclasses and on this feature are accessible only to those subclasses, so i've made them accessible to everyone, and the subclass specific ones subclass specific.
			
			"etherfloat" : {
				name : "Etherfloat",
				source : ["HB", 0],
				description : desc([
					"I hover, raised slightly off the ground. I don't trigger pressure sensitive traps,",
					"can cross still liquids, and fall as if under the effect of the Feather Fall spell."
				]),
			},
			"grave armor" : {
				name : "Grave Armor",
				source : ["HB", 0],
				description : desc([
					"As an action, I can summon spiked, bone armor. While wearing this armor,",
					"I can add my Charisma modifier to my AC instead of Dexterity. Additionally,",
					"friendly undead within 30 feet of me gain +1 AC."
				]),
				action : ["action", ""],
				extraAC : [{
					name : "Grave Armor (replace Dex)", 
					mod : "Cha", 
					magic : false, 
					text : "I add my Charisma modifier to my AC instead of Dexterity. (Though the Dex. stat still calculates, ignore it when this effect is applied.)",
				}], //Not sure if there's a way to stop the dex calculation for extraac, though I know there is when adding new armor entirely (dex : -10).
			},
			"unholy vigor" : {
				name : "Unholy Vigor",
				source : ["HB", 0],
				description : desc([
					"After finishing a short or long rest, I gain 10 temporary hit points. When rolling",
					"initiative, myself and friendly creatures within 30 feet gain an additional 5",
					"temporary hit points."
				]),
			},
			"aura of the damned" : {
				name : "Aura of the Damned",
				source : ["HB", 0],
				description : desc([
					"The first hostile creature to start its turn or move within 30 feet of me after my",
					"turn in combat must make a Dexterity saving throw or be restrained until the",
					"start of its next turn."
				]),
			},
			"deathwind" : {
				name : "Deathwind",
				source : ["HB", 0],
				description : desc([
					"When myself or a creature within 30 feet of me takes fire, poison, thunder,",
					"necrotic, or cold damage, I can use my reaction to give the creature resistance",
					"to that damage type until the start of my next turn."
				]),
				action : ["reaction", ""]
			},
			"gravemist" : {
				name : "Gravemist",
				source : ["HB", 0],
				description : desc([
					"All physical and ranged attack rolls against myself and allies within 30 feet of me",
					"suffer a -2 penalty."
				]),
			},
		
			//Subclass profanities
			"pale horse" : {
				name : "Pale Horse",
				source : ["HB", 0],
				description : desc([
					"My Necrosteed and friendly mount creatures within 30 feet of me increase their movement speed by 10 feet."
				]),
				prereqeval : function(v) { 
					return classes.known["death knight"].subclass.indexOf("dark cavalier") !== -1 ? true : "skip"; 
				}
			},
			"soulreaver" : {
				name : "Soulreaver",
				source : ["HB", 0],
				description : desc([
					"I can expend a spell slot to gain +1d8 to attack and damage rolls. I also have",
					"+6 to attack and damage rolls against undead creatures."
				]), //there is no duration or action requirement listed in the writeup
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isWeapon) {
								fields.Description += (fields.Description ? '; ' : '') + '+6 against undead: spell slot for +1d8 to both rolls';
							};
						},
						"I can expend a spell slot to gain +1d8 to attack and damage rolls. I also have +6 to attack and damage rolls against undead creatures."
					],
				},
				prereqeval : function(v) { 
					return classes.known["death knight"].subclass.indexOf("unholy death") !== -1 ? true : "skip"; 
				}
			},
			"terrorize" : {
				name : "Terrorize",
				source : ["HB", 0],
				description : desc([
					"I gain advantage on Charisma (Intimidation) checks."
				]),
				advantages : [
					["Intimidation", true],
				],
				prereqeval : function(v) { 
					return classes.known["death knight"].subclass.indexOf("ebony blade") !== -1 ? true : "skip"; 
				}
			},
			"frightening presence" : {
				name : "Frightening Presence",
				source : ["HB", 0],
				description : desc([
					"When frightening a creature within 60 feet, the save 	DC for that creature increases by 2."
				]),
				prereqeval : function(v) { 
					return classes.known["death knight"].subclass.indexOf("ebony blade") !== -1 ? true : "skip"; 
				}
			},
		},
		"unliving" : {
			name : "Unliving",
			source : ["HB", 0],
			minlevel : 6,
			description : desc([
			"I no longer need to eat drink, breath, or sleep, and I gain resistance to necrotic damage.",
			"Additionally, when I would be killed, I instead fall asleep for 7 days, awakening",
			"afterwards as if I had taken a long rest.",
			]),
			dmgres : ["Necrotic"],
		},		
		"death awareness" : {
			name : "Death Awareness",
			source : ["HB", 0],
			minlevel : 7,
			description : desc([
			"As a free action, I can determine whether a creature has less than half or less than",
			"a quarter of its total hit points remaining. I cannot use this feature on constructs.",
			]),
		},
		"bone shield" : {
			name : "Bone Shield",
			source : ["HB", 0],
			minlevel : 7,
			description : desc([
			"As a reaction to taking slashing, bludgeoning, or piercing damage, I can expend a",
			"spell slot to create four bone shields, that each last for 10 minutes or until destroyed.",
			"While I have at least one shield, I have resistance to slashing, bludgeoning, and",
			"piercing damage. Whenever an attack against me deals one of these damage",
			"types, a single bone is destroyed.",
			]),
			action : ["reaction", ""],
			dmgres : ["Slashing (bone shields)", "Piercing (bone shields)", "Bludgeoning (bone shields)"],
		},
		"necro servant" : {
			name : "Necro Servant",
			source : ["HB", 0],
			minlevel : 9,
			description : desc([
			"I gain 60 feet of darkvision, and I can see 120 feet through magical darkness. I also",
			"have advantage on Constitution saving throws against effects that deal necrotic damage.",
			]),
			vision : [["Darkvision", 60], ["See through magic darkness", 120]],
			savetxt : { text : ["Adv. on Con saves vs. necrotic dmg."] },
		},
		"certainty of death" : {
			name : "Certainty of Death",
			source : ["HB", 0],
			minlevel : 11,
			description : desc([
			"After using my Death Awareness feature on a target, I can designate it as a bonus",
			"action. If it's on half health or less, my first attack against it on my turn has advantage,",
			"and critically hits on a roll of 19 or 20 if they have a quarter or less.",
			"I can designate a new target I've used Death Awareness on as a bonus action.",
			]),
			action : ["bonus action", ""],
		},
		"shadow meld" : {
			name : "Shadow Meld",
			source : ["HB", 0],
			minlevel : 11,
			description : desc([
			"In dim light or darkness, I can expend a third level or higher spell slot to teleport",
			"myself and one willing creature to any point in dim light or darkness that I can",
			"see within my Charisma modifier * 10 + 30 feet.",
			]),
			action : ["bonus action", ""],
		},
		"hellfire orb" : {
			name : "Hellfire Orb",
			source : ["HB", 0],
			minlevel : 14,
			description : desc([
			"Once per long rest, I can hurl a ball of fire to a point I can see within 120 feet.",
			"Creatures within a 20 foot radius sphere of that point need to make a Dexterity save.",
			"On a failure, they take 5d6 fire and 5d6 necrotic damage, or half as much on a success.",
			]), //There is no action listed for this in the writeup
			usages: 1,
			recovery : "long rest",
		},
		"avatar of death" : {
			name : "Avatar of Death",
			source : ["HB", 0],
			minlevel : 14,
			description : desc([
			"Once per long rest as a bonus action, I become one size larger, gain immunity to",
			"non-magical weapons and resistance to all damage types, and can have four active",
			"profanities at once, for one minute.",
			"Additionally, hostile creatures that begin their turns or move within 120 feet or me",
			"must make a Wisdom saving throw against my spell save DC, becoming frightened",
			"on a failure. This throw can be repeated on each of their turns. Creatures that fail the",
			"saving throw by five or more have to immediately use their reaction to move 30 feet",
			"away from me. Creatures immune to being frightened roll the saving throw with",
			"advantage. Constructs are immune to this effect.",
			]),
			action : ["bonus action", ""],
			usages: 1,
			recovery : "long rest",
		},
	},
};	

AddSubClass("death knight", "dark riders", { //"Cavaliers", instead of Riders in the writeup, changed to avoid regex conflicts preventing the subclass from appearing
		regExpSearch : /^(?=.*dark)(?=.*riders).*$/i,
		subname : "Order of the Dark Riders",
		source : ["HB", 0],
		fullname : "Dark Riders Death Knight",
		features : {
			"subclassfeature3" : {
				name : "Dark Rider",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"I add my proficiency bonus to all checks related to riding my Necrosteed, and I",
				"can mount or dismount it as a free action. Additionally, I can force attacks",
				"against my mount to target me instead, and while mounted, I roll attacks",
				"against unmounted creatures with advantage.",
				"If my Necrosteed is forced to make a Dexterity saving throw for half damage,",
				"it takes no damage on a success, and half as much on a failure instead.",
				]),
			},		
			"subclassfeature3.1" : {
				name : "Necrosteed",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"As a bonus action, I can summon an undead steed within 5 feet.",
				"Select \"Necrosteed\" on the companion page for its stats and rules.",
				"While mounted, the steed shares the benefits of my profanities. If it dies, I must",
				"complete a long rest or expend a spell slot of 2nd level or higher to summon it again.",
				]),
				action : ["bonus action", " (summon)"],
				creaturesAdd : [["Necrosteed", true]],
				creatureOptions : [{
					name : "Necrosteed",
					source : ["HB", 0],
					size : 2,
					type : "Undead",
					alignment : "Unaligned",
					ac : "11",
					hp : 19,
					hd : [3, 10],
					//hdLinked : ["ranger", "rangerua"],
					minlevelLinked : ["death knight"],
					speed : "40 ft",
					scores : [18, 12, 13, 2, 12, 7],
					passivePerception : 11,
					challengeRating : "1/2",
					proficiencyBonus : 2,
					//proficiencyBonusLinked : true,
					attacksAction : 1,
					attacks : [{
						name : "Hooves",
						ability : 1,
						damage : [2, 6, "bludgeoning"],
						range : "Melee (5 ft)",
						description : "If used after moving 20 ft straight in the same round, see Trampling Charge trait"
					}],
					features : [{
						name : "Warden",
						description : "The Necrosteed is undead, rather than a beast, and has either its regular hit point maximum, or one equal to four times the Death Knight's level, whichever is greater. It takes its turn immediately after that of the Death Knight, on the same initiative. It can move and take reactions on its own, but only takes the Dodge action on its turn unless the Death Knight takes a bonus action to command it to take another action. When commanded to attack, the Necrosteed can use the Death Knight's proficiency bonus instead of its own. \nWhile mounted, the steed shares initiative with the Death Knight, and can only take the Dash, Disengage, or Dodge actions when commanded."
					}],
					traits : [{
						name : "Trampling Charge",
						description : "If the steed moves at least 20 ft straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the steed can make another attack with its hooves against it as a bonus action."
					}, {
						name : "Necrosteed",
						description : "Share the benefits of the Death Knight's profanities while mounted by them."
					}, {
						name : "Coordinated Attack",
						minlevel : 5,
						description : "As a reaction to the Death Knight taking the Attack action, make a melee weapon attack.",
						action : ["reaction", " (after Death Knight attack)"]
					}],
				}]
			},	
			"subclassfeature3.2" : {
				name : "Charge Attack",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"As an action, I charge up to 60 feet towards a creature, forcing them to make a",
				"DC 8 + my proficiency bonus + my Necrosteed's Strength modifier Dexterity",
				"saving throw. On a failure, the target takes 1d6 damage for every 10 feet I",
				"traveled to get to them and is knocked prone, or half as much without being",
				"knocked prone on a success.",
				]),
			},
			"subclassfeature5" : {
				name : "Coordinated Attack",
				source : ["HB", 0],
				minlevel : 5,
				description : desc ([
				"When I take the Attack action, if my Necrosteed can see or hear me, it can make",
				"an attack as a reaction.",
				]),
			},
			"subclassfeature10" : {
				name : "Ebony Instincts",
				source : ["HB", 0],
				minlevel : 10,
				description : desc ([
				"While mounted, I have advantage on initiative rolls. Additionally, I act normally",
				"on the first turn of combat when surprised if I'm mounted and not incapacitated.",
				]),
			},
			"subclassfeature15" : {
				name : "Towering Presence",
				source : ["HB", 0],
				minlevel : 15,
				description : desc ([
				"Once per long rest, each creature of my choice within 60 feet must succeed",
				"on a Wisdom saving throw against my spell save DC, or become frightened",
				"of me for 1 minute.",
				"Creatures can repeat the saving throw at the end of their turns. After succeeding",
				"on the save, or after the effect ends, affected creatures are immune to this",
				"feature for 24 hours."
				]), //No action given on the writeup
				recovery : "long rest",
				usages : 1
			},
			"subclassfeature18" : { 
				name : "Dark Cavalier",
				source : ["HB", 0],
				minlevel : 18,
				description : desc ([
				"When summoning my Necrosteed, I can choose instead summon a",
				"Nightmare or Manticore as my mount instead.",
				]),
			},
		}
	}
);
AddSubClass("death knight", "unholy death", {
		regExpSearch : /^(?=.*unholy)(?=.*death).*$/i,
		subname : "Order of Unholy Death",
		source : ["HB", 0],
		fullname : "Unholy Death Knight",
		features : {
			"subclassfeature3" : {
				name : "Magic Knowledge",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"I learn the Chill Touch cantrip, and I can now prepare Abjuration spells from",
				"the Cleric spell list.",
				]),
				spellcastingBonus : {
					name : "Magic Knowledge (cantrip)",
					spells : ["chill touch"],
					selection : ["chill touch"],
				}, 
				spellcastingExtra : ["ceremony", "protection from evil and good", "sanctuary", "shield of faith", "aid", "lesser restoration", "protection from poison", "warding bond", "beacon of hope", "dispel magic", "glyph of warding", "linked glyphs", "magic circle", "protection from energy", "remove curse", "aura of life", "aura of purity", "banishment", "death ward", "freedom of movement", "dispel evil and good", "greater restoration", "planar binding", "forbiddance", "symbol", "antimagic field", "holy aura"], //all the current abjuration cleric spells (i think). unsure if there's a better way of adding them to the spell list.
				spellcastingExtraApplyNonconform : true,
			},		
			"subclassfeature3.1" : {
				name : "Bound Servant",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"After finishing a short or long rest, I can expend a spell slot to summon a creature",
				"with the game statistics of a skeleton or zombie. It has hit points equal to five times",
				"my level and and Intelligence score of 6.",
				]),
				toNotesPage : {
					name : "Bound Servant: Summons",
					note : [
						"Spell Slot Level \tSummoned Servant"+
						"\n   2nd \t\tTwo Skeletons or Zombies"+
						"\n   3rd \t\tOne Shadow"+
						"\n   4th \t\tTwo Shadows and one Specter or Ghoul"+
						"\n   5th \t\tTwo Specters or Ghouls and one Will-O'-Wisp or Ghast"
					]
				},
			},	
			"subclassfeature5" : {
				name : "Rune Magic",
				source : ["HB", 0],
				minlevel : 5,
				description : desc ([
				"Once per long rest, I can recover a number of spell slots equal to the number",
				"of runes on my Rune Weapon.",
				"Additionally, when I reduce a creature to 0 hit points, I can immediately use a",
				"spell slot to summon it as a Bound Servant.",
				]),
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature10" : {
				name : "Death's Sight",
				source : ["HB", 0],
				minlevel : 10,
				description : desc ([
				"I don't have disadvantage when attacking invisible creatures, and I can sense the",
				"location of any invisible or non-magically hidden creature (constructs excluded)",
				"within 30 feet. I am immune to being frightened."
				]),
				savetxt : { immune : ["frightened"] },
				senses : "Invisible/Hidden creas. 30 ft",
			},
			"subclassfeature15" : {
				name : "Wraithshift",
				source : ["HB", 0],
				minlevel : 15,
				description : desc ([
				"In dim light/darkness, I have 60 feet of flying speed, and advantage on Dexterity",
				"(Stealth) checks."
				]),
			},
			"subclassfeature18" : {
				name : "Master of the Chain",
				source : ["HB", 0],
				minlevel : 18,
				description : desc ([
				"Once per long rest, when a creature within 30 feet is reduced to 0 HP, I can force",
				"it to succeed on a Wisdom saving throw against my Spell Save DC. On a failure,",
				"it returns from death for 10 minutes with full hit points, and acts as if it were under the",
				"Dominate Monster spell, before dying again.",
				]),
				usages : 1,
				recovery : "long rest"
			},
		}
	}
);
AddSubClass("death knight", "ebony blades", {
		regExpSearch : /^(?=.*ebony)(?=.*blades).*$/i,
		subname : "Order of the Ebony Blades",
		source : ["HB", 0],
		fullname : "Ebony Blades Death Knight",
		abilitySave : 6,
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"subclassfeature3" : {
				name : "Necro Wind",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"Once per short or long rest as a bonus action, I regain 1d8 + my Constitution",
				"modifier + my level hit points. I also regain a 1st level spell slot (2nd at 18 level)",
				"that disappears if not used within 10 minutes",
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""],
				additional : levels.map(function (n) { 
					return "1d8 + " + "Con. mod. + " + n + "HP, regain " + (n < 18 ? "1st lvl. spell slot" : "2nd lvl. spell slot");
				}),
			},		
			"subclassfeature3.1" : {
				name : "Overwhelming Strength",
				source : ["HB", 0],
				minlevel : 3,
				description : desc ([
				"While wearing medium or heavy armor, I can use my reaction to reduce damage",
				"I take by 1d10 + my Charisma modifier.",
				"Additionally, I can add my Charisma modifier as a bonus to all Strength checks."
				]),
			},	
			"subclassfeature10" : {
				name : "Relentless Fortitude",
				source : ["HB", 0],
				minlevel : 10,
				description : desc ([
				"Once per long rest, I gain advantage on a saving throw of my choice.",
				"I am also immune to being frightened."
				]),
				savetxt : { immune : ["frightened"] },
				usages : 1,
				recovery : "long rest",
				limfeaname : "Relentless Fortitude (save adv.)",
			},
			"subclassfeature10.1" : {
				name : "Unholy Weapon Flourish",
				source : ["HB", 0],
				minlevel : 10,
				description : desc ([
				"Three times per long rest, I add twice my proficiency bonus to and attack roll",
				"with my Rune Weapon"
				]),
				usages : 3,
				recovery : "long rest",
				limfeaname : "Unholy Weapon Flourish (Prof. x2 to atk. roll)",
			},
			"subclassfeature15" : {
				name : "Certainty of Death",
				source : ["HB", 0],
				minlevel : 15,
				description : desc ([
				"My Rune Weapon critically hits on a roll of 19 or 20, and I roll an additional",
				"damage die when determining its damage on a critical hit."
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/\brune\b/i).test(v.WeaponTextName)) {
								fields.Description += (fields.Description ? '; ' : '') + 'Crit. on 19 or 20';
							};
						},
						"My Rune Weapon critically hits on a roll of 19 or 20, and I roll an additional damage die when determining its damage on a critical hit."
					],
				},
			},
			"subclassfeature18" : {
				name : "Obliterate",
				source : ["HB", 0],
				minlevel : 18,
				description : desc ([
				"As part of an attack, I can expend a 2nd level or higher spell slot, and until the",
				"end of my turn, my Rune Weapon does an extra 2d8+1d8/SL necrotic damage on hit.",
				]),
				usages : 1,
				recovery : "long rest"
			},
		}
	}
);

SpellsList["necro blast"] = {
	name : "Necro Blast",
	classes : ["death knight"],
	source : ["HB", 0],
	level : 0,
	school : "Necro",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "Ranged spell atk. for 1d8+1d8/CL necrotic dmg., +1d4+1d4/CL necrotic dmg. if target has temp. HP",
	descriptionFull : "A beam of necrotic energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d8 necrotic damage. This spell deals an additional 1d4 necrotic damage if the target has any temporary hit points." + AtHigherLevels + "This spell's damage increases by one die when you reach 5th level (2d8 or 2d4), 11th level (3d8 or 3d4), and 17th level (4d8 or 4d4)."
};
WeaponsList["necro blast"] = {
	regExpSearch : /^(?=.*necro)(?=.*blast).*$/i,
	name : "Necro Blast",
	source : ["HB", 0],
	list : "Spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 8, "Necrotic"],
	range : "120 ft",
	description : "+1d4+1d4/CL necrotic dmg. if target has temp. HP",
	abilitytodamage : false
};