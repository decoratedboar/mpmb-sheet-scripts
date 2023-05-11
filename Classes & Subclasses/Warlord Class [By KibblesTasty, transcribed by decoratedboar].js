/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the War Lord class, a homebrew creation by KibblesTasty.
				Their content can be downloaded at https://www.kthomebrew.com/
	Code by:	u/decoratedblood (decoratedboar)
	Date:		09-03-2023 (sheet v13)
*/

var iFileName = "War Lord Class [By KibblesTasty, transcribed by decoratedboar].js";

RequiredSheetVersion("13.0.0");

SourceList["KT:WL"] = {
	name : "War Lord (KibblesTasty)",
	abbreviation : "KT:WL",
	group : "KibblesTasty",
	url : "https://www.kthomebrew.com/",
	date : "20/12/2022"
};

ClassList["war lord"] = {
	name : "War Lord",
	regExpSearch : /^(?=.*war)(?=.*lord).*$/i, //for the purposes of regex, the name is broken up into two words, otherwise it wouldn't show up since the sheet looks for certain ranger, paladin, and fighter subclasses that contain "warlord" as part of their regExpSearch parameter.
	source : ["KT:WL", 1],
	primaryAbility : "",
	prereqs : "13 in two of Intelligence, Wisdom, or Charisma",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6],
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	saves : ["Wis", "Cha"],
	skills : ["\n\n" + toUni("MyClass") + ": Choose three from Athletics, Deception, History, Insight, Intimidation, Investigation, Medicine, Performance, and Persuasion.", "\n\n" + toUni("MyClass") + ""], //Proficiencies when this class is taken as a multiclass aren't specified anywhere I can see in the write up
	
	armor : [
		[true, true, false, false],
		[true, true, false, false]
	],
	
	weapons : [
		[true, false]
		[false, false]
	],
	
	
	equipment : "MyClass starting equipment:" +
	"\n \u2022 A simple melee weapon -or- a martial weapon (if proficient);" +
	"\n \u2022 A light crossbow and 20 bolts -or- a shield (if proficient);" +
	"\n \u2022 Leather armour -or- scale mail -or- chain mail (if proficient);" +
	"\n \u2022 A scholar's pack -or- an explorer's pack." +
	"\n \nAlternatively, you may start with 5d4 \xD7 10 gp to buy your own equipment.",

	subclasses : ["War Lord Presences", ["commander", "chieftain", "noble", "packleader", "paragon", "tactician" ]], 
	features : {
		"subclassfeature1" : {
			name : "War Lord Presence",
			source : ["KT:Wl", 3],
			minlevel : 1,
			description : desc ([
			"Choose your War Lord Presence to put in the 'Class' field.",
			])
		},
		"battlefield presence" : {
			name : "Battlefield Presence",
			source : ["KT:Wl", 3],
			minlevel : 1,
			description : desc ([
			"When I take the Attack action, instead of attacking I can grant a friendly creature that can",
			"see or hear me an additional attack when they next take the Attack action.",
			"The additional attack is lost if not used before the start of my next turn, and creatures can",
			"only gain one extra attack per round from this feature."
			]),
		},		
		"leadership dice" : {
			name : "Leadership Dice",
			source : ["KT:Wl", 3],
			minlevel : 2,
			description : desc ([
			"I gain access to Leadership Dice, which I can expend to fuel certain actions: Rallying Mark,",
			"Urgent Orders, and Helpful Word. (see page three notes for full descriptions)",
			"I can spend a limited number of Leadership Dice per turn based on my level, and I regain all",
			"expended Dice when I finish a short or long rest.",
			]),
			additional : levels.map(function (n) {
				return "d" + (n < 9 ? 6 : n < 13 ? 8 : n < 17 ? 10 : 12) + ", max use of "+ (n < 6 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + " per turn";
			}),
			usages : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			recovery : "short rest",
			
			"rallying mark" : {
				name : "Rallying Mark",
				extraname: "Leadership Dice Action",
				source : ["KT:Wl", 3],
				minlevel : 2,
				description : desc ([
				"As a bonus action, I expend a number of Leadership Dice up to my limit and designate a",
				"hostile creature within 60 feet. Before the start of my next turn, the next time damage is rolled",
				"against the designated creature, they add my expended Leadership Dice to their attack roll,",
				" and regain hit points equal to the total rolled on them.",
				]),
				action : ["bonus action", ""]
			},
			"urgent orders" : {
				name : "Urgent Orders",
				extraname: "Leadership Dice Action",
				source : ["KT:Wl", 3],
				minlevel : 2,
				description : desc ([
				"As a bonus action, I expend a number of Leadership Dice up to my limit and target an allied",
				"creature within 60 feet that can see or hear me. This creature can immediately move up to its",
				"movement speed (or 30 feet, whichever is lower) as a reaction without provoking opportunity",
				"attacks. Roll the expended Leadership Dice; the targeted ally gains temporary hit points equal",
				"to the roll.",
				]),
				action : ["bonus action", ""]
			},
			"helpful word" : {
				name : "Helpful Word",
				extraname: "Leadership Dice Action",
				source : ["KT:Wl", 3],
				minlevel : 2,
				description : desc ([
				"As a bonus action, I expend a single Leadership Die to take the Help action. When I use the",
				"Help action to aid an ally that can see or hear me in making an attack, the target of the attack",
				"can be within 30 feet of me, rather than 5 feet.",
				]),
				action : ["bonus action", ""]
			},
			
			autoSelectExtrachoices : [{
				extrachoice : 'rallying mark',
				minlevel : 2,
			}, {
				extrachoice : 'urgent orders',
				minlevel : 2,
			}, {
				extrachoice : 'helpful word',
				minlevel : 2,
			}]
		},			
		"war lord's expertise" : {
			name : "War Lord's Expertise",
			source : ["KT:Wl", 3],
			minlevel : 3,
			description : desc([
			"I choose a skill out of Investigation, Insight, Intimidation, or Persuasion. I become proficient",
			"in that skill, or gain expertise if I am already proficient.",
			]),
			skillstxt : "Choose one from Investigation, Insight, Intimidation, or Persuasion. Gain expertise if already proficient in the chosen skill",
		},
		"prepare for battle" : {
			name : "Prepare For Battle",
			source : ["KT:Wl", 4],
			minlevel : 6,
			description : desc ([
			"I can spend a minute to prepare up to five allies for combat, rolling a number of Leadership",
			"Dice up to my turn limit, and giving my chosen allies temporary hit points equal to the roll's",
			"total. During a short rest, allies can also freely expend a number of hit dice equal to the",
			"amount of Leadership Dice I rolled.",
			"Temporary hit points gained from this feature last until the end of the next short or long rest",
			"after gaining them, and Leadership Dice used are expended as normal.",
			]),
		},
		"press the attack" : {
			name : "Press The Attack",
			source : ["KT:Wl", 4],
			minlevel : 9,
			description : desc([
			"My Leadership Dice abilities are further empowered. See the page three notes for new effects.",
			]),
			toNotesPage : [{
				name : "Rallying Mark: Boost Morale",
				note : [
				"When a creature gains hit points from Rallying Mark, you can expend one Leadership die to",
				"cause another creature within 30 feet to regain the same number of hit points.",
				],
				page3notes : true,
			}, {
				name : "Urgent Orders: Coordinated Movements",
				note : [
				"When you use Urgent Orders, you can target a number of creatures equal to the number of",
				"Leadership Dice spent, spending dice on each target individually.",
				],
				page3notes : true,

			}, {
				name : "Helpful Word: Expert Instructions",
				note : [
				"When a creature benefits from your Help action, you can use your reaction to expend a",
				"Leadership Die and add it to their roll. You can use this ability after the original roll, but",
				"before the outcome is revealed.",
				],
				page3notes : true,
			}]
		},
		"war lord's intuition" : {
			name : "War Lord's Intuition",
			source : ["KT:Wl", 4],
			minlevel : 13,
			description : desc([
			"Once per long rest, when making an ability check I'm proficient in, I can use my Warlord level",
			"as the base roll instead of rolling the d20.",
			]),
			usages : 1,
			recovery : "long rest",
		},
		"shift the field" : {
			name : "Shift The Field",
			source : ["KT:Wl", 4],
			minlevel : 14,
			description : desc([
			"As an action, I can expend one Leadership Die to move up to five friendly creatures that can",
			"see or hear me up to half of their movement speed each without provoking opportunity",
			"attacks.",
			]),
			action : [["action", " [1 Leadership Die]"]],
		},		
		"unbreakable will" : {
			name : "Unbreakable Will",
			source : ["KT:Wl", 4],
			minlevel : 17,
			description : desc([
			"I am immune to the Frightened and Charmed conditions.",
			]),
		},
		"tireless leader" : {
			name : "Tireless Leader",
			source : ["KT:Wl", 4],
			minlevel : 20,
			description : desc([
			"When using my Leadership Dice features (Rallying Mark, Urgent Orders, Helpful Word), or the",
			"Prepare For Battle feature, I can choose to roll d4s in place of expending Leadership Dice.",
			]),
		},
	},
};	

AddSubClass("war lord", "commander's presence", {
		regExpSearch : /^(?=.*war)(?=.*lord)(?=.*commander).*$/i,
		subname : "Commander",
		source : ["KT:WL", 4],
		fullname : "War Lord Commander",
		//attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],		
		features : {
			"subclassfeature1" : {
				name : "Martial Proficiency",
				source : ["KT:WL", 4],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in heavy armour, shields, and martial weapons.",
				]),
				armorProfs : [false, false, true, true],
				weaponProfs : [false, true]
			},		
			"subclassfeature1.1" : {
				name : "Form Up!",
				source : ["KT:WL", 4],
				minlevel : 1,
				description : desc ([
				"When I roll initiative and am not surprised, any number of friendly creatures within 30 feet of",
				"me can move up to five times my Wisdom modifiers feet (minimum of five feet).",
				]),
			},	
			"subclassfeature3" : {
				name : "Keen Pointer",
				source : ["KT:WL", 4],
				minlevel : 3,
				description : desc ([
				"I can use my Helpful Word bonus action without expending a Leadership Die if I am within five",
				"feet of the creature I'm Helping. I can, however, choose to expend a Leadership Die to apply",
				"my Rallying Mark to the creature.",
				]),
			},
			"subclassfeature7" : {
				name : "On Your Feet!",
				source : ["KT:WL", 5],
				minlevel : 7,
				description : desc ([
				"As a bonus action, I can expend one Leadership Die and pick an allied creature within five feet.",
				"They regain hit points equal to the Die roll. If the creature has zero hit points before I use this",
				"feature, I add my Wisdom modifier to the amount they regain. Prone creatures can also",
				"choose to stand up immediately.",
				]),
				action : ["bonus action", " [1 Leadership Die]"]
			},
			"subclassfeature11" : {
				name : "Martial Advantage",
				source : ["KT:WL", 5],
				minlevel : 11,
				description : desc ([
				"Once per turn, I can deal an extra 2d6 damage to a creature I hit with a weapon attack if it's",
				"within five feet of an ally that isn't incapacitated.",
				]),
			},
			"subclassfeature15" : {
				name : "Bulwark",
				source : ["KT:WL", 5],
				minlevel : 15,
				description : desc ([
				"When I and any number of friendly creatures within 30 feet of me make a Saving Throw",
				"against the same effect, my allies gain advantage on the Throw if I succeed on it.",
				]),
			},
			"subclassfeature18" : {
				name : "No One Left Behind!",
				source : ["KT:WL", 5],
				minlevel : 18,
				description : desc ([
				"While using the On Your Feet feature, I can move up to my movement speed to get within five",
				"feet of a creature.  While moving, I gain resistance to all damage, and my target regains an",
				"additional 1d8 hit points for every opportunity attack made against me.",
				]),
			},
		}
	}
);
AddSubClass("war lord", "chieftain's presence", {
		regExpSearch : /^(?=.*war)(?=.*lord)(?=.*chieftain).*$/i,
		subname : "Chieftain",
		source : ["KT:WL", 5],
		fullname : "War Lord Chieftain",
		features : {
			"subclassfeature1" : {
				name : "Chieftain's Proficiency",
				source : ["KT:WL", 5],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in shields and martial weapons, and in Charisma (Intimidation) or a skill of",
				"my choice if I'm already proficient.",
				]),
				armorProfs : [false, false, false, true],
				weaponProfs : [false, true],
				skillstxt : "Intimidation, or one of my choice if I'm already proficient.",
				skills : ["Intimidation"],

			},		
			"subclassfeature1.1" : {
				name : "Wolfpack Movement",
				source : ["KT:WL", 5],
				minlevel : 1,
				description : desc ([
				"On my first turn in combat, if I move I can pull a number of willing creatures equal to my",
				"Charisma modifier within 20 feet of me along with me. Affected creatures move the same",
				"distance and direction as me, but cannot exceed their own movement speed. They can stop",
				"the movement at any point.",
				]),
			},	
			"subclassfeature3" : {
				name : "Warcry",
				source : ["KT:WL", 5],
				minlevel : 3,
				description : desc ([
				"As an action, or in the place of an attack as part of the Attack action, I can expend a number",
				"of Leadership Dice up to my per turn limit, granting myself and a number of friendly creatures",
				"up to 1 + my Charisma modifier within 20 feet temporary hit points equal to the Dice roll +",
				"my Charisma modifier.",
				]),
				action : ["action", " [Or in place of an attack]"],
			},
			"subclassfeature3.1" : {
				name : "Savage Momentum",
				source : ["KT:WL", 5],
				minlevel : 3,
				description : desc ([
				"Whenever I spend a Leadership Die, I gain advantage my my next attack before the end of my",
				"next turn.",
				]),
			},
			"subclassfeature7" : {
				name : "Reckless Assault",
				source : ["KT:WL", 5],
				minlevel : 7,
				description : desc ([
				"When a creature with temporary hit points from one of my abilities deals damage, they can",
				"deal extra damage equal to half of those hit points by fully expending them.",
				]),
			},
			"subclassfeature11" : {
				name : "Wolfpack Tactics",
				source : ["KT:WL", 5],
				minlevel : 11,
				description : desc ([
				"The first creature I hit with an attack that has taken damage from an ally since the end of my",
				"last turn takes an additional 1d12 damage. Friendly creatures I affect with my Battlefield",
				"Presence feature deal 1d4 extra damage with their extra attack to an enemy that I dealt",
				"damage to on my turn.",
				]),
			},
			"subclassfeature15" : {
				name : "Booming Shout",
				source : ["KT:WL", 6],
				minlevel : 15,
				description : desc ([
				"Once per short or long rest, when I use the Warcry feature, I can make any number of",
				"creatures of my choice within range make a Wisdom saving throw (DC 8 + Charisma modifier",
				"+ Proficiency Bonus). On a failure, they are frightened of me until the end of their next turn.",
				"Additionally, the ranges of my Rallying Mark, Urgent Orders, Helpful Word, and Warcry",
				"features are doubled.",
				]),
				usages : 1,
				recovery : "short rest",
			},
			"subclassfeature18" : {
				name : "Bloody Victory",
				source : ["KT:WL", 5],
				minlevel : 18,
				description : desc ([
				"When a hostile creature that has dealt damage to me is reduced to zero hit points by myself",
				"or an ally, I can use my Warcry feature as a reaction. I do not use any Leadership Dice in doing",
				"so, instead using a d12. I can use this feature a number of times equal to my Charisma",
				"modifier per long rest.",
				]),
				action : ["reaction", " (When enemy that hit me < 0 HP)"],
				usagescalc : "event.value = What('Cha Mod');",
				recovery : "long rest",
			},
		}
	}
);
AddSubClass("war lord", "noble's presence", {
		regExpSearch : /^(?=.*war)(?=.*lord)(?=.*noble).*$/i,
		subname : "Noble",
		source : ["KT:WL", 6],
		fullname : "War Lord Noble",
		abilitySave : 6,
		features : {
			"subclassfeature1" : {
				name : "Destined Leader",
				source : ["KT:WL", 6],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in rapiers and longswords, and in Charisma (Persuasion) or a skill of my",
				"choice if I'm already proficient.",
				"I also gain an additional Leadership Die at 3rd, 9th, and 15th levels.",
				]),
				weaponProfs : [false, false, ["rapier", "longsword"]],
				skillstxt : "Persuasion, or one of my choice if I'm already proficient.",
				skills : ["Persuasion"],
				limfeaname : "Leadership Dice",
				limfeaAddToExisting : true,
				usages : [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
				recovery : "short rest",
			},		
			"subclassfeature1.1" : {
				name : "Call to Arms",
				source : ["KT:WL", 6],
				minlevel : 1,
				description : desc ([
				"When I roll initiative, I grant friendly creatures within 60 feet a bonus to their first attack roll,",
				"equal to my Charisma modifier, before the end of their turn.",
				]),
			},
			"subclassfeature1.2" : {
				name : "Inspiring Leader",
				source : ["KT:WL", 6],
				minlevel : 1,
				description : desc ([
				"When I grant a creature with a CR of less than half my War Lord level (or with fewer class",
				"levels than I have War Lord levels) an extra attack with the Battlefield Presence feature, they",
				"can choose to use my Proficiency bonus and Charisma modifier on first attack roll they make",
				"on their next turn.",
				]),
				additional : levels.map(function (n) {
					return "Crea. with " + (n/2) + " CR, or <" + n +" class levels";
				}),
			},			
			"subclassfeature3" : {
				name : "Divine Right",
				source : ["KT:WL", 5],
				minlevel : 3,
				description : desc ([
				"I can use an amount of Leadership Dice up to my turn limit to cast the Command spell, with",
				"the spell's level equal to the amount of dice spent.",
				"Additionally, I can add my Charisma modifier (2 max) to my AC when I'm not wearing heavy",
				"armour or using a shield.",
				]),
				spellcastingBonus : {
					name : "Divine Right",
					spells : ["command"],
					selection : ["command"],
					firstCol : "LD"
				},
				extraAC : [{
					name : "Divine Right", 
					mod : "min(Cha|2)", 
					magic : false, 
					text : "While not wearing heavy armour or using a shield, I add my Charisma modifier to my AC (2 max).",
					stopeval : function (v) { 
						return (v.heavyArmor || v.usingShield);
					}
				}], //Adds either Cha to the AC, or 2, whichever is lowest. Doesn't add the modifier if heavy armour or a shield are in use.
			},
			"subclassfeature3.1" : {
				name : "Charismatic Leadership",
				source : ["KT:WL", 6],
				minlevel : 3,
				description : desc ([
				"I can add my Charisma bonus to the damage bonus granted by my Rallying Mark feature, the",
				"temporary hit points granted by my Urgent Orders feature, and the attack roll of a creature",
				"that gains advantage from my Helpful Word feature.",
				]),
			},
			"subclassfeature7" : {
				name : "Words of Conviction",
				source : ["KT:WL", 7],
				minlevel : 7,
				description : desc ([
				"I can use an amount of Leadership Dice up to my turn limit to cast the Bless or Heroism spells",
				"without material components, with the spell's level equal to the amount of dice spent.",
				]),
				spellcastingBonus : [{
					name : "Words of Conviction (Bless)",
					spells : ["bless"],
					selection : ["bless"],
					firstCol : 'LD'
				}, {
					name : "Words of Conviction (Heroism)",
					spells : ["heroism"],
					selection : ["heroism"],
					firstCol : 'LD'
				}],
				spellChanges : {
					"bless" : {
						components : "V,S",
						compMaterial : "",
						changes : "Using my Words of Conviction feature, I can cast this spell using my leadership dice, without material components."
					},
				}, //This only changes the material component for this feature's spell, meaning if the character gets the Bless spell from elsewhere as well as this feature, it will function as normal on the sheet.
			},
			"subclassfeature7.1" : {
				name : "Imperative Order",
				source : ["KT:WL", 7],
				minlevel : 7,
				description : desc ([
				"When I spend two or more Leadership Dice to use my Urgent Orders feature on a creature, it",
				"can make a single weapon attack with their reaction instead of moving.",
				"If I spend three or more Dice, it can both move and make an attack with its reaction.",
				]),
			},
			"subclassfeature11" : {
				name : "Inspired Zeal",
				source : ["KT:WL", 7],
				minlevel : 11,
				description : desc ([
				"All creatures of my choice within 30 feet of me deal an additional 1d4 radiant damage when",
				"they hit with a weapon attack.",
				]),
			},
			"subclassfeature15" : {
				name : "Untouchable Presence",
				source : ["KT:WL", 7],
				minlevel : 15,
				description : desc ([
				"I am constantly under the effect of the Sanctuary spell. It ends as normal if I take an action",
				"that would break it, but it returns at the start of my next turn.",
				]),
			},
			"subclassfeature18" : {
				name : "Grand Decree",
				source : ["KT:WL", 7],
				minlevel : 18,
				description : desc ([
				"Once per long rest, I can cast the Command spell without expending any of my Leadership",
				"Dice or spell slots.",
				]),
				limfeaname : "Command",
				usages : 1,
				recovery : "long rest", //Adds the Command spell to the limited features, since there is already an entry on the spell sheet from the Divine Right feature.
			},
		}
	}
);
AddSubClass("war lord", "packleader's presence", {
		regExpSearch : /^(?=.*war)(?=.*lord)(?=.*packleader).*$/i,
		subname : "Packleader",
		source : ["KT:WL", 7],
		fullname : "War Lord Packleader",
		abilitySave : 5,
		features : {
			"subclassfeature1" : {
				name : "Tools of the Wild",
				source : ["KT:WL", 7],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in martial weapons, and my choice of either the Herbalism Kit or the",
				"Poisoner's Kit. I also gain proficiency in Wisdom(Survival) or a skill of my choice if I'm already",
				"proficient.",
				]),
				weaponProfs : [false, true],
				skillstxt : "Survival, or one of my choice if I'm already proficient.",
				toolProfs : [["Herbalism Kit or Poisoner's Kit", 1]],
			},		
			"subclassfeature1.1" : {
				name : "Concealed Approach",
				source : ["KT:WL", 7],
				minlevel : 1,
				description : desc ([
				"If I spend at least a minute preparing, I can add my Wisdom modifier to Dexterity (Stealth)",
				"checks made by myself and up to five friendly creatures. While hidden, myself and friendly",
				"creatures within 30 feet can add my Wisdom modifier to our initiative roll.",
				]),
			},
			"subclassfeature3" : {
				name : "Nature's Gift",
				source : ["KT:WL", 7],
				minlevel : 3,
				description : desc ([
				"I learn the Mold Earth cantrip, and can pick one additional cantrip from the Druid spell list.",
				"Additionally, I can expend one Leadership Die to cast Fog Cloud or Snare as 1st levels",
				"spells, as well as one additional 1st level spell of my choice from the Druid spell list. Snare is",
				"cast with 1 action when using this feature.",
				]),
				spellcastingBonus : [{
					name : "Nature's Gift (Mold Earth)",
					spells : ["mold earth"],
					selection : ["mold earth"],
				}, {
					name : "Nature's Gift (Extra Cantrip)",
					"class" : ["druid"],
					level : [0, 0],
				}, {
					name : "Nature's Gift (Fog Cloud, Snare)",
					spells : ["fog cloud", "snare"],
					selection : ["fog cloud", "snare"],
					firstCol : "LD",
					level : [1, 1],
					times : 2,
				}, {	
					name : "Nature's Gift (extra 1st level spell)",
					"class" : ["druid"],
					level : [1, 1],
					firstCol : "LD"
				}],
				spellChanges : {
					"snare" : {
						time : "1 a", 
						changes : "I can cast snare as an action with my Nature's Gift feature."
					},
				},
			},
			"subclassfeature7" : {
				name : "Shroud of Nature",
				source : ["KT:WL", 7],
				minlevel : 7,
				description : desc ([
				"Whenever I cast a spell that would obscure myself or a friendly creature, the obscured",
				"creature can use their reaction to take the Hide action.",
				]),
				limfeaname : "Hide",
				action : ["reaction", " (after being obscured by spell)"]
			},
			"subclassfeature7.1" : {
				name : "Trackless Trails",
				source : ["KT:WL", 8],
				minlevel : 7,
				description : desc ([
				"I can spend two Leadership Dice to cast the Pass Without Trace spell without providing",
				"material components.",
				]),
				spellcastingBonus : {
					name : "Trackless Trails",
					spells : ["pass without trace"],
					selection : ["pass without trace"],
					firstCol : 'LD'
				},
				spellChanges : {
					"pass without trace" : {
						components : "V,S",
						compMaterial : "",
						changes : "Using my Trackless Trails feature, I can cast this spell using my leadership dice, without material components."
					},
				},
			},
			"subclassfeature11" : {
				name : "Fleeting Strikers",
				source : ["KT:WL", 8],
				minlevel : 11,
				description : desc ([
				"If I'm in a different spot to the one I was in on my last turn, or if I'm obscured from my target,",
				"the first attack I make during my turn deals an additional 1d10 damage.",
				"Additionally, creatures I grant an extra attack to using Battlefield Presence can take the Dash",
				"action instead of using that attack.",
				]),
			},
			"subclassfeature15" : {
				name : "Ghosts of the Wild",
				source : ["KT:WL", 8],
				minlevel : 15,
				description : desc ([
				"While under the effect of the Pass Without Trace spell, I can spend one Leadership Die to Hide",
				"as a free action at the end of my turn.",
				"When I grant a creature an extra attack with Battlefield Presence feature, I can expend a",
				"Leadership Die to grant them advantage on the first attack they make before the start of my",
				"next turn. I can do this without expending a Die if the creature is under the effect of the Pass",
				"Without Trace spell.",
				]),
			},
			"subclassfeature18" : {
				name : "Warlord of the Wilds",
				source : ["KT:WL", 8],
				minlevel : 18,
				description : desc ([
				"I pick five additional spells from the Druid spell list, which I can cast with a number of",
				"Leadership Dice equal to the spell level. I can change my selected spells at the end of a long",
				"rest. Whenever I cast a spell using Leadership Dice, I can make one weapon attack as a",
				"bonus action.",
				]),
				limfeaname : "Attack",
				action : ["bonus action", " (after casting spell with LD)"],
				spellcastingBonus : {	
					name : "Warlord of the Wilds",
					"class" : ["druid"],
					level : [1, 4],
					firstCol : "LD",
					times : 5,
				}
			},
		}
	}
);
AddSubClass("war lord", "paragon's presence", {
		regExpSearch : /^(?=.*war)(?=.*lord)(?=.*paragon).*$/i,
		subname : "Paragon",
		source : ["KT:WL", 8],
		fullname : "War Lord Paragon",
		//abilitySave : 5,
		features : {
			"subclassfeature1" : {
				name : "Martial Proficiency",
				source : ["KT:WL", 8],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in heavy armour, shields, and martial weapons.",
				]),
				armorProfs : [false, false, true, true],
				weaponProfs : [false, true]
			},		
			"subclassfeature1.1" : {
				name : "Lead The Charge",
				source : ["KT:WL", 8],
				minlevel : 1,
				description : desc ([
				"I can add my Charisma modifier to my initiative rolls. Additionally, when rolling initiative, I",
				"gain temporary hit points equal to my Charisma modifier + my Proficiency Bonus.",
				]),
				addMod : {type : "skill", field : "Init", mod : "Cha", text : "I add my Charisma modifier to my initiative rolls."},
			},
			"subclassfeature3" : {
				name : "Fighting Style",
				source : ["KT:WL", 8],
				minlevel : 3,
				description : desc ([
				"Use the \"Choose Feature\" button above to select a fighting style.",
				]),
				choices : ["Defense", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"],
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"great weapon fighting" : FightingStyles.great_weapon,
				"two-weapon fighting" : FightingStyles.two_weapon
			},//This just calls the fighting styles added by the SRD script (I think, it works in any case so eh lmao)
			"subclassfeature3.1" : {
				name : "Heroic Strike",
				source : ["KT:WL", 9],
				minlevel : 3,
				description : desc ([
				"Once per turn whenever I take the Attack action, I can expend Leadership Dice up to my turn",
				"limit to apply Rallying Mark to a melee weapon attack.",
				"Additionally, whenever I expend Leadership Dice as part of an attack, I can add the expended",
				"Leadership Dice to the damage roll of that attack.",
				]),
			},
			"subclassfeature7" : {
				name : "Stand Defiant",
				source : ["KT:WL", 9],
				minlevel : 7,
				description : desc ([
				"Once per short or long rest, when I am reduced to 0 hit points, I instantly regain hit points",
				"equal to my Charisma modifier (minimum of one). I can roll a number of Leadership Dice",
				"equal to the number of friendly creatures within 60 feet of me, regaining additional hit points",
				"equal to the roll.",
				]),
				usages : 1,
				recovery : "short rest",
			},
			"subclassfeature11" : {
				name : "Inspired Warrior",
				source : ["KT:WL", 9],
				minlevel : 11,
				description : desc ([
				"Once per turn when an ally within 30 feet of me takes or deals damage, I gain a d4. I can have",
				"a maximum number of d4 dice equal to my Charisma modifier (minimum of one), and can",
				"expend any number of them when dealing damage to gain bonus damage equal to the roll.",
				]), //Can't really add a limited feature for this unfortunately.
			},
			"subclassfeature15" : {
				name : "Dauntless Resolve",
				source : ["KT:WL", 9],
				minlevel : 15,
				description : desc ([
				"Once per long rest, when I fail a saving throw, I can choose to succeed instead.",
				]),
				usages : 1,
				recovery : "long rest",
			},
			"subclassfeature18" : {
				name : "Invincible Legion",
				source : ["KT:WL", 9],
				minlevel : 18,
				description : desc ([
				"When a friendly creature within 60 feet of me drops to 0 hit points, they can instead drop to",
				"one hit point if they can see or hear me. Creatures can benefit from this once per long rest.",
				]),
				additional : "1 x per long rest per crea.",
			},
		}
	}
);
AddSubClass("war lord", "tactician's presence", {
		regExpSearch : /^(?=.*war)(?=.*lord)(?=.*tactician).*$/i,
		subname : "Tactician",
		source : ["KT:WL", 9],
		fullname : "War Lord Tactician",
		//abilitySave : 5,
		features : {
			"subclassfeature1" : {
				name : "Tactician's Cunning",
				source : ["KT:WL", 9],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in Intelligence (History) and Intelligence (Investigation), or other skills of my",
				"choice if I'm already proficient.",
				"Additionally, I treat rolls of four or lower on the d20 as a five when taking a minute or more to",
				"make a skill check.",
				]),
				skillstxt : "History and Investigation, or my choice if I'm already proficient.",
				skills : [["History"], ["Investigation"]],
			},		
			"subclassfeature1.1" : {
				name : "Battle Plans",
				source : ["KT:WL", 9],
				minlevel : 1,
				description : desc ([
				"I can add my Intelligence modifier to my initiative rolls. Additionally, I can exchange my",
				"initiative roll with a friendly creature within 60 feet after rolling.",
				]),
				addMod : {type : "skill", field : "Init", mod : "Int", text : "I add my Intelligence modifier to my initiative rolls."},
			},
			"subclassfeature3" : {
				name : "Tactical Insight",
				source : ["KT:WL", 9],
				minlevel : 3,
				description : desc ([
				"As a bonus action, I can make an Intelligence (Investigation) check contested by a Charisma",
				"(Deception) check against a creature I can see within 60 feet. If I succeed on the check I gain",
				"one of the following benefits:",
				"\u2022 Determine Attack: the target has disadvantage on their next attack against a creature I can",
				"see or hear.",
				"\u2022 Predict Movement: The target's speed is reduced by ten feet next time they move.",
				"\u2022 Outwit Response: The target can't take a reaction until the end of their next turn.",
				"\u2022 Expose Weakness: I use the Helpful Word feature without expending a Leadership Die.",
				]),
				action :["bonus action", ""],
			},
			"subclassfeature3.1" : {
				name : "Tactical Flexibility",
				source : ["KT:WL", 10],
				minlevel : 3,
				description : desc ([
				"I can use Tactical Insight and Leadership Dice features as actions or bonus actions on my turn.",
				]),
			},
			"subclassfeature7" : {
				name : "Inscrutable Mind",
				source : ["KT:WL", 10],
				minlevel : 7,
				description : desc ([
				"I gain proficiency in Intelligence saving throws. Additionally, as a reaction to making Wisdom,",
				"Intelligence, or Charisma saving throws, I can expend one Leadership Die, adding it to the roll.",
				]),
				saves : ["Int"],
				action : ["reaction", " [1 Leadership Die]"],
			},
			"subclassfeature7.1" : {
				name : "Control the Field",
				source : ["KT:WL", 10],
				minlevel : 7,
				description : desc ([
				"Whenever I use an ability that moves allied creatures, it gains the following properties:",
				"\u2022 Deceptive Movement: I can attempt to move non-ally creatures up to five feet, or half their",
				"movement speed, whichever is less. The target creature makes an Intelligence saving throw",
				"against DC 8 + my Intelligence modifier + my Proficiency Bonus. They do not gain temporary",
				"hit points.",
				"\u2022 Flanking Maneuvers: If two allies I move are on opposite sides of an enemy, whoever attacks",
				"the enemy before it moves has advantage on their first attack.",
				"\u2022 Coordinated Transitions: Allies can move through each other's spaces without it counting as",
				"difficult terrain.",
				]),
			},
			"subclassfeature11" : {
				name : "Tactical Strike",
				source : ["KT:WL", 10],
				minlevel : 11,
				description : desc ([
				"When I successfully use my Tactical Insight feature against a creature, the next time I or an ally",
				"deals damage to it, we deal 2d6 bonus damage.",
				]),
			},
			"subclassfeature15" : {
				name : "Advanced Orders",
				source : ["KT:WL", 10],
				minlevel : 15,
				description : desc ([
				"When I expend Leadership Dice to use my Urgent Orders feature, the target creature can take",
				"the Use an Object, Search, Hide, or Dodge actions as their reaction instead of moving.",
				]),
			},
			"subclassfeature18" : {
				name : "Unstoppable Schemes",
				source : ["KT:WL", 10],
				minlevel : 18,
				description : desc ([
				"Allies I move with Urgent Orders or Shift the Field can move through the spaces of hostile",
				"creatures so long as they don't end their movement in those spaces.",
				]),
			},
			"subclassfeature18.1" : {
				name : "Multilayered Tactics",
				source : ["KT:WL", 10],
				minlevel : 18,
				description : desc ([
				"When I successfully use my Tactical Insight feature against a creature, I can choose two of the",
				"listed benefits, instead of just one.",
				]),
			},
		}
	}
);

