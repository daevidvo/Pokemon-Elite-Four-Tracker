// node modules
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
        (err)?console.error(err):
        console.table(results)
    })
}
function viewTrainers(){
    db.query(`SELECT * FROM trainer`,(err,results)=>{
        (err)?console.error(err):
        console.table(results)
    })
}
function viewPokemon(){
    db.query(`SELECT * FROM pokemon`,(err,results)=>{
        (err)?console.error(err):
        console.table(results)
    })
}

function viewEliteFourPokemon(){
   let eliteFourArr = []
   db.query(`SELECT name FROM trainer`,(err,results)=>{
    if(err){
        console.error(err)
    }else{
        for(let x=0;x<results.length;x=x+1){
            eliteFourArr.push(results[x].name)
        }
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'trainer',
                message: 'Which trainer\'s pokemon would you like to view?',
                choices: eliteFourArr
            }
        ])
        .then((data)=>{
            db.query(`SELECT pokemon.id as id,pokemon.name as pokmon_name,pokemon.category as category,pokemon.strongest_in_party FROM pokemon INNER JOIN trainer ON trainer.id = pokemon.trainer_id WHERE trainer.name = ?`,data.trainer,(err,results)=>{
                (err)?console.error(err):console.table(results)
            })
        })
    }
   })
}

function viewRegionEliteFourPokemon(){
    let regionArr = []
    db.query(`SELECT name FROM region`,(err,results)=>{
        if(err){
            console.error(err)
        }else{
            for(let x=0;x<results.length;x=x+1){
                regionArr.push(results[x].name)
            }
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'region',
                    message: 'Which region\'s Elite Four pokemon would you like to view?',
                    choices: regionArr
                }
            ])
            .then((data)=>{
                db.query(`SELECT pokemon.name as pokemon_name FROM region INNER JOIN trainer ON trainer.region_id = region.id INNER JOIN pokemon ON pokemon.trainer_id = trainer.id WHERE region.name = ?`,data.region,(err,results)=>{
                    (err)?console.error(err):console.table(results)
                })
            })
        }
    })
}


function viewEliteFourTotalAge(){
    db.query(`SELECT SUM(age) as total_years_of_experience FROM trainer`,(err,results)=>{
        if(err){
            console.error(err)
        }else{
            console.table(results[0])
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
        let newRegion = data.newRegionName.charAt(0).toUpperCase()+data.newRegionName.slice(1)
        db.query(`INSERT INTO region(name) VALUE (?)`, newRegion,(err,results)=>{
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
        let newTrainerName = data.newTrainerName.charAt(0).toUpperCase()+data.newTrainerName.slice(1)
        let newTrainerAge = data.newTrainerAge
        let newTrainerRegion = data.newTrainerRegion
        let flag = false
        db.query(`SELECT name, id FROM region`,(err,results)=>{
            if(err){
                console.error(err)
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

function updatePokemonTrainer(){
    db.query(`SELECT name FROM trainer`,(err,results)=>{
        let trainerArr = []
        if(err){
            console.error(err)
        }else{
            for(let x=0;x<results.length;x=x+1){
                trainerArr.push(results[x].name)
            }
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'pokemonTrainer',
                        message: 'Which trainer owns this pokemon?',
                        choices: trainerArr
                    }
                ])
                .then((data)=>{
                    db.query(`SELECT pokemon.name, pokemon.id FROM pokemon INNER JOIN trainer ON trainer.id = pokemon.trainer_id WHERE trainer.name = ?`, data.pokemonTrainer, (err,results)=>{
                        if(err){
                            console.error(err)
                        }else{
                            console.table(results)
                            let selectedPokemonArr = []
                            for(let x=0;x<results.length;x=x+1){
                                selectedPokemonArr.push(results[x].id)
                            }
                            inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'selectedPokemonId',
                                    message: 'Which pokemon would you like to update? (refer to the table above to select the correct ID)',
                                    choices: selectedPokemonArr
                                }
                            ])
                            .then((data)=>{
                                let selectedPokemonId = data.selectedPokemonId
                                inquirer
                                .prompt([
                                    {
                                        type: 'list',
                                        name: 'updatedPokemonTrainer',
                                        message: 'Who is the new trainer for this pokmeon?',
                                        choices: trainerArr
                                    }
                                ])
                                .then((data)=>{
                                    let selectedNewTrainer = data.updatedPokemonTrainer

                                    db.query(`SELECT pokemon.name as pokemon_name,trainer.name as trainer_name FROM pokemon INNER JOIN trainer ON pokemon.trainer_id = trainer.id WHERE pokemon.id = ?`,selectedPokemonId,(err,results)=>{
                                        if(err){
                                            console.error(err)
                                        }else{
                                            console.log('OLD POKEMON DATA')
                                            console.table(results)
                                        }
                                    })
                                    db.query(`SELECT id FROM trainer WHERE name = ?`,selectedNewTrainer,(err,results)=>{
                                        if(err){
                                            console.error(err)
                                        }else{
                                            db.query(`UPDATE pokemon set trainer_id = ? WHERE id = ?`, [results[0].id, selectedPokemonId],(err,results)=>{
                                                if(err){
                                                    console.error(err)
                                                }else{
                                                    db.query(`SELECT pokemon.name as pokemon_name,trainer.name as trainer_name FROM pokemon INNER JOIN trainer ON pokemon.trainer_id = trainer.id WHERE pokemon.id = ?`,selectedPokemonId,(err,results)=>{
                                                        if(err){
                                                            console.error(err)
                                                        }else{
                                                            console.log('NEW POKEMON DATA')
                                                            console.table(results)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
        }
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
                updatePokemonTrainer();
                break;
        }
    })
};

startInq();
















