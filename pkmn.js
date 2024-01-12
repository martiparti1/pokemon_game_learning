$(document).ready(function(){

    class Pokemon {
        constructor(name, type1, type2, frontSprite, generation, evolutionType) {
            this.name = name;
            this.type1 = type1;
            this.type2 = type2;
            this.frontSprite = frontSprite;
            this.generation = generation;
            this.evolutionType = evolutionType
        }
    }
    
    var pokemonArray = []
    async function fetchAndProcessPokemonData() {
        const response = await fetch('4thfile.json');
        const pokemonData = await response.json();
    
    
        pokemonData.forEach(pokemonInfo => {
            var pokemon = new Pokemon(
                pokemonInfo.name,
                pokemonInfo.type1,
                pokemonInfo.type2,
                pokemonInfo.frontSprite,
                pokemonInfo.generation,
                pokemonInfo.evolutionType
            );
    
            pokemonArray.push(pokemon)
        });

        const jsConfetti = new JSConfetti();
        var thisbox_type ;
        var thisbox_pkmn ;
        var correct_counter = 0;
        var turn_counter = 10;

        

        for(i=0; i < pokemonArray.length; i ++){
        
            let new_pkmn = 
            `<div class="pkmn_option" data-type1="${pokemonArray[i].type1}" data-type2="${pokemonArray[i].type2}" data-generation="${pokemonArray[i].generation}" data-evo="${pokemonArray[i].evolutionType}">
            <img class = "sprite_small" src="${pokemonArray[i].frontSprite}" onerror="this.src='img/missingNo.png'">
                <p class="pokemon_name">${pokemonArray[i].name}</p>
            </div>`
            console.log(pokemonArray.length)

            $("#pokemonInsert").append(new_pkmn)
        }

    

        $('.pkmn').on('click',function(){
            $('#searchPokemon').val('')
            $('#pokemonInsert').toggleClass('visible');
            thisbox_pkmn = $(this);
            
            if($('#typeChange').hasClass('visible')){
                $('#typeChange').toggleClass('visible')
            }

            $('#pokemonInsert > div').each(function(){
                $(this).show()
            })
        })
        
        
        $('.type').on('click',function(){
            $('#searchInput').val('')
            $('#typeChange').toggleClass('visible')
            thisbox_type = $(this);


            if($('#pokemonInsert').hasClass('visible')){
                $('#pokemonInsert').toggleClass('visible');
            }

            $('#typeChange > div').each(function(){
                $(this).show();
            })
        })
        
        
        $('#pokemonInsert > div').each(function(){
           
            $(this).on('click', function(){
                //types
                let firstType = $(this).data('type1')
                let secondType = $(this).data('type2')
                let generation = $(this).data('generation')
                let evo_type = $(this).data('evo')

                
                //position
                let left_side = $(`#${thisbox_pkmn.data('left')}`)
                 
                let top_side =$(`#${thisbox_pkmn.data('top')}`)

                console.log($(left_side).data('pokemon-rule'), 'leftside');
                console.log($(top_side).data('pokemon-rule'), 'topside');

                if((firstType == $(left_side).data('pokemon-rule') || secondType == $(left_side).data('pokemon-rule') || generation == $(left_side).data('pokemon-rule') || evo_type == $(left_side).data('pokemon-rule')) && (firstType == $(top_side).data('pokemon-rule') || secondType == $(top_side).data('pokemon-rule') ||  generation == $(top_side).data('pokemon-rule')|| evo_type == $(top_side).data('pokemon-rule'))){

                    $('#pokemonInsert').toggleClass('visible')
                    $(thisbox_pkmn).attr('data-type1', $(this).data('type1'))
                    $(thisbox_pkmn).attr('data-type2', $(this).data('type2'))
                    $(thisbox_pkmn).attr('generation', $(this).data('generation'))
                    $(thisbox_pkmn).find('.sprite_big').attr('src', `${$(this).find('.sprite_small').attr('src')}`)
                    $(this).css('background-color' , '#D3D3D3')

                    $(thisbox_pkmn).toggleClass('correct_guess')
                    $(thisbox_pkmn).toggleClass('unselectable')
                    console.log($(thisbox_pkmn).attr('data-type2'), 'type2 of the pokemon');

                    correct_counter ++;
                    turn_counter--;
                    changePP(turn_counter)

                    $(thisbox_pkmn).css("pointer-events","none")

                }
                
                else{
                    $('#pokemonInsert').toggleClass('visible')
                    

                    
                    $(thisbox_pkmn).toggleClass('wrong_guess')
                    

                    setTimeout(function(){
                        $(thisbox_pkmn).toggleClass('wrong_guess')
                    }, 500)

                    turn_counter--;
                    changePP(turn_counter)

                }

                if(correct_counter == 9){
                    jsConfetti.addConfetti({
                    }).then(() => jsConfetti.addConfetti());
                    return;
                }
                if(turn_counter == 0){
                    alert("You can keep guessing, but you can't win anymore :(")
                }

                if(correct_counter == 9 && turn_counter < 0){
                    alert("Your guesses are correct")
                }
            })
        })

        function changePP(pp){
            if(pp >= 0){
                $('#pp_container').html(`${pp}/10 PP`)
            }
            else{
                $('#pp_container').html(`0/10 PP`)
            }
        }
        
        $(".option").on('click', function(){
            if($(this).hasClass('type_rule')){
                $(thisbox_type).attr('data-pokemon-rule', $(this).attr('id').toLowerCase());
                $(thisbox_type).find('.image').attr('src', `img/${$(this).attr('id')}.png`);
                $(thisbox_type).find('.placeholder').text("")
                $('#typeChange').toggleClass('visible')  
                if($(thisbox_type).data('pokemon-rule') == $(this).attr('id')){
                    $(this).remove()
                }
                if($(this).text()=="Mono-type"){
                    $(this).remove()
                }
                $(thisbox_type).css("pointer-events","none")
                $(thisbox_type).toggleClass('unselectable')
            }
            
            else if($(this).hasClass('gen_rule')){
                console.log('this is a gen, not a type');

                $(thisbox_type).attr('data-pokemon-rule', $(this).attr('id').toLowerCase());
                $(thisbox_type).find('.image').remove();

                

                $(thisbox_type).find('.placeholder').text($(this).text())


                $('#typeChange').toggleClass('visible')  
                
                $('.gen_cat').remove();
                $('.gen_rule').each(function(){
                    $(this).remove()
                })

                $(thisbox_type).css("pointer-events","none")
                $(thisbox_type).toggleClass('unselectable')
            }

            else if($(this).hasClass('evo_rule')){
                console.log("evo rule broooo")

                $(thisbox_type).attr('data-pokemon-rule', $(this).attr('id').toLowerCase());
                $(thisbox_type).find('.image').attr('src', `img/${$(this).attr('id')}.png`);
                $(thisbox_type).find('.placeholder').remove()
                $('#typeChange').toggleClass('visible')  
                
               
                $(this).remove()
                $(thisbox_type).css("pointer-events","none")
                $(thisbox_type).toggleClass('unselectable')
            }
        });

        $("#searchInput").on("input", function () {
            var searchValue = $(this).val().toLowerCase();
        
            $("#typeChange > div").each(function () {
        
                var menuItemText = $(this).text().toLowerCase();
                if (menuItemText.indexOf(searchValue) !== -1) {
        
                    $(this).show();
                } else {
        
                    $(this).hide();
                }
            });
        });

        $("#searchPokemon").on("input", function () {
            var searchValue = $(this).val().toLowerCase();
        
            $("#pokemonInsert > div").each(function () {
        
                var menuItemText = $(this).text().toLowerCase();
                if (menuItemText.indexOf(searchValue) !== -1) {
        
                    $(this).show();
                } else {
        
                    $(this).hide();
                }
            });
        });


        var rules = {};

        const types = ["null", "normal", "grass", "fire", "water", "fairy", "dark", "psychic", "ghost", "poison", "flying", "fighting", "ground", "rock", "steel", "dragon", "ice", "electric", "bug"];

        const generations = ["generation-i", "generation-ii", "generation-iii", "generation-iv", "generation-v", "generation-vi", "generation-vii", "generation-viii", "generation-ix"];

        const evolutionMethods = ["trade", "use-item"];

        types.forEach(type => rules[type] = 'type_rule');
        generations.forEach(generation => rules[generation] = 'gen_rule');
        evolutionMethods.forEach(evolutionMethod => rules[evolutionMethod] = 'evo_rule');

        var rules_backup = JSON.parse(JSON.stringify(rules))


        var rer = false;
        var rgr = false;

        function findViableCombination(leftrule, arr) {
            let keys = Object.keys(rules);
            let random_rule2 = keys[Math.floor(Math.random() * keys.length)];
            let options_counter = 0
            for (let pokemon of arr) {
                var first_type = pokemon.type1;
                var second_type = pokemon.type2;
                var generation = pokemon.generation;
                var evo_type = pokemon.evolutionType;
        
                if ((first_type == leftrule || second_type == leftrule || generation == leftrule || evo_type == leftrule) &&
                    (first_type == random_rule2 || second_type == random_rule2 || generation == random_rule2 || evo_type == random_rule2)) {
                    options_counter ++;
                    console.log(pokemon)
                }
            }
        
            if(options_counter > 0){
                return random_rule2
            }
            else{
                findViableCombination(leftrule, arr)
            }
        }


        $('#random_game').on('click', function(){
            // $(this).css('pointer-events' , 'none')
            // $(this).find('.sprite_big').attr('src', "")

            $('.type').each(function(){
                $(this).attr('data-pokemon-rule' , "null")
            })


            rules = JSON.parse(JSON.stringify(rules_backup))
            turn_counter = 10

            changePP(turn_counter)
            $('.pkmn').each(function(){
                $(this).attr('data-type1', "")
                $(this).attr('data-type2', "")
                $(this).removeClass('correct_guess unselectable')
                $(this).find('.sprite_big').attr('src', "")
                $(this).css('pointer-events',  'auto')
            })

            
           $('.left').each(function(e){
                var keys = Object.keys(rules);

                var random_rule = keys[Math.floor(Math.random() * keys.length)];
                var typeof_random_rule = rules[random_rule];

                if(typeof_random_rule == 'type_rule'){
                    $(this).attr('data-pokemon-rule', random_rule);
                    $(this).find('.image').attr('src', `img/${random_rule}.png`);
                    $(this).find('.placeholder').text('');
                }

                else if(typeof_random_rule == 'gen_rule'){
                    $(this).attr('data-pokemon-rule', random_rule);
                    $(this).find('.image').attr('src', "");
                    $(this).find('.placeholder').text($(`#${random_rule}`).text())

                    var evo_rule_remove = 'evo_rule'
                    Object.keys(rules).forEach(function(key){
                        if(rules[key] == evo_rule_remove){
                            delete rules[key];
                        }
                    })

                    rgr= true;
                }

                else if(typeof_random_rule == 'evo_rule'){
                    $(this).attr('data-pokemon-rule', random_rule);
                    $(this).find('.image').attr('src', `img/${random_rule}.png`);
                    $(this).find('.placeholder').text('')

                    var gen_rule_remove = 'gen_rule'
                    Object.keys(rules).forEach(function(key){
                        if(rules[key] == gen_rule_remove){
                            delete rules[key];
                        }
                    })

                    rer = true;
                }

                $(this).css("pointer-events","none")
                $(this).addClass('unselectable')

                delete rules[random_rule]
            })

            $('.top').each(function(){
                var topside = $(this)

                

                

                $('.left').each(function(){
                    var leftside = $(this)
                    var leftrule = $(leftside).data('pokemon-rule')
    
                    // let keys = Object.keys(rules);
    
                    // let random_rule2 = keys[Math.floor(Math.random() * keys.length)];
                    // let typeof_random_rule2 = rules[random_rule2];
    
                    //var random_rule2 = random_rule2

    
                    // var possible_options_counter = 0
                    // pokemonArray.forEach(function(pokemon){
                        
    
                    //     first_type = pokemon.type1;
                    //     second_type = pokemon.type2;
                    //     generation = pokemon.generation;
                    //     evo_type = pokemon.evolutionType;
    
                        
    
    
                    //     if( (first_type == leftrule || second_type == leftrule || generation == leftrule || evo_type == leftrule) && (first_type == random_rule2 || second_type == random_rule2 || generation == random_rule2 || evo_type == random_rule2) ){
                    //         possible_options_counter ++;
                    //     }
                    // })
                    let rr2 = findViableCombination(leftrule, pokemonArray)
                    let typeof_random_rule2 = rules[rr2]

                    // if(possible_options_counter > 1 ){
                        if(typeof_random_rule2 == 'type_rule'){
                            $(topside).attr('data-pokemon-rule',rr2);
                            $(topside).find('.image').attr('src', `img/${rr2}.png`);
                            $(topside).find('.placeholder').text('');
                        }

                        else if(typeof_random_rule2 == 'gen_rule'){
                            $(topside).attr('data-pokemon-rule', `${rr2}`);
                            $(topside).find('.image').attr('src', '');
                            $(topside).find('.placeholder').text($(`#${rr2}`).text())
        
                            var evo_rule_remove = 'evo_rule'
                            Object.keys(rules).forEach(function(key){
                                if(rules[key] == evo_rule_remove){
                                    delete rules[key];
                                }
                            })
                        }
        
                        else if(typeof_random_rule2 == 'evo_rule'){
                            $(topside).attr('data-pokemon-rule', `${rr2}`);
                            $(topside).find('.image').attr(`img/${rr2}.png`);
                            $(topside).find('.placeholder').text('')
        
                            var gen_rule_remove = 'gen_rule'
                            Object.keys(rules).forEach(function(key){
                                if(rules[key] == gen_rule_remove){
                                    delete rules[key];
                                }
                            })
                        }
                        $(topside).css("pointer-events","none")
                        $(topside).addClass('unselectable')
        
                        delete rules[rr2]
                    //}
                    
                })
            })
            
        })
        
    }
    fetchAndProcessPokemonData();
})