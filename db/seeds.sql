INSERT INTO region(name)
VALUES 
('Kanto'), ('Hoenn'), ('Sinnoh');

INSERT INTO trainer(name, age, region_id)
VALUES 
('Lorelei', 25, 1), ('Bruno', 35, 1), ('Agatha', 75, 1), ('Lance', 29, 1),
('Sidney', 21, 2), ('Phoebe', 20, 2), ('Glacia', 40, 2), ('Drake', 55, 2),
('Aaron', 16, 3), ('Bertha', 63, 3), ('Flint', 27, 3), ('Lucian', 30, 3);

INSERT INTO pokemon(name, category, trainer_id, strongest_in_party)
VALUES 
('Lapras', 'Transport Pokemon', 1, NULL), ('Dewgong', 'Sea Lion Pokemon', 1, 1), ('Cloyster', 'Bivalve Pokemon', 1, 1), ('Slowbro', 'Hermit Crab Pokemon', 1, 1), ('Jynx', 'Human Shape Pokemon', 1, 1),
('Machamp', 'Superpower Pokemon', 2, NULL), ('Hitmontop', 'Handstand Pokemon', 2, 6), ('Hitmonlee', 'Kicking Pokemon', 2, 6), ('Hitmonchan', 'Punching Pokemon', 2, 6), ('Onix', 'Rock Snake Pokemon', 2, 6), 
('Gengar', 'Shadow Pokemon', 3, NULL), ('Gengar', 'Shadow Pokemon', 3, 11), ('Golbat', 'Bat Pokemon', 3, 11), ('Haunter', 'Gas Pokemon', 3, 11), ('Arbok', 'Cobra Pokemon', 3, 11), 
('Draognite', 'Dragon Pokemon', 4, NULL), ('Gyarados', 'Atrocious Pokemon', 4, 16), ('Dragonair', 'Dragon Pokemon', 4, 16), ('Dragonair', 'Dragon Pokemon', 4, 16), ('Aerodactyl', 'Fossil Pokemon', 4, 16), 
('Absol', 'Disaster Pokemon', 5, NULL), ('Mightyena', 'Bite Pokemon', 5, 21), ('Shiftry', 'Wicked Pokemon', 5, 21), ('Cacturne', 'Scarecrow Pokemon', 5, 21), ('Sharpedo', 'Brutal Pokemon', 5, 21), 
('Dusclops', 'Beckon Pokemon', 6, NULL), ('Dusclops', 'Beckon Pokemon', 6, 26), ('Banette', 'Marionette Pokemon', 6, 26), ('Sableye', 'Darkness Pokemon', 6, 26), ('Banette', 'Marionette Pokemon', 6, 26), 
('Walrein', 'Ice Break Pokemon', 7, NULL), ('Glalie', 'Face Pokemon', 7, 31), ('Sealeo', 'Ball Roll Pokemon', 7, 31), ('Sealeo', 'Ball Roll Pokemon', 7, 31), ('Glalie', 'Face Pokemon', 7, 31), 
('Salamence', 'Dragon Pokemon', 8, NULL), ('Shelgon', 'Endurance Pokemon', 8, 36), ('Altaria', 'Humming Pokemon', 8, 36), ('Flygon', 'Mystic Pokemon', 8, 36), ('Flygon', 'Mystic Pokemon', 8, 36), 
('Drapion', 'Ogre Scorpion Pokemon', 9, NULL), ('Dustox', 'Poison Moth Pokemon', 9, 41), ('Heracross', 'Single Horn Pokemon', 9, 41), ('Vespiquen', 'Beehive Pokemon', 9, 41), ('Beautifly', 'Butterfly Pokemon', 9, 41),  
('Golem', 'Megaton Pokemon', 10, NULL), ('Quagsire', 'Water Fish Pokemon', 10, 46), ('Hippowdon', 'Heavyweight Pokemon', 10, 46), ('Sudowoodo', 'Imitation Pokemon', 10, 46), ('Whiscash', 'Whiskers Pokemon', 10, 46), 
('Drifblim', 'Blimp Pokemon', 11, NULL), ('Rapidash', 'Fire Horse Pokemon', 11, 51), ('Infernape', 'Fire Pokemon', 11, 51), ('Steelix', 'Iron Snake Pokemon', 11, 51), ('Lopunny', 'Rabbit Pokemon', 11, 51), 
('Bronzong', 'Bronze Bell Pokemon', 12, NULL), ('Mr. Mime', 'Barrier Pokemon', 12, 56), ('Girafarig', 'Long Neck Pokemon', 12, 56), ('Medicham', 'Meditate Pokemon', 12, 56), ('Alakazam', 'Psi Pokemon', 12, 56);