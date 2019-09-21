var bar_margin = {top: 40, right: 20, bottom: 30, left: 40},

    bar_width = 900  - bar_margin.left - bar_margin.right,
    bar_height = 400 - bar_margin.top - bar_margin.bottom;
    
var selectedBarHeight = 0;

var bar_x = d3version4.scaleBand()
    .range([0, bar_width], .1);

var bar_y = d3version4.scaleLinear()
    .range([bar_height, 0]);

var color = d3version3.scale.ordinal()
    .range(["#000080", "#008000"]);

var bar_xAxis = d3version4.axisBottom(bar_x)
    //.scale(x)
    //.orient("bottom");

var bar_yAxis = d3version4.axisLeft(bar_y)
    .tickFormat(d3version4.formatPrefix(".1", 1e3));

var svgg = d3version4.select("#stacked_barchart_div").append("svg")
    .attr("width", bar_width + bar_margin.left + bar_margin.right)
    .attr("height", bar_height + bar_margin.top + bar_margin.bottom)
  .append("g")
    .attr("transform", "translate(" + bar_margin.left + "," + bar_margin.top + ")")
    //.on("mouseclick",removeAllProp)
    
var active_link = "0"; //to control legend selections and hover
var legendClicked; //to control legend selections
var legendClassArray = []; //store legend classes to select bars in plotSingle()
var y_orig; //to store original y-posn


var bar_div = d3version4.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3version4.csv("1.csv", type, function(error, data) {
    
  color.domain(d3version3.keys(data[0]).filter(function(key) { return key !== "State"; }));
  
  data.forEach(function(d) {
    var mystate = d.State; //add to stock code
    var y0 = 0;
    //d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.ages = color.domain().map(function(name) { return {mystate:mystate, name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;

  });
  
  
  bar_x.domain(data.map(function(d) { return d.State; }));
  bar_y.domain([0, d3version4.max(data, function(d) { return d.total; })]);


  svgg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + bar_height + ")")
      .call(bar_xAxis);

  svgg.append("g")
      .attr("class", "y axis")
      .call(bar_yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# of road accidents");
     
  
   var state = svgg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + "0" + ",0)"; });
    
     state.selectAll("rect")
      .data(function(d) {
        return d.ages; 
      })
    .enter().append("rect")
      .attr("width", bar_x.bandwidth)
      .attr("y", function(d) { return bar_y(d.y1); })
      .attr("x",function(d) { //add to stock code
          return bar_x(d.mystate)
        })
      .attr("height", function(d) { return bar_y(d.y0) - bar_y(d.y1); })
      .attr("class", function(d) {
        classLabel = d.name.replace(/\s/g, ''); //remove spaces
        return "class" + classLabel;
      })
      .style("fill", function(d) { return color(d.name); });
	  
  state.selectAll("rect")
       .on("mouseover", function(d){

          var delta = d.y1 - d.y0;
          var xPos = parseFloat(d3version3.select(this).attr("x"));
          var yPos = parseFloat(d3version3.select(this).attr("y"));
          var height = parseFloat(d3version3.select(this).attr("height"))

          d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
          bar_div.transition()
				.duration(200)
				.style("opacity", .9);
			bar_div.html(d.name+":"+delta)
				.style("left", (d3version4.event.pageX) + "px")
				.style("top", (d3version4.event.pageY - 28) + "px");
				
		  /* second way to visualize the legend close the rect
          svgg.append("text")
          .attr("x",xPos)
          .attr("y",yPos +height/2)
          .attr("class","tooltip")
          .text(d.name+":"+ delta);  */
          
       })
       .on("mouseout",function(){
          svgg.select(".tooltip").remove();
          d3version3.select(this).attr("stroke","pink").attr("stroke-width",0.2);
          bar_div.transition() /* If we decide to use the second way for visualize this line and the follow two lines have to remove*/
        	.duration(500)
         	.style("opacity", 0);                      
        })


  var legend = svgg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      //.attr("class", "legend")
      .attr("class", function (d) {
        //legendClassArray.push(d.replace(/\s/g, '')); //remove spaces
        return "legend";
      })
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  //reverse order to match order in which bars are stacked    
  legendClassArray = legendClassArray.reverse();

  legend.append("rect")
      .attr("x", width - 18+200)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color)
      .attr("id", function (d, i) {
        return "id" + d.replace(/\s/g, '');
      })
      

   legend.append("text")
      .attr("x", width - 24+200)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

 
});
var statesDN = [];

function loadDataMonth(month){
	
	
	
    d3version4.csv(month+".csv", type, function(error, data) {
    console.log(data);
     for (var i = 0; i < data.length; i++) {
		 
		var dataState = jsonStates[data[i].State];
        // Grab Month Number
        var dataMonth = month;
         
        var dataValue=[];
        
        dataValue[0] = +data[i].Day;
        
         dataValue[1] = +data[i].Night;
         
         statesDN[dataState] = dataValue
        
        
	 }
	 
    svgg.selectAll("line").remove()
    svgg.selectAll("rect")
      .style("fill", function(d){
        return color;
    })
    
    
    svgg.selectAll(".classDay")
       .each(function(d){
		console.log(d.mystate)
		if (statesDN[jsonStates[d.mystate]] == undefined){
			d.y1=0;
		}
		else{
			d.y1 = statesDN[jsonStates[d.mystate]][0];
		}
        
		})
		.attr("y", function(d) { return bar_y(d.y1); })
		.attr("height", function(d) { return bar_y(d.y0) - bar_y(d.y1); })
		.on("mouseover", function(d) {
		 d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);

			bar_div.transition()
				.duration(200)
				.style("opacity", .9);
			bar_div.html("Day:" + +(d.y1 - selectedBarHeight))
				.style("left", (d3version4.event.pageX) + "px")
				.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
     .on("mouseout", function(d) {
     	d3version3.select(this).attr("stroke","pink").attr("stroke-width",0.2);
		bar_div.transition()
        	.duration(500)
         	.style("opacity", 0);
       });

    
    svgg.selectAll(".classNight")
       .each(function(d){
		   
		   if (statesDN[jsonStates[d.mystate]] == undefined){
				d.y0=0;
				d.y1=0;
			}
			else{
				d.y0 = statesDN[jsonStates[d.mystate]][0];
				d.y1= statesDN[jsonStates[d.mystate]][0]+ statesDN[jsonStates[d.mystate]][1];
        
			}
    })
    .attr("y", function(d) { return bar_y(d.y1); })
    .attr("height", function(d) { console.log(d);return bar_y(d.y0) - bar_y(d.y1); })
    .on("mouseover", function(d) {
    	d3version3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		bar_div.transition()
			.duration(200)
			.style("opacity", .9);
		bar_div.html("Night:" + +(d.y1 - d.y0))
			.style("left", (d3version4.event.pageX) + "px")
			.style("top", (d3version4.event.pageY - 28) + "px");
				
       })
    .on("mouseout", function(d) {
    	d3version3.select(this).attr("stroke","pink").attr("stroke-width",0.2);
		bar_div.transition()
        	.duration(500)
        	.style("opacity", 0);
       });
    
})};
$(document).ready(function() {
	

    
$("#usa_svg path").on("mouseover",function(e){
    console.log("Ddd")
    })
});
    

function type(d) {
  d.Day = +d.Day;
  d.Night = +d.Night;
  return d;
}
