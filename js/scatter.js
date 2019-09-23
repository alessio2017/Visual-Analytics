var margin = {top: 40, right: 20, bottom: 30, left: 40},

    width = 900  - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3version4.scaleBand()
    .range([0, width], .1);

var y = d3version4.scaleLinear()
    .range([height, 0]);
    
var xAxis = d3version4.axisBottom(x)
    //.scale(x)
    //.orient("bottom");

var yAxis = d3version4.axisLeft(y)
    .tickFormat(d3version4.formatPrefix(".1", 1e3));
    
var colorx = d3version3.scale.ordinal()
  				.domain(["CLEAR","OVERCAST","FOG","RAIN","SNOW","FREEZING"])
  				.range(['red','green','blue','yellow','pink','brown']);
  				
d3version4.csv("1k-6num-attrs(sbagliato).csv", function(error, data) {

var tooltip = d3version4.select("#scatter-div").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3version4.select("#scatter-div").append("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
		x.domain(data.map(function(d) { return d.State; }));
  		y.domain([0, d3version4.max(data, function(d) { return Math.max(d.CLEAR,d.OVERCAST,d.FOG,d.RAIN,d.SNOW,d.FREEZING); })-0000]);
		
  		// x-axis
  		svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis)
    	
  		// y-axis
  		svg.append("g")
      	.attr("class", "y axis")
      	.call(yAxis)
    	.append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("# of road accidents");
    
	  svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d){
      console.log(d);
        return x(d.State)+8;
        })
      .attr("cy", function(d){
      	return y(d.CLEAR);
      })
      .style("fill", function(d) { return colorx("CLEAR");}) 
      .on("mouseover", function(d) {
      
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.CLEAR))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      

 	svg.selectAll(".dot1")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot1")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+8;
        })
      .attr("cy", function(d){
      	return y(d.FOG);
      })
      .style("fill", function(d) { return colorx("FOG");}) 
      .on("mouseover", function(d) {
      
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.FOG))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      
      
      
 	svg.selectAll(".dot2")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot2")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+8;
        })
      .attr("cy", function(d){
      	return y(d.OVERCAST);
      })
      .style("fill", function(d) { return colorx("OVERCAST");}) 
      .on("mouseover", function(d) {
      
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.OVERCAST))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      
      
      svg.selectAll(".dot3")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot3")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+8;
        })
      .attr("cy", function(d){
      	return y(d.RAIN);
      })
      .style("fill", function(d) { return colorx("RAIN");}) 
      .on("mouseover", function(d) {
      
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.RAIN))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      
      svg.selectAll(".dot4")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot4")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+8;
        })
      .attr("cy", function(d){
      	return y(d.SNOW);
      })
      .style("fill", function(d) { return colorx("SNOW");}) 
      .on("mouseover", function(d) {
      
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.SNOW))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      
      svg.selectAll(".dot5")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot5")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+8;
        })
      .attr("cy", function(d){
      	return y(d.FREEZING);
      })
      .style("fill", function(d) { return colorx("FREEZING");}) 
      .on("mouseover", function(d) {
      
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.FREEZING))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

	
	

 	 // draw legend
  	  var legend1 = svg.selectAll(".legend")
              .data([1,2,3,4,5])
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend1.append("rect")
              .attr("x", width )
              .attr("width", 15)
              .attr("height", 15)
              .style("fill", colorx);

          legend1.append("text")
              .attr("x", width - 10)
              .attr("y", 5)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { 
				  if (d==1){
					  return "Clear";
				  } else if(d == 2) {
					  return "Overcast";
				  } else if(d == 3) {
					  return "Fog";
				  } else if(d == 4) {
				  	  return "Rain";
				  } else if(d == 5) {
				  	  return "Snow";
				  } else if(d == 6) {
				  	  return "Freezing";
				  }
				  return "";
			  });

});