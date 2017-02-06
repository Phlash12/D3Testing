
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    radius = width/2;


var color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);


var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);


var arc2 = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);


var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);


var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.count; });


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var svg2 = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.csv("data.csv", function(error, data) {
  if (error) throw error;

    data.forEach(function(d) {
        d.count = +d.count;
        d.fruit = d.fruit;
    })

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");


  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.fruit); })

    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenPie);
        

  g.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.fruit; });
    


  var g2 = svg2.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2");
 
  g2.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return color(d.data.fruit); })
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenDonut);
        
 
  g2.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.fruit; });
    
});

function tweenPie(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc(i(t)); };
}

function tweenDonut(b) {
  b.innerRadius = 0;
  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
  return function(t) { return arc2(i(t)); };
}