/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Classes
	Effect:		
				This script adds a Class, the Cowboy Gunslinger, as well as the four new feats (one of which is excluded by default) and four new weapons (all excluded by default) that are included with it.
				This class is a homebrew creation by Zantimago
				You can find it here: https://www.gmbinder.com/share/-N2uFyAkcoGsaoBr-hug
	Code by:	u/decoratedblood (decoratedboar)
	Date:		04-11-2022 (sheet v13.0.6")
*/
var iFileName = "Z's Cowboy Gunslinger [By Zantimago, transcribed by decoratedboar].js";

RequiredSheetVersion("13.0.6");

ClassList["gunslinger"] = {
	name : "Gunslinger",
	regExpSearch : /^(?=.*gun)(?=.*slinger).*$/i,
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
			description : "\n   Choose two Trained Skills to add to the third page using the \"Choose Feature\" button above." + "\n   " + "You gain advantage in the chosen checks",
			extraname : "Trained Skills",
			extrachoices : ["Survival and Investigation", "Insight", "Deception", "Sleight of Hand", "Intimidation", "Intelligence", "Performance"],
			extraTimes : levels.map(function (n) {
				return n < 10 ? 2 : 3;
			}), 
			choicesNotInMenu : false,
			"survival and investigation" : {
				name : "Survival and Investigation",
				description : "\n   I gain advantage on Survival, Nature, and Investigation checks made to track a creature"
			},

			"insight" : {
				name : "Insight",
				description : "\n   I gain advantage on Insight checks made against a humanoid to determine whether they are lying or not about something crime-related",
			},
			"deception" :{
				name : "Deception",
				description : "\n   I gain advantage onDeception checks made against a humanoid to lie about something crime-related",
			},
			"sleight of hand" :{
				name : "Sleight of Hand",
				description : "\n   I gain advantage on any Sleight of Hand check made to draw a revolver and aim"
			},
			"intimidation" :{
				name : "Intimidation",
				description : "\n   I gain advantage on Intimidation checks made while pointing a firearm at the target creature(s) if said creature(s) know what a firearm is and that it is dangerous"
			},
			"intelligence" :{
				name : "Intelligence",
				description : "\n   I gain advantage on any kind of Intelligence check made to both better understand how a weapon or mechanism that uses gunpowder works and modify said kind of technology"
			},
			"performance" :{
				name : "Performance",
				description : "\n   I gain advantage on Performance and Sleight of Hand checks made to do tricks with guns"
			},
		},		
		
		"run red run" : {
			name : "Run Red Run",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   I gain a bonus to my initiative equal to my Charisma modifier, and I can take the Dash action" + "\n   " + "once during my first turn of combat (no action required)",
			action : ["action", "Dash (as part of first turn in combat)"],
			addMod : {type : "skill", field : "Init", mod : "Cha", text : "I add my Charisma modifier to my initiative rolls."},
		},
		
		"sights" : {
			name : "Sights",
			source : ["HB", 0],
			minlevel : 1,
			description : "\n   I can use an action to change my firearm's sight" + "\n   " + "Use the \"Choose Feature\" button above to select your current sight",
			action : ["action", "Change gun sight"],
			extraname : "Sights",
			extrachoices : ["Iron Sights", "No Sight", "Scope"],
			extraTimes: [1],
			"iron sights" : {
				name : "Iron Sights",
				description : "\n   My gun's default sight. Its properties are not altered"
				
			},
			
			"no sight" : {
				name : "No Sight",
				description: "\n   My gun’s normal and long ranges are reduced to 1/4, but I gain a +2 bonus to hit with any" +
				"\n   attack rolls I make with it",
				
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
				description: "\n   Both my gun’s normal and long ranges are doubled, and I ignore both 1/2 and 3/4 cover, but" +
				"\n   any ranged attack roll I make with it suffers a -2 penalty",
				
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
			
			autoSelectExtrachoices : [{
				extrachoice : 'iron sights',
			}]
		},
		
		"fortune favors the bold" : {
			name : "Fortune Favors the Bold",
			source : ["HB", 0],
			minlevel : 2,
			description : "\n   I gain a number of Luck Points equal to my proficiency bonus, and I regain all Luck Points after" + 
			"\n   a short or long rest. I gain Luck Strikes based on level, which cost Luck Points to use" +
			"\n   I can spend a single Luck Point after making a firearm attack to convert it to a critical hit, and" + 
			"\n   whenever I critically hit, I can choose to regain a Luck Point up to my maximum or" + 
			"\n   immediately apply the effect of a known Luck Strike instead of dealing critical damage" + 
			"\n   My known Luck Strikes per level are shown on the Gunslinger feature table, and currently" + 
			"\n   available Luck Strikes can be found in the third page notes",
			
			limfeaname : "Luck Points",
			usages : "Proficiency Bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "short rest",
	
			"ricochet" : {
				name : "Ricochet",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 2,
				description : " [1 Luck Point]" + desc("After missing a firearm attack, roll again to hit either the same target or a different one within" + 
				"\n   normal range. You must use this new roll. This attack ignores cover"),
			},
			"mightier than the sword" : {
				name : "Mightier than the Sword",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 2,
				description : " [1 Luck Point]" + desc("As a reaction when a Large or smaller enemy makes a non-firearm attack against myself or a" + 
				"\n   creature I can see within normal range, force them to reroll, taking the lower roll. Ranged" + 
				"\n   weapon attacks fail automatically"),
				action : ["reaction", ""],
			},
			"leg shot" : {
				name : "Leg Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 2,
				description : " [1 or more Luck Points]" + desc("Reduce the target\'s speed by 20ft for every Luck Point spent until the end of its next turn. If the" + 
				"\n   target has no movement speed left, it is knocked prone. Huge and larger creatures are immune" + 
				"\n   to this Luck Strike" + 
				"\n   This Luck Strike can be used as a reaction whenever an enemy moves within my normal range, in" + 
				"\n   which case a normal attack is made, and all Luck Points are wasted if I miss"),
				action : ["reaction", ""]
			},
			"dizzying shot" : {
				name : "Dizzying Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 3,
				description : " [1 Luck Point]" + desc("Target is unable to take reactions until the end of its next turn"),
			},
			"pushing shot" : {
				name : "Pushing Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 3,
				description : " [1 Luck Point]" + desc("The target of the firearm attack is pushed 10 ft away from me. Large creatures are moved only" + 
				"\n   5 ft, and Huge and larger creatures are immune to this Luck Strike"),
			},
			"piercing shot" : {
				name : "Piercing Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 6,
				description : " [1 Luck Point]" + desc("The attack now targets a number of enemies in a straight line behind the target equal to my" + 
				"\n   Charisma modifier. I use the same attack roll for each target, but make seperate damage rolls" + 
				"\n   I can grant an attack this benefit even if it misses the original target, and the bullet loses all force" + 
				"\n   after exiting my normal range"),
			},
			"counterbullet" : {
				name : "Counter-Bullet",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 7,
				description : " [2 Luck Points]" + desc("As a reaction to seeing an enemy cast a spell within my normal range, I can make an attack roll" + 
				"\n   to interrupt them. The target AC equals 10 + the spell's level" + 
				"\n   On a hit, the spell fails and has no effect, still consuming any resources required for it, and" + 
				"\n   leaving the enemy unharmed"),
				action : ["reaction", ""],
			},
			"exposing shot" : {
				name : "Exposing Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 7,
				description : " [2 or more Luck Points]" + desc("Until the start of my next turn, the target creature\'s AC is reduced by 2 points + 1 point per" + 
				"\n   additional Luck Point spent"),
			},
			"compelling shot" : {
				name : "Compelling Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 7,
				description : " [1 Luck Point]" + desc("The target creature has disadvantage on attack rolls and can't make opportunity attacks against" + 
				"\n   targets other than me" + 
				"\n   This effect lasts until the target creature is attacked or affected by a spell from someone other" + 
				"\n   than myself, or until I end my turn more than 60 ft away from it"),
			},
			"anti aerial shot" : {
				name : "Anti-Aerial Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 10,
				description : " [1 or more Luck Points]" + desc("If the airbone target creature gains flying speed via physical means, reduce their flying speed by" + 
				"\n   40 ft per Luck Point spent"),
			},
			"disarming shot" : {
				name : "Disarming Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 11,
				description : " [1 or more Luck Points]" + desc("Force the target to drop whatever item it is holding in one hand" + 
				"\n   Spend 1 Luck Point per extra hand to target with this Luck Strike" + 
				"\n   Huge and larger creatures are immune to this Luck Strike"),
			},
			"shield breaker" : {
				name : "Shield Breaker",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 14,
				description : " [1 Luck Point]" + desc("If the target is under the effect of the Shield spell (including one cast as a reaction to this attack)," + 
				"\n   ignore the AC bonus from the spell and immediately end it"),
			},
			
			"weakening shot" : {
				name : "Weakening Shot",
				extraname: "Luck Strike",
				source : ["HB", 0],
				minlevel : 17,
				description : " [1 Luck Point]" + desc("The target has disadvantage on the next saving throw it makes before the start of my next turn"),
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
				extrachoice : 'counterbullet',
				minlevel : 7,
			}, {
				extrachoice : 'exposing shot',
				minlevel : 7,
			}, {
				extrachoice : 'compelling shot',
				minlevel : 9,
			}, {
				extrachoice : 'anti aerial shot',
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
			description : "\n   As a bonus action, I can restore all of my missing Luck Points once per long rest",
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", "Lady Luck\'s Gift"]
		},
		
		"luck boon" : {
			name : "Luck Boon",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   As a reaction to a creature I can see within 60 ft making a saving throw or ability check, I can" + 
			"\n   spend 1 Luck Point to add my Charisma modifier to the total. I can do this after the roll has" + 
			"\n   been made, but before knowing if it was successful",
			action : ["reaction", "Luck Boon"],
		},
		
		"subclassfeature3" : {
			name : "Gunslinger Path",
			source : ["HB", 0],
			minlevel : 3,
			description : "\n   Choose the Gunslinger Path you have decided to walk to put in the \"Class\" field",
		},
		
		"deadeye" : {
			name : "Deadeye",
			source : ["HB", 0],
			minlevel : 5,
			description : "\n   I can expend two of my available Attacks to make a single one, adding my Charisma modifier" + 
			"\n   to the attack roll, and guaranteeing a critical hit if it lands on the target creature" + 
			"\n   I can only gain a Luck Point from this crit if the target has at least 10 hit points. If the attack" + 
			"\n   roll would normally be a critical strike, I can apply the effect of a Luck Strike for free",
			action : ["action", "Deadeye (uses two attacks)"],
		},
		
		"silver bullets" : {
			name : "Silver Bullets",
			source : ["HB", 0],
			minlevel : 6,
			description : "\n   My firearm attacks count as magical",
			
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
			description : "\n   Whenever I use the Luck Boon feature, myself and the affected ally gain double my proficiency" + 
			"\n   bonus in temporary hit points, increasing to three times at 13th level" + 
			"\n   I can also spend 1 Luck Point to grant the temporary hit points as a bonus action)",
			action : ["bonus action", "Superior Luck Boon (temp HP)"],
		},
		
		"animal friend" : {
			name : "Animal Friend",
			source : ["HB", 0],
			minlevel : 13,
			description : "\n   I gain advantage on all Animal Handling checks",
			skillstxt : "\n \n" + toUni("Animal Friend") + ": I gain advantage on all Animal Handling Checks.",
			advantages : [["Animal Handling", true]]
		},

		"no such thing as luck" : {
			name : "No Such Thing As Luck",
			source : ["HB", 0],
			minlevel : 14,
			description : "\n   I no longer suffer disadvantage on attacks against invisible or obscured targets",
		},		
		
		"guardian angel" : {
			name : "Guardian Angel",
			source : ["HB", 0],
			minlevel : 18,
			description : "\n   Whenever I roll a 1 on the d20, I treat it as a 20",
		},
		"master gunslinger" : {
			name : "Master Gunslinger",
			source : ["HB", 0],
			minlevel : 20,
			description : "\n   Whenever I make or land an attack, I can apply the effect of a Luck Strike for free",
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
				description : "\n   My firearm attacks critically strike on an attack roll of 19 or higher" + 
				"\n   Additionally, my firearm attacks no longer gain disadvantage against targets within 5 ft",
				
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
				description : "\n   As a bonus action, I can make a Charisma check to discern a target creature\'s alignment. The" + 
				"\n   DC is equal to 8 + the creature\'s deception modifier" + 
				"\n   On a success, I know the creature\'s alignment. On a failure, I know only whether it is Lawful," + 
				"\n   Neutral, or Chaotic",
				action : ["bonus action", "Body Reader"],
			},			
			"subclassfeature6" : {
				name : "Don\'t Fence Me In",
				source : ["HB", 0],
				minlevel : 6,
				description : "\n   I add my Charisma modifier to any Dexterity check or saving throw I make to prevent my" + 
				"\n   movement being impaired or taken from my control",
				savetxt : { 
					text : ["Add Cha mod to Dex checks or saves vs. having my movement impaired"]
				}
			},
			"subclassfeature6.1" : {
				name : "Make it Count",
				source : ["HB", 0],
				minlevel : 6,
				description : "\n   Whenever I am dropped to 0 hit points, I can instantly make an attack roll as a reaction" + 
				"\n   I can use this feature once per short rest",
				usages: 1,
				recovery : "short rest",
			},
			"subclassfeature11" : {
				name : "Swift Shooter",
				source : ["HB", 0],
				minlevel : 11,
				description : "\n   I gain one additional attack whenever I take the Attack action" + 
				"\n   Additionally, I no longer spend my reaction when using Luck Strikes that would otherwise" + 
				"\n   require it",
				attacks : levels.map(function(n){return n < 5 ? 1 : n < 11 ? 2 : 3}),
			},
			"subclassfeature15" : {
				name : "High Noon",
				source : ["HB", 0],
				minlevel : 15,
				description : "\n   I always act first in the first round of combat, and I can spend 2 Luck Points to take an" + 
				"\n   additional action in this first round"  + 
				"\n   If one or more other creatures have a similar feature, they all make a Sleight of Hand check," + 
				"\n   acting in ascending order of the results",
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
				description : "\n   Bring prone no longer imposes disadvantage on firearm attacks, and I ignore the Gunslinger" +
				"\n   scope\'s penalty to attack rolls if I am prone or have 3/4 cover from my target",
			},
			"subclassfeature3.1" : {
				name : "Quick Reload",
				source : ["HB", 0],
				minlevel : 3,
				description : "\n   I can reload my weapon as a bonus action so long as I haven't moved during that turn" + 
				"\n   I can also reload as part of the Dash action",
			},
			"subclassfeature6" : {
				name : "Cover Master",
				source : ["HB", 0],
				minlevel : 6,
				description : "\n   I gain an extra +1 to my AC and Dexterity saving throws from 1/2 and 3/4 cover",
			},
			"subclassfeature6.1" : {
				name : "Quiet",
				source : ["HB", 0],
				minlevel : 6,
				description : "\n   As a bonus action, I can reduce the noise from my next firearm attack. The shot will be heard" +
				"\n   from 15 ft away for rifles/shotguns, and 10 ft away for revolvers/pistols",
				action : ["bonus action", "Quiet"],
			},
			"subclassfeature11" : {
				name : "Hollow-Point Bullets",
				source : ["HB", 0],
				minlevel : 11,
				description : "\n   Whenever I deal extra damage from a critical hit, I roll my damage dice three times instead of" + 
				"\n   twice",
			},
			"subclassfeature11.1" : {
				name : "Elite Sniper",
				source : ["HB", 0],
				minlevel : 11,
				description : "\n   I add my Charisma modifier to the damage of firearm attacks that are made while my Sniper" + 
				"\n   feature is active",
			},
			"subclassfeature15" : {
				name : "Yuyan of the West",
				source : ["HB", 0],
				minlevel : 15,
				description : "\n   After using a Deadeye attack, but before making the attack roll, I can spend 2 Luck Points to" +
				"\n   guarantee a hit on my target, no matter its AC" + 
				"\n   Attacks made with this feature have unlimited range, so long as I have vision of the target",
				action : ["action", " [2 Luck Points] Yuyan of the West (as part of Deadeye)"],
			},
		}
	}
);

FeatsList["cqc expert"] = {
	name: "CQC Expert",
	source: [["HB", 0]],
	descriptionFull : "Prequisite: Desperado \nYou develop a new fighting style for close-quarter fights based around revolvers, gaining these benefits whenever you use one: \n \u2022 Attacks made against enemies within 5ft of you gain a bonus to their damage equal to your charisma modifier if the revolver is sightless. \n \u2022 You ignore half and 3/4 cover when attacking with a firearm within normal range. \n \u2022 During your turn, if you hit a creature with an attack, that creature can't make opportunity attacks against you for the rest of your turn.",
	description: "I gain bonus damage when attacking a target within 5 ft of me with a sightless revolver equal to my Charisma modifier. Additionally, I ignore 1/2 and 3/4 cover when attacking with a firearm within normal range, and if I hit a creature with an attack, it can't make opportunity attacks against me for the rest of my turn.",
	
	prereqeval : "classes.known.gunslinger.subclass === 'gunslinger-the desperado'"	
	//look at checking for sightless revolvers?
};

FeatsList["lucky shooter"] = {
	name: "Lucky Shooter",
	source: [["HB", 0]],
	descriptionFull : "You learn how to better implement luck in your fighting style, gaining these benefits: \n \u2022 Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a +5 bonus to the attack roll. If that attack hits, its damage takes a -10 penalty, to a minimum of 1 damage. \n \u2022 Your firearms' normal range is extended to be equal to their long range. \n \u2022 Your Luck Point maximum is increased by one and you gain one extra Luck Point whenever you roll for initiative, up to your maximum LP capacity. You only gain this benefit if you have the Fortune Favors the Bold feature.",
	description: "With a ranged weapon that I am proficient with, I can choose to take a +5 bonus on the attack roll, taking a -10 penalty to damage, to a minimum of 1 if the attack hits. Additionally, my firearm\'s normal ranges are now equal to their long range. If I have the Fortune Favours the Brave feature from the Gunslinger class, my Luck Point maximum is also increased by one, and I gain an extra Luck Point whenever I roll for initiative, up to my max",
	
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
	action : ["bonus action", "Throw Dynamite/Pack"],
};

FeatsList["twice as deadly"] = {
	name: "Twice as Deadly",
	source: [["HB", 0]],
	descriptionFull : "Prequisite: Desperado \nYou are now so skilled in using revolvers that you can wield and shoot two of them at the same time, gaining these benefits when you do so: \n \u2022 You can make twice as many attacks whenever you take the Attack action. When you use this ability you don't add your dexterity modifier to the attack rolls nor damage of those attacks, even if you instead make Deadeye attacks. \n \u2022 You can reload every revolver you are wielding, even if you have no free hands, as a bonus action. \n \u2022 In addition, you can now draw or stow two revolvers when you would normally be able to draw or stow only one. \nIn addition, you can now draw or stow two revolvers when you would normally be able to draw or stow only one.",
	description: "I can use this feat to make twice as many attacks when taking the Attack action, but I don't add my Dexterity modifier to the attack or damage rolls, even while making Deadeye attacks. I can reload every revolver I am wielding as a bonus action, and I can draw or stow two revolvers at once instead of one.",
	action : ["bonus action", "Reload all revolvers"],
	
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
