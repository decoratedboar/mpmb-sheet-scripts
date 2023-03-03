/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Source Book
	Effect:		This script adds a set of races, racial feats, and subclasses from the Player's Guide to Insectopia
				These homebrew creations were made by u/Grimley553, and can be found here:
					https://drive.google.com/file/d/145-Ldk6MthrPzhnSr4MvcOBCWb1yg0Fe/view
					
				Visit the Insectopia subreddit at https://www.reddit.com/r/Insectopia/
	Code by:	u/decoratedblood (decoratedboar)
	Date:		03-03-2023 (sheet v12.999)
*/

var iFileName = "Players Guide to Insectopia v1.3 - By Grimley553, transcribed by decoratedboar";
RequiredSheetVersion(12.999);

SourceList["IST"] = {
	name : "Player's Guide to Insectopia v1.3",
	abbreviation : "IST",
	abbreviationSpellsheet : "IST",
	group : "Reddit/r/Insectopia",
	url : "https://drive.google.com/file/d/145-Ldk6MthrPzhnSr4MvcOBCWb1yg0Fe/view",
	date : "06/02/2022"
};
//if any of the races below have parent races with common traits, and subraces that add more unique ones, they are coded seperately, but are all listed on the sheet under "[RACE NAME], [SUBRACE NAME]", e.g. "Formicoid, Frost Ant"
RaceList["akitu"] = { 
	regExpSearch : /^(?=.*akitu).*$/i,
	name : "Akitu", 
	source : ["IST", 3],
	plural : "Akitu",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 20, enc : 0 },
	},
	languageProfs : ["Common", "Insect-Common", "Sylvan", "Akituan"],
	scores : [0, 2, 0, 0, 0, 1],
	skills : ["Persuasion"],
	age : " mature very slowly. Their nymphs take up to 20 years to fully mature, but only a few of them ever reach ages beyond 45.",
	height : " reach heights of around 6 to 7 feet tall",
	heightMetric : " reach heights of around 1.8 to 2.1 meters tall",
	improvements : "Akitu: +2 Dexterity, +1 Charisma;",
	trait : "Akitu (+2 Dexterity, +1 Charisma)"+
		"\n \u2022 Flitterborn: My creature type is fey, rather than humanoid."+
		"\n \u2022 Fey Charm: I am proficient in the Charisma (Proficiency) skill. Additionally, I know the"+ 
		"\n Friends cantrip"+
		"\n \u2022 Flight: I have a flying speed of 20 feet, but I have to land at the end of every minute or begin"+
		"\n falling. At 5th level, this speed increases to 40 feet and the time restriction is removed."+
		"\n I cannot be wearing medium or heavy armor to use this flying speed.",
	spellcastingBonus : {
			name : "Fey Charm",
			spells : ["friends"],
			selection : ["friends"],
			firstCol : 'atwill',
		},
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 20);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Akitu: Flight");
	} //This code changes flight speed at 5th level. All the flying races in this book have this feature, so the code stays the same, with only the racespeed result changing.
};

RaceList["arach"] = { 
	regExpSearch : /^(?=.*arach).*$/i,
	name : "Arach", 
	source : ["IST", 4],
	plural : "Arachs",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		climb : { spd : 30, enc : 20},
	},
	languageProfs : ["Common", "Insect-Common", "Deep Speech"],
	scores : [0, 0, 1, 0, 0, 2],
	age : " mature around 20 years of age, and through their aberrant ancestry they can live up to 200 years.",
	height : " stand around 5 to 6 feet in height.",
	heightMetric : " stand around 1,5 to 1,8 meters in height.",
	improvements : "Arach: +2 Charisma, +1 Constitution;",
	trait : "Arach (+2 Charisma, +1 Constitution)"+
		"\n \u2022 Many Legs: I have advantage on saving throws against falling prone."+
		"\n \u2022 Spider Climb: I can climb on difficult surfaces, including upside-down, without needing to make an ability check."+
		"\n \u2022 Shy Step: I can cast the Misty Step spell once per short rest.",

	vision : [["Darkvision", 60]],
	savetxt : { adv_vs : ["being knocked prone"] },
	
	spellcastingBonus : {
		name : "Shy Step",
		spells : ["misty step"],
		selection : ["misty step"],
		firstCol : 'oncesr',
	},
	
};

RaceList["rhinoceros beetle"] = {
	regExpSearch : /^(?=.*(rhinoceros|rhino))(?=.*beetle).*$/i,
	name : "Rhinoceros Beetle",
	sortname : "Beetlefolk, Rhinoceros Beetle",
	source : ["IST", 7],
	plural : "Rhinoceros Beetles",
	size : [2, 3], 
	speed : { 
		walk : { spd : 25, enc : 15 },
		climb : { spd: "walk", enc: "walk" },
	},
	scores : [2, 0, 1, 0, 0, 0],
	age : " mature at the age of 25 and can live for up to 400 years.",
	languageProfs : ["Common", "Insect-Common", "Beetle"],	
	improvements : "Rhinoceros Beetle: +2 Strength, +1 Constitution;",
	trait : "Rhinoceros Beetle (+2 Strength, +1 Constitution)"+
		"\n \u2022 Chitin Plating: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when my"+
		"\n armour would leave me with an AC lower than 13."+
		"\n \u2022 Secondary Limbs: I have a pair of smaller arms below my primary pair. These secondary limbs"+
		"\n cannot wield shields or any weapons without the light property."+
		"\n \u2022 Horn: My unarmed strikes deal 1d6 + my Strength modifier in piercing damage."+
		"\n \u2022 Goring Rush: As a bonus action, I can move towards an enemy of my choice, and make a"+
		"\n melee attack with my horn as a free action if I end my movement within 5 feet of them.",
	
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /horn/i,
		name : "Horn",
		source : ["IST", 7],
		damage : [1, 6, "piercing"],
		abilitytodamage : true,
	},
	weaponsAdd : ["Horn"],
	features : {
		"goring rush" : {
			name : "Goring Rush",
			tooltip : " (Goring Rush)",
			action : ["bonus action", ""],
		},
	},
	
	
	skillstxt : "Choose one from Animal Handling, Athletics, Perception, or Intimidation",
	
	armorOptions : {
		regExpSearch : /^(?=.*chitin)(?=.*plating).*$/i,
		name : "Chitin Plating",
		source : [["HB", 0]],
		ac : 13,
	},
	armorAdd : "Chitin Plating",
};
RaceList["stag beetle"] = {
	regExpSearch : /^(?=.*stag)(?=.*beetle).*$/i,
	name : "Stag Beetle",
	sortname : "Beetlefolk, Stag Beetle",
	source : ["IST", 8],
	plural : "Stag Beetles",
	size : [2, 3], 
	speed : { 
		walk : { spd : 25, enc : 15 },
	},
	scores : [1, 0, 2, 0, 0, 0],
	age : " mature at the age of 25 and can live for up to 400 years.",
	languageProfs : ["Common", "Insect-Common", "Beetle"],	
	improvements : "Stag Beetle: +2 Constitution, +1 Strength;",
	trait : "Stag Beetle (+2 Constitution, +1 Strength)"+
		"\n \u2022 Chitin Plating: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when my"+
		"\n armour would leave me with an AC lower than 13."+
		"\n \u2022 Secondary Limbs: I have a pair of smaller arms below my primary pair. These secondary limbs"+
		"\n cannot wield shields or any weapons without the light property."+
		"\n \u2022 Hardy: Once per long rest as a bonus action, I can roll one of my hit die, spending it and"+
		"\n gaining the number rolled as hit points."+
		"\n \u2022 Powerful Pincers: I gain advantage on checks to grapple creatures, and prevent them from"+
		"\n escaping my grapple. Additionally, I count as one size larger for the purpose of grappling.",
	
	armorOptions : {
		regExpSearch : /^(?=.*chitin)(?=.*plating).*$/i,
		name : "Chitin Plating",
		source : [["HB", 0]],
		ac : 13
	},
	armorAdd : "Chitin Plating",
	
	skillstxt : "Choose one from Athletics, Insight, Performance, or Persuasion",
	
	features : {
		"hardy" : {
			name : "Hardy",
			limfeaname : "Hardy",
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", ""]
		},
	},
};
RaceList["harlequin beetle"] = {
	regExpSearch : /^(?=.*harlequin)(?=.*beetle).*$/i,
	name : "Harlequin Beetle",
	sortname : "Beetlefolk, Harlequin Beetle",
	source : ["IST", 6],
	plural : "Harlequin Beetles",
	size : [2, 3], 
	speed : { 
		walk : { spd : 25, enc : 15 },
		climb : { spd: "walk", enc: "walk" },
	},
	scores : [0, 2, 1, 0, 0, 0],
	age : " mature at the age of 25 and can live for up to 400 years.",
	languageProfs : ["Common", "Insect-Common", "Beetle"],	
	improvements : "Harlequin Beetle: +2 Dexterity, +1 Constitution;",
	trait : "Harlequin Beetle (+2 Dexterity, +1 Constitution)"+
		"\n \u2022 Chitin Plating: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when my"+
		"\n armour would leave me with an AC lower than 13."+
		"\n \u2022 Secondary Limbs: I have a pair of smaller arms below my primary pair. These secondary limbs"+
		"\n cannot wield shields or any weapons without the light property."+
		"\n \u2022 Slim Build: I can move through the space of any creature larger than me in size.",
		
	skillstxt : "Choose one from Acrobatics, Sleight of Hand, Stealth, or Survival",
	
	armorOptions : {
		regExpSearch : /^(?=.*chitin)(?=.*plating).*$/i,
		name : "Chitin Plating",
		source : [["HB", 0]],
		ac : 13
	},
	armorAdd : "Chitin Plating",
};
RaceList["firefly"] = {
	regExpSearch : /^(?=.*firefly).*$/i,
	name : "Firefly",
	sortname : "Beetlefolk, Firefly",
	source : ["IST", 6],
	plural : "Fireflies",
	size : [2, 3], 
	speed : { 
		walk : { spd : 25, enc : 15 },
	},
	scores : [0, 0, 1, 0, 2, 0],
	age : " mature at the age of 25 and can live for up to 400 years.",
	languageProfs : ["Common", "Insect-Common", "Beetle"],	
	improvements : "Firefly: +2 Wisdom, +1 Constitution;",
	trait : "Firefly (+2 Wisdom, +1 Constitution)"+
		"\n \u2022 Chitin Plating: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when my"+
		"\n armour would leave me with an AC lower than 13."+
		"\n \u2022 Secondary Limbs: I have a pair of smaller arms below my primary pair. These secondary limbs"+
		"\n cannot wield shields or any weapons without the light property."+
		"\n \u2022 Wings: I always land on my feet, and I don't take fall damage unless I've been knocked prone,"+
		"\n restrained, or run out of movement speed."+
		"\n \u2022 Flourescent Body: As a bonus action, I can shed bright light in a 20 foot radius around me,"+
		"\n and dim light for a further 20 feet."+
		"\n Also, once per long rest as an action, I can blind every creature within 5 feet of me until the end"+
		"\n of my next turn.",
	
	armorOptions : {
		regExpSearch : /^(?=.*chitin)(?=.*plating).*$/i,
		name : "Chitin Plating",
		source : [["HB", 0]],
		ac : 13
	},
	armorAdd : "Chitin Plating",
	
	skillstxt : "Choose one from Acrobatics, Perception, Nature, or Survival",
	features : {
		"flourescent body light" : {
			name : "Flourescent Body: Light",
			tooltip : " (Flourescent Body)",
			action : ["bonus action", ""],
		},
		"flourescent body flare" : {
			name : "Flourescent Body: Flare",
			usages : 1,
			recovery : "long rest",
			tooltip : " (Flourescent Body)",
			action : ["action", ""],
		},
	},
};
RaceList["scarab beetle"] = {
	regExpSearch : /^(?=.*scarab)(?=.*beetle).*$/i,
	name : "Scarab Beetle",
	sortname : "Beetlefolk, Scarab Beetle",
	source : ["IST", 8],
	plural : "Scarab Beetles",
	size : [2, 3], 
	speed : { 
		walk : { spd : 25, enc : 15 },
	},
	scores : [0, 0, 1, 2, 0, 0],
	age : " mature at the age of 25 and can live for up to 400 years.",
	languageProfs : ["Common", "Insect-Common", "Beetle"],	
	improvements : "Scarab Beetle: +2 Intelligence, +1 Constitution;",
	trait : "Scarab Beetle (+2 Intelligence, +1 Constitution)"+
		"\n \u2022 Chitin Plating: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when my"+
		"\n armour would leave me with an AC lower than 13."+
		"\n \u2022 Secondary Limbs: I have a pair of smaller arms below my primary pair. These secondary limbs"+
		"\n cannot wield shields or any weapons without the light property.",
	
	armorOptions : {
		regExpSearch : /^(?=.*chitin)(?=.*plating).*$/i,
		name : "Chitin Plating",
		source : [["HB", 0]],
		ac : 13
	},
	armorAdd : "Chitin Plating",
	
	skillstxt : "Choose one from Arcana, History, Nature, or Religion",
	toolProfs : [["Calligrapher's supplies, mason's tools, or tinkers tools", 1]],
	
	spellcastingBonus : {
			name : "Earth Shaper",
			spells : ["mold earth"],
			selection : ["mold earth"],
			firstCol : 'atwill',
		},
};
RaceList["ladybug"] = {
	regExpSearch : /^(?=.*ladybug).*$/i,
	name : "Ladybug",
	sortname : "Beetlefolk, Ladybug",
	source : ["IST", 7],
	plural : "Ladybugs",
	size : [2, 3], 
	speed : { 
		walk : { spd : 25, enc : 15 },
	},
	scores : [0, 0, 1, 0, 0, 2],
	age : " mature at the age of 25 and can live for up to 400 years.",
	languageProfs : ["Common", "Insect-Common", "Beetle"],	
	improvements : "Ladybug: +2 Charisma, +1 Constitution;",
	trait : "Firefly (+2 Charisma, +1 Constitution)"+
		"\n \u2022 Chitin Plating: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when my"+
		"\n armour would leave me with an AC lower than 13."+
		"\n \u2022 Secondary Limbs: I have a pair of smaller arms below my primary pair. These secondary limbs"+
		"\n cannot wield shields or any weapons without the light property."+
		"\n \u2022 Calming Touch: I know the Friends cantrip. When I reach 3rd level, I can cast the Charm"+
		"\n Person spell once per long rest, and when I reach 5th level, I can cast the Calm Emotions"+
		"\n spell once per long rest with this trait."+
		"\n \u2022 Soothing Buzz: At the end of a long rest, I regain all my spent hit dice.",
	
	armorOptions : {
		regExpSearch : /^(?=.*chitin)(?=.*plating).*$/i,
		name : "Chitin Plating",
		source : [["HB", 0]],
		ac : 13
	},
	armorAdd : "Chitin Plating",
	
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Calming Touch (level 1)",
		spells : ["friends"],
		selection : ["friends"],
		firstCol : 'atwill'
	},
	features : {
		"charm person" : {
			name : "Calming Touch (level 3)",
			limfeaname : "Charm Person",
			usages : 1,
			minlevel : 3,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Calming Touch (level 3)",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncelr',
			},
		},
		"calm emotions" : {
			name : "Calming Touch (level 3)",
			limfeaname : "Calm Emotions",
			usages : 1,
			minlevel : 5,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Calming Touch (level 5)",
				spells : ["calm emotions"],
				selection : ["calm emotions"],
				firstCol : 'oncelr',
			},
		},
	},
	
	skillstxt : "Choose one from Insight, Medicine, Performance, or Persuasion",
};

RaceList["chilopodian"] = { 
	regExpSearch : /^(?=.*chilopodian).*$/i,
	name : "Chilopodian", 
	source : ["IST", 9],
	plural : "Chilopodians",
	size : 3, 
	speed : { 
		walk : { spd : 35, enc : 25 },
		climb : { spd : 30, enc : 20},
	},
	languageProfs : ["Common", "Insect-Common", "Chilopian"],
	scores : [1, 0, 0, 0, 2, 0],
	age : " live long and meaningful lives. They mature at the age of 80 and live to be around 850 years old.",
	height : " can grow up to 8 feet long; However their upper body reaches only about 4 to 6 feet in height.",
	heightMetric : " can grow up to 2.4 meters long; However their upper body reaches only about 1.2 to 1.8 meters in height.",
	improvements : "Chilopodian: +2 Wisdom, +1 Strength;",
	trait : "Chilopodian (+2 Wisdom, +1 Strength)"+
		"\n \u2022 Many Legs: I have advantage on saving throws against falling prone, and count as one size"+
		"\n larger when determining carrying capacity."+
		"\n \u2022 Rear Up: As an action, I gain the effects of the Enlarge spell. I can't use my movement until I"+
		"\n take another action to remove the effects of this trait."+
		"\n \u2022 Constrict: I have advantage on grappling checks.",

	savetxt : { adv_vs : ["being knocked prone"] },
	skillstxt : "Proficiency with one skill.",
	carryingCapacity : 2,
	
	features : {
		"rear up" : {
			name : "Rear Up",
			tooltip : " (Rear Up)",
			action : ["action", ""],
		},
	}
};

RaceList["fire ant"] = { 
	regExpSearch : /^(?=.*(fire|flame|burning))(?=.*(ant|formicoid)).*$/i,
	name : "Fire Ant", 
	sortname : "Formicoid, Fire Ant",
	source : ["IST", 12],
	plural : "Fire Ants",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Formidian"],
	scores : [2, 0, 0, 0, 0, 1],
	age : " reach maturity quickly, reaching adulthood by the age of 10. They can live to be about 70 years old.",
	height : " are slender and tall. They range from slightly above 5 feet to slightly over 7 feet.",
	heightMetric : " are slender and tall. They range from slightly above 1.5 meters to slightly over 2.1 meters.",
	improvements : "Fire Ant: +2 Strength, +1 Charisma;",
	trait : "Fire Ant (+2 Strength, +1 Charisma)"+
		"\n \u2022 Ferocious Strength: Weapons that don't have the two-handed, versatile, or heavy property"+
		"\n have the light property for me."+
		"\n \u2022 Powerful Build: I count as one size larger when determining carrying capacity"+
		"\n \u2022 I know the Control Flames cantrip. When I reach 3rd level, I can cast Burning Hands as a"+
		"\n second level spell once per long rest, and at 5th level I can cast Scorching Ray once per long"+
		"\n rest with this trait.",

	vision : [["Darkvision", 60]],
	carryingCapacity : 2,
	
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (!/^(?=.*(handed|versatile|heavy|light)).*$/i.test(fields.Description)) {
					fields.Description += (fields.Description ? '; ' : '') + 'Light'
				}
			}],
	},
	
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Fiery Souls (level 1)",
		spells : ["control flames"],
		selection : ["control flames"],
		firstCol : 'atwill'
	},
	features : {
		"burning hands" : {
			name : "Fiery Souls (level 3)",
			limfeaname : "Burning Hands",
			usages : 1,
			minlevel : 3,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fiery Souls (level 3)",
				spells : ["burning hands"],
				selection : ["burning hands"],
				firstCol : 'oncelr',
			},
		},
		"scorching ray" : {
			name : "Fiery Souls (level 3)",
			limfeaname : "Scorching Ray",
			usages : 1,
			minlevel : 5,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Fiery Souls (level 5)",
				spells : ["scorching ray"],
				selection : ["scorching ray"],
				firstCol : 'oncelr',
			},
		},
	},
};
RaceList["frost ant"] = { 
	regExpSearch : /^(?=.*(frost|ice|frozen))(?=.*(ant|formicoid)).*$/i,
	name : "Frost Ant",
	sortname : "Formicoid, Frost Ant",	
	source : ["IST", 12],
	plural : "Frost Ants",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Formidian"],
	scores : [2, 0, 1, 0, 0, 0],
	age : " reach maturity quickly, reaching adulthood by the age of 10. They can live to be about 70 years old.",
	height : " are slender and tall. They range from slightly above 5 feet to slightly over 7 feet.",
	heightMetric : " are slender and tall. They range from slightly above 1.5 meters to slightly over 2.1 meters.",
	improvements : "Frost Ant: +2 Strength, +1 Charisma;",
	trait : "Frost Ant (+2 Strength, +1 Charisma)"+
		"\n \u2022 Ferocious Strength: Weapons that don't have the two-handed, versatile, or heavy property"+
		"\n have the light property for me."+
		"\n \u2022 Powerful Build: I count as one size larger when determining carrying capacity"+
		"\n \u2022 Crystal Carapace: My AC is 13 + my Dexterity modifier when I'm not wearing armor, or when"+
		"\n my armour would leave me with an AC lower than 13."+
		"\n Additionally, I have resistance to cold damage.",

	vision : [["Darkvision", 60]],
	carryingCapacity : 2,
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (!/^(?=.*(handed|versatile|heavy|light)).*$/i.test(fields.Description)) {
					fields.Description += (fields.Description ? '; ' : '') + 'Light'
				}
			}],
	},
	
	armorOptions : {
		regExpSearch : /^(?=.*crystal)(?=.*carapace).*$/i,
		name : "Crystal Carapace",
		source : [["HB", 0]],
		ac : 13
	},
	armorAdd : "Crystal Carapace",
	dmgres : ["Cold"],
};
RaceList["bull ant"] = { 
	regExpSearch : /^(?=.*bull)(?=.*(ant|formicoid)).*$/i,
	name : "Bull Ant",
	sortname : "Formicoid, Bull Ant",	
	source : ["IST", 11],
	plural : "Bull Ants",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		burrow : { spd : 20, enc : 20},
	},
	languageProfs : ["Common", "Insect-Common", "Formidian"],
	scores : [2, 0, 0, 1, 0, 0],
	age : " reach maturity quickly, reaching adulthood by the age of 10. They can live to be about 70 years old.",
	height : " are slender and tall. They range from slightly above 5 feet to slightly over 7 feet.",
	heightMetric : " are slender and tall. They range from slightly above 1.5 meters to slightly over 2.1 meters.",
	improvements : "Bull Ant: +2 Strength, +1 Intelligence;",
	trait : "Bull Ant (+2 Strength, +1 Intelligence)"+
		"\n \u2022 Ferocious Strength: Weapons that don't have the two-handed, versatile, or heavy property"+
		"\n have the light property for me."+
		"\n \u2022 Powerful Build: I count as one size larger when determining carrying capacity"+
		"\n \u2022 Accomplished Burrowers: I gain a burrowing speed of 20 feet, but only through dirt or"+
		"\n similarly dense substances."+
		"\n \u2022 Underground Architects: I gain proficiency with mason's tools."+
		"\n Additionally, I am considered proficient in the History skill whenever I make an Intelligence"+
		"\n (History) check related to underground structures, and add double my proficiency bonus to"+
		"\n such checks.",

	vision : [["Darkvision", 60]],
	carryingCapacity : 2,
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (!/^(?=.*(handed|versatile|heavy|light)).*$/i.test(fields.Description)) {
					fields.Description += (fields.Description ? '; ' : '') + 'Light'
				}
			}],
	},
	toolProfs : ["Mason's tools"],
};

RaceList["luni"] = { 
	regExpSearch : /^(?=.*luni).*$/i,
	name : "Luni",
	source : ["IST", 13],
	plural : "Luni",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 10, enc : 0 },
	},
	languageProfs : ["Common", "Insect-Common", "Lunian", 1],
	scores : [0, 0, 0, 2, 1, 0],
	age : " get very old. They mature at the age of 16, but live until the age of 900 years.",
	height : " are on the smaller side, being about 5 feet tall.",
	heightMetric : " are on the smaller side, being about 1.5 meters tall.",
	improvements : "Luni: +2 Intelligence, +1 Wisdom;",
	trait : "Luni (+2 Intelligence, +1 Wisdom)"+
		"\n \u2022 Flight: I have a flying speed of 10 feet, but I have to land at the end of every minute or begin"+
		"\n falling. At 5th level, this speed increases to 20 feet and the time restriction is removed."+
		"\n I cannot be wearing medium or heavy armor to use this flying speed."+
		"\n \u2022 Innate Spellcasting: I know the Dancing Lights cantrip. At 3rd level I can cast the Faerie Fire"+
		"\n spell once per long rest, and at 5th level I can case the Moonbeam spell once per long rest with"+
		"\n this trait.",
		
	vision : [["Darkvision", 60]],
	skillstxt : "Choose one from Arcana or Nature",
	
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 10);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Luni: Flight");
		},
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Innate Spellcasting (level 1)",
		spells : ["dancing lights"],
		selection : ["dancing lights"],
		firstCol : 'atwill'
	},
	features : {
		"faerie fire" : {
			name : "Innate Spellcasting (level 3)",
			limfeaname : "Faerie Fire",
			usages : 1,
			minlevel : 3,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Innate Spellcasting (level 3)",
				spells : ["faerie fire"],
				selection : ["faerie fire"],
				firstCol : 'oncelr',
			},
		},
		"calm emotions" : {
			name : "Innate Spellcasting (level 3)",
			limfeaname : "Moonbeam",
			usages : 1,
			minlevel : 5,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Innate Spellcasting (level 5)",
				spells : ["moonbeam"],
				selection : ["moonbeam"],
				firstCol : 'oncelr',
			},
		},
	},
};

RaceList["warrior mantis"] = { 
	regExpSearch : /^(?=.*(warrior|fighter|soldier|male))(?=.*mantis).*$/i,
	name : "Warrior Mantis",
	sortname : "Mantis, Warrior",
	source : ["IST", 15],
	plural : "Warrior Mantises",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Mantis"],
	scores : [1, 2, 0, 0, 0, 0],
	age : " , both male and female, reach adulthood roughly at the same time, at the age of 12. While male mantises often only reach the age of 70, females can become up to 150 years old.",
	height : " differ in height based on sex. Males are about 4 to 6 feet, whilst females are slightly bigger with 5 to 7 feet.",
	heightMetric : " differ in height based on sex. Males are about 1.2 to 1.8 meters, whilst females are slightly bigger with 1.5 to 2.1 meters.",
	improvements : "Warrior Mantis: +2 Dexterity, +1 Strength;",
	trait : "Warrior Mantis (+2 Dexterity, +1 Strength)"+
		"\n \u2022 Improved Jump: I can long jump a distance equal to my movement speed, and high jump up"+
		"\n to half my movement speed into the air."+
		"\n \u2022 Scythe Arms: My unarmed strikes deal 1d6 + my Strength or Dexterity modifier in"+
		"\n piercing damage. I can use either Strength or Dexterity for this weapon's attack rolls."+
		"\n \u2022 Mind Shielding: I have advantage on Intelligence Saving throws."+
		"\n \u2022 Silent Predators: I have advantage on Stealth checks when I'm standing still."+
		"\n \u2022 Reflexive Grapple: When I hit a creature with an opportunity attack, I can attempt to grapple it"+
		"\n instead of dealing damage.",
	
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^((?=.*scythe?)(?=.*arms)).*$/i,
		name : "Scythe Arms",
		source : ["IST", 14],
		damage : [1, 6, "piercing"],
		description : "Finesse",
		abilitytodamage : true,
	},
	weaponsAdd : ["Scythe Arms"],
	
	advantages : [
	["Intelligence", true],
	],
};
RaceList["orchid mantis"] = { 
	regExpSearch : /^(?=.*(orchid|flower|female))(?=.*mantis).*$/i,
	name : "Orchid Mantis",
	sortname : "Mantis, Orchid",
	source : ["IST", 15],
	plural : "Orchid Mantises",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Mantis"],
	scores : [0, 2, 0, 1, 0, 0],
	age : " , both male and female, reach adulthood roughly at the same time, at the age of 12. While male mantises often only reach the age of 70, females can become up to 150 years old.",
	height : " differ in height based on sex. Males are about 4 to 6 feet, whilst females are slightly bigger with 5 to 7 feet.",
	heightMetric : " differ in height based on sex. Males are about 1.2 to 1.8 meters, whilst females are slightly bigger with 1.5 to 2.1 meters.",
	improvements : "Orchid Mantis: +2 Dexterity, +1 Intelligence;",
	trait : "Orchid Mantis (+2 Dexterity, +1 Intelligence)"+
		"\n \u2022 Improved Jump: I can long jump a distance equal to my movement speed, and high jump up"+
		"\n to half my movement speed into the air."+
		"\n \u2022 Scythe Arms: My unarmed strikes deal 1d6 + my Strength or Dexterity modifier in"+
		"\n piercing damage."+
		"\n \u2022 Mind Shielding: I have advantage on Intelligence Saving throws."+
		"\n \u2022 Psionic Powers: I know the Mage Hand cantrip. At 3rd level I can cast the Charm Person"+
		"\n spell once per long rest, and at 5th level I can case the Detect Thoughts spell once per long"+
		"\n rest with this trait.",
	
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^((?=.*scythe?)(?=.*arms)).*$/i,
		name : "Scythe Arms",
		source : ["IST", 14],
		damage : [1, 6, "piercing"],
		description : "Finesse",
		abilitytodamage : true,
	},
	weaponsAdd : ["Scythe Arms"],
	
	advantages : [
		["Intelligence", true],
		],	
		
	spellcastingAbility : 4,
	spellcastingBonus : {
		name : "Psionic Powers (level 1)",
		spells : ["mage hand"],
		selection : ["mage hand"],
		firstCol : 'atwill'
	},
	features : {
		"charm person" : {
			name : "Psionic Powers (level 3)",
			limfeaname : "Charm Person",
			usages : 1,
			minlevel : 3,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Psionic Powers (level 3)",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncelr',
			},
		},
		"detect thoughts" : {
			name : "Psionic Powers (level 3)",
			limfeaname : "Detect Thoughts",
			usages : 1,
			minlevel : 5,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Psionic Powers (level 5)",
				spells : ["detect thoughts"],
				selection : ["detect thoughts"],
				firstCol : 'oncelr',
			},
		},
	},
};

RaceList["muscan"] = { 
	regExpSearch : /^(?=.*muscan).*$/i,
	name : "Muscan",
	source : ["IST", 16],
	plural : "Muscans",
	size : 4, 
	speed : { 
		walk : { spd : 25, enc : 15 },
		fly : { sped : 15, enc : 0 },
	},
	languageProfs : ["Common", "Insect-Common", "Muscan"],
	scores : [0, 0, 0, 0, 2, 1],
	age : " mature very quickly, reaching adulthood at the age of 7. They have however very short lifespans, the oldest of them being only 40 years old.",
	height : " are frail creatures and are between 3 and 4 feet tall.",
	heightMetric : " are frail creatures and are between 0.9 and 1.2 meters tall.",
	improvements : "Muscan: +2 Wisdom, +1 Charisma;",
	trait : "Muscan (+2 Wisdom, +1 Charisma)"+
		"\n \u2022 Flight: I have a flying speed of 20 feet, but I have to land at the end of every minute or begin"+
		"\n falling. At 5th level, this speed increases to 40 feet and the time restriction is removed."+
		"\n \u2022 Compound Eyes: I gain proficiency in Wisdom (Perception) checks that rely on sight."+
		"\n \u2022 Deathtouched: I can turn the hand of a small or medium humanoid into a Crawling Claw,"+
		"\n which lasts for 10 minutes. I can use this trait once per short rest.",
		
	savetxt : { adv_vs : ["poison"] },	
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 15);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Muscan: Flight");
	},
	
	features : {
		"Deathtouched" : {
		usages : 1,
		recovery: "short rest",
		tooltip : " (Deathtouched)",
		creaturesAdd : [["Crawling Claw"]],
		},
	},		

};

RaceList["necrite"] = { 
	regExpSearch : /^(?=.*necrite).*$/i,
	name : "Necrite",
	source : ["IST", 18],
	plural : "Necrites",
	size : 4, 
	speed : { 
		walk : { spd : 35, enc : 25 },
		burrow : { spd : 20, enc : 10 },
	},
	languageProfs : ["Common", "Insect-Common", "Necritan"],
	scores : [2, 1, 0, 0, 0, 0],
	age : " are many in numbers and age just as fast. They reach adulthood when they're 12 years old, but only a few of them are getting over the age of 60.",
	height : " are small but strong, standing around 3 to 4 feet in height.",
	heightMetric : " are small but strong, standing around 0.9 and 1.2 meters in height.",
	improvements : "Necrite: +2 Strength, +1 Dexterity;",
	trait : "Necrite (+2 Strength, +1 Dexterity)"+
		"\n \u2022 Natural Diggers: I have 20 feet of burrowing speed. I can breath normally while burrowed."+
		"\n \u2022 Bite: My unarmed strikes deal 1d4 + my Strength modifier in piercing damage."+
		"\n \u2022 Bloodlust: When I make a Bite attack, or reduce a creature to 0 hit points with an attack on my"+
		"\n turn, I can use a bonus action to move up to half my movement speed and make a melee"+
		"\n weapon or bite attack."+
		"\n \u2022 Iron Stomach: I am immune to ingested poisons and diseases. Additionally, I can sustain"+
		"\n myself with wood and plant fiber; one pound consumed is equal to one ration",
		
	weaponOptions : {
			baseWeapon : "unarmed strike",
			regExpSearch : /bite/i,
			name : "Bite",
			source : ["IST", 19],
			damage : [1, 4, "piercing"],
			abilitytodamage : true,
		},
		weaponsAdd : ["Bite"],		
	
	savetxt : { immune : ["ingested poisons and diseases"] },	

};

RaceList["glider roach"] = { 
	regExpSearch : /^(?=.*(glider|gliding))(?=.*(roach|cockroach)).*$/i,
	name : "Glider Roach",
	source : ["IST", 20],
	plural : "Roaches",
	sortname : "Roach, Mechanic Gliders",
	size : 4, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Roach"],
	scores : [0, 0, 2, 1, 0, 0],
	age : " mature very quickly, their nymphs are already able to walk after they spawn from their egg and mature completely when they are about 5 years old. Their lifespans range from 50 to 70 years.",
	height : " are small creatures and are only about 3 to 4 feet tall.",
	heightMetric : " are small creatures and are only about 0.9 and 1.2 meters tall.",
	improvements : "Roach: +2 Constitution, +1 Intelligence;",
	trait : "Roach (+2 Constitution, +1 Intelligence)"+
		"\n \u2022 Sunlight Sensitivity: I have disadvantage on attack rolls and Wisdom (Perception) checks when"+
		"\n I or whatever I am attacking/perceiving is direct sunlight."+
		"\n \u2022 Keen Survivors: I gain proficiency in the Wisdom (Survival) skill, and with Tinker's tools."+
		"\n \u2022 Relentless Endurance: Once per long rest, when reduced to 0 hit points, I can instead choose"+
		"\n to drop to 1."+
		"\n \u2022 Mechanic Augments - Glider: When I fall, and am not incapacitated, I can subtract up to 100"+
		"\n feet from the total fall damage, and move up to 2 feet horizontally for every foot fallen. At 5th"+
		"\n level, I gain 30 feet of flying speed while not wearing medium or heavy armor.",
	
	skills : ["Survival"],
	toolProfs : ["Tinker's tools"],
	vision : [["Darkvision", 120], ["Sunlight Sensitivity", 0]],
	
	features : {
		"Mechanic Glider" : {
			name : "Mechanic Glider",
			minlevel : 5,
			speed : { fly : { spd : 30, enc : 0 } }
		}
	}
};
RaceList["chitin roach"] = { 
	regExpSearch : /^(?=.*(chitin|armou?r|armou?red|metallic))(?=.*(roach|cockroach)).*$/i,
	name : "Chitin Roach",
	source : ["IST", 20],
	plural : "Roaches",
	sortname : "Roach, Metallic Chitin",
	size : 4, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Roach"],
	scores : [0, 0, 2, 1, 0, 0],
	age : " mature very quickly, their nymphs are already able to walk after they spawn from their egg and mature completely when they are about 5 years old. Their lifespans range from 50 to 70 years.",
	height : " are small creatures and are only about 3 to 4 feet tall.",
	heightMetric : " are small creatures and are only about 0.9 and 1.2 meters tall.",
	improvements : "Roach: +2 Constitution, +1 Intelligence;",
	trait : "Roach (+2 Constitution, +1 Intelligence)"+
		"\n \u2022 Sunlight Sensitivity: I have disadvantage on attack rolls and Wisdom (Perception) checks when"+
		"\n I or whatever I am attacking/perceiving is direct sunlight."+
		"\n \u2022 Keen Survivors: I gain proficiency in the Wisdom (Survival) skill, and with Tinker's tools."+
		"\n \u2022 Relentless Endurance: Once per long rest, when reduced to 0 hit points, I can instead choose"+
		"\n to drop to 1."+
		"\n \u2022 Mechanic Augments - Metallic Chitin: My AC is equal to 13 + my Dexterity modifier when I'm"+
		"\n not wearing armor, or when my armor would leave me with a lower AC. At 5th level, I gain"+
		"\n resistance to acid and poison damage.",
	
	skills : ["Survival"],
	toolProfs : ["Tinker's tools"],
	vision : [["Darkvision", 120], ["Sunlight Sensitivity", 0]],

	armorOptions : {
		regExpSearch : /^(?=.*(metal|metallic))(?=.*(chitin|armou?r)).*$/i,
		name : "Metallic Chitin",
		source : [["HB", 0]],
		ac : 13,
	},
	armorAdd : "Metallic Chitin",
	features : {
		"Metallic Chitin" : {
			name : "Metallic Chitin",
			minlevel : 5,
			dmgres : ["Acid", "Poison"],
		}
	}	
};
RaceList["respirator roach"] = { 
	regExpSearch : /^(?=.*(respirator|breather))(?=.*(roach|cockroach)).*$/i,
	name : "Respirator Roach",
	source : ["IST", 20],
	plural : "Roaches",
	sortname : "Roach, Respirator",
	size : 4, 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Roach"],
	scores : [0, 0, 2, 1, 0, 0],
	age : " mature very quickly, their nymphs are already able to walk after they spawn from their egg and mature completely when they are about 5 years old. Their lifespans range from 50 to 70 years.",
	height : " are small creatures and are only about 3 to 4 feet tall.",
	heightMetric : " are small creatures and are only about 0.9 and 1.2 meters tall.",
	improvements : "Roach: +2 Constitution, +1 Intelligence;",
	trait : "Roach (+2 Constitution, +1 Intelligence)"+
		"\n \u2022 Sunlight Sensitivity: I have disadvantage on attack rolls and Wisdom (Perception) checks when"+
		"\n I or whatever I am attacking/perceiving is direct sunlight."+
		"\n \u2022 Keen Survivors: I gain proficiency in the Wisdom (Survival) skill, and with Tinker's tools."+
		"\n \u2022 Relentless Endurance: Once per long rest, when reduced to 0 hit points, I can instead choose"+
		"\n to drop to 1."+
		"\n \u2022 Mechanic Augments - Respirator: Once per long rest, I gain the effects of the Water Breathing"+
		"\n spell for 1 hour. At 5th level, I have advantage on saving throws vs. harmful gasses and vapours.",
	
	skills : ["Survival"],
	toolProfs : ["Tinker's tools"],
	vision : [["Darkvision", 120], ["Sunlight Sensitivity", 0]],

	armorOptions : {
		regExpSearch : /^(?=.*(metal|metallic))(?=.*(chitin|armou?r)).*$/i,
		name : "Metallic Chitin",
		source : [["HB", 0]],
		ac : 13,
	},
	armorAdd : "Metallic Chitin",
	features : {
		"Respirator (Water Breathing)" : {
			name : "Water Breathing (1 hour)",
			limfeaname : "Water Breathing (1 hour)",
			usages : 1,
			recovery : "long rest",
		},
		"Respirator (5th level)" : {
			name : "Respirator (5th level)",
			minlevel : 5,
			savetxt : { adv_vs : ["harmful gasses and vapours"] },
		},
	},	
};

RaceList["scion"] = { 
	regExpSearch : /^(?=.*scion).*$/i,
	name : "Scion",
	source : ["IST", 22],
	plural : "Scions",
	size : 3, 
	speed : { 
		walk : { spd : 35, enc : 25 },
	},
	languageProfs : ["Common", "Insect-Common", "Scion"],
	scores : [0, 1, 0, 0, 2, 0],
	age : " reach adulthood around 15 and live up to 120 years.",
	height : " are tall creatures standing around 7 to 8 ft. tall. Your size is Medium.",
	heightMetric : " are tall creatures standing around 2.1 to 2.4 meters tall.",
	improvements : "Scion: +2 Wisdom, +1 Dexterity;",
	trait : "Scion (+2 Wisdom, +1 Dexterity)"+
		"\n \u2022 Deadly Pincers: I can use my pincers to make unarmed strikes, which deal 1d6 + my Strength"+
		"\n modifier in piercing damage."+
		"\n \u2022 Poisonous Stinger: I can also use my stinger to make unarmed strikes, which deal 1d4 + my"+
		"\n Strength modifier in piercing damage. Additionally, once per short rest after I hit a creature, I"+
		"\n can choose to deal 1d6 poison damage, and force the target to make a Constitution saving"+
		"\n throw with a DC equal to 8 + my Prof. Bonus + my Constitution modifier. On a failure the"+
		"\n target is poisoned for 1 minute, and it can repeat the saving throw at the end of each turn."+
		"\n \u2022 Guardian of the Threshold: I have advantage on Death saving throws.",
		
	weaponOptions : [{
			baseWeapon : "unarmed strike",
			regExpSearch : /pincers/i,
			name : "Pincers",
			source : ["IST", 22],
			damage : [1, 6, "piercing"],
			abilitytodamage : true,
		},{
			baseWeapon : "unarmed strike",
			regExpSearch : /stinger/i,
			name : "Stinger",
			source : ["IST", 22],
			damage : [1, 4, "piercing"],
			abilitytodamage : true,
		}],
		
	features : {
		"Poisonous Stinger" : {
			name : "Poisonous Stinger",
			tooltip : " (Poisonous Stinger)",
			usages : 1,
			recovery : "short rest", 
			action : ["action", " (after hitting creature)"],
		},
	},
	weaponsAdd : ["Pincers", "Stinger"],			
	savetxt : { text : ["Adv. on death saves"] },	

};

RaceList["cricket"] = { 
	regExpSearch : /^(?=.*cricket).*$/i,
	name : "Cricket",
	source : ["IST", 24],
	sortname : "Thoptra, Cricket",
	plural : "Crickets",
	size : [3, 4], 
	speed : { 
		walk : { spd : 30, enc : 20 },
	},
	languageProfs : ["Common", "Insect-Common", "Thoptran"],
	scores : [0, 1, 0, 0, 0, 2],
	age : " reach maturity at 16 years of age and usually live up to 80 years.",
	height : "' stocky build reaches only about 3 to 4 feet in height.",
	heightMetric : "'  stocky build reaches only about 0.9 to 1.2 meters in height.",
	improvements : "Cricket: +2 Charisma, +1 Dexterity;",
	trait : "Cricket (+2 Charisma, +1 Dexterity)"+
		"\n \u2022 Charming Musician: I know the Friends cantrip. When I reach 3rd level, I can cast the Charm"+
		"\n Person spell once per long rest, and when I reach 5th level, I can cast the Suggestion spell once"+
		"\n per long rest with this trait."+
		"\n \u2022 Mystical Stridulation: I can use sounds from my wings and legs as verbal spell components."+
		"\n \u2022 Standing Leap: I can long jump a distance equal to my movement speed, and high jump up"+
		"\n to half my movement speed into the air.",
	
	spellcastingAbility : 6,
	spellcastingBonus : {
		name : "Charming Musician (level 1)",
		spells : ["friends"],
		selection : ["friends"],
		firstCol : 'atwill'
	},
	features : {
		"charm person" : {
			name : "Charming Musician (level 3)",
			limfeaname : "Charm Person",
			usages : 1,
			minlevel : 3,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Charming Musician (level 3)",
				spells : ["charm person"],
				selection : ["charm person"],
				firstCol : 'oncelr',
			},
		},
		"suggestion" : {
			name : "Charming Musician (level 3)",
			limfeaname : "Calm Emotions",
			usages : 1,
			minlevel : 5,
			recovery : "long rest",
			spellcastingBonus : {
				name : "Charming Musician (level 5)",
				spells : ["suggestion"],
				selection : ["suggestion"],
				firstCol : 'oncelr',
			},
		},
	},
	
	skillstxt : "Choose one from Deception, Performance, or Persuasion",
};
RaceList["locust"] = { 
	regExpSearch : /^(?=.*locust).*$/i,
	name : "Locust",
	source : ["IST", 24],
	sortname : "Thoptra, Locust",
	plural : "Locusts",
	size : [3, 4], 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 10, enc : 0},
	},
	languageProfs : ["Common", "Insect-Common", "Thoptran"],
	scores : [0, 1, 2, 0, 0, 0],
	age : " reach maturity at 16 years of age and usually live up to 80 years.",
	height : "' lean bodies are between 4 to 6 feet tall.",
	heightMetric : "' lean bodies are between 1.2 to 1.8 meters tall.",
	improvements : "Locust: +2 Constitution, +1 Dexterity;",
	trait : "Locust (+2 Constitution, +1 Dexterity)"+
		"\n \u2022 Flight: I have a flying speed of 10 feet, but I have to land at the end of every minute or begin"+
		"\n falling. At 5th level, this speed increases to 20 feet and the time restriction is removed."+
		"\n I cannot be wearing medium or heavy armor to use this flying speed."+
		"\n \u2022 Swarm Tactics: I have advantage on attacks rolls when an ally that isn't incapacitated is within"+
		"\n 5 feet of my target."+
		"\n \u2022 Speech of Beast and Leaf: Beasts and plants can understand the meaning of my words, but I"+
		"\n can't understand them. I also have advantage on all Charisma checks to influence them.",
	
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 10);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Locust: Flight");
	},
	
	skillstxt : "Choose one from Animal Handling, Medicine, Nature, or Survival",
};

RaceList["bee"] = { 
	regExpSearch : /^(?=.*(bee|honeybee)).*$/i,
	name : "Bee",
	source : ["IST", 26],
	sortname : "Vespoid, Bee",
	plural : "Bees",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 15, enc : 0},
	},
	languageProfs : ["Common", "Insect-Common", "Vespoid"],
	scores : [0, 1, 0, 0, 0, 2],
	age : " mature at the age of 16 and tend to live up to 120 years of age.",
	height : " vary greatly in size and bulk, but are generally from 5 feet to 6 feet tall.",
	heightMetric : " vary greatly in size and bulk, but are generally from 1.5 to 1.8 meters tall.",
	improvements : "Bee: +2 Charisma, +1 Dexterity;",
	trait : "Bee (+2 Charisma, +1 Dexterity)"+
		"\n \u2022 Flight: I have a flying speed of 15 feet, but I have to land at the end of every minute or begin"+
		"\n falling. At 5th level, this speed increases to 30 feet and the time restriction is removed."+
		"\n I cannot be wearing medium or heavy armor to use this flying speed."+
		"\n \u2022 Vespoid Weapon Training: I have proficiency with rapiers, shortswords, longswords, and"+
		"\n shortbows."+
		"\n \u2022 Pheromonal Telepathy: Once per long rest, I can speak to a creature telepathically while it is"+
		"\n within 120 feet of me for 10 minutes."+
		"\n \u2022 Swarm Intelligence: As a reaction to an ally within 10 feet of me making a saving throw, I can"+
		"\n give them an additional d4 to the roll."+
		"\n \u2022 Soothing Honey: Once per short rest, as a bonus action, I can produce honey which can be"+
		"\n ingested to heal 1d4 + half my level (rounded up) hit points.",
	
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 15);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Vespoid: Flight");
	},
	skills : ["Intimidation"],
	weaponProfs : [false, false, ["rapier", "shortsword", "longsword", "shortbow"]],
	
	features : {
		"Pheromonal Telepathy" : {
			name : "Pheromonal Telepathy",
			limfeaname : "Pheromonal Telepathy",
			usages : 1,
			recovery : "long rest",
		},
		"Soothing Honey" : {
			name : "Soothing Honey",
			limfeaname : "Soothing Honey",
			usages : 1,
			recovery : "short rest",
		},
		"Swarm Intelligence" : {
			name : "Swarm Intelligence",
			action : ["reaction",""],
		},
	},
};
RaceList["bumble"] = { 
	regExpSearch : /^(?=.*(bumblebee|bumble)).*$/i,
	name : "Bumble",
	source : ["IST", 27],
	sortname : "Vespoid, Bumble",
	plural : "Bumbles",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 10, enc : 0},
	},
	languageProfs : ["Common", "Insect-Common", "Vespoid"],
	scores : [1, 0, 1, 0, 0, 1],
	age : " mature at the age of 16 and tend to live up to 120 years of age.",
	height : " are bigger than other Vespoids, ranging from 7 to 8 feet.",
	heightMetric : " are bigger than other Vespoids, ranging from 2.1 to 2.4 meters.",
	improvements : "Bumble: +1 Strength, +1 Constitution, +1 Charisma;",
	trait : "Bumble (+1 Strength, +1 Constitution, +1 Charisma)"+
		"\n \u2022 Slow Fliers: Bumbles are bulky, and as such I only have 10 feet of flying speed, which increases to 20 feet at 5th level. I have to land at the end of every minute or begin, unless I'm flying in a strong wind, in which case I don't"+
		"\n I cannot be wearing medium or heavy armor to use this flying speed."+
		"\n \u2022 Vespoid Weapon Training: I have proficiency with rapiers, shortswords, longswords, and"+
		"\n shortbows."+
		"\n \u2022 Powerful Build: I count as one size larger when determining carrying capacity."+
		"\n \u2022 Waxbuilders: I gain proficiency with one artisan's tools of my choice"+
		"\n \u2022 Bumble Bulk: My hit point max increase by 1, and by 1 again every time I gain a level.",
	
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 10);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Vespoid: Flight");
	},
	skills : ["Intimidation"],
	weaponProfs : [false, false, ["rapier", "shortsword", "longsword", "shortbow"]],

	toolProfs : [["Artisan's tools", 1]],	
	calcChanges : {
		hp : function (totalHD) { return [totalHD]; }
	}, //Adds +1 HP per level, including at level 1, meaning it fulfills any "1 additional HP +1 per level" properties.
	carryingCapacity : 2,
};
RaceList["wasp"] = { 
	regExpSearch : /^(?=.*wasp).*$/i,
	name : "Wasp",
	source : ["IST", 27],
	sortname : "Vespoid, Wasp",
	plural : "Wasps",
	size : 3, 
	speed : { 
		walk : { spd : 30, enc : 20 },
		fly : { spd : 15, enc : 0},
	},
	languageProfs : ["Common", "Insect-Common", "Vespoid"],
	scores : [0, 2, 0, 0, 0, 1],
	age : " mature at the age of 16 and tend to live up to 120 years of age.",
	height : " vary greatly in size and bulk, but are generally from 5 feet to 6 feet tall.",
	heightMetric : " vary greatly in size and bulk, but are generally from 1.5 to 1.8 meters tall.",
	improvements : "Bee: +2 Charisma, +1 Dexterity;",
	trait : "Bee (+2 Charisma, +1 Dexterity)"+
		"\n \u2022 Flight: I have a flying speed of 15 feet, but I have to land at the end of every minute or begin"+
		"\n falling. At 5th level, this speed increases to 30 feet and the time restriction is removed."+
		"\n I cannot be wearing medium or heavy armor to use this flying speed."+
		"\n \u2022 Vespoid Weapon Training: I have proficiency with rapiers, shortswords, longswords, and"+
		"\n shortbows."+
		"\n \u2022 Poison Adepts: I gain proficiency with the poisoner's kit."+
		"\n \u2022 Deadly Stinger: My unarmed strikes deal 1d6 + my Strength or Dexterity modifier in"+
		"\n piercing damage. I can use either Strength or Dexterity for this weapon's attack rolls."+
		"\n \u2022 Hidden Flight: I gain advantage on Dexterity (Stealth) checks made while flying.",
	
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 0 : 15);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Vespoid: Flight");
	},
	skills : ["Intimidation"],
	weaponProfs : [false, false, ["rapier", "shortsword", "longsword", "shortbow"]],
	
	toolProfs : ["Poisoner's kit"],
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^((?=.*deadly?)(?=.*stinger)).*$/i,
		name : "Deadly Stinger",
		source : ["IST", 27],
		damage : [1, 4, "piercing"],
		description : "Finesse",
		abilitytodamage : true,
	},
	weaponsAdd : ["Deadly Stinger"],
};


FeatsList["adamantine chitin"] = {
	name : "Adamantine Chitin",
	source : ["IST", 48],
	prerequisite : "Being a Stag Beetle",
	prereqeval : function(v) { return CurrentRace.known.indexOf('stag beetle') !== -1; },
	descriptionFull : "Your shell has become as strong as adamant, capable of withstanding even the mightiest of attacks. You gain the following benefits: \n \u2022 Increase your Constitution score by 1, up to a maximum of 20. \n \u2022 You gain a +1 bonus to AC. \n \u2022 When you suffer a critical hit, you can use your reaction to turn that attack into a normal hit. You can't use this feature again until you finish a short or long rest.",
	description : "I gain +1 AC, and once per short or long rest, when hit by a critical attack, I can use my reaction to convert it into a normal attack.[+1 Constitution]",
	scores : [0, 0, 1, 0, 0, 0],	
	usages : 1,
	recovery : "short rest",
	action : ["reaction", " (convert critical hit)"],
	extraAC : {
		mod : 1,
	},
};
FeatsList["ancient knowledge"] = {
	name : "Ancient Knowledge",
	source : ["IST", 48],
	prerequisite : "Being a Scarab Beetle",
	prereqeval : function(v) { return CurrentRace.known.indexOf('scarab beetle') !== -1; },
	descriptionFull : "You are especially studious and pick up new skills with ease. You gain the following benefits: \n \u2022 Increase your Intelligence score by 1, up to a maximum of 20. \n \u2022 You gain one skill proficiency of your choice, one tool proficiency of your choice, and fluency in one language of your choice. \n \u2022 Choose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus.",
	description : "I gain proficiency in one skill, one tool, and one language of my choice. [+1 Intelligence]",
	scores : [0, 0, 0, 1, 0, 0],	
	skillstxt : "Proficiency with one skill, and Expertise with one skill I'm proficient with",
	languageProfs : [1],
	toolProfs : [["Any tool", 1]]
};
FeatsList["blind spot"] = {
	name : "Blind Spot",
	source : ["IST", 48],
	prerequisite : "Being a Warrior Mantis",
	prereqeval : function(v) { return CurrentRace.known.indexOf('warrior mantis') !== -1; },
	descriptionFull : "You evolved some psionic capabilities, seldom seen in Warrior. You gain the following benefits: \n \u2022 Increase your Intelligence, Charisma, or Wisdom score by 1, up to a maximum of 20. \n \u2022 As an action, you can choose a creature within 30 feet of you to make an Intelligence saving throw (DC 8 + your proficiency bonus + your Intelligence, Wisdom, or Charisma modifier). On a failed save, the creature perceives you as if you were invisible for 1 minute. Should the creature have special senses which allow it to see invisible creatures, such as blindsight, you still appear invisible to it. If the creature takes damage from you, it can repeat the saving throw, ending the effect on a success. You have to finish a short or long rest before you can use this feature again.",
	description : "Once per short or long rest as an action, I can make a creature within 30 feet of me make an Intelligence saving throw (DC 8 + my Proficiency Bonus + my Intelligence). On a failed save, I appear invisible to it, even if it has blindsight. The creature can repeat the saving throw if it takes damage from me. [+1 Intelligence, Wisdom, or Charisma]",
	usages : 1,
	recovery : "short rest",
	action : ["action", ""],
	scorestxt : "+1 Intelligence, Wisdom, or Charisma",
};
FeatsList["burning blade"] = {
	name : "Burning Blade",
	source : ["IST", 49],
	prerequisite : "Being a Fire Ant",
	prereqeval : function(v) { return CurrentRace.known.indexOf('fire ant') !== -1; },
	descriptionFull : "You further master the destructive fire magic of your people. You gain the following benefits: \n \u2022 Increase your Strength, Dexterity, or Charisma score by 1, up to a maximum of 20. \n \u2022 You learn the flame blade spell, and can cast it once without expending a spell slot. You regain the ability to cast the spell in this way when you finish a long rest. Charisma is your spellcasting ability for the spell. \n \u2022 When making a melee spell attack with the flame blade you can use Strength or Dexterity modifiers for the attack roll. \n \u2022 When you roll fire damage for a spell you cast, you can reroll any roll of 1 on the fire damage dice, but you must use the new roll, even if it is another 1.",
	description : "I learn the Flame Blade spell, which I can cast without expending a spell slot once per long rest. When I make a melee spell attack with the Flame Blade spell, I can use both my Strength or Dexterity modifiers for the attack roll. \n When I am rolling for fire damage, I can reroll a roll of one on the dice, and must use the new roll. [+1 Strength, Dexterity, or Charisma]",
	scorestxt : "+1 Strength, Dexterity, or Charisma",
	spellcastingBonus : {
		name : "Once per long rest",
		spellcastingAbility : 6,
		spells : ["flame blade"],
		selection : ["flame blade"],
		firstCol : 'oncelr'
	},
};
FeatsList["crushing grip"] = {
	name : "Crushing Grip",
	source : ["IST", 49],
	prerequisite : "Being a Chilopodian",
	prereqeval : function(v) { return CurrentRace.known.indexOf('chilopodian') !== -1; },
	descriptionFull : "The power of your grapple is able to crush the bones of your enemies with ease. You gain the following benefits: \n \u2022 Increase your Strength, Dexterity, or Wisdom score by 1, up to a maximum of 20. \n \u2022 While reared up, you can grapple a creature while both of your hands are occupied, using your body to coil around the creature. When you are grappling a creature in this way and get down to your normal size, you let go of the creature and it is no longer grappled by you. \n \u2022 On the start of each of their turns, a creature grappled by you takes 1d4 bludgeoning damage.",
	description : "While reared up, I can grapple a creature while I have both hands occupied, letting them go when I return to my normal size. On the start of each of their turns, creatures I am grappling take 1d4 bludgeoning damage. [+1 Strength, Dexterity, or Wisdom]",
	scorestxt : "+1 Strength, Dexterity, or Wisdom",
};
FeatsList["cold refusal"] = {
	name : "Cold Refusal",
	source : ["IST", 49],
	prerequisite : "Being a Frost Ant",
	prereqeval : function(v) { return CurrentRace.known.indexOf('frost ant') !== -1; },
	descriptionFull : "Your crystal carapace is coated in frigid ice. You gain the following benefits: \n \u2022 Increase your Strength or Constitution score by 1, up to a maximum of 20. \n \u2022 You gain resistance to fire damage. \n \u2022 Cold, fire, and nonmagical slashing damage you take is reduced by 3. \n \u2022 At the end of a long rest, you gain temporary hit points equal to your level. If a creature hits you with a melee attack while you have these hit points, the creature takes cold damage equal to 5 x your proficiency bonus.",
	description : "I gain resistance to fire damage, and reduce the cold, fire, and nonmagical slashing damage I take by 3. At the end of a long rest, I gain temporary hit points equal to my level. When a creatures hits me with a melee attack while these temporary hit points are active, they take 5 times my Proficiency Bonus in cold damage. [+1 Strength or Constitution]",
	scorestxt : "+1 Strength, or Constitution",
	dmgres : ["Cold"],
	savetxt : { text : ["I reduce cold, fire, and nonmagic slashing damage by 3"] } //I might change/remove this. The saves disadv./adv. section is the one that I thought made the most sense though. 
};
FeatsList["death chirp"] = {
	name : "Death Chirp",
	source : ["IST", 49],
	prerequisite : "Being a Luni",
	prereqeval : function(v) { return CurrentRace.known.indexOf('luni') !== -1; },
	descriptionFull : "\u2022 Increase your Constitution score by 1, up to a maximum of 20. \n \u2022 You can use an action to emit a high pitched sound in a 15-foot radius around you. Each creature in that area must make a Constitution saving throw (DC = 8 + your Constitution modifier + your proficiency bonus). On a failed save, the creature takes 1d8 thunder damage, loses concentration on a spell it is currently concentrating on and is deafened until the end of its next turn. On a successful save, the creature only takes half as much damage, is not deafened, and doesn't immediately lose concentration on a spell it is currently concentrating on. This damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d10). \n \u2022 You can use your Death Chirp a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
	description : "As an action, a number of times per long rest equal to my Proficiency Bonus, I can make each creature within a 15 foot radius of me make a Constitution saving throw (DC 8 + my Constitution modifier + my Proficiency Bonus). On a failed save, a creature takes 1d8 thunder damage (increasing to 2d8 at 5th level, 3d8 at 11th, and 4d10 at 17th), loses spell concentration, and is deafened until the end of its next turn. Otherwise, the creature only takes half damage, and suffers no other effects. [+1 Constitution]",
	scores : [0, 0, 1, 0, 0, 0],	
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest", 
	action : ["action", ""],
};
FeatsList["descendant of the damned"] = {
	name : "Descendant of the Damned",
	source : ["IST", 50],
	prerequisite : "Being a Scion",
	prereqeval : function(v) { return CurrentRace.known.indexOf('scion') !== -1; },
	descriptionFull : "Wandering the sands of your ancestors and viewing the deaths of many, your Scion blood sings the songs of those beyond. You gain the following benefits: \n \u2022 Increase your Strength, Dexterity, or Wisdom score by 1, up to a maximum of 20. \n \u2022 Your unarmed strikes made with your natural weapons count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. \n \u2022 When you roll piercing damage for an attack made with your natural weapons, you can add halve your proficiency bonus (rounded up) to the damage dealt. \n \u2022 You gain resistance to necrotic damage.",
	description : "Unarmed strikes with my natural weapons count as magical. When I roll piercing damage for an attack with my natural weapons, I add half my proficiency bonus to the damage dealt. I also gain resistance to necrotic damage. [+1 Strength, Dexterity, or Wisdom]",
	scorestxt : "+1 Strength, Dexterity or Wisdom",
	dmgres : ["Cold"],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (((/stinger/i).test(v.WeaponTextName)) || ((/pincers/i).test(v.WeaponTextName))) {
					fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical; +' + (How('Proficiency Bonus') / 2) + ' when rolling piercing damage';
				};
			},
			"If I include the word 'Sound' in a weapon or magic weapon's name, it gets treated as my Sound Weapon.",
		]//checks for the stinger or pincers weapons from the scion race, and adds "Counts as magical", and the extra half-prof. bonus damage to the description.
	}
};
FeatsList["experienced healer"] = {
	name : "Experienced Healer",
	source : ["IST", 50],
	prerequisite : "Being a Ladybug",
	prereqeval : function(v) { return CurrentRace.known.indexOf('ladybug') !== -1; },
	descriptionFull : "You are a master of the physician's art, you gain the following benefits: \n \u2022 Increase your Charisma score by 1, up to a maximum of 20. \n \u2022 You gain proficiency in the Medicine skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it. \n \u2022 During a short rest, you can clean and bind the wounds of your allies. If a creature spends a number of Hit Die during this rest, you can make a Wisdom (Medicine) check against a DC equal to 8 + the number of Hit Dice spend by the creature. On a success, the creature regains all spend Hit Dice. You can tend to a number of creatures equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
	description : "I gain proficiency in the Medicine skill, or expertise if I'm already proficient. During a short rest, if a creature spends any hit dice, I can make a Wisdom (Medicine) check against a DC equal to 8 + the number of hit dice expended by the creature. On a success, the creature regains all spent hit die. I can do this for a number of creatures equal to my proficiency bonus per long rest. [+1 Charisma]",
	skills : [["Medicine", "increment"]],
	scores : [0, 0, 0, 0, 0, 1],
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest",
};
FeatsList["glimmering magic"] = {
	name : "Glimmering Magic",
	source : ["IST", 50],
	prerequisite : "Being an Akitu",
	prereqeval : function(v) { return CurrentRace.known.indexOf('akitu') !== -1; },
	descriptionFull : "You acquire knowledge of the magic of the mystical Flittermarsh, granted through the Archfey patron of your tribe. \n \u2022 You learn the faerie fire spell and can cast it at will, without expending a spell slot. \n \u2022 You also learn phantasmal force and blink, each of which you can cast once without expending a spell slot. You regain the ability to cast those two spells in this way when you finish a long rest. \n \u2022 Charisma is your spellcasting ability for all three spells.",
	description : "I learn the Faerie Fire spell, and can cast it at will. I also learn the Phantasmal Force and Blink spells, which I can cast without expending a spell once per long rest. Charisma is my spellcasting ability for these.",
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 6,
		spells : ["faerie fire"],
		selection : ["faerie fire"],
		firstCol : 'atwill'
	}, {
		name : "Once per long rest",
		spells : ["phantasmal force"],
		selection : ["phantasmal force"],
		firstCol : 'oncelr'
	}, {
		name : "Once per long rest",
		spells : ["blink"],
		selection : ["blink"],
		firstCol : 'oncelr'
	}]
};
FeatsList["hard to kill"] = {
	name : "Hard to Kill",
	source : ["IST", 50],
	prerequisite : "Being a Roach",
	prereqeval : function(v) { return CurrentRace.known.indexOf('roach') !== -1; },
	descriptionFull : "As a Roach you've survived through most of the hardships the world could throw at you, becoming even harder to kill. You gain the following benefits: \n \u2022 Increase your Constitution or Intelligence score by 1, up to a maximum of 20. \n \u2022 When you succeed on three death saving throws or roll a natural 20 on your death saving throw, you regain 1 hit point and become conscious. You also gain the benefits of the Dodge action until the start of your next turn. \n \u2022 When you fail a death saving throw, you can choose to reroll the saving throw. You must use the new roll. Once you use this feature you can't do so again until you finish a long rest.",
	description : "I gain 1 hit point, become conscious, and gain the benefits of the Dodge action until the start of my next turn upon succeeding on, or rolling a natural 20 on three death saving throws. Additionally, once per long rest I can reroll a failed death saving throw, and must use the new roll. [+1 Constitution or Intelligence].",
	savetxt : { text : ["Gain 1 HP, consciousness, and Dodge action until the start of my next turn on three sucessful death saves, or a nat. 20 on one."] },
	scorestxt : "+1 Constitution or Intelligence",
	limfeaname : "Reroll failed Death Save",
	usages : 1,
	recovery: "long rest",
	action : ["action", ""],
};
FeatsList["inspiring musician"] = {
	name : "Inspiring Musician",
	source : ["IST", 50],
	prerequisite : "Being a Cricket",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('cricket') !== -1; },
	descriptionFull : "Even the music you play hums the tune of enchantments. You gain the following benefits: \n \u2022 Increase your Dexterity or Charisma score by 1, up to a maximum of 20. \n \u2022 You gain proficiency in the Performance skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it. \n \u2022 Your legs and wings count as musical instruments. When you make an ability check to play music with them, you are considered proficient with them. \n \u2022 You can spend 10 minutes playing a mystical tune for your companions, bolstering their morale for the next fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you. Once until it finishes a short or long rest, when the creature makes an attack roll, ability check, or saving throw, it can roll a d6 and add the number rolled to the roll. A creature can't benefit from this feat again until it has finished a short or long rest.",
	description : "I gain proficiency in the Performance skill, or expertise if I'm already proficient. Additionall, my legs and wings count as musical instruments, and I am proficienct with them. \n I can spend 10 minutes playing a song, choosing up to six friendly creatures within 30 feet of me (including myself). Until the creature's next short or long rest, it can add a d6 to a single attack roll, saving throw or ability check it makes. Creatures can benefit from this once per short or long rest. [+1 Dexterity or Charisma].",
	skills : [["Performance", "increment"]],
	scorestxt : "+1 Dexterity or Charisma",
	action : ["action", " (10 mins)"],//I can't really code in a limited feature here, since it isn't one, strictly speaking. This could be worth changing but I think it's fine just to list it as an action on the sheet, for the sake of having there  outside of the feat entry.
};
FeatsList["mark of the wurm"] = {
	name : "Mark of the Wurm",
	source : ["IST", 50],
	prerequisite : "Being a Muscan",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('muscan') !== -1; },
	descriptionFull : "You have been touched by the dark god itself, giving you the ability to cast more of its destructive magic. \n \u2022 You learn the toll the dead spell and can cast it at will. \n \u2022 You also learn bane and ray of enfeeblement, each of which you can cast once without expending a spell slot. You regain the ability to cast those two spells in this way when you finish a long rest. \n \u2022 Charisma is your spellcasting ability for all three spells.",
	description : "I learn the Toll The Dead spell, and can cast it at will. I also learn the Bane and Ray Of Enfeeblement spells, which I can cast without expending a spell once per long rest. Charisma is my spellcasting ability for these.",
	spellcastingBonus : [{
		name : "At will",
		spellcastingAbility : 6,
		spells : ["toll the dead"],
		selection : ["toll the dead"],
		firstCol : 'atwill'
	}, {
		name : "Once per long rest",
		spells : ["bane"],
		selection : ["bane"],
		firstCol : 'oncelr'
	}, {
		name : "Once per long rest",
		spells : ["ray of enfeeblement"],
		selection : ["ray of enfeeblement"],
		firstCol : 'oncelr'
	}]
};
FeatsList["master waxcrafter"] = {
	name : "Master Waxcrafter",
	source : ["IST", 50],
	prerequisite : "Being a Bumble",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('bumble') !== -1; },
	descriptionFull : "Bumbles are masters of sculpting and using wax in all sorts of different ways. You gain the following benefits: \n \u2022 Increase your Strength, Constitution, or Charisma score by 1, up to a maximum of 20. \n \u2022 You gain proficiency with the Forgery kit. Whenever you finish a short or long rest, you gain 1 clump of wax. You can create additional clumps of wax by spending 1 gp and 1 hour of uninterrupted work. \n \u2022 Additionally, you can use 1 clump of wax and apply it to yourself or another creature. As an action you can apply the wax to one creature of your choice upon which the wax is consumed. The creature gains resistance to cold and lightning damage for one hour.",
	description : "I gain proficiency with the Forgery Kit. Whenever I finish a short or long rest, I gain 1 clump of wax. I can also create clumps of wax by spending 1 hour and 1 gp each. As an action I can apply a clump of wax to myself or another creature, consuming the clump and giving the target creature cold and lightning damage for 1 hour. [+1 Strength, Constitution, or Charisma]",
	toolProfs : ["Forgery Kit"],
	scorestxt : "+1 Strength, Constitution, or Charisma",
	action : ["action", " (apply wax)"],//I don't really think I need to code anything more for this wrt limited features, etc.
};
FeatsList["mind\'s eye"] = {
	name : "Mind\'s Eye",
	source : ["IST", 51],
	prerequisite : "Being an Orchid Mantis",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('orchid mantis') !== -1; },
	descriptionFull : "Your psionic powers grow ever stronger as your mind is expanding. You gain the following benefits: \n \u2022 Increase your Dexterity, Intelligence, or Wisdom score by 1, up to a maximum of 20. \n \u2022 When you cast the mage hand cantrip using your psionic powers trait, the hand is invisible. \n \u2022 You gain expertise in the Wisdom (Insight) skill, which means your proficiency bonus is doubled for any ability check you make with it. If you aren't already proficient in the Wisdom (Insight) skill, you gain proficiency with it. Should the skill already benefit from a feature that doubles your proficiency bonus, such as Expertise, your proficiency bonus is only doubled once. \n \u2022 The spells you cast through your psionic powers trait require no verbal or somatic components.",
	description : "I gain proficiency in the Insight skill, or expertise if I'm already proficient. When I cast the Mage Hand cantrip using my Psionic Powers racial trait, the hand is invisible. Additionally, any spells I cast with this same racial trait require no verbal or somatic components. [+1 Dexterity, Intelligence, or Wisdom]",
	scorestxt : "+1 Dexterity, Intelligence, or Wisdom",
	skills : [["Insight", "increment"]],
	calcChanges : {
		spellAdd : [
			function (spellKey, spellObj, spName, isDuplicate) {
				if (spellObj.description === SpellsList["mage hand"].description) {
					spellObj.description = "Create invisible spectral hand for simple tasks or carry up to 10 lb; 1 a to control; can't have multiple"; spellObj.components = ""};
				if (spellObj.description === SpellsList["charm person"].description) {
					spellObj.components = "M"};
				if (spellObj.description === SpellsList["detect thoughts"].description) {
					spellObj.components = "M"};
			},
			"When I cast the Mage Hand cantrip using my Psionic Powers racial trait, the hand is invisible. Additionally, any spells I cast with this same racial trait require no verbal or somatic components."//this code updates spell components. SpellChanges doesn't work here, since the spell comes from the racial traits, not the feat itself (I think).
		],
	},
};
FeatsList["mystic evasion"] = {
	name : "Mystic Evasion",
	source : ["IST", 51],
	prerequisite : "Being an Akitu",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('akitu') !== -1; },
	descriptionFull : "The glimmering veil of the Flittermarsh quickens your flight and misdirects attackers. You gain the following benefits: \n \u2022 Increase your Dexterity score by 1, up to a maximum of 20. \n \u2022 You gain advantage on saving throws against falling prone while flying. \n \u2022 When a creature you can see hits you with a ranged attack while flying, you can use your reaction to gain a bonus to AC against that attack, potentially causing it to miss you. The bonus is equal to your Proficiency bonus. You can't use this feature again until you finish a short or long rest.",
	description : "I gain advantage on saving throws against falling prone while flying. Once per short or long rest, as a reaction to a creature I can see hitting me with a ranged attack while I'm flying, I can add my proficiency bonus to my AC against that attack, potentially causing it to miss. [+1 Dexterity]", 	
	scores : [0, 1, 0, 0, 0, 0],
	savetxt : { adv_vs : ["falling prone while flying"] },	
	action : ["reaction", " (+Prof to AC if attacked while flying"],
	usages : 1,
	recovery : "short rest",
	//I feel like there's probably a way of pulling the proficiency bonus and displaying it somewhere on the feat entry or the action, but I'm coming up blank at the time of writing. It's pretty easy to remember in any case so eh
};
FeatsList["perfect hunter"] = {
	name : "Perfect Hunter",
	source : ["IST", 51],
	prerequisite : "Being a Locust",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('locust') !== -1; },
	descriptionFull : "Increase your Dexterity, Constitution, or Wisdom score by 1, up to a maximum of 20. \n \u2022 You gain proficiency the Survival skill. If you are already proficient in the skill, you add double your proficiency bonus to checks you make with it. \n \u2022 You learn the hunter’s mark spell. You can cast it a number of times equal to your Proficiency bonus without expending a spell slot and regain all expanded uses after you finish a long rest.",
	description : "I gain proficiency in the Survival skill, or expertise if I'm already proficient. I learn the Hunter's Mark spell, and can cast it a number of times equal to my proficiency bonus per long rest without expending a spell slot. [+1 Dexterity, Constitution, or Wisdom]", 	
	scorestxt : "+1 Dexterity, Constitution, or Wisdom",
	skills : [["Survival", "increment"]],
	
	limfeaname : "Hunter's Mark",
	usages : "Proficiency bonus per ",
	usagescalc : "event.value = How('Proficiency Bonus');",
	recovery : "long rest",
	spellcastingBonus : {
		name : "Perfect Hunter",
		spells : ["hunter's mark"],
		selection : ["hunter's mark"],
		firstCol : 'Prof', //A bit jank, but given this is prof bonus per LR rather than straight Once per LR, adding the limited feature as well is necessary imo.
	},
};
FeatsList["reach"] = {
	name : "Reach",
	source : ["IST", 51],
	prerequisite : "Being a Harlequin Beetle",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('harlequin') !== -1; },
	descriptionFull : "You are impressively long-limbed. You gain the following benefits: \n \u2022 Increase your Dexterity score by 1, up to a maximum of 20. \n \u2022 When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.",
	description : "My melee attacks gain 5 feet of reach. [+1 Dexterity]", 	
	scores : [0, 1, 0, 0, 0, 0],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon) {
					fields.Description += ((fields.Description ? '; ' : '') + 'Reach (+5 ft.)');
				};
			},
		]
	}
	
};
FeatsList["royal authority"] = {
	name : "Royal Authority",
	source : ["IST", 51],
	prerequisite : "Being a Bee",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('bee') !== -1; },
	descriptionFull : "You are a leader by nature and your voice and stature makes that clear to everyone. You gain the following benefits: \n \u2022 Increase your Dexterity, Wisdom, or Charisma score by 1, up to a maximum of 20. \n \u2022 Your proficiency bonus is doubled for any check you make with the Charisma (Intimidation) skill. \n \u2022 As an action, you can let your voice boon to confirm your superiority. Each creature of your choice within 30 ft. of you has to make a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier). On a failed save, a creature becomes frightened of you for 1 minute. If the frightened target takes any damage, it can repeat the saving throw, ending the effect on itself on a success. You can't use this feature again until you finish a short or long rest.",
	description : "I gain expertise in the Intimidation skill. Additionally, once per short or long rest as an action, I can make each creature of my choice within 30 ft. of me make a Charisma saving throw (DC 8 + my prof. bonus + my Charisma mod.). On a failed save, a creature is frightened, and can repeat the saving throw every time it takes damage. [+1 Dexterity, Wisdom, or Charisma]", 	
	scorestxt : "+1 Dexterity, Wisdom, or Charisma",
	skills : [["Intimidation", "full"]], //Double prof. bonus to all checks is effectively expertise. I add it without incrementing because the feat doesn't specify gaining proficiency if the player isn't already.
	
	usages : 1,
	recovery : "short rest",
	action : ["action", ""],
};
FeatsList["shining star"] = {
	name : "Shining Star",
	source : ["IST", 52],
	prerequisite : "Being a Firefly",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('firefly') !== -1; },
	descriptionFull : "Your intuition always leads you safely back home. You gain the following benefits: \n \u2022 Increase your Wisdom score by 1, up to a maximum of 20. \n \u2022 Traveling at a fast pace doesn't impose the normal -5 penalty on your passive Wisdom (Perception) score. \n \u2022 You can create a guiding light that leads you to your destination. If you concentrate on a location you have been to on the same plane of existence, you can create a floating globe of light that leads you along the most direct physical path to the specified location. The light can't lead you to a destination on another plane of existence, a destination that moves, or a destination you haven't personally been at. You have to concentrate on the light as if it were a spell and it vanishes after 1 day or if you lose concentration. You can't use this feature again until you finish a short or long rest.",
	description : "Once per short or long rest, I can concentrate (as if it were a spell) on summoning a floating orb of light to guide me to a place I have previously been that is static and on the same dimensional plane as me. The light disappears after 1 day, or if I lose concentration on it. Additionally, travelling at a fast pace doesn't reduce my Passive Perception. [+1 Wisdom]", 	
	scores : [0, 0, 0, 0, 1, 0],
	
	usages : 1,
	recovery : "short rest", //feat doeasn't list an action, so no action for this /shrug
};
FeatsList["spellweaver"] = {
	name : "Spellweaver",
	source : ["IST", 52],
	prerequisite : "Being an Arach",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('arach') !== -1; },
	descriptionFull : "Further delving into your aberrant heritage, you have grown in your mastery of their alien magic. You gain the following benefits: \n \u2022 Increase your Charisma score by 1, up to a maximum of 20. \n \u2022 You can use your legs to perform the somatic components of a spell. If you are restrained you are unable to use this feature. \n \u2022 You learn 1 cantrip from the Warlock spell list. Charisma is your spellcasting ability for this spell. \n \u2022 You know the web spell and Charisma is your spellcasting modifier for it. Once you cast this spell through this feature, you need to finish a long rest before you can do so again.",
	description : "I can perform somatic spell components with my legs while unrestrained. I also learn one cantrip from the Warlock spell list, and can cast the Web spell once per long rest without expending a spell slot. [+1 Charisma]", 	
	scores : [0, 0, 1, 0, 0, 0],
	spellcastingAbility : 6,
	spellcastingBonus : [{
		name : "Spellweaver Cantrip",
		"class" : "warlock",
		level : [0, 0],
		firstCol : 'atwill'
	}, {
		name : "Spellweaver Web",
		spells : ["web"],
		selection : ["web"],
		firstCol : 'oncelr'

	}],
};
FeatsList["teamwork"] = {
	name : "Teamwork",
	source : ["IST", 52],
	prerequisite : "Being a Bull Ant",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('bull ant') !== -1; },
	descriptionFull : "You excel at lending your allies a helping hand. You gain the following benefits: \n \u2022 Increase your Strength, Constitution, or Intelligence score by 1, up to a maximum of 20. \n \u2022 When a creature within 5 feet of you has to make a saving throw, you can use your reaction to grant them the benefits of the help action on that roll. \n \u2022 When you use the help action to aid a creature with an ability check or attack roll, they can add a d4 to the roll.",
	description : "When a creature within 5 ft. of me makes a saving throw, I can use my reaction to give them the benefits of the Help action. Also, when I use the Help action to aid a creature in an attack roll or ability check, they add a d4 to the roll. [+1 Strength, Constitution, or Intelligence]", 	
	scorestxt : "+1 Strength, Constitution, or Intelligence",
	limfeaname : "Help",
	action : ["bonus action", " (on creature saving throw within 5 ft.)"],
};
FeatsList["terminal velocity"] = {
	name : "Terminal Velocity",
	source : ["IST", 52],
	prerequisite : "Being a Wasp",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('wasp') !== -1; },
	descriptionFull : "Your flying speed and ferocity with your stinger are unparalleled. You gain the following benefits: \n \u2022 Increase your Strength, Dexterity, or Charisma score by 1, up to a maximum of 20. \n \u2022 Your flying speed increases to 20 feet, or 40 feet if you are 5th level or above. \n \u2022 Immediately after you use the Dash action on your turn while flying and move at least 20 feet, you can make one melee attack with your stinger as a bonus action. When you make an attack in this way, you can add your Proficiency bonus to the damage dealt.",
	description : "My flying speed increases by 20 ft. or 40 ft. at or above 5th level. Also, if I use the Dash action while flying and move at least 20 ft., I can make an attack with my stinger as a bonus action, adding my Proficiency bonus to the damage dealt. [+1 Strength, Dexterity, or Charisma]",
	scorestxt : "+1 Strength, Dexterity, or Charisma",
	changeeval : function (v) {
		var raceSpeed = '+' + (v[1] < 5 ? 20 : 40);
		SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Terminal velocity Feat");
	},
	limefeaname : "Stinger Attack",
	action : ["bonus action", " (After dashing 20ft. while flying)"],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && (/deadly stinger/i).test(v.WeaponTextName)) {
					fields.Description += ((fields.Description ? '; ' : '') + 'Bns. action attack after 20ft dash in flight, add Prof. bonus to damage');
				};
			},
		]
	}
};
FeatsList["trampling charge"] = {
	name : "Trampling Charge",
	source : ["IST", 52],
	prerequisite : "Being a Rhinoceros Beetle",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('rhinoceros') !== -1; },
	descriptionFull : "Your mighty horn grows even larger, making a stab with it extremely dangerous for anyone on the other site of its pointy end. You gain the following benefits: \n \u2022 Increase your Strength score by 1, up to a maximum of 20. \n \u2022 When you hit a creature that is no more than one size larger than you with the attack from your Goring Rush trait, it must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone. \n \u2022 Your horn attacks deal double damage to objects and structures.",
	description : "Creatures no more than 1 size larger than me have to make a Strength saving throw (DC 8 + my Proficiency bonus + my Strength modifier) when hit by my horn, or be knocked prone. Also, my horn's damage is doubled against objects and structures. [+1 Strength]",
	scores : [1, 0, 0, 0, 0, 0],
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && (/horn/i).test(v.WeaponTextName)) {
					fields.Description += ((fields.Description ? '; ' : '') + 'crea. up to 1 size larger Str. save on hit or prone');
				};// not adding double object and structure damage to description, a lot of space and it's not as important imo
			},
		]
	}
};
FeatsList["vicious feast"] = {
	name : "Vicious Feast",
	source : ["IST", 52],
	prerequisite : "Being a Necrite",	
	prereqeval : function(v) { return CurrentRace.known.indexOf('necrite') !== -1; },
	descriptionFull : "You relish in the taste of battle. You gain the following benefits: \n \u2022 Increase your Strength or Dexterity score by 1, up to a maximum of 20. \n \u2022 When you make an unarmed strike with your Bite attack or reduce a creature to 0 hit points, you can spend one Hit Dice to heal yourself. Roll the die, add your Constitution modifier, and regain a number of hit points equal to the total (minimum of 1).",
	description : "When I make an unarmed Bite attack, or reduce a creature to 0 hit points, I can spend 1 hit die, rolling it and regaining the roll + my Constitution modifier in hit points. [+1 Strength or Dexterity]",
	scorestxt : "+1 Strength or Dexterity",
};
FeatsList["winged"] = {
	name : "Winged",
	source : ["IST", 52],
	prerequisite : "Being a Formicoid",	
	prereqeval : function(v) { return (CurrentRace.known.indexOf('bull ant')) || (CurrentRace.known.indexOf('fire ant')) || (CurrentRace.known.indexOf('frost ant')) !== -1; },
	descriptionFull : "You sprout translucent wings. With your wings, you have a flying speed of 20 feet if you aren't wearing heavy armor.",
	description : "I sprout translucent wings, and gain 20 feet of movement speed while not wearing heavy armour.",
	speed : { 
		fly : { spd : 20, enc : 0 },
	},
};

AddSubClass("artificer", "weaver", {
	regExpSearch : /^(?=.*weaver)(?!.*wizard).*$/i,
	subname : "Weaver",
	fullname : "Weaver",
	source : ["IST", 28],
	features : {
		"subclassfeature3" : {
			name : "Tools Proficiency",
			source : ["IST", 28],
			minlevel : 3,
			description : " [proficient with weaver's tools]",
			toolProfs : ["Weaver's tools"],
			spellcastingExtra : ["entangle", "snare", "hold person", "spider climb", "glyph of warding", "slow", "fabricate", "grasping vine", "hold monster", "planar binding"],
		},
		"subclassfeature3.1" : {
			name : "Weaver's Gauntlets",
			source : ["IST", 28],
			minlevel : 3,
			description : desc([
				"I have a Weaver's Gauntlet. I am proficient with the Gauntlet, and it is ineffective when used",
				"by other creatures.",
				"The Weaver's Gauntlet has a number of Spool Charges, which fuel the creation of a number of",
				"special objects and effects; the Net Shooter, the Rope, the Whip, and the Web. (See notes",
				"page for full object descriptions).",
				"I regain all expended Spool Charges at the end of a long rest.",
			]),			
			limfeaname : "Spool Charges",
			usages : "3 + Int. mod + Prof. bonus per ",
			usagescalc : "event.value = 3 + What('Proficiency Bonus') + What('Int Mod');",
			recovery : "long rest",
			
			toNotesPage : [{
				name : "Weaver Gauntlet Items",
				note : desc([
					"I can expend Spool Charges and use my Weaver's Gauntlet to create items and effects, as listed",
					"below:",
				])
				}, {
					name : "Net Shooter",
					note : desc([
						"\u2022 Using an action, you can expend one spool charge to make a ranged spell attack with your",
						"gauntlet against a creature within 30 feet of you as you shoot a net at the target. A large or",
						"smaller creature hit by the net is restrained until freed.",
						"\u2022 A creature can use its action to make a Strength check against your spell save DC, freeing itself",
						"or another creature within its reach on a success.",
						"\u2022 Dealing slashing damage equal to 5 x your Proficiency bonus to the net (AC 10) also frees a",
						"trapped creature without harming it, ending the effect and destroying the net. Furthermore, if",
						"the net is exposed to fire, it burns away within one round.",
					]),
					amendTo : "Weaver Gauntlet Items",
				}, {
					name : "Rope",
					note : desc([
						"\u2022 Using an action, you can expend one spool charge and shoot a rope from your weaver's",
						"gauntlet at a point you can see. The rope is up to 30 ft. long and sticks to any solid surface it",
						"touches. After the rope is produced, it can be detached from the weaver's gauntlet. You can",
						"spend additional spool charges to lengthen the rope by 30 feet per charge spent.",
						"\u2022 The rope is flammable. Any 5-foot of string exposed to fire burns away within one round.",
					]),
					amendTo : "Weaver Gauntlet Items",
				}, {
					name : "Whip",
					note : desc([
						"\u2022 Using a bonus action, you can expend a spool charge to create a piece of rope in an",
						"unoccupied hand. This rope can be used as a whip, and you are proficient in attacks made with",
						"it. The damage of the whip increases to 1d8 slashing damage. You can add your Intelligence",
						"modifier, instead of Strength or Dexterity, to the attack and damage rolls.",
					]),
					amendTo : "Weaver Gauntlet Items",
				}, {
					name : "Web",
					note : desc([
						"\u2022 You can cast the web spell from your weaver's gauntlet by spending two spool charges.",
						"Casting the spell in this way does not require verbal or material components.",
					]),
					amendTo : "Weaver Gauntlet Items",
				}],
			
		},
		"subclassfeature3.2" : {
			name : "Arcane Weaver",
			source : ["IST", 28],
			minlevel : 3,
			description : desc([
				"When I use the Net Shooter ability from my Weaver's Gauntlet, I can spend an additional",
				"Spool Charge to transform the net into an Arcane Net.",
				"Use the \"Choose Feature\" button above to add an Arcane Net the to third page.",
				"Arcane Nets still affect huge and larger creatures without restraining them, and chosen Nets",
				"can be replaced each time I gain a new one.",
			]),
			additional : levels.map( function(n) {
				if (n < 3) return "";
				return (n < 5 ? 3 : n < 9 ? 4 : n < 15 ? 5 : 6) + " Arcane Nets known";
			}),
			extraname : "Arcane Net",
			extrachoices : ["Barbed", "Disrupting", "Enlarging", "Ethereal", "Flaming", "Reinforced", "Shocking", "Umbral", "Weighted"],
			extraTimes : levels.map(function (n) {
				return n < 3 ? 0 : n < 5 ? 3 : n < 9 ? 4 : n < 15 ? 5 : 6;
			}),
			"barbed" : {
				name : "Barbed Net",
				source : ["IST", 29],
				description : desc(["This net deals 1d4 piercing damage on a hit. Additionally, a creature restrained by this net takes",
				"1d4 piercing damage each time it attempts to escape from it or makes an attack. The damage",
				"increases by an additional 1d4 at 5th, 9th, and 15th level.",
				]),
				additional : levels.map( function(n) {
					if (n < 5) return "1d4 piercing damage";
					return (n < 9 ? 2 : n < 15 ? 3 : 4) + "d4 piercing damage";			
				}),
			},
			"disrupting" : {
				name : "Disrupting Net",
				source : ["IST", 29],
				description : desc(["Creatures restrained by this net are deafened.",
				]),
			},
			"enlarging" : {
				name : "Enlarging Net",
				source : ["IST", 29],
				description : desc(["This net can restrain creatures of huge size.",
				]),
			},
			"ethereal" : {
				name : "Ethereal Net",
				source : ["IST", 29],
				description : desc(["This net can affect ethereal and formless creatures.",
				]),
			},
			"flaming" : {
				name : "Flaming Net",
				source : ["IST", 29],
				description : desc(["Creatures restrained by this net take 1d4 fire damage at the start of each of their turns. The",
				"damage increases by an additional 1d4 at 5th, 9th, and 15th level.",
				]),
				additional : levels.map( function(n) {
					if (n < 5) return "1d4 fire damage";
					return (n < 9 ? 2 : n < 15 ? 3 : 4) + "d4 fire damage";			
				}),
			},
			"reinforced" : {
				name : "Reinforced Net",
				source : ["IST", 29],
				description : desc(["This net has resistance against slashing damage.",
				]),
			},
			"shocking" : {
				name : "Shocking Net",
				source : ["IST", 29],
				description : desc(["This net deals 2d4 lightning damage on a hit. Furthermore, a creature that is restrained by this",
				"net can't use reactions. The damage increases by an additional 1d4 at 5th, 9th, and 15th level.",
				]),
				additional : levels.map( function(n) {
					if (n < 5) return "2d4 lightning damage";
					return (n < 9 ? 3 : n < 15 ? 4 : 5) + "d4 lightning damage";			
				}),
			},
			"umbral" : {
				name : "Umbral Net",
				source : ["IST", 29],
				description : desc(["Creatures restrained by this net are blinded.",
				]),
			},
			"weighted" : {
				name : "Weighted Net",
				source : ["IST", 29],
				description : desc(["Creatures restrained by this net have disadvantage on their Strength checks to remove it.",
				]),
			},
		},	
		"subclassfeature5" : {
			name : "Binding Thread",
			source : ["IST", 29],
			minlevel : 5,
			description : desc([
				"When a creature restrained by one of my Arcane Nets or spells attempts to move using a spell",
				"or ability, they make a Wisdom saving throw against my Spell Save DC. On a failure, the",
				"creature doesn't move, and it's spell slot or ability use is waste. On a success, the creature can",
				"use its spell or ability freely.",
			]),
		},
		"subclassfeature9" : {
			name : "Arcane Tapestry",
			source : ["IST", 29],
			minlevel : 9,
			description : desc([
				"Whenever I create an Arcane Net, I can expend an additional Spool Charge to add an extra",
				"effect from a different Arcane Net to it, up to a maximum number of effects.",
			]),
			additional : levels.map( function(n) {
				if (n < 15) return "Maximum of 2 effects";
				return "Maximum of 3 effects";
			}),
		},
		"subclassfeature15" : {
			name : "Perfect Cocoon",
			source : ["IST", 29],
			minlevel : 15,
			description : desc([ "Once per long rest, I can cast the Forcecage spell without preparation or material",
			"components, provided I use weaver's tools as the spellcasting focus.",
			]),
			spellcastingBonus : {
				name : "Perfect Cocoon",
				spells : ["forcecage"],
				selection : ["forcecage"],
				firstCol : 'oncelr',
			},
		}
	}
});
AddFeatureChoice(ClassList.artificer.features["infuse item"], true, "Floating Weapon (: level 10 artificer)", {
	name : "Floating Weapon",
	source : ["IST", 29],
	description : desc([ "The wielder of this weapon can use a bonus action to have it begin floating in an unoccupied",
	"space within 5 feet of them. ",
	"As a bonus action on the wielder's turn, they can move the weapon up to 20 feet and make a",
	"melee spell attack against a target within 5 feet of the weapon. It deals damage equal to its",
	"damage die + the wielder's Intelligence modifier.",
	"The weapon can be recalled when it is within 5 feet of the wielder as a bonus action.",
	]),
	additional : "any simple melee weapon (requires attunement)",
	prereqeval : function(v) { return classes.known.artificer.level >= 10; },
	magicitemsAdd : ["Floating Weapon"],
});
MagicItemsList["floating weapon"] = {
	name : "Floating Weapon",
	nameTest : "Floating",
	source : ["IST", 29],
	type : "weapon (any simple melee)", 
	description : "The wielder of this weapon can use a bonus action to have it begin floating in an unoccupied space within 5 feet of them. As a bonus action on the wielder's turn, they can move the weapon up to 20 feet and make a melee spell attack against a target within 5 feet of the weapon. It deals damage equal to its damage die + the wielder's Intelligence modifier. The weapon can be recalled when it is within 5 feet of the wielder as a bonus action.",
	descriptionFull : "By using a bonus action to speak a command word, the weapon starts to float in the air in an unoccupied space within 5 feet of the wielder. As a bonus action on the wielders turn, they can move the weapon up to 20 feet and make a melee spell attack against a creature within 5 feet of the weapon using your spell-attack modifier. On a hit, the weapon deals damage equal to the weapons damage die + your Intelligence modifier."+
	"\nThe weapon can return to the wielders hand by using a bonus action while the weapon is within 5 feet of them.",
	attunement : true,
	action : [["bonus action", " (start/recall)"]],
	chooseGear : {
		type : "weapon",
		prefixOrSuffix : "suffix",
		descriptionChange : ["replace", "weapon"],
		excludeCheck : function (inObjKey, inObj) {
			return !(/simple/i).test(inObj.type) || (!inObj.range || !(/melee/i).test(inObj.range));
		}
	},
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if ((/floating/i).test(v.WeaponTextName))	{
					fields.Damage_Bonus == What('Int Mod'); fields.Mod = 4;
				};
			}
		],
	},
};
AddFeatureChoice(ClassList.artificer.features["infuse item"], true, "Periapt of Poison Immunity", {
	name : "Periapt of Poison Immunity",
	source : ["IST", 29],
	description : desc([ "The wearer of this pendant gains resistance to poison damage and immunity to the poisoned",
	"condition.",
	]),
	additional : "a pendant or amulet",
	magicitemsAdd : ["Periapt of Poison Immunity"],
});
MagicItemsList["periapt of poison immunity"] = {
	name : "Periapt of Poison Immunity",
	nameTest : "Floating",
	source : ["IST", 29],
	type : "pendant", 
	description : "The wearer of this pendant gains resistance to poison damage and immunity to the poisoned condition.",
	descriptionFull : "While wearing this pendant, a creature gains resistance to poison damage and immunity to the poisoned condition.",
	attunement : true,
	savetxt : { immune : ["the poisoned condition"] },
	dmgres : ["Poison"],
};
AddFeatureChoice(ClassList.artificer.features["infuse item"], true, "Whip of Ensnaring (prereq: level 10 artificer)", {
	name : "Whip of Ensnaring",
	source : ["IST", 29],
	description : desc([ "This magic weapon grants a +1 bonus to attack and damage rolls made with it.",
	"The whip has 4 charges. When a creature is hit by an attack with this weapon, a charge can be",
	"expended to have the target make a Strength saving throw against the wielder's spell save DC.",
	"On a failure, the target becomes restrained, and can use an action to repeat the saving throw,",
	"breaking free on a success. The whip can't make attacks while it is restraining a creature.",
	"The whip regains 1d4 charges daily at dawn.",
	]),
	additional : "a whip",
	prereqeval : function(v) { return classes.known.artificer.level >= 6; },
	magicitemsAdd : ["Whip of Ensnaring"],
});
MagicItemsList["whip of ensnaring"] = {
	name : "Whip of Ensnaring",
	nameTest : "Ensnaring",
	source : ["IST", 29],
	type : "whip",
	description : "This magic weapon grants a +1 bonus to attack and damage rolls made with it. The whip has 4 charges. When a creature is hit by an attack with this weapon, a charge can be expended to have the target make a Strength saving throw against the wielder's spell save DC. On a failure, the target becomes restrained, and can use an action to repeat the saving throw, breaking free on a success. The whip can't make attacks while it is restraining a creature."+
	"The whip regains 1d4 charges daily at dawn.",
	descriptionFull : "This magic weapon grants a +1 bonus to attack and damage rolls made with it."+
	"The weapon has 4 charges. When the wielder of this weapon hits a Large or smaller creature with an attack roll, they can expend 1 charge to ensnare their target. The creature has to succeed on a Strength saving throw against your spell save DC, or become restrained. The wielder can't attack with the whip as long as it is restraining a creature. The creature can use their action to repeat their saving throw to break free from the whip."+
	"The weapon regains 1d4 charges daily at dawn.",
	attunement : true,
	weaponOptions : {
		baseWeapon : "whip",
		regExpSearch : /^(?=.*whip)(?=.*of)(?=.*(ensaring|restraining)).*$/i,
		name : "Whip of Ensnaring",
		source : ["IST", 29],
		damage : [1, 4, "slashing"],
		modifiers : [1, 1]
	},
	weaponsAdd : ["Whip of Ensnaring"],
	usages : "4",
	recovery : "dawn",
	additional : "restrains target; regains 1d4",
};

AddSubClass("barbarian", "symbiont", {
	regExpSearch : /^(?=.*(symbiont|symbiote)).*$/i,
	subname : "Path of the Symbiont",
	source : ["IST", 30],
	features : {
		"subclassfeature3" : {
			name : "Symbiotic Blade", //Symbiotic Blade (SB)
			source : ["IST", 30],
			minlevel : 3,
			description : desc([ "When I enter a rage, I manifest my Symbiotic Weapon.",
			"It deals 1d10 + my Strength modifier in necrotic damage (1d12 if two-handed, grants a +1",
			"bonus to my AC, and cannot be disarmed from me.",
			"Additionally, whenever features from this subclass subject a creature to a saving throw, the DC",
			"equals 8 + my prof. bonus + my Strength modifier",
			]),
			weaponOptions : {
				baseWeapon : "unarmed strike",
				regExpSearch : /^((?=.*symbiotic?)(?=.*blade)).*$/i,
				name : "Symbiotic Blade",
				source : ["IST", 30],
				damage : [1, 10, "necrotic"],
				description : "Versatile (1d12)",
				abilitytodamage : true,
			},
			weaponsAdd : ["Symbiotic Blade"],
			extraAC : [{name : "Symbiotic Blade (in rage)", mod : 1, text : "My Symbiotic Blade gives me a +1 bonus to AC while raging."}],
			
		},
		"subclassfeature3.1" : {
			name : "Apex Predator",
			source : ["IST", 30],
			minlevel : 3,
			description : desc([ "I gain 120 feet of darkvision, and climbing speed equal to my walking speed.",
			"Additionally, I ignore difficult terrain while raging.",
			]),
			vision : [["Darkvision", 120]],
			speed : { 
				climb : { spd : "walk", enc : "walk" },
			},
		},
		"subclassfeature6" : {
			name : "Eldritch Connection",
			source : ["IST", 30],
			minlevel : 6,
			description : desc([ "My Symbiotic Blade gains the thrown property (20/60 feet).",
			"Additionally, while the weapon is within 60 feet of me, I can use a bonus action to call it back",
			"to me in a straight line if I have an unoccupied hand. Any creature in its path as it travels must",
			"make a Dexterity saving throw, taking 2d6 necrotic damage on a failure, or half as much on a",
			"success.",
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.WeaponName.match(/^((?=.*symbiotic?)(?=.*blade)).*$/i)) {
							fields.Description += (fields.Description ? '; ' : '') + 'thrown', fields.Range += ', 20/60 ft'
						}//Appends "thrown" to the description and "20/60 ft" to the range fields of the Symbiotic Blade.
					},
				],
			},
			action : ["bonus action", " (recall Symbiotic Blade)"],
		},
		"subclassfeature10" : {
			name : "Assimilation",
			source : ["IST", 30],
			minlevel : 10,
			description : desc([ "I can manifest my Symbiotic Weapon as a bonus action while not raging.",
			"Additionally, whenever I finish a long rest, I can absorb magical melee wepaons I'm proficient",
			"with into my Symbiotic Blade. It gains attack and damage roll bonuses and any properties",
			"from the assimilated weapon, only retaining its original damage die. I can only have one",
			"weapon assimilated at a time.",
			]),
			action : ["bonus action", " (manifest Symbiotic Blade"],
			//Wasn't sure how/if I should code in the assimilation, the easiest way be for a hypothetical player to just keep the original magic item entry on their sheet for reference, given the SB retains its damage die.
		},
		"subclassfeature14" : {
			name : "Symbiotic Rage",
			source : ["IST", 30],
			minlevel : 14,
			description : desc([ "As a bonus action while raging, I can enter Symbiotic Rage. While in SYmbiotic Rage, I gain",
			"15ft Blindsight, resistance to necrotic, poison, and psychic damage, and I regenerate 1 hit",
			"point at the start of each of my turns. Additionally, my Symbiotic Blade gains a reach of 10ft,",
			"and grants me an extra +1 AC while in Symbiotic Rage.",
			"If I end my turn without damaging a creature in that turn, my Symbiotic Rage ends. I can take",
			"1d12 necrotic damage, which cannot be reduced, to prolong my Symbiotic Rage for one",
			"round if this happens.",
			]),
			action : ["bonus", " (while in rage)"],
			dmgres : [["Necrotic", "Necrotic (in Symbiotic Rage)"], ["Poison", "Poison (in Symbiotic Rage)"], ["Psychic", "Psychic (in Symbiotic Rage)"]],
			vision : [["\nBlindsight (in Symbiotic Rage);", 120]],
		}//Only coded in the extra resistances and the blindsight from Symbiotic Rage, since they can all have "(in symbiotic rage)" next to them. Other parts of this feature wouldn't be worth coding a permanent spot for imo.
	}
});

AddSubClass("bard", "college of pheromones", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*pheromones).*$/i,
	subname : "College of Pheromones",
	source : ["IST", 31],
	features : {
		"subclassfeature3" : {
			name : "Bonus Proficiencies",
			source : ["IST", 31],
			minlevel : 3,
			description : desc(["I gain proficiency with alchemist's supplies.",
			]),
			toolProfs : ["Alchemist's supplies"],
		},
		"subclassfeature3.1" : {
			name : "Pheromonal Orders",
			source : ["IST", 31],
			minlevel : 3,
			description : desc(["As a bonus action, I can choose a willing, allied creature within 10 feet of me. I expend one",
			"Bardic Inspiration use to have the creature make one of the following actions:",
			"\u2022 Attack!: The chosen creature makes an attack roll against a creature within range of it.",
			"\u2022 Move!: The chosen creature can move up to its movement speed.",
			"\u2022 Disengage!: The chosen creature uses the Disengage action and moves 5 feet in a direction",
			"it chooses.",
			"\u2022 Dodge!: The creature gains the benefits of the Dodge action.",
			]),
			action : ["bonus action", ""],
		},
		"subclassfeature6" : {
			name : "Pheromonal Dispenser",
			source : ["IST", 31],
			minlevel : 6,
			description : desc(["Whenever I finish a long rest, I can create a number of pheromonal dispensers equal to my",
			"proficiency bonus. I must have alchemist's tools on my person to do so.",
			"Dispensers affect any creatures within a 10 foot radius sphere for 1 minute, last until used or",
			"until the end of my next long rest, and can be thrown or set down and lit to be activated.",
			"I can choose from a number of different pheromonal dispensers to create, as listed on the",
			"third page notes."
			]),
			additional : levels.map( function(n) {
				if (n < 6) return "";
				return (n < 9 ? 3 : n < 13 ? 4 : n < 17 ? 5 : 6) + " Total Dispensers";
			}),				
			toNotesPage : [{
				name : "Pheromonal Dispensers",
				source : ["IST", 31],
				popupName : "Pheromonal Dispenser Types",
				page3notes : true,
				note : "\n  \u2022 Raging Pheromones (Pheromonal Dispenser, Insectopia)" + desc([
					" A creature that hits with a melee attack while standing in the sphere's radius deals an extra 1d6",
					"force damage.",
				]) + "\n  \u2022 Regenerative Pheromones (Pheromonal Dispenser, Insectopia)" + desc([
					" A creature that ends its turn in the sphere regains two hit points.",
				]) + "\n  \u2022 Nimbleness Pheromones (Pheromonal Dispenser, Insectopia)" + desc([
					" Creatures within the sphere's radius gain a +1 bonus to their AC.",
				]) + "\n  \u2022 Cleansing Pheromones (Pheromonal Dispenser, Insectopia)" + desc([
					" A creature that ends its turn within the sphere's radius and is either charmed, frightened,",
					"paralyzed, petrified, or poisoned is no longer affected by the condition.",
				]),
			}],	//not really sure how to code in the actual dispensers themselves, besides adding four new magic items, which seems a little much for something as non-permanent as these. I'll probably come back to this at some point.		
		},
		"subclassfeature6.1" : {
			name : "Controlling Pheromones",
			source : ["IST", 31],
			minlevel : 6,
			description : desc(["I can cast the Suggestion spell at will.",
			]),
			spellcastingBonus : {
				name : "Controlling Pheromones",
				spells : ["suggestion"],
				selection : ["suggestion"],
				firstCol : 'atwill'
			},
		},
		"subclassfeature14" : {
			name : "Controlling Pheromones",
			source : ["IST", 31],
			minlevel : 14,
			description : desc(["When I use the Pheromonal Orders feature, or cast the Suggestion spell, I can target up to",
			"two creatures.",
			]),
		},
	}
});

AddSubClass("cleric", "rot domain", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*(rot|decay)).*$/i,
	subname : "Rot Domain",
	source : ["IST", 32],
	spellcastingExtra : ["Bane", "Inflict Wounds", "Blindness/Deafness", "Ray of Enfeeblement", "Bestow Curse", "Slow", "Blight", "Sickening Radiance", "Contagion", "Enervation"],
	features : {
		"subclassfeature1" : {
			name : "Bonus Proficiency",
			source : ["IST", 32],
			minlevel : 1,
			description : "\n   " + "I gain proficiency with heavy armor",
			armorProfs : [false, false, true, false],
		},
		"subclassfeature1.1" : {
			name : "Rotting Touch",
			source : ["IST", 32],
			minlevel : 1,
			description : desc([ "As a bonus action, I touch a creature and force it to make a Constitution saving throw against",
			"my spell save DC. On a failed save, it takes 1d10 necrotic damage, increasing to 2d10 at 8th",
			"level, or half as much on a successful save.",
			"Additionally, I can touch a corpse, non-magical plant, or object made of organic material, and", 
			"cause it to decompose into mulch over the next minute.",
			]),
			
			limfeaname : "Rotting Touch",
			usages : "Wisdom modifier per ",
			usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
			recovery : "long rest",
			action : ["bonus action", ""],
			
			additional : levels.map(function (n) {
				if (n < 8) return "1d10 necrotic damage";
				return "2d10 necrotic damage";
			}),
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Rotting Sickness",
			source : ["IST", 32],
			minlevel : 2,
			description : desc([ "As an action, I make a creature of choice within 30 feet make a Constitution saving throw.",
			"against my spell save DC. On a failed save, the creature has disadvantage on attack rolls and",
			"Constitution saving throws for the next hour. At the end of each of its turns, it can repeat the",
			"saving throw, ending the effect on itself on a success.",
			]),
			action : ["action", ""],
		},
		"subclassfeature6" : {
			name : "Disciple of Decay",
			source : ["IST", 32],
			minlevel : 6,
			description : desc([ "A creature that has failed its saving throw against my Rotting Touch cannot regain hit points.",
			"It can repeat the saving throw, ending the effect on itself on a success.",
			]),
		},
		"subclassfeature8" : {
			name : "Divine Strike",
			source : ["IST", 32],
			minlevel : 8,
			description : desc([ "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
			]),

			additional : levels.map(function (n) {
				if (n < 8) return "";
				return "+" + (n < 14 ? 1 : 2) + "d8 necrotic damage";
			}),
		},
		"subclassfeature17" : {
			name : "Herald of Entropy",
			source : ["IST", 32],
			minlevel : 17,
			description : desc([ "Whenever I damage a creature with a cleric spell of 3rd level or higher, I can force it to make a",
			"Constitution saving throw against my spell save DC. On a failed save, the target has",
			"disadvantage on attack rolls, ability checks, and saving throws made with an ability score of",
			"my choice.",
			"The creature can repeat the saving throw at the end of each of its turns, ending the effect on a",
			"success, or remove it with a Remove Curse spell.",
			"If any of the creature's saving throws are successful, or the effect ends for it, it becomes",
			"immune to this feature for the next 24 hours.",
			"One creature per spell can be targeted with this feature.",
			]),
		},
	}
});

AddSubClass("druid", "circle of mutation", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*mutation).*$/i,
	subname : "Circle of Mutation",
	source : ["IST", 33],
	features : {
		"subclassfeature2" : {
			name : "Monstrous Aspect",
			source : ["IST", 33],
			minlevel : 2,
			description : desc(["Use the \"Choose Feature\" button above to add a Monstrous Aspect the to third page.",
			"After I finish a long rest, I can attune to one of my chosen Monstrous Aspects, granting me",
			"certain benefits. I can only be attuned to one aspect at a time.",
			]),
			additional : levels.map(function (n) {
				if (n < 2) return "";
				return n < 6 ? 2 : n < 10 ? 3 : n < 14 ? 4 : 5 + " Aspects known";
			}),
			extraname : "Monstrous Aspects",
			extrachoices : ["Aspect of the Displacer Beast", "Aspect of the Froghemoth", "Aspect of the Hook Horror", "Aspect of the Amber Brute", "Aspect of the Remorhaz", "Aspect of the Roc", "Aspect of the Astral Dreadnought", "Aspect of the Tarrasque"],
			extraTimes : levels.map(function (n) {
				if (n < 2) return 0;
				return (n < 6 ? 2 : n < 10 ? 3 : n < 14 ? 4 : 5);
			}),
			choicesNotInMenu : false,
			"aspect of the displacer beast" : {
				name : "Aspect of the Displacer Beast",
				description : desc(["\u2022 When you are subjected to an effect that allows you to make a Dexterity saving throw to take",
				"only half damage and fail the saving throw, you can use your reaction to re-roll the saving throw.",
				"You must use the new roll.",
				"\u2022 Activating your Monstrous Form while attuned to the Aspect of the Displacer beasts causes you",
				"to grow two barbed tentacles from your shoulders.",
				"The tentacles have the reach property and deal 1d4 piercing damage on a hit. Once on each of",
				"your turns, when you attack with your tentacles using the Attack action, you can make one",
				"additional tentacle attack as part of the same action.",
				"Furthermore, you can project a magical illusion that makes you appear to be standing near your",
				"actual location. When a creature you can see targets you with an attack roll, you can use your",
				"reaction to impose disadvantage on the attack roll.",
				]),//made the decision not to program in weapon entries for the monstrous aspect natural weapons, since having 4-6 extra weapon entries at higher levels could get in the way of everything else (also, the weapon damage changes between aspects, so coding in a generic weapon with "see notes" attached to it wouldn't work either). I could add a section in each notes entry that summarises actions, weapon traits, etc., but I think leaving it as is is functional enough.
			},
			"aspect of the froghemoth" : {
				name : "Aspect of the Froghemoth",
				description : desc(["\u2022 While attuned to this aspect, you can use your Wisdom modifier for Constitution saving throws,",
				"ability checks, and calculating your hit points.",
				"\u2022 Activating your Monstrous Form while attuned to the aspect of the Froghemoth causes one of",
				"your arms (your choice) to turn into a slimy tentacle.",
				"The tentacle has a reach of 10 feet and deals 1d8 bludgeoning damage on a hit. Instead of",
				"attacking with it, you can grapple a creature with your tentacle, making a Wisdom (Athletics)",
				"check instead of using Strength. While grappling a creature in this way, you cannot use your",
				"tentacle on another target. However, you can still attack the creature you are grappling with your",
				"tentacle.",
				"You also gain a swimming speed equal to your walking speed, and you can breathe both air and",
				"water.",
				"Furthermore, you grow a sticky prehensile tongue. You can use an action to target a creature no",
				"more than one size larger than you within 20 ft. of you. The creature must make a Strength",
				"saving throw against your spell save DC or be pulled up to 15 feet towards you. On a failed save,",
				"the creature also takes 1d6 points of acid damage.",
				]),
			},
			"aspect of the hook horror" : {
				name : "Aspect of the Hook Horror",
				description : desc(["\u2022 While attuned to this aspect,you can see in dim light within 120 feet of you as if it were bright",
				"light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of",
				"gray.",
				"\u2022 Activating your Monstrous Form while attuned to the aspect of the Hook Horror transforms",
				"one arm of your choice into a fierce bony hook. If you hit with it, the hook deals 2d6 piercing",
				"damage.",
				"You also gain a climbing speed equal to your walking speed.",
				"Furthermore, you gain blindsight within a radius of 30 ft. around you. While you are deafened",
				"you can't use your blindsight.",
				]),
			},
			"aspect of the amber brute" : {
				name : "Aspect of the Amber Brute (prerequisite: 6th level)",
				description : desc(["\u2022 You gain a base AC of 17 (your Dexterity modifier doesn't affect this number). You gain no",
				"benefit from wearing armor, but if you are using a shield, you can apply the shield's bonus.",
				"\u2022 Activating your Monstrous Form while attuned to the aspect of the Umber Hulk, each of your",
				"hands transforms into a brutal jointed claw, which you can use as a natural weapon if it's empty.",
				"It deals 1d8 slashing damage on a hit.",
				"You gain tremor sense up to 10 feet and a burrowing speed of 20 feet You can also burrow",
				"through solid rock at half burrowing speed and leave a 5-foot wide by your height high hole in",
				"your wake.",
				"Furthermore, you can cast the confusion spell centered on yourself without spending a spell slot,",
				"requiring no verbal, somatic, or material components. You can't use this feature again until you",
				"expend another use of your Wild Shape feature to activate your monstrous aspects.",
				]),
				prereqeval : function(v) { return classes.known.druid.level >= 6; },
			},
			"aspect of the remorhaz" : {
				name : "Aspect of the Remorhaz (prerequisite: 10th level)",
				description : desc(["\u2022 You gain resistance to cold and fire damage.",
				"\u2022 Activating your monstrous form while attuned to the aspect of the Remorhaz will cause you to",
				"grow scales, fangs, and fins. Your fangs are natural weapons that deal 1d10 piercing damage.",
				"Additionally, all of your melee weapon attacks deal an additional 1d6 fire damage.",
				"Furthermore, any creature that touches you or hits you with a melee attack takes 1d6 fire",
				"damage.",
				]),
				prereqeval : function(v) { return classes.known.druid.level >= 10; },
			},
			"aspect of the roc" : {
				name : "Aspect of the Roc (prerequisite: 10th level)",
				description : desc(["\u2022 You gain advantage on Wisdom (Perception) checks that rely on sight.",
				"\u2022 Activating your Monstrous form while attuned to the aspect of the Roc causes your arms to",
				"become mighty wings and your feet to become powerful talons.",
				"Your size becomes Large, and you gain a flying speed of 40 feet.",
				"You can use Wisdom instead of Strength when calculating carrying capacity, the weight you can",
				"push, pull or lift, and for Strength (Athletics) checks made to grapple another creature, and you",
				"gain advantage on Strength checks made to push, pull, lift, or break objects.",
				"Your talons deal 1d8 slashing damage on a hit. When you hit a creature with your talons, you",
				"can immediately make a grapple check against the creature. While you are grappling a creature",
				"with your talons, you can't use your talons on another target.",
				]),
				prereqeval : function(v) { return classes.known.druid.level >= 10; },
			},
			"aspect of the astral dreadnought" : {
				name : "Aspect of the Astral Dreadnought (prerequisite: 14th level)",
				description : desc(["\u2022 You have advantage on saving throws against spells and other magical effects.",
				"\u2022 Activating your monstrous form while attuned to the aspect of the Astral Dreadnought",
				"transforms one arm of your choice into a bulky claw. It deals 2d6 piercing damage on a hit.",
				"Furthermore, your gaze creates an area of antimagic, as in the antimagic field spell, in a 30-foot",
				"cone. At the start of each of your turns, you decide which way the cone faces. The cone doesn't",
				"function while your eyes are closed or while you are blinded.",
				]),
				prereqeval : function(v) { return classes.known.druid.level >= 14; },
			},
			"aspect of the tarrasque" : {
				name : "Aspect of the Tarrasque (prerequisite: 14th level)",
				description : desc(["\u2022 While you are attuned to this aspect, you grow in size as per the enlarge spell.",
				"\u2022 Activating your monstrous form while attuned to the aspect of the Tarrasque lets you grow an",
				"almost impenetrable carapace and a thick muscular tail capable of crushing walls. It deals 1d12",
				"bludgeoning damage on a hit and double damage to objects and structures.",
				"You gain a bonus to your AC equal to your Wisdom modifier (minimum of +1). When you are",
				"targeted by a spell that requires a ranged attack roll, roll a d10. On a 1 to 8, you are affected by",
				"the spell as normal. On a 9, you are unaffected by the spell. On a 10, you are unaffected, and the",
				"effect is reflected back at the caster as though it originated from you, turning the caster into the",
				"target.",
				]),
				prereqeval : function(v) { return classes.known.druid.level >= 14; },
			},
		},
		"subclassfeature2.1" : {
			name : "Wild Mutation",
			source : ["IST", 33],
			minlevel : 2,
			description : desc(["As an action, I can expend 1 use of the Wild Shape feature to mutate into the Monstrous",
			"Aspect I am currently attuned to.",
			"I gain 4 temporary hit points for each druid level I have, and grow a natural weapon. The",
			"weapon counts as a simple melee weapon, and I add my Wisdom modifier to the attack and",
			"damage rolls. I also gain other benefits depending on my currently attuned-to Monstrous",
			"Aspect (see third page notes).",
			"The benefits of this feature last an hour, or until I next use Wild Shape.",
			]),
			additional : levels.map(function (n) {
				return "+" + (n * 4) + " temp. hit points while mutated";
			}),
			action : ["action",""],
		},
		"subclassfeature6" : {
			name : "Controlled Transformation",
			source : ["IST", 34],
			minlevel : 6,
			description : desc(["I have advantage on saving throws against any spell or effect that would change my form.",
			]),
			savetxt : { adv_vs : ["spells or effects that alter my form"] },
		},
		"subclassfeature10" : {
			name : "Monstrous Prowess",
			source : ["IST", 34],
			minlevel : 10,
			description : desc(["While Wild Mutation is active, my natural weapon attacks count as magical, and I can attack",
			"twice with them, instead of once, whenever I take the Attack action.",
			]),
		},
		"subclassfeature14" : {
			name : "Rapid Cell Division",
			source : ["IST", 34],
			minlevel : 14,
			description : desc(["When I activate Wild Mutation, I choose up to a number of creatures equal to my Wisdom",
			"modifier within 30 feet. Until Wild Mutation ends, these creatures also gain the temporary hit",
			"points granted to me by Wild Mutation.",
			]),
			additional : "Wis. modifier total targets",
		},
	},
});

AddSubClass("fighter", "winged knight", {
	regExpSearch : /^(?=.*winged)(?=.*knight).*$/i,
	subname : "Winged Knight",
	source : ["IST", 35],
	abilitySave : 2,
	features : {
		"subclassfeature3" : {
			name : "Tailwind",
			source : ["IST", 35],
			minlevel : 3,
			description : desc([
					"I gain flying speed per level. I can fly for 10 consecutive turns, falling out of the air on the",
					"10th. At 5th level, the time restriction on flight is removed. I cannot use this flying speed if I'm",
					"wearing heavy armor.",
				]),
			speed : {
				fly : { spd : 10, enc : 0 }
			},
			changeeval : function (v) {
				var raceSpeed = '+' + (v[1] < 5 ? 0 : v[1] < 7 ? 10 : v[1] < 10 ? 20 : v[1] < 15 ? 30 : 40);
				SetProf('speed', raceSpeed !== '+0', {fly : raceSpeed}, "Winged Knight: Tailwind");
			}
		},
		"subclassfeature3.1" : {
			name : "Wind Waker",
			source : ["IST", 35],
			minlevel : 3,
			description : desc([
					"I learn the Gust cantrip and can cast it at will, using Dexterity as my spellcasting ability.",
				]),
			spellcastingAbility : 2,
			spellcastingBonus : {
				name : "Wind Waker",
				spells : ["gust"],
				selection : ["gust"],
				firstCol : 'atwill'
			},
		},
		"subclassfeature3.2" : {
			name : "Typhoon\'s Champion",
			source : ["IST", 35],
			minlevel : 3,
			description : desc([
				"Use the \"Choose Feature\" button above to add a Gust Technique to the third page.",
				"Gust techniques enhance attacks, and only one can be used per attack action.",
			]),//essentially the same function as the battle master maneuvers, yoinking the code from those. The gust points feature will be seperate.
			additional : levels.map(function (n) {
				return n < 3 ? "" : (n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6) + " known";
			}),
			extraname : "Gust Technique",
			extrachoices : ["Air Shield", "Airstream", "Eye of the Cyclone", "Hurricane Ward", "Squall Stride", "Updraft", "Gale Slash", "Wind Wall"],
			extraTimes : levels.map(function (n) {
				return n < 3 ? 0 : n < 7 ? 2 : n < 10 ? 3 : n < 15 ? 4 : n < 18 ? 5 : 6;
			}),
			choicesNotInMenu : false,
			"air shield" : {
				name : "Air Shield",
				description : desc(["When you or an ally within 30 feet of you are hit by a ranged weapon attack, you can use your",
				"reaction to spend one or more Gust Points to deflect the missile. When you do so, the damage",
				"you or your ally take from the attack is reduced by 1d6 + your Dexterity modifier + your fighter",
				"level.",
				"For every additional Gust Point you spend on this feature, the damage from the attack is",
				"reduced by an additional 1d4.",
				]),
				action : ["reaction", ""],
			},
			"airstream" : {
				name : "Airstream",
				description : desc(["You can use a bonus action to create one or more airstreams. Each stream is 5 feet wide, and its",
				"length is equal to twice the flying speed of your Tailwind feature. The stream has to originate",
				"from your current position and lasts until the start of your next turn.",
				"The area of the airstream is considered difficult terrain, except for you and any creature of your",
				"choice. While inside the stream, you or a chosen creature can spend 1 foot of movement to",
				"move 2 feet. If the stream crosses already existing difficult terrain, you or a chosen creature can",
				"move through the space at your normal speed. In addition, while inside the stream, the jump",
				"height and length of you and your chosen creatures are doubled.",
				"Each stream costs one Gust Point to create. You can create a number of streams equal to your",
				"proficiency bonus each turn.",
				]),
				action : ["bonus action", ""],
				additional : ["", "", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "2 total Airstreams", "4 total Airstreams", "2 total Airstreams", "5 total Airstreams", "5 total Airstreams", "5 total Airstreams", "6 total Airstreams", "6 total Airstreams", "6 total Airstreams", "6 total Airstreams"],
			},
			"eye of the cyclone" : {
				name : "Eye of the Cyclone (prerequisite: 10th level)",
				description : desc(["You can use an action to spend four Gust points to create a 50 ft. high and 30 ft. wide cyclone",
				"centered around you. A creature that enters the cyclone must succeed on a Strength saving",
				"throw against your Typhoon's Champion save DC, taking 4d6 bludgeoning damage on a failed",
				"save or half as much on a successful one.",
				"The cyclone dissipates at the beginning of your next turn unless you spend 2 Gust points to keep",
				"it active. The cyclone moves with you if you move while it is active.",
				]),
				action : ["action", ""],
				prereqeval : function(v) { return classes.known.fighter.level >= 10; },
			},
			"hurricane ward" : {
				name : "Hurricane Ward",
				description : desc(["You can use a bonus action to spend one or more Gust Points to create a 10-foot wide and",
				"10-foot tall pillar of strong wind (20 miles per hour) in an area within 30 feet of you. The wind",
				"has the effects of the warding wind spell. The wind disperses at the start of your next turn.",
				"For every additional Gust Point, you spend on this feature, the pillar of strong wind grows 10 feet",
				"wider and higher.",
				]),
				action : ["bonus action", ""],
			},
			"squall stride" : {
				name : "Squall Stride (prerequisite: 7th level)",
				description : desc(["You can use an action to spend one Gust Point to strengthen the winds that carry you. You can",
				"immediately move up to your speed.",
				"During this turn, while you move, you can move through the space of any hostile creature. If you",
				"do so, you can force the creature to make a Strength saving throw against your Typhoon's",
				"Champion save DC. On a failure, the creature is pushed 10 feet away from you in a straight line. On a success, the creature is unaffected, but you can still move through the creature's space. You",
				"still can't end your movement in another creature's space.",
				"You can only push creatures of Medium or smaller size, and a creature can't be pushed by this",
				"ability more than once per turn.",
				"If you spend an additional Gust Point, you can push creatures of Large size.",
				]),
				action : ["action", ""],
				prereqeval : function(v) { return classes.known.fighter.level >= 7; },
			},
			"updraft" : {
				name : "Updraft",
				description : desc(["When you hit a Medium or smaller creature with a melee weapon attack, you can spend 2 Gust",
				"Points to create an intense burst of wind below the creature. The creature must succeed on a",
				"Strength saving throw against your Typhoon's Champion save DC. On a success, the creature is",
				"unaffected. On a failed save, the creature is lifted 10 feet straight up into the air.",
				"If the creature is airborne and fails its save, it is raised 10 feet higher and falls prone.",
				"If you spend an additional Gust Point, you can use this ability on a Large creature.",
				]),
				action : ["action", " (on hit)"],
			},
			"gale slash" : {
				name : "Gale Slash",
				description : desc(["When you hit a creature with a melee weapon attack, you can spend one or more Gust Points to",
				"create a burst of wind in a 20-foot long and 5 feet wide line that starts from the creature you hit",
				"and extends directly away from you. Each creature in that line must succeed on a Strength saving",
				"throw against your Typhoon's Champion save DC or be shoved back 20 feet in a straight line.",
				"For every additional Gust Point you use on this feature, the burst's distance grows by 10 feet.",
				]),
				action : ["action", " (on hit)"],
			},
			"wind wall" : {
				name : "Wind Wall (prerequisite: 7th level)",
				description : desc(["You can use an action to spend three or more Gust Points to cast the wind wall spell. Dexterity is",
				"your spellcasting modifier for this spell. The Wall disperses at the start of your next turn.",
				"For every additional Gust Point you spend on this feature, the wind wall lasts for an additional",
				"round",
				]),
				action : ["action", ""],
				prereqeval : function(v) { return classes.known.fighter.level >= 7; },
			},
		},
		"subclassfeature3.3" : {
			name : "Gust Points",
			source : ["IST", 35],
			minlevel : 3,
			description : desc([
					"I gain a pool of Gust Points that I can use to fuel special Gust Maneuvers. I can gain one point",
					"per round whenever I use my flying movement in combat. I also gain a point whenever I use",
					"the Dash action or score a critical hit. If I don't use my flying movement on my turn, and I have",
					"Gust Points left, I lose my entire pool.",
				]),
			additional : ["", "", "2 Max. Gust Points", "2 Max. Gust Points", "3 Max. Gust Points", "3 Max. Gust Points", "3 Max. Gust Points", "3 Max. Gust Points", "4 Max. Gust Points", "4 Max. Gust Points", "4 Max. Gust Points", "4 Max. Gust Points", "5 Max. Gust Points", "5 Max. Gust Points", "5 Max. Gust Points", "5 Max. Gust Points", "6 Max. Gust Points", "6 Max. Gust Points", "6 Max. Gust Points", "6 Max. Gust Points"],//since this isn't a maximum pool you deplete, tracking it on the limited features list isn't really an option (you could do it, but it's not as suitable imo). It just lists the maximum and the player can keep track of it.
			
		},
		"subclassfeature7" : {
			name : "Expert Aeronaut",
			source : ["IST", 36],
			minlevel : 7,
			description : desc([
				"I have proficiency in Dexterity saving throws while flying.",
				"Additionally, I have advantage on saving throws against being knocked prone while airbone,",
				"and the fall damage I take is halved.",
			]),
			savetxt : { text : ["Adv. on Dexterity saving throws while flying and saving throws against being knocked prone while flying"]},
			dmgres : ["Falling"],
		},
		"subclassfeature10" : {
			name : "Zephyr Step",
			source : ["IST", 36],
			minlevel : 10,
			description : desc([
				"While flying, I can take the Dash or Disengage actions as a bonus action.",
			]),
			action : [["bonus action", "Zephyr Step (dash/disengage)"]],
		},
		"subclassfeature15" : {
			name : "Avatar of the Sky",
			source : ["IST", 36],
			minlevel : 15,
			description : desc([
				"When I use the Action Surge feature, I gain the benefits of the Dash and Disengage actions. I",
				"also gain a Gust Point.",
			]),
		},
	}
});

AddSubClass("monk", "way of the mantis", {
	regExpSearch : /^(?=.*mantis)((?=.*(monk|monastic))|((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior))).*$/i,
	subname : "Way of the Mantis",
	source : ["IST", 37],
	features : {
		"subclassfeature3" : {
			name : "Mantis Stance",
			source : ["IST", 37],
			minlevel : 3,
			description : ' [1 ki; see 3rd page "Notes"]' + desc([
				"As a bonus action, I can use my ki to enter a defensive stance for 1 minute."
			]),
			action : [["bonus action", "Enter Mantis Stance"]],
			"mantis stance" : {
				name : "Mantis Stance",
				extraname : "Way of the Mantis 3",
			source : ["IST", 37],
				description : desc([
					"As a bonus action, I can spend 1 ki point to enter a defensive stance that lasts for 1 minute.",
					"During this duration, I can use a bonus action to go in and out of the stance.",
					"While in the Mantis Stance, I can't use my movement. Additionally, I can use your Patient",
					"Defense feature without spending ki points.",
					"Furthermore, when a creature misses me with a melee weapon attack, I can use your reaction to",
					"make an unarmed attack against it."
				]),
			},
			autoSelectExtrachoices : [{ extrachoice : "mantis stance" }]
		},
		"subclassfeature3.1" : {
			name : "Serene Counter",
			source : ["IST", 37],
			minlevel : 3,
			description : ' [2 ki]' + desc([
				"Once per turn while in my Mantis Stance, I can spend 2 ki points to make one additional",
				"reaction."
			]),//don't think i need to program in a reaction entry on the sheet for this?
		},
		"subclassfeature6" : {
			name : "Pressure Strike",
			source : ["IST", 37],
			minlevel : 6,
			description : desc([
				"When I hit a target with my Flurry of Blows feature, I can choose to target a specific part of my",
				"target's body. It must succeed on a Constitution saving throw, or suffer a certain effect, as",
				"detailed on the Pressure Strike table (see notes page).",
				"A creature can't suffer an effect on a body part it doesn't have.",
			]),
			toNotesPage : [{
				name : "Pressure Strike Table",
				note : "\nBody Part\t    Effect" + desc([
					"\u2022 Arm\t    The creature can't make weapon attacks until the end of its next turn.",
					"\u2022 Eyes\t    The creature is blinded until the end of its next turn.",
					"\u2022 Legs\t    The creature is knocked prone.",
					"\u2022 Throat\t    The creature is silenced and can't speak until the end of its next turn.",
				])
			}],
		},
		"subclassfeature11" : {
			name : "Reaching Tibia",
			source : ["IST", 37],
			minlevel : 11,
			description : desc([
				"While in Mantis Stance, the reach of my unarmed attacks increases by 5 feet.",
				"Additionally, while in Mantis Stance, any enemy I hit must succeed on a Constitution saving",
				"throw or lose all its non-walking movement speed and its ability to jump until the end of its next turn.",
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.baseWeaponName === "unarmed strike") {
							fields.Description += (fields.Description ? '; ' : '') + '+5 ft reach';
						}
					},
				]
			}
		},
		"subclassfeature17" : {
			name : "Perfect Stillness",
			source : ["IST", 37],
			minlevel : 17,
			description : desc([
				"While in Mantis Stance, I regain 2 ki points at the start of my turns."
			]),
		}
	}
});

AddSubClass("paladin", "oath of the swam", {
	regExpSearch : /^((?=.*swarm)(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))))).*$/i,
	subname : "Oath of the Swarm",
	source : ["IST", 38],
	features : {
		"subclassfeature3.1" : {
			name : "Channel Divinity: Swarm Smite",
			source : ["IST", 38],
			minlevel : 3,
			description : desc([ 
			"As a bonus action, I choose a number of creatures equal to my Charisma modifier. On a",
			"chosen target's next attack, it deals an additional 1d8 psychic damage.",
			]),
			additional : "Cha. modifier total targets", 
			action : ["bonus action", ""],
			spellcastingExtra : ["dissonant whispers", "shield of faith", "enhance ability", "warding bond", "aura vitality", "enemies abound", "aura of purity", "phantasmal killer", "geas", "synaptic static"]
		},
		"subclassfeature3.2" : {
			name : "Channel Divinity: Hivemind",
			source : ["IST", 38],
			minlevel : 3,
			description : desc([
				"As an action, I can choose a number of willing creatures equal to my Charisma modifier. For 1",
				"minute, all chosen creatures and myself can communicate telepathically with each other.",
				"Additionally, while creatures are linked with this feature, they can choose to use your ability",
				"score modifiers instead of their own when making Wisdom or Charisma saving throws.",
			]),
			action : ["action", ""]
		},
		"subclassfeature7" : {
			name : "Mindshield",
			source : ["IST", 38],
			minlevel : 7,
			description : desc([
				"Myself and friendly creatures within 10 feet of me have resistance to psychic damage, and",
				"advantage on saving throws against being charmed.",
				"The range of this feature increases at 18th level.",
			]),
			additional : levels.map( function(n) {
				if (n < 7) return "";
				return (n < 18 ? 10 : 40) + "ft. range";
			}),
			dmgres : ["Psychic"],
			savetxt : { adv_vs : ["being charmed"] },
		},
		"subclassfeature15" : {
			name : "Soothing Hymn",
			source : ["IST", 38],
			minlevel : 15,
			description : desc([
				"Whenever I use Lay On Hands, every creature linked through Channel Divinity: Hivemind",
				"regains the same amount of hit points.",
			]),
		},
		"subclassfeature20" : {
			name : "Swarm Lord",
			source : ["IST", 38],
			minlevel : 20,
			description : desc([
				"Once per long rest, for 1 minute, I can gain a number of benefits:",
				"\u2022 If one creature can see a creature or object, all others linked to it with Channel Divinity:",
				"Hivemind can see it as well.",
				"\u2022 I can use Swarm Smite and Hivemind without expending my Channel Divinity usage.",
				"\u2022 Once per turn, as a bonus action, I can choose an allied creature within 30 feet to",
				"immediately make a melee or ranged weapon attack, or move up to its movement speed.",
			]),
		usages : 1,
		recovery: "long rest",
		}
	}
});

var hiveLordIST = AddSubClass("ranger", "hive lord", {//adds the hive lord class to a variable
	regExpSearch : /^(?=.*hive)(?=.*lord).*$/i,
	subname : "Hive Lord",
	source : ["IST", 39],
	features : {
		"subclassfeature3" : {
			name : "Call Drone",
			source : ["IST", 39],
			minlevel : 3,
			description : desc([
			"As an action, I can summon an Insect Drone in an empty space within 30 feet of me. It can be",
			"one of three drone types:",
			"\u2022 Bulwark Beetle",
			"\u2022 Stinger Wasp",
			"\u2022 Trap Spider",
			"Select any of the drone types on the companion page to see its respective stats and rules.",
			"Drones last for one hour, until reduced to 0 hit points, or untli I die. I can use this feature a",
			"number of times equal to my Proficiency bonus + Wisdom modifier per long rest.",
			]),
			usages : "Wis. mod + Prof. bonus per ",
			usagescalc : "event.value = What('Proficiency Bonus') + What('Wis Mod');",
			recovery : "long rest",
			action : [["action", " (summon)"], ["bonus action", " (command)"]],
			creatureOptions : [{//largely copying the drakewarden companion code for all three drones, they're similar enough. adding the creatures in as companions though. 
				name : "Insect Drone, Bulwark Beetle",
				source : ["IST", 40],
				size : 4,
				type : "Aberration",
				alignment : "True neutral",
				ac : "13+Prof",
				hp : 12,
				hd : [3, 8],
				hdLinked : ["ranger", "rangerua", "spell-less ranger"],
				minlevelLinked : ["ranger", "rangerua", "spell-less ranger"],
				speed : "30 ft, burrow 20ft",
				scores : [14, 10, 12, 8, 10, 8],
				senses : "",
				passivePerception : 10,
				languages : "Understands any it's Hive Lord speaks	",
				challengeRating : "0",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Pincer",
					ability : 1,
					damage : [1, 6, "bludgeoning"],
					modifiers : [2, "Prof+2"],
					range : "Melee (5 ft)",
					description : "Large or smaller target is grappled, escape DC = Hive Lord's spell save DC",
					abilitytodamage : false
				}],
				features : [{
					name : "Hive Lord",
					description : "The Drone obeys the commands of its Hive Lord and shares its proficiency bonus. It takes its turn immediately after that of its Hive Lord, on the same initiative. It can move and take reactions on its own, but only takes the Dodge action on its turn unless its Hive Lord takes a bonus action to command it to take another action. If its Hive Lord is incapacitated, the Drone can take any action, not just Dodge. The Drone vanishes after 1 hour, when it is reduced to 0 hit points, or when its Hive Lord dies. It can also be dismissed as a bonus action."
				}, {
					name : "Savage Swarm",
					description : "This Drone can attack twice when taking the attack action, and when forced to make a saving throw, can use its Hive Lord's modifiers instead of its own.",
					minlevel : 11,					
				}, {
					name : "Adamantine Beetle",
					description : "This Drone adds its Hive Lord's Wisdom modifier to its AC.",
					minlevel : 15,	
				}],
				traits : [{
					name : "Charge",
					description : "As an action, the drone immediately moves 20 feet in a straight line in a direction of its Hive Lord's choosing. If the drone passes through a creature's space, the creature has to succeed on a Strength saving throw against its Hive Lord's spell save DC or be knocked prone."
				}, {
					name : "Adamantine Beetle",
					description : "This Drone can use its reaction to make a pincer attack against a creature that movies within 5 feet of it.",
					minlevel : 15,	
				}],
				
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known.ranger && !classes.known.rangerua) return;
						var rngrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua.level;
						var rngrLvlM = 3 * rngrLvl;
						HDobj.alt.push(3 + rngrLvlM);
						HDobj.altStr.push(" = 3 as a base\n + 3 \xD7 " + rngrLvl + " from three times its Hive Lord's ranger level (" + rngrLvlM + ")");
					},
					setAltHp : true,
				},
				eval : function(prefix, lvl) {
					var wismod = tDoc.getField('Wis Mod').value;
					AddToModFld(prefix + "Comp.Use.AC", wismod, false, "Adamantine Beetle", "This Drone adds its Hive Lord's Wisdom modifier to its AC.");
				}
			}, {
				name : "Insect Drone, Stinger Wasp",
				source : ["IST", 40],
				size : 4,
				type : "Aberration",
				alignment : "True neutral",
				ac : "11+Prof",
				hp : 8,
				hd : [3, 8],
				hdLinked : ["ranger", "rangerua", "spell-less ranger"],
				minlevelLinked : ["ranger", "rangerua", "spell-less ranger"],
				speed : "30 ft, fly 30ft",
				scores : [12, 14, 10, 8, 10, 8],
				senses : "",
				passivePerception : 10,
				languages : "Understands any it's Hive Lord speaks	",
				challengeRating : "0",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Sting",
					ability : 1,
					damage : [1, 8, "piercing"],
					modifiers : [2, "Prof+2"],
					range : "Melee (5 ft)",
					description : "",
					abilitytodamage : false
				}],
				attacks : [{
					name : "Stinger Shot",
					ability : 2,
					damage : [1, 6, "piercing"],
					modifiers : [2, "Prof"],
					range : "60 ft",
					description : "",
					abilitytodamage : false
				}],
				features : [{
					name : "Hive Lord",
					description : "The Drone obeys the commands of its Hive Lord and shares its proficiency bonus. It takes its turn immediately after that of its Hive Lord, on the same initiative. It can move and take reactions on its own, but only takes the Dodge action on its turn unless its Hive Lord takes a bonus action to command it to take another action. If its Hive Lord is incapacitated, the Drone can take any action, not just Dodge. The Drone vanishes after 1 hour, when it is reduced to 0 hit points, or when its Hive Lord dies. It can also be dismissed as a bonus action"
				}, {
					name : "Savage Swarm",
					description : "This Drone can attack twice when taking the attack action, and when forced to make a saving throw, can use its Hive Lord's modifiers instead of its own.",
					minlevel : 11,					
				}, {
					name : "Executioner Wasp",
					description : "This Drone's flying speed increases by 10 feet.",
					minlevel : 15,
					
					eval : function(prefix, lvl) {
						var sMoveStr = (typePF ? ",\n" : ", ") + "fly 30ft";
							Value(prefix + "Comp.Use.Speed", What(prefix + "Comp.Use.Speed").replace(sMoveStr, ", fly 40ft"));
					},
				}],	
				traits : [{
					name : "Executioner Wasp",
					description : "When using its sting action to attack, this Drone can attack again as a bonus action.",
					minlevel : 15,	
				}],			
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known.ranger && !classes.known.rangerua) return;
						var rngrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua.level;
						var rngrLvlM = 2 * rngrLvl;
						HDobj.alt.push(2 + rngrLvlM);
						HDobj.altStr.push(" = 2 as a base\n + 2 \xD7 " + rngrLvl + " from two times its Hive Lord's ranger level (" + rngrLvlM + ")");
					},
					setAltHp : true,
				}
			}, {
				name : "insect Drone, Trap Spider",
				source : ["IST", 41],
				size : 4,
				type : "Aberration",
				alignment : "True neutral",
				ac : "12+Prof",
				hp : 8,
				hd : [3, 8],
				hdLinked : ["ranger", "rangerua", "spell-less ranger"],
				minlevelLinked : ["ranger", "rangerua", "spell-less ranger"],
				speed : "30 ft, climb 30ft",
				scores : [10, 12, 10, 8, 14, 8],
				senses : "", 
				passivePerception : 12,
				languages : "Understands any it's Hive Lord speaks	",
				challengeRating : "0",
				proficiencyBonus : 2,
				proficiencyBonusLinked : true,
				attacksAction : 1,
				attacks : [{
					name : "Fangs",
					ability : 1,
					damage : [1, 4, "piercing"],
					modifiers : [1, "Prof+1"],
					range : "Melee (5 ft)",
					description : "",
					abilitytodamage : false
				}],
				features : [{
					name : "Hive Lord",
					description : "The Drone obeys the commands of its Hive Lord and shares its proficiency bonus. It takes its turn immediately after that of its Hive Lord, on the same initiative. It can move and take reactions on its own, but only takes the Dodge action on its turn unless its Hive Lord takes a bonus action to command it to take another action. If its Hive Lord is incapacitated, the Drone can take any action, not just Dodge. The Drone vanishes after 1 hour, when it is reduced to 0 hit points, or when its Hive Lord dies. It can also be dismissed as a bonus action"
				}, {
					name : "Savage Swarm",
					description : "This Drone can attack twice when taking the attack action, and when forced to make a saving throw, can use its Hive Lord's modifiers instead of its own.",
					minlevel : 11,					
				}, {
					name : "Hunter Spider",
					description : "This Drone can now trap up to three creatures using its Web Shot, and Web Shot's range increases to 60 feet.",
					minlevel : 15,
				}],	
				traits : [{
					name : "Spider Climb",
					description : "The Drone can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
				}, {
					name : "Web Sense", 
					description : "While in contact with a web created from the Drone's Sticky Web action, the Drone and you know the exact Location of any other creature in contact with the same web.",
				}, {
					name : "Web Shot",
					description : "Choose a creature within 30 feet of the Drone. The target must succeed on a Dexterity saving throw against its Hive Lord's spell save DC, or be restrained by a sticky web for the next minute. As an action on each of its turns, a restrained creature can make a Strength saving throw against the Hive Lord's spell save DC to break free."
				}, {
					name : "Sticky Web (Recharge 5-6)",
					description : "The Drone spins a web on a horizontal or vertical surface in a 30-foot circle centered on the Drone. Any creature of its Hive Lord's choice moving across the webbed surface is unaffected by difficult terrain and can climb vertical surfaces using their movement speed without making an ability check. For other creatures, the web's area is considered difficult terrain.",
				}],				
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known.ranger && !classes.known.rangerua) return;
						var rngrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known.rangerua.level;
						var rngrLvlM = 2 * rngrLvl;
						HDobj.alt.push(2 + rngrLvlM);
						HDobj.altStr.push(" = 2 as a base\n + 2 \xD7 " + rngrLvl + " from two times its Hive Lord's ranger level (" + rngrLvlM + ")");
					},
					setAltHp : true
				}
			}],

		},
		"subclassfeature3.1" : {
			name : "Hive Lord Magic",
			source : ["IST", 39],
			minlevel : 3,
			description : desc([
				"I get bonus spells when I reach certain levels, which do not count against the number of",
				"ranger spells I know."
			]),
			spellcastingExtra : ["command", "web", "hypnotic pattern", "confusion", "synaptic static"],
			spellcastingExtraApplyNonconform : true
		},
		"subclassfeature7" : {
			name : "Hive Mind",
			source : ["IST", 40],
			minlevel : 7,
			description : desc([
				"Once per short rest, as a bonus action, I can mark a creature within 90 feet of me for 1 hour.",
				"Damage I or my Drones deal to a marked creature is converted to psychic damage, and a",
				"marked creature that turns invisible is still visible to us.",
				"If a marked creature drops to 0 hit points before this feature ends, I can use my bonus action",
				"on a subsequent turn to mark a new creature.",
			]),
			action : [["bonus action", ""]],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature11" : {
			name : "Savage Swarm",
			source : ["IST", 40],
			minlevel : 11,
			description : desc([
			"My Drones can now attack twice when taking the attack action.",
			"Additionally, when my Drones are forced to make a saving throw, they can use my modifiers",
			"instead of their own.",
			]),
		},
		"subclassfeature15" : {
			name : "Metamorphosis",
			source : ["IST", 40],
			minlevel : 15,
			description : desc([
				"My Insect Drones gain additional abilities when I summon them."
			]),			
		}
	}
});
if (ClassList.rangerua) { //adds the subclass if the UA revised ranger is in use
	ClassList.rangerua.subclasses[1].push(hiveLordIST);
};

AddSubClass("rogue", "mimic", {
	regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*mimic).*$/i,
	subname : "Mimic",
	source : ["IST", 42],
	features : {
		"subclassfeature3" : {
			name : "Mimicry",
			source : ["IST", 42],
			minlevel : 3,
			description : desc([
			"I gain proficiency with the disguise kit. I can also cast the Alter Self spell at will, but choosing",
			"only the \'Change Appearence\' option.",
			]),
			toolProfs : ["Disguise kit"],
			spellcastingBonus : {
				name : "Mimicry",
				spells : ["alter self"],
				selection : ["alter self"],
				firstCol : 'atwill'
			},
		},
		"subclassfeature3.1" : {
			name : "Impersonation",
			source : ["IST", 42],
			minlevel : 3,
			description : desc([
			"I can impersonate any small or medium humanoid with a CR or class level equal to or less",
			"than my Rogue level after studying them for an hour. I can impersonate someone this way for",
			"a number of hours equal to half my rogue level, reverting to my normal form at the end of",
			"that time, or when I use a bonus action to dismiss my disguise. I can remember a number of",
			"impersonations equal to my proficiency bonus, and can choose to replace old ones when",
			"learning new ones.",
			"While disguised, I am unable to use or benefit from my racial or class features, my skill, saving",
			"throw, and tool proficiencies, and my Strength, Dexterity, and Constitution modifiers are",
			"replaced with that of the creature I am impersonating. I also gain its weapon and armour",
			"proficiencies, and speak any languages it knows. I am only able to use my target's movement",
			"speed, including special types, and have advantage on Charisma (Deception) checks to avoid",
			"detection."
			]),
			additional : levels.map(function (n) {
				return "Lasts for " + Math.floor(n / 2) + " hours; " + (n <= 4 ? 2 : n <= 8 ? 3 : n <= 12 ? 4 : n <= 16  ? 5 : 6) + " total disguises" ;
			}), 
			
			usages : 2,
			recovery : "long rest",
			action : [
				["action", ""],
				["bonus action", " (dismiss disguise)"]
			],
		},
		"subclassfeature9" : {
			name : "Imitate",
			source : ["IST", 42],
			minlevel : 9,
			description : desc([
			"I can use my reaction to mimic the action, bonus action, or triggered ability of a creature that I",
			"can see. If the creature I'm mimicking is unwilling, I have to succeed on an Intelligence",
			"(Investigation) check against a DC equal to 10 + their level or CR to use this feature.",
			"Benefits from mimicked abilities last until the end of my next turn, or until used once. I cannot",
			"mimic spells, or abilities inherent to magic items.",
			]),
			action : ["reaction", ""],
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest",
		},
		"subclassfeature13" : {
			name : "Masquerade",
			source : ["IST", 42],
			minlevel : 13,
			description : desc([
			"While using the Impersonation feature, I can now:",
			"\u2022 Use all my class features, and cast any spells that would not alter my shape.",
			"\u2022 Use racial, class, and background features from my impersonated creature.",
			"I can't use my impersonated creature's spells, abilities that would require a spell slot, abilities",
			"that would change my shape, or legendary/lair actions. I also can't use Channel Divinity,",
			"Eldritch Invocations, Artificer Infusions, or similar abilities.",
			]),
		},
		"subclassfeature17" : {
			name : "Shadow Impersonation",
			source : ["IST", 42],
			minlevel : 17,
			description : desc([
			"Once per long rest, as an action, I can shape my shadow into one of my known impersonations. It looks exactly",
			"like the chosen impersonation, and has its stats, features, and abilities, but has hit points",
			"equal to half of my own hit points. It also shares my weapons, armour, and clothes. Any magic",
			"items the Shadow is carrying copies of have no charges if they otherwise would.",
			"The Shadow can be moved up to my movement speed as a bonus action, and can",
			"immediately use a reaction. It must remain within 120 feet of me, and lasts for 10 minutes, or",
			"until reduced to 0 hit points.",
			]),
		}
	}
});

AddSubClass("sorcerer", "rupture magic", {
	regExpSearch : /^(?=.*(sorcerer|witch))(?=.*rupture).*$/i,
	subname : "Rupture Magic",
	source : ["IST", 44],
	features : {
		"subclassfeature1" : {
			name : "Sundering Shield",
			source : ["IST", 44],
			minlevel : 1,
			description : desc([ 
			"Once per short rest, whenever I cast a spell of 1st level or higher, I gain a shield with hit points",
			"equal to the cast spell's level. It takes damage in place of me up to its hit points.",
			"The shield has resistance to all spell damage, however any bludgeoning, piercing, or slashing",
			"damage is dealt directly to me, ignoring the shield. The shield lasts until the end of my next",
			"short or long rest, or until it is reduced to 0 hit points.",
			"At 2nd level, I can spend 2 sorcery points when creating a shield, giving it hit points equal to",
			"twice my level + the cast spell's level.",
			]),
			additional : levels.map( function(n) {
				if (n < 2) return "";
				return (n * 2) + " extra HP with Sorc. Points";
			}),				
			usages : 1,
			recovery : "short rest",
			
			spellcastingBonus : {
				name : "Magician\'s Bane",
				spells : ["detect magic"],
				selection : ["detect magic"],
				firstCol : 'atwill'
			},
		},
		"subclassfeature6" : {
			name : "Disruptive Mark",
			source : ["IST", 44],
			minlevel : 6,
			description : desc([
				"I can choose a creature within 30 feet of me that I can see, and gain the following benefits:",
				"\u2022 When my target casts a spell, it must succeed on a Constitution saving throws against my",
				"spell save DC. On a failed save, the spell fails and the target wastes a spell slot.",
				"\u2022 Whenever my target starts its turn while maintaining concentration on a spell, it must",
				"succeed on a Constitution saving throws against my spell save DC. On a failed save, it loses",
				"concentration on the spell.",
				"I can only mark one creature with this feature at a time. It can be used a number of times",
				"equal to my proficiency bonus per long rest.",
			]),
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "long rest",
		},
		"subclassfeature14" : {
			name : "Arcane Nullzone",
			source : ["IST", 44],
			minlevel : 14,
			description : desc([
				"If I'm targeted by a damaging spell of 1st level or higher cast by a creature I can see, I can use",
				"my reaction to spend a number of sorcery points equal to the spell's level, halving the damage",
				"it would deal to any creature.",
			]),
			action : ["reaction", " (when targeted by damaging spell)"]
		},
		"subclassfeature18" : {
			name : "Overpower",
			source : ["IST", 44],
			minlevel : 18,
			description : desc([
				"I can cast the Counterspell and Dispel Magic spells against the target of my Disruptive Mark",
				"feature at 3rd level, without expending spell slots. These spells can be cast at higher levels by",
				"spending a number of Sorcery Points equal to the level I want to cast them at.",
				"While within 30 feet of the target of my Disrupting Mark feature, I also have advantage on the",
				"spellcasting ability checks for these spells.",
			]),
			spellcastingBonus : [{
				name : "Overpower",
				spells : ["counterspell"],
				selection : ["counterspell"],
				firstCol : "atwill"
			}, {
				name : "Overpower",
				spells : ["dispel magic"],
				selection : ["dispel magic"],
				firstCol : "atwill"
			}],
		}
	}
});
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Dark Echo", {
	name : "Dark Echo",
	source : ["IST", 44],
	description : " [1 sorcery point]" + desc([
		"When I take spell damage, I can use my reaction to cast the same spell I took damage from back at",
		"its original caster.",
		"This uses a spell slot, requires all needed material components for the spell, and changes its",
		"damage type to necrotic.",
	]),
	action : ["reaction", " [1 sorcery point]"]
});
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Leeching Spell", {
	name : "Leeching Spell",
	source : ["IST", 44],
	description : " [3 sorcery points]" + desc([
		"When I deal damage with a single-target spell, I regain hit points equal to half of the damage",
		"dealt, up to a maximum of half my total hit points.",
	])
});

AddSubClass("warlock", "the great wurm", {
	regExpSearch : /^(?=.*great)(?=.*wurm)(?=.*warlock).*$/i,
	subname : "the Great Wurm",
	source : ["IST", 45],
	spellcastingExtra : ["chaos bolt", "inflict wounds", "barkskin", "enlarge/reduce", "life transference", "stinking cloud", "stoneskin", "vitriolic sphere", "antilife shell", "destructive wave"],
	features : {
		"subclassfeature1" : {
			name : "Unnatural Resistance",
			source : ["IST", 45],
			minlevel : 1,
			description : desc([
				"As a bonus action, I gain temporary hit points equal to my Warlock level + my proficiency",
				"bonus, replacing any other temporary hit points I have.",
				"Starting at 10th level, I can spend a number of my hit dice equal to half my proficiency bonus",
				"rounded up when using this feature. I gain temporary hit points equal to the total rolled + my",
				"proficiency bonus.",
			]),
			additional : levels.map(function (n) {
				if (n < 10) return (n + (n <= 4 ? 2 : n <= 8 ? 3 : n <= 12 ? 4 : n <= 16  ? 5 : 6)) + " temp. HP";
				return (n + (n <= 4 ? 2 : n <= 8 ? 3 : n <= 12 ? 4 : n <= 16  ? 5 : 6)) + " temp. HP; " + Math.floor((n <= 4 ? 2 : n <= 8 ? 3 : n <= 12 ? 4 : n <= 16  ? 5 : 6) / 2) + " total hit die available, add Prof. bonus to roll for temp HP"; //a lot of this is just checking the current prof bonus, since How('Proficiency Bonus') can't be used here 
			}), 			
			action : ["bonus action", ""],
		},
		"subclassfeature1.1" : {
			name : "Gluttonous Physique",
			source : ["IST", 45],
			minlevel : 1,
			description : desc([
				"I can use my Constitution modifier instead of Strength for attack and damage rolls. I can also",
				"use it instead of Strength when making Athletics checks to initiate or escape a grapple, or to",
				"shove another creature.",
				"I also gain resistance to acid damage, and proficiency in shields and medium and heavy",
				"armor. The Strength requirement to wear heavy armor is also reduced by 2 for me.", //I don't need to worry about coding anything for the strength requirement, AFAIK the sheet doesn't have anything in it for that. 
			]),
			armorProfs : [false, true, true, true],
			dmgres : ["Acid"],
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (v.isMeleeWeapon) {
							fields.Description += (fields.Description ? '; ' : '') + 'Con. mod can be used instead of Str.';//Weapon modifiers can be freely changed from the dropdown in the attacks section, so all this does is add some text to the description of the attack.
						};
					}
				],
			},
		},
		"subclassfeature6" : {
			name : "Spawn of the Wurm",
			source : ["IST", 45],
			minlevel : 6,
			description : desc([
				"When I hit a creature with a melee weapon attack, I can summon a Leech, which attaches itself",
				"to the target. The Leech has 6 AC, 2 (-4) in every ability score, and 1 foot of movement speed.",
				"At the start of each of the target creature's turns, the Leech deals 1d4 piercing damage to it,",
				"and I regain hit points equal to the damage dealt.",
				"Once the Leech deals 24 points of damage, it falls off the target creature and dies, dealing no",
				"further damage to the target. I can create a number of Leeches equal to my Proficiency Bonus",
				"per short or long rest.",
			]),
			usages : "Proficiency bonus per ",
			usagescalc : "event.value = How('Proficiency Bonus');",
			recovery : "short rest", //not going to program an action or any kind of attack alteration for this. the player would need to keep note of what leeches are active and their damage, but that's part and parcel of playing a ttrpg imo.
		},
		"subclassfeature10" : {
			name : "Insatiable",
			source : ["IST", 45],
			minlevel : 10,
			description : desc([
				"I can stack temporary hit points from a number of multiple sources equal to my proficiency",
				"bonus. Instead of replacing my temporary hit point pool each time I receive more, I add them",
				"on, provided they come from a source I am not already using.",
				"Once my temporary hit points are depleted, I can receive them from all previously-used",
				"sources again.",//I may reword this at some point, trying to be concise but making sure it makes sense was tough for this.
			])
		},
		"subclassfeature14" : {
			name : "Consume",
			source : ["IST", 45],
			minlevel : 14,
			description : desc([
				"Once per long rest, I can force each creature within a 10 foot cube around me make a",
				"Constitution saving throw. The creatures take 4d6 necrotic damage on a failed save, or half as",
				"much on a successful one, and I regain hit points equal to half of the damage I deal to them.",
			])
		}
	}
});
AddWarlockPactBoon("Pact of the Maw", {
	name : "Pact of the Maw",
	source : ["IST", 45],
	description : desc([
		"I can use a bonus action to open a gateway to The Maw, a spherical demiplane that is roughly",
		"10 feet in diameter. While the gateway is open, I can swallow anything that isn't larger than 5",
		"feet in every dimension. Anything I do swallow is transported to The Maw. I can close the",
		"gateway to The Maw as a free action.",
		"While the gateway is open, I can also use an action to swallow a creature of medium size or",
		"smaller. I make a melee spell attack against the creature, transporting them to The Maw on a",
		"hit. I can only do this once per short or long rest.",
		"Creatures in The Maw can make a Strength saving throw against my spell save DC to break",
		"free, and I regurgitate them in an unoccupied space within 5 feet of me if they succeed.",
		"Creatures in The Maw can't interact with any objects inside with them, and I can only have one",
		"creature inside The Maw at a time.",
		"If an extradimensional space created by a bag of holding, Heward's handy haversack, portable",
		"hole, or similar item is placed inside your maw, it destroys the item immediately, and a gate to",
		"the Astral Plane is opened in your space. Any creature (including yourself) within 10 feet of the",
		"gate is sucked through it to a random location on the Astral Plane. The gate then closes. The",
		"gate is one-way only and can't be reopened.",
	]),
	usages: 1,
	recovery: "short rest",
	action : [
		["action", " (swallow creature)"],
		["bonus action", " (open gateway)"]
	],
});
AddWarlockInvocation("Gift of the All Consumer (prereq: level 7 warlock, Pact of the Maw)", {
	name : "Gift of the All Consumer",
	source : ["IST", 46],
	submenu : "[improves Pact of the Maw]",
	description : desc([
		"I can eat anything without suffering ill effect, but only food will sustain me.",
		"During a short rest, I can also regain a used hit die for every day's worth of food I eat. If none of",
		"my hit dice have been spent, I regain hit points as if I had rolled a hit dice. I can do this with a",
		"number of day's worth of rations equal to half my Warlock level during each short rest."
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 7 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the maw") !== -1;
	},
	additional : levels.map(function (n) {
		return "I can consume " + Math.ceil(n / 2) + " days worth of rations total";
	}),
});
AddWarlockInvocation("Glutton's Delight (prereq: level 18 warlock, Pact of the Maw)", {
	name : "Glutton's Delight",
	source : ["IST", 46],
	submenu : "[improves Pact of the Maw]",
	description : desc([
		"Once per long rest, I can cast the Heroes' Feast spell once without expending a spell slot or using",
		"material components.",
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 18 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the maw") !== -1;
	},
	spellcastingBonus : [{
		name : "Glutton's Delight",
		spells : ["heroes' feast"],
		selection : ["heroes' feast"],
		firstCol : "oncelr",
	}]
});
AddWarlockInvocation("Slavering Gorge (prereq: Pact of the Maw)", {
	name : "Slavering Gorge",
	source : ["IST", 46],
	submenu : "[improves Pact of the Maw]",
	description : desc([
		"I can use an action to make a ranged spell attack with my tongue against a creature within 30",
		"feet of me. On a hit, the target is grappled and pulled to an unoccupied space adjacent to me.",
		"The grapple escape DC is equal to my spell save DC.",
		"While grappling a creature in this way, I have disadvantage on any attack rolls against creatures",
		"other than my grapple target, and I have advantage on on the melee spell attack to swallow my",
		"grapple target, as granted by the Pact of the Maw.",
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 18 && GetFeatureChoice('class', 'warlock', 'pact boon').indexOf("pact of the maw") !== -1;
	},
	weaponOptions : {
		baseWeapon : "net",
		regExpSearch : /tongue/i,
		name : "Tongue (Slavering Gorge)",
		source : ["IST", 46],
		ability : 6,
		range : "30 ft",
		damage : ["\u2015", "", "Grappled"],		
		abilitytodamage : true,
		description : "Creature hit is grappled, escape DC = my spell save DC",
		tooltip : "Special: Creatures hit are grappled and pulled to me. The grapple escape DC is my spell save DC.I have disadvantage on any attack rolls against creatures other than my grapple target, and I have advantage on on the melee spell attack to swallow my grapple target, as granted by the Pact of the Maw.",
	},
	weaponsAdd : ["Tongue (Slavering Gorge)"],//adds the tongue grapple attack to the attacks section. mechanically similar to the net, so that's what i've based it off.
});

AddSubClass("wizard", "sonomancy", {
	regExpSearch : /(sonomancy|sonomancer)/i,
	subname : "School of Sonomancy",
	fullname : "Sonomancer",
	source : ["IST", 47],
	features : {
		"subclassfeature2" : {
			name : "Channeling Sound",
			source : ["IST", 47],
			minlevel : 2,
			description : desc([
				"I gain proficiency with an instrument of my choice, and can use that instrument as a",
				"spellcasting focus. I also gain resistance to thunder damage.",
			]),
			dmgres : ["Thunder"],
			toolProfs : [["Musical Instrument", 1]]
		},
		"subclassfeature2.1" : {
			name : "Sound Weapons",
			source : ["IST", 47],
			minlevel : 2,
			description : desc([
				"When I finish a long rest, I can transform one weapon or magic weapon I am proficiency with",
				"into a Sound Weapon.",
				"Twice per short or long rest, as a bonus action, I can command my Sound Weapon to begin",
				"levitating in an unoccupied space within 5 feet. I can them immediately make a melee spell",
				"attack against a creature within 5 feet of the Sound Weapon, dealing the weapon's regular",
				"damage.",
				"My Sound Weapon deals thunder damage instead of its regular damage, but otherwise",
				"functions as if I were wielding it normally. As a bonus action on my turn, I can move the",
				"weapon up to 20 feet and make a melee spell attack against a target within 5 feet of it.",
				"I can catch the weapon and stop it levitating when it is within five feet of me as a free action.",
				"If I fall unconscious, the weapon drops to the ground.",
				"If I include the word 'Sound' in a weapon or magic weapon's name, it gets treated as my",
				"Sound Weapon.",
			]),
			limfeaname : "Levitate Sound Weapon",
			usages : 2,
			recovery : "short rest",
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (((v.isMeleeWeapon || v.theWea.isMagicWeapon || v.thisWeapon[1]) && (/\bsound\b/i).test(v.WeaponTextName))) {
							fields.Description += (fields.Description ? '; ' : '') + 'Levitate as bonus action, use Int. mod when levitating';
							fields.Damage_Type = "thunder";
						};//adds the levitate and changed mod (because it's a spell attack. it doesn't change the mod by default, since the sound weapon can still be used normally, and thus would use the regular mod. i may change this, not sure) when levitating to the description, and changes the damage type to thunder
					},
					"If I include the word 'Sound' in a weapon or magic weapon's name, it gets treated as my Sound Weapon.",
				]//functionally similar to the warlock pact weapon code
			}
			
		},
		"subclassfeature6" : {
			name : "Protective Vibration",
			source : ["IST", 47],
			minlevel : 6,
			description : desc([
				"As a reaction to a creature hitting me with a ranged weapon or spell attack, I can reduce the",
				"damage by 1d10 + my Wizard level.",
			]),
			additional : levels.map(function (n) {
				return "Reduce damage by 1d10 + " + n;
			}), 
			action : ["reaction", ""],
		},
		"subclassfeature10" : {
			name : "Perfect Pitch",
			source : ["IST", 47],
			minlevel : 10,
			description : desc([
				"I can cast spells without vocal components.",
				"Additionally, I gain advantage on all Wisdom (Perception) checks that rely on hearing, and 10",
				"feet of Blindsight.",
			]),
			vision : [["Blindsight", 10], ["Adv. on Perception checks that rely on hearing", 0]],
		},
		"subclassfeature14" : {
			name : "Additional Sound Weapon",
			source : ["IST", 47],
			minlevel : 14,
			description : desc([
				"I can summon an additional Sound Weapon. Both weapons can be levitated as a bonus action,",
				"and both can be individually commanded to move and attack as a bonus action on my turn.",
			]),
		}
	}
});




