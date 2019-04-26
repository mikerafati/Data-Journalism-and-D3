// @TODO: YOUR CODE HERE!
// Set up our chart
var svgWidth=825;
var svgHeight = 500;

var margin = {
	top: 60,
	right: 40,
	bottom: 100,
	left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3
	.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight)
	

// Append group element
	var chart = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

//   d3.select("body")
// 	 .append("div")
// 	 .attr("class", "tooltip")
// 	 .style("opacity", 1)

// Import data from the data.csv file, call the function healthData
URL='https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UTAUS201810DATA2/master/16_D3/Homework/Instructions/StarterCode/assets/data/data.csv?token=AD5I43BKASBYBRINP6KDJZS4ZOKVU'
d3.csv(URL).then(function(data){
//   d3.csv("../assets/data/data.csv", function(error, Data) {
// 	if (error) throw error;

 // Parse data
  data.forEach(function(data) {
	data.poverty=+data.poverty
	data.healthcare=+data.healthcare
	console.log(data)
  })

  var max = 0;
  data.forEach(function(state) {
	  if (state.healthcare > max) {
		  max = state.healthcare
	  }
  })
  console.log(max);
  //create scale function
  var xLinearScale=d3.scaleLinear()
	  .domain([8,d3.max(data, d=>d.poverty)])
	  .range([0,chartWidth])

  var yLinearScale=d3.scaleLinear()
	  .domain([4, d3.max(data, d=> d.healthcare )]) 
	  .range([chartHeight, 0])

  //create axis function

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale)
  // Append Axes to the Chart
  chart.append('g')
	  .attr('transform', `translate(0, ${chartHeight})`)
	  .call(bottomAxis)

  chart.append ('g')
	  .call(leftAxis)

  // create circles
  var circleGroup= chart.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', d=> xLinearScale(d.poverty))
  .attr('cy', d=> yLinearScale(d.healthcare))
  .attr('r', "15")
  .attr("fill", "blue")
  .attr("opacity", "0.3")

  // create text in circles

  var textGroup=chart.selectAll('circle').select('text')
  .data(data)
  .enter()
  .append('text')
  .attr('x', d=> xLinearScale(d.poverty)-5)
  .attr('y', d=> yLinearScale(d.healthcare)+3)
  .attr('font-size', '10')
  .attr('fill','white')
  .text(d=>d.abbr)


  chart.append('text')
	  .attr('transform', 'rotate(-90)')
	  .attr("y", 0 - margin.left +40)
	  .attr('x', 0 - (chartHeight/2))
	  .attr("dy", "1em")
	  .attr("class", "axisText")
	  .text("Lacks Healthcare %")
	  
  chart.append("text")
	  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
	  .attr("class", "axisText")
	  .text("In Poverty%");    
})