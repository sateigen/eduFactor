// var svg = d3.select("svg"),
//     margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom;
//
// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//     y = d3.scaleLinear().rangeRound([height, 0]);
//
// var g = svg.append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// for (var key in data) { if (data.hasOwnProperty(key)) { console.log(key + ':' + data[key]); } }
nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      .showYAxis(false)
      .staggerLabels(false)    //Too many bars and not enough room? Try staggering labels.
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      .transitionDuration(350)
      .color(['#74CFe4', '#EF754A', '#6dc090', '#ECBE45'])
      ;

  chart.valueFormat(d3.format('f'))
  d3.select('#chart svg')
      .datum(getData())
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});
//
// $('#chart').on('$locationChangeStart', function(event) {
//   window.onresize = null;
// });

var kvPairs = []

$.each(data, function(key, value){
  var temp = {
    "label": key,
    "value": value
  }
  kvPairs.push(temp)
})

function getData(data){
  return [
    {
      key: "Cumulative Return",
      values: kvPairs
    }
  ]
}
