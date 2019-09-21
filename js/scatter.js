var bar_margin = {top: 40, right: 20, bottom: 30, left: 40},

    bar_width = 900  - bar_margin.left - bar_margin.right,
    bar_height = 400 - bar_margin.top - bar_margin.bottom;

var bar_x = d3version4.scaleBand()
    .range([0, bar_width], .1);

var bar_y = d3version4.scaleLinear()
    .range([bar_height, 0]);
    
var bar_xAxis = d3version4.axisBottom(bar_x)
    //.scale(x)
    //.orient("bottom");

var bar_yAxis = d3version4.axisLeft(bar_y)
    .tickFormat(d3version4.formatPrefix(".1", 1e3));
    
    
d3version4.csv("1k-6num-attrs(sbagliato).csv", type, function(error, data) {
var svg = d3version4.select("#scatter-div").append("svg")
    	.attr("width", bar_width + bar_margin.left + bar_margin.right)
    	.attr("height", bar_height + bar_margin.top + bar_margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + bar_margin.left + "," + bar_margin.top + ")")
    
		bar_x.domain(data.map(function(d) { return d.State; }));
  		bar_y.domain([0, d3version4.max(data, function(d) { return Math.max(d.CLEAR,d.OVERCAST,d.FOG,d.RAIN,d.SNOW,d.FREEZING); })]);
		
  		// x-axis
  		svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + bar_height + ")")
      	.call(bar_xAxis)
    	
  		// y-axis
  		svg.append("g")
      	.attr("class", "y axis")
      	.call(bar_yAxis)
    	.append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("# of road accidents");
    



});