queue()
    .defer(d3.csv, "data/pokedex.csv")
    .await(makeGraphs);

function makeGraphs(error, pokemonData) {
    var ndx = crossfilter(pokemonData);


    show_region_selector(ndx);
    show_grass_pokemon_in_region(ndx, "Kanto", "#percent-of-kanto-pokemon");
    show_grass_pokemon_in_region(ndx, "Johto", "#percent-of-johto-pokemon");
    show_grass_pokemon_in_region(ndx, "Hoenn", "#percent-of-hoenn-pokemon");
    show_grass_pokemon_in_region(ndx, "Sinnoh", "#percent-of-sinnoh-pokemon");
    show_grass_pokemon_in_region(ndx, "Unova", "#percent-of-unova-pokemon");
    show_grass_pokemon_in_region(ndx, "Kalos", "#percent-of-kalos-pokemon");
    show_grass_pokemon_in_region(ndx, "Alola", "#percent-of-alola-pokemon");
    show_region_percentage(ndx);
    show_type_percentage(ndx);
    show_percent_shiny_pokemon(ndx);

    dc.renderAll();
}


function show_region_selector(ndx) {
    var regionDim = ndx.dimension(dc.pluck("region"));
    var regionSelect = regionDim.group();

    dc.selectMenu("#region-selector")
        .dimension(regionDim)
        .group(regionSelect);
}

/*
function show_type_percentage(ndx, type_1) {
    var typeColors = d3.scale.ordinal()
        .domain(["bug", "fire"])
        .range(["pink", "blue"]);
    var typeDim = ndx.dimension(function(d) {
        return [d.type_1];
    });
    var typeMix = typeDim.group();

 dc.pieChart("#type-percentage")
        .height(150)
        .radius(75)
        .transitionDuration(500)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .dimension(typeDim)
        .group(typeMix)
}
*/

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


/*

function show_number_per_region(ndx) {
    var regionColors = d3.scale.ordinal()
        .domain(["A", "B", "C", "D", "E"])
        .range(["red", "orange", "yellow", "green", "blue"]);
    var number_regionDim = ndx.dimension(function(d) {
        return [d.number_region];
    });
    var number_regionMix = number_regionDim.group();

    dc.barChart("#number-per-region")
        .width(350)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .colorAccessor(function(d, i) { return i; })
        .colors(regionColors)
        .dimension(number_regionDim)
        .group(number_regionMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Region")
        .yAxis().ticks(5);
}
*/


/*
function show_percent_that_are_in_each_region(ndx) {

    function type_in_region(dimension, type_1) {
        return dimension.group().reduce(
            function(p, v) {
                p.total++;
                if (v.type_1 === type_1) {
                    p.match++;
                };
                return p;
            },
            function(p, v) {
                p.total--;
                if (v.type_1 === type_1) {
                    p.match--;
                };
                return p;
            },
            function() {
                return { total: 0, match: 0 }
            }
        );
    };

    var dim = ndx.dimension(dc.pluck("type_1"));
    var regionColors = d3.scale.ordinal()
        .domain(["Kanto", "Johto", "Sinnoh", "Unova", "Kalos"])
        .range(["red", "orange", "yellow", "green", "blue"]);
    var region_typeDim = ndx.dimension(function(d) {
        return [d.region_type];
    });
    var region_typeMix = region_typeDim.group();


    dc.barChart("#type_in_region")
        .width(400)
        .height(350)
        .margins({ top: 10, right: 100, bottom: 30, left: 30 })
        .colorAccessor(function(d, i) { return i; })
        .colors(regionColors)
        .dimension(region_typeDim)
        .group(region_typeMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Region")
        .yAxis().ticks(5);
}

*/



function show_region_percentage(ndx) {
    var regionColors = d3.scale.ordinal()
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
        .colors(regionColors)
        .dimension(regionDim)
        .group(regionMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Region")
        .yAxis().ticks(20);
}

/*Number of Pokemon per type*/

function show_type_percentage(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["A"])
        .range(["red"]);
    var typeDim = ndx.dimension(function(d) {
        return [d.type_1];
    });
    var typeMix = typeDim.group();

    dc.barChart("#type-balance")
        .width(700)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors)
        .dimension(typeDim)
        .group(typeMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Type")
        .yAxis().ticks(20);
}

/* Percentage of shiny Pokemon */

function show_percent_shiny_pokemon(ndx) {

    function percentageThatAreShinyandNon(shiny) {
        return shinyDim.group().reduce(
            function(p, v) {
                p.total++;
                if (v.shiny === shiny) {
                    p.count++;
                }
                return p;
            },
            function(p, v) {
                p.total++;
                if (v.shiny === shiny) {
                    p.count--;
                }
                return p;
            },
            function() {
                return { count: 0, total: 0 };
            }
        );
    }

    var shinyDim = ndx.dimension(dc.pluck("shiny"));
    var percentageThatAreShiny = percentageThatAreShinyandNon("yes");
    var percentgeThatAreNonShiny = percentageThatAreShinyandNon("no");
    
    dc.pieChart("#shiny-non-shiny")
        .height(150)
        .radius(75)
        .transitionDuration(500)
        .dimension(percentgeThatAreNonShiny)
        .group(percentageThatAreShiny);
}