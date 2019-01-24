queue()
    .defer(d3.csv, "data/pokedex.csv")
    .await(makeGraphs);

function makeGraphs(error, pokemonData) {
    var ndx = crossfilter(pokemonData);

    pokemonData.forEach(function(d) {
        d.max_cp = parseInt(d["max_cp"]);
        d.min_cp = parseInt(d["min_cp"]);
    });


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
    show_water_pokemon_in_region(ndx, "Kanto", "#water-in-kanto");
    show_water_pokemon_in_region(ndx, "Johto", "#water-in-johto");
    show_water_pokemon_in_region(ndx, "Hoenn", "#water-in-hoenn");
    show_water_pokemon_in_region(ndx, "Sinnoh", "#water-in-sinnoh");
    show_water_pokemon_in_region(ndx, "Unova", "#water-in-unova");
    show_water_pokemon_in_region(ndx, "Kalos", "#water-in-kalos");
    show_water_pokemon_in_region(ndx, "Alola", "#water-in-alola");
    show_region_numbers(ndx);
    show_type_by_gen(ndx);
    show_percent_shiny_pokemon(ndx);
    show_percent_egg_distance(ndx);
    show_percent_type2_pokemon(ndx);
    show_generation1_types(ndx);
    show_cp_scatter(ndx);

    dc.renderAll();
}

/* Region selector */

function show_region_selector(ndx) {
    var regionDim = ndx.dimension(dc.pluck("region"));
    var regionSelect = regionDim.group();

    dc.selectMenu("#region-selector")
        .dimension(regionDim)
        .group(regionSelect);
}


/* Main pokemon type pie chart */

function show_generation1_types(ndx) {
    var typeColors = d3.scale.ordinal()
        .domain(["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"])
        .range(["#A6B91A", "#705746", "#6F35FC", "#F7D02C", "#D685AD", "#C22E28", "#EE8130", "#A98FF3", "#735797", "#7AC74C", "#E2BF65", "#96D9D6", "#A8A77A", "#A33EA1", "#F95587", "#B6A136", "#B7B7CE", "#6390F0", ]);
    var type1Dim = ndx.dimension(dc.pluck("type_1"));
    var percentageThatAreType1 = type1Dim.group();

    dc.pieChart("#type-1-percentage")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .dimension(type1Dim)
        .group(percentageThatAreType1)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(typeColors);
}


/* Second pokemon type percentage pie chart*/


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
        .group(percentageThatAreType2);
}

/* Grass Pokemon per region number display */

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

/* Fire Pokemon per region number display */

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


/* Water Pokemon per region number display */

function show_water_pokemon_in_region(ndx, place, element) {
    var total_water_pokemon = ndx.groupAll().reduce(
        function(p, v) {
            if (v.region === place) {
                p.count++;
                if (v.type_1 === "Water") {
                    p.are_water++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.region === place) {
                p.count--;
                if (v.type_1 === "Water") {
                    p.are_water--;
                }
            }
            return p;
        },
        function() {
            return { count: 0, are_water: 0 };
        }
    );

    dc.numberDisplay(element)
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function(d) {
            if (d.count == 0) {
                return 0;
            }
            else {
                return (d.are_water / d.count);
            }
        })
        .group(total_water_pokemon);
}



/* Percentage of shiny Pokemon */

function show_percent_shiny_pokemon(ndx) {
    var shinyColors = d3.scale.ordinal()
        .domain(["A", "B"])
        .range(["#B7B7CE", "#6F35FC"]);
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
        })
        .legend(dc.legend().x(20).y(15));

}


/* Percentage of egg distances */

function show_percent_egg_distance(ndx) {
    var eggColors = d3.scale.ordinal()
        .domain(["A", "B", "C", "D"])
        .range(["#B7B7CE", "#F95587", "#6F35FC", "#735797"]);
    var egg_distanceDim = ndx.dimension(dc.pluck("egg_distance"));
    var percentagePerDistance = egg_distanceDim.group();


    dc.pieChart("#egg-distance")
        .height(250)
        .radius(100)
        .transitionDuration(500)
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(eggColors)
        .dimension(egg_distanceDim)
        .group(percentagePerDistance)
        .legend(dc.legend().x(0).y(15));
}

/* Number of pokemon per region bar chart */

function show_region_numbers(ndx) {
    var chartColors = d3.scale.ordinal()
        .domain(["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"])
        .range(["#F95587", "#6390F0", "#7AC74C", "#D685AD", "#A6B91A", "#A33EA1", "#F7D02C"]);
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

/* stacked chart type by gen */

function show_type_by_gen(ndx) {
     var typeClass_dim = ndx.dimension(function(d) {
        return [d.type_1];
    });

    function rankByGeneration(dimension, generation) {
        return dimension.group().reduce(
            function(p, v) {
                p.total++;
                if (v.generation == generation) {
                    p.match++;
                }
                return p;
            },
            function(p, v) {
                p.total--;
                if (v.generation == generation) {
                    p.match--;
                }
                return p;
            },
            function() {
                return { total: 0, match: 0 };
            }
        );
    }

    var rankGen1 = rankByGeneration(typeClass_dim, "1");
    var rankGen2 = rankByGeneration(typeClass_dim, "2");
    var rankGen3 = rankByGeneration(typeClass_dim, "3");
    var rankGen4 = rankByGeneration(typeClass_dim, "4");
    var rankGen5 = rankByGeneration(typeClass_dim, "5");
    var rankGen6 = rankByGeneration(typeClass_dim, "6");
    var rankGen7 = rankByGeneration(typeClass_dim, "7");


    dc.barChart("#type-balance")
        .height(300)
        .width(450)
        .margins({ top: 10, right: 50, bottom: 30, left: 100 })
        .dimension(typeClass_dim)
        .group(rankGen1)
        .stack(rankGen2)
        .stack(rankGen3)
        .stack(rankGen4)
        .stack(rankGen5)
        .stack(rankGen6)
        .stack(rankGen7)
         .valueAccessor(function(d) {
            if (d.value.total > 0) {
                return (d.value.match / d.value.total) * 100;
            }
            else {
                return 0;
            }
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .on('renderlet', function(chart) {
            chart.selectAll("g.x text")
                .attr('dx', '-15')
                .attr('transform', "rotate(-37)");
        })
        .legend(dc.legend().x(10).y(40).itemHeight(15).gap(5).itemWidth(50)
        .legendText(dc.pluck('name'))
        
        );
}

/* Legendry scatter plot */

function show_cp_scatter(ndx) {

    var chartColors = d3.scale.ordinal()
        .domain(["1"])
        .range(["#F95587"]);

    var maxCpDim = ndx.dimension(dc.pluck("max_cp"));
    var cPDim = ndx.dimension(function(d) {
        return [d.max_cp, d.min_cp];
    });
    var cPGroup = cPDim.group();

    var minMaxCp = maxCpDim.bottom(1)[0].max_cp;
    var maxMaxCp = maxCpDim.top(1)[0].max_cp;

    dc.scatterPlot("#cp-scatter-plot")
        .width(420)
        .x(d3.scale.linear().domain([minMaxCp, maxMaxCp]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .xAxisPadding([20])
        .yAxisLabel("Min CP")
        .xAxisLabel("Max CP")
        .title(function(d) {
            return "The maximum CP for this Pokemon is " + d.key[0] + " and the minimum CP is " + d.key[1];
        })
        .colorAccessor(function(d) { return d.key[0]; })
        .colors(chartColors)
        .dimension(cPDim)
        .group(cPGroup);
}
