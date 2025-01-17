import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/*---------------------------------------*/
////////////////// MAP 2 //////////////////
/*---------------------------------------*/

// Selects the <svg> map wrapper element by `id` and attaches the `reset` callback to its click event
const stateMapSvg = d3.select("#zoomable-state-map-wrapper")
    .on("click", resetStateView);

// Selects the group of states within the <svg>
const groupOfStates = d3.select("#zoomable-group-of-states");

// Tooltip
const stateTooltip = d3.select("#zoomable-state-name-tooltip");

/*---------------------------------------*/
////////////////// MAP 3 //////////////////
/*---------------------------------------*/

// Selects the <svg> map wrapper element by `id` and attaches the `reset` callback to its click event
const countiesMapSvg = d3.select("#zoomable-county-map-wrapper")
    .on("click", resetCountyView);

// Selects the group of counties within the <svg>
const groupOfCounties = d3.select("#zoomable-group-of-counties");

// Tooltip
const countyTooltip = d3.select("#zoomable-county-name-tooltip");

/*------------------------------------------*/
////////////////// Behavior //////////////////
/*------------------------------------------*/

/*--------------------------------- Global State -----------------------------------*/
let activated = false; // Keeps track of whether a state has been clicked into or not
// Get properties of <svg> wrapper...
const width = stateMapSvg.attr("width");
const height = stateMapSvg.attr("height");
/*----------------------------------------------------------------------------------*/

// Define a zoom behavior in D3
// Restrict scaling between 1x-8x 
// Add a callback function for zoom events like drag, and mousewheeel
const zoomBehaviorStateMap = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomInStates);
const zoomBehaviorCountyMap = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomInCounties);
// Binds the zoom behavior to the <svg> (`#zoomable-map-container`)
stateMapSvg.call(zoomBehaviorStateMap);
countiesMapSvg.call(zoomBehaviorCountyMap);

// Zooms in using mousewheel, pans using drag
function zoomInStates(event, d) {
    const {transform} = event;
    groupOfStates
        .attr("transform", transform)
        .attr("stroke-width", 1 / transform.k);
    stateTooltip
        .style("opacity", "0");
}

// Zooms in using mousewheel, pans using drag
function zoomInCounties(event, d) {
    const {transform} = event;
    groupOfCounties
        .attr("transform", transform)
        .attr("stroke-width", 1 / transform.k);
    countyTooltip
        .style("opacity", "0");
}    

// Selects the states (elements with `id=zoomable-state-path`) and attaches an event-listener for a `click` event
const states = d3.selectAll("#zoomable-state-path")
    .on("click", zoomIntoState)

// Selects the counties (elements with `id=zoomable-county-path`) and attaches an event-listener for a `click` event
const counties = d3.selectAll("#zoomable-county-path")
    .on("click", zoomIntoCounty)

// Reset zoom level
function resetStateView(event, d) {
    groupOfStates.transition().style("fill", null);
    stateMapSvg.transition().duration(750).call(
        zoomBehaviorStateMap.transform,
        d3.zoomIdentity,
        d3.zoomTransform(stateMapSvg.node()).invert([width / 2, height / 2])
    );
    stateTooltip
        .style("opacity", "0");
    d3.selectAll("#zoomable-state-path").attr("activated", "false");
}

// Reset zoom level
function resetCountyView(event, d) {
    groupOfCounties.transition().style("fill", null);
    countiesMapSvg.transition().duration(750).call(
        zoomBehaviorCountyMap.transform,
        d3.zoomIdentity,
        d3.zoomTransform(countiesMapSvg.node()).invert([width / 2, height / 2])
    );
    countyTooltip
        .style("opacity", "0");
    d3.selectAll("#zoomable-county-path").attr("activated", "false");
}

// Zoom into state
function zoomIntoState(event, d) {
    
    // Get bounding box coordinates
    const x0 = parseInt(event.target.getAttribute("x0"));
    const y0 = parseInt(event.target.getAttribute("y0"));
    const x1 = parseInt(event.target.getAttribute("x1"));
    const y1 = parseInt(event.target.getAttribute("y1"));
    // Get global boolean state (clicked/unclicked)
    activated = event.target.getAttribute("activated") == "true" ? true : false;

    // Use for debugging
    // console.log(activated);

    event.stopPropagation();

    if (activated) { // Zoom out if a click event is registered on an activated state
        resetStateView(event, d); // resetView itself sets attr `activated` to `false`
    }  
    if (!activated) { // Zoom in otherwise, and activate state
        states.transition().style("fill", null);
        stateMapSvg.transition().duration(750).call(
            zoomBehaviorStateMap.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))) // Never exceed max scale
                .translate(-(x0 + x1) / 2, - (y0 + y1) / 2),
            d3.pointer(event, stateMapSvg.node())
        );
        d3.selectAll("#zoomable-state-path").attr("activated", "true");
    }
}

// Zoom into county
function zoomIntoCounty(event, d) {
    
    // Get bounding box coordinates
    const x0 = parseInt(event.target.getAttribute("x0"));
    const y0 = parseInt(event.target.getAttribute("y0"));
    const x1 = parseInt(event.target.getAttribute("x1"));
    const y1 = parseInt(event.target.getAttribute("y1"));
    // Get global boolean state (clicked/unclicked)
    activated = event.target.getAttribute("activated") == "true" ? true : false;

    // Use for debugging
    // console.log(activated);

    event.stopPropagation();

    if (activated) { // Zoom out if a click event is registered on an activated state
        resetCountyView(event, d); // resetView itself sets attr `activated` to `false`
    }  
    if (!activated) { // Zoom in otherwise, and activate state
        counties.transition().style("fill", null);
        countiesMapSvg.transition().duration(750).call(
            zoomBehaviorCountyMap.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))) // Never exceed max scale
                .translate(-(x0 + x1) / 2, - (y0 + y1) / 2),
            d3.pointer(event, countiesMapSvg.node())
        );
        d3.selectAll("#zoomable-county-path").attr("activated", "true");
    }
}