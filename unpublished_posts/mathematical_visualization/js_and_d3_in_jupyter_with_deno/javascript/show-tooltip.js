import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

/*---------------------------------------*/
////////////////// MAP 1 //////////////////
/*---------------------------------------*/

// Selects all elements with `id=state-path`and attaches an event-listener for a `mouseover` event
d3.selectAll("#state-path")
    .on("mouseover", showTooltips)
    .on("mouseout", hideTooltips);

// Tooltip
const mapNode = d3.select("#map-wrapper").node(); // Grab the DOM node, the DOM API provides `parentNode`, a method to getb the parent of an element
const parentNode = mapNode.parentNode;
const parentSelection = d3.select(parentNode);
const tooltip = parentSelection.append("div")
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

// Selects all elements with `id=zoomable-state-path`and attaches an event-listener for a `mouseover` event
d3.selectAll("#zoomable-state-path")
    .on("mouseover", showTooltips)
    .on("mouseout", hideTooltips);

// Tooltip (Map 2)
const _mapNode = d3.select("#zoomable-map-wrapper").node(); // Grab the DOM node, the DOM API provides `parentNode`, a method to getb the parent of an element
const _parentNode = _mapNode.parentNode;
const _parentSelection = d3.select(_parentNode);
const _tooltip = _parentSelection.append("div")
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

function showTooltips(event, d) {
    const left = parseInt(event.target.getAttribute("cx")) 
    const top = parseInt(event.target.getAttribute("cy")) - 610  // The additive term is the height of the <svg> wrapper
    tooltip
        // Set the state name displayed inside the tooltip
        .text(`${event.target.getAttribute("state-name")}`)
        .style("opacity", "1")
        // Set the position of the tooltip
        .style("left", `${left}px`)
        .style("top", `${top}px`);
    _tooltip
        // Set the state name displayed inside the tooltip
        .text(`${event.target.getAttribute("state-name")}`)
        .style("opacity", "1")
        // Set the position of the tooltip
        .style("left", `${left}px`)
        .style("top", `${top}px`);
}

function hideTooltips(event, d) {
    tooltip
        .style("opacity", "0");
    _tooltip
        .style("opacity", "0");
}