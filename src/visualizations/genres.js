// Genre Distribution Visualization - Sunburst Chart

function createGenreVisualization() {
    const container = d3.select('#genre-viz');
    const containerNode = container.node();
    if (!containerNode) return;

    container.html('');

    const width = containerNode.clientWidth;
    const height = 600;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    // Color scale
    const color = d3.scaleOrdinal()
        .domain(streamingData.genres.children.map(d => d.name))
        .range(streamingData.genres.children.map(d => d.color));

    // Pie layout
    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    // Arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8);

    const arcHover = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.85);

    // Create arcs
    const arcs = svg.selectAll('.arc')
        .data(pie(streamingData.genres.children))
        .enter()
        .append('g')
        .attr('class', 'arc');

    // Add paths
    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => d.data.color)
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .style('opacity', 0)
        .style('cursor', 'pointer')
        .transition()
        .delay((d, i) => i * 100)
        .duration(800)
        .style('opacity', 0.9)
        .attrTween('d', function (d) {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function (t) {
                return arc(interpolate(t));
            };
        });

    // Add labels
    arcs.append('text')
        .attr('transform', d => {
            const pos = arc.centroid(d);
            return `translate(${pos})`;
        })
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .style('opacity', 0)
        .text(d => d.data.name)
        .transition()
        .delay((d, i) => i * 100 + 400)
        .duration(600)
        .style('opacity', 1);

    // Add percentage labels
    arcs.append('text')
        .attr('transform', d => {
            const pos = arc.centroid(d);
            pos[1] += 18;
            return `translate(${pos})`;
        })
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-size', '12px')
        .style('opacity', 0)
        .text(d => {
            const total = d3.sum(streamingData.genres.children, g => g.value);
            const percent = ((d.data.value / total) * 100).toFixed(1);
            return `${percent}%`;
        })
        .transition()
        .delay((d, i) => i * 100 + 400)
        .duration(600)
        .style('opacity', 0.8);

    // Center text
    const centerText = svg.append('g')
        .attr('class', 'center-text');

    centerText.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '36px')
        .attr('font-weight', '700')
        .attr('fill', '#E50914')
        .attr('y', -10)
        .text('15,000+');

    centerText.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('fill', '#b3b3b3')
        .attr('y', 15)
        .text('Total Titles');

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute');

    // Interactions
    arcs.selectAll('path')
        .on('mouseover', function (event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('d', arcHover)
                .style('opacity', 1);

            const total = d3.sum(streamingData.genres.children, g => g.value);
            const percent = ((d.data.value / total) * 100).toFixed(1);

            tooltip.html(`
                <strong>${d.data.name}</strong><br/>
                Titles: ${d.data.value.toLocaleString()}<br/>
                Percentage: ${percent}%
            `)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px')
                .classed('visible', true);
        })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('d', arc)
                .style('opacity', 0.9);

            tooltip.classed('visible', false);
        });

    // Create legend
    const legend = d3.select('#genre-legend');
    legend.html('');

    streamingData.genres.children.forEach(genre => {
        const item = legend.append('div')
            .attr('class', 'legend-item');

        item.append('div')
            .attr('class', 'legend-color')
            .style('background-color', genre.color);

        item.append('span')
            .text(`${genre.name} (${genre.value.toLocaleString()})`);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createGenreVisualization);
} else {
    createGenreVisualization();
}

window.addEventListener('resize', debounce(createGenreVisualization, 250));
