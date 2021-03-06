
//Width and height of map
var width1 = 650;
var height1 = 408;

//

/*********** SLIDER ***********/

var months_names = [
		'January', 'February', 'March', 'April', 'May',
		'June', 'July', 'August', 'September',
		'October', 'November', 'December'
	];

  var slider3 = d3version4.sliderHorizontal()
    .min(1)
    .max(12)
    .step(1)
    .width(550)
	.tickFormat(function(v) { return months_names[v-1]; })
    .on('onchange', month => {
	    //load month data
	    selectedBarHeight = 0
	    loadDataMonth(month) //e.target.value)
	    //fill it
	    svg.selectAll("path")
		.attr("d", path)
		.style("stroke", "#fff")
		.style("stroke-width", "1")
		.style("fill", function(d) {
        
		    color = d3version3.scale.quantize()
		          .domain([-2*stateStdDev[d.properties.name] , 2*stateStdDev[d.properties.name]])
		          .range(virScale)
		    if(statesStats[d.properties.name] == null) return "rgb(213,222,217)" 
			// Get data value
			var value = statesStats[d.properties.name][month] - (+stateMean[d.properties.name])
			if (value) {
			    //If value exists…
		        if(n){  
		            return color(value)
		        }
				return color(900);
			} else {
				//If value is undefined…
				return "rgb(213,222,217)";
			}
		});
    });

  var g = d3version4.select("#slider_div").append("svg")
    .attr("width", width1)
    .attr("height", 80)
    .append("g")
    .attr("transform", "translate(45,30)");
  g.call(slider3);

/******************************/




// D3 Projection
var projection = d3version3.geo.albersUsa()
				   .translate([width1/2, height1/2])    // translate to center of screen
				   .scale([800]);          // scale things down so see entire US
        
// Define path generator
var path = d3version3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		
// Define linear scale for output
var color;

var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

//Create SVG element and append map to the SVG
var usa_div = d3version3.select("#usa_div")
			.attr("width", width1)
			.attr("height", height1);

var svg = d3version3.select("#usa_svg")
			.attr("width", width1)
			.attr("height", height1)
			.append("g");
// Append Div for tooltip to SVG
var div = d3version3.select("body")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);
    
var n = true;

$("#slider_div input").on("input", function(e){
    //load month data
    
    selectedBarHeight = 0
    loadDataMonth(e.target.value)
    
    //fill it
    svg.selectAll("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
	.style("fill", function(d) {
        
    color = d3version3.scale.quantize()
          .domain([-2*stateStdDev[d.properties.name] , 2*stateStdDev[d.properties.name]])
          .range(virScale)
    if(statesStats[d.properties.name] == null) return "rgb(213,222,217)" 
	// Get data value
	var value = statesStats[d.properties.name][e.target.value] - (+stateMean[d.properties.name])
	if (value) {
	//If value exists…
        if(n){  
            return color(value)
        }
	return color(900);
	} else {
	//If value is undefined…
	return "rgb(213,222,217)";
	}
});
});


var virScale = ['#2166ac','#286db0','#2e74b4','#347cb7','#3983bb','#3e8bbf','#4292c3','#519ac7','#5ea2cb','#6baad0','#78b2d4','#84bbd8','#8fc3dd','#9ac9e0','#a5cee3','#afd3e6','#b9d9e9','#c3deec','#cde3ef','#d5e7f1','#dbeaf2','#e1edf3','#e8f0f4','#eef3f5','#f4f6f6','#f8f5f3','#f9f0eb','#faece3','#fbe7db','#fce2d4','#fddecc','#fdd8c3','#fccfb7','#fbc6ac','#f9bda1','#f8b495','#f6ac8a','#f3a280','#ee9777','#ea8c6e','#e58165','#e0765d','#db6a54','#d55f4c','#d05546','#ca4b41','#c4403b','#be3536','#b82830','#b2182b']
 
var patty;
var statesStats_leave = [];
var statesStats_arrive = [];


// Load in my states data!
d3version3.csv("FDB/results.csv", function(data) {
    for (var i = 0; i < data.length; i++) {

        

        // Grab Month Number
        var dataMonth = +data[i].Start_Time;

		// Grab State Name
        var dataState = jsonStates[data[i].State];
        
        // Grab data value 
        var dataValue = +data[i].Counts;

        if(statesStats_leave[dataState] == null){
            statesStats_leave[dataState] = []
        
        }
        statesStats_leave[dataState][dataMonth] = dataValue
        
         switchTo("leave",6)
         
}
});

/*d3version3.csv("FDB/results_arrivi.csv", function(data) {
    
    for (var i = 0; i < data.length; i++) {

        // Grab State Name
        var dataState = jsonStates[data[i].ST];

        // Grab Month Number
        var dataMonth = +data[i].MO;

        // Grab data value 
        var dataValue = +data[i].NO;

        if(statesStats_arrive[dataState] == null){
            statesStats_arrive[dataState] = []
        }
        statesStats_arrive[dataState][dataMonth] = dataValue
        
}
        
});*/

function switchTo(loa,n){
    if(loa == "leave"){
        statesStats = statesStats_leave;
        createStdDev()
    }
    else{
        statesStats = statesStats_arrive;
        createStdDev()
    }
    
    //fill it
    svg.selectAll("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
	.style("fill", function(d) {
            
    color = d3version3.scale.quantize()
          .domain([-2*stateStdDev[d.properties.name] , 2*stateStdDev[d.properties.name]])
          .range(virScale)
    if(statesStats[d.properties.name] == null) return "rgb(213,222,217)" 
	// Get data value
	var value = statesStats[d.properties.name][n] - (+stateMean[d.properties.name])
	if (value) {
	//If value exists…
        if(n){  
            return color(value)
        }
	return color(900);
	} else {
	//If value is undefined…
	return "rgb(213,222,217)";
	}
});
}

// Load GeoJSON data and merge with states data
d3version3.json("js/us-states.json", function(json) {

    
// Bind the data to the SVG and create one path per GeoJSON feature
patty = svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
    .attr("id",function(d){
        return d.properties.name + "_map"
    })
    .attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
    .on("click", handleMouseOver)
    .on("mouseover", highlightBar)
    .on("mouseout", cancelHighlightBar)
    
     switchTo("leave",1)
    
    

});

function highlightBar(e){
	
    selected_bar = d3version4.selectAll(".bars.classDay").filter(function(d){ return jsonStates[d.mystate] == e.properties.name})
    selected_bar.style("fill", "rgb(202, 75, 65)")

    selected_bar = d3version4.selectAll(".bars.classNight").filter(function(d){ return jsonStates[d.mystate] == e.properties.name})
    selected_bar.style("fill", "rgb(202, 75, 65)")

}

function cancelHighlightBar(e){
    selected_bar = d3version4.selectAll(".bars.classDay").filter(function(d){ return jsonStates[d.mystate] == e.properties.name})
    selected_bar.style("fill", "rgb(255,224,130)")
    selected_bar = d3version4.selectAll(".bars.classNight").filter(function(d){ return jsonStates[d.mystate] == e.properties.name})
    selected_bar.style("fill", "rgb(129,212,250)")
}

var selected = [];
for(i in jsonStates){
    selected[jsonStates[i]] = false
}

function handleMouseOver(e){
    //var gto = d3version3.selectAll(".bar").filter(function(d){ return jsonStates[d.s] == e.properties.name }).style("fill","black")
    if(selected[e.properties.name]){
        d3version4.selectAll("#parallel-div .background path").attr("class","foreground")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#a6d854']").attr("class","pppp4")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#377eb8']").attr("class","pppp3")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#a65628']").attr("class","pppp2")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#e5c494']").attr("class","pppp1")
        d3version4.selectAll("#parallel-div .foreground path").style(function(d,i){
        	console.log(d)
        })
        //d3version4.selectAll("#parallel-div .foreground path").attr("class","pppp3")
        //var par_state = d3version4.selectAll("#parallel-div path").filter(function(d){ return jsonStates[d.ORIGIN_STATE_ABR] == e.properties.name }).attr("class","foreground")
        selected[e.properties.name] = false
    }
    else{
        d3version4.selectAll("#parallel-div .background path").attr("class","backg")
        d3version4.selectAll("#parallel-div .foreground path").attr("class","backg")
        //d3version4.selectAll("#parallel-div path").attr("class","foreground")
        for(i in jsonStates){
            selected[jsonStates[i]] = false
        }   
        //var par_state = d3version4.selectAll("#parallel-div .background path").filter(function(d){ console.log(d); return jsonStates[d.State] == e.properties.name }).attr("class","foregrounding") //we have to comment this line to work the brush
        var par_state = d3version4.selectAll("#parallel-div .foreground path").filter(function(d){ return jsonStates[d.State] == e.properties.name }).attr("class","foregrounding")
        selected[e.properties.name] = true
    }
    
}

//Legend style
    //var zz = d3version4.scaleQuantile().domain([-0.27, -0.20, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.5]).range(['#2166ac','#61a3cc','#bddaea','#f7f7f7','#fbc9b0','#e1785e','#b2182b'])
    var zz = d3version4.scaleQuantile().domain([-0.27, -0.20, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.5]).range(['#2166ac','#347cb7','#61a3cc','#bddaea','#f7f7f7','#fbc9b0','#e1785e','#c4403b','#b2182b'])
    var legend = svg.selectAll(".legend")
          .data([-0.27, -0.20, -0.1, -0.05, 0, 0.05, 0.1, 0.2, 0.5])
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + ((i * 10) + 300) + ")"; });

      legend.append("rect")
          .attr("x", width1 - 40 )
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", zz);

      legend.append("text")
          .attr("x", width1 - 45)
          .attr("y", 5)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) {if(d==-0.27){return "Low"} else if(d == 0.5){return "High"} else if(d == 0){return "0"}return ""});

    svg.selectAll(".legendstuff").data(["difference wrt annual mean"]).enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(635," + -200 + ") rotate(90) "; })
        .append("text")
        .attr("x", width1 - 45)
        .attr("y", 5)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {return d});
/*qqqq

    //--------------------------------------------------------------------------------------------

// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
/*var legend = d3version3.select("body").append("svg")
      			.attr("class", "legend")
     			.attr("width", 140)
    			.attr("height", 200)
   				.selectAll("g")
   				.data()
   				.enter()
   				.append("g")
     			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	legend.append("rect")
   		  .attr("width", 18)
   		  .attr("height", 18)
   		  .style("fill", color);

  	legend.append("text")
  		  .data(legendText)
      	  .attr("x", 24)
      	  .attr("y", 9)
      	  .attr("dy", ".35em")
      	  .text(function(d) { return d; });*/



var stateMean=[]

d3version3.csv('FDB/mean_annua.csv', function(data1){
    for(var el in data1){
        el = data1[el]
        stateMean[jsonStates[el.State]] = +el.Counts
    }
    
})

var stateStdDev = []
function createStdDev(){
    for(i in statesStats){
        stateStdDev[i] = standardDeviation(statesStats[i])
    }
}


