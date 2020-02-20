var PARALLEL_COORDINATES_FILE = "FDB/1k-6num-attrs.csv"
var PCA_FILE = "FDB/pca_viz.tsv"


d3version3.tsv(PCA_FILE, function(error, data) {
	// Define the sizes and margins for our canvas.
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = 570 - margin.left - margin.right,
    	height = 490 - margin.top - margin.bottom;
		// Cast my values as numbers and determine ranges.
	var minmax = {P1: {min:0, max:0}, P2: {min:0, max:0}}
	data.forEach(function(d) {
		d.P1 = +d.P1;
		d.P2 = +d.P2;
		minmax.P1.min = Math.min(d.P1, minmax.P1.min);
		minmax.P1.max = Math.max(d.P1, minmax.P1.max);
		minmax.P2.min = Math.min(d.P2, minmax.P2.min);
		minmax.P2.max = Math.max(d.P2, minmax.P2.max);
	});
	// Set-up my x scale.
	var x = d3version3.scale.linear()
		.range([0, width])
		.domain([Math.floor(minmax.P1.min), Math.ceil(minmax.P1.max)]);

	// Set-up my y scale.
	var y = d3version3.scale.linear()
		.range([height, 0])
		.domain([Math.floor(minmax.P2.min), Math.ceil(minmax.P2.max)]);
	// Create my x-axis using my scale.
	var xAxis = d3version3.svg.axis()
		.scale(x)
		.orient("bottom");
	// Create my y-axis using my scale.
	var yAxis = d3version3.svg.axis()
		.scale(y)
		.orient("left");

	// Actually create my canvas.
	var svg = d3version3.select("#pca-div").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  // Draw my x-axis.
	  svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + y(0) + ")")
	    .call(xAxis)
	  .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .text("Coord. 1");

	  // Draw my y-axis.
	  svg.append("g")
	    .attr("class", "y axis")
	    .attr("transform", "translate(" + x(0) + ",0)")
	    .call(yAxis)
	  .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Coord. 2");
	// Create all the data points :-D.
	svg.selectAll(".dot")
		.data(data)
		.enter().append("circle")
		//.attr("class", "dot")
		
		.attr("fill", function(d, i) {
			if (d.A == 1 && d.D < 5) {
				return "#beaed4";
			} else if (d.A == 3 && d.D >= 5) {
				return "#ffff99";
			} else if (d.A == 2 && d.D < 5){
				return "#beaed4";
			} else if (d.A == 4 && d.D >= 5){
				return "#ffff99";
			} else if (d.A == 3 && d.D < 5){
				return "#7fc97f";
			} else if (d.A == 2 && d.D >= 5){
				return "#fdc086";
			} else if (d.A == 4 && d.D < 5){
				return "#7fc97f";
			} else if (d.A == 1 && d.D >= 5){
				return "#fdc086";
			} else {
				return "black"
			}
		})
		/*
		.attr("fill", function(d, i) {
			if (d.A <= 4) {
				return "yellow";
			} else if (d.A == 5) {
				return "blue";
			} else if (d.A == 6){
				return "green";
			} else if (d.A == 7){
				return "pink";
			} else{
				console.log(d.A)
				return "red"
			}
		})*/
		.attr("r", 3.5)
		.attr("cx", function(d) { return x(d.P1); })
		.attr("cy", function(d) { return y(d.P2); })
		.on("mouseover",function(){ d3version4.select(this).style("cursor", "pointer");    })
      
    	.on("click",function(d){ 
			//console.log(d);
    		if ((d.A == 1 && d.D < 5) || ( d.A == 2 && d.D < 5)){
				d3version4.selectAll("#parallel-div .background path").attr("class","backg")
				d3version4.selectAll("#parallel-div .foreground path").attr("class","backg")
				//console.log(d3version4.selectAll("#parallel-div .background path").filter(function(j){ return j.Severity < 3 && j.End_Time < 5 }))
				var par_state = d3version4.selectAll("#parallel-div .foreground path").filter(function(j){ return j.Severity < 3 && j.End_Time < 5 }).attr("class","foregroundingd1") //putting .foreground the brush will function
			}else if ((d.A == 3 && d.D >= 5) || ( d.A == 4 && d.D >= 5)){
				d3version4.selectAll("#parallel-div .background path").attr("class","backg")
				d3version4.selectAll("#parallel-div .foreground path").attr("class","backg")
				//console.log(d3version4.selectAll("#parallel-div .background path").filter(function(j){ return j.Severity > 2  && j.End_Time >= 5 }))
				var par_state = d3version4.selectAll("#parallel-div .foreground path").filter(function(j){ return j.Severity > 2 && j.End_Time >= 5 }).attr("class","foregroundingd2")
			}else if ((d.A == 3 && d.D < 5) || ( d.A == 4 && d.D < 5)){
				d3version4.selectAll("#parallel-div .background path").attr("class","backg")
				d3version4.selectAll("#parallel-div .foreground path").attr("class","backg")
				//console.log(d3version4.selectAll("#parallel-div .background path").filter(function(j){ return j.Severity > 2 && j.End_Time < 5 }))
				var par_state = d3version4.selectAll("#parallel-div .foreground path").filter(function(j){ return j.Severity > 2 && j.End_Time < 5 }).attr("class","foregroundingd3")
			}else{
				d3version4.selectAll("#parallel-div .background path").attr("class","backg")
				d3version4.selectAll("#parallel-div .foreground path").attr("class","backg")
        		var par_state = d3version4.selectAll("#parallel-div .foreground path").filter(function(j){ return j.Severity < 3 && j.End_Time >= 5  }).attr("class","foregroundingd4")
				//console.log(d3version4.selectAll("#parallel-div .background path").filter(function(j){  return j.Severity < 3 && j.End_Time >= 5 }))
			}
		})
		.on("dblclick", function(){
		d3version4.selectAll("#parallel-div .background path").attr("class","foreground")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#a6d854']").attr("class","pppp4")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#377eb8']").attr("class","pppp3")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#a65628']").attr("class","pppp2")
        d3version4.selectAll("#parallel-div .foreground path[stroke='#e5c494']").attr("class","pppp1")
		});
        //Legend style
        var colorz = d3version4.scaleOrdinal()
                  .domain([1,2,3,4])
                  .range(["#beaed4","#ffff99","#7fc97f","#fdc086"])

        var legend = svg.selectAll(".legend")
              .data([1,2,3,4])
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x", width )
              .attr("width", 15)
              .attr("height", 15)
              .style("fill", colorz);
              
    		

          legend.append("text")
              .attr("x", width - 10)
              .attr("y", 5)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { 
				  if (d == 1){
					  return "Severity < 3 & Weekdays";
				  } else if(d == 2) {
					  return "Severity > 2 & Weekend days";
				  } else if(d == 3) {
					  return "Severity > 2 & Weekdays";
				  } else if(d == 4) {
				  	  return "Severity < 3 & Weekend days";
				  }
				  
				  return "";
			  });
			  
			
			  
});


d3version3.csv(PARALLEL_COORDINATES_FILE, function(error, flights) {
	var color3 = d3version3.scale.ordinal()
  				.domain([1,2,3,4])
				.range(['#e5c494','#a65628','#377eb8','#a6d854']);  
								
	var margin = {top: 30, right: 10, bottom: 10, left: 10},
	width = 1100 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	var x = d3version3.scale.ordinal().rangePoints([0, width], 1),
	y = {},
	dragging = {};

	var line = d3version3.svg.line(),
	axis = d3version3.svg.axis().orient("left"),
	background,
	foreground;

	// Returns the path for a given data point.
	function path(d) {
		return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
	}

	function position(d) {
		var v = dragging[d];
		return v == null ? x(d) : v;
	}

	function transition(g) {
		return g.transition().duration(500);
	}

	function brushstart() {
		d3version3.event.sourceEvent.stopPropagation();
	}

	// Handles a brush event, toggling the display of foreground lines.
	function brush() {
		var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
		extents = actives.map(function(p) { return y[p].brush.extent(); });
		foreground.style("display", function(d) {
			return actives.every(function(p, i) {
				return extents[i][0] <= d[p] && d[p] <= extents[i][1];
			}) ? null : "none";
		});
	}

	var svg = d3version3.select("#parallel-div").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom + 2)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	

	// Extract the list of dimensions and create a scale for each.
	//console.log(d3version3.keys(flights[0]))
	x.domain(dimensions = d3version3.keys(flights[0]).filter(function(d) {
		return d != "State" && (y[d] = d3version3.scale.linear()
		.domain(d3version3.extent(flights, function(p) { return +p[d]; }))
		.range([height, 0]));
	}));

	// Add grey background lines for context.
	background = svg.append("g")
	.attr("class", "background")
	.selectAll("path")
	.data(flights)
	.enter()
	.append("path")
	.attr("d", path);

	// Add blue foreground lines for focus.
	/*foreground = svg.append("g")
	.attr("class", "foreground")
	.selectAll("path")
	.data(flights)
	.enter().append("path")
	.attr("d", path);*/
	
	foreground = svg.append('svg:g')
  	.attr('class', 'foreground')
  	.selectAll('path')
  	.data(flights)
  	.enter().append('svg:path') 
  	
  	.attr('d', path)
  	.attr("class", function(d){return "pppp"+ d.Severity;})
  	
  	
  	.attr('stroke', function(d) { 
  	return color3(d.Severity); });
  	
	// Add a group element for each dimension.
	var g = svg.selectAll(".dimension")
	.data(dimensions)
	.enter().append("g")
	.attr("class", "dimension")
	.attr("transform", function(d) { return "translate(" + x(d) + ")"; })
	.call(d3version3.behavior.drag()
	.origin(function(d) { return {x: x(d)}; })
	.on("dragstart", function(d) {
		dragging[d] = x(d);
		background.attr("visibility", "hidden");
	})
	.on("drag", function(d) {
		dragging[d] = Math.min(width, Math.max(0, d3version3.event.x));
		foreground.attr("d", path);
		dimensions.sort(function(a, b) { return position(a) - position(b); });
		x.domain(dimensions);
		g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
	})
	.on("dragend", function(d) {
		delete dragging[d];
		transition(d3version3.select(this)).attr("transform", "translate(" + x(d) + ")");
		transition(foreground).attr("d", path);
		background
		.attr("d", path)
		.transition()
		.delay(500)
		.duration(0)
		.attr("visibility", null);
	 
	}));

	// Add an axis and title.
	g.append("g")
	.attr("class", "axis")
	.each(function(d) { d3version3.select(this).call(axis.scale(y[d])); })
	.append("text")
	.style("text-anchor", "middle")
	.attr("y", -9)
	.text(function(d) { 
	if(d=="End_Time"){
		return "Day" 
	}else{ 
		return d; }
	});
	
	// Add and store a brush for each axis.
	g.append("g")
	.attr("class", "brush")
	.each(function(d) {
		d3version3.select(this).call(y[d].brush = d3version3.svg.brush().y(y[d])
		.on("brushstart", brushstart).on("brush", brush));
	})
	.selectAll("rect")
	.attr("x", -8)
	.attr("width", 16)
	
	  var legend = svg.selectAll(".legend")
      .data(color3.domain().slice().reverse())
    .enter().append("g")
      //.attr("class", "legend")
      .attr("class", function (d) {
        
        return "legend";
      })
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
  

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color3)
      .attr("id", function (d, i) {
        return "id" + d;
      })
      .on("mouseover",function(){ d3version4.select(this).style("cursor", "pointer");    })
      
    .on("click",function(d){  //mouseover o click
   	 	selected_severity = d

    // first every group turns grey
    d3version3.selectAll(".pppp"+1)
      .transition().duration(5)
      .style("stroke", "#454545")
      .style("opacity", "0.1") 
    d3version3.selectAll(".pppp"+2)
      .transition().duration(5)
      .style("stroke", "#454545")
      .style("opacity", "0.1")
    d3version3.selectAll(".pppp"+3)
      .transition().duration(5)
      .style("stroke", "#454545")
      .style("opacity", "0.1")
    d3version3.selectAll(".pppp"+4)
      .transition().duration(5)
      .style("stroke", "#454545")
      .style("opacity", "0.1")
    // Second the hovered specie takes its color
    //d3version3.selectAll(this.parentNode).attr("class " + selected_severity)
    /*console.log(d3version3.selectAll(".pppp" + selected_severity))
    console.log(color3(selected_severity));*/
    d3version3.selectAll(".pppp" + selected_severity)
      .transition().duration(50)
      .style("stroke", color3(d))
      .style("opacity", "1")
      if(d3version3.selectAll(".pppp" + selected_severity) == 0){	
      	  d3version3.selectAll(".foregrounding").filter(function(e){
      	  	if(e.Severity == selected_severity){
      	  		
      	  	}
      	  	console.log(e)
      	  })
      }
  })
      
    .on("dblclick", function(){   //mouseleave o dblclick
   	 d3version3.selectAll(".pppp"+1)
      .transition().duration(5)
      .style("stroke", color3(1))
      .style("opacity", "1")
    d3version3.selectAll(".pppp"+2)
      .transition().duration(5)
      .style("stroke", color3(2))
      .style("opacity", "1")
    d3version3.selectAll(".pppp"+3)
      .transition().duration(5)
      .style("stroke", color3(3))
      .style("opacity", "1")
    d3version3.selectAll(".pppp"+4)
      .transition().duration(5)
      .style("stroke", color3(4))
      .style("opacity", "1")
    })

   legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return "Severity "+d; });
	
});

