queue()
    .defer(d3.csv, "data/pokedex.csv")
    .await(makeGraphs);

function makeGraphs(error, pokemonData) {
    var ndx = crossfilter(pokemonData);


    show_region_selector(ndx);
    show_grass_pokemon_in_region(ndx, "Kanto", "#grass-in-kanto");
    show_grass_pokemon_in_region(ndx, "Johto", "#grass-in-johto");
    show_grass_pokemon_in_region(ndx, "Hoenn", "#grass-in-hoenn");
    show_grass_pokemon_in_region(ndx, "Sinnoh", "#grass-in-sinnoh");
    show_grass_pokemon_in_region(ndx, "Unova", "#grass-in-unova");
    show_grass_pokemon_in_region(ndx, "Kalos", "#grass-in-kalos");
    show_grass_pokemon_in_region(ndx, "Alola", "#grass-in-alola");
    show_grass_pokemon_in_region(ndx, "Kanto", "#fire-in-kanto");
    show_fire_pokemon_in_region(ndx, "Johto", "#fire-in-johto");
    show_fire_pokemon_in_region(ndx, "Hoenn", "#fire-in-hoenn");
    show_fire_pokemon_in_region(ndx, "Sinnoh", "#fire-in-sinnoh");
    show_fire_pokemon_in_region(ndx, "Unova", "#fire-in-unova");
    show_fire_pokemon_in_region(ndx, "Kalos", "#fire-in-kalos");
    show_fire_pokemon_in_region(ndx, "Alola", "#fire-in-alola");
    show_region_numbers(ndx);
    show_type_totals(ndx);
   /* show_generation_totals(ndx); */
    show_percent_shiny_pokemon(ndx);
    show_percent_type2_pokemon(ndx);
    show_generation1_types(ndx);

    dc.renderAll();
}


function show_region_selector(ndx) {
    var regionDim = ndx.dimension(dc.pluck("region"));
    var regionSelect = regionDim.group();

    dc.selectMenu("#region-selector")
        .dimension(regionDim)
        .group(regionSelect);
}

/* Grass Pokemon per region */

function show_grass_pokemon_in_region(ndx, place, element) {
    var total_grass_pokemon = ndx.groupAll().reduce(
        function(p, v) {
            if (v.region === place) {
                p.count++;
                if (v.type_1 === "Grass") {
                    p.are_grass++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.region === place) {
                p.count--;
                if (v.type_1 === "Grass") {
                    p.are_grass--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_grass: 0 };
        }
    );

 dc.numberDisplay(element)
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_grass / d.count);
            }
        })
        .group(total_grass_pokemon); 
}

/* Fire Pokemon per region */

function show_fire_pokemon_in_region(ndx, place, element) {
    var total_fire_pokemon = ndx.groupAll().reduce(
        function(p, v) {
            if (v.region === place) {
                p.count++;
                if (v.type_1 === "Fire") {
                    p.are_fire++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.region === place) {
                p.count--;
                if (v.type_1 === "Fire") {
                    p.are_fire--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_fire: 0 };
        }
    );

 dc.numberDisplay(element)
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_fire / d.count);
            }
        })
        .group(total_fire_pokemon); 
}




function show_region_numbers(ndx) {
    var chartColors = d3.scale.ordinal()
        .domain(["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"])
        .range(["red", "orange", "yellow", "green", "blue", "purple", "pink"]);
    var regionDim = ndx.dimension(function(d) {
        return [d.region];
    });
    var regionMix = regionDim.group();

    dc.barChart("#region-balance")
        .width(350)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(chartColors)
        .dimension(regionDim)
        .group(regionMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Region")
        .yAxis().ticks(20);
}


/*Number per generation



function show_generation_totals(ndx) {
    var generationColors = d3.scale.ordinal()
        .domain(["A", "B", "C"])
        .range(["red", "blue", "yellow"]);
    var generationDim = ndx.dimension(function(d) {
        return [d.generation];
    });
    var generationMix = generationDim.group();

    dc.barChart("#generation-balance")
        .width(350)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(generationColors)
        .dimension(generationDim)
        .group(generationMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Generartion")
        .yAxis().ticks(20);
} */

/* Percentage of shiny Pokemon */

function show_percent_shiny_pokemon(ndx) {
    var shinyColors = d3.scale.ordinal()
        .domain(["A", "B"])
        .range(["red", "blue"]);
    var shinyDim = ndx.dimension(dc.pluck("shiny"));
    var percentageThatAreShiny = shinyDim.group();


    dc.pieChart("#shiny-non-shiny")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(shinyColors)
        .dimension(shinyDim)
        .group(percentageThatAreShiny)
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            });
        });

}



/*Number of Pokemon per type*/

function show_type_totals(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"])
        .range(["#A6B91A", "#705746", "#6F35FC", "#F7D02C", "#D685AD", "#C22E28", "#EE8130", "#A98FF3", "#735797", "#7AC74C", "#E2BF65", "#96D9D6", "#A8A77A", "#A33EA1", "#F95587", "#B6A136", "#B7B7CE", "#6390F0", ]);
    var typeDim = ndx.dimension(function(d) {
        return [d.type_1];
    });
    var typeMix = typeDim.group();

    dc.barChart("#type-balance")
        .width(400)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 50, left: 50 })
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .dimension(typeDim)
        .group(typeMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .on('renderlet', function(chart) {
            chart.selectAll("g.x text")
                .attr('dx', '-15')
                .attr('transform', "rotate(-55)");
        })
        .yAxis().ticks(20);
    
}

/* Main pokemon type */

function show_generation1_types(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"])
        .range(["#A6B91A", "#705746", "#6F35FC", "#F7D02C", "#D685AD", "#C22E28", "#EE8130", "#A98FF3", "#735797", "#7AC74C", "#E2BF65", "#96D9D6", "#A8A77A", "#A33EA1", "#F95587", "#B6A136", "#B7B7CE", "#6390F0", ]);
    var type1Dim = ndx.dimension(dc.pluck("type_1"));
    var percentageThatAreType1 = type1Dim.group();

    dc.pieChart("#gender-balance-math")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .dimension(type1Dim)
        .group(percentageThatAreType1)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors);
}


/* Second pokemon tpye percentage */


function show_percent_type2_pokemon(ndx) {
        var typeColors = d3.scale.ordinal()
        .domain(["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"])
        .range(["#A6B91A", "#705746", "#6F35FC", "#F7D02C", "#D685AD", "#C22E28", "#EE8130", "#A98FF3", "#735797", "#7AC74C", "#E2BF65", "#96D9D6", "#A8A77A", "#A33EA1", "#F95587", "#B6A136", "#B7B7CE", "#6390F0"]);
    var type2Dim = ndx.dimension(dc.pluck("type_2"));
    var percentageThatAreType2 = type2Dim.group();
    
    dc.pieChart("#type-2-percentage")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .dimension(type2Dim)
        .group(percentageThatAreType2)
        .on('pretransition', function(chart) {
            chart.selectAll().text(function(d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            });
        })
        .data(function(group) {
            return group.all().filter(function(kv) { return kv.value > 0; });
        });



}



