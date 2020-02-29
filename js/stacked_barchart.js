month1("1");

var test = true;
function month1(month){
	
	//$("#stacked_barchart_div SVG_ID").html("");
setTimeout(function(){

var bar_margin = {top: 20, right: 20, bottom: 30, left: 40},
    bar_width = 900 - bar_margin.left - bar_margin.right,
    bar_height = 400 - bar_margin.top - bar_margin.bottom;

var bar_x = d3version4.scaleBand()
    .range([0.5, bar_width], .1);
    
var bar_y = d3version3.scale.linear()
    .rangeRound([bar_height, 0]);
var color = d3version3.scale.ordinal()
  .range(["#ffe082", "#81d4fa"]);

var bar_xAxis = d3version3.svg.axis()
    .scale(bar_x)
    .orient("bottom");

var bar_yAxis = d3version3.svg.axis()
    .scale(bar_y)
    .orient("left")
    .tickFormat(d3version3.format(".2s"));

var bar_div = d3version4.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3version4.select("#stacked_barchart_div").append("svg")
	.attr("id","SVG_ID")
    .attr("width", bar_width + bar_margin.left + bar_margin.right)
    .attr("height", bar_height + bar_margin.top + bar_margin.bottom)
  .append("g")
    .attr("transform", "translate(" + bar_margin.left + "," + bar_margin.top + ")");



var active_link = "0"; //to control legend selections and hover
var legendClicked; //to control legend selections
var legendClassArray = []; //store legend classes to select bars in plotSingle()
var legendClassArray_orig = []; //orig (with spaces)
var sortDescending; //if true, bars are sorted by height in descending order
var restoreXFlag = false; //restore order of bars back to original

var statetx;

d3version4.select("label")             
  .select("input")
  .property("disabled", true)
  .property("checked", false); 

d3version3.csv("FDB/"+month+".csv", function(error, data) {
//console.log(month);
  if (error) throw error;

  color.domain(d3version4.keys(data[0]).filter(function(key) { return key !== "State"; }));

  data.forEach(function(d) {
  
    var mystate = d.State; //add to stock code
    var y0 = 0;
    //d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.ages = color.domain().map(function(name) {
      //return { mystate:mystate, name: name, y0: y0, y1: y0 += +d[name]}; });
      return { 
        mystate:mystate, 
        name: name, 
        y0: y0, 
        y1: y0 += +d[name], 
        value: d[name],
        y_corrected: 0
      }; 
      });
    d.total = d.ages[d.ages.length - 1].y1;    

  });

  //Sort totals in descending order
  
  data.sort(function(a, b) { return b.total - a.total; });  

  bar_x.domain(data.map(function(d) { return d.State; }));
  bar_y.domain([0, d3version4.max(data, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(7," + bar_height + ")")
      .call(bar_xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(bar_yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
      //.text("Population");

	statex = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + "0" + ",0)"; });
      //.attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; })
      
   


   height_diff = 0;  //height discrepancy when calculating h based on data vs y(d.y0) - y(d.y1)
   statex.selectAll("rect")
      .data(function(d) {
        return d.ages; 
      })
    .enter().append("rect")
      .attr("width", bar_x.bandwidth)
      .attr("y", function(d) {
        height_diff = height_diff + bar_y(d.y0) - bar_y(d.y1) - (bar_y(0) - bar_y(d.value));
        y_corrected = bar_y(d.y1) + height_diff;
        d.y_corrected = y_corrected //store in d for later use in restorePlot()

        if (d.name === "Night") height_diff = 0; //reset for next d.mystate
          
        return y_corrected;    
        // return y(d.y1);  //orig, but not accurate  
      })
      .attr("x",function(d) { //add to stock code
          return bar_x(d.mystate)
        })
      .attr("height", function(d) {       
        //return y(d.y0) - y(d.y1); //heights calculated based on stacked values (inaccurate)
        return bar_y(0) - bar_y(d.value); //calculate height directly from value in csv file
      })
      .attr("class", function(d) {        
        classLabel = d.name.replace(/\s/g, ''); //remove spaces
        return "bars class" + classLabel;
      })
      .style("fill", function(d) { return color(d.name); });

  statex.selectAll("rect")
       .on("mouseover", function(d){

        var delta = d.y1 - d.y0;
          var xPos = parseFloat(d3version4.select(this).attr("x"));
          var yPos = parseFloat(d3version4.select(this).attr("y"));
          var height = parseFloat(d3version4.select(this).attr("height"))

          d3version4.select(this).attr("stroke","blue").attr("stroke-width",0.8);
          bar_div.transition()
				.duration(200)
				.style("opacity", .9);
			bar_div.html(d.name+":"+delta)
				.style("left", (d3version4.event.pageX) + "px")
				.style("top", (d3version4.event.pageY - 28) + "px");
          
       })
       .on("mouseout",function(){
          svg.select(".tooltip").remove();
          d3version4.select(this).attr("stroke","pink").attr("stroke-width",0.2);
          bar_div.transition() /* If we decide to use the second way for visualize this line and the follow two lines have to remove*/
        	.duration(300)
         	.style("opacity", 0); 
                                
        })


  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", function (d) {
        legendClassArray.push(d.replace(/\s/g, '')); //remove spaces
        legendClassArray_orig.push(d); //remove spaces
        return "legend";
      })
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  //reverse order to match order in which bars are stacked    
  legendClassArray = legendClassArray.reverse();
  legendClassArray_orig = legendClassArray_orig.reverse();

  legend.append("rect")
      .attr("x", bar_width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color)
      .attr("id", function (d, i) {
        return "id" + d.replace(/\s/g, '');
      })
      .on("mouseover",function(){        

        if (active_link === "0") d3version4.select(this).style("cursor", "pointer");
        else {
          if (active_link.split("class").pop() === this.id.split("id").pop()) {
            d3version4.select(this).style("cursor", "pointer");
          } else d3version4.select(this).style("cursor", "auto");
        }
      })
      .on("click",function(d){        

        if (active_link === "0") { //nothing selected, turn on this selection
          d3version4.select(this)           
            .style("stroke", "black")
            .style("stroke-width", 2);

            active_link = this.id.split("id").pop();
            plotSingle(this);

            //gray out the others
            for (i = 0; i < legendClassArray.length; i++) {
              if (legendClassArray[i] != active_link) {
                d3version4.select("#id" + legendClassArray[i])
                  .style("opacity", 0.5);
              } else sortBy = i; //save index for sorting in change()
            }

            //enable sort checkbox
            d3version4.select("label").select("input").property("disabled", false)
            d3version4.select("label").style("color", "black")
            //sort the bars if checkbox is clicked            
            d3version4.select("input").on("change", change);  
           
        } else { //deactivate
          if (active_link === this.id.split("id").pop()) {//active square selected; turn it OFF
            d3version4.select(this)           
              .style("stroke", "none");
            
            //restore remaining boxes to normal opacity
            for (i = 0; i < legendClassArray.length; i++) {              
                d3version4.select("#id" + legendClassArray[i])
                  .style("opacity", 1);
            }

            
            if (d3version4.select("label").select("input").property("checked")) {              
              restoreXFlag = true;
            }
            
            //disable sort checkbox
            d3version4.select("label")
              .style("color", "#D8D8D8")
              .select("input")
              .property("disabled", true)
              .property("checked", false);   


            //sort bars back to original positions if necessary
            change();            

            //y translate selected category bars back to original y posn
            restorePlot(d);

            active_link = "0"; //reset
          }

        } //end active_link check
                          
                                
      });

  legend.append("text")
      .attr("x", bar_width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

  // restore graph after a single selection
  function restorePlot(d) {
    //restore graph after a single selection
    d3version4.selectAll(".bars:not(.class" + class_keep + ")")
          .transition()
          .duration(500)
          .delay(function() {
            if (restoreXFlag) return 600;
            else return 750;
          })
          .attr("width", bar_x.bandwidth) //restore bar width
          .style("opacity", 1);

    //translate bars back up to original y-posn
    d3version4.selectAll(".class" + class_keep)
      .attr("x", function(d) { return bar_x(d.mystate); })
      .transition()
      .duration(500)
      .delay(function () {
        if (restoreXFlag) return 2000; //bars have to be restored to orig posn
        else return 0;
      })
      .attr("y", function(d) {
        //return y(d.y1); //not exactly correct since not based on raw data value
        return d.y_corrected; 
      });

    //reset
    restoreXFlag = false;
    
  }

  // plot only a single legend selection
  function plotSingle(d) {
        
    class_keep = d.id.split("id").pop();
    idx = legendClassArray.indexOf(class_keep);    
       
    //erase all but selected bars by setting opacity to 0
    d3version4.selectAll(".bars:not(.class" + class_keep + ")")
          .transition()
          .duration(500)
          .attr("width", 0) // use because svg has no zindex to hide bars so can't select visible bar underneath
          .style("opacity", 0);

    //lower the bars to start on x-axis  
   
    j=statex["_groups"];
    ((statex.selectAll("rect"))["_groups"]).forEach(function (d, i) {        
    
    divyArray = Array.from(d)
    
      //get height and y posn of base bar and selected bar
      h_keep = d3version3.select(divyArray[idx]).attr("height");
      y_keep = d3version3.select(divyArray[idx]).attr("y");  

      h_base = d3version3.select(divyArray[0]).attr("height");
      y_base = d3version3.select(divyArray[0]).attr("y");    

      h_shift = h_keep - h_base;
      y_new = y_base - h_shift;

      //reposition selected bars
      d3version3.select(divyArray[idx])
        .transition()
        .ease("bounce")
        .duration(500)
        .delay(750)
        .attr("y", y_new);

    })
   
  }

  //adapted change() fn in http://bl.ocks.org/mbostock/3885705
  function change() {

    if (this.checked) sortDescending = true;
    else sortDescending = false;

    colName = legendClassArray_orig[sortBy];

    var x0 = bar_x.domain(data.sort(sortDescending
        ? function(a, b) { return b[colName] - a[colName]; }
        : function(a, b) { return b.total - a.total; })
        .map(function(d,i) { return d.State; }))
        .copy();

    statex.selectAll(".class" + active_link)
         .sort(function(a, b) { 
          //console.log(x0(a.mystate) - x0(b.mystate))
            return x0(a.mystate) - x0(b.mystate); 
          });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 20; };

    //sort bars
    transition.selectAll(".class" + active_link)
      .delay(delay)
      .attr("x", function(d) {      
        return x0(d.mystate); 
      });      

    //sort x-labels accordingly    
    transition.select(".x.axis")
        .call(bar_xAxis)
        .selectAll("g")
        .delay(delay);

   
    transition.select(".x.axis")
        .call(bar_xAxis)
      .selectAll("g")
        .delay(delay);    
  }

});



},0);
}
var statesDN = [];
function loadDataMonth(month){
	test=false;
    d3version4.csv("FDB/"+month+".csv", type, function(error, data) {
  
     for (var i = 0; i < data.length; i++) {
		 
		var dataState = jsonStates[data[i].State];
        // Grab Month Number
        var dataMonth = month;
         
        var dataValue=[];
        
        dataValue[0] = +data[i].Day;
        
        dataValue[1] = +data[i].Night;
         
        statesDN[dataState] = dataValue
        
        
	 }
	 
    svg.selectAll("line").remove()
    svg.selectAll("rect")
      .style("fill", function(d){
        return color;
    })
    
    d3version3.selectAll("#SVG_ID").remove()
    month1(month);
    /*
    console.log(svg.selectAll(".rect"))
    statex.selectAll("rect.bars.classDay")
       .each(function(d){
      
	
		if (statesDN[jsonStates[d.mystate]] == undefined){
			d.y1=0;
		}
		else{
			d.y1 = statesDN[jsonStates[d.mystate]][0];
		}
        
		})
		
		.attr("y", function(d) {return bar_y(d.y1); })
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

    
    statex.selectAll("rect.bars.classNight")
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
       });*/
    
})};
$(document).ready(function() {
	

    
$("#usa_svgg path").on("mouseover",function(e){
    //console.log("Ddd")
    })
});
    

function type(d) {
  d.Day = +d.Day;
  d.Night = +d.Night;
  return d;
}