// node modules
const fs = require('fs')
const mysql = require('mysql2')
const inquirer = require('inquirer')

// creating connection to the db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'elitefour_db'
    }
)

// inquirer

function viewRegions(){
    db.query(`SELECT * FROM region`,(err,results)=>{
        (err)?console.log(err):
        console.log(results)
    })
}
function viewTrainers(){
    db.query(`SELECT * FROM trainer`,(err,results)=>{
        (err)?console.log(err):
        console.log(results)
    })
}
function viewPokemon(){
    db.query(`SELECT * FROM pokemon`,(err,results)=>{
        (err)?console.log(err):
        console.log(results)
    })
}

function viewEliteFourPokemon(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'userChoiceViewEliteFourPokemon',
            message: 'Choose a Trainer',
            choices: [
                'Lorelei',
                'Bruno',
                'Agatha',
                'Lance',
                'Sidney',
                'Phoebe',
                'Glacia',
                'Drake',
                'Aaron',
                'Bertha',
                'Flint',
                'Lucian'
            ]
        }
    ])
    .then((data)=>{
        switch(data.userChoiceViewEliteFourPokemon){
            case 'Lorelei':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 1`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Bruno':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 2`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Agatha':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 3`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Lance':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 4`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Sidney':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 5`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Phoebe':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 6`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Glacia':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 7`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Drake':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 8`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Aaron':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 9`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Bertha':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 10`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Flint':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 11`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case 'Lucian':
                db.query(`SELECT * FROM pokemon WHERE trainer_id = 2`,(err,results)=>{
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
        }
    })
}

function viewRegionEliteFourPokemon(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'userChoiceViewRegionEliteFourPokemon',
            message: 'Choose a Region',
            choices: [
                'Kanto',
                'Hoenn',
                'Sinnoh'
            ]
        }
    ])
    .then((data)=>{
        switch(data.userChoiceViewRegionEliteFourPokemon){
            case 'Kanto':
                db.query(`SELECT region.name as region_name, pokemon.name as pokemon_name FROM region INNER JOIN trainer ON trainer.region_id = region.id INNER JOIN pokemon ON pokemon.trainer_id = trainer.id WHERE region.id = 1`,(err,results)=>{
                    (err)?console.error(err):console.table(results);
                })
                break;
            case 'Hoenn':
                db.query(`SELECT region.name as region_name, pokemon.name as pokemon_name FROM region INNER JOIN trainer ON trainer.region_id = region.id INNER JOIN pokemon ON pokemon.trainer_id = trainer.id WHERE region.id = 2`,(err,results)=>{
                    (err)?console.error(err):console.table(results);
                })
                break;
            case 'Sinnoh':
                db.query(`SELECT region.name as region_name, pokemon.name as pokemon_name FROM region INNER JOIN trainer ON trainer.region_id = region.id INNER JOIN pokemon ON pokemon.trainer_id = trainer.id WHERE region.id = 3`,(err,results)=>{
                    (err)?console.error(err):console.table(results);
                })
                break;
        }
    })
}


function viewEliteFourTotalAge(){
    db.query(`SELECT age FROM trainer`,(err,results)=>{
        if(err){
            console.error(err)
        }else{
            let sumAge = 0;
            for(let x=0;x<results.length;x=x+1){
                sumAge = Number(results[x].age) + sumAge
            }
            console.log(`The total years of experience of the Elite Four is: ${sumAge}`)
        }
    })
}

function addRegion(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newRegionName',
            message: 'What is the name of this new region?'
        }
    ])
    .then((data)=>{
        db.query(`INSERT INTO region(name) VALUE (?)`, data.newRegionName,(err,results)=>{
            if(err){
                console.error(err)
            }else{
                db.query(`SELECT * FROM region`,(err,results)=>{
                    (err)?console.error(err):console.table(results)
                })
                console.log('New region successfully added')
            }
        })
    })
}

function addTrainer(){
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
            validate: (input)=>{
                if(Number(input)){
                    return true
                }
                return false
            }
        },
        {
            type: 'input',
            name: 'newTrainerRegion',
            message: 'What is the new trainer\'s region?'
        },
    ])
    .then((data)=>{
        let newTrainerName = data.newTrainerName
        let newTrainerAge = data.newTrainerAge
        let newTrainerRegion = data.newTrainerRegion
        let flag = false
        db.query(`SELECT name, id FROM region`,(err,results)=>{
            if(err){
                console.log(err)
            }else{
                let regionArr = []
                let newTrainerRegionLowerCase = newTrainerRegion.toLowerCase();
                for(let x=0;x<results.length;x=x+1){
                    regionArr.push(results[x].name.toLowerCase())
                }
                if(!regionArr.includes(newTrainerRegionLowerCase)){
                    return console.log('Region does not exist, please add the new region first');
                }else{
                    newTrainerRegion = newTrainerRegionLowerCase.charAt(0).toUpperCase()+newTrainerRegionLowerCase.slice(1)
                    for(let x=0;x<results.length;x=x+1){
                        if(newTrainerRegion === results[x].name){
                            newTrainerRegion = results[x].id
                        }
                    }
                    flag = true;
                }
                if(flag){
                    db.query(`INSERT INTO trainer(name, age, region_id) VALUES (?, ?, ?)`, [newTrainerName, newTrainerAge, newTrainerRegion],(err,results)=>{
                        if(err){
                            console.error(err)
                        }else{
                            db.query(`SELECT * FROM trainer`,(err,results)=>{
                                (err)?console.error(err):console.table(results)
                            })
                            console.log('New trainer successfully added')
                        }
                    })
                }
            }

        })
    })
}

function addPokemon(){
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
        let newPokemonName = data.newPokemonName.charAt(0).toUpperCase()+data.newPokemonName.slice(1)
        let newPokemonCategory = data.newPokemonCategory
        let newPokemonTrainer = data.newPokemonTrainer.charAt(0).toUpperCase()+data.newPokemonTrainer.slice(1)
        let newPokemonStrongestInParty = data.newPokemonStrongestInParty.charAt(0).toUpperCase()+data.newPokemonStrongestInParty.slice(1)
        let flag = false;
        db.query(`SELECT name, id FROM trainer`,(err,results)=>{
            if(err){
                console.error(err)
            }else{
                let trainerArr = []
                for(let x=0;x<results.length;x=x+1){
                    trainerArr.push(results[x].name.toLowerCase())
                }
                let newPokemonTrainerLowerCase = newPokemonTrainer.toLowerCase()
                if(!trainerArr.includes(newPokemonTrainerLowerCase)){
                    return console.log('Trainer does not exist, please add them first')
                }else{
                    for(let x=0;x<results.length;x=x+1){
                        if(newPokemonTrainer === results[x].name){
                            newPokemonTrainer = results[x].id
                        }
                    }
                    db.query(`SELECT name, id FROM pokemon`,(err,results)=>{
                        if(err){
                            console.err(err)
                        }else{
                            let pokemonArr = []
                            for(let x=0;x<results.length;x=x+1){
                                pokemonArr.push(results[x].name.toLowerCase())
                            }
                            let newPokemonStrongestInPartyLowerCase = newPokemonStrongestInParty.toLowerCase()
                            if(newPokemonStrongestInPartyLowerCase !== 'null' && !pokemonArr.includes(newPokemonStrongestInPartyLowerCase)){
                                return console.log('This strongest pokemon doesn\'t exist, please add them to the list')
                            }else{
                                for(let x=0;x<results.length;x=x+1){
                                    if(newPokemonStrongestInParty === results[x].name){
                                        newPokemonStrongestInParty = results[x].id
                                    }
                                }
                                if(newPokemonStrongestInPartyLowerCase === 'null'){
                                    newPokemonStrongestInParty = null;
                                }
                                db.query(`INSERT INTO pokemon(name, category, trainer_id, strongest_in_party) VALUES (?,?,?,?)`, [newPokemonName,newPokemonCategory,newPokemonTrainer,newPokemonStrongestInParty],(err,results)=>{
                                    if(err){
                                        console.error(err)
                                    }else{
                                        db.query(`SELECT * FROM pokemon`,(err,results)=>{
                                            (err)?console.error(err):console.table(results)
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    })
}

function startInq(){
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
                'Update the Strongest Pokemon in a Party',
                'Delete a Region',
                'Delete a Trainer',
                'Delete a Pokemon'
            ]
        },
    ])
    .then((data)=>{
        switch(data.userChoice){
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

                break;
            case 'Update the Strongest Pokemon in a Party':

                break;
            case 'Delete a Region':

                break;
            case 'Delete a Trainer':

                break;
            case 'Delete a Pokemon':

                break;
        }
    })
};

startInq();
















