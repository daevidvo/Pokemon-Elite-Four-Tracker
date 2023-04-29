INSERT INTO region(region_name)
VALUES 
('Kanto'), ('Hoenn'), ('Sinnoh');

INSERT INTO trainer(trainer_name, age, region_id)
VALUES 
('Lorelei', 25, 1), ('Bruno', 35, 1), ('Agatha', 75, 1), ('Lance', 29, 1), --Kanto
('Sidney', 21, 2), ('Phoebe', 20, 2), ('Glacia', 40, 2), ('Drake', 55, 2),  --Hoenn
('Aaron', 16, 3), ('Bertha', 63, 3), ('Flint', 27, 3), ('Lucian', 30, 3); --Sinnoh

INSERT INTO pokemon(name, category, trainer_id, strongest_in_party)
VALUES 
('Dewgong', 'Sea Lion Pokemon', 1, 5), ('Cloyster', 'Bivalve Pokemon', 1, 5), ('Slowbro', 'Hermit Crab Pokemon', 1, 5), ('Jynx', 'Human Shape Pokemon', 1, 5), ('Lapras', 'Transport Pokemon', 1), --Lorelei
('Hitmontop', 'Handstand Pokemon', 2, 10), ('Hitmonlee', 'Kicking Pokemon', 2, 10), ('Hitmonchan', 'Punching Pokemon', 2, 10), ('Onix', 'Rock Snake Pokemon', 2, 10), ('Machamp', 'Superpower Pokemon', 2), --Bruno
('Gengar', 'Shadow Pokemon', 3, 15), ('Golbat', 'Bat Pokemon', 3, 15), ('Haunter', 'Gas Pokemon', 3, 15), ('Arbok', 'Cobra Pokemon', 3, 15), ('Gengar', 'Shadow Pokemon', 3), --Agatha
('Gyarados', 'Atrocious Pokemon', 4, 20), ('Dragonair', 'Dragon Pokemon', 4, 20), ('Dragonair', 'Dragon Pokemon', 4, 20), ('Aerodactyl', 'Fossil Pokemon', 4, 20), ('Draognite', 'Dragon Pokemon', 4), --Lance
('Mightyena', 'Bite Pokemon', 5, 25), ('Shiftry', 'Wicked Pokemon', 5, 25), ('Cacturne', 'Scarecrow Pokemon', 5, 25), ('Sharpedo', 'Brutal Pokemon', 5, 25), ('Absol', 'Disaster Pokemon', 5), --Sidney
('Dusclops', 'Beckon Pokemon', 6, 30), ('Banette', 'Marionette Pokemon', 6, 30), ('Sableye', 'Darkness Pokemon', 6, 30), ('Banette', 'Marionette Pokemon', 6, 30), ('Dusclops', 'Beckon Pokemon', 6), --Phoebe
('Glalie', 'Face Pokemon', 7, 35), ('Sealeo', 'Ball Roll Pokemon', 7, 35), ('Sealeo', 'Ball Roll Pokemon', 7, 35), ('Glalie', 'Face Pokemon', 7, 35), ('Walrein', 'Ice Break Pokemon', 7), --Glacia
('Shelgon', 'Endurance Pokemon', 8, 40), ('Altaria', 'Humming Pokemon', 8, 40), ('Flygon', 'Mystic Pokemon', 8, 40), ('Flygon', 'Mystic Pokemon', 8, 40), ('Salamence', 'Dragon Pokemon', 8), --Drake
('Dustox', 'Poison Moth Pokemon', 9, 45), ('Heracross', 'Single Horn Pokemon', 9, 45), ('Vespiquen', 'Beehive Pokemon', 9, 45), ('Beautifly', 'Butterfly Pokemon', 9, 45), ('Drapion', 'Ogre Scorpion Pokemon', 9), --Aaron
('Quagsire', 'Water Fish Pokemon', 10, 50), ('Hippowdon', 'Heavyweight Pokemon', 10, 50), ('Sudowoodo', 'Imitation Pokemon', 10, 50), ('Whiscash', 'Whiskers Pokemon', 10, 50), ('Golem', 'Megaton Pokemon', 10), --Bertha
('Rapidash', 'Fire Horse Pokemon', 11, 55), ('Infernape', 'Fire Pokemon', 11, 55), ('Steelix', 'Iron Snake Pokemon', 11, 55), ('Lopunny', 'Rabbit Pokemon', 11, 55), ('Drifblim', 'Blimp Pokemon', 11), --Flint
('Mr. Mime', 'Barrier Pokemon', 12, 60), ('Girafarig', 'Long Neck Pokemon', 12, 60), ('Medicham', 'Meditate Pokemon', 12, 60), ('Alakazam', 'Psi Pokemon', 12, 60), ('Bronzong', 'Bronze Bell Pokemon', 12); --Lucian