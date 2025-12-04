// Streaming Timeline Visualization using D3.js

function createTimelineVisualization() {
    const container = d3.select('#timeline-viz');
    const containerNode = container.node();
    if (!containerNode) return;

    // Clear existing content
    container.html('');

    // Get container dimensions
    const margin = { top: 40, right: 60, bottom: 60, left: 80 };
    const width = containerNode.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse dates and prepare data
    const parseDate = d3.timeParse('%Y-%m');
    const data = streamingData.timeline.map(d => ({
        date: parseDate(d.date),
        releases: d.releases,
        viewership: d.viewership,
        hours: d.hours
    }));

    // Scales
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.releases) * 1.1])
        .range([height, 0]);

    // Grid lines
    svg.append('g')
        .attr('class', 'grid')
        .attr('opacity', 0.1)
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat('')
        );

    // Axes
    const xAxis = svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .ticks(d3.timeYear.every(1))
            .tickFormat(d3.timeFormat('%Y')));

    const yAxis = svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    // Y-axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -60)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#b3b3b3')
        .attr('font-size', '14px')
        .text('Content Releases');

    // Line generator
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.releases))
        .curve(d3.curveMonotoneX);

    // Area generator
    const area = d3.area()
        .x(d => x(d.date))
        .y0(height)
        .y1(d => y(d.releases))
        .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'timeline-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#E50914')
        .attr('stop-opacity', 0.6);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#E50914')
        .attr('stop-opacity', 0);

    // Add area
    const areaPath = svg.append('path')
        .datum(data)
        .attr('fill', 'url(#timeline-gradient)')
        .attr('d', area);

    // Add line
    const linePath = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#E50914')
        .attr('stroke-width', 3)
        .attr('d', line);

    // Animate line drawing
    const totalLength = linePath.node().getTotalLength();
    linePath
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

    // Add dots
    const dots = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.releases))
        .attr('r', 0)
        .attr('fill', '#E50914')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');

    // Animate dots
    dots.transition()
        .delay((d, i) => i * 100)
        .duration(500)
        .attr('r', 5);

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute');

    // Dot interactions
    dots.on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 8);

        const formatDate = d3.timeFormat('%B %Y');
        tooltip.html(`
            <strong>${formatDate(d.date)}</strong><br/>
            Releases: ${d.releases}<br/>
            Viewership: ${d.viewership}M<br/>
            Avg Hours: ${d.hours}
        `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .classed('visible', true);
    })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('r', 5);

            tooltip.classed('visible', false);
        });

    // Control buttons functionality
    const controls = document.querySelectorAll('#timeline .control-btn');
    controls.forEach(btn => {
        btn.addEventListener('click', function () {
            controls.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const metric = this.dataset.metric;
            updateTimeline(metric);
        });
    });

    function updateTimeline(metric) {
        let yDomain, yLabel;

        switch (metric) {
            case 'releases':
                yDomain = [0, d3.max(data, d => d.releases) * 1.1];
                yLabel = 'Content Releases';
                break;
            case 'viewership':
                yDomain = [0, d3.max(data, d => d.viewership) * 1.1];
                yLabel = 'Viewership (Millions)';
                break;
            case 'hours':
                yDomain = [0, d3.max(data, d => d.hours) * 1.1];
                yLabel = 'Avg Watch Hours';
                break;
        }

        y.domain(yDomain);

        // Update line
        const newLine = d3.line()
            .x(d => x(d.date))
            .y(d => y(d[metric]))
            .curve(d3.curveMonotoneX);

        const newArea = d3.area()
            .x(d => x(d.date))
            .y0(height)
            .y1(d => y(d[metric]))
            .curve(d3.curveMonotoneX);

        linePath.transition()
            .duration(1000)
            .attr('d', newLine);

        areaPath.transition()
            .duration(1000)
            .attr('d', newArea);

        dots.transition()
            .duration(1000)
            .attr('cy', d => y(d[metric]));

        yAxis.transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        svg.select('text')
            .transition()
            .duration(500)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .text(yLabel)
            .style('opacity', 1);
    }
}

// Initialize on load and resize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createTimelineVisualization);
} else {
    createTimelineVisualization();
}

window.addEventListener('resize', debounce(createTimelineVisualization, 250));
