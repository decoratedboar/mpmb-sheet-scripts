/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Class
	Effect:		This script adds the Warmage class, along with ONLY it's House of Knights subclass, both from the Valda's Spire of Secrets expansion. The other Warmage subclasses ARE NOT included in this script.
				Valda's Spire of Secrets is a creation by Middle Finger of Vecna (Mage Hand Press).
				Support the creators through their webstore: https://magehandpress.com/store
				
	Code by:	u/decoratedblood (decoratedboar)
	Date:		27-07-2023 (sheet v13)
*/

var iFileName = "Warmage Class & House of Knights Subclass [Mage Hand Press, transcribed by decoratedboar]";
RequiredSheetVersion(13);

SourceList["VSoS"] = {
	name : "Valda's Spire of Secrets",
	abbreviation : "VSoS",
	group : "Middle Finger of Vecna",
	url : "https://www.kickstarter.com/projects/magehandpress/spire-of-secrets",
};

var ArcaneStyles = { //Adding the Arcane Fighting Styles as a seperate variable, makes giving them to classes other than Warmage easier, should it ever be a need.
	blaster : {
		name : "Blaster Arcane Fighting Style",
		description : desc([
		"I gain +1 to the saving throw DCs of my Warmage spells."
		]),
		spellCalc : [
			function (type, spellcasters, ability) {
				if (type == "dc" && spellcasters.indexOf("warmage") != -1) {
					return 1;
				}
			},
			"I add +1 to the saving throw DCs of my Warmage spells."
		],
	},
	deflector : {
		name : "Deflector Arcane Fighting Style",
		description : desc([
		"When I have at least one hand free and a creature hits me with a spell or ranged weapon",
		"attack, I can add my Proficiency Bonus to my AC as a reaction for that attack, potentially",
		"causing it to miss."
		]),
		limfeaname : "Deflector",
		action : ["reaction", " (Prof. Bonus to AC when hit)"],
	},
	resistive : {
		name : "Resistive Arcane Fighting Style",
		description : desc([
		"While wearing light armor, or while under the effects of the Mage Armor spell I gain +1 AC."
		]),
		extraAC : [{
			name : "Resistive Arcane Fighting Style",
			mod : 1, 
			text : "While wearing light armor, or while under the effects of the Mage Armor spell I add +1 to my AC.",
			stopeval : function (v) {
				return (!v.wearingArmor || v.mediumArmor || v.heavyArmor) && !(/^mage armou?r$/).test(CurrentArmour.known);
			}
		}],
	},
	sniper : {
		name : "Sniper Arcane Fighting Style",
		description : desc([
		"I gain +1 to my ranged spell attack rolls. My Warmage cantrips also ignore half cover."
		]),
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isSpell && !((/melee/i).test(v.theWea.range)))  {
						output.extraHit += 1;
					}
				},
				"My ranged spells gain +1 to their attack rolls"
			],
			atkAdd : [
				function (fields, v, output) {
					if ((/cantrip/i).test(v.theWea.type) && v.isSpell && !((/melee/i).test(v.theWea.range))) {
						fields.Description += (fields.Description ? '; ' : '') + 'Ignore 1/2 cover';
					}
				},
				"My Warmage cantrips ignore half cover."
			],
		},
	},
	striker : {
		name : "Striker Arcane Fighting Style",
		description : desc([
		"After hitting a creature with a melee spell attack cantrip, and exceeding its AC by 5",
		"or more (or critically hitting it), I add my proficiency bonus to the damage roll."
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v, output) {
					if ((/cantrip/i).test(v.theWea.type) && v.isSpell && ((/melee/i).test(v.theWea.range))) {
						fields.Description += (fields.Description ? '; ' : '') + '+Prof to dmg. on crit. or >5 than target AC';
					}
				},
				"After hitting a creature with a melee spell attack cantrip, and exceeding its AC by 5 or more (or critically hitting it), I add my proficiency bonus to the damage roll."
			],
		},
	},
};

var WarmageTricks = { //Doing the same thing for the Warmage tricks. Presently there is code in there that looks for the subclasses not included with this script. This might change in the future though, or someone else may add them in a seperate script, meaning that they should still apply.
	bishops_maneuver : { 
		name : "Bishop's Maneuver (prereq: 10th level Warmage, House of Bishops)",
		description : desc([
		"I can Disengage as a bonus action, increasing my walking speed by 10 feet until the end",
		"of my turn when I do so."
		]),
		limfeaname : "Disengage",
		action : ["bonus action", " (+10 ft. move spd.)"],
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && (/bishops/).test(classes.known.warmage.subclass));
		},
	},
	blasting_cantrip : {
		name : "Blasting Cantrip",
		description : desc([
		"Once per turn, when dealing force damage to a creature with a Warmage cantrip, I can",
		"push it up to 10 feet away from me in a straight line."
		]),
	},
	blinding_light : {
		name : "Blinding Light (prereq: Light cantrip)",
		description : desc([
		"When I target an object I'm holding with the Light cantrip, I can force a creature I can see",
		"within 10 feet to make a Constitution saving throw against my spell save DC. On a failure",
		"the creature is blinded until the start of my next turn, and has disadvantage on further",
		"saving throws against this Trick for the next 24 hours."
		]),
		prereqeval : function(v) { 
			return (isSpellUsed('light', true));
		},
	},
	castle : {
		name : "Castle (prereq: House of Rooks)",
		description : desc([
		"Once per short or long rest as an action, I can swap places with a willing Medium or Small",
		"creature I can see within 120 feet."
		]),
		limfeaname : "Castle",
		usages: 1,
		recovery : "short rest",
		action : ["action" ,""],
		prereqeval : function(v) { 
			return (/rooks/).test(classes.known.warmage.subclass);
		},
	},
	chivalrous_presence : {
		name : "Chivalrous Presence (prereq: House of Knights)",
		description : desc([
		"I gain proficiency in the Wisdom (Insight) and Wisdom (Persuasion) skills, and I have",
		"advantage on ability checks made when interacting with nobility. Creatures can always",
		"discern when I'm telling the truth."
		]),
		skills : ["Insight", "Persuasion"],
		prereqeval : function(v) { 
			return (/knights/).test(classes.known.warmage.subclass);
		},
	},
	cloak_feather : {
		name : "Cloak of Feathers (prereq: House of Rooks)",
		description : desc([
		"While I'm not wearing armor or using a shield, my AC is equal to 10 + my Dexterity",
		"modifier + my Intelligence modifier."
		]),
		armorOptions : {
			regExpSearch : /^(?=.*cloak)(?=.*of)(?=.*feathers).*$/i,
			name : "Cloak of Feathers",
			source : ["VSoS", 161],
			ac : "10+Int",
		},
		armorAdd : "Cloak of Feathers",
		prereqeval : function(v) { 
			return (/rooks/).test(classes.known.warmage.subclass);
		},
	},
	commander_steed : {
		name : "Commander's Steed (prereq: House of Kings)",
		description : desc([
		"I learn the Find Steed spell, and can cast it at will, without expending a spell slot. My",
		"steed's hit point maximum is also increased by an amount equal to my Warmage level."
		]),
		spellcastingBonus : {
			name : "Commander's Steed",
			spells : ["find steed"],
			selection : ["find steed"]
		},
		calcChanges : {
			companionCallback : [function(prefix, oCrea, bAdd, sCompType) {
				var compHP = prefix + 'Comp.Use.HP.Max';
				
				if (sCompType !== "mount") return;
					Value(compHP, CurrentCompRace[prefix].hp + classes.known.warmage.level);
				//in essence, check if the companion sheet has a Find Steed companion added, then set its max HP to be it's default max HP + the player's warmage level. Re-add the companion to get HP changes after the player's level changes.
			}, "My Steed's hit point maximum is increased by my Warmage level."], //not sure if there's a better way of doing this, but it works so eh
		},	
		prereqeval : function(v) { 
			return (/kings/).test(classes.known.warmage.subclass);
		},
	},
	corrosive_cantrip : {
		name : "Corrosive Cantrip",
		description : desc([
		"Once per turn, when dealing acid damage to a creature with a Warmage cantrip, I can",
		"reduce its defenses. The next time an attack roll is made agains the creature, it takes a",
		"penalty to its AC equal to half my Warmage level (maximum of 5) for that attack."
		]),
		additional : levels.map(function (n) {
			return "-" + Math.floor(n/2) + " AC from  target";
		}),
	},
	directed_momentum : {
		name : "Directed Momentum (prereq: 10th level Warmage, House of Lancers)",
		description : desc([
		"Once per turn when one of my melee attacks critically hits or reduces a creature to 0",
		"Hit Points, I can make an unarmed strike against a second target. This second target",
		"takes an extra 1d8 force damage on hit, and I can lunge to it with my Shock Trooper feature."
		]),
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && (/lancers/).test(classes.known.warmage.subclass));
		},
	},
	draining_cantrip : {
		name : "Draining Cantrip",
		description : desc([
		"Whenever I deal necrotic or poison damage to a hostile creature with a Warmage cantrip,",
		"I gain temporary Hit Points equal to half my Warmage level for a minute."
		]),
		additional : levels.map(function (n) {
			return "+" + Math.floor(n/2) + " temp. HP";
		}),
	},
	encryptogram : {
		name : "Encryptogram (prereq: Cryptogram cantrip)",
		description : desc([
		"When I cast the Cryptogram cantrip, it's limit is 20 characters rather than 8, and only the",
		"specified recipient can read the message."
		]),
		/*prereqeval : function(v) { 
			return (isSpellUsed('cryptogram', true));
		},*/
	},
	explosive_cantrip : {
		name : "Explosive Cantrip",
		description : desc([
		"Once per turn when I deal fire damage to a hostile creature with a Warmage cantrip,",
		"I can force each creature within 5 feet of the target (excluding it and myself) to make a",
		"Dexterity saving throw against my Spell Save DC. On a failure, creatures take half the fire",
		"damage dealt to my original target."
		]),
	},
	extended_range : {
		name : "Extended Range",
		description : desc([
		"My Warmage Cantrips with a range of 5 feet or greater have their range doubled."
		]),
		//The below code just takes the numbers in the specified weapon's range entries and doubles them.
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/cantrip/i).test(v.theWea.type) && v.isSpell && !((/melee/i).test(v.theWea.range))) {
						var rangeNmbr = fields.Range.match(/\d+([.,]\d+)?/g);
						var notNmbrs = fields.Range.split(RegExp(rangeNmbr.join('|')));
						fields.Range = '';
						rangeNmbr.forEach(function (dR, idx) {
							fields.Range += (notNmbrs[idx] ? notNmbrs[idx] : '') + (parseFloat(dR.toString().replace(',', '.') * 2));
						});
						if (notNmbrs.length > rangeNmbr.length) {
							fields.Range += notNmbrs[notNmbrs.length - 1];
						}
						if (!v.rangeM) {
							v.rangeM = 2;
						} else {
							v.rangeM *= 2;
						}
					}
					
				},
			],
		},
	},
	field_medic : {
		name : "Field Medic (prereq: House of Bishops)",
		description : desc([
		"I gain Spare The Dying as a bonus cantrip. When casting Spare The Dying on a creature",
		"with 0 Hit Points, it gains 1 hit point, and my Warmage level in temporary Hit Points that",
		"last for 1 minute. Creatures cannot gain these temporary Hit Points again before a long rest."
		]),
		additional : levels.map(function (n) {
			return n + " target temp. HP (1 min)";
		}),
		spellcastingBonus : {
			spells : ["spare the dying"],
			selection : ["spare the dying"],
		},
		prereqeval : function(v) { 
			return ((/bishops/).test(classes.known.warmage.subclass));
		},
	},
	flexible_range : {
		name : "Flexible Range",
		description : desc([
		"I don't have disadvantage on ranged spell attack rolls within 5 feet of my target. Additionally,",
		"my Warmage cantrips which require melee spell attacks have their range increased to 10 feet."
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v, output) {
					if (v.isSpell && !((/melee/i).test(v.theWea.range))) {
						fields.Description += (fields.Description ? '; ' : '') + 'No disadv. within 5 ft.';
					}
					if ((/cantrip/i).test(v.theWea.type) && v.isSpell && ((/melee/i).test(v.theWea.range))) {
						fields.Range += ", 10 ft.";
					}
				},
				"I don't have disadvantage on ranged spell attack rolls within 5 ft. of a target, and my melee Warmage cantrips have their range increased to 10 ft."
			],
		},
	},
	fold : {
		name : "Fold (prereq: 10th level Warmage, House of Cards)",
		description : desc([
		"Once per short or long rest, as a reaction to being hit by an attack, I can play my entire",
		"hand to cast the Shield spell without expending a spell slot."
		]),
		limfeaname : "Fold (cast Shield)",
		usages : 1,
		recovery : "short rest",
		action : ["reaction", ""],
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && (/cards/).test(classes.known.warmage.subclass));
		},
	},
	gamble : {
		name : "Gamble (prereq: House of Cards or House of Dice, Cheat cantrip)",
		description : desc([
		"I am always under the effect of the Cheat cantrip, and once per short or long rest,",
		"whenever I miss an attack or fail a saving throw or ability check, I can reroll the d20",
		"and must use the new roll."
		]),
		limfeaname : "Gamble (reroll d20)",
		usages : 1,
		recovery : "short rest",
		prereqeval : function(v) { 
			return (isSpellUsed('cryptogram', true) && ((/cards/).test(classes.known.warmage.subclass) || (/dice/).test(classes.known.warmage.subclass)));
		},
	},
	infinite_variation : {
		name : "Infinite Variation (prereq: Prestidigitation cantrip)",
		description : desc([
		"I can use Prestidigitation to imitate the effect of any other non-damaging cantrip. To",
		"do so, I must succeed on a DC 15 Intelligence (Arcana) check, otherwise the spell fails."
		]),
		prereqeval : function(v) { 
			return (isSpellUsed('prestidigitation', true));
		},
	},
	icy_cantrip : {
		name : "Icy Cantrip",
		description : desc([
		"Once per turn, when dealing cold damage to a creature with a Warmage cantrip, I can",
		"force the target to subtract half of my Warmage level from their next attack roll before",
		"the end of their next turn."
		]),
		additional : levels.map(function (n) {
			return "-" + Math.floor(n/2) + " from next atk. roll";
		}),
	},
	knights_aegis : {
		name : "Knight's Aegis (prereq: 10th level Warmage, House of Knights, Force Buckler cantrip)",
		description : desc([
		"I can concentrate on the Force Buckler cantrip for up to 1 minute after casting it, and",
		"the spell doesn't end early if I'm hit by an attack."
		]),
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && isSpellUsed('force buckler', true) && (/knights/).test(classes.known.warmage.subclass));
		},
	},
	leading_edge : {
		name : "Leading Edge Tactics (prereq: House of Lancers)",
		description : desc([
		"Attack rolls against me have disadvantage in the first round of combat, unless I am",
		"surprised, in which case they are made as normal."
		]),
		prereqeval : function(v) { 
			return (/lancers/).test(classes.known.warmage.subclass);
		},
	},
	lieutenants_demand : {
		name : "Lieutenant's Demand (prereq: 10th level Warmage, House of Kings)",
		description : desc([
		"I can cast the Command spell at will, without expending a spell slot."
		]),
		spellcastingBonus : {
			name : "Lieutenant's Demand",
			spells : ["command"],
			selection : ["command"],
			firstCol : 'atwill'
		},
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && (/kings/).test(classes.known.warmage.subclass));
		},
	},
	mage_hand_knack : {
		name : "Mage Hand Knack (prereq: Mage Hand cantrip)",
		description : desc([
		"After casting Mage Hand, and as a bonus action on turns afterwards, I can use it with",
		"one of the following effects:",
		"\u2022 Press: Choose a Large or smaller creature within 5 feet. Until the spell ends, or until I",
		"invoke a different effect as a bonus action, each foot of movement costs the target 1",
		"foot extra movement speed.",
		"\u2022 Punch: Make a melee spell attack against a creature within 5 feet for 1d6 force",
		"damage on hit.",
		"\u2022 Seize: A Small or smaller target creature must succeed on a Strength (Athletics) or",
		"Dexterity (Acrobatics) check against my spell save DC, or be grappled by my Mage Hand.",
		"They remain grappled until using an action to break free, until the spell ends, or until I",
		"invoke a different effect as a bonus action.",
		]),
		prereqeval : function(v) { 
			return (isSpellUsed('mage hand', true));
		},
	},
	minor_shadow_illusion : {
		name : "Minor Shadow Illusion (prereq: Minor Illusion cantrip)",
		description : desc([
		"When I create the image of an object using the Minor Illusion cantrip, I can cause it to",
		"become semi-real; it has AC 10 and 5 Hit Points, and weighs 5 pounds. Only one object",
		"can exist in this way at once, and maintaining it requires concentration.",
		"If the object is able to deal damage, creatures entering or starting their turn inside its",
		"5 foot space must make an Intelligence saving throw against my spell save DC, taking 1d6",
		"+1d6/CL of an appropriate damage type.",
		]),
		additional : levels.map(function (n) {
			return (n < 5 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4) + "d6 total dmg.";
		}),
		prereqeval : function(v) { 
			return (isSpellUsed('minor illusion', true));
		},
	},
	mystical_armor : {
		name : "Mystical Armor",
		description : desc([
		"I can cast the Mage Armor spell on myself at will, without expending a spell slot or",
		"material components.",
		]),
		spellcastingBonus : {
			name : "Mystical Armor",
			spells : ["mage armor"],
			selection : ["mage armor"],
			firstCol : "atwill",
		},
	},
	mystical_athlete : {
		name : "Mystical Athlete (prereq: Quickstep cantrip or Springheel cantrip)",
		description : desc([
		"When I cast the Quickstep cantrip, my speed increases by 20 feet, and when I cast the",
		"Springheel cantrip, my jump height increases by 20 feet. If I know both of these cantrips,",
		"I can cast them both as part of the same bonus action.",
		]),
		spellChanges : {
			"quickstep" : {
				description : "+20 ft. of movement speed until the start of my next turn",
				changes : "Mystical Athelete increases Quickstep's bonus movement to 20 feet."
			},
			"springheel" : {
				description : "Until start of next turn, jump dist. +20 ft. and running high/long jump without running start.",
				changes : "Mystical Athelete increases Springheel's bonus jump height to 20 feet."
			},
		},
		prereqeval : function(v) { 
			return (isSpellUsed('quickstep', true) || isSpellUsed('springheel', true));
		},
	},
	mystical_weaponmaster : {
		name : "Mystical Weaponmaster (prereq: Force Weapon cantrip or Magic Daggers cantrip)",
		description : desc([
		"When I roll a 1 on the d20 for an attack roll with Force Weapon or Magic Daggers, I can",
		"reroll the die, and must use the new roll.",
		]),
		calcChanges : {
			atkAdd : [
				function (fields, v, output) {
					if (((/force weapon/i).test(v.WeaponName + v.baseWeaponName)) || ((/magic daggers/i).test(v.WeaponName + v.baseWeaponName))) {
						fields.Description += (fields.Description ? '; ' : '') + 'Reroll nat. 1';
					}
				},
				"I can reroll rolls of 1 on the d20, and must use the new roll."
			],
		},
		prereqeval : function(v) { 
			return (isSpellUsed('force weapon', true) || isSpellUsed('magic daggers', true));
		},
	},
	mystical_vision : {
		name : "Mystical Vision",
		description : desc([
		"I can cast the Detect Magic spell at will, without expending a spell slot.",
		]),
		spellcastingBonus : {
			name : "Mystical Vision",
			spells : ["detect magic"],
			selection : ["detect magic"],
			firstCol : "atwill",
		},
	},
	phantom_hookshot : {
		name : "Phantom Hookshot (prereq: Phantom Grapnel cantrip)",
		description : desc([
		"I can cast the Phantom Grapnel cantrip as a bonus action. When I do, its range is reduced",
		"to 15 feet. When casting it as an action, creatures are pulled an extra 10 feet towards me.",
		]),
		prereqeval : function(v) { 
			return (isSpellUsed('phantom grapnel', true));
		},
	},
	rapid_fortification : {
		name : "Rapid Fortification (prereq: Mending cantrip)",
		description : desc([
		"I can cast the Mending cantrip as an action or as a bonus action. When casting it as an action, I can use one of the following bonus effects:",
		"\u2022 I restore a single nonmagical object to pristine condition if at least half of its parts are",
		"present. Simple objects can't be larger than 10 cubic feet, and complex object 1 cubic foot.",
		"\u2022 I create simple fortifications that are no larger than 10 cubic feet. I must have the",
		"necessary materials to do this.",
		]),
		prereqeval : function(v) { 
			return (isSpellUsed('mending', true));
		},
	},
	snake_eyes : { 
		name : "Snake Eyes (prereq: 10th level Warmage, House of Dice)",
		description : desc([
		"When I roll a 1 or 2 on a Die of Fate, I keep the die instead of giving it to the DM."
		]),
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && (/dice/).test(classes.known.warmage.subclass));
		},
	},
	severe_cantrip : {
		name : "Severe Cantrip",
		description : desc([
		"When a creature rolls a 1 on a saving throw against one of my Warmage cantrips, it",
		"automatically fails the save, and takes twice the spell's damage dice. Additional damage",
		"is only applied to creatures that rolled a 1."
		]),
	},
	signature_focus : { 
		name : "Signature Focus (prereq: 5th level Warmage)",
		description : desc([
		"After finishing a long rest, I can designate a simple or martial weapon as my Signature Focus.",
		"My Signature Focus lasts until I designate another weapon, and gains the following benefits:",
		"\u2022 It counts as magical, and can be used as a spellcasting focus for Warmage spells.",
		"\u2022 I can call it to myself as a bonus action.",
		"\u2022 I can add my Intelligence modifier to attack and damage rolls with my Signature",
		"Focus, instead of Strength or Dexterity.",
		"\u2022 It has a number of charges equal to my Intelligence modifier, which I can expend to",
		"deal an extra 1d8 force damage to creatures I hit with it or cantrips cast through it.",
		"These charges are regained after a long rest.",
		"Including \"Signature\" in a weapon's name will designate it as my Signature Focus."
		]),
		action : ["bonus action", " (call)"],
		usages : "Int. mod. per ",
		usagescalc : "event.value = Math.max(1, What('Int Mod'));",
		recovery : "long rest",
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if ((/simple|martial/i).test(v.theWea.type) && (/\bsignature\b/i).test(v.WeaponTextName)) {
						fields.Mod = 4;
						fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
					}
				},
				"If I include the word 'Signature' in a Simple or Martial weapon's name, it gets treated as my Signature Focus.",
			]
		},
		prereqeval : function(v) { 
			return (classes.known.warmage.level >= 5);
		},
	},
	silent_cantrip : {
		name : "Silent Cantrip",
		description : desc([
		"Once per turn when I deal thunder damage to a hostile creature with a Warmage",
		"cantrip, I can create a 15 foot diameter sphere of magical silence centered on myself or",
		"the creature. It lasts until the start of my next turn."
		]),
	},
	split_fire : {
		name : "Split Fire (prereq: th level Warmage)",
		description : desc([
		"When I cast a Warmage cantrip requiring a single spell attack roll, I can target a",
		"number of creatures up to the number of damage dice dealt by the cantrip, making",
		"spell attack rolls against each of them. I can then split my damage die between the",
		"attacks, providing each target is dealt at least one damage die."
		]),
		prereqeval : function(v) { 
			return (classes.known.warmage.level >= 5);
		},
	},
	static_cantrip : {
		name : "Static Cantrip",
		description : desc([
		"Whenever I deal lightning damage to a hostile creature with a Warmage cantrip, I",
		"become charged until the start of my next turn. While charged, I can use my reaction",
		"to deal lightning damage equal to half my Warmage level after taking damage from",
		"a hostile creature I can see within 5 feet."
		]),
		additional : levels.map(function (n) {
			return (Math.floor(n/2) + " lighting dmg.");
		}),
	},
	unerring_strike : {
		name : "Unerring Strike (prereq: 10th level Warmage, True Strike cantrip)",
		description : desc([
		"When I cast the True Strike cantrip, I can concentrate on it for a number of rounds equal",
		"to my Intelligence modifier. While concentrating, I have advantage on the first attack roll",
		"I make against a target on each of my turns."
		]),
		prereqeval : function(v) { 
			return ((classes.known.warmage.level >= 10) && (isSpellUsed('true strike', true)));
		},
	}
};

[//This code adds the array of spells above to the Warmage list. Not defining a specific list means that more spells can be added later, without having to edit this script.
	//Cantrips (0 level)
	"arc blade", "acid splash", "burning blade", "card trick", "caustic blade", "cheat", "chill touch", "cryptogram", "finger guns", "fire bolt", "force buckler", "force dart", "force weapon", "frigid blade", "light", "lightning surge", "mage hand", "magic daggers", "mending", "minor illusion", "moment to think", "phantom grapnel", "poison spray", "prestidigitation", "produce flame", "quickstep", "ray of frost", "shocking grasp", "sonic pulse", "springheel", "thunderous distortion", "true strike"
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("warmage") === -1) SpellsList[s].classes.push("warmage");
}); 

ClassList["warmage"] = {
	name : "Warmage",
	regExpSearch : /^(?=.*warmage).*$/i,
	source : ["VSoS", 158],
	primaryAbility : "",
	prereqs : "Intelligence 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Con", "Int"],
	skills : ["\n\n" + toUni("MyClass") + ": Choose two from Acrobatics, Animal Handling, Arcana, Athletics, History, Investigation, Medicine, Perception, Survival.", "\n\n" + toUni("MyClass") + ""],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	
	toolProfs : {
		primary : [["Artisan's Tools", 1], ["Gaming Set", 1]],
		secondary : [],
	},
	
	armor : [
		[true, false, false, false],
		[true, false, false, false]
	],
	
	weapons : [
		[true, false]
		[false, false]
	],
	
	abilitySave : 4,
	spellcastingFactor : 1,
	spellcastingKnown : {
		cantrips : [4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10],
	},
		
	equipment : "MyClass starting equipment:" +
	"\n \u2022 Leather armor, a dagger, and any simple weapon;" +
	"\n \u2022 A component pouch -or- an arcane focus;" +
	"\n \u2022 An explorer's pack -or- a scholar's pack;" +
	"\n \u2022 A gaming set.",

	subclasses : ["Warmage Houses", []], //The addSubclass() function creates entries here on its own.
	features : {
		"spellcasting" : {
			name : "Spellcasting",
			source : ["VSoS", 158],
			minlevel : 1,
			description : desc([
				"I can cast Warmage spells that I know, using Intelligence as my spellcasting ability.",
				"I can use an arcane focus as a spellcasting focus for my Warmage spells.",
				"When I gain a level in this class, I can replace one Warmage cantrip I know with another",
				"Warmage cantrip."
			]),
			additional : levels.map(function (n, idx) {
				var cantr = [4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10][idx];
				return cantr + " cantrips known";
			})
		},		
		"arcane initiation" : {
			name : "Arcane Initiation",
			source : ["VSoS", 160],
			minlevel : 1,
			description : desc ([
			"Use the \"Choose Feature\" button above to select an Arcane Initiation, granting me",
			"certain bonus cantrips.",
			]),			
			choices : ["Adventurer", "Circus Performer", "Eldritch Event", "Mercenary", "Temple", "Tower Apprentice", "Self-Taught", "Survival"],
			
			"adventurer" : {
				name : "Adventurer Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"I picked up my magic informally by traveling with a dozen different mages over the years.",
				"I learn the Mage Hand and Ray of Frost cantrips.",
				]),
				spellcastingBonus : [{
					name : "Adventurer Cantrips",
					spells : ["mage hand", "ray of frost"],
					selection : ["mage hand", "ray of frost"],
					times : 2
				}],
			},
			"circus performer" : {
				name : "Circus Performer Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"I learned a few simple tricks to participate in a sideshow or circus act. I learn the",
				"Dancing Lights and Minor Illusion cantrips.",
				]),
				spellcastingBonus : [{
					name : "Circus Performer Cantrips",
					spells : ["dancing lights", "minor illusion"],
					selection : ["dancing lights", "minor illusion"],
					times : 2
				}],
			},
			"eldritch event" : {
				name : "Eldritch Event Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"An influx of insidious magic left an imprint on me. I learn the Chill Touch and Message",
				"cantrips.",
				]),
				spellcastingBonus : [{
					name : "Eldritch Event Cantrips",
					spells : ["chill touch", "message"],
					selection : ["chill touch", "message"],
					times : 2
				}],
			},
			"mercenary" : {
				name : "Mercenary Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"I mastered the fundamentals of war magic to engage in battle with similarly armed",
				"arcanists. I learn the Arc Blade and True Strike cantrips.",
				]),
				spellcastingBonus : [{
					name : "Mercenary Cantrips",
					spells : ["arc blade", "true strike"],
					selection : ["arc blade", "true strike"],
					times : 2
				}],
			},
			"temple" : {
				name : "Temple Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"A monastery or temple educated me in the ways of gentle healing magic. I learn the",
				"Sacred Flame and Spare the Dying cantrips.",
				]),
				spellcastingBonus : [{
					name : "Temple Cantrips",
					spells : ["sacred flame", "spare the dying"],
					selection : ["sacred flame", "spare the dying"],
					times : 2
				}],
			},
			"tower apprentice" : {
				name : "Tower Apprentice Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"I apprenticed under a spellcaster for some time, who taught me the fundamentals of",
				"arcana. I learn the Prestidigitation and Shocking Grasp cantrips.",
				]),
				spellcastingBonus : [{
					name : "Tower Apprentice Cantrips",
					spells : ["prestidigitation", "shocking grasp"],
					selection : ["prestidigitation", "shocking grasp"],
					times : 2
				}],
			},
			"self-taught" : {
				name : "Self-Taught Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"I taught myself all the fundamentals of magic from a dusty old tome or abandoned",
				"scroll. I learn the Fire Bolt and Light cantrips.",
				]),
				spellcastingBonus : [{
					name : "Self-Taught Cantrips",
					spells : ["fire bolt", "light"],
					selection : ["fire bolt", "light"],
					times : 2
				}],
			},
			"survival" : {
				name : "Survival Initiation", 
				source : ["VSoS", 160],
				description : desc ([
				"To survive in the wilderness, I taught myself the cast simple spells. I learn the Druidcraft and",
				"Shillelagh cantrips.",
				]),
				spellcastingBonus : [{
					name : "Survival Cantrips",
					spells : ["druidcraft", "shillelagh"],
					selection : ["druidcraft", "shillelagh"],
					times : 2
				}],
			},
		},
		"arcane fighting style" : {
			name : "Arcane Fighting Style",
			source : ["VSoS", 160],
			minlevel : 1,
			description : desc ([
			"Use the \"Choose Feature\" button above to select an Arcane Fighting Style.",
			]), 
			choices : ["Blaster", "Deflector", "Resistive", "Sniper", "Striker"],
			"blaster" : ArcaneStyles.blaster,
			"deflector" : ArcaneStyles.deflector,
			"resistive" : ArcaneStyles.resistive,
			"sniper" : ArcaneStyles.sniper,
			"striker" : ArcaneStyles.striker
		},
		"warmage edge" : {
			name : "Warmage Edge",
			source : ["VSoS", 160],
			minlevel : 2,
			description : desc([
			"Once per turn when I deal damage with a cantrip, I add my Intelligence modifier to one",
			"of its damage rolls, if I don't already add it.",
			"At 5th level I can begin to add extra dice to the damage rolls of my Warmage cantrips."
			]),
			additional : levels.map(function (n) {
				return (n < 5 ? 0 : n < 11 ? 1 : n < 17 ? 2 : 3) + " bns. cantrip dmg." + (n < 11 ? "die" : "dice");
			}),
		},
		"warmage tricks" : {
			name : "Warmage Tricks",
			source : ["VSoS", 160],
			minlevel : 2,
			description : desc ([
			"Use the \"Choose Feature\" button above to select a number of Warmage Tricks to add",
			"to the third page notes.",
			"When I gain a level in this class, I can replace a Trick I know for another Trick available to me."
			]),
			extraTimes : levels.map(function (n) {
				return (n < 2 ? 0 : n < 3 ? 2 : n < 5 ? 3 : n < 7 ? 4 : n < 9 ? 5 : n < 11 ? 6 : n < 13 ? 7 : n < 15 ? 8 : n < 17 ? 9 : 10);
			}),
			extraname : "Warmage Tricks",
			extrachoices : [], //So the RunFunctionAtEnd at the end of the script has something to push to
		},
		"subclassfeature3" : {
			name : "Warmage House",
			source : ["VSoS", 160],
			minlevel : 3,
			description : desc([
			"Choose your Warmage House to put in the 'Class' field."
			]),
		},
		"arcane surge" : {
			name : "Arcane Surge",
			source : ["VSoS", 160],
			minlevel : 5,
			description : desc([
			"Once per short or long rest (twice after 11th level), once on my turn after dealing",
			"damage with a Warmage cantrip on my turn, I can double the amount of damage dice",
			"the spell deals. I cannot use this feature on a critical hit."
			]),
			usagescalc : "(classes.known.warlock.level < 11 ? 1 : 2);",
			recovery : "short rest",
		},
		"tactical insight" : {
			name : "Tactical Insight",
			source : ["VSoS", 160],
			minlevel : 6,
			description : desc([
			"I can add my Intelligence modifier to saving throws I make against spells and other",
			"damaging magical effects."
			]),
			savetxt : { text : ["Int. mod. to saves against spells & damaging magic"] },
		},
		"strategic deflection" : {
			name : "Strategic Deflection",
			source : ["VSoS", 160],
			minlevel : 14,
			description : desc([
			"Once per short or long rest, when I succeed on a saving throw to avoid damage from a",
			"spell, I can use my reaction to choose a creature within 30 feet, or the spell's range,",
			"whichever is closest. The chosen creature makes a saving throw against the spell using my",
			"spell save DC, suffering its effects as if I had cast the spell on a failure."
			]),
			usages : 1,
			recovery : "short rest",
			action : ["reaction", ""],
		},
		"master warmage" : {
			name : "Master Warmage",
			source : ["VSoS", 160],
			minlevel : 20,
			description : desc([
			"Whenever I cast a cantrip that deals four dice of damage to a target, it instead deals five.",
			"Additionally, when I cast a cantrip that makes four attacks, it instead makes five."
			]), //I don't think I need to code anything else for this.
		},
	},
};

AddSubClass("warmage", "house of knights", {
	regExpSearch : /^(?=.*house)(?=.*of)(?=.*(knights|horses)).*$/i,
	subname : "House of Knights",
	source : ["VSoS", 169],
	features : {
		"subclassfeature3" : {
			name : "Force Breastplate",
			source : ["VSoS", 169],
			minlevel : 3,
			description : desc([
			"While I'm wearing light or medium armour, or under the effects of the Mage Armor spell, I",
			"can add my Intelligence modifier to my AC instead of Dexterity.",
			]),
			armorProfs : [true, false, false, false],
			weaponProfs : [false, true],
			extraAC : [{
				name : "Force Breastplate (replace Dex)", 
				mod : "Int", 
				magic : false, 
				text : "While wearing light or medium armor, or under the effects of the Mage Armor spell, I can add my Intelligence modifier to my AC instead of Dexterity",
				stopeval : function (v) { 
					return (v.heavyArmor || !v.wearingArmor && !((/^mage armou?r$/).test(CurrentArmour.known)));
				}
				}], //There's no way (as far as I know) to stop the sheet using Dex to calculate AC/change the modifier for AC calculation, so having a seperate field with the new armor bonus in it is about the best I can do here
		},
		"subclassfeature3.1" : {
			name : "Mystical Weapon",
			source : ["VSoS", 169],
			minlevel : 3,
			description : desc([
				"I learn the Force Weapon cantrip, which doesn't count against my number of cantrips known.",
				"Additionally, whenever I would draw a weapon, I can instead summon it into my empty hand",
				"and transform it into any Simple or Martial weapon of my choice. Weapons summoned this",
				"way deal force damage, instead of their normal damage.",
				"If I include the word 'Mystical' in a Simple or Martial weapon's name, it gets treated as my",
				"Sound Weapon."
			]),
			spellcastingBonus : {
				name : "Mystical Weapon",
				spells : ["force weapon"],
				selection : ["force weapon"]
			},
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/simple|martial/i).test(v.theWea.type) && (/\bmystical\b/i).test(v.WeaponTextName)) {
							fields.Damage_Type = "force";
						};
					},
					"If I include the word 'Mystical' in a Simple or Martial weapon's name, it gets treated as my Sound Weapon.",
				]
			}
		},
		"subclassfeature7" : {
			name : "Flurry of Blades",
			source : ["VSoS", 169],
			minlevel : 7,
			description : desc([
				"Whenever I cast a cantrip that allows me to make multiple spell attacks, I can use a bonus action to make one additional attack with that cantrip.",
			]),
			action : [["bonus action", " (with multi-attack cantrip"]],
		},
		"subclassfeature10" : {
			name : "Knight's Ward",
			source : ["VSoS", 170],
			minlevel : 10,
			description : desc([
			"Once per short or long rest, as a bonus action, I gain a number of temporary Hit Points equal",
			"to twice my Warmage level. These temporary Hit Points last for 1 minute",
			]),
			additional : levels.map( function(n) {
				return n < 10 ? "" : Math.floor(n * 2) + " temp. HP for 1 min.";
			}),
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""],
		},
		"subclassfeature15" : {
			name : "Tactical Maneuver",
			source : ["VSoS", 170],
			minlevel : 15,
			description : desc([
				"I can spend my entire movement speed to teleport to an unoccupied space I can see that is",
				"up to half my movement speed away."
			]),		
		},
		"subclassfeature18" : {
			name : "Field of Blades",
			source : ["VSoS", 170],
			minlevel : 18,
			description : desc([
				"As an action, I can make an attack roll against up to five creatures I can see within 30 feet,",
				"making one attack roll for each. On a hit, a target takes 2d10 + my Intelligence modifier",
				"force damage."
			]),			
		},
	}
});

SpellsList["arc blade"] = {
	name : "Arc Blade",
	classes : ["warmage"],
	source : ["VSoS", 330],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "Self (5 ft. radius)",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "Instantaneous",
	description : "Melee attack for lightning weapon dmg, 1d6+1d6/CL lightning dmg against target within 5ft; +1d8/CL>5 lightn. dmg. on hit",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the weapon attack’s normal effects, except that any damage dealt by the attack is lightning damage instead of its normal type. Additionally, an arc of lightning jumps to a creature you choose within 5 feet of the target, dealing 1d6 lightning damage." + AtHigherLevels + "This spell’s damage increases when you reach certain levels. At 5th level, the melee attack deals an additional 1d8 lightning damage, and the secondary damage deals an additional 1d6 lightning damage to their targets. Both damage rolls increase by one die at 11th level (2d8 and 3d6) and 17th level (3d8 and 4d6)."
};
SpellsList["burning blade"] = {
	name : "Burning Blade",
	classes : ["warmage"],
	source : ["VSoS", 331],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "Self (5 ft. radius)",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "Instantaneous",
	description : "Melee attack for fire weapon dmg, 1d6+1d6/CL fire dmg. in target's space for 1 rnd.; +1d6/CL>5 fire dmg. on hit",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the weapon attack’s normal effects, except that any damage dealt by the attack is fire damage instead of its normal type. Additionally, embers whirl in the target’s space. Until the start of your next turn, when a creature enters the space for the first time or ends its turn there, you can use your reaction to deal 1d6 fire damage to the creature, ending the spell." + AtHigherLevels + "This spell’s damage increases when you reach certain levels. At 5th level, the melee attack deals an additional 1d6 fire damage to the target on a hit, and the secondary damage deals an additional 1d6 fire damage to its target. Both damage rolls increase by one die at 11th level (2d6 and 3d6) and 17th level (3d6 and 4d6)."
};
SpellsList["card trick"] = { //Has attack entry
	name : "Card Trick",
	classes : ["warmage", "witch", "bard", "sorcerer", "wizard"],
	source : ["VSoS", 332],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "60 ft",
	components : "V,S,M",
	compMaterial : "A deck of playing cards",
	duration : "Instantaneous",
	description : "Ranged spell attack or target Dex. save, 1d6+1d6/CL force dmg on hit/fail",
	descriptionFull : "With a flash of your hands, you fling a playing or tarot card charged with energy at your opponents. Choose whether you make a ranged spell attack roll or for the target to make a Dexterity saving throw. On a hit or a failed saving throw, the target takes 1d6 force damage." + AtHigherLevels + "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};
SpellsList["caustic blade"] = {
	name : "Caustic Blade",
	classes : ["warmage", "necromancer"],
	source : ["VSoS", 332],
	level : 0,
	school : "Trans",
	time : "1 a",
	range : "Self (5 ft. radius)",
	components : "V,M",
	compMaterial : "A melee weapon",
	duration : "Instantaneous",
	description : "Melee attack for acid weapon dmg., miss by 3 or less for 1d8+1d8/CL acid dmg; +1d8/CL>5 acid dmg. on hit",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the target suffers the weapon attack’s normal effects, except that any damage dealt by the attack is acid damage instead of its normal type. If you miss by 3 or less, acid splashes on the target, and you instead deal 1d8 acid damage." + AtHigherLevels + "This spell’s damage increases when you reach certain levels. At 5th level, the melee attack deals an additional 1d8 acid damage to the target on a hit, and the acid damage dealt on a miss increases to 2d8. Both damage rolls increase by one die at 11th level (2d8 and 3d8) and 17th level (3d8 and 4d8)."
};
SpellsList["cheat"] = {
	name : "Cheat",
	classes : ["warmage", "necromancer", "witch", "bard", "sorcerer", "warlock", "wizard"],
	source : ["VSoS", 332],
	level : 0,
	school : "Div",
	time : "1 bns",
	range : "Self",
	components : "S,M",
	compMaterial : "A weighted die",
	duration : "1 round",
	description : "Reroll any ability checks you make for nonmagic games of chance for the duration",
	descriptionFull : "You subtly twist your fingers, and fate seems to follow suit. For the duration, you can reroll any ability check you make to play nonmagical games of chance. Therefore, this spell could influence a game of poker, but not the result of a deck of many things."
};
SpellsList["cryptogram"] = {
	name : "Cryptogram",
	classes : ["warmage", "necromancer", "witch", "bard", "sorcerer", "warlock", "wizard"],
	source : ["VSoS", 334],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "Unlimited",
	components : "V,S,M",
	compMaterial : "A small written message",
	duration : "Instantaneous",
	description : "Send 8 character max. message to creature I know on the same dimensional plane as me; 1 per creature per day",
	descriptionFull : "You send a small scroll with a short message to a creature of your choice. The recipient must be a creature known to you and also be on the same plane of existence as you. This scroll will hover in front of the recipient, drop into their pocket, or appear sitting on something nearby. The scroll’s message can be up to 8 characters long (spaces count as characters). You can send only one scroll to a single target each day."
};
SpellsList["finger guns"] = { //Has attack entry
	name : "Finger Guns",
	classes : ["warmage", "bard", "sorcerer", "wizard"],
	source : ["VSoS", 338],
	level : 0,
	school : "Evoc",
	time : "1 bns",
	range : "Self",
	components : "V,S",
	duration : "1 min",
	description : "Ranged spell attack as an action within 60 ft. for duration, 1d8+1d8/CL force damage",
	descriptionFull : "You extend your forefinger and thumb, a dangerous gesture mimicking a gun. For the duration, you can use your action to make a ranged spell attack against one creature you can see within 60 feet of you, dealing 1d8 force damage on a hit. \n Your finger gun doesn’t require ammunition, but it is considered to be a firearm for spells and effects that apply to firearms." + AtHigherLevels + "The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
SpellsList["force buckler"] = {
	name : "Force Buckler",
	classes : ["warmage"],
	source : ["VSoS", 339],
	level : 0,
	school : "Evoc",
	time : "1 bns",
	range : "Self",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp.",
	duration : "1 rnd",
	description : "+2 AC until end of next turn or hit by atk.",
	descriptionFull : "You summon a translucent yet visible field of force, which springs forth from the prepared gauntlet. Until the start of your next turn, this shield grants you a +2 bonus to your Armor Class, as if you were wielding a shield. This spell ends early if you are hit by an attack."
};
SpellsList["force dart"] = { //Has attack entry
	name : "Force Dart",
	classes : ["warmage"],
	source : ["VSoS", 339],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "120 ft",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp.",
	duration : "Instantaneous",
	description : "Ranged spell atk. for 1d10+1d10/CL force dmg.",
	descriptionFull : "You fling a dart of magical force at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage." + AtHigherLevels + "This spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
};
SpellsList["force weapon"] = { //Has attack entry
	name : "Force Weapon",
	classes : ["warmage"],
	source : ["VSoS", 339],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "5 ft",
	components : "V,S,M\u0192",
	compMaterial : "A specially prepared gauntlet worth at least 5 gp.",
	duration : "1 rnd",
	description : "Melee spell atk. for 1d10+1d10/CL force dmg. +1/CL>5 atks. on cast.",
	descriptionFull : "You conjure a blade of magical force in the air, which lashes out at your foes. Make a melee spell  against a creature within range. On a hit, the target takes 1d10 force damage. The blade remains in existence for a short time; until the start of your next turn, you can make a single strike with your mystical blade as an opportunity attack." + AtHigherLevels + "You can make 1 additional attack on your turn at 5th level (2 attacks), at 11th level (3 attacks), and at 17th level (4 attacks)."
};
SpellsList["frigid blade"] = {
	name : "Frigid Blade",
	classes : ["warmage"],
	source : ["VSoS", 340],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "5 ft",
	components : "V,S,M",
	compMaterial : "A melee weapon",
	duration : "1 rnd",
	description : "Melee attack for cold weapon dmg, 1d8+1d8/CL cold dmg as reaction if target moves before my next turn; +1d8/CL>5 cold dmg. on hit",
	descriptionFull : "As part of the action used to cast this spell, you must make a melee attack with a weapon against one creature within the spell’s range, otherwise the spell fails. On a hit, the attack does damage as normal, except that the attack deals cold damage instead of its normal type. Additionally, the target is covered in a brittle frost until the start of your next turn. If the target willingly moves before then, you can use your reaction to deal 1d8 cold damage to the target, ending the spell." + AtHigherLevels + "At 5th level, the melee attack and secondary damage each deal an additional 1d8 cold damage. Both damage rolls increase by 1d8 at 11th level (2d8 and 3d8) and 17th level (3d8 and 4d8)."
};
SpellsList["lightning surge"] = {
	name : "Lightning Surge",
	classes : ["warmage", "necromancer", "sorcerer", "warlock", "wizard"],
	source : ["VSoS", 347],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "Self (5 ft. radius)",
	components : "V,S,M",
	compMaterial : "Two bits of copper wire",
	duration : "Instantaneous",
	description : "All creatures within 5 ft. Dex save or take 1d6+1d6/CL lightn. dmg.",
	descriptionFull : "You emit a dazzling array of short lightning bolts in all directions. All other creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 lightning damage." + AtHigherLevels + "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level(4d6)."
};
SpellsList["magic daggers"] = { //Has attack entry
	name : "Magic Daggers",
	classes : ["warmage", "bard"],
	source : ["VSoS", 347],
	level : 0,
	school : "Conj",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Ranged spell atk. for 1d6 force dmg. +1 daggers at CL5/11/17",
	descriptionFull : "With a flourish, you conjure a throwing dagger of magical force out of thin air and flick it from your wrist at a target you can see. Make a ranged spell attack roll against a creature within range. On a hit, the target takes 1d6 force damage. The dagger vanishes after the attack." + AtHigherLevels + "At higher levels, you conjure more daggers out of force and make additional attacks: two daggers at 5th level, three daggers at 11th level, and four daggers at 17th level. You can use the daggers to attack the same target or different ones. Make a separate attack roll for each dagger."
};
SpellsList["moment to think"] = {
	name : "Moment to Think",
	classes : ["warmage", "cleric", "sorcerer", "wizard"],
	source : ["VSoS", 350],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "Instantaneous",
	description : "Pause time, 1 extra a. to Search, Use an Object, or make Int. check to remember info.",
	descriptionFull : "When you cast this spell, you briefly stop time for everyone but yourself. You can take one additional action and move around in your space while no time passes for other creatures. That action can be used only to take the Search or Use an Object action, or to make an Intelligence check to remember information about something."+
	"Furthermore, you can’t affect or damage any creature or object, other than objects you are wearing or carrying. If an object leaves your hand, it also becomes frozen in time."
};
SpellsList["phantom grapnel"] = {
	name : "Phantom Grapnel",
	classes : ["warmage"],
	source : ["VSoS", 351],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "30 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Huge or larger target, pull yourself to it; large or smaller, pulled 10 ft. to you, Str. save to resist",
	descriptionFull : "You conjure a chain and hook made of magical force, which you propel at a creature or unoccupied space you can see within range. When you target a space or a creature of Huge size or larger, your grapnel pulls you to that target in a straight line. You provoke opportunity attacks for this movement as normal. When you target a creature of Large size or smaller, you pull the target up to 10 feet toward you. A creature can make a Strength saving throw to resist this movement."
};
SpellsList["quickstep"] = {
	name : "Quickstep",
	classes : ["warmage"],
	source : ["VSoS", 352],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "1 rnd",
	description : "+10 ft. of movement speed until the start of my next turn",
	descriptionFull : "You call upon your inner reserves to give you a brief flash of speed. When you cast this spell, your walking speed increases by 10 feet until the start of your next turn."
};
SpellsList["sonic pulse"] = {
	name : "Sonic Pulse",
	classes : ["warmage"],
	source : ["VSoS", 354],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "60 ft",
	components : "V,S",
	duration : "Instantaneous",
	description : "Target Con. save or take 1d8+1d+/CL thunder dmg. and deafened until start of my next turn",
	descriptionFull : "You compress a thunderous boom into an invisible ball and project it at a creature you can see within range. The target must succeed on a Constitution saving throw, or it takes 1d8 thunder damage and is deafened until the start of your next turn. If the spell’s target is within 10 feet of you, this spell’s damage becomes d10s, instead of d8s." + AtHigherLevels + "This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
};
SpellsList["springheel"] = {
	name : "Springheel",
	classes : ["warmage", "druid"],
	source : ["VSoS", 354],
	level : 0,
	school : "Trans",
	time : "1 bns",
	range : "Self",
	components : "V",
	duration : "1 rnd",
	description : "Until start of next turn, jump dist. +10 ft. and running high/long jump without running start.",
	descriptionFull : "You flood magic into your legs, allowing you to bound high into the air from a standstill. When you cast this spell, your jump distance increases 10 feet until the start of your next turn, and you can make a running high jump or a running long jump without a running start."
};
SpellsList["thunderous distortion"] = {
	name : "Thunderous Distortion",
	classes : ["warmage"],
	source : ["VSoS", 354],
	level : 0,
	school : "Evoc",
	time : "1 a",
	range : "Self (10 ft. cone)",
	components : "V,S",
	duration : "Instantaneous",
	description : "Creatures in area Con. save or 1d6+1d6/CL (1d8+1d8/CL on 2nd cast before next turn end) thunder dmg.",
	descriptionFull : "You produce a distorted wave of noise in a 10-foot cone, which can be heard up to 100 feet away. Each creature in that area must succeed a Constitution saving throw, or take 1d6 thunder damage."+
	"An echo of this noise persists until the end of your next turn. If you cast this spell again before the end of your next turn, its damage becomes d8s, instead of d6s." + AtHigherLevels + "This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
};

//Spell attack entries
WeaponsList["card trick"] = {
	regExpSearch : /^(?=.*card)(?=.*trick).*$/i,
	name : "Card Trick",
	source : ["VSoS", 332],
	list : "spell",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 6, "Force"],
	range : "60 ft",
	description : "Ranged spell atk. OR target Dex save to hit",
	abilitytodamage : false
};
WeaponsList["finger guns"] = {
	regExpSearch : /^(?=.*finger)(?=.*guns).*$/i,
	name : "Finger Guns",
	source : ["VSoS", 338],
	list : "firearm",
	ability : 6,
	type : "Cantrip",
	damage : ["C", 8, "Force"],
	range : "60 ft",
	description : "",
	abilitytodamage : false
};
WeaponsList["force weapon"] = {
	regExpSearch : /^(?=.*force)(?=.*weapon).*$/i,
	name : "Force Weapon",
	source : ["VSoS", 339],
	list : "Spell",
	ability : 6,
	type : "Cantrip",
	damage : [1, 10, "Force"],
	range : "Melee",
	description : "Opportunity atk. after cast; +1 atk. at CL5/11/17",
	abilitytodamage : false
};
WeaponsList["magic daggers"] = {
	regExpSearch : /^(?=.*magic)(?=.*daggers).*$/i,
	name : "Magic Daggers",
	source : ["VSoS", 347],
	list : "Spell",
	ability : 6,
	type : "Cantrip",
	damage : [1, 6, "Force"],
	range : "60 ft",
	description : "+1 atk. rolls at CL5/11/17",
	abilitytodamage : false
};

//This code adds the Warmage tricks extrachoices. It's run here, since running it as part of the class feature removes them when the sheet is saved and reopened.
RunFunctionAtEnd(function () {
	var theObj = ClassList["warmage"].features["warmage tricks"]; //The feature itself, var for shorthand
				
	for (x in WarmageTricks) {
		theObj.extrachoices.push(WarmageTricks[x].name); //Add the name to the extrachoices array
		theObj[WarmageTricks[x].name.toLowerCase()] = WarmageTricks[x]; //Add the extrachoice feature itself
	}
});
