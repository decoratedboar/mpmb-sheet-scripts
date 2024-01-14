/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the Occultist class, a homebrew creation by KibblesTasty.
				Their content can be downloaded at https://www.kthomebrew.com/
	Code by:	u/decoratedblood (decoratedboar), with contributions from MorePurpleMoreBetter (MPMB)
	Date:		14-06-2023 (sheet v13)
*/

var iFileName = "Occultist Class v1.3.2 [By KibblesTasty, transcribed by decoratedboar].js";

RequiredSheetVersion("13.0.0");

SourceList["KT:OC"] = {
	name : "Occultist (KibblesTasty)",
	abbreviation : "KT:Oc",
	group : "KibblesTasty",
	url : "https://www.kthomebrew.com/",
};
SourceList["OFCP"] = {
	name : "Occultist Fan Content Patch",
	abbreviation : "OFCP",
	group : "KibblesTasty",
	url : "https://www.gmbinder.com/share/-NMc60Jc6p0syX8gRGoi",
};

var OccultRitesAll = { //The list of occult rites available to all subclasses
	alchemical_rites : {
		name : "Alchemical Rites",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain proficiency with alchemist's supplies. During a long rest, I can use them to concoct an",
			"Improvised Potion of Healing by spending 1 hour of the long rest. The created potion expires",
			"in 24 hours, and has no value in gold pieces. During this process, I can expend a 5th level",
			"spell slot to brew a Potion of Greater Healing instead. The expended spell slot is regained",
			"when the long rest is completed as normal."
		]),
		toolProfs : [["Alchemist's Supplies"]],
	},
	commune_beyond_death : {
		name : "Commune Beyond Death",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I learn the Speak With Dead spell, which counts as an Occultist spell for me, but does not",
			"count against my spells known. I can cast it without expending a spell slot once per short",
			"or long rest."
		]),
		limfeaname : "Speak With Dead",
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : {
			name : "Commune Beyond Death",
			spells : ["speak with dead"],
			selection : ["speak with dead"],
			firstCol : "oncesr",
		},
	},
	corrupt_item: {
		name : "Corrupt Item (prereq: Occultist lvl 5)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I corrupt a selected non-magical item, causing it to become a cursed magic item. While",
			"any creature other than myself is in possession of this item, they are under the effect of",
			"the Bane spell. When you change rites, you can reselect this rite to destroy the item and",
			"create a new item.",
		]),
		magicitemsAdd : ["Cursed Magic Item"],
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 5);
		},
	},
	emblazoned_focus : {
		name : "Emblazoned Focus",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I emblazon a mystical mark on myself via a tattoo, scar, or similar permanent mark. I can",
			"use this mark as my spellcasting focus for my Occultist spells. I no longer need a free hand",
			"to cast spells with somatic or material components, as I can channel your magic through",
			"the mark, though it glows visibly when I do so. The mark must remain uncovered to",
			"function as a spellcasting focus (casting in this way does not remove the signs of casting",
			"a spell, it merely means I don't need a free hand).",
		]),
	},
	expert_of_tradition : {
		name : "Expert of Tradition (prereq: Occultist lvl 10)",
		source : [["KT:Oc", 18]],
		description : desc([
			"I choose a skill I am proficient in from Animal Handling, Arcana, Medicine, Nature, and",
			"Survival. I gain expertise in the chosen skill. If I don't have proficiency in any of the",
			"selected skills, I instead gain proficiency in one of my choice.",
		]),
		skillstxt : "Choose one from Animal Handling, Arcana, Medicine, Nature, or Survival. Gain expertise if already proficient in the chosen skill",
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 10);
		},
	},
	forbidden_rites : {
		name : "Forbidden Rites (prereq: Occultist lvl 5)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I learn the spell animate dead. It is an Occultist spell for me and does not count against the",
			"number of Occultist spells I know. This spell cannot gain the ritual tag with Lost Ritual.",
		]),
		spellcastingBonus : {
			name : "Forbidden Rites",
			spells : ["animate dead"],
			selection : ["animate dead"],
		},
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 5);
		},
	},
	lost_ritual : {
		name : "Lost Ritual",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I learn of a ritual lost to time. I select an Occultist spell I know of 5th level or lower. This",
			"spell gains the ritual tag. I can cast this spell as a ritual once, and must complete a short",
			"or long rest before casting it as a ritual again.",
		]), 
		usages : 1,
		recovery : "short rest",
		limfeaname : "Lost Ritual (one <6th lvl spell)",
		//Not sure if there's any way to code this as a change to something on the spell sheet, so I'm making it a limited feature
	},
	markings_of_protections : {
		name : "Markings of Protections",				
		source : [["KT:Oc", 18]],
		description : desc([
			"I mark myself with magical symbols and patterns, protecting myself from harm. While I'm",
			"not wearing any armor, my AC is 11 + my Wisdom modifier. I can use a shield and still",
			"gain this benefit.",
		]),
		armorOptions : {
			regExpSearch : /^(?=.*markings)(?=.*of)(?=.*protections).*$/i,
			name : "Markings of Protections",
			source : ["KT:Oc", 18],
			ac : "11+Wis",
			dex : -10
		}, //Wisdom replaces Dexterity, therefore Dex is set to 0 (-10)
	},
	occult_magic : {
		name : "Occult Magic",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic",
			"class" : ["occultist"],
			times : 1,
		}],
	},
	
	//Can't find any script precedents for extrachoices that can be selected multiple times, so this is the best I can do for now.
	//Adds as many extra copies of this choice as you would be able to get at max level (8), which only appear in the extrachoices list if the previous choice has been selected.
	occult_magic2 : {
		name : "Occult Magic (2)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (2)",
			"class" : ["occultist"],
			times : 1,
		}],
		//Returning "skip" with a prereqeval excludes something from the extrachoices list entirely, rather than greying it out.
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic') != -1 ? true : "skip"; 
		},
		
	},
	occult_magic3 : {
		name : "Occult Magic (3)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (3)",
			"class" : ["occultist"],
			times : 1,
		}],
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic (2)') != -1 ? true : "skip"; 
		},
		
	},
	occult_magic4 : {
		name : "Occult Magic (4)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (4)",
			"class" : ["occultist"],
			times : 1,
		}],
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic (3)') != -1 ? true : "skip"; 
		},
		
	},
	occult_magic5 : {
		name : "Occult Magic (5)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (5)",
			"class" : ["occultist"],
			times : 1,
		}],
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic (4)') != -1 ? true : "skip"; 
		},
		
	},
	occult_magic6 : {
		name : "Occult Magic (6)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (6)",
			"class" : ["occultist"],
			times : 1,
		}],
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic (5)') != -1 ? true : "skip"; 
		},
		
	},
	occult_magic7 : {
		name : "Occult Magic (7)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",	
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (7)",
			"class" : ["occultist"],
			times : 1,
		}],
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic (6)') != -1 ? true : "skip"; 
		},
		
	},
	occult_magic8 : {
		name : "Occult Magic (8)",				
		source : [["KT:Oc", 18]],
		description : desc([
			"My Occultist spells known increases by one. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Occult Magic (8)",
			"class" : ["occultist"],
			times : 1,
		}],
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('occult magic (7)') != -1 ? true : "skip"; 
		},
		
	},
	
	protective_ward : {
		name : "Protective Ward",				
		source : [["KT:Oc", 19]],
		description : desc([
			"Once per short or long rest, I can cast the Protection from Evil and Good spell without",
			"expending a spell slot, and without requiring material components or concentration.",
			"The spell lasts a number of rounds equal to my Wisdom modifier, unless I cast it as a",
			"reaction to being attacked or making a save it would affect, in which case it only lasts",
			"until the start of my next turn.",
		]),
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : {
			name : "Protective Ward",
			spells : ["protection from evil and good"],
			selection : ["protection from evil and good"],
			firstCol : "oncesr",
		},
	},
	rite_of_immortality : {
		name : "Rite of Immortality (prereq: Occultist lvl 15)",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I still age visibly, but cannot die of old age, and suffer from none of its fragility.",
		]),
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 15);
		},
	},
	rite_of_youth : {
		name : "Rite of Youth (prereq: Occultist lvl 15)",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I no longer visibly age, and can appear more youthful, but my lifespan remains the same.",
		]),
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 15);
		},
	},
	root_of_magic : {
		name : "Root of Magic (prereq: Occultist lvl 15)",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I learn 10 cantrips of my choice from any class list. They are Occultist spells for me.",
		]),
		spellcastingBonus : {
			name : "Root of Magic",
			"class" : "any",
			level : [0, 0],
			times : 10,
		},
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 15);
		},
	},
	spatial_storage : {
		name : "Spacial Storage",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I can convert a pocket, ring, hat, or bag into a spatial storage device. It can carry 5 times",
			"my Occultist level in pounds of weight, and has half my Occultist level in cubic feet of",
			"storage space. I can use an action to store or retrieve an item, and if lost, I can recreate this",
			"device during a short rest.",
		]),
		magicitemsAdd : ["Spatial Storage Item"],
		additional : levels.map(function (n) { 
			return (5 * n) + " lbs, " + (n / 2) + " cubic ft.";
		}),
	},
	specialised_poisons : {
		name : "Specialised Poisons",				
		source : [["KT:Oc", 19]],
		description : desc([
			"When I deal poison damage with an Occultist spell or a created poison, I can choose to",
			"designate a type of creature. Damage from the spell or poison ignores the chosen creature",
			"type's resistances and immunities to poison damage, however, creatures that are not my",
			"chosen type have resistance against the spell or poison's damage.",
		]),
	},
	spirit_sense : {
		name : "Spirit Sense",				
		source : [["KT:Oc", 19]],
		description : desc([
			"As an action, I give myself 30 feet of blindness as my vision for a minute, but beyond 30",
			"feet, I see into the ethereal plane, and gain advantage on ability checks and saving throws",
			"to detect and see through illusions, see invisible creatures, and see a shapechanger or",
			"transformed creature's original form.",
		]),
		action : ["action", " (Blindness 30 ft.)"],
	}, //Not going to program in a senses entry for this, since it's a temporary feature.
	soulburn : {
		name : "Soulburn",				
		source : [["KT:Oc", 19]],
		description : desc([
			"When I deal cold, fire or lightning damage, I can choose to deal necrotic damage instead.",
		]),
	},
	sympathetic_bond : {
		name : "Sympathetic Bond",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I learn the Warding Bond spell. It is an Occultist spell for me, but doesn't count against",
			"my spells known. When I cast warding bond, I can choose to increase it's power; when",
			"either myself or the target of the spell make an Intelligence, Wisdom, or Charisma saving",
			"throw, we both make the throw. If either of us succeeds, we both succeed, but if we both",
			"fail, we are both affected by the condition being saved against.",
		]),
		spellcastingBonus : {
			name : "Sympathetic Bond",
			spells : ["warding bond"],
			selection : ["warding bond"],
		},
		spellChanges : {
			"warding bond" : {
				description : "1 crea +1 AC, +1 saves, resistance all dmg.; if takes dmg. I take same dmg.; ends if >60 ft away (100gp); Both can make other's Int., Wis., Cha saves",
				changes : "Sympathetic Bond allows myself or my spell target to make the other's Int., Wis., and Cha., saving throws at the same time, both succeeding if either of us succeeds, but both suffering the effect being saved against if we both fail."
			},
		},
	},
	vestments_of_war : {
		name : "Vestments of War",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I gain profiency with medium armour.",
		]),
		armorProfs : [false, true, false, false],
	},
	shield_proficiency : {
		name : "Shield Proficiency (prereq: Vestments of War)",				
		source : [["KT:Oc", 19]],
		description : desc([
			"I gain profiency with shields.",
		]),
		armorProfs : [false, false, false, true],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('vestments of war') != -1 ? true : false; 
		},
	},
};
//Alchemical Rites item. Largely the same as the regular healing potion, but with less choices.
MagicItemsList["improvised potion"] = {
	name : "Improvised Potion",
	source : ["KT:Oc", 18],
	type : "potion",
	description : "Once as an action, I can drink this potion or administer it to another to heal a number of hit points depending on the type of potion. This potion has no value in gold, and expires 24 hours after being made.",
	descriptionFull : "You regain hit points when you drink this potion. The number of hit points depends on whether you have spent a 5th level spell slot during the brewing process. This improvised potion has no gold value, and expires 24 hours after you make it.",
	weight : 0.5,
	allowDuplicates : true,
	choices : ["Improvised Healing (2d4+2)", "Improvised Greater Healing (4d4+4)"],
	"improvised healing (2d4+2)" : {
		name : "Improvised Potion of Healing",
		rarity : "common",
		description : "Once as an action, I can drink this potion or administer it to another to regain 2d4+2 hit points. ",
		descriptionFull : "You regain 2d4+2 hit points when you drink this potion. This potion has no value in gold, and expires 24 hours after being made.",
	},
	"improvised greater healing (4d4+4)" : {
		name : "Improvised Potion of Greater Healing",
		rarity : "uncommon",
		description : "Once as an action, I can drink this potion or administer it to another to regain 4d4+4 hit points.",
		descriptionFull : "You regain 4d4+4 hit points when you drink this potion. This potion has no value in gold, and expires 24 hours after being made.",
	},
};

var WitchRites = { //The list of all Witch-specific Rites
	animate_broom : {
		name : "Animate Broom",				
		source : [["KT:Oc", 6]],
		description : desc([
			"I turn a broom or broom-shaped object into a Broom of Flying. I can make a new Broom",
			"over the course of 8 hours, causing my previous Broom to lose its magical effect."
		]),
		magicitemsAdd : ["Broom of Flying"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	animate_hair : {
		name : "Animate Hair",				
		source : [["KT:Oc", 7]],
		description : desc([
			"As an action, I can expend a 1st level spell slot to cause my hair to lengthen, strengthen,", 
			"and come alive for 1 minute. After using this feature, and as an action afterwards, I can",
			"make a melee spell attack with a range of 10 ft. dealing 1d8 bludgeoning damage on hit,",
			"increasing with level.  My reach with touch spells is also increased to 10 ft.",
			"After hitting a large or smaller creature, I can attempt to grapple it, using my Wisdom",
			"modifier instead of Strength. A creature can try to escape as normal, or deal 5 slashing,",
			"fire, or acid damage to my hair to escape. My hair has an AC of 12, and I take no damage",
			"when it is attacked.",
		]),
		additional : levels.map(function (n) {
			return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d8 bludgeoning dmg.";
		}),
		action : ["action", " (summon/attack)"],
		//Animated Hair attack entry
		weaponOptions : {
			baseWeapon : "unarmed strike",
			regExpSearch : /animated hair/i,
			name : "Animated Hair",
			source : ["KT:Oc", 7],
			ability : 5,
			range : "10 ft",
			damage : ["C", 8, "bludgeoning"],
			abilitytodamage : false,
			description : "Touch spells 10ft. range; Can grapple large or smaller crea. hit (Wis. mod.)", 
		},
		weaponsAdd : ["Animated Hair"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	companion_coven : {
		name : "Companion Coven",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I can perform an hour-long ritual to bond with a willing creature. While both of us are",
			"conscious and within 120 ft. of each other, I know their location at all times, and I am",
			"able to share a number of spell slots with them.",
			"I can cast spells using my bonded creature's spell slots as normal, and if they're able, they",
			"can cast spells using my shared spell slots.",
		]),
		additional : levels.map(function (n) {
			return Math.max(Math.floor(n/4), 1) + "lvls. of shared spell slots.";
		}),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	curse_specialist : {
		name : "Curse Specialist",				
		source : [["KT:Oc", 7]],
		description : desc([
			"All Curses and Hexes granted by Witch Covens are added to my spell list, and I learn a",
			"single bonus Curse or Hex",
		]),
		spellcastingBonus : {
			name : "Curse Specialist",
			spells : ["befuddling curse", "binding hex", "curse of misfortune", "curse of doom", "enfeebling hex", "karmic hex", "killing curse", "rotting curse", "swapping curse"],
			times : 1,
		},
		
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					//Add the extra spells.
					spList.extraspells = spList.extraspells.concat(["befuddling curse", "binding hex", "curse of misfortune", "curse of doom", "enfeebling hex", "karmic hex", "killing curse", "rotting curse", "swapping curse"]);
				},
				"I gain all Curses and Hexes granted by Witch Covens."
			],
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}	
	},
	divine_presence : {
		name : "Divine Presence (prereq: White Coven)",				
		source : [["KT:Oc", 7]],
		description : desc([
			"My familiar is permanently under the effect of the Sanctuary spell. After dealing damage,",
			"the effect is lost until the start of its next turn.",
		]),
		prereqeval : function(v) {
			return classes.known.occultist.subclass.indexOf("witch") === -1 ? "skip" : GetFeatureChoice("classes", "occultist", "subclassfeature1.1").indexOf("white coven") != -1 ? true : false;
		},
		//Adds the sanctuary effect to the traits section on the familiar page.
		calcChanges : {
			companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
				if (sCompType !== "familiar") return;
					var str = "\u25C6 Divine Presence: This familiar is permanently under the effect of the Sanctuary spell. After dealing damage, the effect is lost until the start of its next turn.";
					var aFnc = bAdd ? AddString : RemoveString;
					aFnc(prefix + "Comp.Use.Traits", str, true);
					//This function just adds the var str to the traits section of the companion page
			}]
		},
		
	},
	familiar_swap : {
		name : "Familiar Swap",				
		source : [["KT:Oc", 7]],
		description : desc([
			"While my familiar is within 60 ft. of me, I can swap places with it as an action once per",
			"short or long rest. If I cannot fit into the space my familiar occupies, this ability fails, and",
			"I take 1d6 force damage.",
		]),
		action : ["action", ""],
		usages : 1,
		recovery : "short rest",
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	form_of_the_familiar : {
		name : "Form of the Familiar",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I learn the Form of Familiar spell, and can cast it as an action once per short or long rest",
			"without expending a spell slot.",
		]),
		action : ["action", ""],
		limfeaname : "Form of Familiar",
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : {
			name : "Form of Familiar",
			spells : ["form of familiar"],
			selection : ["form of familiar"],
			firstCol : "oncesr",
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	light_of_the_moon : {
		name : "Light of the Moon",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I learn the Faerie Fire and Moonbeam spells. When I cast them, allied creatures of my choice",
			"within the area of effect are unaffected, and gain temporary hit points equal to my Wisdom",
			"modifier.",
		]),
		spellcastingBonus : {
			name : "Light of the Moon",
			spells : ["faerie fire", "moonbeam"],
			selection : ["faerie fire", "moonbeam"],
			times : 2,
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	riding_familiar : {
		name : "Riding Familiar",				
		source : [["KT:Oc", 7]],
		description : desc([
			"If my familiar has no flying speed, once per short or long rest as an action, I can make",
			"them one size larger than myself (up to Large), and giving them 10 Strength (if it was not",
			"already higher than that) for 8 hours. I can revert them to normal as an action. At 12th",
			"level, I am able to use this ability on familiars with flying speed.",
		]),
		action : ["action", " (enlarge/revert)"],
		usages: 1,
		recovery : "short rest",
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	skulking_familiar : {
		name : "Skulking Familiar",				
		source : [["KT:Oc", 7]],
		description : desc([
			"Familiars I summon gain proficiency in Dexterity (Stealth), and don't provoke opportunity",
			"attacks when moving.",
		]),
		calcChanges : {
			//companionCallback runs when a special type of familiar is added (e.g. from the find familiar spell.)
			companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
				if (sCompType !== "familiar") return; //Check whether the companion is a familiar
					if(!typePF) { //Check whether the sheet is the printer-friendly or not, since the sheet entries are differently named.
						var skillFld = prefix + "Text.Comp.Use.Skills.Ste.Prof";
					} else {
						var skillFld = prefix + "Comp.Use.Skills.Ste.Prof";
					}
					
					if(!typePF) {
						Value(skillFld, "proficient");
					} else {
						Checkbox(skillFld, "proficient");
					}

					var str = "\u25C6 Skulking Familiar: This familiar gains proficiency in Dexterity (Stealth), and doesn't provoke opportunity attacks when moving.";
					var aFnc = bAdd ? AddString : RemoveString;
					aFnc(prefix + "Comp.Use.Traits", str, true);
					//This function just adds the var str to the traits section of the companion page
			}]
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	witchs_brew : {
		name : "Witch's Brew",				
		source : [["KT:Oc", 7]],
		description : desc([
			"During a short or long rest, I can infuse a spell with a casting time of one action/bonus",
			"action into a potion, expending the appropriate spell slot in the process. Anyone who",
			"drinks this potion as an action can cast the stored spell, using my spellcasting ability",
			"modifier. The potion can be used until I regain the spell slot used to create it.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	witchs_claws : {
		name : "Witch's Claws",				
		source : [["KT:Oc", 7]],
		description : desc([
			"As an action, I can make a melee spell attack against a creature, dealing 1d10 + my Wisdom",
			"modifier slashing damage, increasing with level. At 6th level, I can apply my Witch's Touch",
			"feature with this attack.",
		]),
		additional : levels.map(function (n) {
			return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d10 slashing dmg.";
		}),
		//Witch's Claws attack entry
		weaponOptions : {
			baseWeapon : "unarmed strike",
			regExpSearch : /witch\'s claws/i,
			name : "Witch's Claws",
			source : ["KT:Oc", 7],
			ability : 5,
			range : "10 ft",
			damage : ["C", 10, "slashing"],
			abilitytodamage : true,
			description : "Can apply Witch's Touch after 6th lvl", 
		},
		weaponsAdd : ["Witch's Claws"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
	witchs_hat : {
		name : "Witch's Hat",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I turn a hat into a Hat of Disguise. I can make a new Hat over the course of 2 hours,",
			"causing my previous Hat to lose its magical effect.",
		]),
		magicitemsAdd : ["Hat of Disguise"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("witch") !== -1 ? true : "skip"; 
		}
	},
};	

var HedgeRites = { //The list of all Hedge Mage-specific Rites
	hedge_magic : {
		name : "Hedge Magic",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") !== -1 ? true : "skip"; 
		}
	},
	//Functions the same way as Occult Magic
	hedge_magic2 : {
		name : "Hedge Magic (2)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (2)",
			"class" : ["occultist"],
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { //Won't appear unless the previous one is selected anyway, so no need to check for subclass again.
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic') != -1 ? true : "skip"; 
		},
	},
	hedge_magic3 : {
		name : "Hedge Magic (3)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (3)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (2)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic4 : {
		name : "Hedge Magic (4)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (4)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (3)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic5 : {
		name : "Hedge Magic (5)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (5)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (4)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic6 : {
		name : "Hedge Magic (6)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (6)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (5)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic7 : {
		name : "Hedge Magic (7)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (7)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (6)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic8 : {
		name : "Hedge Magic (8)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (8)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (7)') != -1 ? true : "skip"; 
		},
	},
	
	i_know_that_one : {
		name : "I Know That One!",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I have advantage on saving throws against and spellcasting ability checks to use the",
			"Counterspell or Dispel Magic spells against spells I know.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") !== -1 ? true : "skip"; 
		}
	},
	manipulate_magic : {
		name : "Manipulate Magic (prereq: 5th level Hedge Mage)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn one Metamagic option of my choice from the Sorcerer class. Once per long rest,",
			"I can use this option with up to three Sorcery Points for free. I can also expend a spell slot",
			"with a level equal to the points I would spend on the option to use it.",
		]),
		limfeaname : "Manipulate Magic",
		usages: 1,
		recovery: "long rest",
		bonusClassExtrachoices : [{
			"class" : "sorcerer",
			feature : "metamagic",
			bonus : 1
		}],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 5 ? true : false; 
		}
	},
	mass_cantrip : {
		name : "Mass Cantrip",				
		source : [["KT:Oc", 11]],
		description : desc([
			"When I cast an Occultist cantrip that targets one or more creatures, I can make it target",
			"additional creatures within range equal to my Proficiency Bonus. I can use this ability",
			"once per long rest, or by expending a spell slot to target a number of creatures equal to",
			"the spent slot's level.",
		]),
		usages: 1,
		recovery: "long rest",
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") !== -1 ? true : "skip"; 
		}
	},
	mastered_basics : {
		name : "Mastered Basics (prereq: 15th level Hedge Mage)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"When I cast an Occultist spell I know using a 1st level spell slot, it is cast as if I had used a",
			"2nd level spell slot.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 15 ? true : false; 
		}
	},
	practice_makes_perfect : { //Not sure how much more I can do with this.
		name : "Practice Makes Perfect", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I choose a 1st level Occultist spell I know. I can now cast this spell without expending a",
			"spell slot a number of times equal to half my Proficiency Bonus (rounded up) per long rest.",
		]),
		usagescalc : "event.value = Math.ceil(How('Proficiency Bonus')/2)",
		usages : "1/2 Prof. bonus per",
		recovery : "long rest",
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") !== -1 ? true : "skip"; 
		}
	},
	practiced_reach : {
		name : "Practiced Reach", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"When I use The Way I Learned It to add range to a spell, I can increase the spell's range up",
			"to a maximum of 30 ft.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") !== -1 ? true : "skip"; 
		}
	},
	potent_cantrip : {
		name : "Potent Cantrip (prereq: 7th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"When a creature succeeds on a saving throw against one of my cantrips, they take half of",
			"the cantrip's damage (if any), but suffer no additional effect from it.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 7 ? true : false; 
		}
	},
	savant_focus : {
		name : "Savant Focus (prereq: 7th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"As a bonus action, I enter a state of focus, using my spell concentration to maintain it.",
			"During this state, I have advantage on all cantrip attack rolls for 1 minute, or until I lose",
			"my concentration.",
		]),
		limfeaname : "Savant Focus",
		action : ["bonus action", ""],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 7 ? true : false; 
		}
	},

	//Same as Occult Magic once again.
	studious_mage : {
		name : "Studious Mage (prereq: 3rd level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 3 ? true : false; 
		}
	},
	studious_mage2 : { 
		name : "Studious Mage (2)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (2)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (2)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (prereq: 3rd level hedge mage)') != -1 ? true : "skip"; 
		},
	},
	studious_mage3 : { 
		name : "Studious Mage (3)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (3)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (3)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (2)') != -1 ? true : "skip"; 
		},
	},
	studious_mage4 : { 
		name : "Studious Mage (4)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (4)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (4)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (3)') != -1 ? true : "skip"; 
		},
	},
	studious_mage5 : { 
		name : "Studious Mage (5)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (5)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (5)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (4)') != -1 ? true : "skip"; 
		},
	},
	studious_mage6 : {
		name : "Studious Mage (6)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (6)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (6)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (5)') != -1 ? true : "skip"; 
		},
	},
	studious_mage7 : { 
		name : "Studious Mage (7)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (7)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (7)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (6)') != -1 ? true : "skip"; 
		},
	},
	studious_mage8 : { 
		name : "Studious Mage (8)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (8)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (8)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (7)') != -1 ? true : "skip"; 
		},
	},
	
	simple_magic : {
		name : "Simple Magic (prereq: 5th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I can sacrifice a spell slot of 3rd level or higher to gain two 1st level spell slots, or two",
			"2nd level spell slots if I sacrifice a 5th level spell slot. I can store up to double my usual",
			"maximum spell slots this way.",
		]),
		additional : levels.map(function (n) {
			return (n < 3 ? (n + 1) : 4) + " 1st lvl., " + (n < 4 ? 2 : 3) + " 5th lvl. slots max.";
		}),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 5 ? true : false; 
		}
	},
	utility_master : {
		name : "Utility Master (prereq: 5th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"My cantrips that lift weight, affect external elements, target a ground area, or cause",
			"minor instantaneous effects can lift twice as much, target twice the area, or maintain an",
			"additional effect.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("hedge mage") === -1 ? "skip" : classes.known.occultist.level >= 5 ? true : false; 
		}
	},
};

var OracleRites = { //The list of all Oracle-specific Rites
	death_watcher : {
		name : "Death Watcher (prereq: 12th level Occultist)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"Once per long rest, when an ally that can see or hear me would drop to 0 hit points as",
			"a result of taking damage, I can cause them to drop to 1 hit point instead as a reaction.",
		]),
		limfeaname: "Death Watcher",
		usages : 1,
		recovery : "long rest",
		action : ["reaction", ""],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : classes.known.occultist.level >= 12 ? true : false; 
		}
	},
	divine_miracle : {
		name : "Divine Miracle", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"I learn a Cleric spell of my choice as a bonus spell. The spell must be of a level I can cast.",
			"It counts as an Occultist spell for me.",
		]),
		spellcastingBonus : { //just adds a bonus cleric spell, logically a player would pick a spell of a level they can cast, so I've excluded this from the description even though it's in the write up.
			name : "Divine Miracle",
			"class" : ["cleric"],
			level : [1, 9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Divine Miracle") {
						//Get the Occultist level, calculate what the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 3 ? 1 : aLvl < 5 ? 3 : aLvl < 7 ? 4 : aLvl < 9 ? 5 : aLvl < 11 ? 5 : aLvl < 13 ? 6 : aLvl < 15 ? 7 : aLvl < 17 ? 8 : 9;
						
						//The spells shown by the bonus spell drop down range in level from 1 to the max castable 
						spList.level = [1,lvl];
					}
				},
				"I learn a Cleric spell of my choice as a bonus spell. The spell must be of a level I can cast."
			]
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") !== -1 ? true : "skip"; 
		}
	},
	divine_sight : {
		name : "Divine Sight (prereq: 15th level Occultist)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"If I have Blindsight, I gain Truesight with an equal range.",
		]),
		vision : [["Truesight (if Blindsight, equal to its range)", ""]],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : classes.known.occultist.level >= 15 ? true : false; 
		}
	},
	oracles_sight : {
		name : "Oracle's Sight", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"I gain 15ft of Blindsight. If under the Blinded condition for more than a minute, the range",
			"of my Blindsight is doubled while still under the condition.",
		]),
		vision : [["Blindsight", 15]],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf("blind") != -1 ? "skip" : true; 
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") !== -1 ? true : "skip"; 
		}
	},
	
	revelation_darkness : {
		name : "Revelation of Darkness (prereq: Mystery of Darkness)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast creates dim light or darkness, or if it obscures me",
			"from the vision of one or more creatures, I can teleport to another space within 30 ft. that is",
			"in dim light or darkness.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of darkness') != -1 ? true : false; 
		},
	},
	revelation_death : {
		name : "Revelation of Death (prereq: Mystery of Death)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast deals cold or necrotic damage, I can add my",
			"Wisdom modifier to one damage roll of that spell. This reduces my movement by 5 ft. until",
			"the end of my next turn. If my movement is already reduced, my movement is reduced by a",
			"further 5 ft. and the duration is extended.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of death') != -1 ? true : false; 
		},
	},
	revelation_fire : {
		name : "Revelation of Fire (prereq: Mystery of Fire)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast deals fire damage, I can shroud myself in fire until",
			"the end of my next turn, gaining half cover, and dealing 1d6 fire damage to creatures that",
			"hit me with melee attacks of end their turns within 5 ft. of me. At the start of my next turn,",
			"I take 1 fire damage.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1 ? true : false; 
		},
	},
	revelation_life : {
		name : "Revelation of Life (prereq: Mystery of Life)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast restores hit points, or grants temporary hit points,",
			"I can heal a creature within 30 ft. other than myself for a number of hit points equal to my",
			"Occultist level, reducing my own current hit points by half that amount. I cannot heal",
			"undead, constructs, or creatures at 0 hit points with this ability.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of life') != -1 ? true : false; 
		},
	},
	revelation_light : {
		name : "Revelation of Light (prereq: Mystery of Light)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When I cast the Prismatic Flash spell, or a spell of 1st level or higher that sheds 5 or more",
			"ft. of bright light, as a bonus action I can force a creature within 30 ft. of the light to",
			"succeed on a Dexterity saving throw, or become blinded until the start of my next turn.",
			"Creatures that don't rely on sight, or that can perceive illusions as false are unaffected.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),
		limfeaname : "Revelation of Light",
		action : ["bonus action", ""],

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of light') != -1 ? true : false; 
		},
	},
	revelation_souls : {
		name : "Revelation of Souls (prereq: Mystery of Souls)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When I cast a spell of 1st level or higher, I can summon a medium sized Benevolent or",
			"Tormented Spirit to an empty space within 30 ft. If the Spirit is Benevolent, the first creature",
			"to enter its space gains 1d4 + the triggering spell's level in hit points. If it is Tormented, they",
			"take the same amount in necrotic damage instead.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of souls') != -1 ? true : false; 
		},
	},
	revelation_war : {
		name : "Revelation of War (prereq: Mystery of War)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When I cast a spell of 1st level or higher, I can make a single melee weapon attack as a",
			"bonus action. After reaching 6th level, I can trigger this Revelation after casting an Occultist",
			"cantrip.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of war') != -1 ? true : false; 
		},
	},
	
	touch_fire : {
		name : "Touch of Fire (prereq: Mystery of Fire)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"I learn the Burn cantrip. Additionally, as a bonus action, I can take 1 fire damage to cause",
			"a weapon I'm carrying to burst into flames for 1 minute, or until I let go of it. While",
			"burning, it sheds 10 ft. of bright light, and another 10 ft. of dim light, and deals an extra",
			"1d6 fire damage on hit.",
		]),
		spellcastingBonus : {
			name : "Touch of Fire",
			spells : ["burn"],
			selection : ["burn"],
		},
		limfeaname : "Touch of Fire",
		action : ["bonus action", " (ignite)"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1 ? true : false; 
		},
	},
	truth_darkness : {
		name : "Truth of Darkness (prereq: Mystery of Darkness)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"The range of any Darkvision or Blindsight I have is doubled. If I have neither, I gain",
			"Darkvision to 60 ft.",
		]),
		vision : [
			["Darkvision", 30], //Doubled by the next entry
			["Darkvision", "*2"], 
			["Blindsight", "*2"]
		],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of darkness') != -1 ? true : false; 
		},
	},
	truth_death : {
		name : "Truth of Death (prereq: Mystery of Death)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"Necrotic damage I deal ignores resistance, and treats immunity as resistance. Dealing",
			"necrotic damage also inflicts my Touch of Death on the target, and any hit points they",
			"gain are halved for the duration of it.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of death') != -1 ? true : false; 
		},
	},
	truth_fire : {
		name : "Truth of Fire (prereq: Mystery of Fire)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When I roll fire damage, I can reroll any number of the damage dice, and I must use the",
			"new rolls. If I reroll all the damage roll's dice, the damage bypasses any resistance. For",
			"each die I reroll, I take 1 fire damage.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1 ? true : false; 
		},
	},
	truth_life : {
		name : "Truth of Life (prereq: Mystery of Life)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When a creature dies within 60 ft. of me, I can use my reaction to give it hit points equal",
			"to my Wisdom modifier, or the maximum hit points of another target creature within 60 ft.,",
			"whichever is lowest.",
		]),
		limfeaname : "Truth of Life",
		action : ["reaction", ""],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of life') != -1 ? true : false; 
		},
	},
	truth_light : {
		name : "Truth of Light (prereq: Mystery of Light)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"Magical bright light I create reveals invisible creatures, and imposes disadvantage on their",
			"rolls to hide within it. It also grants advantage on saving throws and ability checks against",
			"illusions. As a bonus action, I can remove these effects from a source of bright light for the",
			"duration it is active.",
		]),
		limfeaname : "Truth of Light",
		action : ["bonus action ", " (remove effect)"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of light') != -1 ? true : false; 
		},
	},
	truth_souls : {
		name : "Truth of Souls (prereq: Mystery of Souls)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"I have advantage on Constitution saving throws to maintain concentration on spells",
			"granted by my Mystery of Souls.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of souls') != -1 ? true : false; 
		},
	},
	truth_war : {
		name : "Truth of War (prereq: Revelation of War, 5th level Occultist)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When I cast a spell of 1st level or higher, on the next melee weapon attack I hit before my",
			"turn ends, I can force the target of that attack to make a saving throw against my Spell",
			"Save DC, suffering from a condition based on the level of the spell cast (I can choose a",
			"lower level's condition):",
			"   Spell Level\t Condition\t Save\t",
			"    1st\t Prone\t Strength",
			"    2nd\t Poisoned\t Constitution",
			"    3rd\t Frightened\t Wisdom",
			"    4th\t Blinded\t Constitution",
			"    5th\t Restrained\t Strength",
			"    6th+\t Stunned\t Constitution",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : ((classes.known.occultist.level >= 5) && (GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('revelation of war (prereq: mystery of war)') != -1)) ? true : false;
		},
	},
	
	twin_revelation : {
		name : "Twin Revelation (prereq: 9th level Occultist)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When casting a spell that would invoke a Revelation, I can invoke two Revelations",
			"simultaneously instead.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : classes.known.occultist.level >= 9 ? true : false; 
		}
	},
	halo_mystery : {
		name : "Halo of Mystery (prereq: 15th level Occultist)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"Whenever I roll initiative, or as a bonus action at any time, I invoke one of my known",
			"Mysteries to give myself a Halo, which grants me a specific effect until another Mystery is",
			"invoked, or until it is dismissed as a bonus action:",
			"\u2022 Darkness: You have half cover against attacks, and are always considered to be in dim",
			"light regardless of your surroundings.",
			
			"\u2022 Death: I gain resistance to necrotic damage, and if I am reduced to 0 hit points, I can",
			"make a Wisdom saving throw (DC 10 + the damage taken) to be reduced to 1 hit point.",
			
			"\u2022 Fire: I shed bright light for 5 ft., and dim light for another 5 ft. I gain resistance to fire",
			"damage, and immunity to fire damage from my own spells.",
			
			"\u2022 Life: When I restore a creatures hit points, they gain temporary hit points equal to half",
			"the amount I restored.",
			
			"\u2022 Light: I shed bright light for 20 ft., and dim light for another 20 ft., interacting with Truth",
			"of Light. I gain resistance to radiant damage.",
			
			"\u2022 Souls: I gain a flying speed of 20 ft. and can pass through creatures, and objects less than",
			"a foot thick. I ignore all difficult terrain.",
			
			"\u2022 War: When I take damage, I can subtract my Wisdom modifier from the amount I take, to",
			"a minimum of 1.",
		]),
		limfeaname : "Halo of Mystery",
		action : ["bonus action", " (invoke/dismiss)"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("oracle") === -1 ? "skip" : classes.known.occultist.level >= 15 ? true : false; 
		}
	},
};

var ShamanRites = { //The list of all Shaman-specific Rites
	avatar_elements : {
		name : "Avatar of the Elements (prereq: 11th level Shaman)", 				
		source : [["KT:Oc", 16]],
		description : desc([
			"I learn the Form of Fire, Form of Ice, and Form of Stone spells. When casting these spells,",
			"I can choose to shorten the duration of them to 1 minute. Doing so removes the",
			"concentration requirement.",
		]),
		spellcastingBonus : {
			name : "Avatar of the Elements",
			spells : ["form of fire", "form of ice", "form of stone"],
			selection : ["form of fire", "form of ice", "form of stone"],
			times : 3,
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : classes.known.occultist.level >= 11 ? true : false; 
		}
	},
	dance_spirits : {
		name : "Dance of the Spirits (prereq: 5th level Occultist)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"When I cast the Spirit Guardians spell, I can choose the spell's damage type from cold,",
			"fire, lightning, necrotic, and radiant regardless of alignment. Additionally, I have advantage",
			"on Constitution saving throws maintain concentration on Spirit Guardian and other",
			"spirit-summoning spells.",
		]),
		savetxt : { text : ["Adv. on Con. saves for Spirit Guardians, other spirit spells"] },
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : classes.known.occultist.level >= 5 ? true : false; 
		}
	},
	detonate_spirit : {
		name : "Detonate Spirit", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I can detonate a spirit manifested by my Call Spirit feature as an action. When I do so,",
			"all creatures within 10 ft. of it must make a Dexterity saving throw, taking twice the spirit's",
			"manifested damage on a failed save, or half that on a success if was manifested with a",
			"spell slot. The spirit disappears after using this ability.",
		]),
		action : ["action", ""],
	},
	elemental_weapons : {
		name : "Elemental Weapons (prereq: Fists of Fire or Ice Weapon cantrip)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"When I use the Fists of Fire or Ice Weapon cantrips, the damage die of the created weapon",
			"is raised to the next die up.",
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/ice/i).test(v.WeaponTextName) || (/fists of fire/i).test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Use next damage die up';
					};
				},
				"The damage die of my Fists of Fire and Ice Weapons are increased to the next die up."
			],
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : (isSpellUsed('fists of fire', true) || isSpellUsed('ice weapon', true)) ? true : false; 
		},
	},
	energized_weapon : {
		name : "Energized Weapon (prereq: 3rd level Occultist)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"While I am bonded with an empowered spirit from my Call Spirit and Empowered Spirits",
			"features, as a bonus action I can cause my next weapon attack to deal twice the additional",
			"damage. If manifested, the spirit is recalled when I do this, and after attacking, the spirit",
			"is released entirely.",
		]),
		limfeaname : "Energized Weapon",
		action : ["bonus action", ""],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : classes.known.occultist.level >= 3 ? true : false; 
		}
	},
	guidance_spirits : {
		name : "Guidance of the Spirits (prereq: 3rd level Occultist)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"When I expend a spell slot as part of my Empowered Spirits feature, I can give the spirit",
			"proficiency in a number of skills equal to the level of the spell slot used to empower it.",
			"While the spirit isn't manifested, I gain proficiency with these skills.",
			"If I expend a 5th level or higher spell slot, I can exchange three skill proficiencies to gain",
			"expertise in one skill.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : classes.known.occultist.level >= 3 ? true : false; 
		}
	},
	mistwalker : {
		name : "Mistwalker", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I can see through fog, mist, and smoke. While shrouded by any of these, I also have half cover.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	
	primal_earth : {
		name : "Primal Earth", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Create Pit, Earth Ripple, Seismic Wave, Orbital Stones, and Fissure spells.",
		]),
		spellcastingExtra : ["create pit", "earth ripple", "seismic wave", "orbital stones", "fissure"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	primal_fire : {
		name : "Primal Fire", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Burning Hands, Scorching Ray, Fireball, Wall of Fire, and Pyroclastic Lance spells.",
		]),
		spellcastingExtra : ["burning hands", "scorching ray", "fireball", "wall of fire", "pyroclastic lance"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	primal_ice : {
		name : "Primal Ice", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Arctic Breath, Cold Snap, Sleet Storm, Ice Storm, and Cone of Cold spells.",
		]),
		spellcastingExtra : ["arctic breath", "cold snap", "sleet storm", "ice storm", "cone of cold"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	primal_storm : {
		name : "Primal Storm", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Thunderwave, Gust of Wind, Lightning Bolt, Jumping Jolt, and Sky Burst spells.",
		]),
		spellcastingExtra : ["thunderwave", "gust of wind", "lightning bolt", "jumping jolt", "sky burst"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	
	radiate_power : {
		name : "Radiate Power (prereq: 15th level Occultist)", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"While I'm bonded to a spirit, as a bonus action I can force all creatures within 5 ft. of me",
			"(or the spirit, if it's manifested) to make a Dexterity saving throw against my spell save",
			"DC, taking the spirit's manifested damage on a fail, or half that amount on a success.",
		]),
		limfeaname : "Radiate Power",
		action : ["bonus action", ""],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : classes.known.occultist.level >= 15 ? true : false; 
		}
	},
	
	rite_prowess1 : {
		name : "Rite of Prowess: Dueling", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain the Dueling Fighting Style. +2 to damage rolls when wielding a melee weapon in",
			"one hand and no other weapons.",
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					for (var i = 1; i <= FieldNumbers.actions; i++) {
						if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) return;
					};
					if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description)) output.extraDmg += 2;
				},
				"When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."
			]
		},
		//Deselects other Rite of Prowess objects when selected.
		eval : function() {
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: great weapon fighting", true, 'remove']);
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: two-weapon fighting", true, 'remove']);
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	rite_prowess2 : {
		name : "Rite of Prowess: Great Weapon Fighting", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain the Great Weapon Fighting Style. Reroll 1 or 2 on damage if wielding",
			"two-handed/versatile melee weapon in both hands.",
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.isMeleeWeapon && (/(\bversatile|((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i).test(fields.Description)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : '');
					}
				},
				"While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."
			]
		},
		eval : function() {
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: dueling", true, 'remove']);
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: two-weapon fighting", true, 'remove']);
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
	rite_prowess3 : {
		name : "Rite of Prowess: Two-Weapon Fighting", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain the Two-Weapon Fighting Style. I can add my ability modifier to the damage of my",
			"off-hand attacks",
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isOffHand) output.modToDmg = true;
				},
				"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
			]
		},
		eval : function() {
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: dueling", true, 'remove']);
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: great weapon fighting", true, 'remove']);
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
		
	},

	shamans_touch : {
		name : "Shaman's Touch (prereq: 7th level Occultist)", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"When I cast a cantrip with a range of touch, I can make one weapon attack as a bonus action.",
		]),
		limfeaname : "Shaman's Touch Attack",
		action : ["bonus action", " (after touch cantrip)"],
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : classes.known.occultist.level >= 7 ? true : false; 
		}
	},
	strength_spirit : {
		name : "Strength of Spirit (prereq: 7th level Occultist, more Str. than Wis.)", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I increase my Wisdom ability score by 2, up to a maximum of 20. This cannot make my",
			"Wisdom score higher than my Strength score.",
		]),
		scorestxt : "+2 Wisdom, but no higher than Strength.",
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") === -1 ? "skip" : ((classes.known.occultist.level >= 7) && (What('Str') > What('Wis'))) ? true : false; 
		}
	},
	warding_power : {
		name : "Warding Power", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I learn the Shield spell.",
		]),
		spellcastingBonus : {
			name : "Warding Power",
			spells : ["shield"],
			selection : ["shield"],
		},
		prereqeval : function(v) { 
			return classes.known.occultist.subclass.indexOf("shaman") !== -1 ? true : "skip"; 
		}
	},
};

//Lets the sheet know which spells are Occultist spells (also lets new spells be added later simply by the Occultist's inclusion in their "classes" entry.
[
	//Cantrips (0 level)
	"acid splash", "burn", "chill touch", "decaying touch", "dancing lights", "druidcraft", "fists of fire", "freeze", "guidance", "ice weapon", "illusionary dart", "impact", "light", "mending", "message", "minor illusion", "poison spray", "produce flame", "resistance", "shocking grasp",
	//1st level
	"animal friendship", "awaken rope", "bad blood", "bane", "bramble binding", "burning hands", "comprehend languages", "cure wounds", "crippling agony", "detect magic", "detect poison and disease", "disguise self", "electrify", "feather fall", "fog cloud", "gale bolt", "grip of the dead", "hex", "hideous laughter", "identify", "illusory script", "illusory pit", "inflict wounds", "induce headache", "karmic reflection", "lightning tendril", "nauseating poison", "speak with animals", "spiritual consultation", "stone fist", "unseen servant", "water blast",
	//2nd level
	"acid arrow", "alter self", "alacrity", "animal messenger", "animate object", "augury", "barkskin", "become fire", "become stone", "become water", "become wind", "blindness/deafness", "boil blood", "calm emotions", "crackle", "dancing wave", "darkness", "darkvision", "detect thoughts", "disorient", "earth ripple", "enlarge/reduce", "gentle repose", "heat metal", "hold person", "invisibility", "imbue luck", "lesser restoration", "locate object", "mirror image", "misty step", "poison dart", "protection from poison", "scorching ray", "see invisibility", "silence", "spider climb", "spike growth", "suggestion", "summon swarm", "web", "vicious hound", "vicious vapors",
	//3rd level
	"animate shadow", "bestow curse", "blink", "bramble barrier", "clairvoyance", "counterspell", "cruel puppetry", "dispel magic", "erode", "fear", "fly", "gaseous form", "haste", "hypnotic pattern", "illusionary fireball", "magic circle", "mutate", "nondetection", "plant growth", "quick sand", "rain of spiders", "remove curse", "sending", "sleet storm", "slow", "spider bite", "spirit guardians", "vampiric touch", "vortex blast", "water breathing", "water walk", "wind wall", "wither",
	//4th level
	"arcane eye", "banishment", "black tentacles", "blight", "compulsion", "confusion", "conjure minor elementals", "conjure woodland beings", "control water", "divination", "giant insect", "greater invisibility", "hallucinatory terrain", "ice storm", "locate creature", "polymorph", "poison puff", "secret chest", "stinging swarm", "stone coffin", "suffocate", "wall of fire",
	//5th level
	"acid rain", "animate objects", "awaken", "cloudkill", "commune with nature", "conjure elemental", "contact other plane", "contagion", "deglove creature", "dominate person", "dream", "field of stars", "geas", "greater restoration", "hold monster", "insect plague", "mass cure wounds", "mislead", "modify memory", "reincarnate", "scrying", "seeming", "sonic shriek", "sudden hazards", "wall of stone",
	//6th level
	"baba's walking hut", "conjure fey", "contingency", "eyebite", "find the path", "flesh to stone", "forbiddance", "freezing sphere", "harm", "heal", "magic jar", "mass suggestion", "sunbeam", "true seeing", "wall of ice", "wall of thorns", "wind walk",
	//7th level
	"finger of death", "fire storm", "mirage arcane", "plane shift", "prismatic spray", "project image", "regenerate", "resurrection", "sequester", "teleport", "twisting eruption",
	//8th level
	"abi-dalzim's horrid wilting", "animal shapes", "antipathy/sympathy", "clone", "control weather", "demiplane", "dominate monster", "earthquake", "feeblemind", "incendiary cloud", "maze", "mind blank", "power word stun", "tsunami",
	//9th level
	"astral projection", "foresight", "imprisonment", "manipulate fate", "power word kill", "shapechange", "true polymorph", "true resurrection", "weird",
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("occultist") === -1) SpellsList[s].classes.push("occultist");
});

ClassList["occultist"] = {
	name : "Occultist",
	regExpSearch : /^(?=.*occultist).*$/i,
	source : ["KT:Oc", 1],
	primaryAbility : "",
	prereqs : "13 Wisdom",
	die : 6,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Wis", "Cha"],
	skills : ["\n\n" + toUni("MyClass") + ": Choose two from Animal Handling, Arcana, Deception, History, Investigation, Medicine, Nature, Religion, Sleight of Hand, Stealth, and Survival.", "\n\n" + toUni("MyClass") + "Medicine"],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	
	toolProfs : {
		primary : [["Herbalism Kit"]],
		secondary : [["Herbalism Kit"]],
	},
	
	armor : [
		[true, false, false, false],
		[false, false, false, false]
	],
	
	weapons : [
		[false, false, ["dagger", "quarterstaff", "light crossbow"]]
		[false, false]
	],
	
	abilitySave : 5,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
		spells : [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20],
	},
		
	equipment : "MyClass starting equipment:" +
	"\n \u2022 A quarterstaff -or- a a dagger -or- one simple weapon (if proficient);" +
	"\n \u2022 A component pouch -or- an occult fetish;" +
	"\n \u2022 Leather armour -or- scale mail (if proficient);" +
	"\n \u2022 A herbalism kit.",

	subclasses : ["Occult Traditions", []], 
	features : {
		"subclassfeature1" : {
			name : "Occult Tradition",
			source : ["KT:Oc", 3],
			minlevel : 1,
			description : desc ([
			"Choose your Occult Tradition to put in the 'Class' field.",
			])
		},
		"spellcasting" : {
			name : "Spellcasting",
			source : ["KT:Oc", 3],
			minlevel : 1,
			description : desc([
				"I can cast Occultist cantrips/spells that I know, using Wisdom as my spellcasting ability.",
				"I can use an occult fetish as a spellcasting focus for my Occultist spells.",
				"I can cast Occultist spells I know as rituals if they have the ritual tag."
			]),
			additional : levels.map(function (n, idx) {
				var cantr = [3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx];
				var splls = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20][idx];
				return cantr + " cantrips \u0026 " + splls + " spells known";
			})
		},		
		"occult rites" : {
			name : "Occult Rites",
			source : ["KT:Oc", 4],
			minlevel : 2,
			description : desc ([
			"I gain access to Occult Rites. There are class Rites which are available to me regardless of",
			"my subclass, and subclass specific Rites. Use the \"Choose Feature\" button above to select",
			"your Occult Rites to add to the third page notes",
			]),
			additional : levels.map(function (n) {
				return (n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n< 15 ? 6 : n < 18 ? 7 : 8) + " Rites known";
			}),
			extraTimes : levels.map(function (n) {
				return (n < 2 ? 0 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8);
			}),	
			extraname : "Occult Rites",			
			extrachoices : [], //So the RunFunctionAtEnd at the bottom of the script has something to push to.
		},
		"traditional expertise" : {
			name : "Traditional Expertise",
			source : ["KT:Oc", 4],
			minlevel : 10,
			description : desc([
			"I choose a skill I have proficiency in from Animal Handling, Arcana, Medicine, Nature,",
			"Religion, and Survival. I gain expertise in the chosen ability. If I'm not proficient in any of",
			"the listed skills, I gain proficiency in my choice. Additionally, when I make a Wisdom ability",
			"check, I can expend a spell slot to gain advantage on the check.",
			]),
			skillstxt : "Expertise in one I'm already proficient in out of Animal Handling, Arcana, Medicine, Nature, Religion, or Survival, or proficiency if I don't have proficiency in any of them", 
		},
		"the old ways" : {
			name : "The Old Ways",
			source : ["KT:Oc", 4],
			minlevel : 20,
			description : desc([
			"I can cast all Occultist spells I know of third level and lower as rituals. When I cast a spell",
			"without the ritual tag in this way, it requires an extra 10 gp worth of material components",
			"to cast, and takes additional turns equal to the spell's level to cast. Spells with a casting",
			"time of a reaction cannot be cast as rituals."
			]),
		},
	},
};	

MagicItemsList["cursed magic item"] = { //From the Cursed Item class rite
	name : "Cursed Magic Item",
	source : [["KT:Oc", 18]],
	type : "wondrous item",
	rarity : "uncommon",
	description : "I choose a non-magical item and convert it into a Cursed Magic Item, selecting a magical property for it. While a creature other than me possesses this item, they are under the effects of the Bane spell.",
	descriptionFull : "You use a dark and secret rite to corrupt a non-magical item, causing it to become a cursed magic item. While any creature other than you is in possession of this item, they are under the effect of bane. Select one of the following for the item's magical property (the item must be of a type of itemthat could be the magical item selected): bag of tricks, brooch of shielding, goggles of night, lantern of revealing, or staff of the python (you can ignore attunement restrictions of this item). I can reselect the Corrupt Item rite to destroy this item and create a new one.",
	choices : ['Bag of Tricks', 'Brooch of Shielding', 'Goggles of Night', 'Lantern of Revealing', 'Staff of the Python'],
	
	"bag of tricks" : { // transcribed by Larry Hoy
		name: "Cursed Bag of Tricks",
		source: [["SRD", 210], ["D", 154]],
		type: "wondrous item",
		rarity: "uncommon",
		magicItemTable : "F",
		description: "This ordinary bag, made from gray, rust, or tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object; which, as an action, I can throw 20 ft, where it transforms into a random creature.",
		descriptionFull: "This ordinary bag, made from gray, rust, or tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag's color. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.",
		weight: 0.5,
		allowDuplicates : true,
		action : [["action", " (pull)"], ["bonus action", " (command)"]],
		usages : 3,
		recovery : "dawn",
		choices : ["Gray", "Rust", "Tan"],
		"gray" : {
			name: "Cursed Gray Bag of Tricks",
			sortname: "Bag of Tricks, Gray",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-weasel, 2-giant rat, 3-badger, 4-boar, 5-panther, 6-giant badger, 7-dire wolf, 8-giant elk. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-weasel, 2-giant rat, 3-badger, 4-boar, 5-panther, 6-giant badger, 7-dire wolf, 8-giant elk. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from gray cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tWeasel\n 2\tGiant rat\n 3\tBadger\n 4\tBoar\n 5\tPanther\n 6\tGiant badger\n 7\tDire wolf\n 8\tGiant elk"
		},
		"rust" : {
			name: "Cursed Rust Bag of Tricks",
			sortname: "Bag of Tricks, Rust",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-rat, 2-owl, 3-mastiff, 4-goat, 5-giant goat, 6-giant boar, 7-lion, 8-brown bear. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-rat, 2-owl, 3-mastiff, 4-goat, 5-giant goat, 6-giant boar, 7-lion, 8-brown bear. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from rust-colored cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tRat\n 2\tOwl\n 3\tMastiff\n 4\tGoat\n 5\tGiant goat\n 6\tGiant boar\n 7\tLion\n 8\tBrown bear"
		},
		"tan" : {
			name: "Cursed Tan Bag of Tricks",
			sortname: "Bag of Tricks, Tan",
			description: "As an action, 3 times per dawn, I can pull an object from this bag and throw it 20 ft. It transforms into a random creature when it lands (d8): 1-jackal, 2-ape, 3-baboon, 4-axe beak, 5-black bear, 6-giant weasel, 7-giant hyena, 8-tiger. It follows my commands, acts on my turn, and vanishes at dawn or if reduced to 0 HP.",
			descriptionLong: "As an action, I can pull a fuzzy object from this bag and throw it 20 ft. It transforms into a creature when it lands, determined randomly (d8): 1-jackal, 2-ape, 3-baboon, 4-axe beak, 5-black bear, 6-giant weasel, 7-giant hyena, 8-tiger. The creature is friendly, acts on my turn, and vanishes at the next dawn or when it is reduced to 0 HP. As a bonus action, I can command it how to move and what action to take on its next turn, or give it general orders (e.g. attack my enemies). Without orders, it acts as it normally would. Once three fuzzy objects have been pulled from the bag, it can't be used again until the next dawn.",
			descriptionFull: "This ordinary bag, made from tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs \u00BD pound.\n   You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table. The creature vanishes at the next dawn or when it is reduced to 0 hit points.\n   The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\n   Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\n\n" + toUni("d8\tCreature") + "\n 1\tJackal\n 2\tApe\n 3\tBaboon\n 4\tAxe beak\n 5\tBlack bear\n 6\tGiant weasel\n 7\tGiant hyena\n 8\tTiger"
		}
	},
	"brooch of shielding" : { // transcribed by Smashman
		name : "Cursed Brooch of Shielding",
		source : [["SRD", 212], ["D", 156]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "While wearing this brooch, I have resistance to force damage, and have immunity to damage from the Magic Missile spell.",
		descriptionFull : "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the Magic Missile spell.",
		attunement : true,
		dmgres: ["Force"],
		savetxt: {
			immune: ["Magic Missile spell"]
		}
	},
	"goggles of night" : { // transcribed by AelarTheElfRogue
		name : "Cursed Goggles of Night",
		source : [["SRD", 224], ["D", 172]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "While wearing these dark lenses, I have darkvision out to a range of 60 feet. If I already have darkvision. wearing the goggles increases its range by 60 feet.",
		descriptionFull : "While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision. wearing the goggles increases its range by 60 feet.",
		vision : [["Darkvision", "fixed 60"], ["Darkvision", "+60"]]
	},
	"lantern of revealing" : { // transcribed by MPMB
		name : "Cursed Lantern of Revealing",
		source : [["SRD", 228], ["D", 179]],
		type : "wondrous item",
		rarity : "uncommon",
		magicItemTable : "B",
		description : "This lantern burns for 6 hours on 1 pint of oil. It shines bright light in a 30-ft radius and dim light for an additional 30 ft. Invisible objects and creatures are visible in the lantern's bright light. As an action, I can lower the hood, making it only dim light in a 5-ft radius.",
		descriptionFull : "While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius.",
		weight : 2,
		action : [["action", " (hood up/down)"]]
	},
	"staff of the python" : { // transcribed by MPMB
		name : "Cursed Staff of the Python",
		source : [["SRD", 245], ["D", 204]],
		type : "staff",
		rarity : "uncommon",
		magicItemTable : "F",
		description : "As an action, I can speak the command word and throw this staff to have it become a giant constrictor snake within 10 ft with full HP. It has its own initiative. I can command it mentally on my turn if within 60 ft. As a bonus action, I can command it to revert back to a staff. If the snake reaches 0 HP, the staff is destroyed.",
		descriptionLong : "As an action, I can speak this staff's command word and throw the staff on the ground within 10 ft where it becomes a giant constrictor snake. As a bonus action, I can speak the command word again to have it return to its staff form. The snake acts on its own initiative count. On my turn, I can mentally command the snake if it is within 60 ft of me and I'm not incapacitated, deciding what it does on its next turn or a more general command. If the snake is reduced to 0 HP, it dies, reverts to its staff form, and the staff then shatters and is destroyed. Otherwise, the snake always starts out with full HP.",
		descriptionFull : "You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake.\n   On your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. You decide what action the snake takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location.\n   If the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them.",
		attunement : true,
		weight : 4,
		prerequisite : "Requires attunement by a cleric, druid, or warlock",
		prereqeval : function(v) { return classes.known.cleric || classes.known.druid || classes.known.warlock ? true : false; },
		action : [["action", " (animate)"], ["bonus action", " (end)"]]
	},
},
MagicItemsList["spatial storage item"] = { //From the Spatial Storage class rite
	name : "Spatial Storage Item",
	source : [["KT:Oc", 19]],
	type : "wondrous item",
	rarity : "uncommon",
	description : "I can convert a pocket, ring, hat, or bag into a spatial storage device. It can carry 5 times my Occultist level pounds of weight, and has half my Occultist level cubic feet of storage space. I can use an action to store or retrieve an item, and if lost, I can recreate this device during a short rest.",
	descriptionFull : "You can convert a pocket, ring, hat, or bag into a spatial storage device, capable of carrying up to 5 x your Occultist level pounds, with 0.5 x your Occultist level cubic feet of storage space. For example, a level 5 Occultist can store up to 25 pounds, not exceeding a volume of 2.5 cubic feet, within the storage space. As an action, you can send an item you are holding into the storage space or retrieve an item from the storage space to your hand. If lost, you can recreate the spatial storage device during a short rest.",
	additional : levels.map(function (n) { 
		return (5 * n) + " lbs, " + (n / 2) + " cubic ft.";
	}),
}, //Not adding a choice of item to this one, since it doesn't actually affect the functionality of the magic item in any way.
	
AddSubClass("occultist", "tradition of the witch", {
		regExpSearch : /^(?=.*witch).*$/i,
		subname : "Witch",
		source : ["KT:Oc", 5],
		fullname : "Witch Tradition Occultist",
		features : {
			"subclassfeature1" : {
				name : "Witch's Magic",
				source : ["KT:Oc", 5],
				minlevel : 1,
				description : desc ([
				"I learn the Find Familiar spell. Familiars I summon act after my initiative in combat.",
				"Additionally, I learn two additional cantrips of my choice from the Occultist list.",
				]),
				spellcastingBonus : [{	
					name : "Witch's Magic",
					"class" : ["occultist"],
					level : [0, 0],
					times : 2,
				}, {
					name : "Find Familiar",
					spells : ["find familiar"],
					selection : ["find familiar"],
				}],
				spellChanges : {
					"find familiar" : {
						descriptionFull : "You gain the service of a familiar, a spirit that takes an animal form you choose - bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey or fiend (your choice) instead of a beast." + "\n   " + "Your familiar acts independently of you, but it always obeys your commands. In combat, it acts after your initiative. A familiar can't attack, but it can take other actions as normal." + "\n   " + "When the familiar drops to 0 hit points, it disappears, leaving behind no physical form. It reappears after you cast this spell again. While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses." + "\n   " + "As an action, you can temporarily dismiss your familiar. It disappears into a pocket dimension where it awaits you summons. Alternatively, you can dismiss it forever. As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you." + "\n   " + "You can't have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Choose one of the forms from the above list. Your familiar transforms into the chosen creature." + "\n   " + "Finally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an attack roll, you use your attack modifier for the roll."
					},
				}, //Updating spell's full description to reflect the familiar's initiative change.
			},		
			"subclassfeature1.1" : {
				name : "Coven",
				source : ["KT:Oc", 5],
				minlevel : 1,
				description : desc ([
				"Use the \"Choose Feature\" button above to select a coven, granting me bonus spells based",
				"on level, and certain features at higher levels.",
				]),
				choices : ["Black Coven", "White Coven", "Green Coven"],
				
				"black coven" : {
					name : "Black Coven", 
					source : ["KT:Oc", 5],
					description : desc ([
					"I learn extra spells at 1st, 3rd, 5th, 7th, and 9th levels, and the Black Coven Familiar",
					"Bond feature at 3rd level.",
					]),
					spellcastingBonus : {
						name : "Black Coven",
						spells : ["rotting curse", "hideous laughter", "blindness/deafness", "darkness", "bestow curse", "curse of doom", "black tentacles", "devour shadow", "killing curse", "contagion"],
						selection : ["rotting curse", "hideous laughter", "blindness/deafness", "darkness", "bestow curse", "curse of doom", "black tentacles", "devour shadow", "killing curse", "contagion"],
						times : [2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
					},
					//spellcastingExtra : ["rotting curse", "hideous laughter", "blindness/deafness", "darkness", "bestow curse", "curse of doom", "black tentacles", "devour shadow", "killing curse", "contagion"],
					dependentChoices : "black coven bond",
				},
				"white coven" : {
					name : "White Coven", 
					source : ["KT:Oc", 6],
					description : desc ([
					"I learn extra spells at 1st, 3rd, 5th, 7th, and 9th levels, and the White Coven Familiar",
					"Bond feature at 3rd level.",
					]),
					spellcastingBonus : {
						name : "White Coven",
						spells : ["blinding hex", "healing word", "calm emotions", "hold person", "karmic hex", "mass healing word", "banishment", "resilient sphere", "enfeebling hex", "dispel evil and good"],
						selection : ["blinding hex", "healing word", "calm emotions", "hold person", "karmic hex", "mass healing word", "banishment", "resilient sphere", "enfeebling hex", "dispel evil and good"],
						times : [2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
					},
					//spellcastingExtra : ["blinding hex", "healing word", "calm emotions", "hold person", "karmic hex", "mass healing word", "banishment", "resilient sphere", "enfeebling hex", "dispel evil and good"],
					dependentChoices : "white coven bond",
				},
				"green coven" : {
					name : "Green Coven", 
					source : ["KT:Oc", 6],
					description : desc ([
					"I learn extra spells at 1st, 3rd, 5th, 7th, and 9th levels, and the Green Coven Familiar",
					"Bond feature at 3rd level.",
					]),
					spellcastingBonus : {
						name : "White Coven",
						spells : ["befuddling curse", "entangle", "alter self", "enlarge/reduce", "curse of misfortune", "major image", "greater invisibility", "polymorph", "swapping curse", "seeming"],
						selection : ["befuddling curse", "entangle", "alter self", "enlarge/reduce", "curse of misfortune", "major image", "greater invisibility", "polymorph", "swapping curse", "seeming"],
						times : [2, 2, 4, 4, 6, 6, 8, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
					},
					//spellcastingExtra : ["befuddling curse", "entangle", "alter self", "enlarge/reduce", "curse of misfortune", "major image", "greater invisibility", "polymorph", "swapping curse", "seeming"],
					dependentChoices : "green coven bond",
				},
				choiceDependencies : [{
					feature : "subclassfeature3",
					choiceAttribute : true
				}]
			},	
			"subclassfeature3" : {
				name : "Familiar Bond",
				source : ["KT:Oc", 6],
				minlevel : 3,
				description : desc ([
				"When I cast the Find Familiar spell, my familiar gains an Intelligence, Wisdom, and",
				"Charisma of 10, and can speak any languages I can. Whenever it takes damage, I can",
				"choose to redirect all damage it would take to myself. I can also cast spells with a material",
				"component if my familiar has access to that material component.",
				"Additionally, I gain extra effects based on my selected Coven",
				]),
				calcChanges : {
					companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
						if (sCompType !== "familiar") return;
							var str = "\u25C6 Familiar Bond: This familiar has an Intelligence, Wisdom, and Charisma score of 10 if those scores weren't already greater than 10, and it can speak any language its master speaks.";
							var aFnc = bAdd ? AddString : RemoveString;
							aFnc(prefix + "Comp.Use.Traits", str, true);
							//This function just adds the var str to the traits section of the companion page
							
							for (var i = 3; i < AbilityScores.abbreviations.length; i++) {
								var abi = AbilityScores.abbreviations[i];
								if (tDoc.getField(prefix + "Comp.Use.Ability." + abi + ".Score").value < 10) Value(prefix + "Comp.Use.Ability." + abi + ".Score", 10);
							} //This code checks if int, wis, and cha are lower than 10, and sets them to 10 if they are
					}, "The familiars I create using the Find Familiar spell gain 10 Int., Wis. and Cha., and speak all of my known languages."],
				},			
				choices : ["black coven bond", "white coven bond", "green coven bond"],
				choicesNotInMenu : true,

				"black coven bond" : {
					name : "Familiar Bond - Black Coven", 
					description : desc ([
					"When I cast the Find Familiar spell, my familiar gains an Intelligence, Wisdom, and",
					"Charisma of 10, and can speak any languages I can. Whenever it takes damage, I can",
					"choose to redirect all damage it would take to myself. I can also cast spells with a material",
					"component if my familiar has access to that material component.",
					"Additionally, as a reaction (free action for familiar) to a creature within 30 feet of my",
					"familiar making an attack, I can have my familiar subtract 1d4 + half my Occultist level",
					"(rounded down) from the attack roll. It can do this a number of times equal to my Wisdom",
					"modifier per long rest."
					]),
					
					limfeaname : "Familiar Bond",
					action : ["reaction", ""],
					additional : levels.map(function (n) { 
						return "-1d4 + " + Math.floor(n / 2) + " from enemy attack roll";
					}),
					usagescalc : "event.value = What('Wis Mod');",
					recovery : "long rest",
				},
				"white coven bond" : {
					name : "Familiar Bond - White Coven", 
					description : desc ([
					"When I cast the Find Familiar spell, my familiar gains an Intelligence, Wisdom, and",
					"Charisma of 10, and can speak any languages I can. Whenever it takes damage, I can",
					"choose to redirect all damage it would take to myself. I can also cast spells with a material",
					"component if my familiar has access to that material component.",
					"Additionally, when I finish a long rest, my familiar gains temporary hit points equal to my",
					"Wisdom modifier + twice my Occultist level. While it has temporary hit points, as an",
					"action it can teleport to a creature within 30 feet, granting the creature one or more of",
					"those temporary hit points. I can direct it to do this as a reaction (free action for familiar)",
					"to a creature within 30 feet of me taking damage."
					]),
					limfeaname : "Familiar Bond",
					action : ["reaction", ""],
					additional : levels.map(function (n) { 
						return "Familiar gains " + Math.floor(n / 2) + " + Wis mod * 2 temp. HP";
					}),
				},
				"green coven bond" : {
					name : "Familiar Bond - Green Coven", 
					description : desc ([
					"When I cast the Find Familiar spell, my familiar gains an Intelligence, Wisdom, and",
					"Charisma of 10, and can speak any languages I can. Whenever it takes damage, I can",
					"choose to redirect all damage it would take to myself. I can also cast spells with a material",
					"component if my familiar has access to that material component.",
					"Additionally, when I finish a long rest, my familiar gains a number of illusory duplicates",
					"equal to my Wisdom modifier (minimum one), which last until destroyed or until I next",
					"complete a long rest. These duplicates can only move and act like my familiar during my",
					"turn, stay within 30 of me or it, and are immune to damage while within 5 feet of me.",
					"When my familiar ends a turn or takes damage, it can swap places with a duplicate as a",
					"free action, destroying it and taking no damage in the latter case.",
					]),
				},
			},
			"subclassfeature6" : {
				name : "Witch's Touch",
				source : ["KT:Oc", 6],
				minlevel : 6,
				description : desc ([
				"Whenever I cast a spell with a range of touch, I can add one of the following modifiers",
				"to the spell:",
				"\u2022 I grant one affected target temporary hit points equal to my Wisdom modifier. Only",
				"one creature at a time can have these hit points.",
				"\u2022 The spell deals additional damage to one affected creature equal to my Wisdom modifier.",
				"\u2022 The spell adds or subtracts 1d4 from the targets next attack roll or saving throw before",
				"my next turn.",
				"I can also apply these effects with longer range spells by casting them with a range of",
				"touch (curse spells don't require material components), and I can apply them as an action",
				"without casting a spell (melee spell attack against unwilling creatures).",
				]),
				action : ["action", " (without spell)"]
			},
			"subclassfeature14" : {
				name : "Master of Curses",
				source : ["KT:Oc", 6],
				minlevel : 14,
				description : desc ([
				"My curse spells no longer require a material component. Additionally, casting the Hex",
				"spell or curse spells at 1st level allows me to maintain concentration on another spell at",
				"the same time. I can maintain concentration on a maximum of 2 spells at once, and one must",
				"be a Hex or curse spell.",
				]),
			},		
		}
	}
);
AddSubClass("occultist", "tradition of the hedge mage", {
		regExpSearch : /^(?=.*hedge)(?=.*mage).*$/i,
		subname : "Hedge Mage",
		source : ["KT:Oc", 5],
		fullname : "Hedge Mage Tradition Occultist",
		features : {
			"subclassfeature1" : {
				name : "Practical Skills",
				source : ["KT:Oc", 10],
				minlevel : 1,
				description : desc ([
				"I gain proficiency in either Animal Handling, Arcana, Medicine, Nature, or Survival. All",
				"Wizard and Druid cantrips are added to my spell list, as well as the Thaumaturgy cantrip,",
				"and I learn an additional cantrip of my choice.", //Adding The Way I Learned It as a seperate subclass feature.
				]),
				skillstxt : "Proficiency in one from Animal Handling, Arcana, Medicine, Nature, or Survival.",

				spellcastingBonus : [{
					name : "Practical Skills (cantrip)",
					level : [0, 0],
					spells : ["thaumaturgy"],
					selection : ["thaumaturgy"],
				}, {
					name : "Practical Skills (extra cantrip)",
					"class" : ["druid", "wizard" , "occultist"],
					level : [0, 0],
					times : 1,
				}],
				calcChanges : {
					spellList : [
						function(spList, spName, spType) {
							//Add the extra spells.
							spList.extraspells = spList.extraspells.concat(CreateSpellList({"class" : ["wizard", "druid"], level : [0, 0]}, false, false, false));
						},
						"All Wizard and Druid cantrips are added to my spell list."
					],
				}
			},		
			"subclassfeature1.1" : { //I really don't know if there's a way for me to program this in unfortunately. It would involve editing spells on the list, which would then be reset if any other spells were added, given how the pdf works. I'll keep looking into this though.
				name : "The Way I Learned It",
				source : ["KT:Oc", 10],
				minlevel : 1,
				description : desc ([
				"When I learn a new spell, I can modify its properties in any number of the following ways.",
				"These modifications are permanent, but I can learn the same spell multiple times with",
				"different effects:",
				"\u2022 Damage Type: If a spell does acid, cold, fire, or lightning damage, I can swap the damage",
				"type for another out of those.",
				"\u2022 Range: I can make a spell with a range of more than 10 feet have a range of Touch, and",
				"vice versa. Melee spell attacks become ranged spell attacks.",
				"\u2022 Components: I can exchange a spell's verbal, somatic, or material components for another",
				"it wouldn't normally have. Material components with a cost must be exchanged for a",
				"different material component of equal cost.",
				]), 
			},
			"subclassfeature1.2" : {
				name : "Casting Style",
				source : ["KT:Oc", 10],
				minlevel : 1,
				description : desc ([
				"Use the \"Choose Feature\" button above to select a casting style.",
				]),
				choices : ["Reliable Casting", "Habitual Casting", "Tactical Casting"],
				"reliable casting" : {
					name : "Reliable Casting",
					source : ["KT:Oc", 10],
					description : desc([
						"When I roll a 1 or 2 on an Occultist cantrip's damage die, I can reroll the die, and must use",
						"the new roll",
					]),
				}, 
				"habitual casting" : {
					name : "Habitual Casting",
					source : ["KT:Oc", 10],
					description : desc([
						"When I cast an Occultist cantrip that requires concentration, I can cause the effect to last",
						"without concentration for a number of rounds equal to my Occultist level. Spells persisting",
						"in this way can be ended with an action.",
					]),
					additional : levels.map(function (n) {
						return n + " rounds total";
					}),
					action : ["action", " (end spell early)"],
				},
				"tactical casting" : {
					name : "Tactical Casting",
					source : ["KT:Oc", 10],
					description : desc([
						"When I take the Ready action with an Occultist cantrip, keeping the spell readied doesn't",
						"require concentration.",
					]),
				},
			},			
			"subclassfeature3" : {
				name : "Personalised Path",
				source : ["KT:Oc", 10],
				minlevel : 3,
				description : desc ([
				"I gain one extra spell known, and one extra Occult Rite.",
				]),
				bonusClassExtrachoices : [{
					"class" : "occultist",
					"feature" : "occult rites",
					"bonus" : 1
				}], //Gives the player one extra choice of any of their available rites
				spellcastingBonus : {
					name : "Personalised Path",
					level : [1,9],
				},
			},
			"subclassfeature3.1" : {
				name : "Improvised Ritual",
				source : ["KT:Oc", 10],
				minlevel : 3,
				description : desc ([
				"I can cast spells with the ritual tag without knowing that spell. When I do, it takes the",
				"additional time to cast as normal, and consumes a spell slot. I can improvise spells of a",
				"level up to a third of my Occultist level, and must have the spell in written form if it isn't",
				"on the Occultist spell list.",
				]),
				additional : levels.map(function (n) { 
					return "Can improvise level " + Math.floor(n/3) + " rituals."; 
				}),
			},
			"subclassfeature6" : {
				name : "Stolen Techniques",
				source : ["KT:Oc", 11],
				minlevel : 6,
				description : desc ([
				"I learn a bonus 1st or 2nd level spell from the Bard, Cleric, Druid, or Wizard spell list. I",
				"also learn an extra Occultist Rite of my choice (this can include subclass-specific Rites).",
				]),
				spellcastingBonus : {
					name : "Stolen Techniques",
					level : [1,2],
					"class" : ["bard", "cleric", "druid", "wizard"],
				},
				
				choices : [], //So the RunFunctionAtEnd at the bottom of the script has something to push to.
			},
			"subclassfeature6.1" : {
				name : "Empowered Cantrips",
				source : ["KT:Oc", 11],
				minlevel : 6,
				description : desc ([
				"Once per turn when I roll damage for an Occultist cantrip, I can add my Wisdom modifier",
				"to the damage dealt.",
				]),
			},
			"subclassfeature14" : {
				name : "Cantrip Mastery",
				source : ["KT:Oc", 11],
				minlevel : 14,
				description : desc ([
				"I can cast Occultist cantrips with a casting time of one action as a bonus action. They are",
				"cast as if I am 1st level when cast in this way.",
				]),
				action : ["bonus action", " (1a cantrip at 1st lvl.)"],
			},	
		}
	}
);
AddSubClass("occultist", "tradition of the oracle", {
		regExpSearch : /^(?=.*oracle).*$/i,
		subname : "Oracle",
		source : ["KT:Oc", 12],
		fullname : "Oracle Tradition Occultist",
		features : {
			"subclassfeature1" : {
				name : "Mystery Unveiled",
				source : ["KT:Oc", 10],
				minlevel : 1,
				description : desc ([
				"Use the \"Choose Feature\" button above to select a mystery. I gain bonus spells from my",
				"chosen mystery. I also gain access to Revelations, special Oracle Rites that are triggered",
				"when I cast a spell.", //Doing Oracle's Curse as a separate feature
				]),
				
				//Add the extra spells from Divine Touch
				spellcastingBonus : [{ 
					name : "Divine Touch (cantrips)",
					spells : ["thaumaturgy", "guidance"],
					selection : ["thaumaturgy", "guidance"],
					times : 2,
				}, {
					name : "Divine Touch",
					spells : ["identify", "locate object", "clairvoyance", "locate creature", "legend lore"],
					selection : ["identify", "locate object", "clairvoyance", "locate creature", "legend lore"],
				}],
				extraname : "Mystery",
				extrachoices : ["Mystery of Death", "Mystery of Fire", "Mystery of Life", "Mystery of War", "Mystery of Souls", "Mystery of Light", "Mystery of Darkness"],
				extraTimes : levels.map(function (n) {
					return n < 5 ? 1 : n < 11 ? 2 : 3;
				}),
				"mystery of death" : {
					name : "Mystery of Death",
					source : ["KT:Oc", 12],
					spellcastingExtra :  ["false life", "gentle repose", "wither", "blight", "killing curse"],
					},
				"mystery of fire" : {
					name : "Mystery of Fire",
					source : ["KT:Oc", 13],
					spellcastingExtra : ["burning hands", "continual flame", "fireball", "fire shield", "pyroclastic lance"],
				},
				"mystery of life" : {
					name : "Mystery of Life",
					source : ["KT:Oc", 13],
					spellcastingExtra : ["healing word", "aid", "mass healing word", "vital surge", "mass cure wounds"],
				},
				"mystery of war" : {
					name : "Mystery of War",
					source : ["KT:Oc", 13],
					spellcastingExtra : ["bless", "iron wind strike", "whirling conflagration", "dimension cutter", "flickering strikes"],
				},
				"mystery of souls" : {
					name : "Mystery of Souls",
					source : ["KT:Oc", 13],
					spellcastingExtra : ["unseen servant", "spiritual weapon", "spirit guardians", "guardian of faith", "raise dead"],
				},
				"mystery of light" : {
					name : "Mystery of Light",
					source : ["KT:Oc", 13],
					spellcastingExtra : ["prismatic flash", "moonbeam", "daylight", "greater invisibility", "field of stars"],
				},
				"mystery of darkness" : {
					name : "Mystery of Darkness",
					source : ["KT:Oc", 13],
					spellcastingExtra : ["illusory pit", "darkness", "hungering void", "devour shadow", "devouring darkness"],
				},
			},
			"subclassfeature1.1" : {
				name : "Oracle's Curse",
				source : ["KT:Oc", 10],
				minlevel : 1,
				description : desc ([
				"Use the \"Choose Feature\" button above to OPTIONALLY select an Oracle's Curse, which",
				"grants me a divine boon, but also burdens me with a curse of some kind.",
				]),
				choices : ["Blind", "Frail", "Burned (prereq: Mystery of Fire)", "Forsworn"],
				//not adding these as a separate variable, since they're only used here as far as I can tell.
				"blind" : {
					name : "Blind", 
					source : ["KT:Oc", 12],
					description : desc ([
					"I am permanently blinded, but I gain Oracle's Sight as a bonus rite.",
					]),
					vision : [["Blind"]],
					//Below code gives the player an extra rite (since this is a bonus), then auto selects the rite in question. removing/changing this feature choice deselects it, and removes the extra rite granted.
					bonusClassExtrachoices : [{
						"class" : "occultist",
						"feature" : "occult rites",
						"bonus" : 1
					}],
					eval : function() {
						ClassFeatureOptions(["occultist", "occult rites", "oracle's sight", 'extra']);
					},
					removeeval : function() {
						ClassFeatureOptions(["occultist", "occult rites", "oracle's sight", 'extra'], "remove");
					},
					
				},
				"frail" : {
					name : "Frail", 
					source : ["KT:Oc", 12],
					description : desc ([
					"My hit dice are d4s, and my health is altered as such. Once per day after a short rest, I",
					"can regain spell slots with a combined level equal to half my Oracle level.",
					]),
					die : 4,
					additional : levels.map(function (n) {
						var lvls = Math.ceil(n / 2);
						return lvls + " level" + (lvls > 1 ? "s" : "") + " of spell slots";
					}),
					usages : 1,
					recovery : "dawn",
					//eval function that is able to dynamically change the character object's hit dice.
					//provided by MPMB
					eval : function() { 
						var newDie = 4;
						CurrentClasses['occultist'].die = newDie;
						ClassSubList['occultist-tradition of the oracle'].die = newDie;
						// Call (parts of) built-in sheet funtions to update the HD fields and global variables
						FindClasses(true);
						var hdChanged = false;
						if (classes.hd.length > 0) classes.hd.sort(function (a, b) { return a - b; }); // sort by biggest HD
						for (var i = 0; i < 3; i++) { // loop through the 3 HD fields
							var hdLvl = classes.hd[i] ? Math.min(classes.hd[i][1], 999) : "";
							var hdDie = classes.hd[i] ? classes.hd[i][0] : "";
							if (!hdChanged) hdChanged = What("HD" + (i+1) + " Level") != hdLvl || What("HD" + (i+1) + " Die") != hdDie;
							Value("HD" + (i+1) + " Level", hdLvl);
							Value("HD" + (i+1) + " Die", hdDie);
						}
						// If the HD changed, prompt the user about this and update the HP tooltip
						if (hdChanged || CurrentEvals.hp) CurrentUpdates.types.push("hp");
					},
				},
				"burned (prereq: mystery of fire)" : {
					name : "Burned (prereq: Mystery of Fire)", 
					source : ["KT:Oc", 12],
					description : desc ([
					"I have disadvantage on weapon attack rolls and Dexterity (Sleight of Hand) checks. I gain",
					"the Truth of Fire rite as a bonus rite.",
					]),
					advantages : [["Sleight of Hand", false]],
					prereqeval : function(v) { 
						return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1; 
					},
					//Below code gives the player an extra rite (since this is a bonus), then auto selects the rite in question. removing/changing this feature choice deselects it, and removes the extra rite granted.
					bonusClassExtrachoices : [{
						"class" : "occultist",
						"feature" : "occult rites",
						"bonus" : 1
					}],
					calcChanges : {
						atkAdd : [
							function (fields, v) {
								if (!v.isSpell) {
									fields.Description += (fields.Description ? '; ' : '') + 'Disadv. on atk. roll'
								}
							}],
					},
					eval : function() {
						ClassFeatureOptions(["occultist", "occult rites", "truth of fire (prereq: mystery of fire)", 'extra']);
					},
					removeeval : function() {
						ClassFeatureOptions(["occultist", "occult rites", "truth of fire (prereq: mystery of fire)", 'extra'], "remove");
					},
				},
				"forsworn" : {
					name : "Forsworn", 
					source : ["KT:Oc", 12],
					description : desc ([
					"I cannot reveal the result of Divination spells to anyone else. The casting time of",
					"Divination spells that take 1 minute is reduced to 1 action.",
					]), //No need to code anything else for this.
				},
			},
			"subclassfeature3" : {
				name : "Fate Reading",
				source : ["KT:Oc", 13],
				minlevel : 3,
				description : desc ([
				"A number of times equal to my Proficiency Bonus per long rest when I am hit by an attack,",
				"I can use my reaction to add my Wisdom modifier to my AC against the triggering attack,",
				"lasting until the start of my next turn.",
				"I also learn to cast the Augury spell at will, but do not lose the drawbacks of casting it",
				"multiple times.",
				]),
				action :["reaction", " (Wis. mod. to AC)"],
				usagescalc : "event.value = How('Proficiency Bonus');",
				recovery : "long rest",
				spellcastingBonus : [{ 
					name : "Fate Reading",
					spells : ["augury"],
					selection : ["augury"],
					firstCol : "atwill",
				}],
			},
			"subclassfeature6" : {
				name : "Enlightened Understanding",
				source : ["KT:Oc", 14],
				minlevel : 6,
				description : desc ([
				"Whenever I activate a Revelation, I gain my Wisdom modifier in temporary Hit Points.",
				"Additionally, I can trigger a Revelation when I cast a 1st level spell that doesn't otherwise",
				"meet its requirements.",
				]),
			},
			"subclassfeature14" : {
				name : "Master of Prophecy",
				source : ["KT:Oc", 14],
				minlevel : 14,
				description : desc ([
				"I can cast the Augury spell a number of times equal to my Wisdom modifier per day",
				"before its chance to return random answers begins.",
				"Additionally, when I cast the Augury spell, I can pick three specific rolls that may occur",
				"within the next 30 minutes. If I specify only the roll type, a d4 is reserved and can be",
				"added to that roll when it occurs. If I specify a specific action and person to do it, this",
				"dice is a d6. These dice can only be used for a single roll, at my discretion.",
				]),
			},
			limfeaname : "Augury (no random answers)",
			usagescalc : "event.value = What('Wis Mod');",
		}
});
AddSubClass("occultist", "tradition of the shaman", {
		regExpSearch : /^(?=.*shaman).*$/i,
		subname : "Shaman",
		source : ["KT:Oc", 16],
		fullname : "Shaman Tradition Occultist",
		attacks : [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"subclassfeature1" : {
				name : "Call Spirit",
				source : ["KT:Oc", 16],
				minlevel : 1,
				description : desc ([
				"As a bonus action, I call forth and bond myself to a primordial spirit of fire, cold, or",
				"lightning, or an ancestral spirit of radiant or ncerotic power. While bonded, my melee",
				"weapon attacks deal +1d4 damage of the spirit's type. Upon summoning it, or as a",
				"bonus action afterwards, I can manifest it in a space within 30 ft. While manifested, I can",
				"replace attack actions I make with melee spell attacks made by the spirit, which deal 1d4",
				"+ my Wisdom modifier of the spirit's damage type on hit.",
				"I can move the spirit up to 30 ft. or recall it as a bonus action. The spirit is recalled if it is",
				"more than 60 ft. away from me. My called spirit can be released as an action, or if I call",
				"another spirit type.",
				]),
				action : [
				["bonus action", " (call, manifest/recall)"],
				["action", " (release)"],
				],
			},
			"subclassfeature1.1" : {
				name : "Spiritual Warrior",
				source : ["KT:Oc", 16],
				minlevel : 1,
				description : desc ([
					"I gain proficiency in simple weapons, medium armor, and shields, and my hit point",
					"maximum increases by 1, increasing by 1 each time I gain a level in this class. Additionally,",
					"I can use Wisdom instead of Dexterity when calculating the AC of light or medium armor.",
				]),
				
				armorProfs : [false, true, false, true],
				weaponProfs : [true, false],
				extraAC : [{
					name : "Spiritual Warrior (replace Dex)", 
					mod : "Wis", 
					magic : false, 
					text : "I can use Wisdom instead of Dexterity when calculating the AC of light or medium armor. (Though the Dex. stat still calculates, ignore it when this effect is applied.)",
					stopeval : function (v) { 
						return (v.heavyArmor || !v.wearingArmor);
					}
				}], //Not sure if there's a way to stop the dex calculation for extraac, though I know there is when adding new armor entirely (dex : -10).
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						return [classes.known.occultist.level, "Spiritual Warrior (Occultist)"];
					},
				} //+1 HP, then +1 for every level afterwards, effectively, add level to HP
			},
			"subclassfeature3" : {
				name : "Empowered Spirits",
				source : ["KT:Oc", 16],
				minlevel : 3,
				description : desc ([
				"When I bond myself to a spirit using Call Spirit, I can expend a spell slot to empower it.",
				"While empowered, the spirit deals additional damage, and I regain a number of",
				"temporary hit points depending on the spell slot used to empower the spirit.",
				"See the third page notes for a full list of effects.",
				]),
				toNotesPage : [{
					name : "Empowered Spirit Effects",
					note : "\n Spell Slot\t Extra Weapon Dmg.\t Manifested Dmg.\t Temp. HP" + desc([
						" 1st\t 1d6\t\t 2d4\t\t 1",
						" 2nd\t 1d8\t\t 2d6\t\t 2",
						" 3rd\t 1d10\t\t 2d6\t\t 3",
						" 4th\t 1d12\t\t 2d8\t\t 4",
						" 5th\t 1d12\t\t 2d8\t\t 5"
					]),
					page3notes : true,
				}]
			},
			"subclassfeature14" : {
				name : "Spiritual Empowerment",
				source : ["KT:Oc", 16],
				minlevel : 14,
				description : desc ([
				"When I cast a spell of 1st level or high, I can make a single weapon attack as a bonus",
				"action. This attack can be made through a manifested spirit.",
				]),
				action : ["bonus action", " (after spell)"],
			},	
		}
	}
);

//Adds the Occultist Fan Content Patch spells as an optional feature.
AddFeatureChoice(ClassList.occultist.features.spellcasting, true, "Access to Occultist Fan Content Patch Spells", {
	name : "Dunamancy Spells",
	extraname : "Optional Occultist 1",
	source : ["OFCP", 0],
	description : desc([
		"All spells from the Occultist Fan Content Patch are added to the Occultist spell list."
	]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "occultist" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["create bonfire", "frostbite", "gust", "infestation", "lightning lure", "magic stone", "mold earth", "primal savagery", "shape water", "thorn whip", "absorb elements", "beast bond", "cause fear", "ceremony", "dissonant whispers", "hail of thorns", "ice knife", "ray of sickness", "tasha's caustic brew", "healing spirit", "shadow blade", "summon beast", "catnap", "life transference", "summon undead", "wall of water", "charm monster", "elemental bane", "shadow of moil", "summon elemental", "vitriolic sphere", "watery sphere", "danse macabre", "enervation", "negative energy flood", "skill empowerment", "transmute rock", "bones of the earth", "create homunculus", "mental prison", "move earth", "primordial ward", "soul cage", "tasha's otherworldly guise", "power word pain", "whirlwind", "maddening darkness", "invulnerability", "power word heal", "psychic scream"]);
			},
			"This optional class feature expands the spell list of the Occultist class with all spells from the Occultist Fan Content Patch (full list available at: https://www.gmbinder.com/share/-NMc60Jc6p0syX8gRGoi)"
		]
	}
}, "Optional 1st-level Occultist features");

//ADDING WITCH CURSES AND HEXES
SpellsList["befuddling curse"] = {
	name : "Befuddling Curse",
	classes : [], //These spells are exclusively granted by the Witch Covens
	source : ["KT:Oc", 8],
	level : 1,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	save : "Wis",
	description : "Swap 2 things crea can see. Crea Wis. save to realise.",
	descriptionFull : "You befuddle a creature's mind, swapping the position of two things it can see that are of the same size and category (for example, two medium creatures or two gargantuan buildings). The target creature must make a Wisdom saving throw. On failure, it is unaware the two things have been swapped. \nEach time the creature interacts with, attacks, or is attacked by a swapped targets, it can repeat its saving throw against the effect." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["binding hex"] = {
	name : "Binding Hex",
	classes : [],
	source : ["KT:Oc", 8],
	level : 1,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	save : "Wis",
	description : "Bind crea. to position. Crea. Wis. save to move away. Pulled 5 ft. to spot if >5 ft. away on turn start.",
	descriptionFull : "You bind a creature creature to its current space, causing glowing chains to bind it that spot on the ground. For the duration of the spell, if the creature attempts to move away from that spot, it must make a Wisdom saving throw. On failure, it cannot further away from that spot until the start of its next turn. On success, it can move as normal until the start of its next turn. \nIf the creature starts its turn more than 5 feet from the point, it is pulled 5 feet towards the space it is bound to at the start of each of its turns." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["curse of misfortune"] = {
	name : "Curse of Misfortune",
	classes : [],
	source : ["KT:Oc", 8],
	level : 3,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	description : "When crea. rolls choice of no. from 2-19, treated as 1. Force crea. to reroll once per roll of no. choice.",
	descriptionFull : "You curse a target creature, bringing bad luck. When you place this curse, pick a number from to 2-19. Whenever the target rolls the chosen number on an attack roll, saving throw, or ability check, that number is treated as 1. \nAdditionally, once during the effect you can use your reaction when the target rolls an attack roll, saving throw, or ability check to force them to reroll the d20 and use the lower roll. You regain the ability to do this each time the target rolls your chosen number." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["curse of doom"] = {
	name : "Curse of Doom",
	classes : [],
	source : ["KT:Oc", 8],
	level : 3,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	description : "Next attack that hits the target crea. becomes a critical hit.",
	descriptionFull : "You curse a target creature, dooming it. The next attack roll that hits the target creature becomes a critical hit, after which the spell ends." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["enfeebling hex"] = {
	name : "Enfeebling Hex",
	classes : [],
	source : ["KT:Oc", 8],
	level : 5,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	save : "Wis",
	description : "Crea. Wis. save when attempting to deal dmg. with attack, spell, or action. On fail, deals no dmg.",
	descriptionFull : "You curse a target creature, causing an overwhelming sense of powerlessness to wash over it. Any time the target creature attempts to attack, cast a spell that deals damage, or use an action that deals damage, it must make a Wisdom saving throw. On failure, they complete their action, but their action does no damage to any target." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["karmic hex"] = {
	name : "Karmic Hex",
	classes : [],
	source : ["KT:Oc", 9],
	level : 3,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	description : "Once per turn, crea. takes 3d6 dmg. when damaging another crea., 4d6 vs. myself.",
	descriptionFull : "You hex a target creature, placing a karmic binding on it. Once per turn when it damages another creature, it takes 3d6 psychic damage. If it damages you, the psychic damage it takes is increased by 1d6 (to 4d6)." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["killing curse"] = {
	name : "Killing Curse",
	classes : [],
	source : ["KT:Oc", 9],
	level : 5,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	save : "Cha",
	description : "Reduce crea. current & max HP by 3d10 + 10. If at 0 HP, it dies. Crea. Cha. save to end spell, or reduce HP by 1d10 + 10.",
	descriptionFull : "You curse a target to die. The targets current and maximum hit points is reduced by 3d10 + 10. If this causes a creatures to have zero hit points, the creature dies. \nFor the duration of the spell, the target cannot regain hit points unless from a magical effect cast by a spell slot of higher level than this spell slot this curse was cast with, and any death saving throw they roll is automatically considered a 1. \nAt the start of a creatures turn while they are under the effect of this spell, they make a Charsima saving throw. On failure, their current and maximum hit points is reduced by 1d10 + 10. On a successful save, the spell ends. A creature's maximum hit points are restored when it takes a long rest." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["rotting curse"] = {
	name : "Rotting Curse",
	classes : [],
	source : ["KT:Oc", 9],
	level : 1,
	school : "Necromancy",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	description : "When crea. takes dmg., takes 1d4 necrotic dmg., healing halved. Crea disadv. on social Cha checks.",
	descriptionFull : "You inflicting a rotting decay on a creature, causing it to to begin to rot. For the duration of the spell, every time the creature takes damage, it takes an additional 1d4 necrotic damage, and the effect of all healing on the creature is reduced by half. \nThe target creature has disadvantage on any Charisma checks for social interaction during the effect of the spell." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};
SpellsList["swapping curse"] = {
	name : "Swapping Curse",
	classes : [],
	source : ["KT:Oc", 9],
	level : 1,
	school : "Enchantment",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M\u2020",
	compMaterial : "Something from the target creature (such as blood, hair, or scales) which the spell consumes.",
	duration : "conc, 1 min",
	save : "Cha",
	description : "2 creas. Cha saves. If both fail, they control each other for duration. Repeat save to end effect.",
	descriptionFull : "You cast a curse targeting two individuals. Both targets must make a Charisma saving throw (which they can choose to fail). If both targets fail their saving throws, for the duration of the spell their souls are swapped. A soul controls the body it inhabits. It gains any ability score or action the body had (besides legendary actions or legendary resistance), but retains it's own spell casting (if it has the spellcasting, innate or otherwise), and has disadvantage on all attack rolls and strength, dexterity, and constitution saving throws for 1d4 turns after swapping bodies. \nAt the end of a swapped creatures turn, it can choose to repeat the saving throw, ending the effect on a successful save. It its CR (or character level if it has no CR) is higher than the body of the creature it is, it has advantage on the save. \nIf a creature dies while while it's soul is swapped, the souls return to their original bodies. If a soul was in a dying creature that returns to a living body, that creature takes 5d10 necrotic damage." + AtHigherLevels + "If you cast this spell using a spell slot of 4th level or higher, the duration is concentration, up to 10 minutes. If you use a spell slot of 5th level or higher, the duration is 8 hours. If you use a spell slot of 7th level or higher, the duration is 24 hours. If you use a 9th level spell slot, the spell lasts until it is dispelled. Using a spell slot of 5th level or higher grants a duration that doesn't require concentration."
};

//ADDING OTHER SPELLS
SpellsList["acid rain"] = {
	name : "Acid Rain",
	classes : ["druid", "occultist", "wizard"],
	source : ["KT:Oc", 22],
	level : 5,
	school : "Conj",
	time : "1 a",
	range : "300 ft",
	components : "V,S",
	duration : "conc, 1 min",
	save : "Dex",
	description : "40 ft. radius acid rain, crea Dex save or 6d4 acid dmg., 3d4 acid dmg. at end of turns after.",
	descriptionFull : "Acid rain begins falling within a 40-foot-radius 60-foot-high cylinder centered on a point you choose within range. When a creature moves into the spell's area for the first time on a turn or starts its turn there, the creature must succeed on a Dexterity saving throw or take 6d4 acid damage, and become covered in acid. On a successful save, a creature takes half the initial damage and is not covered in acid. \nA creature takes 3d4 acid damage if it ends its turn while covered with acid. The target or a creature within 5 feet of it can end this damage by using its action to clear away the acid."
};
SpellsList["alacrity"] = {
	name : "Alacrity",
	classes : ["bard", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 22],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S,M",
	compMaterial : "The hand of a broken clock.",
	duration : "1 rnd",
	description : "I have double spd., +2 AC, Dex save adv., and +1 action (1 Attack, Dash, Disengage, Hide, Use Object)",
	descriptionFull : "Until the spell ends, your speed is doubled, you gain a +2 bonus to AC, you have advantage on Dexterity saving throws, and you gain an additional action. That action can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object action. \nIf you are under the effect of haste, you gain no benefit from this spell."
};
SpellsList["aldricor's elemental rebuke"] = {
	name : "Aldricor's Elemental Rebuke",
	classes : ["druid", "ranger", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 22],
	level : 1,
	school : "Trans",
	time : "1 rea",
	timeFull : "1 reaction, which you take when you take acid, cold, fire, lightning or thunder damage.",
	range : "60 ft",
	components : "S",
	compMaterial : "The hand of a broken clock.",
	duration : "Instantaneous",
	save : "Dex",
	description : "Half incoming dmg.. Attacker makes Dex save, takes 1d8+1d8/SL of their dmg. type on fail.",
	descriptionFull : "The manipulate some of the incoming elemental energy, harnessing its power in your hand. The damage you take from the triggering effect is cut in half, and if the creature that damaged you is within range you hurl the energy back at it. The creature must make a Dexterity saving throw, taking 1d8 damage of the triggering type on a failed save or half as much damage on a successful one." + AtHigherLevels + "When you cast the spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each level above first."
};
SpellsList["animate object"] = {
	name : "Animate Object",
	classes : ["bard", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 22],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "Bring a small or smaller object to life. Bns action to direct. See book.",
	descriptionFull : "You bring a small or smaller object to life. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. The object has the following stats: HP: 20, AC: 18, Str: 4, Dex: 18. The object has an attack modifier equal to your spell attack modifier. If the object is a weapon, it deals damage equal to the weapon's damage dice + your Wisdom modifier on hit dealing that weapons damage type, otherwise it deals 1d4 + your Wisdom modifier bludgeoning damage on hit. \nAs a bonus action, you can mentally command the animated object as long as it is within 60 feet of you. You decide what action the creature will take and where it willmove during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete. \nIf the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form."
};
SpellsList["animate shadow"] = {
	name : "Animate Shadow",
	classes : ["occultist"],
	source : ["KT:Oc", 23],
	level : 3,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A smoke stained mirror.",
	duration : "Conc, 1 h",
	description : "Bring target crea. shadow to life. Acts after target, reaction to take control. See book.",
	descriptionFull : "Targeting a creature you can see within range, you bring it's shadow to life under your control. If the creature has a CR of more than 3 or the creature has no shadow (either from the nature of the creature or from the lack of a light source to cast one) the spell fails. \n Otherwise a copy of the creature is created using its game statistics and is created adjacent to the creature (on the side away from the brightest light near it). The shadow has no legendary actions, legendary resistance, and cannot cast spells. The shadow creature has hit points equal to half the target's hit points, and looks like a mirrored version of the creature it was summoned from formed from inky black smoke. The creature is resistant to bludgeoning, piercing, and slashing damage from non-magical sources while in darkness. The creature is vulnerable to all damage while in bright light, and always vulnerable to fire, lightning, and radiant damage. If the shadow is killed, the target creature it was summoned from casts no shadows for the next 8 hours. \n The shadow acts immediately after the creature's turn, and without further direction it attempts to follow and takes the attack action against it was summoned from. As a reaction to the shadow starting it's turn, the caster can exert control over it and cause it to move and take its action as the caster directs." + AtHigherLevels + "When you cast this spell using a 5th or 6th-level spell slot, the maximum CR of the target increases to CR 4. When you cast it using a 7th or 8th-level spell slot, the maximum CR of the target increases to CR 5. When you cast it using a spell slot of 9th level or higher, the maximum CR of the target increases to CR 6."
};
SpellsList["awaken rope"] = {
	name : "Awaken Rope",
	classes : ["bard", "inventor", "occultist", "ranger", "wizard"],
	source : ["KT:Oc", 24],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S,M\u0192",
	compMaterial : "10 to 60 ft. of cord or rope, worth at least 1 cp.",
	duration : "Instantaneous",
	description : "Imbue 10 to 60 ft. rope, choose action from Bind, Fasten, or Grab. See book.",
	descriptionFull : "As an action, you can touch a rope 10 to 60 feet long andissue a single command to it, selecting from the following options: \n\u2022 Bind. The rope attempts to bind a creature of your choice within 20 feet of you. The creature must make a Dexterity saving throw or become restrained until it is freed. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the rope (AC 10) also frees the creature without harming it, ending the effect and destroyingthe rope. \n\u2022 Fasten: The rope flies up 60 feet and ties one end to an object or surface that a rope could be tied to, beforebecoming inanimate again, hanging from the object. \n\u2022 Grab: The rope lashes out grabs one Small or smaller object that is not being worn by a creature within a range equal to the length of the rope and pulls that object back to your hand. If that object is being carried by a creature, it must make a Strength saving throw. On success, it retains the object, and on failure the object is pulled from the creature." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, you can target a chain instead of a rope. It has the same available actions, but it has a DC 15, an AC of 15, and resistance to slashing damage when taking the Bind action. When cast with a spell slot of 3rd level or higher targeting a rope, that rope is magically imbued for 1 minute, gaining an DC of 15, an AC 20, and 20 hit points."
};
SpellsList["baba's walking hut"] = {
	name : "Baba's Walking Hut",
	classes : ["occultist"],
	source : ["KT:Oc", 24],
	level : 6,
	school : "Trans",
	time : "10 min",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A chicken leg.",
	duration : "24 h",
	description : "15 ft. x 15 ft. x 10 ft. max. building becomes gargantuan creature. Direct as free action. See book.",
	descriptionFull : "You touch a hut, cabin, or other building no more than 15 feet by 15 feet by 10 feet. On completion of the spell, the building grows legs large enough to support it, as well as the structural integrity needed to stand and move, and becomes a gargantuan creature. It has 250 hit points, an AC of 12, and awalking speed of 20 feet. If it drops to 0 hit points, the spell ends. \nOn your turn, you can direct it to move (no action required) and it will continue to move as directed until you direct it tostop or it reaches its destination. It can take no actions, but if it walks over a large or smaller creature, you can direct it to attempt to step on that creature, and that creature must succeed a Dexterity saving throw, or take 2d10 bludgeoning damage and be knocked prone. \nIf you cast this spell on the same building every day for a year, the spell lasts until dispelled."
};
SpellsList["become fire"] = {
	name : "Become Fire",
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 24],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S",
	duration : "1 rnd",
	description : "Until next turn start, resist fire & nonmagic attack dmg.., move through crea. space for 1d6 fire dmg., 1 fire dmg. die per turn is max. value.",
	descriptionFull : "You become a burst of elemental flames. Until the start of your next turn, you gain the following benefits: \n\u2022 You are resistant to fire damage and to bludgeoning, piercing, and slashing damage from nonmagical attacks. \n\u2022 You can move through the space of other creatures and ignore difficult terrain. The first time you enter the space of another creature on a turn, it takes 1d6 fire damage. \n\u2022 Once during your turn when you roll fire damage, you can maximize the value of one die of fire damage."
};
SpellsList["become stone"] = {
	name : "Become Stone",
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 24],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S",
	duration : "1 rnd",
	description : "Until next turn start, petrified, AC 20, 15 temp. HP.",
	descriptionFull : "You solidify into a stone. Until the start of your next turn, you are petrified. Your AC becomes 20 and you gain 15 temporary hit points. Any remaining temporary hit points fade when the spell ends."
};
SpellsList["become water"] = {
	name : "Become Water",
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 24],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S",
	duration : "1 rnd",
	save : "Str",
	description : "Until next turn start, resist nonmagic attack dmg.., move through crea. space, Str. save or they're knocked prone.",
	descriptionFull : "You become a burst of elemental water. Until the start of your next turn, you gain the following benefits: \n \u2022 You are resistant to bludgeoning, piercing, and slashing damage from nonmagical attacks. \n \u2022 You can move through the space of other creatures and ignore difficult terrain; the first time you move through a Large or smaller creature on a turn, it must pass a Strength saving throw or be knocked prone."
};
SpellsList["become wind"] = {
	name : "Become Wind",
	classes : ["druid", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 25],
	level : 2,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S",
	duration : "1 rnd",
	save : "Str",
	description : "Until next turn start, resist lightning & nonmagic attack dmg., 30 ft. fly spd, move through crea. space, ignore diff. terrain.",
	descriptionFull : "You become a burst of elemental wind until the start of the next turn. You gain resistance to lightning damage and bludgeoning, piercing, and slashing damage from nonmagical attacks. Additionally; you gain flying speed of 30 feet, can move through the space of other creatures, and ignore difficult terrain, but will fall at the start of your next turn if not held aloft."
};
SpellsList["boil blood"] = {
	name : "Boil Blood",
	classes : ["occultist"],
	source : ["KT:Oc", 25],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Crea that took dmg. in last min., Con. save or 3d4+2d4/SL fire dmg. on turn start & all terrain diff.",
	descriptionFull : "Targeting a creature that has taken slashing or piercing damage in the last minute, make it's blood heat and boil. The target creature must make a Constitution saving throw. On failure, it's blood begins to heat. At the start of it's turn while effected, it takes 3d4 fire damage and is crippled with agony, all terrain is difficult terrain for it. \nAt the end of each of its turns, the target can make another Constitution saving throw. On a success, the spell ends on the target." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d4 for each slot level above 2nd."
};
SpellsList["burn"] = {
	name : "Burn",
	classes : ["druid", "occultist", "sorcerer"],
	source : ["KT:Oc", 25],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "Melee spell atk. for 1d12 fire damage. +1d12 fire dmg at CL 5, 11, 17",
	descriptionFull : "You ignite a brilliant flame around your hand that sears anything you touch. Make a melee spell attack against the target. On hit, the target takes 1d12 fire damage." + AtHigherLevels + "The spell's damage increases by 1d12 when you reach 5thlevel (2d12), 11th level (3d12), and 17th level (4d12)."
};
WeaponsList["burn"] = {
	regExpSearch : /^(?=.*burn).*$/i,
	name : "Card Trick",
	source : ["KT:Oc", 25],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Cantrip",
	damage : ["C", 12, "Fire"],
	range : "Melee",
	description : "(KT:Oc, 25)",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["bramble barrier"] = {
	name : "Bramble Barrier",
	classes : ["druid", "occultist", "ranger"],
	source : ["KT:Oc", 25],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Line of 6+2/SL 5 ft. squares of bramble. If crea. enters space, 4d4 piercing dmg. & Con. save or movement 0 until end of turn.",
	descriptionFull : "You create a line of low brambles that erupts from a point you can see within range. This line is 30 feet long and 5 feet wide,made of up of six 5-foot squares of brambles. Each patchmuch connect to another patch and be placed on the ground. The bramble patches are difficult terrain and a creature that enters a square of brambles takes 4d4 piecing damage and must make a Constitution saving throw. On failure, their speed becomes 0 until the end of their turn. \nThe brambles wither and die after 1 day if the area isn't suitable for them to grow. Each 5-foot-square portion of brambles requires at least 1 minute to clear by hand, or can be cleared if they take 5 or more fire damage. The brambles crumble to dust immediately if you cast this spell again." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, you can create two additional 5-footsquares of brambles for each slot level above 3rd."
};
SpellsList["bramble binding"] = {
	name : "Bramble Binding",
	classes : ["druid", "occultist", "ranger"],
	source : ["KT:Oc", 25],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "Crea. Dex. save or 4d4+1d4/SL piercing dmg., half on success. Large or smaller trapped on fail, action, or 1/2 move spd. + 2d4+1d4/SL piercing dmg. to leave.",
	descriptionFull : "Brambles burst from your hand, lashing out at a target within range. The target must make a Dexterity saving throw. On failure, they take 4d4 piercing damage and, if the target is Large or smaller, it becomes entangled by brambles. While entangled by brambles, it can't move, but it can free itself as an action (taking no additional damage) or rip itself free using half of its movement and taking an additional 2d4 piercing damage. On a successful save, they take half as much damage and aren't entangled by brambles." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, both the initial damage and the damage taken ripping free of the brambles increases by 1d4 for each slot levelabove 1st."
};
SpellsList["crackle"] = {
	name : "Crackle",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 25],
	level : 2,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "3+1/SL lightning arcs, ranged spell atk. for each. 1d12 lightning dmg. on hit. Crea. hit by 3+ arcs stunned until next turn start.",
	descriptionFull : "You create three arcs of lightning striking targets in range. You can direct them at one target or several. Make a ranged spell attack for each arc. On a hit, the target takes 1d12 lightning damage. If three or more arcs hit a single target, they must make a Constitution saving throw or become shocked, stunning them until the start of their next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, you create one additional arc for each slot level above 2nd."
};
WeaponsList["crackle"] = {
	regExpSearch : /^(?=.*crackle).*$/i,
	name : "Crackle",
	source : ["KT:Oc", 25],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Cantrip",
	damage : ["C", 12, "Lightning"],
	range : "60 ft",
	description : "3+1/SL beams, roll atk. for each; Crea hit by 3+ beams stunned (KT:Oc, 25)",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["crippling agony"] = {
	name : "Crippling Agony",
	classes : ["occultist"],
	source : ["KT:Oc", 26],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A joint bone.",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Crea. Con. save or take 1d6 necrotic dmg. when moving more than 1/2 its speed or taking an action.",
	descriptionFull : "You can inflict crippling agony on a foe. Choose one creature that you can see within range to make a Constitution saving throw. If the target fails, it becomes crippled with horrific pain. Whenever the creature moves more than half of it's movement speed or takes an action, the crippling pain causes it to take 1d6 necrotic damage. \nIt can repeat the saving throw at the end of each of its turns, the target can make a Constitution saving throw. On a success, the spell ends."
};
SpellsList["cruel puppetry"] = {
	name : "Cruel Puppetry",
	classes : ["occultist"],
	source : ["KT:Oc", 26],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M\u2020",
	compMaterial : "A small humanoid doll worth at least 5gp and something from the target creature (such as blood,hair, or scales) both of which the spell consumes.",
	duration : "Conc, 1 min",
	save : "Cha",
	ritual : true,
	description : "Crea. Cha. save or bound to doll. Use action to Hold, Force, Smash, or Rip the doll.",
	descriptionFull : "You attempt to bind a creatures soul to a doll, linking the creature to the doll in a sympathetic link. The target must make a Charisma saving throw. On failure, the creature becomes bound to the doll. On a successful save, the creature is not bound and the spell ends. \nAs part of casting the spell when the creature fails the save, and on subsequent turns using your action until the spell ends, you can perform one of the following actions: \n \u2022 Hold the doll still, causing the creature to be Restrained until start of your next turn. \n \u2022 Force the doll to move, causing the creature to move 15 feet in a direction of your choice that it can move. \n \u2022 Smash the doll, causing it take 4d6 bludgeoning damage. \n \u2022 Rip the doll in half, ending the spell, destroying the doll, and dealing 4d12 necrotic damage. \nEach time after the first you use an action to manipulate the doll, after the effect takes place, the creature can repeat the Charisma with disadvantage, ending the effect on asuccessful save. \nOnce a creature has been targeted by this spell, they cannot be targeted again for 24 hours."
};
SpellsList["dancing wave"] = {
	name : "Dancing Wave",
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 26],
	level : 2,
	school : "Conj",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Str",
	description : "5 ft. radius difficult terrain. Move 30 ft. bns. action. 1st time crea. enters, Str. save or prone & 1d6 bludgeoning dmg.",
	descriptionFull : "You summon a surging mass of water into existence at a point on the ground within range. The mass of water remains cohesive filling a 5 foot radius, though only rises 3 feet from the ground. The area is difficult terrain for any creature without a swimming speed. For the duration of the spell, as a bonus action you can move the wave of water up to 30 feet along a surface in any direction. The first time the wav eenters any creature's space during a your turn, they must make a Strength saving throw or take 1d6 bludgeoning damage and be knocked prone. A creature automatically fails this saving throw if they are prone."
};
SpellsList["decaying touch"] = {
	name : "Decaying Touch",
	classes : ["druid", "occultist", "sorcerer"],
	source : ["KT:Oc", 26],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "Powdered remains of a dead animal.",
	duration : "Instantaneous",
	description : "Melee spell atk., 1d6+1d6/CL necrotic dmg on hit, target takes extra 1d6+1d6/CL on next dmg.",
	descriptionFull : "You wreath your hand in necrotic decay that causes anything you touch to wither and die. Make a melee spell attack against the target. On hit, the targets takes 1d6 necrotic damage is starts to flake and decay. The first time they take damage from another source before the start of your next turn, they take an additional 1d6 necrotic damage. Targets immune to diseases are immune to this effect." + AtHigherLevels + "Both the initial and secondary damage of the spell increases by 1d6 when you reach 5th level (2d6), 11th level(3d6), and 17th level (4d6).",
};
WeaponsList["decaying touch"] = {
	regExpSearch : /^(?=.*decaying)(?=.*touch).*$/i,
	name : "Decaying Touch",
	source : ["KT:Oc", 26],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Cantrip",
	damage : ["C", 6, "Necrotic"],
	range : "60 ft",
	description : "On next dmg. hit target takes, they take extra 1d6+1d6/CL necrotic dmg.",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["deglove creature"] = {
	name : "Deglove Creature",
	classes : ["occultist"],
	source : ["KT:Oc", 26],
	level : 5,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A finger bone.",
	duration : "Instantaneous",
	save : "Con",
	description : "Target crea. Con save, 7d10+7 necrotic dmg. on fail, half on success. Become skeleton if killed.",
	descriptionFull : "You point at a creature within range, and attempt to make it's skeleton rip free of it's body. The creature must make a Constitution saving throw. The target takes 7d10 + 7 necrotic damage on a failed save, or half as much damage on a successful one. \nIf this damage kills the target creature, it's flesh sloughs off it's skeleton, collapsing a pile, and the skeleton becomes a Skeleton (Basic Rules, pg. 152), hostile to all living creatures that attacks the closest target.",
};
SpellsList["devour shadow"] = {
	name : "Devour Shadow",
	classes : ["occultist", "spellblade", "warlock", "wizard"],
	source : ["KT:Oc", 27],
	level : 4,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Cha",
	description : "1+1/SL crea. Cha save. On fail, 6d6 necrotic dmg. (half on success), -1d4 from rolls, I add 1d4 to rolls.",
	descriptionFull : "Your shadow suddenly elongates into that of a horrifying devouring abomination and attempts to eat the shadow of a target creature in range. The target must make a Charisma saving throw. On failure, the target creature's shadow is devoured and they take 6d6 necrotic damage, and are magically weakened, subtracting 1d4 from the attack rolls, saving throws, and ability checks for the duration of the spell, while you can add 1d4 to your attack rolls, saving throws, and ability checks for the duration of the spell. On success, a large bite is taken from the shadow, and they take half as muchdamage and are not weakened. \nIf either you or the target has no shadow, the spell fails. If their shadow is consumed, they have no shadow until the spell ends." + AtHigherLevels + "When you cast this spell with a 5th level spell slot or higher, you can target an additional creature for each spell slot level above 4th. The bonus you gain consuming shadows does not increase beyond 1d4, even if you consume multiple shadows.",
};
SpellsList["electrify"] = {
	name : "Electrify",
	classes : ["occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 27],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "S",
	components : "V,S,M",
	compMaterial : "A pair of singed gloves.",
	duration : "1 rnd",
	save : "Con",
	description : "Until next turn or dmg., conductive attacks deal +1d10 lightning dmg., target Con save or stunned, can cast Shocking Grasp",
	descriptionFull : "You channel lightning into your hands. After casting this spell, if you make a successful melee spell attack, unarmed strike or a melee weapon attack with a weapon made of a conductive material (such as metal), the target takes 1d10 lightning damage and must make a Constitution saving throw. On a failed save, the target becomes stunned until the start of their next turn. The spell ends after dealing damage, or at the start of your next turn, whichever occurs first. \nFor the duration of the spell, you can cast the spell Shocking Grasp.",
};
SpellsList["earth ripple"] = {
	name : "Earth Ripple",
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 27],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Dex",
	description : "Target crea. Dex. save. One fail, choice of 1d8 dmg. & 0 movement, 2d8 bludgeoning dmg. & knocked 5ft., or 4d8 piercing dmg.",
	descriptionFull : "You cause the earth to deform and ripple, a target creature must make a Dexterity saving throw or suffer one of the following effects (your choice): \n \u2022 The target is pulled into the earth, taking 1d8 damage and reducing its movement speed to zero until a creature spends an action to dig it free. \n \u2022 It is slammed in a direction, taking 2d8 bludgeoning damage, is moved 5 feet in a direction of your choosing,and knocked prone. \n \u2022 It is impaled by a spike of earth, taking 4d8 piercing damage.",
};
SpellsList["form of familiar"] = {
	name : "Form of Familiar",
	classes : ["occultist", "wizard"],
	source : ["KT:Oc", 27],
	level : 2,
	school : "Trans",
	time : "1 min",
	range : "S",
	components : "V,S,M\u2020",
	compMaterial : "A piece of your familiar such as fur, feathers, or scales, which the spell consumes.",
	duration : "1 hr",
	description : "Become familiar that gave material comp., can't speak or cast spells. Action to revert. See book",
	descriptionFull : "You assume the form of the familiar that provided the material component to the spell. The transformation lasts for the duration, or until you drop to 0 hit points or die. Your game Statistics are replaced by the Statistics of the chosen creature, though you retain your Alignment and Intelligence, Wisdom, and Charisma scores. \nYou assume the Hit Points and Hit Dice of the new form. When you revert to your normal, you return to the number of Hit Points you had before you transformed. If you revert as a result of Dropping to 0 Hit Points, any excess damage carries over to your normal form. As long as the excess damage doesn't reduce your normal form to 0 Hit Points, you aren't knocked Unconscious. You can use an action to revert to your normal form at any time. \nYou are limited in the actions you can perform by the nature of your new form, and you can't speak, cast spells, or take any other action that requires hands or speech. Your gear melds into the new form. You cannot activate, use, wield, or otherwise benefit from any of your equipment.",
};
SpellsList["field of stars"] = {
	name : "Field of Stars",
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 28],
	level : 5,
	school : "Evoc",
	time : "1 a",
	range : "S: 60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "5+1/SL motes appear within range. When crea. within 5+10/SL ft., detonate for 4d12 radiant dmg.", //Not sure if the +10 ft. range per spell level is for the light or the detonation, I'm assuming it's for the detonation, but eh.
	descriptionFull : "You cause 5 star-like motes of light to spring forth at points you can see within range. Each mote of light sheds bright light in a 10 foot radius and dim light for an additional 10 feet. If a creature moves to a space within 5 feet of a mote of light or ends their turn within 5 feet of one, the mote explodes in a brilliant flash, dealing 4d12 radiant damage to all creatures within 5-feet of that mote before fading away. If moving into or ending its turn a space detonates multiple motes, a creature is only effected once. \nFor the duration of the spell, while you have any motes of light remaining, as an action you can rearrange the remaining motes, placing them anywhere within range (this movement cannot cause them to detonate)." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the range increases by 10 feet and you create an additional star-like mote of light for each slot level about 5th.",
};
SpellsList["fists of fire"] = {
	name : "Fists of Fire",
	classes : ["druid", "occultist", "sorcerer"],
	source : ["KT:Oc", 28],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S",
	duration : "1 min",
	description : "Fists deal 1d6 fire dmg. Object I hold ignire, deal 1d4 fire dmg to grappled crea. at turn end. Free action to end.",
	descriptionFull : "You cause your fists to erupt in flames. For the duration, your fists become a set of simple natural weapons that deal 1d6 fire damage. You are proficient in these weapons, and they have the Light property. \n For the duration, any flammable object you attempt to hold catches fire. If you end your turn grappling another creature with your hands, it takes 1d4 fire damage. You can end the spell early (no action required).",
};
WeaponsList["fists of fire"] = {
	regExpSearch : /^(?=.*fists)(?=.*of)(?=.*fire).*$/i,
	name : "Fists of Fire",
	source : ["KT:Oc", 28],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Cantrip",
	damage : [1, 6, "Fire"],
	range : "Melee",
	description : "Light; Ignite held objects; 1d4 fire dmg. to crea. grappled at end of turn",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["fissure"] = {
	name : "Fissure",
	classes : ["druid", "sorcerer", "spellblade", "wizard"],
	source : ["KT:Oc", 28],
	level : 5,
	school : "Trans",
	time : "1 a",
	range : "S:60 ft line",
	components : "V,S",
	duration : "Instantaneous",
	save: "Dex",
	description : "Crea. in area Dex. save, or 6d10 bludgeoning dmg., buried. 25 ft. to leave, +1d10 dmg. on turn end.",
	descriptionFull : "You rend asunder the earth in a 60-foot-long 5-foot-wide line, targeting an area of dirt, sand, or rock at least 10 feet deep. \nCreatures in that line must make a Dexterity saving throw. On a failure, a creature falls into a suddenly opened crevice in the ground, falling into it before it snaps shut, crushing them. Creatures that fail the saving throw take 6d10 bludgeoning damage from the fall and crushing. The creature is buried in 10 feet of rubble, and creatures without a burrowing speed require 25 feet of movement to extract themselves from the loose rubble to return to where they failed the saving throw. If they end their turn while buried, they take an additional 1d10 bludgeoning damage.",
};
SpellsList["freeze"] = {
	name : "Freeze",
	classes : ["druid", "occultist", "sorcerer"],
	source : ["KT:Oc", 28],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "Melee spell atk. for 1d8+1d8/CL. cold dmg. Crea. movement reduced by 10 ft. until their turn ends.",
	descriptionFull : "You instill a deadly chill into your hand. Make a melee spell attack against the target. On hit, the target takes 1d8 cold damage, and the target's movement speed is reduced by 10 feet until the end of their turn. \nThe spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
};
WeaponsList["freeze"] = {
	regExpSearch : /^(?=.*freeze).*$/i,
	name : "Freeze",
	source : ["KT:Oc", 28],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Cantrip",
	damage : ["C", 8, "Cold"],
	range : "Melee",
	description : "Target movement reduced by 10 ft. until end of their turn",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["gale bolt"] = {
	name : "Gale Bolt",
	classes : ["druid", "occultist", "ranger", "sorcerer", "wizard"],
	source : ["KT:Oc", 28],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Ranged spell atk. for 2d8+1d8/SL bludgeoning dmg. Large or smaller crea. knocked 10 ft. away.",
	descriptionFull : "A blast of concentrated wind streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 bludgeoning damage and if it is Large or smaller is knocked 10 feet away from you." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each level above 1st.",
};
WeaponsList["gale bolt"] = {
	regExpSearch : /^(?=.*gale)(?=.*bolt).*$/i,
	name : "Gale Bolt",
	source : ["KT:Oc", 28],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Spell",
	damage : [2, 8, "Bludgeoning"],
	range : "120 ft",
	description : "+1d8/SL; Large or smaller creas. knocked 10 ft. away",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["grip of the dead"] = {
	name : "Grip of the Dead",
	classes : ["occultist"],
	source : ["KT:Oc", 28],
	level : 1,
	school : "Necro",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Str",
	description : "Crea. Str. save or restrained, and takes 1d8+1d8/SL necrotic dmg. at its turn start. I heal half dmg.",
	descriptionFull : "You channel unholy strength into you hand, and reach out to grab a creature. The creature must make a Strength saving throw or become restrained by your deathly iron grasp. As an action on its turn, the creature can attempt to escape using a Strength (Athletics) or Dexterity (Acrobatics) check against your Spell Save DC. \nAt the start of the creatures turn while you maintain the grip and the spell, it takes 1d8 necrotic damage as you drain the life from it, and regain hit points equal to half the damage dealt." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
};
SpellsList["hungering void"] = {
	name : "Hungering Void",
	classes : ["occultist"],
	source : ["KT:Oc", 29],
	level : 3,
	school : "Conj",
	time : "1 a",
	range : "120 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "20 ft. radius, creas. Con save on turn start in it or 2d6+1d6/SL necrotic & cold dmg. each (half on success), movement reduced by 5+10/SL ft.",
	descriptionFull : "You create a point pure void which swallows a 20-foot radius sphere of space, plunging it into magical darkness and forming a life devouring freezing void. A creature with darkvision can't see through this darkness, and nonmagical light can't illuminate it unless it comes from a spell of higher level than this one. \nA creature that starts their turn within the void must make a Constitution saving throw. On failure, they take 2d6 cold damage and 2d6 necrotic damage, and their speed is reduced by 5 feet. The reduction to their speed lasts until they start not inside the area of the void, and can stack with itself, up to a maximum effect of reducing a creature's speed to 5 feet. Ona success, they take half as much damage and their speed is not reduced." + AtHigherLevels + "When you cast this spell using a 5th level spell slot or higher, the necrotic and cold damage both increase be 1d6, and the speed reduction increases to 10 feet on a failed save (with the same minimum speed limitation).",
};
SpellsList["ice weapon"] = {
	name : "Ice Weapon",
	classes : ["druid", "occultist"],
	source : ["KT:Oc", 29],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "S",
	components : "V,S,M",
	compMaterial : "A drop of water that was once snow.",
	duration : "1 min",
	description : "Summon ice weapon, reform/change form as bns. action. Max. 3 weapons at once.",
	descriptionFull : "You conjure a weapon formed from magical ice from the air. You have proficiency with this weapon. When you form it and as a bonus action while wielding it, you can morph the weapon into different forms that take on the following properties. If you lose or discard the weapon, you can reform it in your hand as a bonus action." + 
	"\n\nWeapon\t\t Damage\t Properties"+
	"\nIce Spear\t\t 1d6\t Thrown (30/90 ft)"+
	"\nIce Sword\t\t 1d6\t Versatile (1d8)\n[Above is named Ice Blade within the sheet]"+
	"\nIce Lance\t\t 1d8\t Two-Handed, Reach"+
	"\nIce Hammer\t 1d10\t Two-Handed, Heavy"+
	"\nIce Dagger\t 1d4\t Finesse, Thrown (30/90 ft)"+
	//Not sure why the last two only need one \t after the weapon names, might be the length
	"\n\nRegardless of it's form, the weapon deals cold damage. You can end the spell early, letting the weapon melt to a harmless splash of water (no action required). You can have up to three ice weapons formed from this spell at a time. After forming a fourth, the first created one melts away."
};
//Using the Shadow Blade spell as precedent here, since the write-up doesn't mention what ability these use
WeaponsList["ice spear"] = {
	regExpSearch : /(?=.*ice)(?=.*spear).*$/i,
	name : "Ice Spear",
	source : [["KT:Oc", 29]],
	list : "spell",
	ability : 1,
	type : "AlwaysProf",
	damage : [1, 6, "Cold"],
	range : "Melee, 30/90 ft",
	description : "Thrown (30/90 ft)",
	abilitytodamage : true,
	isAlwaysProf : true,
	useSpellcastingAbility : false
};
//Ice Blade instead of Ice Sword, for (i'm guessing) regex reasons I can't figure out a workaround for 
WeaponsList["ice blade"] = {
	regExpSearch : /(?=.*ice)(?=.*blade).*$/i,
	name : "Ice Blade",
	source : [["KT:Oc", 29]],
	list : "spell",
	ability : 1,
	type : "AlwaysProf",
	damage : [1, 6, "Cold"],
	range : "Melee",
	description : "Versatile (1d8)",
	abilitytodamage : true,
	isAlwaysProf : true,
	useSpellcastingAbility : false
};
WeaponsList["ice lance"] = {
	regExpSearch : /(?=.*ice)(?=.*lance).*$/i,
	name : "Ice Lance",
	source : [["KT:Oc", 29]],
	list : "spell",
	ability : 1,
	type : "AlwaysProf",
	damage : [1, 8, "Cold"],
	range : "Melee",
	description : "Two-Handed, Reach",
	abilitytodamage : true,
	isAlwaysProf : true,
	useSpellcastingAbility : false
};
WeaponsList["ice hammer"] = {
	regExpSearch : /(?=.*ice)(?=.*hammer).*$/i,
	name : "Ice Hammer",
	source : [["KT:Oc", 29]],
	list : "spell",
	ability : 1,
	type : "AlwaysProf",
	damage : [1, 10, "Cold"],
	range : "Melee",
	description : "Two-Handed, Heavy",
	abilitytodamage : true,
	isAlwaysProf : true,
	useSpellcastingAbility : false
};
WeaponsList["ice dagger"] = {
	regExpSearch : /(?=.*ice)(?=.*dagger).*$/i,
	name : "Ice Dagger",
	source : [["KT:Oc", 29]],
	list : "spell",
	ability : 1,
	type : "AlwaysProf",
	damage : [1, 4, "Cold"],
	range : "Melee, 30/90 ft",
	description : "Finesse, Thrown (30/90 ft)",
	abilitytodamage : true,
	isAlwaysProf : true,
	useSpellcastingAbility : false
};
SpellsList["imbue luck"] = {
	name : "Imbue Luck",
	classes : ["inventor"],
	source : ["KT:Oc", 29],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S,M",
	compMaterial : "A four leaf clover.",
	duration : "1 hr",
	description : "Weapon: roll extra d20 on attack roll, choose new or old roll. Item: roll d20 when attacked, choose which roll.",
	descriptionFull : "You touch a weapon or worn item and imbue luck into it. If imbued on a weapon, for the duration, on an attack roll, the wielder can roll an additional d20 (they can choose to do this after they roll, but before the outcome is determined). The creature can choose which of the d20s is used for the attack roll.\n If imbued into a worn item, they can roll a d20 when attacked, then choose whether the attack uses the attacker's roll or theirs. \nWith either use, the spell immediately ends upon rolling the extra d20."
};
SpellsList["impact"] = {
	name : "Impact",
	classes : ["druid", "occultist", "sorcerer", "warlock"],
	source : ["KT:Oc", 29],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	description : "Melee spell attack for 1d10+1d10/CL bludgeoning, knock target back 5 ft.",
	descriptionFull : "You impart great force into a target you touch. Make a melee spell attack against the target. On hit, the target takes 1d10 bludgeoning damage, and is knocked 5 feet directly away from you." + AtHigherLevels + "The spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
WeaponsList["impact"] = {
	regExpSearch : /^(?=.*impact).*$/i,
	name : "Impact",
	source : ["KT:Oc", 29],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Spell",
	damage : ["C", 10, "Bludgeoning"],
	range : "Melee",
	description : "Knock target 5 ft. away on hit",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["induce headache"] = {
	name : "Induce Headache",
	classes : ["bard", "occultist", "wizard"],
	source : ["KT:Oc", 29],
	level : 1,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A bad pun written on a scrap of parchment.",
	duration : "Conc, 1 min",
	description : "Crea. takes 1 psychic on turn starts and has disadv. on Int. checks and concentration saves for duration",
	descriptionFull : "Targeting a creature with 6 or more intelligence, you inflict an instantaneous headache on it. The target takes 1 psychic damage at the start of its turn, and has disadvantage on Constitution saving throws to maintain Concentration or Intelligence ability checks."
};
SpellsList["illusionary dart"] = {
	name : "Illusionary Dart",
	classes : ["bard", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 29],
	level : 0,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "1+1/CL darts, ranged spell atk. for 1d8 psychic dmg. each.",
	descriptionFull : "You create and throw an illusionary dart at a creature you can see within range. Make a ranged spell attack. On hit, they take 1d8 psychic damage." + AtHigherLevels + "The number of darts you can throw with this spell increases when you reach 5th level (2 darts), 11th (3 darts), and 17th level (4 darts). You can direct the dart at the same target or at different ones. Make a separate attack roll for each dart."
};
WeaponsList["illusionary dart"] = {
	regExpSearch : /^(?=.*illusionary)(?=.*dart).*$/i,
	name : "Illusionary Dart",
	source : ["KT:Oc", 30],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Spell",
	damage : [1, 8, "Psychic"],
	range : "60 ft",
	description : "+1/CL darts, separate attack rolls for each",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["illusionary fireball"] = {
	name : "Illusionary Fireball",
	classes : ["occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 30],
	level : 3,
	school : "Illus",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M",
	compMaterial : "Something that looks like bat guano.",
	duration : "Instantaneous",
	save : "Wis",
	description : "20 ft. radius, creas. make Wis. saves or take 6d6+1d6/SL psychic dmg.",
	descriptionFull : "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an illusionary explosion of flame. Each creature of your choice within a 20-foot radius sphere centered on that point must make a Wisdom saving throw. A target takes 6d6 psychic damage on a failed save. A creature that passes their saves realizes the fire is illusionary and takes no damage. \nYou can make the illusory effect an explosion of ice, lightning, or pure force energy." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
};
SpellsList["illusory pit"] = {
	name : "Illusory Pit",
	classes : ["bard", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 30],
	level : 1,
	school : "Illus",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "Creas. in 5+5/CL ft. (20 ft. max) radius, Wis. save or prone, blind past 5 ft. Can repeat save as action.",
	descriptionFull : "You create a 5 foot radius illusory pit at a point you can seeon the ground. Creatures within the radius must make a Wisdom saving throw. A creature that fails their saving throw, believes they have fallen into the pit, and falls prone, cannot stand up, and is blinded beyond 5 feet of the illusory pit. \nA creature can spend its action to attempt to climb out of the pit, repeating its Wisdom saving throw. On success, it spends all of its movement to stand up, and realizes the pit is an illusion, ending the spell for them. On failure, it cannot get out of the pit and continues to believe it is stuck in a pit. Creatures with a flying speed are unaffected." + AtHigherLevels + "When you cast the spell using a spell slot of 2nd level or higher, the radius of the pit increases by 5 feet for each level above 1st, to a maximum of a 20 foot radius with a 4th level spell slot."
};
SpellsList["karmic reflection"] = {
	name : "Karmic Reflection",
	classes : ["cleric", "occultist"],
	source : ["KT:Oc", 30],
	level : 1,
	school : "Ench",
	time : "1 a",
	range : "30 ft",
	components : "V,S,M",
	compMaterial : "A broken shard of mirror.",
	duration : "1 rnd",
	description : "Until my next turn start, target crea. has their dmg. reflected as radiant. 10+10/SL dmg. max.",
	descriptionFull : "You place a binding on a creature you can see within range. Until the start of your next turn, any time that creature deals damage with its action, bonus action, or reaction, they take radiant damage equal to the damage dealt. The target is aware of the effect of this spell while affected. After reflecting 10 damage, spell ends." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the maximum damage increases by 10 for each spell slot level above 2nd."
};
SpellsList["lightning tendril"] = {
	name : "Lightning Tendril",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 30],
	level : 1,
	school : "Evoc",
	time : "1 bns",
	range : "S:20 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	description : "1d12 lightning dmg. to crea. in 20 ft. 2nd-3rd lvl: 2d12, 30 ft., 4th-5thL 3d12, 60 ft., 6th+ lvl: 4d12, 120 ft.",
	descriptionFull : "Crackling beams of blue energy leap from your hands. For the duration of the spell, as an action, you can direct them toward a creature within range, dealing 1d12 lightning damage to that creature." + AtHigherLevels + "When you cast this spell using a 2nd or 3rd-level spell slot, the damage increases to 2d12 and the range increases to 30 feet. When you cast it using a 4th or 5th-level spell slot, the damage increases to 3d12 and the range increases to 60 feet. When you cast it using a spell slot of 6th level or higher, the damage increases to 4d12 and the range increases to 120 feet."
};
SpellsList["mutate"] = { //Not sure whether to code any additional weapons/armor for this one, leaving it as is for now, but I could in the future?
	name : "Mutate",
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 31],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "S",
	components : "V,S,M",
	compMaterial : "Something from an extinct animal.",
	duration : "Conc, 10 min",
	description : "Gain 3+1/SL effects for duration. See book.",
	descriptionFull : "You manipulate the nature of your body with magic temporarily giving it new properties. You can select three of the following properties: \n\u2022 Your body becomes malleable and amorphous. You have advantage on saves and checks against grapples and the restrained condition, you do not suffer disadvantage from squeezing into smaller spaces, and you can squeeze through openings two sizes smaller than you. \n\u2022 You grow one additional appendage. This appendage serves as an arm and a hand, though it can take the shape of an arm, tentacle, or similar appendage. \n\u2022 You extend the length of your limbs, increasing the reach on melee attacks, touch spells, and object interactions by 5 feet. \n\u2022 Your flesh hardens, your base AC becomes 14 + your dexterity modifier if it is not already higher. \n\u2022 You grow more resilient, adapting against one external threat. You gain advantage on one type of saving throw of your choice. You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed. \n\u2022 Your body grows ablative armor. You gain temporary hi tpoints equal to your spellcasting ability modifier at the start of each of your turns. \n\u2022 You can grow one size larger or smaller. \n\u2022 You sprout wings. You gain a flying speed of 30 feet. \n\u2022 You grow a natural weapon; this weapon can have the statistics of any martial melee weapon without the thrown property, and takes on a form vaguely reminiscent of it. You have proficiency with this weapon, and are considered to be holding it. You can use your spellcasting modifier inplace of your Strength or Dexterity modifier for attack and damage rolls with this natural weapon. The natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it. \n For the duration of the spell, you can use an action to change one or all of the properties, losing the benefits of your previously selected properties and gaining the benefits of the new selected properties." + AtHigherLevels + "When you cast this spell using a spell slot of 4th or higher, you can select one additional property from the list of options, with one additional property per spell level above 3rd."
};
SpellsList["nauseating poison"] = {
	name : "Nauseating Poison", 
	classes : ["druid", "occultist", "warlock"],
	source : ["KT:Oc", 31],
	level : 1,
	school : "Necro",
	time : "1 bns",
	range : "S",
	components : "V,S,M",
	compMaterial : "A piece of rotten meat.",
	duration : "1 rnd",
	save : "Con",
	description : "Next melee spell atk. deals +1d8 poison dmg., hit crea. Con. save or poisoned until my next turn start.",
	descriptionFull : "You shroud your hand, a weapon you are holding, or a natural weapon in dark ichorous miasma. After casting this spell, if you make a successful melee spell attack, unarmed strike or a melee weapon attack, the target takes an additional 1d8 poison damage and must make a Constitution saving throw. On a failed save, the target becomes poisoned until the end of your next turn. \nThe spell ends after dealing damage, or at the start of yournext turn, whichever occurs first."
};
SpellsList["poison dart"] = {
	name : "Poison Dart", 
	classes : ["occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 31],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Ranged spell attack for 3d12+1d12/SL poison dmg., hit crea. Con. save or poisoned until my next turn start.",
	descriptionFull : "You conjure a dart of pure poison and hurl it at a creature you can see within range. Make a ranged spell attack. On a hit, the target takes 3d12 poison damage and must succeed a Constitution saving throw or become poisoned until the start of your next turn." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d12 for each slot level above 2nd."
};
SpellsList["poison puff"] = { 
	name : "Poison Puff", 
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : ["KT:Oc", 31],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "S:30 ft cone",
	components : "V,S",
	duration : "1 rnd",
	save : "Con",
	description : "Creas. in area Con. saves or 4d12 poison dmg. (half on success), 2d4 poison dmg. on turn ended in area.",
	descriptionFull : "You exhale a cloud of poison that magically expands to fill a 30 foot cone. Creatures in that area must make a Constitution saving throw. On a failure, they take 4d12 poison damage and become poisoned until the start of their next turn. On a success, the target takes half as much damage and is not poisoned. \nThe area is lightly obscured until the start of your turn, and any creature that ends their turn within the area takes 2d4 poison damage."
};
SpellsList["prismatic flash"] = { 
	name : "Prismatic Flash", 
	classes : ["occultist", "sorcerer", "spellblade", "warlock"],
	source : ["KT:Oc", 32],
	level : 1,
	school : "Illus",
	time : "1 a",
	range : "S:15 ft cone",
	components : "V,S,M",
	compMaterial : "A prism.",
	duration : "1 rnd",
	save : "Con",
	description : "Creas. in 15+5/SL ft. cone Con save. Fail, blind, no reactions, 1/2 speed. Success disadv. on atk. rolls.",
	descriptionFull : "A vivid rainbow of prismatic lights shoots from your hand. Each creature in a 15-foot cone must make a Constitution saving throw. On a failure, creatures are blinded and dazed until the end of your next turn. While they are dazed in this way they are unable to take reactions and their movement speed is halved. If a creature fails by 10 or more, it is additionally stunned for the duration. On a successful save, a creature is not blinded but is momentarily disoriented by the brilliant flash and has disadvantage on attack rolls until the end of your turn. \nCreatures that are already blinded or cannot see you aren't effected as they do not see the burst." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the size of the cone expands by 5 additional feet for each level about 1st."
};
SpellsList["quick sand"] = { 
	name : "Quick Sand", 
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 32],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A pinch of sand.",
	duration : "Conc, 1 min",
	save : "Str",
	description : "20 ft. radius, 4 ft. movement for each ft. moved. Crea. Str. save on turn end in radius or prone.",
	descriptionFull : "You cause the ground in a 20-foot radius centered on a point you can see to turn to quicksand for the duration of the spell. A creature moving through or out of the area must spend 4 feet of movement for every 1 foot it moves. A creature that ends their turn must make a Strength saving throw. On failure, they fall prone."
};
SpellsList["rain of spiders"] = { 
	name : "Rain of Spiders", 
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 32],
	level : 3,
	school : "Conj",
	time : "1 bns",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A spider leg.",
	duration : "Conc, 1 min",
	description : "1 Swarm of Spiders each chases creas. in 20 ft. radius, take turn after target, crea. Str./Dex. save to lose swarm.",
	descriptionFull : "A vertical column of spiders begins to rain down in 20 foot radius, 40 foot high cylinder, centered on a location you specify. A Swarm of Spiders (Monster Manual, pg 334) descends onto each creature within the cylinder when the spell is cast. \nThis swarm is considered to be climbing on the target creature and moves with it, even if they leave the affected area, and takes its turn immediately after that creature's turn. A creature can make use its action to attempt to get it off, making a Strength (Athletics) or Dexterity (Acrobatics) check against the spell save DC of the caster. \nA swarm will attack the creature it fell on if it can, or move to chase it if it has been knocked off of it. Any spiders that remain when the spell ends disappear."
};
SpellsList["sonic shriek"] = { 
	name : "Sonic Shriek", 
	classes : ["bard", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 33],
	level : 5,
	school : "Evoc",
	time : "1 a",
	range : "S:120 ft cone",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Creas. in area Con save or 6d8+1d8/SL thunder dmg. (half on success). Auto success if >60 ft. away.",
	descriptionFull : "You emit a sonic blast covering a huge area. Each creature in a 120-foot cone must make a Constitution saving throw. On a failed save, a creature takes 6d8 thunder damage. On a successful save, a creature takes half as much damage. A creature automatically succeeds on its saving throw if it is more than 60 feet from you." + AtHigherLevels + "When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th."
};
SpellsList["spider bite"] = { 
	name : "Spider Bite", 
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : ["KT:Oc", 33],
	level : 3,
	school : "Trans",
	time : "1 a",
	range : "Touch",
	components : "V,S",
	duration : "Instantaneous",
	save : "Con",
	description : "Melee spell attack for 4d12+1d12/SL poison dmg., crea. Con. save or poisoned for 1 min, can repeat save.",
	descriptionFull : "You prick a target with a tiny magical fang of venom. Make a melee spell attack against a creature within reach. On a hit, the target takes 4d12 poison damage and must succeed on a Constitution saving throw or becoming poisoned for 1 minute. At the end of each of its turns, the target can make another Constitution saving throw. On a success, the target is no longer poisoned. \nIf you miss your melee attack roll, you can concentrate (as if concentrating on a spell) to maintain the attack for another attempt until the end of your next turn. (You may make subsequent attempts until you hit or lose concentration)" + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d12 for each slot level above 3rd."
};
SpellsList["spiritual consultation"] = { 
	name : "Spiritual Consultation", 
	classes : ["occultist"],
	source : ["KT:Oc", 33],
	level : 1,
	school : "Necro",
	time : "1 min",
	range : "S",
	components : "V,S,M\u2020",
	compMaterial : "1 gp worth of incense, which the spell consumes.",
	duration : "10 min",
	description : "Summon spirit with prof. in a skill, I make those checks with prof., or spirit for Int./Wis., +5+1/SL (max. +9) in skill.",
	descriptionFull : "You call forth a spirit that is proficient in a skill from Arcana, Animal Handling, History, Investigation, Medicine, Nature, Perception, Religion, or Survival. The spirit is ethereal and ephemeral and cannot interact with physical objects, but can provide guidance on matters relating to the skill selected when you summon it. \nYou can treat any check you make in the skill as if you have proficiency with it so long as the spirit can communicate with you. Alternatively, if the ability check is an Intelligence or Wisdom check you can have the spirit make the check, and it has a +5 for the skill was summoned for. \nThe spirit will follow you and cannot stray more than 5 feet from you. You can choose to release it early, dismissing it back from whence it came." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the spirit's bonus making ability checks itself increases by 1 for each slot level above 1st, up to a maximum of +9."
};
SpellsList["stinging swarm"] = { 
	name : "Stinging Swarm", 
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : ["KT:Oc", 33],
	level : 4,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Conjure swarm of bugs, direct as bonus action. Crea. in bug's space makes Con. save or 2d12 poison dmg.",
	descriptionFull : "You conjure a magical swarm of flying insects that fill a 5 foot cube within range. For the duration of the spell, the swarm is magically replenished and cannot be destroyed. As a bonus action, you can direct the swarm to move up to 30 feet. If the swarm enters another creature's space, it stops and swarms them, stinging repeatedly, and cannot be moved until the start of your next turn. The creature takes 2d4 piercing damage and must make a Constitution saving throw, taking 2d12 poison damage on failure."
};
SpellsList["stone coffin"] = { 
	name : "Stone Coffin", 
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 33],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "Crea. Dex. save or restrained & blinded. AC 15 & 50+10/SL HP while trapped. I can deal 1d10 bludgeoning dmg. as bonus action.",
	descriptionFull : "You cause a surge of stone to attempt to engulf a Large or smaller creature in stone. The target must make a Dexterity saving throw. On a failure, they become restrained and blinded in the stone coffin. A creature can choose to fail their save. While trapped within the coffin, they have total cover against all sources. The coffin has an AC of 15 and 50 hit points, and resistance to all damage beside bludgeoning and thunder damage. When the spell ends or the coffin is reduced to 0 hit points, it crumbles to fragments and the creature within is no longer restrained and blinded. \nFor the duration of the spell you can use your bonus action to attempt to crush a creature encased in the coffin, dealing 1d10 bludgeoning damage." + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, the stone coffin gains 10 additional hit points for each level above 5th."
};
SpellsList["stone fist"] = { 
	name : "Stone Coffin", 
	classes : ["druid", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 34],
	level : 1,
	school : "Trans",
	time : "1 a",
	range : "S",
	components : "V,S",
	duration : "1 rnd",
	description : "Melee spell atk. for 2d10+1d10/SL bludgeoning dmg. Resist slashing or piercing dmg. attack as a reaction.",
	descriptionFull : "You turn your hand and forearm (or similar appendage) to stone until the start of your next turn. As part of casting the spell, you can make a melee spell attack against one creature you can reach. On a hit, the target takes 2d10 bludgeoning damage. \nUntil the start of your next turn, you can use your reaction when you take slashing or piercing damage from an attack to gain resistance to damage from that attack." + AtHigherLevels + "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st."
};
WeaponsList["stone fist"] = {
	regExpSearch : /^(?=.*stone)(?=.*fist).*$/i,
	name : "Stone Fist",
	source : ["KT:Oc", 34],
	list : "spell",
	ability : 5, //Wis here, but automatically determined by sheet
	type : "Spell",
	damage : [2, 10, "Bludgeoning"],
	range : "Melee",
	description : "+1d10/SL dmg.; Rea. to resist bludgeoning or piercing dmg. attack",
	abilitytodamage : false //Don't add to spells.
};
SpellsList["suffocate"] = { 
	name : "Suffocate", 
	classes : ["occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 34],
	level : 4,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "Crea. Con. save or -5d8 HP & disadv. on all saves/abil. checks. Force save again as action, 3+ fails incapacitates crea.",
	descriptionFull : "You create a whirling sphere of air around a creature that causes them to struggle to breathe. The target must make a Constitution saving throw. On a failure, the target loses 5d8 hit points due to lack of air, has disadvantage on all ability checks, and cannot speak. On a success, the target takes half as much damage and suffers no other effects. For the duration, as an action, you can force the creation to make a saving throw against the ability again. \nIf a target fails their saving throw against this spell 3 times in a row, they become incapacitated until they succeed on a save or the spell ends. If you don’t use your action to force the target to make a save, it counts as a success. \nA creature that does not need to breathe is unaffected by this spell."
};
SpellsList["summon swarm"] = { 
	name : "Summon Swarm", 
	classes : ["druid", "occultist", "wizard"],
	source : ["KT:Oc", 34],
	level : 2,
	school : "Conj",
	time : "1 a",
	range : "90 ft",
	components : "V,S,M\u0192",
	compMaterial : "A golden insect worth at least 200 gp.",
	duration : "Conc, 1 hr",
	description : "Summon Swarm Spirit (companion page). Takes turn after mine, issue orders as free action. See book.",
	descriptionFull : "You call forth a magical swarm. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Swarm Spirit stat block. When you cast the spell, choose from Quippers, Spiders, or Wasps. The swarm resembles the creatures of your choice, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends. \nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the Dodge action and uses its move to avoid damage." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, use the higher level whenever the spell's level appears in the stat block."
};
//Three CreatureList entries for the companion page, one for each of the swarm types.
CreatureList["spider swarm spirit"] = { 
	name : "Spider Swarm",
	nameAlt : "Swarm Spirit (Spiders)",
	source : ["KT:Oc", 34],
	size : 3,
	type : "Beast",
	subtype : "Swarm",
	alignment : "Unaligned",
	ac : 10,
	hp : 10,
	hd : ["", ""],
	attacksAction : 1,
	speed : "30 ft.",
	proficiencyBonus : 2,
	challengeRating : "",
	scores : [3, 13, 10, 1, 7, 1],
	senses : "Blindsight 10 ft., ",
	passivePerception : 8,
	damage_resistances : "bludgeoning; piercing; slashing",
	languages : "Any spoken by summoner",
	
	actions : [{
		name : "Multiattack",
		description : "The swarm makes a number of attacks equal to half the level of the spell used to summon it (rounded down)."
	}],
	
	attacks : [{
		name : "Bite",
		ability : 0,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "Multiattack; Add summoner's spell atk. mod. to atk. roll; add spell lvl. to piercing damage; 1d4 poison dmg. on hit",
		tooltip : "Melee weapon attack: your spell attack modifier, reach 0 ft., one target. Hit: 2d4 + the spell's level piercing damage + 1d4 poison damage.",
	}],
	
	traits : [{
		name : "Summon Swarm",
		description : "When summoned with the Summon Swarm spell, the swarms adds the level of the spell used to its Armor Class, and five times the level of the spell used to its health.",
	}],
	
	features : [{
		name : "Spider Climb",
		description : "The swarm can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
	}, {
		name : "Web Walker",
		description : "The swarm ignores movement restrictions caused by webbing.",
	}, {
		name : "Swarm",
		description : "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain hit points or gain temporary hit points.",
	}],

};
CreatureList["quipper swarm spirit"] = {
	name : "Quipper Swarm",
	nameAlt : "Swarm Spirit (Quippers)",
	source : ["KT:Oc", 34],
	size : 3,
	type : "Beast",
	subtype : "Swarm",
	alignment : "Unaligned",
	ac : 10,
	hp : 10,
	hd : ["", ""],
	attacksAction : 1,
	speed : "5 ft., swim 30 ft.",
	proficiencyBonus : 2,
	challengeRating : "",
	scores : [3, 13, 10, 1, 7, 1],
	senses : "Blindsight 10 ft., ",
	passivePerception : 8,
	damage_resistances : "bludgeoning; piercing; slashing",
	languages : "Any spoken by summoner",
	
	actions : [{
		name : "Multiattack",
		description : "The swarm makes a number of attacks equal to half the level of the spell used to summon it (rounded down)."
	}],
	
	attacks : [{
		name : "Bite",
		ability : 0,
		damage : [3, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "Multiattack; Add summoner's spell atk. mod. to atk. roll; add spell lvl. to piercing damage",
		tooltip : "Melee weapon attack: your spell attack modifier, reach 0 ft., one target. Hit: 2d4 + the spell's level piercing damage + 1d4 poison damage.",
	}],
	
	traits : [{
		name : "Summon Swarm",
		description : "When summoned with the Summon Swarm spell, the swarms adds the level of the spell used to its Armor Class, and five times the level of the spell used to its health.",
	}],
};
CreatureList["wasp swarm spirit"] = {
	name : "Wasp Swarm",
	nameAlt : "Swarm Spirit (Wasp)",
	source : ["KT:Oc", 34],
	size : 3,
	type : "Beast",
	subtype : "Swarm",
	alignment : "Unaligned",
	ac : 10,
	hp : 10,
	hd : ["", ""],
	attacksAction : 1,
	speed : "5 ft., fly 30 ft.",
	proficiencyBonus : 2,
	challengeRating : "",
	scores : [3, 13, 10, 1, 7, 1],
	senses : "Blindsight 10 ft., ",
	passivePerception : 8,
	damage_resistances : "bludgeoning; piercing; slashing",
	languages : "Any spoken by summoner",
	
	actions : [{
		name : "Multiattack",
		description : "The swarm makes a number of attacks equal to half the level of the spell used to summon it (rounded down)."
	}],
	
	attacks : [{
		name : "Bite",
		ability : 0,
		damage : [2, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "Multiattack; Add summoner's spell atk. mod. to atk. roll; add spell lvl. to piercing damage; 1d4 poison dmg. on hit",
		tooltip : "Melee weapon attack: your spell attack modifier, reach 0 ft., one target. Hit: 2d4 + the spell's level piercing damage + 1d4 poison damage.",
	}],
	
	traits : [{
		name : "Summon Swarm",
		description : "When summoned with the Summon Swarm spell, the swarms adds the level of the spell used to its Armor Class, and five times the level of the spell used to its health.",
	}],
};
SpellsList["twisting eruption"] = { 
	name : "Twisting Eruption", 
	classes : ["occultist"],
	source : ["KT:Oc", 35],
	level : 7,
	school : "Conj",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M",
	compMaterial : "A hanful of dead plants.",
	duration : "Conc, 1 min",
	save : "Dex",
	description : "Creas. in 60 ft. radius Dex save, or 2d10 bludgeoning & 2d10 necrotic dmg. I gain 1d4 HP on hit. See book.",
	descriptionFull : "You target a point and call forth tendrils, twisted vines, and gnarled roots of dark energy that erupt from the ground in a 60 foot radius. All creatures of your choice must make a Dexterity saving throw or be restrained as the shadowy plant tendrils grasp and drain the life from it. \nAt the start of a creature's turn, if it is restrained by the spell, it takes 2d10 bludgeoning damage, and 2d10 necrotic damage. Each time a creature takes necrotic damage from this spell, the caster regains 1d4 hit points. \nA creature restrained by the tendrils can use its action to make a Strength or Dexterity check (its choice) against your spell save DC. On a success, it frees itself. A tendril can be destroyed, freeing a creature from its grasp. They have an AC of 10, 20 hit point, and are immune to all damage besides radiant and fire. Spells that deal radiant or fire damage to creatures in an area of effect also affect tendrils in that area. \nCreatures that end their turn within the radius while not restrained must make a Dexterity saving throw or become restrained by the tendrils."
};
SpellsList["vicious hound"] = { 
	name : "Vicious Hound", 
	classes : ["bard", "occultist", "sorcerer", "warlock", "wizard"],
	source : ["KT:Oc", 35],
	level : 2,
	school : "Illus",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M",
	compMaterial : "A spiked collar.",
	duration : "Conc, 1 min",
	save : "Wis",
	description : "Hound follows crea., crea. must move 30+10/SL ft. or more away from Hound on turn or take 3d8 psychic dmg.",
	descriptionFull : "You summon a particularly vicious looking illusory hound that ferociously chases a target within range. Only the target can see the hound that chases them. The target creature can attempt to flee from the hound, moving at least 30 feet in any direction from where they start their turn. If the target does not flee or is unable to move at least 30 feet from where they started by the end of their turn, they take 3d8 psychic damage from being mauled by the hound at the end of the turn. The spell ends early if the target gets more than 120 feet from you. \n At the end of each of their turns, the target can make a Wisdom saving throw. On success, they realize the hound is an illusion, and the spell ends." + AtHigherLevels + "When you cast this spell using a spell slot of 3rd level or higher, the speed of the hound increases by 10 feet for each slot level above 2nd (meaning that the target must flee 10 additional feet to avoid taking the damage)."
};
SpellsList["vital surge"] = { 
	name : "Vital Surge", 
	classes : ["cleric", "druid", "occultist"],
	source : ["KT:Oc", 35],
	level : 4,
	school : "Trans",
	time : "1 min",
	range : "30 ft",
	components : "V,S",
	duration : "8 hr",
	description : "4+1/SL creas. can regain 4d8 HP as a bonus action. Can also roll half SL amount of hit dice & restore HP.",
	descriptionFull : "You infuse a vital surge of life into up to 4 creatures of your choice within range. Once during the duration of the spell, they can trigger this vital surge as a bonus action, regaining 4d8 hit points. When they trigger this surge, they can expend up to a number of hit dice equal to half the level of the spell slot used to cast this spell, rolling them as they normally would and adding the amount of hit points restored to the effect of this surge. \nOnce a creature triggers this healing surge, the spell ends for that creature" + AtHigherLevels + "When you cast this spell using a spell slot of 5th level or higher, you can target one additional creature for each slot level above 4th."
};
SpellsList["vicious vapors"] = { 
	name : "Vicious Vapours", 
	classes : ["druid", "occultist", "warlock", "wizard"],
	source : ["KT:Oc", 35],
	level : 2,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Conc, 1 min",
	save : "Con",
	description : "5 ft. cube of vapor, crea. entering makes Con save or 1d12 poison dmg. (half on success), poisoned until their next turn end.",
	descriptionFull : "You fill the air with poisonous vapors in a cube 5 feet on each side. A creature must make a Constitution saving throw when it enters the spell's area for the first time on their turn or starts its turn there. On a failed save, they take 1d12 poison damage and become poisoned until the end of their next turn. On a successful save, they take half as much damage and do not become poisoned.\n You can move the cloud of vapors up to 20 feet as a bonus action during your turn."
};
SpellsList["vortex blast"] = { 
	name : "Vortex Blast", 
	classes : ["druid", "occultist", "sorcerer", "wizard"],
	source : ["KT:Oc", 36],
	level : 3,
	school : "Evoc",
	time : "1 a",
	range : "S:30 ft cone",
	components : "V,S",
	duration : "Instantaneous",
	save : "Str",
	description : "Creas. take 2d6+1d6/SL bludgeoning, make Str. save or knocked 20 ft. away & 40 ft. up.",
	descriptionFull : "You create a sudden violent vortex that blasts outwards in a 30-foot cone, tossing characters and objects within the area. Creatures in the area take 2d6 bludgeoning damage and must succeed a Strength saving throw or be knocked 20 feet backward and 40 feet upward." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd."
};
SpellsList["wither"] = { 
	name : "Wither", 
	classes : ["occultist"],
	source : ["KT:Oc", 36],
	level : 3,
	school : "Necro",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A pinch of powdered bone and sand.",
	duration : "1 rnd",
	save : "Con",
	description : "Target Con. save or 4d10+1d10/SL necrotic dmg. (half on success) & weak/non-resistant to fire dmg.",
	descriptionFull : "Dark energy tears the moisture from a body, sapping it of life and vitality. The target must make a Constitution saving throw. The target takes 4d10 necrotic damage on a failed save and becomes withered until the start of your next turn, or half as much on a successful one and does not become withered. A withered creature gains vulnerability to fire damage if they are not resistant to fire damage, or loses their resistance to fire if they are resistant to fire." + AtHigherLevels + "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d10 for each slot level above 5th."
};
SpellsList["manipulate fate"] = { 
	name : "Manipulate Fate", 
	classes : ["occultist", "wizard"],
	source : ["KT:Oc", 36],
	level : 9,
	school : "Div",
	time : "1 a",
	range : "S",
	components : "V,S,M",
	compMaterial : "A spool of silk thread.",
	duration : "Conc, 1 min",
	save : "Con",
	description : "When crea. in range makes roll, change roll to adjacent number on dice. See book.",
	descriptionFull : "You reach out and grasp the imperceptible threads of fate, subtly manipulating them. Whenever a creature within 60 feet of you makes an attack roll, saving throw, or ability check, you can use your reaction to tweak their fate, altering the value of the roll. You can choose to manipulate fate after the die is rolled, but before the outcome is determined. You can alter the roll of the die to an adjacent number to the number rolled (outcomes listed on the table below)."+
	"\n\nd20 \tTweaked Fates\td20 \tTweaked Fates"+
	"\n1 \t7, 13, or 19\t11 \t4, 9, or 15"+
	"\n2 \t12, 18, or 20\t12 \t2, 10, or 15"+
	"\n3 \t17, 16, or 19\t13 \t1, 5, or 11"+
	"\n4 \t11, 14, or 18\t14 \t4, 6, or 20"+
	"\n5 \t13, 15, or 18\t15 \t, 5, 7, 12"+
	"\n6 \t9, 14, or 16\t16 \t3, 6, or 8"+
	"\n7 \t1, 15, or 17\t17 \t3, 7, or 10"+
	"\n8 \t10, 16, or 20\t18 \t2, 4, or 5"+
	"\n9 \t6, 11, or 19\t19 \t1, 3, or 9"+
	"\n10 \t8, 12, or 17\t20 \t2, 8, or 14"+
	"\n\nWhen you alter a roll, you can choose to cast aside subtlety and yank the thread of fate, and select any value of the d20 as the outcome of the result, but the backlash causes you to take a number d6 equal to the difference in the value selected from the value rolled in necrotic damage. The spell immediately ends after the result is changed in this more drastic way.",
};

RunFunctionAtEnd(function() {
	var theObj = ClassList["occultist"].features["occult rites"]; //The feature itself,  for shorthand				
	for (x in OccultRitesAll) {
		theObj.extrachoices.push(OccultRitesAll[x].name);
		theObj[OccultRitesAll[x].name.toLowerCase()] = OccultRitesAll[x];
	}
	for (x in WitchRites) {
		theObj.extrachoices.push(WitchRites[x].name);
		theObj[WitchRites[x].name.toLowerCase()] = WitchRites[x];
	}
	for (x in HedgeRites) {
		theObj.extrachoices.push(HedgeRites[x].name);
		theObj[HedgeRites[x].name.toLowerCase()] = HedgeRites[x];
	}
	for (x in OracleRites) {
		theObj.extrachoices.push(OracleRites[x].name);
		theObj[OracleRites[x].name.toLowerCase()] = OracleRites[x];
	}
	for (x in ShamanRites) {
		theObj.extrachoices.push(ShamanRites[x].name);
		theObj[ShamanRites[x].name.toLowerCase()] = ShamanRites[x];
	}
});

//This is an absolutely shocking way of doing this, but I'm out of ideas and this is giving me a headache. IDK how to check for the subclass selected inside one of these, so there's prereqs that return "skip" on all of the regular rites, while the ones below have no subclass prereqs, and are purely here to be added to the Hedge Mage's Stolen Techniques rite list.

var WitchRitesNP = { //The list of all Witch-specific Rites WITHOUT SUBCLASS PREREQS
	animate_broom : {
		name : "Animate Broom",				
		source : [["KT:Oc", 6]],
		description : desc([
			"I turn a broom or broom-shaped object into a Broom of Flying. I can make a new Broom",
			"over the course of 8 hours, causing my previous Broom to lose its magical effect."
		]),
		magicitemsAdd : ["Broom of Flying"],
	},
	animate_hair : {
		name : "Animate Hair",				
		source : [["KT:Oc", 7]],
		description : desc([
			"As an action, I can expend a 1st level spell slot to cause my hair to lengthen, strengthen,", 
			"and come alive for 1 minute. After using this feature, and as an action afterwards, I can",
			"make a melee spell attack with a range of 10 ft. dealing 1d8 bludgeoning damage on hit,",
			"increasing with level.  My reach with touch spells is also increased to 10 ft.",
			"After hitting a large or smaller creature, I can attempt to grapple it, using my Wisdom",
			"modifier instead of Strength. A creature can try to escape as normal, or deal 5 slashing,",
			"fire, or acid damage to my hair to escape. My hair has an AC of 12, and I take no damage",
			"when it is attacked.",
		]),
		additional : levels.map(function (n) {
			return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d8 bludgeoning dmg.";
		}),
		action : ["action", " (summon/attack)"],
		//Animated Hair attack entry
		weaponOptions : {
			baseWeapon : "unarmed strike",
			regExpSearch : /animated hair/i,
			name : "Animated Hair",
			source : ["KT:Oc", 7],
			ability : 5,
			range : "10 ft",
			damage : ["C", 8, "bludgeoning"],
			abilitytodamage : false,
			description : "Touch spells 10ft. range; Can grapple large or smaller crea. hit (Wis. mod.)", 
		},
		weaponsAdd : ["Animated Hair"],
	},
	companion_coven : {
		name : "Companion Coven",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I can perform an hour-long ritual to bond with a willing creature. While both of us are",
			"conscious and within 120 ft. of each other, I know their location at all times, and I am",
			"able to share a number of spell slots with them.",
			"I can cast spells using my bonded creature's spell slots as normal, and if they're able, they",
			"can cast spells using my shared spell slots.",
		]),
		additional : levels.map(function (n) {
			return Math.max(Math.floor(n/4), 1) + "lvls. of shared spell slots.";
		})
	},
	curse_specialist : {
		name : "Curse Specialist",				
		source : [["KT:Oc", 7]],
		description : desc([
			"All Curses and Hexes granted by Witch Covens are added to my spell list, and I learn a",
			"single bonus Curse or Hex",
		]),
		spellcastingBonus : {
			name : "Curse Specialist",
			spells : ["befuddling curse", "binding hex", "curse of misfortune", "curse of doom", "enfeebling hex", "karmic hex", "killing curse", "rotting curse", "swapping curse"],
			times : 1,
		},
		
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					//Add the extra spells.
					spList.extraspells = spList.extraspells.concat(["befuddling curse", "binding hex", "curse of misfortune", "curse of doom", "enfeebling hex", "karmic hex", "killing curse", "rotting curse", "swapping curse"]);
				},
				"I gain all Curses and Hexes granted by Witch Covens."
			],
		}	
	},
	divine_presence : {
		name : "Divine Presence (prereq: White Coven)",				
		source : [["KT:Oc", 7]],
		description : desc([
			"My familiar is permanently under the effect of the Sanctuary spell. After dealing damage,",
			"the effect is lost until the start of its next turn.",
		]),
		prereqeval : function(v) {
			return GetFeatureChoice("classes", "occultist", "subclassfeature1.1").indexOf("white coven") != -1 ? true : false;
		},
		//Adds the sanctuary effect to the traits section on the familiar page.
		calcChanges : {
			companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
				if (sCompType !== "familiar") return;
					var str = "\u25C6 Divine Presence: This familiar is permanently under the effect of the Sanctuary spell. After dealing damage, the effect is lost until the start of its next turn.";
					var aFnc = bAdd ? AddString : RemoveString;
					aFnc(prefix + "Comp.Use.Traits", str, true);
					//This function just adds the var str to the traits section of the companion page
			}]
		}
	},
	familiar_swap : {
		name : "Familiar Swap",				
		source : [["KT:Oc", 7]],
		description : desc([
			"While my familiar is within 60 ft. of me, I can swap places with it as an action once per",
			"short or long rest. If I cannot fit into the space my familiar occupies, this ability fails, and",
			"I take 1d6 force damage.",
		]),
		action : ["action", ""],
		usages : 1,
		recovery : "short rest",
	},
	form_of_the_familiar : {
		name : "Form of the Familiar",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I learn the Form of Familiar spell, and can cast it as an action once per short or long rest",
			"without expending a spell slot.",
		]),
		action : ["action", ""],
		limfeaname : "Form of Familiar",
		usages : 1,
		recovery : "short rest",
		spellcastingBonus : {
			name : "Form of Familiar",
			spells : ["form of familiar"],
			selection : ["form of familiar"],
			firstCol : "oncesr",
		},
	},
	light_of_the_moon : {
		name : "Light of the Moon",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I learn the Faerie Fire and Moonbeam spells. When I cast them, allied creatures of my choice",
			"within the area of effect are unaffected, and gain temporary hit points equal to my Wisdom",
			"modifier.",
		]),
		spellcastingBonus : {
			name : "Light of the Moon",
			spells : ["faerie fire", "moonbeam"],
			selection : ["faerie fire", "moonbeam"],
			times : 2,
		},
	},
	riding_familiar : {
		name : "Riding Familiar",				
		source : [["KT:Oc", 7]],
		description : desc([
			"If my familiar has no flying speed, once per short or long rest as an action, I can make",
			"them one size larger than myself (up to Large), and giving them 10 Strength (if it was not",
			"already higher than that) for 8 hours. I can revert them to normal as an action. At 12th",
			"level, I am able to use this ability on familiars with flying speed.",
		]),
		action : ["action", " (enlarge/revert)"],
		usages: 1,
		recovery : "short rest",
	},
	skulking_familiar : {
		name : "Skulking Familiar",				
		source : [["KT:Oc", 7]],
		description : desc([
			"Familiars I summon gain proficiency in Dexterity (Stealth), and don't provoke opportunity",
			"attacks when moving.",
		]),
		calcChanges : {
			//companionCallback runs when a special type of familiar is added (e.g. from the find familiar spell.)
			companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
				if (sCompType !== "familiar") return; //Check whether the companion is a familiar
					if(!typePF) { //Check whether the sheet is the printer-friendly or not, since the sheet entries are differently named.
						var skillFld = prefix + "Text.Comp.Use.Skills.Ste.Prof";
					} else {
						var skillFld = prefix + "Comp.Use.Skills.Ste.Prof";
					}
					
					if(!typePF) {
						Value(skillFld, "proficient");
					} else {
						Checkbox(skillFld, "proficient");
					}

					var str = "\u25C6 Skulking Familiar: This familiar gains proficiency in Dexterity (Stealth), and doesn't provoke opportunity attacks when moving.";
					var aFnc = bAdd ? AddString : RemoveString;
					aFnc(prefix + "Comp.Use.Traits", str, true);
					//This function just adds the var str to the traits section of the companion page
			}]
		},
	},
	witchs_brew : {
		name : "Witch's Brew",				
		source : [["KT:Oc", 7]],
		description : desc([
			"During a short or long rest, I can infuse a spell with a casting time of one action/bonus",
			"action into a potion, expending the appropriate spell slot in the process. Anyone who",
			"drinks this potion as an action can cast the stored spell, using my spellcasting ability",
			"modifier. The potion can be used until I regain the spell slot used to create it.",
		]),
	},
	witchs_claws : {
		name : "Witch's Claws",				
		source : [["KT:Oc", 7]],
		description : desc([
			"As an action, I can make a melee spell attack against a creature, dealing 1d10 + my Wisdom",
			"modifier slashing damage, increasing with level. At 6th level, I can apply my Witch's Touch",
			"feature with this attack.",
		]),
		additional : levels.map(function (n) {
			return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d10 slashing dmg.";
		}),
		//Witch's Claws attack entry
		weaponOptions : {
			baseWeapon : "unarmed strike",
			regExpSearch : /witch\'s claws/i,
			name : "Witch's Claws",
			source : ["KT:Oc", 7],
			ability : 5,
			range : "10 ft",
			damage : ["C", 10, "slashing"],
			abilitytodamage : true,
			description : "Can apply Witch's Touch after 6th lvl", 
		},
		weaponsAdd : ["Witch's Claws"],
	},
	witchs_hat : {
		name : "Witch's Hat",				
		source : [["KT:Oc", 7]],
		description : desc([
			"I turn a hat into a Hat of Disguise. I can make a new Hat over the course of 2 hours,",
			"causing my previous Hat to lose its magical effect.",
		]),
		magicitemsAdd : ["Hat of Disguise"],
	},
};	

var HedgeRitesNP = { //The list of all Hedge Mage-specific Rites WITHOUT SUBCLASS PREREQS
	hedge_magic : {
		name : "Hedge Magic",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic",
			level : [0, 0],
			times : 1,
		}],
	},
	//Functions the same way as Occult Magic
	hedge_magic2 : {
		name : "Hedge Magic (2)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (2)",
			"class" : ["occultist"],
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic') != -1 ? true : "skip"; 
		},
	},
	hedge_magic3 : {
		name : "Hedge Magic (3)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (3)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (2)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic4 : {
		name : "Hedge Magic (4)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (4)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (3)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic5 : {
		name : "Hedge Magic (5)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (5)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (4)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic6 : {
		name : "Hedge Magic (6)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (6)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (5)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic7 : {
		name : "Hedge Magic (7)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (7)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (6)') != -1 ? true : "skip"; 
		},
	},
	hedge_magic8 : {
		name : "Hedge Magic (8)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn an additional cantrip from the lists available to me. I can select this rite multiple times.",
		]),
		spellcastingBonus : [{	
			name : "Hedge Magic (8)",
			level : [0, 0],
			times : 1,
		}],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('hedge magic (7)') != -1 ? true : "skip"; 
		},
	},
	
	i_know_that_one : {
		name : "I Know That One!",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I have advantage on saving throws against and spellcasting ability checks to use the",
			"Counterspell or Dispel Magic spells against spells I know.",
		]),
	},
	manipulate_magic : {
		name : "Manipulate Magic (prereq: 5th level Hedge Mage)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn one Metamagic option of my choice from the Sorcerer class. Once per long rest,",
			"I can use this option with up to three Sorcery Points for free. I can also expend a spell slot",
			"with a level equal to the points I would spend on the option to use it.",
		]),
		limfeaname : "Manipulate Magic",
		usages: 1,
		recovery: "long rest",
		bonusClassExtrachoices : [{
			"class" : "sorcerer",
			feature : "metamagic",
			bonus : 1
		}],
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 5);
		},
	},
	mass_cantrip : {
		name : "Mass Cantrip",				
		source : [["KT:Oc", 11]],
		description : desc([
			"When I cast an Occultist cantrip that targets one or more creatures, I can make it target",
			"additional creatures within range equal to my Proficiency Bonus. I can use this ability",
			"once per long rest, or by expending a spell slot to target a number of creatures equal to",
			"the spent slot's level.",
		]),
		usages: 1,
		recovery: "long rest",
	},
	mastered_basics : {
		name : "Mastered Basics (prereq: 15th level Hedge Mage)",				
		source : [["KT:Oc", 11]],
		description : desc([
			"When I cast an Occultist spell I know using a 1st level spell slot, it is cast as if I had used a",
			"2nd level spell slot.",
		]),
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 15);
		},
	},
	practice_makes_perfect : { //Not sure how much more I can do with this.
		name : "Practice Makes Perfect", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I choose a 1st level Occultist spell I know. I can now cast this spell without expending a",
			"spell slot a number of times equal to half my Proficiency Bonus (rounded up) per long rest.",
		]),
		usagescalc : "event.value = Math.ceil(How('Proficiency Bonus')/2)",
		usages : "1/2 Prof. bonus per",
		recovery : "long rest",
	},
	practiced_reach : {
		name : "Practiced Reach", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"When I use The Way I Learned It to add range to a spell, I can increase the spell's range up",
			"to a maximum of 30 ft.",
		]),
	},
	potent_cantrip : {
		name : "Potent Cantrip (prereq: 7th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"When a creature succeeds on a saving throw against one of my cantrips, they take half of",
			"the cantrip's damage (if any), but suffer no additional effect from it.",
		]),
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 7);
		},
	},
	savant_focus : {
		name : "Savant Focus (prereq: 7th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"As a bonus action, I enter a state of focus, using my spell concentration to maintain it.",
			"During this state, I have advantage on all cantrip attack rolls for 1 minute, or until I lose",
			"my concentration.",
		]),
		limfeaname : "Savant Focus",
		action : ["bonus action", ""],
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 7);
		},
	},

	//Same as Occult Magic once again.
	studious_mage : {
		name : "Studious Mage (prereq: 3rd level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 3);
		},
	},
	studious_mage2 : { 
		name : "Studious Mage (2)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (2)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (2)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (prereq: 3rd level hedge mage)') != -1 ? true : "skip"; 
		},
	},
	studious_mage3 : { 
		name : "Studious Mage (3)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (3)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (3)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (2)') != -1 ? true : "skip"; 
		},
	},
	studious_mage4 : { 
		name : "Studious Mage (4)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (4)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (4)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (3)') != -1 ? true : "skip"; 
		},
	},
	studious_mage5 : { 
		name : "Studious Mage (5)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (5)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (5)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (4)') != -1 ? true : "skip"; 
		},
	},
	studious_mage6 : {
		name : "Studious Mage (6)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (6)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (6)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (5)') != -1 ? true : "skip"; 
		},
	},
	studious_mage7 : { 
		name : "Studious Mage (7)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (7)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (7)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (6)') != -1 ? true : "skip"; 
		},
	},
	studious_mage8 : { 
		name : "Studious Mage (8)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast.",
			"I can select this rite multiple times.",
		]),
		spellcastingBonus : {
			name : "Studious Mage (8)",
			"class" : ["wizard", "druid"],
			level : [1,9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Studious Mage (8)") {
						//Get the Occultist level, calculate what one less than the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 5 ? 1 : aLvl < 7 ? 2 : aLvl < 9 ? 3 : aLvl < 11 ? 4 : aLvl < 13 ? 5 : aLvl < 15 ? 6 : aLvl < 17 ? 7 : 8;
						
						spList.level = [lvl,lvl];
					}
				},
				"I learn a Wizard or Druid spell of a level lower than the highest spell level I can cast."
			]
		},
		
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('studious mage (7)') != -1 ? true : "skip"; 
		},
	},
	
	simple_magic : {
		name : "Simple Magic (prereq: 5th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"I can sacrifice a spell slot of 3rd level or higher to gain two 1st level spell slots, or two",
			"2nd level spell slots if I sacrifice a 5th level spell slot. I can store up to double my usual",
			"maximum spell slots this way.",
		]),
		additional : levels.map(function (n) {
			return (n < 3 ? (n + 1) : 4) + " 1st lvl., " + (n < 4 ? 2 : 3) + " 5th lvl. slots max.";
		}),
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 5);
		},
	},
	utility_master : {
		name : "Utility Master (prereq: 5th level Hedge Mage)", 				
		source : [["KT:Oc", 11]],
		description : desc([
			"My cantrips that lift weight, affect external elements, target a ground area, or cause",
			"minor instantaneous effects can lift twice as much, target twice the area, or maintain an",
			"additional effect.",
		]),
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the hedge mage" && classes.known.occultist.level >= 5);
		},
	},
};

var OracleRitesNP = { //The list of all Oracle-specific Rites WITHOUT SUBCLASS PREREQS
	death_watcher : {
		name : "Death Watcher (prereq: 12th level Occultist)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"Once per long rest, when an ally that can see or hear me would drop to 0 hit points as",
			"a result of taking damage, I can cause them to drop to 1 hit point instead as a reaction.",
		]),
		limfeaname: "Death Watcher",
		usages : 1,
		recovery : "long rest",
		action : ["reaction", ""],
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 12);
		},
	},
	divine_miracle : {
		name : "Divine Miracle", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"I learn a Cleric spell of my choice as a bonus spell. The spell must be of a level I can cast.",
			"It counts as an Occultist spell for me.",
		]),
		spellcastingBonus : { //just adds a bonus cleric spell, logically a player would pick a spell of a level they can cast, so I've excluded this from the description even though it's in the write up.
			name : "Divine Miracle",
			"class" : ["cleric"],
			level : [1, 9],
		},
		calcChanges : {
			spellList : [
				function(spList, spName, spType) {
					
					//Set the spellcastingBonus level as such.
					if (spList.name === "Divine Miracle") {
						//Get the Occultist level, calculate what the highest level castable spell is.
						var aLvl = classes.known.occultist.level;
						var lvl = aLvl < 3 ? 1 : aLvl < 5 ? 3 : aLvl < 7 ? 4 : aLvl < 9 ? 5 : aLvl < 11 ? 5 : aLvl < 13 ? 6 : aLvl < 15 ? 7 : aLvl < 17 ? 8 : 9;
						
						//The spells shown by the bonus spell drop down range in level from 1 to the max castable 
						spList.level = [1,lvl];
					}
				},
				"I learn a Cleric spell of my choice as a bonus spell. The spell must be of a level I can cast."
			]
		},
	},
	divine_sight : {
		name : "Divine Sight (prereq: 15th level Occultist)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"If I have Blindsight, I gain Truesight with an equal range.",
		]),
		vision : [["Truesight (if Blindsight, equal to its range)", ""]],
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 15);
		},
	},
	oracles_sight : {
		name : "Oracle's Sight", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"I gain 15ft of Blindsight. If under the Blinded condition for more than a minute, the range",
			"of my Blindsight is doubled while still under the condition.",
		]),
		vision : [["Blindsight", 15]],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf("blind") != -1 ? "skip" : true; 
		},
	},
	
	revelation_darkness : {
		name : "Revelation of Darkness (prereq: Mystery of Darkness)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast creates dim light or darkness, or if it obscures me",
			"from the vision of one or more creatures, I can teleport to another space within 30 ft. that is",
			"in dim light or darkness.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of darkness') != -1 ? true : false; 
		},
	},
	revelation_death : {
		name : "Revelation of Death (prereq: Mystery of Death)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast deals cold or necrotic damage, I can add my",
			"Wisdom modifier to one damage roll of that spell. This reduces my movement by 5 ft. until",
			"the end of my next turn. If my movement is already reduced, my movement is reduced by a",
			"further 5 ft. and the duration is extended.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of death') != -1 ? true : false; 
		},
	},
	revelation_fire : {
		name : "Revelation of Fire (prereq: Mystery of Fire)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast deals fire damage, I can shroud myself in fire until",
			"the end of my next turn, gaining half cover, and dealing 1d6 fire damage to creatures that",
			"hit me with melee attacks of end their turns within 5 ft. of me. At the start of my next turn,",
			"I take 1 fire damage.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1 ? true : false; 
		},
	},
	revelation_life : {
		name : "Revelation of Life (prereq: Mystery of Life)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When a spell of 1st level or higher I cast restores hit points, or grants temporary hit points,",
			"I can heal a creature within 30 ft. other than myself for a number of hit points equal to my",
			"Occultist level, reducing my own current hit points by half that amount. I cannot heal",
			"undead, constructs, or creatures at 0 hit points with this ability.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of life') != -1 ? true : false; 
		},
	},
	revelation_light : {
		name : "Revelation of Light (prereq: Mystery of Light)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When I cast the Prismatic Flash spell, or a spell of 1st level or higher that sheds 5 or more",
			"ft. of bright light, as a bonus action I can force a creature within 30 ft. of the light to",
			"succeed on a Dexterity saving throw, or become blinded until the start of my next turn.",
			"Creatures that don't rely on sight, or that can perceive illusions as false are unaffected.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),
		limfeaname : "Revelation of Light",
		action : ["bonus action", ""],

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of light') != -1 ? true : false; 
		},
	},
	revelation_souls : {
		name : "Revelation of Souls (prereq: Mystery of Souls)", 				
		source : [["KT:Oc", 14]],
		description : desc([
			"When I cast a spell of 1st level or higher, I can summon a medium sized Benevolent or",
			"Tormented Spirit to an empty space within 30 ft. If the Spirit is Benevolent, the first creature",
			"to enter its space gains 1d4 + the triggering spell's level in hit points. If it is Tormented, they",
			"take the same amount in necrotic damage instead.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of souls') != -1 ? true : false; 
		},
	},
	revelation_war : {
		name : "Revelation of War (prereq: Mystery of War)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When I cast a spell of 1st level or higher, I can make a single melee weapon attack as a",
			"bonus action. After reaching 6th level, I can trigger this Revelation after casting an Occultist",
			"cantrip.",
			"If multiple Revelations apply to a spell, I can only choose one to activate.",
		]),

		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of war') != -1 ? true : false; 
		},
	},
	
	touch_fire : {
		name : "Touch of Fire (prereq: Mystery of Fire)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"I learn the Burn cantrip. Additionally, as a bonus action, I can take 1 fire damage to cause",
			"a weapon I'm carrying to burst into flames for 1 minute, or until I let go of it. While",
			"burning, it sheds 10 ft. of bright light, and another 10 ft. of dim light, and deals an extra",
			"1d6 fire damage on hit.",
		]),
		spellcastingBonus : {
			name : "Touch of Fire",
			spells : ["burn"],
			selection : ["burn"],
		},
		limfeaname : "Touch of Fire",
		action : ["bonus action", " (ignite)"],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1 ? true : false; 
		},
	},
	truth_darkness : {
		name : "Truth of Darkness (prereq: Mystery of Darkness)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"The range of any Darkvision or Blindsight I have is doubled. If I have neither, I gain",
			"Darkvision to 60 ft.",
		]),
		vision : [
			["Darkvision", 30], //Doubled by the next entry
			["Darkvision", "*2"], 
			["Blindsight", "*2"]
		],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of darkness') != -1 ? true : false; 
		},
	},
	truth_death : {
		name : "Truth of Death (prereq: Mystery of Death)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"Necrotic damage I deal ignores resistance, and treats immunity as resistance. Dealing",
			"necrotic damage also inflicts my Touch of Death on the target, and any hit points they",
			"gain are halved for the duration of it.",
		]),
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of death') != -1 ? true : false; 
		},
	},
	truth_fire : {
		name : "Truth of Fire (prereq: Mystery of Fire)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When I roll fire damage, I can reroll any number of the damage dice, and I must use the",
			"new rolls. If I reroll all the damage roll's dice, the damage bypasses any resistance. For",
			"each die I reroll, I take 1 fire damage.",
		]),
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of fire') != -1 ? true : false; 
		},
	},
	truth_life : {
		name : "Truth of Life (prereq: Mystery of Life)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When a creature dies within 60 ft. of me, I can use my reaction to give it hit points equal",
			"to my Wisdom modifier, or the maximum hit points of another target creature within 60 ft.,",
			"whichever is lowest.",
		]),
		limfeaname : "Truth of Life",
		action : ["reaction", ""],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of life') != -1 ? true : false; 
		},
	},
	truth_light : {
		name : "Truth of Light (prereq: Mystery of Light)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"Magical bright light I create reveals invisible creatures, and imposes disadvantage on their",
			"rolls to hide within it. It also grants advantage on saving throws and ability checks against",
			"illusions. As a bonus action, I can remove these effects from a source of bright light for the",
			"duration it is active.",
		]),
		limfeaname : "Truth of Light",
		action : ["bonus action ", " (remove effect)"],
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of light') != -1 ? true : false; 
		},
	},
	truth_souls : {
		name : "Truth of Souls (prereq: Mystery of Souls)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"I have advantage on Constitution saving throws to maintain concentration on spells",
			"granted by my Mystery of Souls.",
		]),
		prereqeval : function(v) { 
			return GetFeatureChoice('class', 'occultist', 'subclassfeature1', true).indexOf('mystery of souls') != -1 ? true : false; 
		},
	},
	truth_war : {
		name : "Truth of War (prereq: Revelation of War, 5th level Occultist)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When I cast a spell of 1st level or higher, on the next melee weapon attack I hit before my",
			"turn ends, I can force the target of that attack to make a saving throw against my Spell",
			"Save DC, suffering from a condition based on the level of the spell cast (I can choose a",
			"lower level's condition):",
			"   Spell Level\t Condition\t Save\t",
			"    1st\t Prone\t Strength",
			"    2nd\t Poisoned\t Constitution",
			"    3rd\t Frightened\t Wisdom",
			"    4th\t Blinded\t Constitution",
			"    5th\t Restrained\t Strength",
			"    6th+\t Stunned\t Constitution",
		]),
		prereqeval : function(v) { 
			return ((classes.known.occultist.level >= 5) && (GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf('revelation of war (prereq: mystery of war)') != -1));
		},
	},
	
	twin_revelation : {
		name : "Twin Revelation (prereq: 9th level Occultist)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"When casting a spell that would invoke a Revelation, I can invoke two Revelations",
			"simultaneously instead.",
		]),
		prereqeval : function(v) { 
			return classes.known.occultist.level >= 9; 
		},
	},
	halo_mystery : {
		name : "Halo of Mystery (prereq: 15th level Occultist)", 				
		source : [["KT:Oc", 15]],
		description : desc([
			"Whenever I roll initiative, or as a bonus action at any time, I invoke one of my known",
			"Mysteries to give myself a Halo, which grants me a specific effect until another Mystery is",
			"invoked, or until it is dismissed as a bonus action:",
			"\u2022 Darkness: You have half cover against attacks, and are always considered to be in dim",
			"light regardless of your surroundings.",
			
			"\u2022 Death: I gain resistance to necrotic damage, and if I am reduced to 0 hit points, I can",
			"make a Wisdom saving throw (DC 10 + the damage taken) to be reduced to 1 hit point.",
			
			"\u2022 Fire: I shed bright light for 5 ft., and dim light for another 5 ft. I gain resistance to fire",
			"damage, and immunity to fire damage from my own spells.",
			
			"\u2022 Life: When I restore a creatures hit points, they gain temporary hit points equal to half",
			"the amount I restored.",
			
			"\u2022 Light: I shed bright light for 20 ft., and dim light for another 20 ft., interacting with Truth",
			"of Light. I gain resistance to radiant damage.",
			
			"\u2022 Souls: I gain a flying speed of 20 ft. and can pass through creatures, and objects less than",
			"a foot thick. I ignore all difficult terrain.",
			
			"\u2022 War: When I take damage, I can subtract my Wisdom modifier from the amount I take, to",
			"a minimum of 1.",
		]),
		limfeaname : "Halo of Mystery",
		action : ["bonus action", " (invoke/dismiss)"],
		prereqeval : function(v) { 
			return classes.known.occultist.level >= 15; 
		},
	},
};

var ShamanRitesNP = { //The list of all Shaman-specific Rites WITHOUT SUBCLASS PREREQS
	avatar_elements : {
		name : "Avatar of the Elements (prereq: 11th level Shaman)", 				
		source : [["KT:Oc", 16]],
		description : desc([
			"I learn the Form of Fire, Form of Ice, and Form of Stone spells. When casting these spells,",
			"I can choose to shorten the duration of them to 1 minute. Doing so removes the",
			"concentration requirement.",
		]),
		spellcastingBonus : {
			name : "Avatar of the Elements",
			spells : ["form of fire", "form of ice", "form of stone"],
			selection : ["form of fire", "form of ice", "form of stone"],
			times : 3,
		},
		prereqeval : function(v) { 
			return (classes.known.occultist.subclass === "occultist-tradition of the shaman" && classes.known.occultist.level >= 11);
		},
	},
	dance_spirits : {
		name : "Dance of the Spirits (prereq: 5th level Occultist)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"When I cast the Spirit Guardians spell, I can choose the spell's damage type from cold,",
			"fire, lightning, necrotic, and radiant regardless of alignment. Additionally, I have advantage",
			"on Constitution saving throws maintain concentration on Spirit Guardian and other",
			"spirit-summoning spells.",
		]),
		savetxt : { text : ["Adv. on Con. saves for Spirit Guardians, other spirit spells"] },
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 5);
		},
	},
	detonate_spirit : {
		name : "Detonate Spirit", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I can detonate a spirit manifested by my Call Spirit feature as an action. When I do so,",
			"all creatures within 10 ft. of it must make a Dexterity saving throw, taking twice the spirit's",
			"manifested damage on a failed save, or half that on a success if was manifested with a",
			"spell slot. The spirit disappears after using this ability.",
		]),
		action : ["action", ""],
	},
	elemental_weapons : {
		name : "Elemental Weapons (prereq: Fists of Fire or Ice Weapon cantrip)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"When I use the Fists of Fire or Ice Weapon cantrips, the damage die of the created weapon",
			"is raised to the next die up.",
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/ice/i).test(v.WeaponTextName) || (/fists of fire/i).test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Use next damage die up';
					};
				},
				"The damage die of my Fists of Fire and Ice Weapons are increased to the next die up."
			],
		},
		prereqeval : function(v) { 
			return (isSpellUsed('fists of fire', true) || isSpellUsed('ice weapon', true)); 
		},
	},
	energized_weapon : {
		name : "Energized Weapon (prereq: 3rd level Occultist)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"While I am bonded with an empowered spirit from my Call Spirit and Empowered Spirits",
			"features, as a bonus action I can cause my next weapon attack to deal twice the additional",
			"damage. If manifested, the spirit is recalled when I do this, and after attacking, the spirit",
			"is released entirely.",
		]),
		limfeaname : "Energized Weapon",
		action : ["bonus action", ""],
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 3);
		},
	},
	guidance_spirits : {
		name : "Guidance of the Spirits (prereq: 3rd level Occultist)", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"When I expend a spell slot as part of my Empowered Spirits feature, I can give the spirit",
			"proficiency in a number of skills equal to the level of the spell slot used to empower it.",
			"While the spirit isn't manifested, I gain proficiency with these skills.",
			"If I expend a 5th level or higher spell slot, I can exchange three skill proficiencies to gain",
			"expertise in one skill.",
		]),
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 3);
		},
	},
	mistwalker : {
		name : "Mistwalker", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I can see through fog, mist, and smoke. While shrouded by any of these, I also have half cover.",
		]),
	},
	
	primal_earth : {
		name : "Primal Earth", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Create Pit, Earth Ripple, Seismic Wave, Orbital Stones, and Fissure spells.",
		]),
		spellcastingExtra : ["create pit", "earth ripple", "seismic wave", "orbital stones", "fissure"],
	},
	primal_fire : {
		name : "Primal Fire", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Burning Hands, Scorching Ray, Fireball, Wall of Fire, and Pyroclastic Lance spells.",
		]),
		spellcastingExtra : ["burning hands", "scorching ray", "fireball", "wall of fire", "pyroclastic lance"],
	},
	primal_ice : {
		name : "Primal Ice", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Arctic Breath, Cold Snap, Sleet Storm, Ice Storm, and Cone of Cold spells.",
		]),
		spellcastingExtra : ["arctic breath", "cold snap", "sleet storm", "ice storm", "cone of cold"],
	},
	primal_storm : {
		name : "Primal Storm", 				
		source : [["KT:Oc", 17]],
		description : desc([
			"I learn the Thunderwave, Gust of Wind, Lightning Bolt, Jumping Jolt, and Sky Burst spells.",
		]),
		spellcastingExtra : ["thunderwave", "gust of wind", "lightning bolt", "jumping jolt", "sky burst"],
	},
	
	radiate_power : {
		name : "Radiate Power (prereq: 15th level Occultist)", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"While I'm bonded to a spirit, as a bonus action I can force all creatures within 5 ft. of me",
			"(or the spirit, if it's manifested) to make a Dexterity saving throw against my spell save",
			"DC, taking the spirit's manifested damage on a fail, or half that amount on a success.",
		]),
		limfeaname : "Radiate Power",
		action : ["bonus action", ""],
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 15);
		},
	},
	
	rite_prowess1 : {
		name : "Rite of Prowess: Dueling", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain the Dueling Fighting Style. +2 to damage rolls when wielding a melee weapon in",
			"one hand and no other weapons.",
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					for (var i = 1; i <= FieldNumbers.actions; i++) {
						if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) return;
					};
					if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/((^|[^+-]\b)2|\btwo).?hand(ed)?s?\b/i).test(fields.Description)) output.extraDmg += 2;
				},
				"When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."
			]
		},
		//Deselects other Rite of Prowess objects when selected.
		eval : function() {
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: great weapon fighting", true, 'remove']);
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: two-weapon fighting", true, 'remove']);
		},
	},
	rite_prowess2 : {
		name : "Rite of Prowess: Great Weapon Fighting", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain the Great Weapon Fighting Style. Reroll 1 or 2 on damage if wielding",
			"two-handed/versatile melee weapon in both hands.",
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.isMeleeWeapon && (/(\bversatile|((^|[^+-]\b)2|\btwo).?hand(ed)?s?)\b/i).test(fields.Description)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : '');
					}
				},
				"While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."
			]
		},
		eval : function() {
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: dueling", true, 'remove']);
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: two-weapon fighting", true, 'remove']);
		},
	},
	rite_prowess3 : {
		name : "Rite of Prowess: Two-Weapon Fighting", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I gain the Two-Weapon Fighting Style. I can add my ability modifier to the damage of my",
			"off-hand attacks",
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isOffHand) output.modToDmg = true;
				},
				"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
			]
		},
		eval : function() {
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: dueling", true, 'remove']);
			ClassFeatureOptions(["occultist", "occult rites", "rite of prowess: great weapon fighting", true, 'remove']);
		},
		
	},

	shamans_touch : {
		name : "Shaman's Touch (prereq: 7th level Occultist)", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"When I cast a cantrip with a range of touch, I can make one weapon attack as a bonus action.",
		]),
		limfeaname : "Shaman's Touch Attack",
		action : ["bonus action", " (after touch cantrip)"],
		prereqeval : function(v) { 
			return (classes.known.occultist.level >= 7);
		},
	},
	strength_spirit : {
		name : "Strength of Spirit (prereq: 7th level Occultist, more Str. than Wis.)", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I increase my Wisdom ability score by 2, up to a maximum of 20. This cannot make my",
			"Wisdom score higher than my Strength score.",
		]),
		scorestxt : "+2 Wisdom, but no higher than Strength.",
		prereqeval : function(v) { 
			return ((classes.known.occultist.level >= 7) && (What('Str') > What('Wis')));
		},
	},
	warding_power : {
		name : "Warding Power", 				
		source : [["KT:Oc", 18]],
		description : desc([
			"I learn the Shield spell.",
		]),
		spellcastingBonus : {
			name : "Warding Power",
			spells : ["shield"],
			selection : ["shield"],
		},
	},
};


RunFunctionAtEnd(function() {
	var theObj = ClassSubList["occultist-tradition of the hedge mage"].features["subclassfeature6"]; //The feature itself, var for shorthand
					
	for (x in OccultRitesAll) {
		if ((GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf(OccultRitesAll[x].name.toLowerCase()) === -1) && (OccultRitesAll[x].name.indexOf("prereq") == -1)) {
			theObj.choices.push(OccultRitesAll[x].name);			
			theObj[OccultRitesAll[x].name.toLowerCase()] = OccultRitesAll[x];
		}
	}
	for (x in WitchRitesNP) {
		if ((GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf(WitchRitesNP[x].name.toLowerCase()) === -1) && (WitchRitesNP[x].name.indexOf("prereq") == -1)) {
			theObj.choices.push(WitchRitesNP[x].name);
			theObj[WitchRitesNP[x].name.toLowerCase()] = WitchRitesNP[x];
		}
	}
	for (x in HedgeRitesNP) {
		if ((GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf(HedgeRitesNP[x].name.toLowerCase()) === -1) && (HedgeRitesNP[x].name.indexOf("prereq") == -1)) {
			theObj.choices.push(HedgeRitesNP[x].name);
			theObj[HedgeRitesNP[x].name.toLowerCase()] = HedgeRitesNP[x];
		}
	}
	for (x in OracleRitesNP) {
		if ((GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf(OracleRitesNP[x].name.toLowerCase()) === -1) && (OracleRitesNP[x].name.indexOf("prereq") == -1)) {
			theObj.choices.push(OracleRitesNP[x].name);
			theObj[OracleRitesNP[x].name.toLowerCase()] = OracleRitesNP[x];
		}
	}
	for (x in ShamanRitesNP) {
		if ((GetFeatureChoice('class', 'occultist', 'occult rites', true).indexOf(ShamanRitesNP[x].name.toLowerCase()) === -1) && (ShamanRitesNP[x].name.indexOf("prereq") == -1)) {
			theObj.choices.push(ShamanRitesNP[x].name);
			theObj[ShamanRitesNP[x].name.toLowerCase()] = ShamanRitesNP[x];
		}
	} 
});
