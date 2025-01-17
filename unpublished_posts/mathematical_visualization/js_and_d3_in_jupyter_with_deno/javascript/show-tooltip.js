import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/*---------------------------------------*/
////////////////// MAP 1 //////////////////
/*---------------------------------------*/

// Selects all elements with `id=state-path`and attaches an event-listener for a `mouseover` event
d3.selectAll("#state-path")
        .on("mouseover", showStateTooltips)
        .on("mouseout", hideStateTooltips);

// Tooltip
const statesMapSvg = d3.select("#state-map-wrapper").node(); // Grab the DOM node, the DOM API provides `parentNode`, a method to getb the parent of an element
const statesMapParentNode = statesMapSvg.parentNode;
const statesMapParentSelection = d3.select(statesMapParentNode);
const stateTooltip = statesMapParentSelection
    .append("div")
        .attr("id", "state-name-tooltip")
        .style("pointer-events", "none") // So that the tooltip doesn’t block mouse events
        .style("opacity", "0") // Hidden by default...
        .style("position", "relative")
        .style("width", "max-content")
        .style("padding", "4px 8px")
        .style("border", "1px solid #191516")
        .style("top", "0px")
        .style("left", "0px")
        .style("background", "#EBE8E7")
        .style("color", "#191516");

/*---------------------------------------*/
////////////////// MAP 2 //////////////////
/*---------------------------------------*/

// Selects all elements with `id=state-path`and attaches an event-listener for a `mouseover` event
d3.selectAll("#zoomable-state-path")
        .on("mouseover", showStateTooltips)
        .on("mouseout", hideStateTooltips);

// Tooltip
const _statesMapSvg = d3.select("#zoomable-state-map-wrapper").node(); // Grab the DOM node, the DOM API provides `parentNode`, a method to getb the parent of an element
const _statesMapParentNode = _statesMapSvg.parentNode;
const _statesMapParentSelection = d3.select(_statesMapParentNode);
const _stateTooltip = _statesMapParentSelection
    .append("div")
        .attr("id", "zoomable-state-name-tooltip")
        .style("pointer-events", "none") // So that the tooltip doesn’t block mouse events
        .style("opacity", "0") // Hidden by default...
        .style("position", "relative")
        .style("width", "max-content")
        .style("padding", "4px 8px")
        .style("border", "1px solid #191516")
        .style("top", "0px")
        .style("left", "0px")
        .style("background", "#EBE8E7")
        .style("color", "#191516");

/*---------------------------------------*/
////////////////// MAP 3 //////////////////
/*---------------------------------------*/

// Selects all elements with `id=state-path`and attaches an event-listener for a `mouseover` event
d3.selectAll("#zoomable-county-path")
        .on("mouseover", showCountyTooltips)
        .on("mouseout", hideCountyTooltips);

// Tooltip
const countiesMapSvg = d3.select("#zoomable-county-map-wrapper").node(); // Grab the DOM node, the DOM API provides `parentNode`, a method to getb the parent of an element
const countiesMapSvgParentNode = countiesMapSvg.parentNode;
const countiesMapSvgParentSelection = d3.select(countiesMapSvgParentNode);
const countyTooltip = countiesMapSvgParentSelection
    .append("div")
        .attr("id", "zoomable-county-name-tooltip")
        .style("pointer-events", "none") // So that the tooltip doesn’t block mouse events
        .style("opacity", "0") // Hidden by default...
        .style("position", "relative")
        .style("width", "max-content")
        .style("padding", "4px 8px")
        .style("border", "1px solid #191516")
        .style("top", "0px")
        .style("left", "0px")
        .style("background", "#EBE8E7")
        .style("color", "#191516");

/*------------------------------------------*/
////////////////// Behavior //////////////////
/*------------------------------------------*/

// Get global state state exclusively in zoom-in.js
let activated = d3.select("#zoomable-state-path").attr("activated") == "true" ? true : false; // Checks the first element only

function showStateTooltips(event, d) {
    const left = parseInt(event.target.getAttribute("cx"));
    const top = parseInt(event.target.getAttribute("cy")) - 610;  // The additive term is the height of the <svg> wrapper

    activated = event.target.getAttribute("activated") == "true" ? true : false;

    // Use for debugging
    // console.log(activated);

    stateTooltip
            // Set the state name displayed inside the tooltip
            .text(`${event.target.getAttribute("state-name")}`)
            .style("opacity", "1")
            // Set the position of the tooltip
            .style("left", `${left}px`)
            .style("top", `${top}px`);

    // For the second and third maps, we only show the tooltips if the state is not active
    if (!activated) {
        _stateTooltip
                // Set the state name displayed inside the tooltip
                .text(`${event.target.getAttribute("state-name")}`)
                .style("opacity", "1")
                // Set the position of the tooltip
                .style("left", `${left}px`)
                .style("top", `${top}px`);
    }
}

function showCountyTooltips(event, d) {
    const left = parseInt(event.target.getAttribute("cx"));
    const top = parseInt(event.target.getAttribute("cy")) - 610;  // The additive term is the height of the <svg> wrapper

    activated = event.target.getAttribute("activated") == "true" ? true : false;

    // Use for debugging
    // console.log(activated);

    countyTooltip
            // Set the state name displayed inside the tooltip
            .text(`${event.target.getAttribute("county-name")}`)
            .style("opacity", "1")
            // Set the position of the tooltip
            .style("left", `${left}px`)
            .style("top", `${top}px`);

}

function hideStateTooltips(event, d) {
    stateTooltip
            .style("opacity", "0");
    _stateTooltip
            .style("opacity", "0");
}

function hideCountyTooltips(event, d) {
    countyTooltip
            .style("opacity", "0");
}