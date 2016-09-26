
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


var kvPairs = []

$.each(data, function(key, value){
  var temp = {
    "label": key.replace(/-/g, ' '),
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
