var data1 = [{
        name: 'IE',
        percent: 39.10
    },
    {
        name: 'Chrome',
        percent: 32.51
    },
    {
        name: 'Safari',
        percent: 13.68
    },
    {
        name: 'Firefox',
        percent: 8.71
    },
    {
        name: 'Others',
        percent: 6.01
    }
]

var data2 = [{
        label: "Category 1",
        value: 19
    },
    {
        label: "Category 2",
        value: 5
    },
    {
        label: "Category 3",
        value: 13
    },
    {
        label: "Category 4",
        value: 17
    },
    {
        label: "Category 5",
        value: 19
    },
    {
        label: "Category 6",
        value: 27
    }
]
var data3 = [
    {name: 'cats', count: 3, percentage: 2, color: '#000000'},
    {name: 'dogs', count: 10, percentage: 8, color: '#f8b70a'},
    {name: 'horses', count: 17, percentage: 15, color: '#6149c6'},
    {name: 'goats', count: 47, percentage: 41, color: '#9f8170'},
    {name: 'cows', count: 35, percentage: 31, color: '#8ABD4A'},
  ];

function pie_donut_chart(config) {
    var pie = d3.pie()
        .value(function (d) {
            return d[config.val]
        })
        .sort(null)
        .padAngle(.03);

    var w = 500,
        h = 500;

    var outerRadius = w / 3;
    var innerRadius = config.innerRadius;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    var svg = d3.select("#" + config.selector)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", 'shadow')
        .append('g')
        .attr("transform", 'translate(' + (w / 3) + ',' + h / 3 + ')');

    var path = svg.selectAll('path')
        .data(pie(config.data))
        .enter()
        .append('path')
        .attr("d", arc)
        .attr("fill", function (d, i) {
            return color(d.data[config.key]);
        });

    path.transition()
        .duration(1000)
        .attrTween('d', function (d) {
            var interpolate = d3.interpolate({
                startAngle: 0,
                endAngle: 0
            }, d);
            return function (t) {
                return arc(interpolate(t));
            };
        });


    var restOfTheData = function () {
        var text = svg.selectAll('text')
            .data(pie(config.data))
            .enter()
            .append("text")
            .transition()
            .duration(200)
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".4em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.data[config.val];
            })
            .style("fill", '#fff')
            .style('font-size', '10px');

        var legendRectSize = 20;
        var legendSpacing = 7;
        var legendHeight = legendRectSize + legendSpacing;


        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr("class", 'legend')
            .attr("transform", function (d, i) {
                //Just a calculation for x & y position
                return 'translate(200,' + ((i * legendHeight) - 100) + ')';
            });
        legend.append('rect')
            .attr("width", legendRectSize)
            .attr("height", legendRectSize)
            .attr("rx", 20)
            .attr("ry", 20)
            .style("fill", color)
            .style("stroke", color);

        legend.append('text')
            .attr("x", 30)
            .attr("y", 15)
            .text(function (d) {
                return d;
            })
            .style("fill", '#929DAF')
            .style('font-size', '14px')
    };

    setTimeout(restOfTheData, 1000);
}
var config1 = {
    selector: "pie_donut_chart1",
    data: data1,
    key: "name",
    val: "percent",
    innerRadius: 0
}
var config2 = {
    selector: "pie_donut_chart2",
    data: data2,
    key: "label",
    val: "value",
    innerRadius: 50
}
var config3 = {
    selector: "pie_donut_chart3",
    data: data3,
    key: "name",
    val: "percentage",
    innerRadius: 100
}

pie_donut_chart(config1)
pie_donut_chart(config2)
pie_donut_chart(config3)