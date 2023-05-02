// node modules
const mysql = require('mysql2');
const inquirer = require('inquirer');

// creating connection to the db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'elitefour_db'
    }
);

// functions for inquirer
function viewRegions(){ // function to view all regions
    db.query(`SELECT * FROM region`,(err,results)=>{
        (err)?console.error(err):console.table(results);
    });
};
function viewTrainers(){ // function to view all trainers
    db.query(`SELECT * FROM trainer`,(err,results)=>{
        (err)?console.error(err):console.table(results);
    });
};
function viewPokemon(){ // function to view all pokemon
    db.query(`SELECT * FROM pokemon`,(err,results)=>{
        (err)?console.error(err):console.table(results);
    });
};

function viewEliteFourPokemon(){ // function to view a specific elite four trainer's pokemon
   let eliteFourArr = [] // making an empty array which we'll populate with the updated elite four trainer's names to use later
   db.query(`SELECT name FROM trainer`,(err,results)=>{ // grabbing all of the names from the trainer table
    if(err){
        console.error(err);
    }else{
        for(let x=0;x<results.length;x=x+1){ // putting the trainers into the eliteFourArr
            eliteFourArr.push(results[x].name);
        }
        inquirer // uses the eliteFourArr as the choices for our prompt
        .prompt([
            {
                type: 'list',
                name: 'trainer',
                message: 'Which trainer\'s pokemon would you like to view?',
                choices: eliteFourArr,
                loop: false
            }
        ])
        .then((data)=>{ // takes the user input from the previous question and uses it to show all of the pokemon that that specific trainer owns
            db.query(`SELECT pokemon.id as id,pokemon.name as pokmon_name,pokemon.category as category,pokemon.strongest_in_party FROM pokemon INNER JOIN trainer ON trainer.id = pokemon.trainer_id WHERE trainer.name = ?`,data.trainer,(err,results)=>{
                (err)?console.error(err):console.table(results)
            });
        });
    };
   });
};

function viewRegionEliteFourPokemon(){ // function for viewing all of a region's elite four's pokemon.
    let regionArr = []
    db.query(`SELECT name FROM region`,(err,results)=>{ // query db for all of the region names and puts them in an array that the user will choose from in the following prompt
        if(err){
            console.error(err);
        }else{
            for(let x=0;x<results.length;x=x+1){
                regionArr.push(results[x].name);
            }
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'region',
                    message: 'Which region\'s Elite Four pokemon would you like to view?',
                    choices: regionArr,
                    loop: false
                }
            ])
            .then((data)=>{ // uses the user input and shows all of the elite four's pokemons from that region through inner joins in mysql.
                db.query(`SELECT pokemon.name as pokemon_name FROM region INNER JOIN trainer ON trainer.region_id = region.id INNER JOIN pokemon ON pokemon.trainer_id = trainer.id WHERE region.name = ?`,data.region,(err,results)=>{
                    (err)?console.error(err):console.table(results)
                });
            });
        };
    });
};

function viewEliteFourTotalAge(){ // does a query that will sum up the ages for all of the trainers and return that age in the end
    db.query(`SELECT name,id FROM region`,(err,results)=>{
        if(err){
            console.error(err)
        }else{
            let regionArr = []
            for(let x=0;x<results.length;x=x+1){
                regionArr.push(results[x].name)
            }
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'region',
                    message: 'Which region would you like to choose?',
                    choices: regionArr,
                    loop: false
                }
            ])
            .then((data)=>{
                for(let x=0;x<results.length;x=x+1){
                    if(data.region === results[x].name){
                        data.region = results[x].id
                    }
                }
                db.query(`SELECT SUM(trainer.age) as total_years_of_experience FROM trainer INNER JOIN region ON trainer.region_id = region.id WHERE region.id = ? `,data.region,(err,results)=>{
                    if(err){
                        console.error(err)
                    }else{
                        console.table(results[0])
                    }
                })
            })
        }
    })
};

function addRegion(){ // adds a new region based on user input
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newRegionName',
            message: 'What is the name of this new region?'
        }
    ])
    .then((data)=>{
        let newRegion = data.newRegionName.charAt(0).toUpperCase()+data.newRegionName.slice(1) // capitalizes the first letter of the new region's name
        db.query(`INSERT INTO region(name) VALUE (?)`, newRegion,(err,results)=>{ // inserts the new region into the table
            if(err){
                console.error(err);
            }else{ // confirmation to the user that the new region was added
                db.query(`SELECT * FROM region`,(err,results)=>{
                    (err)?console.error(err):console.table(results);
                })
                console.log('New region successfully added');
            };
        });
    });
};

function addTrainer(){ // adds new trainer to the trainer table
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newTrainerName',
            message: 'What is the name of the new trainer?'
        },
        {
            type: 'input',
            name: 'newTrainerAge',
            message: 'What is the age of the new trainer? (Numbers only)',
            validate: (input)=>{ // makes sure that the user input is always a number
                if(Number(input)){
                    return true;
                }
                return false;
            }
        },
        {
            type: 'input',
            name: 'newTrainerRegion',
            message: 'What is the new trainer\'s region?'
        },
    ])
    .then((data)=>{
        let newTrainerName = data.newTrainerName.charAt(0).toUpperCase()+data.newTrainerName.slice(1); // capitalizes the new trainer's name
        let newTrainerAge = data.newTrainerAge;
        let newTrainerRegion = data.newTrainerRegion;
        let flag = false; // flag that we'll use to decide whether to continue the function later on
        db.query(`SELECT name, id FROM region`,(err,results)=>{
            if(err){
                console.error(err);
            }else{
                let regionArr = [];
                let newTrainerRegionLowerCase = newTrainerRegion.toLowerCase(); // lower cases the new trainer's region str
                for(let x=0;x<results.length;x=x+1){
                    regionArr.push(results[x].name.toLowerCase()); // adds all of the lower cased region's names to the regionArr
                }
                if(!regionArr.includes(newTrainerRegionLowerCase)){ // checks if the new trainer's region already exists, if it doesn't, then it will return the console.log and end the function
                    return console.log('Region does not exist, please add the new region first');
                }else{
                    newTrainerRegion = newTrainerRegionLowerCase.charAt(0).toUpperCase()+newTrainerRegionLowerCase.slice(1); // capitalizes the first letter of the new trainer's region
                    for(let x=0;x<results.length;x=x+1){ // iterates through the results from the previous query and finds the region that makes the new trainer's region and sets the newTrainerRegion to equal the region's ID so we can put it into the db properly
                        if(newTrainerRegion === results[x].name){
                            newTrainerRegion = results[x].id;
                        }
                    }
                    flag = true; // sets flag to true so the next part of the function occurs. if the function never reaches this (i.e. if the region doesn't exist), then the next if statement won't execute
                }
                if(flag){
                    db.query(`INSERT INTO trainer(name, age, region_id) VALUES (?, ?, ?)`, [newTrainerName, newTrainerAge, newTrainerRegion],(err,results)=>{ // finally puts the new trainer's information into the table if all of the other tests passes
                        if(err){
                            console.error(err);
                        }else{
                            db.query(`SELECT * FROM trainer`,(err,results)=>{ // shows the updated trainer table with the new trainer information inserted
                                (err)?console.error(err):console.table(results);
                            })
                            console.log('New trainer successfully added'); // confirmation message
                        };
                    });
                };
            };

        });
    });
};

function addPokemon(){ // adds a new pokemon
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newPokemonName',
            message: 'What is the name of the new pokemon?'
        },
        {
            type: 'input',
            name: 'newPokemonCategory',
            message: 'What is the category of the new pokemon?'
        },
        {
            type: 'input',
            name: 'newPokemonTrainer',
            message: 'Who is the new pokemon\'s trainer?'
        },
        {
            type: 'input',
            name: 'newPokemonStrongestInParty',
            message: 'What pokemon is the strongest in this party? type NULL if unapplicable'
        }
    ])
    .then((data)=>{
        let newPokemonName = data.newPokemonName.charAt(0).toUpperCase()+data.newPokemonName.slice(1); // capitalizes the first letter of the new pokemon's name
        let newPokemonCategory = data.newPokemonCategory;
        let newPokemonTrainer = data.newPokemonTrainer.charAt(0).toUpperCase()+data.newPokemonTrainer.slice(1); // capitalizes the first letter of the new pokemon's trainer
        let newPokemonStrongestInParty = data.newPokemonStrongestInParty.charAt(0).toUpperCase()+data.newPokemonStrongestInParty.slice(1); //  // capitalizes the first letter of the new pokemon's strongest party pokemon
        db.query(`SELECT name, id FROM trainer`,(err,results)=>{ // grabs all of the trainer names and ids
            if(err){
                console.error(err);
            }else{
                let trainerArr = [];
                for(let x=0;x<results.length;x=x+1){ // puts all of the trainer names in to trainerArr
                    trainerArr.push(results[x].name.toLowerCase());
                }
                let newPokemonTrainerLowerCase = newPokemonTrainer.toLowerCase(); // lower cases the new pokemon's trainer
                if(!trainerArr.includes(newPokemonTrainerLowerCase)){ // checks to see if the new pokemon's trainer exists in the trainerArr; if they don't, then it would end the function and return the console.log
                    return console.log('Trainer does not exist, please add them first');
                }else{
                    for(let x=0;x<results.length;x=x+1){ // iterates through all of the trainers and find the trainer that matches the new pokemon's trainer name then sets newPokemonTrainer equal to the id of that trainer so we can put it into the pokemon table properly
                        if(newPokemonTrainer === results[x].name){
                            newPokemonTrainer = results[x].id;
                        }
                    };
                    db.query(`SELECT name, id FROM pokemon`,(err,results)=>{ // everything in this query's functions the same way as the previous query's functions except it checks to see if the strongest pokemon exists
                        if(err){
                            console.err(err);
                        }else{
                            let pokemonArr = [];
                            for(let x=0;x<results.length;x=x+1){
                                pokemonArr.push(results[x].name.toLowerCase());
                            }
                            let newPokemonStrongestInPartyLowerCase = newPokemonStrongestInParty.toLowerCase();
                            if(newPokemonStrongestInPartyLowerCase !== 'null' && !pokemonArr.includes(newPokemonStrongestInPartyLowerCase)){ // if the user's value of the strongestInParty isn't null and the strongest pokemon doesn't exist then it will end the function and return the console.log
                                return console.log('This strongest pokemon doesn\'t exist, please add them to the list');
                            }else{
                                for(let x=0;x<results.length;x=x+1){
                                    if(newPokemonStrongestInParty === results[x].name){
                                        newPokemonStrongestInParty = results[x].id;
                                    };
                                };
                                if(newPokemonStrongestInPartyLowerCase === 'null'){ // turns the 'null' string from the inquirer prompt equal to the falsy null value
                                    newPokemonStrongestInParty = null;
                                };
                                db.query(`INSERT INTO pokemon(name, category, trainer_id, strongest_in_party) VALUES (?,?,?,?)`, [newPokemonName,newPokemonCategory,newPokemonTrainer,newPokemonStrongestInParty],(err,results)=>{ // if the previous tests pass then the new pokemon will be created
                                    if(err){
                                        console.error(err);
                                    }else{
                                        db.query(`SELECT * FROM pokemon`,(err,results)=>{ // verifies to the user that the new pokemon was created
                                            (err)?console.error(err):console.table(results);
                                        });
                                    };
                                });
                            };
                        };
                    });
                };
            };
        });
    });
};

function updatePokemonTrainer(){ // updates the pokemon's trainer
    db.query(`SELECT name FROM trainer`,(err,results)=>{
        let trainerArr = []; // puts all of the trainer's names into an array that we'll use later on as choices in our inquirer prompts
        if(err){
            console.error(err);
        }else{
            for(let x=0;x<results.length;x=x+1){
                trainerArr.push(results[x].name);
            }
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'pokemonTrainer',
                        message: 'Which trainer owns this pokemon?',
                        choices: trainerArr,
                        loop: false
                    }
                ])
                .then((data)=>{ // uses the user's chosen trainer and grabs all of the pokemon that that trainer owns currently
                    db.query(`SELECT pokemon.name, pokemon.id FROM pokemon INNER JOIN trainer ON trainer.id = pokemon.trainer_id WHERE trainer.name = ?`, data.pokemonTrainer, (err,results)=>{
                        if(err){
                            console.error(err);
                        }else{
                            console.table(results); // shows the pokemon and their respective id
                            let selectedPokemonArr = []; // this array will be used later on as choices in the next inquirer prompt so the user can choose which pokemon they want to update
                            for(let x=0;x<results.length;x=x+1){
                                selectedPokemonArr.push(results[x].id);
                            }
                            inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'selectedPokemonId',
                                    message: 'Which pokemon would you like to update? (refer to the table above to select the correct ID)',
                                    choices: selectedPokemonArr,
                                    loop: false
                                }
                            ])
                            .then((data)=>{
                                let selectedPokemonId = data.selectedPokemonId; // this is the pokemon who's trainer will be updated
                                inquirer
                                .prompt([
                                    {
                                        type: 'list',
                                        name: 'updatedPokemonTrainer',
                                        message: 'Who is the new trainer for this pokmeon?',
                                        choices: trainerArr,
                                        loop: false
                                    }
                                ])
                                .then((data)=>{
                                    let selectedNewTrainer = data.updatedPokemonTrainer;
                                    db.query(`SELECT pokemon.name as pokemon_name,trainer.name as trainer_name FROM pokemon INNER JOIN trainer ON pokemon.trainer_id = trainer.id WHERE pokemon.id = ?`,selectedPokemonId,(err,results)=>{ // shows the select pokemon's name and old trainer
                                        if(err){
                                            console.error(err);
                                        }else{
                                            console.log('OLD POKEMON DATA');
                                            console.table(results);
                                        };
                                    });
                                    db.query(`SELECT id FROM trainer WHERE name = ?`,selectedNewTrainer,(err,results)=>{
                                        if(err){
                                            console.error(err);
                                        }else{
                                            db.query(`UPDATE pokemon set trainer_id = ? WHERE id = ?`, [results[0].id, selectedPokemonId],(err,results)=>{ // updates the selected pokemon's trainer
                                                if(err){
                                                    console.error(err);
                                                }else{
                                                    db.query(`SELECT pokemon.name as pokemon_name,trainer.name as trainer_name FROM pokemon INNER JOIN trainer ON pokemon.trainer_id = trainer.id WHERE pokemon.id = ?`,selectedPokemonId,(err,results)=>{ // shows the select pokemon's name and new trainer
                                                        if(err){
                                                            console.error(err);
                                                        }else{
                                                            console.log('NEW POKEMON DATA');
                                                            console.table(results);
                                                        };
                                                    });
                                                };
                                            });
                                        };
                                    });
                                });
                            });
                        };
                    });
                });
        };
    });
};

function startInq(){ // initial prompt to view everything
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: [
                'View Regions', 
                'View Trainers', 
                'View Pokemon', 
                'View an Elite Four\'s Pokemon', 
                'View a Region\'s Elite Four Pokemon', 
                'View the Elite Four\'s Total Years of Experience',
                'Add a Region',
                'Add a Trainer',
                'Add a Pokemon',
                'Update a Pokemon\'s Trainer',
            ],
            loop: false
        },
    ])
    .then((data)=>{
        switch(data.userChoice){ // based on the user choice, the switch case function will execute their respective function
            case 'View Regions':
                viewRegions();
                break;
            case 'View Trainers':
                viewTrainers();
                break;
            case 'View Pokemon':
                viewPokemon();
                break;
            case 'View an Elite Four\'s Pokemon':
                viewEliteFourPokemon();
                break;
            case 'View a Region\'s Elite Four Pokemon':
                viewRegionEliteFourPokemon();
                break;
            case 'View the Elite Four\'s Total Years of Experience':
                viewEliteFourTotalAge();
                break;
            case 'Add a Region':
                addRegion();
                break;
            case 'Add a Trainer':
                addTrainer();
                break;
            case 'Add a Pokemon':
                addPokemon();
                break;
            case 'Update a Pokemon\'s Trainer':
                updatePokemonTrainer();
                break;
        };
    });
};

startInq(); // starts everything