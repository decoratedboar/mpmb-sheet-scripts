/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Classes
	Effect:		
				This script adds a Class, the Cowboy Gunslinger, as well as the four feats (one of which is excluded by default) and four weapons (all excluded by default) that are included with it.
				This class is a homebrew creation by Zantimago
				You can find it here: https://www.gmbinder.com/share/-N2uFyAkcoGsaoBr-hug
	Code by:	u/decoratedblood (decoratedboar)
	Date:		28-01-2024 (sheet v13.1.5")
*/
var iFileName = "Z's Cowboy Gunslinger v2 [By Zantimago, transcribed by decoratedboar].js";

RequiredSheetVersion("13.1.5");

ClassList["gunslinger"] = {
	name : "Gunslinger",
	regExpSearch : /^(?=.*gunslinger).*$/i,
	source : ["HB", 0],
	defaultExcluded : false,
	primaryAbility : "Dexterity or Charisma",
	prereqs : "Dexterity 13, Charisma 13",
	die : 8,
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	saves : ["Dex", "Cha"],
	skills : ["\n\n" + toUni("MyClass") + ": Choose two from Sleight of Hand, Acrobatics, Stealth, Survival, Perception, Insight, and Intimidation.", "\n\n" + toUni("MyClass") + ": Choose one from Sleight of Hand, Acrobatics, Stealth, Survival, Perception, Insight, and Intimidation."],
	
	toolProfs : {
		primary : [["Artisan's Tools"], ["Musical instrument or gaming set", 1]],
		secondary : [["Artisan's Tools"], ["Musical instrument or gaming set", 1]],
	},
	
	armor : [
		[true, false, false, false],
		[true, false, false, false]
	],
	
	weapons : [
		[true, false, ["Ranged Weapons", "Lassos", "Firearms"]],
		[true, false, ["Ranged Weapons", "Lassos", "Firearms"]]
	],
	
	
	equipment : "MyClass starting equipment:" +
	"\n \u2022 A revolver -or- a rifle;" +
	"\n \u2022 An explorer's kit -or- a burglar's pack;" +
	"\n \u2022 Any simple weapons;" +
	"\n \u2022 Leather armor." +
	"\n \nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",

	subclasses : ["Gunslinger Paths", ["the desperado", "the marksman", ]], 
	attacks : levels.map(function(n){return n < 5 ? 1 : 2}),	
	abilitySave : 2,
	abilitySaveAlt : 6,
	features : {
		"trained skills" : {
			name : "Trained Skills",
			source : ["HB", 0],
			minlevel : 1,
			description : desc([ 
				"Use the \"Choose Feature\" button above to add a Trained Skill the to third page.",
				"You gain advantage in the chosen checks.",
			]),
			additional : levels.map(function (n) {
				return n < 10 ? 2 : 3 + " known";
			}),
			extraname : "Trained Skills",
			extrachoices : ["Survival, Nature, and Investigation", "Insight", "Deception", "Sleight of Hand", "Intimidation", "Intelligence", "Performance"],
			extraTimes : levels.map(function (n) {
				return n < 10 ? 2 : 3;
			}), 
			choicesNotInMenu : false,
			"survival, nature, and investigation" : {
				name : "Survival, Nature, and Investigation",
				description : desc([
					"I gain advantage on Survival, Nature, and Investigation checks made to track a creature."
				]),
			},
			"insight" : {
				name : "Insight",
				description : desc([
					"I gain advantage on Insight checks made against a humanoid to determine",
					"whether they are lying or not about something crime-related.",
				]),
			},
			"deception" :{
				name : "Deception",
				description : desc ([
					"I gain advantage on Deception checks made against a humanoid to lie about",
					"something crime-related.",
				]),
			},
			"sleight of hand" :{
				name : "Sleight of Hand",
				description : desc([
					"I gain advantage on any Sleight of Hand check made to draw a revolver and aim."
				]),
			},
			"intimidation" :{
				name : "Intimidation",
				description : desc([
					"I gain advantage on Intimidation checks made while pointing a firearm at the",
					"target creature(s) if said creature(s) know what a firearm is and that it is dangerous"
				]),
			},
			"intelligence" :{
				name : "Intelligence",
				description : desc([
					"I gain advantage on any kind of Intelligence check made to both better understand how a",
					"weapon or mechanism that uses gunpowder works and modify said kind of technology."
				]),
			},
			"performance" :{
				name : "Performance",
				description : desc([
				"I gain advantage on Performance and Sleight of Hand checks made to do tricks with guns."
				]),
			},
		},		
		"run red run" : {
			name : "Run Red Run",
			source : ["HB", 0],
			minlevel : 1,
			description : desc([
				"I gain an initiative bonus equal to my Charisma modifier, and I can take the Dash",
				"action once during my first turn of combat (no action required)",
			]),
			action : ["action", "Dash (as part of first turn in combat)"],
			addMod : {type : "skill", field : "Init", mod : "Cha", text : "I add my Charisma modifier to my initiative rolls."},
		},
		"sights" : {
			name : "Sights",
			source : ["HB", 0],
			minlevel : 1,
			description : desc([
				"I can use an action to change my firearm's sight" + "Use the \"Choose Feature\" button",
				"above to select your current sight",
			]),
			action : ["action", "Change gun sight"],
			choices : ["Iron Sights", "No Sight", "Scope"],
			
			"iron sights" : {
				name : "Iron Sights",
				description : desc ([
					"My gun's default sight. Its properties are not altered."
				]),
			},
			
			"no sight" : {
				name : "No Sight",
				description: desc([
					"My gun’s normal and long ranges are reduced to 1/4, but I gain a +2 bonus to",
					"hit with any attack rolls I make with it",
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((v.WeaponName.match(/(pistol|musket|revolver|rifle|shotgun|annihilator)/i)) && (/\d+ ?(f.{0,2}t|m)/i).test(fields.Range)) {
								var rangeNmbr = fields.Range.match(/\d+([.,]\d+)?/g);
								var notNmbrs = fields.Range.split(RegExp(rangeNmbr.join('|')));
								fields.Range = '';
								rangeNmbr.forEach(function (dR, idx) {
									fields.Range += (notNmbrs[idx] ? notNmbrs[idx] : '') + (parseFloat(dR.toString().replace(',', '.') * 0.25));
								});
								if (notNmbrs.length > rangeNmbr.length) {
									fields.Range += notNmbrs[notNmbrs.length - 1];
								};
								if (!v.rangeM) {
									v.rangeM = 0.25;
								} else {
									v.rangeM *= 0.25;
								}; fields.To_Hit_Bonus += 2; fields.Description += '; No sight';
								if (CurrentFeats.known.indexOf('cqc expert') !== -1 && (v.WeaponName.match(/revolver/i))) {
									fields.Description += '; +' + What('Cha Mod') + ' damage within 5ft; ignore cover (not full)'; fields.Damage_Bonus += What('Cha Mod');
								};
							}; 
							
						},
					],
				},
				
			},
			
			"scope" : {
				name : "Scope",
				description: desc([
					"Both my gun’s normal and long ranges are doubled, and I ignore both 1/2 and",
					"3/4 cover, but any ranged attack roll I make with it suffers a -2 penalty",
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((v.WeaponName.match(/(pistol|musket|revolver|rifle|shotgun|annihilator)/i)) && (/\d+ ?(f.{0,2}t|m)/i).test(fields.Range)) {
								var rangeNmbr = fields.Range.match(/\d+([.,]\d+)?/g);
								var notNmbrs = fields.Range.split(RegExp(rangeNmbr.join('|')));
								fields.Range = '';
								rangeNmbr.forEach(function (dR, idx) {
									fields.Range += (notNmbrs[idx] ? notNmbrs[idx] : '') + (parseFloat(dR.toString().replace(',', '.') * 2));
								});
								if (notNmbrs.length > rangeNmbr.length) {
									fields.Range += notNmbrs[notNmbrs.length - 1];
								};
								if (!v.rangeM) {
									v.rangeM = 2;
								} else {
									v.rangeM *= 2;
								}; fields.To_Hit_Bonus -= 2; fields.Description += '; Scoped'
							}; 
						},  
					],
				},
				
			},
		},
		"fortune favors the bold 1" : {
			name : "Luck Points",
			source : ["HB", 0],
			minlevel : 2,
			description : desc([			
				"I gain a number of Luck Points. They fuel my Luck Strikes, and can be spent to",
				"increase a firearm attack's damage as if I'd critically hit.",
				"I regain all my Luck Points on a short rest, and when I critically hit with a firearm",
				"against a creature with at least 10 hit points, I can choose to regain a Luck Point.",
			]),
			limfeaname : "Luck Points",
			usages : "Proficiency Bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "short rest",
			
		},	
		"fortune favors the bold 2" : {
			name : "Luck Strikes",
			source : ["HB", 0],
			minlevel : 2,
			description : desc([
				"I gain Luck Strikes, which can be used by expending the appropriate amount of",
				"Luck Points. When I critically strike with a firearm, I can choose to apply a Luck",
				"Strike for free, instead of regaining a Luck Point.",
				"See the notes page for available Luck Strikes."
			]),
			toNotesPage : [{
				name : "Luck Strikes",
				note : [
					"I gain Luck Strikes based on my level."
				]
			}],
			"ricochet" : {
				name : "Ricochet",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 2,
				toNotesPage : [{
					name : "Ricochet [1 Luck Point]",
					note : [
						"After missing an attack, you make the bullet ricochet off of nearby surfaces, items",
						"or even creatures. You choose either the same target or another that you can see",
						"and is within your normal range, and then reroll the attack roll, ignoring cover."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"mightier than the sword" : {
				name : "Mightier than the Sword",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 2,
				toNotesPage : [{
					name : "Mightier Than the Sword [1 Luck Point]",
					note : [
						"Whenever an enemy you can makes a weapon attack, you can use your reaction",
						"and 1 LP to force that enemy to reroll the attack, taking the lower of the two results.",
						"If the attack is a ranged weapon attack you only need to see the target within your",
						"normal range, and the attack fails automatically. The enemy is unharmed.",
						"Huge and bigger creatures are immune to Luck Strike."
					],
					amendTo : "Luck Strikes",
				}],
				action : ["reaction", " [1 LP]"],
			},
			"leg shot" : {
				name : "Leg Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 2,
				toNotesPage : [{
					name : "Leg Shot [1 Luck Point]",
					note : [
						"The target's walking speed is reduced by 20 ft until the end of its next turn. If the",
						"target has no movement speed left, it is knocked prone. If the target is Large, it's speed",
						"is reduced only 10ft, and Huge and larger creatures are immune to this Luck Strike."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"dizzying shot" : {
				name : "Dizzying Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 3,
				toNotesPage : [{
					name : "Dizzying Shot [1 Luck Point]",
					note : [
						"The target is briefly distracted by the pain inflicted, unable to take reactions until the",
						"end of its next turn."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"pushing shot" : {
				name : "Pushing Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 3,
				toNotesPage : [{
					name : "Pushing Shot [1 Luck Point]",
					note : [
						"You push the target of the ranged firearm attack 10 ft away from you. If the target",
						"is Large, it is moved just 5 ft. Huge and Gargantuan creatures are immune to the",
						"effects of this Luck Strike."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"piercing shot" : {
				name : "Piercing Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 6,
				toNotesPage : [{
					name : "Piercing Shot [1 Luck Point]",
					note : [
						"The bullet keeps enough force after impact to still be deadly. The attack now targets",
						"a number of creatures that are in straight line behind the initial target of up to your",
						"charisma modifier. Use the same attack roll, but roll damage for each hit. The bullet",
						"loses all force after exiting your normal range."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"counter-bullet" : {
				name : "Counter-Bullet",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 7,
				toNotesPage : [{
					name : "Counter-Bullet [2 Luck Points]",
					note : [
						"As a reaction when you see an enemy cast a spell, you can spend 2 LPs to shoot said",
						"enemy with the intent of interrupting the casting. Make an attack roll, the target AC of",
						"which equals 10 + the spell’s level. On a hit, the creature’s spell fails and has no effect.",
						"The spell still consumes the required resources, such as spell slots. The enemy is unharmed."
					],
					amendTo : "Luck Strikes",
				}],
				action : ["reaction", " [2 LPs]"],
			},
			"exposing shot" : {
				name : "Exposing Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 7,
				toNotesPage : [{
					name : "Exposing Shot [1 Luck Point]",
					note : [
						"The target's Armor Class is reduced by 2 points until the start of your next turn."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"compelling shot" : {
				name : "Compelling Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 9,
				toNotesPage : [{
					name : "Compelling Shot [1 Luck Point]",
					note : [
						"You demand the target's attention, forcing them to keep an eye on you. The target has",
						"disadvantage on attack rolls against and can't make opportunity attacks targeting",
						"creatures other than you. This effect lasts until one of your allies attacks the target or",
						"affects it with a spell, or until you end your turn more than 60ft away from the target."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"anti-aerial shot" : {
				name : "Anti-Aerial Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 10,
				toNotesPage : [{
					name : "Anti-Aerial Shot [1 Luck Point]",
					note : [
						"If the target is an airborne creature whose flying speed comes from physical means, you can target them to hinder it's flight. The creature's flying speed is reduced by 40ft."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"disarming shot" : {
				name : "Disarming Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 11,
				toNotesPage : [{
					name : "Disarming Shot [1 Luck Point]",
					note : [
						"You hit a hand or similar appendix of the target, forcing it to drop whatever item it is",
						"holding with that hand, if any. If the target is holding an item with two or more hands",
						"it is unaffected. The object lands at its feet. Huge and larger creatures are immune to",
						"this Luck Strike."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"shield breaker" : {
				name : "Shield Breaker",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 14,
				toNotesPage : [{
					name : "Shield Breaker [1 Luck Point]",
					note : [
						"If the target is under the effect of the Shield spell, including if it was cast as a reaction",
						"to this attack, the bullet shatters the magical shield, ignoring the AC bonus the spell",
						"would provide and ending it."
					],
					amendTo : "Luck Strikes",
				}],
			},
			"weakening shot" : {
				name : "Weakening Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 17,
				toNotesPage : [{
					name : "Weakening Shot [1 Luck Point]",
					note : [
						"The target has disadvantage on the next saving throw it makes before the start of",
						"your next turn."
					],
					amendTo : "Luck Strikes",
				}],
			},
			
			autoSelectExtrachoices : [{
				extrachoice : 'ricochet',
				minlevel : 2,
			}, {
				extrachoice : 'mightier than the sword',
				minlevel : 2,
			}, {
				extrachoice : 'leg shot',
				minlevel : 2,
			}, {
				extrachoice : 'dizzying shot',
				minlevel : 3,
			}, {
				extrachoice : 'pushing shot',
				minlevel : 3,
			}, {
				extrachoice : 'piercing shot',
				minlevel : 6,
			}, {
				extrachoice : 'counter-bullet',
				minlevel : 7,
			}, {
				extrachoice : 'exposing shot',
				minlevel : 7,
			}, {
				extrachoice : 'compelling shot',
				minlevel : 9,
			}, {
				extrachoice : 'anti-aerial shot',
				minlevel : 10,
			}, {
				extrachoice : 'disarming shot',
				minlevel : 11,
			}, {
				extrachoice : 'shield breaker',
				minlevel : 14,
			}, {
				extrachoice : 'weakening shot',
				minlevel : 17,	
			}],
		},
		"lady luck\'s gift" : {
			name : "Lady Luck\'s Gift",
			source : ["HB", 0],
			minlevel : 2,
			description : desc([
				"Once per long rest as a bonus action, I restore all expended Luck Point.",
			]),
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", " [Restore LP]"]
		},
		"luck boon" : {
			name : "Luck Boon",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
				"When a creature I can see within 60 ft. makes a saving throw or ability, I can",
				"spend 1 Luck Point and add my Charisma modifier to the total as a reaction.",
				"I can do this after the roll is made, but before knowing the outcome."
			]),
			action : ["reaction", " [1 LP]"],
		},
		
		"subclassfeature3" : {
			name : "Gunslinger Path",
			source : ["HB", 0],
			minlevel : 3,
			description : desc([
				"Choose a Gunslinger Path to put in the \"Class\" field.",
			]),
		},
		
		"deadeye" : {
			name : "Deadeye",
			source : ["HB", 0],
			minlevel : 5,
			description : desc([
				"I can expend two attacks to make a single one, adding my Charisma modifier to",
				"the attack roll, and guaranteeing critical damage if it hits. I can apply a Luck Strike",
				"for free if I critically hit normally."
			]),
			action : ["action", " (uses two attacks)"],
		},
		"silver bullets" : {
			name : "Silver Bullets",
			source : ["HB", 0],
			minlevel : 6,
			description : desc([
				"My firearm attacks count as magical.",
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.WeaponName.match(/(pistol|musket|revolver|rifle|shotgun|annihilator)/i)) {
							fields.Description += '; Counts as magical'
						};
					},
				],
			},
			
		},
		"superior luck boon" : {
			name : "Superior Luck Boon",
			source : ["HB", 0],
			minlevel : 7,
			description : desc([
				"When I use the Luck Boon feature, myself and the affected ally gain double my",
				"proficiency, bonus in temporary hit points, increasing to three times at 13th level,",
				"I can also spend 1 Luck Point to grant the temporary hit points as a bonus action).",
			]),
			action : ["bonus action", " (temp HP) [1 LP]"],
		},
		"animal friend" : {
			name : "Animal Friend",
			source : ["HB", 0],
			minlevel : 13,
			description : desc([
				"I gain advantage on all Animal Handling checks.",
			]),
			skillstxt : "I gain advantage on all Animal Handling Checks.",
			advantages : [["Animal Handling", true]]
		},
		"no such thing as luck" : {
			name : "No Such Thing As Luck",
			source : ["HB", 0],
			minlevel : 14,
			description : desc([
				"My attack rolls no longer have disadvantage against invisible or obscured targets",
			]),
		},		
		"guardian angel" : {
			name : "Guardian Angel",
			source : ["HB", 0],
			minlevel : 18,
			description : desc([
				"Whenever I roll a 1 on the d20, I treat it as a 20.",
			]),
		},
		"master gunslinger" : {
			name : "Master Gunslinger",
			source : ["HB", 0],
			minlevel : 20,
			description : desc([
				"Whenever I make or land an attack, I can apply a Luck Strike for free.",
			]),
		},
	},
};	

AddSubClass("gunslinger", "the desperado", {
		regExpSearch : /^(?=.*the)(?=.*desperado).*$/i,
		subname : "The Desperado",
		source : ["HB", 0],
		fullname : "The Desperado",
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],		
		features : {
			"subclassfeature3" : {
				name : "Dancing With Danger",
				source : ["HB", 0],
				minlevel : 3,
				description : desc([
					"My firearm attacks critically strike on an attack roll of 19 or higher, and I no longer",
					"roll them with disadvantage within 5 ft. of my target."
				]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.WeaponName.match(/(pistol|musket|revolver|rifle|shotgun|annihilator)/i)) {
								fields.Description += '; Crit on 19-20; No disadv. within 5ft';
							};
						},
					],
				},
			},
			"subclassfeature3.1" : {
				name : "Body Reader",
				source : ["HB", 0],
				minlevel : 3,
				description : desc([
					"As a bonus action, I can make a Charisma check against DC 8 + the creature\'s",
					"deception modifier. On a success, I know their alignment; on a failure I only know",
					"whether they're Lawful, Neutral, or Chaotic.",
					"I can use this feature on the same target once every 24 hours."
				]),
				action : ["bonus action", ""],
			},			
			"subclassfeature6" : {
				name : "Don\'t Fence Me In",
				source : ["HB", 0],
				minlevel : 6,
				description : desc([
					"I add my Charisma modifier to Dexterity checks and saving throws I make to prevent",
					"my movement being reduced or impaired.",
				]),
				savetxt : { 
					text : ["Add Cha. mod. to Dex. checks or saves vs. impaired movement"]
				}
			},
			"subclassfeature6.1" : {
				name : "Make it Count",
				source : ["HB", 0],
				minlevel : 6,
				description : desc([
					"Once per short rest, when I drop to 0 hit points, I can make an attack roll as a reaction.",
				]),
				usages: 1,
				recovery : "short rest",
				action: ["reaction", " (attack)"],
			},
			"subclassfeature11" : {
				name : "Swift Shooter",
				source : ["HB", 0],
				minlevel : 11,
				description : desc([
					"I gain one additional attack whenever I take the Attack action. Additionally, I no",
					"longer spend my reaction when using Luck Strikes that require it.",
				]),
				attacks : levels.map(function(n){return n < 5 ? 1 : n < 11 ? 2 : 3}),
			},
			"subclassfeature15" : {
				name : "High Noon",
				source : ["HB", 0],
				minlevel : 15,
				description : desc([
					"In the first round of combat, I always act first, and I can spend 2 Luck Points to take",
					"an additional action. Creatures with similar features to this make Sleight of Hand",
					"checks, acting in ascending order of the results.",
				]),
			},
		}
	}
);

AddSubClass("gunslinger", "the marksman", {
		regExpSearch : /^(?=.*the)(?=.*marksman).*$/i,
		subname : "The Marksman",
		source : ["HB", 0],
		fullname : "The Marksman",
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],		
		features : {
			"subclassfeature3" : {
				name : "Sniper",
				source : ["HB", 0],
				minlevel : 3,
				description : desc([
					"I no longer have disadvantage on firearm attacks when prone, and I ignore the",
					"Gunslinger scope\'s attack roll penalty when I\'m prone or in 1/2 or 3/4 cover.",
				]),
			},
			"subclassfeature3.1" : {
				name : "Quick Reload",
				source : ["HB", 0],
				minlevel : 3,
				description : desc([
					"When I haven't moved on a turn, I can reload my weapon as a bonus action, and",
					"am unable to move after doing so. I can also reload while Dashing.",
				]),
			},
			"subclassfeature6" : {
				name : "Cover Master",
				source : ["HB", 0],
				minlevel : 6,
				description : desc([
					"I gain an additional +1 to AC and Dexterity saving throws while in 1/2 and 3/4 cover.",
				]),
			},
			"subclassfeature6.1" : {
				name : "Quiet",
				source : ["HB", 0],
				minlevel : 6,
				description : desc([
					"As a bonus action, I reduce the noise from my next firearm attack. Rifles/shotguns",
					"can only be heard 15 ft. away, and revolvers/pistols 10 ft.",
				]),
				action : ["bonus action", "Quiet"],
			},
			"subclassfeature11" : {
				name : "Hollow-Point Bullets",
				source : ["HB", 0],
				minlevel : 11,
				description : desc([
					"I roll critical damage dice three times, instead of twice.",
				]),
			},
			"subclassfeature11.1" : {
				name : "Elite Sniper",
				source : ["HB", 0],
				minlevel : 11,
				description : desc([
					"While my Sniper feature is active, I add my Charisma modifier to firearm damage rolls.",
				])
			},
			"subclassfeature15" : {
				name : "Yuyan of the West",
				source : ["HB", 0],
				minlevel : 15,
				description : desc([
					"After using the Deadeye feature, but before making the attack roll, I can spend",
					"one Luck Point to either give the attack unlimited range, or make it hit automatically." 
				]),
				action : ["action", " (with Deadeye) [1 "],
			},
		}
	}
);

FeatsList["cqc expert"] = {
	name: "CQC Expert",
	source: [["HB", 0]],
	descriptionFull : "You develop a new fighting style for close-quarter fights based around revolvers, gaining these benefits whenever you use one: \n \u2022 Attacks made against enemies within 5ft of you gain a bonus to their damage equal to your charisma modifier if the revolver is sightless. \n \u2022 You ignore half and 3/4 cover when attacking with a firearm within normal range. \n \u2022 During your turn, if you hit a creature with an attack, that creature can't make opportunity attacks against you for the rest of your turn.",
	description: "I gain bonus damage when attacking a target within 5 ft. of me with a sightless revolver equal to my Charisma modifier. Additionally, I ignore 1/2 and 3/4 cover when attacking with a firearm within normal range, and if I hit a creature with an attack, it can't make opportunity attacks against me for the rest of my turn.",
	prerequisite : "Prerequisite: Desperado Gunslinger",
	prereqeval : "classes.known.gunslinger.subclass === 'gunslinger-the desperado'"	
	//look at checking for sightless revolvers?
};

FeatsList["lucky shooter"] = {
	name: "Lucky Shooter",
	source: [["HB", 0]],
	descriptionFull : "You learn how to better implement luck in your fighting style, gaining these benefits: \n \u2022 Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a +5 bonus to the attack roll. If that attack hits, its damage takes a -10 penalty, to a minimum of 1 damage. \n \u2022 Your firearms' normal range is extended to be equal to their long range. \n \u2022 Your Luck Point maximum is increased by one and you gain one extra Luck Point whenever you roll for initiative, up to your maximum LP capacity. You only gain this benefit if you have the Fortune Favors the Bold feature.",
	description: "With a ranged weapon that I am proficient with, I can choose to take a +5 bonus on the attack roll, taking a -10 penalty to damage, to a minimum of 1 if the attack hits. Additionally, my firearm\'s normal ranges are now equal to their long range. If I have the Fortune Favours the Bold feature from the Gunslinger class, my Luck Point maximum is also increased by one, and I gain an extra Luck Point whenever I roll for initiative, up to my max",
	
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.WeaponName.match(/(pistol|musket|revolver|rifle|shotgun|annihilator)/i)) {
					fields.Description += '; No range penalty'
				};
			},
		],
	},
	
	limfeaAddToExisting : true,
	limfeaname : "Luck Points",
	usages : "Proficiency Bonus +1 per ",
	usagescalc : "event.value = 1 + Number(How('Proficiency Bonus'));",
	recovery : "short rest",	
};

FeatsList["powder ganger"] = {
	name: "Powder Ganger",
	source: [["HB", 0]],
	defaultExcluded : true,
	descriptionFull : "You become an expert in the use of explosives, gaining these benefits: \n \u2022 Whenever you take a short rest, you can tie up to 4 dynamite sticks together to make a dynamite pack, increasing the damage by 2d6 and how far objects and creatures are pushed away by 5ft each each. \n \u2022 You can throw dynamite sticks and packs as a bonus action and twice as far. \n \u2022 After you throw a dynamite stick or pack as a bonus action, you can target it at any point of its trajectory with a ranged firearm attack. When shot using this feature the dynamite has an AC of 20, exploding immediately if a shot lands, and you add your charisma modifier to the damage of the explosion. \n \u2022 You can set a precise timer to trigger the explosion of dynamite, which cannot be less than one round. You can link dynamite together to trigger multiple explosions at the same time.",
	description: "I can tie up to 4 dynamite sticks together over the course of a short rest to make a dynamite pack, increasing the damage by 2d6 and how far objects and creatures are pushed back by 5ft per stick. Additionally, I can throw dynamite sticks and packs as a bonus action and twice as far. I can make a firearm attack against thrown dynamite sticks or packs at any point on their trajectory. The dynamite has an AC of 20, explodes as soon as it is hit, and I add my Charisma modifier to the explosion damage. I can also set a timer for dynamite with a length of between one round and two hours.",
	action : ["bonus action", " (Throw Dynamite/Pack)"],
};

FeatsList["twice as deadly"] = {
	name: "Twice as Deadly",
	source: [["HB", 0]],
	descriptionFull : "You are now so skilled in using revolvers that you can wield and shoot two of them at the same time, gaining these benefits when you do so: \n \u2022 You can make twice as many attacks whenever you take the Attack action. When you use this ability you don't add your dexterity modifier to the attack rolls nor damage of those attacks, even if you instead make Deadeye attacks. \n \u2022 You can reload every revolver you are wielding, even if you have no free hands, as a bonus action. \n \u2022 In addition, you can now draw or stow two revolvers when you would normally be able to draw or stow only one. \nIn addition, you can now draw or stow two revolvers when you would normally be able to draw or stow only one.",
	description: "I can now use two revolvers at once, and can make twice as many attacks when taking the Attack action. While attacking this way, I don't add my Dexterity modifier to the attack or damage rolls, even while making Deadeye attacks. I can reload every revolver I am wielding as a bonus action, and I can draw or stow two revolvers at once instead of one.",
	action : ["bonus action", " (reload revolvers)"],
	prerequisite : "Prerequisite: Desperado Gunslinger",
	prereqeval : "classes.known.gunslinger.subclass === 'gunslinger-the desperado'"	
};

WeaponsList["gunslinger revolver"] = {
	name : "Gunslinger Revolver",
	source : ["HB", 0],
	list : "firearm",
	regExpSearch : /^(?=.*gunslinger)(?=.*revolver).*$/i,
	type : "Firearm",
	ability : 2,
	abilitytodamage : true,
	damage : [2, 4, "piercing"],
	range : "Melee, 60/240 ft",
	weight : 3,
	description : "Ammunition, reload (6 shots), one-handed, light",
	abilitytodamage : true,
	ammo : "modern bullet",
	defaultExcluded : true
};

WeaponsList["gunslinger rifle"] = {
	name : "Gunslinger Rifle",
	source : ["HB", 0],
	list : "firearm",
	regExpSearch : /^(?=.*gunslinger)(?=.*rifle).*$/i,
	type : "Firearm",
	ability : 2,
	abilitytodamage : true,
	damage : [2, 6, "piercing"],
	range : "Melee, 80/320 ft",
	weight : 10,
	description : "Ammunition, reload (2 shots), two-handed",
	abilitytodamage : true,
	ammo : "modern bullet",
	defaultExcluded : true,
};

WeaponsList["lasso"] = {
	regExpSearch : /^(?=.*lasso).*$/i,
	name : "Lasso",
	source : ["HB", 0],
	list : "ranged",
	ability : 2,
	type : "Martial",
	damage : ["\u2015", "", "Restrained"],
	range : "30/60 ft",
	weight : 0.5,
	description : "Thrown, only 1 attack, up to large creature hit is restrained",
	tooltip : "Special: A Large or smaller creature hit by a lasso is restrained until it is freed. A lasso has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the lasso (AC 10) also frees the creature without harming it, ending the effect and destroying the lasso. When I use an action, bonus action, or reaction to attack with a lasso, I can make only one attack regardless of the number of attacks I can normally make.",
	special : true,
	abilitytodamage : false,
	defaultExcluded : true,
};

WeaponsList["dynamite stick"] = {
	regExpSearch : /^(?=.*dynamite)(?=.*stick).*$/i,
	name : "Dynamite Stick",
	source : ["HB", 0],
	list : "ranged",
	ability : 2,
	type : "Explosive",
	damage : [6, 6, "fire"],
	range : "30 ft throw",
	weight : 0.1,
	description : "Thrown, 5 ft explosion radius",
	tooltip : "Special: You can hurl a dynamite stick as an action up to 30 ft from you. It then explodes at the start of your next turn, dealing 6d6 fire damage to any creature, item that is not being worn or carried and structure within 15 ft of the explosion. Creatures and items are pushed 10ft away from the explosion (+5ft per stick in a dynamite pack). If a dynamite sick or pack takes at least one point of fire damage, it explodes instantly. The dynamite has an AC of 20 and can only be targeted with an attack once it has already landed on the ground. You may tie a dynamite pack or stick to an arrow as a bonus action, in which case the dynamite travels with the arrow. If the attack is a critical hit, the arrow sticks to the target.",
	special : true,
	abilitytodamage : false,
	defaultExcluded : true,
};

WeaponsList["dynamite pack"] = {
	regExpSearch : /^(?=.*dynamite)(?=.*pack).*$/i,
	name : "Dynamite Pack",
	source : ["HB", 0],
	list : "ranged",
	ability : 2,
	type : "Explosive",
	damage : [6, 6, "fire"],
	range : "30 ft throw",
	weight : 0.1,
	description : "Thrown, 5 ft explosion radius, extra 2d6 damage 5ft of pushing per stick (4 max)",
	tooltip : "Special: You can hurl a dynamite stick as an action up to 30 ft from you. It then explodes at the start of your next turn, dealing 6d6 fire damage to any creature, item that is not being worn or carried and structure within 15 ft of the explosion. Creatures and items are pushed 10ft away from the explosion (+5ft per stick in a dynamite pack). If a dynamite sick or pack takes at least one point of fire damage, it explodes instantly. The dynamite has an AC of 20 and can only be targeted with an attack once it has already landed on the ground. You may tie a dynamite pack or stick to an arrow as a bonus action, in which case the dynamite travels with the arrow. If the attack is a critical hit, the arrow sticks to the target.",
	special : true,
	abilitytodamage : false,
	defaultExcluded : true,
};
