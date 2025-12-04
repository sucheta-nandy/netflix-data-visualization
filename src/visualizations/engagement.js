// Engagement Metrics Visualization

function createEngagementVisualization() {
    const container = d3.select('#engagement-viz');
    const containerNode = container.node();
    if (!containerNode) return;

    container.html('');

    const margin = { top: 40, right: 60, bottom: 60, left: 80 };
    const width = containerNode.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = streamingData.weeklyEngagement;

    // Scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.day))
        .range([0, width])
        .padding(0.3);

    const y1 = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.hours) * 1.1])
        .range([height, 0]);

    const y2 = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .attr('opacity', 0.1)
        .call(d3.axisLeft(y1)
            .tickSize(-width)
            .tickFormat(''));

    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y1));

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${width},0)`)
        .call(d3.axisRight(y2));

    // Y-axis labels
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#E50914')
        .attr('font-size', '14px')
        .text('Avg Watch Hours');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', width + 50)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#46D369')
        .attr('font-size', '14px')
        .text('Completion Rate (%)');

    // Bars for hours
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.day))
        .attr('y', height)
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .attr('fill', '#E50914')
        .attr('rx', 4)
        .style('cursor', 'pointer');

    bars.transition()
        .delay((d, i) => i * 100)
        .duration(1000)
        .attr('y', d => y1(d.hours))
        .attr('height', d => height - y1(d.hours));

    // Line for completion rate
    const line = d3.line()
        .x(d => x(d.day) + x.bandwidth() / 2)
        .y(d => y2(d.completionRate))
        .curve(d3.curveMonotoneX);

    const linePath = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#46D369')
        .attr('stroke-width', 3)
        .attr('d', line);

    // Animate line
    const totalLength = linePath.node().getTotalLength();
    linePath
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

    // Dots on line
    const dots = svg.selectAll('.line-dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'line-dot')
        .attr('cx', d => x(d.day) + x.bandwidth() / 2)
        .attr('cy', d => y2(d.completionRate))
        .attr('r', 0)
        .attr('fill', '#46D369')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');

    dots.transition()
        .delay((d, i) => i * 100 + 500)
        .duration(500)
        .attr('r', 6);

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute');

    // Bar interactions
    bars.on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', '#F40612');

        tooltip.html(`
            <strong>${d.day}</strong><br/>
            Watch Hours: ${d.hours}<br/>
            Completion Rate: ${d.completionRate}%
        `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .classed('visible', true);
    })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('fill', '#E50914');

            tooltip.classed('visible', false);
        });

    // Dot interactions
    dots.on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 9);

        tooltip.html(`
            <strong>${d.day}</strong><br/>
            Watch Hours: ${d.hours}<br/>
            Completion Rate: ${d.completionRate}%
        `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .classed('visible', true);
    })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 6);

            tooltip.classed('visible', false);
        });

    // Legend
    const legend = svg.append('g')
        .attr('transform', `translate(${width / 2 - 100}, -20)`);

    legend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', '#E50914')
        .attr('rx', 3);

    legend.append('text')
        .attr('x', 25)
        .attr('y', 15)
        .attr('fill', '#b3b3b3')
        .attr('font-size', '12px')
        .text('Watch Hours');

    legend.append('line')
        .attr('x1', 140)
        .attr('y1', 10)
        .attr('x2', 160)
        .attr('y2', 10)
        .attr('stroke', '#46D369')
        .attr('stroke-width', 3);

    legend.append('text')
        .attr('x', 165)
        .attr('y', 15)
        .attr('fill', '#b3b3b3')
        .attr('font-size', '12px')
        .text('Completion Rate');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createEngagementVisualization);
} else {
    createEngagementVisualization();
}

window.addEventListener('resize', debounce(createEngagementVisualization, 250));
