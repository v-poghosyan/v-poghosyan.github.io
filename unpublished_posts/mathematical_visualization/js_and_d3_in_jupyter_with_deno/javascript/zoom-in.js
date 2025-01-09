import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Selects the <svg> map-wrapper element by `id` and attaches the `reset` callback to its click event
const svg = d3.select("#zoomable-map-wrapper")
    .on("click", resetView);

// Selects the group of states within the <svg>
const groupOfStates = d3.select("#zoomable-group-of-states")

// Define a zoom behavior in D3 (rrestricting its scaling between 1x-8x, and adding a callback function for zoom events like `pinch`, `mousewheeel`)
const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomIn);
// Binds the zoom behavior to the <svg> (`#zoomable-map-container`)
svg.call(zoom);

// Zooms in using mousewheel, pans using drag
function zoomIn(event, d) {
    const {transform} = event;
    groupOfStates
        .attr("transform", transform)
        .attr("stroke-width", 1 / transform.k);
}    

// Selects the states (elements with `id=zoomable-state-path`) and attaches an event-listener for a `click` event
const states = d3.selectAll("#zoomable-state-path")
    .on("click", zoomIntoState)

// Reset zoom level
const width = svg.attr("width")
const height = svg.attr("height")
function resetView(event, d) {
    groupOfStates.transition().style("fill", null);
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
}

// Zoom into state
function zoomIntoState(event, d) {
    const x0 = parseInt(event.target.getAttribute("x0"));
    const y0 = parseInt(event.target.getAttribute("y0"));
    const x1 = parseInt(event.target.getAttribute("x1"));
    const y1 = parseInt(event.target.getAttribute("y1"));

    event.stopPropagation();

    states.transition().style("fill", null);
    d3.select(self).transition().style("fill", "red");
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))) // Never exceed max scale
            .translate(-(x0 + x1) / 2, - (y0 + y1) / 2),
        d3.pointer(event, svg.node())
    );
}