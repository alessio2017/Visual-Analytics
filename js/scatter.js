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
    //.tickFormat(d3version4.formatPrefix(".1", 1e3));
    
var colorx = d3version3.scale.ordinal()
  				.domain(["CLEAR","OVERCAST","FOG","RAIN","SNOW","FREEZING"])
  				.range(['red','green','blue','#ffe119','pink','fuchsia']);
  				
d3version4.csv("FDB/1-6condition.csv", function(error, data) {


	var tooltip = d3version4.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

	var scatter_div = d3version4.select("body").append("div")
   	 	.attr("class", "tooltip1")
    	.style("opacity", 0);

	var bar_div = d3version4.select("body").append("div")
    	.attr("class", "tooltip2")
    	.style("opacity", 0);

	var brush = d3version4.brush().extent([[0, 0], [width, height]]).on("end", brushended),
            idleTimeout,
            idleDelay = 350;
            
		var svg = d3version4.select("#scatter-div").append("svg")
    		.attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
  			.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    	
    	
    	var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0) 
            .attr("y", 0); 
    	
		x.domain(data.map(function(d) { return d.State; }));
  		y.domain([0, d3version4.max(data, function(d) { return Math.max(d.CLEAR,d.OVERCAST,d.FOG,d.RAIN,d.SNOW,d.FREEZING); })]).nice();
		
		var scatter = svg.append("g")
             .attr("id", "scatterplot")
             .attr("clip-path", "url(#clip)");
		
		
		
  		// x-axis
  		svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis)
    	
  		// y-axis
  		svg.append("g")
  			.attr('id', "axis--y")
      		.attr("class", "y axis")
      		.call(yAxis)
      	
      	svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "1em")
            .style("text-anchor", "end")
      		.text("# of road accidents");
    
	  	scatter.selectAll(".dot1")
      		.data(data)
      		.enter().append("circle")
      		.attr("class", "dot1")
      		.attr("r", 3.5)
      		.attr("cx", function(d){
      			return x(d.State)+9;
        	})
      		.attr("cy", function(d){
      			return y(d.CLEAR);
      		})
      		.style("fill", function(d) { 
      			return colorx("CLEAR");
      		}) 
      		.on("click", function(d) {
      		console.log("dddd");
      			if(d.CLEAR > 10000){
      				d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
					scatter_div.transition()
					.duration(200)
					.style("opacity", .9);
					scatter_div.html("State: " +(d.State) + "\n"+"Num: "+(d.CLEAR))
					.style("left", (d3version4.event.pageX +5) + "px")
					.style("top", (d3version4.event.pageY - 28) + "px");
				}	
    
      			else{
      				d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
					bar_div.transition()
					.duration(200)
					.style("opacity", .9);
					bar_div.html("State: " +(d.State) + "\n"+"Num: "+(d.CLEAR))
					.style("left", (d3version4.event.pageX +5) + "px")
					.style("top", (d3version4.event.pageY - 28) + "px");
				}	
       		})
      
      		.on("mouseout", function(d) {
      			svg.select(".tooltip1").remove();
      			d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
         		scatter_div.transition()
               .duration(200)
               .style("opacity", 0);
                        
      			svg.select(".tooltip2").remove();
      			d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
      			bar_div.transition()
               .duration(200)
               .style("opacity", 0);
               
      		});
      		
      		
      

 			scatter.selectAll(".dot2")
      		.data(data)
     		.enter().append("circle")
      		.attr("class", "dot2")
      		.attr("r", 3.5)
      		.attr("cx", function(d){
        		return x(d.State)+9;
        	})
      		.attr("cy", function(d){
      			return y(d.FOG);
      		})
      		.style("fill", function(d) { 
      			return colorx("FOG");
      		}) 
      		.on("mouseover", function(d) {
      	if(d.FOG > 10000){
      	
      	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		scatter_div.transition()
			.duration(200)
			.style("opacity", .9);
		scatter_div.html("State: " +(d.State) +"\n"+"Num: "+(d.FOG))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
		}
		else{
		d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) +"\n"+"Num: "+(d.FOG))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
		}
				
       })
      .on("mouseout", function(d) {
      	svg.select(".tooltip1").remove();
        d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
        scatter_div.transition()
            .duration(500)
            .style("opacity", 0);
               
      	svg.select(".tooltip2").remove();
      	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
      	bar_div.transition()
          	.duration(200)
            .style("opacity", 0);
      });
      
      
      
 	scatter.selectAll(".dot3")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot3")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+9;
        })
      .attr("cy", function(d){
      	return y(d.OVERCAST);
      })
      .style("fill", function(d) { return colorx("OVERCAST");}) 
      .on("mouseover", function(d) {
      if(d.OVERCAST > 10000){
		d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		scatter_div.transition()
			.duration(200)
			.style("opacity", .9);
		scatter_div.html("State: " +(d.State) +"\n"+"Num: "+(d.OVERCAST))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
		}
	  else{
	  	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) +"\n"+"Num: "+(d.OVERCAST))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
	  }		
    })
      .on("mouseout", function(d) {
      svg.select(".tooltip1").remove();
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
	  scatter_div.transition()
        .duration(500)
        .style("opacity", 0);
        
      svg.select(".tooltip2").remove();
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
      bar_div.transition()
        .duration(200)
        .style("opacity", 0);
      });
      
      
      scatter.selectAll(".dot4")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot4")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+9;
        })
      .attr("cy", function(d){
      	return y(d.RAIN);
      })
      .style("fill", function(d) { return colorx("RAIN");}) 
      .on("mouseover", function(d) {
      if(d.RAIN > 10000){
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		scatter_div.transition()
			.duration(200)
			.style("opacity", .9);
		scatter_div.html("State: " +(d.State) +"\n"+"Num: "+(d.RAIN))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
		}
		else{
		d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) +"\n"+"Num: "+(d.RAIN))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
		}
				
       })
      .on("mouseout", function(d) {
      
      	svg.select(".tooltip1").remove();
        d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
          scatter_div.transition()
               .duration(500)
               .style("opacity", 0);
               
               
	  	svg.select(".tooltip2").remove();
      	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
      	bar_div.transition()
        	.duration(200)
        	.style("opacity", 0);
      });
      
      scatter.selectAll(".dot5")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot5")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+9;
        })
      .attr("cy", function(d){
      	return y(d.SNOW);
      })
      .style("fill", function(d) { return colorx("SNOW");}) 
      .on("mouseover", function(d) {
      if(d.SNOW > 10000){
      	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
			scatter_div.transition()
				.duration(200)
				.style("opacity", .9);
			scatter_div.html("State: " +(d.State) +"\n"+"Num: "+(d.SNOW))
				.style("left", (d3version4.event.pageX +5) + "px")
				.style("top", (d3version4.event.pageY - 28) + "px");
			}	
	  else{
	  d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
			bar_div.transition()
				.duration(200)
				.style("opacity", .9);
			bar_div.html("State: " +(d.State) +"\n"+"Num: "+(d.SNOW))
				.style("left", (d3version4.event.pageX +5) + "px")
				.style("top", (d3version4.event.pageY - 28) + "px");
	  }	
       })
      .on("mouseout", function(d) {
      
    	svg.select(".tooltip1").remove();
        d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
        scatter_div.transition()
			.duration(500)
            .style("opacity", 0);
               
      	svg.select(".tooltip2").remove();
      	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
      	bar_div.transition()
        	.duration(200)
        	.style("opacity", 0);
      });
      
      scatter.selectAll(".dot6")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot6")
      .attr("r", 3.5)
      .attr("cx", function(d){
      
        return x(d.State)+9;
        })
      .attr("cy", function(d){
      	return y(d.FREEZING);
      })
      .style("fill", function(d) { return colorx("FREEZING");}) 
      .on("mouseover", function(d) {
      if(d.FREEZING > 10000){
      d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		scatter_div.transition()
			.duration(200)
			.style("opacity", .9);
		scatter_div.html("State: " +(d.State) +"\n"+"Num: "+(d.FREEZING))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
	   }
	   else{
	    d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("State: " +(d.State) +"\n"+"Num: "+(d.FREEZING))
			.style("left", (d3version4.event.pageX +5) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
	   
	   }
       })
      .on("mouseout", function(d) {
       	svg.select(".tooltip1").remove();
        d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
        scatter_div.transition()
            .duration(500)
            .style("opacity", 0);
            
        svg.select(".tooltip2").remove();
      	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.0);
      	bar_div.transition()
        	.duration(200)
        	.style("opacity", 0);     
               
      });
      
      
		scatter.append("g")
            .attr("class", "brush")
            .call(brush);

        function brushended() {

            var s = d3version4.event.selection;
            if (!s) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
               
                 //x.domain(data.map(function(d) { return d.State; }));
  				 y.domain([0, d3version4.max(data, function(d) { return Math.max(d.CLEAR,d.OVERCAST,d.FOG,d.RAIN,d.SNOW,d.FREEZING); })]).nice();
  				 

      
            } else {
                
               
                y.domain([s[1][1], s[0][1]].map(y.invert, y));
                scatter.select(".brush").call(brush.move, null);
            }
            zoom();
        }

        function idled() {
            idleTimeout = null;
        }

        function zoom() {

            var t = scatter.transition().duration(750);
            
            svg.select("#axis--y").transition(t).call(yAxis);
            scatter.selectAll(".dot1").transition(t)
            .attr("cx", function (d) { return x(d.State)+9; })
            .attr("cy", function (d) { return y(d.CLEAR); });
            
             scatter.selectAll(".dot2").transition(t)
            .attr("cx", function (d) { return x(d.State)+9; })
            .attr("cy", function (d) { return y(d.FOG); });
            
             scatter.selectAll(".dot3").transition(t)
            .attr("cx", function (d) { return x(d.State)+9; })
            .attr("cy", function (d) { return y(d.OVERCAST); });
            
             scatter.selectAll(".dot4").transition(t)
            .attr("cx", function (d) { return x(d.State)+9; })
            .attr("cy", function (d) { return y(d.RAIN); });
            
             scatter.selectAll(".dot5").transition(t)
            .attr("cx", function (d) { return x(d.State)+9; })
            .attr("cy", function (d) { return y(d.SNOW); });
            
             scatter.selectAll(".dot6").transition(t)
            .attr("cx", function (d) { return x(d.State)+9; })
            .attr("cy", function (d) { return y(d.FREEZING); });
            
        }
 	 // draw legend
  	  var legend1 = svg.selectAll(".legend")
              .data([1,2,3,4,5,6])
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend1.append("rect")
              .attr("x", width )
              .attr("y", -10)
              .attr("width", 15)
              .attr("height", 15)
              .style("fill", colorx);

          legend1.append("text")
              .attr("x", width - 10)
              .attr("y", -2)
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