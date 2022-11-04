/*	-INFORMATION-
	Subject:	Background and Background Feature
	Effect:		This is the syntax for adding a new background and the syntax for adding a new background feature below it
	Sheet:		v12.999 (2017-12-16)
*/

var iFileName = "Fugitive Background for MPMB's Character Sheet by decoratedboar.js";
RequiredSheetVersion(12.999);

BackgroundList["Fugitive"] = {
	
	regExpSearch : /fugitive/i,

	name : "Fugitive",

	source : ["HB", 0],

	skills : ["Deception", "Stealth"], 

	gold : 15,

	//equipleft : [
	//	["Scroll of pedigree", "", ""],
	//	["Skin of fine zzar or wine", "", 5],
	//],

	equipright : [
		["Dark, common clothes with hood", "", 3],
		["Memento from former life", "", ""],
		["Belt pouch (with coins)", "", 1],
	],

	feature : "On The Run",

	trait : [
		"I'm always looking over my shoulder. Some call me paranoid, but one can never be too careful.",
		"I'm slow to trust, and tend to suspect everyone who isn't a trusted ally is secretly plotting against me.",
		"Everything that could go wrong for me so far has, and I've learned to be prepared for the worst.",
		"I seldom speak, making my words count when I do. Loose lips sink ships, and I don't want to give anything about myself away to the wrong person.",
		"I am completely average, or try to be, at least. I find it's the best way to blend in.",
		"Authority anywhere is not to be trusted; even a guard in the smallest town could be on the lookout just for me.",
		"I find myself easily startled by loud noises and sudden movements, sometimes scaring others more than myself in reaction.",
		"I know just how to talk my way into or out of the most tense situations."
	], //required; A list of the personality traits that can be chosen using the "Add Features" button on the second page. This list can be any length.

	ideal : [
		["Revenge",
			"Revenge. The best kind of justice is that which one can exact themselves. One day, I will have my revenge on those who accused me. (Chaotic)"
		],
		["Stoicism",
			"Stoicism. I would never betray my people, or my ideals. My pursuers have accused me despite this, and will eventually face justice. (Lawful)"
		],
		["Criminality",
			"Criminality. Whether I'm guilty of my accused crimes or not, I'm a wanted person. There's no harm in succumbing to further criminal urges, right? (Evil)"
		],
		["Chaos",
			"They think I'm a violent fugitive? Oh, I'll show them violent. (Chaotic)"
		],
		["Truth",
			"Truth. Everything anyone has heard of me is lies, fabricated by my pursuers. If I could only show everyone the truth, and prove my innocence, I could be free. (Neutral)"
		],
		["Escape",
			"Escape. If I can't hide, I can run, and if I have to run forever, I will. (Any)"
		],
	], //required; A list of the  ideals that can be chosen using the "Add Features" button on the second page. This list can be any length. Take note of the two-step build for every ideal, this is essential!

	bond : [
		"I had a family and friends once, but I had to either leave them behind or leave them for dead when I went on the run. The guilt from this still plagues me.",
		"One day, no matter what it takes, I will prove my innocence, absolve myself of the crime I was framed for, and bring those responsible to justice.",
		"I know who set me up, who wants me jailed or imprisoned. One day, I will have their head, laws and courts be damned.",
		"Though my past continues to haunt me and nip at my heels, all I truly want is my old life back.",
		"People who used I used to love now hate me for what I may or may not have done, and I would do anything to win their affection back.",
		"I owe someone a great debt for helping me escape my pursuers, and one day, I can only hope to pay them back for it."
	], //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.

	flaw : [
		"I'm used to having to leave people behind, and should the opportunity arise where I have to, I likely won't look back.",
		"My pursuers are of a particular race, order, or group that I tend to harbour resentment to all members of, even if they're not associated with the people I'm running from.",
		"In times of danger, I prefer to stab first, and ask questions later.",
		"I've led everyone who'll listen to believe I've been wrongfully accused of a crime, but in actual fact, I am as guilty my pursuers claim I am.",
		"Instead of facing my problems with confidence, I most often prefer to stick my head in the sand, or run away.",
		"I'm a particularly distinctive character, and tend to stick out in crowds like a sore thumb at the best of times. "
	],  //required; A list of the bonds that can be chosen using the "Add Features" button on the second page. This list can be any length.

	extra : [
		"Select a Past Crime",
		"Framed",
		"Grand conspiracy",
		"Wanted: dead or alive",
		"Criminal at large",
		"Lone revolutionary",
		"Debtor"
	],

/* SYNTAX CHANGE v12.998 >> old syntax for 'tools' and 'languages' are no longer supported!! */
	toolProfs : [["Forgery Kit", 1], ["Disguise Kit", 1]], // optional; this is an array with the tool proficiencies gained. Each entry can be its own array of 2 entries. The first entry is the name of the tool and the second entry is either 1) a number if the tool is yet to be chosen, or 2) the 3-letter ability score abbreviation if the tool is to be listed in the skill section and have a bonus calculated

	languageProfs : [1], // optional; this is an array of the language proficiencies gained. An entry can either be 1) a string that represents the language learned or 2) a number which is the number of language gained that can be chosen by the player

	//variant : ["urban bounty hunter", "pirate"], //optional; the variants this background has, using the exact names of the entry of the variant in the BackgroundSubList. If you don't want to define a variant, you can remove this line

	//lifestyle : "comfortable", //optional; sets the lifestyle of the sheet. Options are: "wretched", "squalid", "poor", "modest", "comfortable", "wealthy", or "aristocratic"
};

BackgroundFeatureList["on the run"] = {  //Note the use of only lower case!
	description : "You've been running from your past for so long that you've picked up quite a knack for it. When in any town or city, it's easier for you to find places to stay where people won't rat you out. In addition to this, you know to keep an ear to the ground. You're normally the first to hear about it when the people who are pursuing you are present somewhere, or when something newsworthy involving them happens.", //required; the description of the feature as it will be put on the sheet. Make sure that this fits into the field or it won't look so pretty.

	source : ["HB", 0],
};