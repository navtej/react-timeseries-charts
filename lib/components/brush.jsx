/** @jsx React.DOM */

"use strict";

var d3 = require("d3");
var React = require("react");

var Brush = React.createClass({

    displayName: "Brush",

    getInitialState: function() {
        return {
            "d3brush": null
        };
    },

    handleBrushed: function(brush) {
        var extent = brush.extent();
        console.log("handleBrushed! ", extent);
        if (this.props.onBrushed) {
            this.props.onBrushed(brush,extent[0],extent[1]);
        }
    },

    renderBrush: function(timeScale,beginTime,endTime) {
        var d3brush = this.state.d3brush;
        var self = this;
        if (!d3brush) {
            d3brush = d3.svg.brush()
                .x(timeScale)
                .on("brush", function() {
                    self.handleBrushed(d3brush);
                });
            this.setState({"d3brush": d3brush});
        }
        d3brush.extent([beginTime,endTime]);

        d3.select(this.getDOMNode()).selectAll("*").remove();

        d3.select(this.getDOMNode())
            .append("g")
                .attr("class","x brush")
                .call(d3brush)
                .selectAll("rect")
                .attr("y", -6)
                .attr("height", this.props.height + 7);
    },

    componentDidMount: function() {
        this.renderBrush(this.props.timeScale,this.props.beginTime,this.props.endTime);
    },

    componentWillReceiveProps: function(nextProps) {
        var timeScale = nextProps.timeScale;
        var beginTime = nextProps.beginTime;
        var endTime = nextProps.endTime;

        if (this.props.timeScale != timeScale ||
            this.props.beginTime != beginTime ||
            this.props.endTime != endTime) {
                this.renderBrush(timeScale,beginTime,endTime);
        }
    },

    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        return <g/>;
    },
});

module.exports = Brush;