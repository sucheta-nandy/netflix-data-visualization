// Global Viewership Map Visualization

function createGlobalMapVisualization() {
    const container = d3.select('#map-viz');
    const containerNode = container.node();
    if (!containerNode) return;

    container.html('');

    const width = containerNode.clientWidth;
    const height = 600;

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a simple bubble map instead of choropleth for simplicity
    // Position countries manually for visual appeal
    const countryPositions = {
        'USA': { x: 200, y: 200 },
        'BRA': { x: 350, y: 400 },
        'GBR': { x: 500, y: 150 },
        'MEX': { x: 180, y: 280 },
        'DEU': { x: 550, y: 160 },
        'FRA': { x: 520, y: 180 },
        'JPN': { x: 850, y: 220 },
        'IND': { x: 720, y: 280 },
        'KOR': { x: 870, y: 210 },
        'ESP': { x: 490, y: 210 },
        'ITA': { x: 550, y: 200 },
        'CAN': { x: 220, y: 120 },
        'AUS': { x: 850, y: 450 },
        'ARG': { x: 340, y: 480 },
        'POL': { x: 580, y: 140 },
        'NLD': { x: 530, y: 145 },
        'TUR': { x: 620, y: 210 },
        'SWE': { x: 560, y: 110 },
        'PHL': { x: 820, y: 320 },
        'THA': { x: 780, y: 310 }
    };

    // Add background world map effect
    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#0a0a0a');

    // Add grid lines for map effect
    const gridGroup = svg.append('g').attr('class', 'grid-lines');

    for (let i = 0; i < width; i += 50) {
        gridGroup.append('line')
            .attr('x1', i)
            .attr('y1', 0)
            .attr('x2', i)
            .attr('y2', height)
            .attr('stroke', '#1a1a1a')
            .attr('stroke-width', 1);
    }

    for (let i = 0; i < height; i += 50) {
        gridGroup.append('line')
            .attr('x1', 0)
            .attr('y1', i)
            .attr('x2', width)
            .attr('y2', i)
            .attr('stroke', '#1a1a1a')
            .attr('stroke-width', 1);
    }

    // Scale for bubble size
    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(streamingData.globalViewership, d => d.subscribers)])
        .range([5, 50]);

    // Color scale for engagement
    const colorScale = d3.scaleSequential()
        .domain([75, 95])
        .interpolator(d3.interpolateRgb('#8B0000', '#E50914'));

    // Create bubbles
    const bubbles = svg.selectAll('.country-bubble')
        .data(streamingData.globalViewership.filter(d => countryPositions[d.code]))
        .enter()
        .append('g')
        .attr('class', 'country-bubble')
        .attr('transform', d => {
            const pos = countryPositions[d.code];
            return `translate(${pos.x},${pos.y})`;
        });

    // Add glow effect
    const defs = svg.append('defs');
    const filter = defs.append('filter')
        .attr('id', 'glow');

    filter.append('feGaussianBlur')
        .attr('stdDeviation', '3.5')
        .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Add circles
    bubbles.append('circle')
        .attr('r', 0)
        .attr('fill', d => colorScale(d.engagement))
        .attr('opacity', 0.7)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#glow)')
        .style('cursor', 'pointer')
        .transition()
        .delay((d, i) => i * 50)
        .duration(1000)
        .attr('r', d => sizeScale(d.subscribers));

    // Add country labels
    bubbles.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', 4)
        .attr('fill', '#fff')
        .attr('font-size', d => Math.max(10, sizeScale(d.subscribers) / 3))
        .attr('font-weight', '700')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .text(d => d.code)
        .transition()
        .delay((d, i) => i * 50 + 500)
        .duration(600)
        .style('opacity', 1);

    // Tooltip
    const tooltip = d3.select('#map-tooltip');

    // Interactions
    bubbles.selectAll('circle')
        .on('mouseover', function (event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('opacity', 1)
                .attr('stroke-width', 3);

            tooltip.html(`
                <div style="padding: 10px;">
                    <strong style="font-size: 16px; color: #E50914;">${d.country}</strong><br/>
                    <div style="margin-top: 8px;">
                        <div style="margin: 4px 0;">Subscribers: <strong>${d.subscribers}M</strong></div>
                        <div style="margin: 4px 0;">Engagement: <strong>${d.engagement}%</strong></div>
                    </div>
                </div>
            `)
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 15) + 'px')
                .style('opacity', 1);
        })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('opacity', 0.7)
                .attr('stroke-width', 2);

            tooltip.style('opacity', 0);
        });

    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('fill', '#b3b3b3')
        .attr('font-size', '14px')
        .text('Bubble size = Subscribers (millions) | Color intensity = Engagement level');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createGlobalMapVisualization);
} else {
    createGlobalMapVisualization();
}

window.addEventListener('resize', debounce(createGlobalMapVisualization, 250));
