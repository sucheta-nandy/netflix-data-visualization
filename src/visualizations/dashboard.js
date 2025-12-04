// Content Dashboard Visualizations

function createDashboardVisualizations() {
    createTopContentChart();
    createScatterPlot();
}

function createTopContentChart() {
    const container = d3.select('#top-content-viz');
    const containerNode = container.node();
    if (!containerNode) return;

    container.html('');

    const margin = { top: 20, right: 30, bottom: 60, left: 200 };
    const width = containerNode.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = streamingData.topContent.slice(0, 10);

    // Scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.views)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.title))
        .range([0, height])
        .padding(0.2);

    // Bars
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => y(d.title))
        .attr('width', 0)
        .attr('height', y.bandwidth())
        .attr('fill', '#E50914')
        .attr('rx', 4)
        .style('cursor', 'pointer');

    // Animate bars
    bars.transition()
        .delay((d, i) => i * 100)
        .duration(1000)
        .attr('width', d => x(d.views));

    // Add values
    svg.selectAll('.value')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value')
        .attr('x', d => x(d.views) + 5)
        .attr('y', d => y(d.title) + y.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('fill', '#fff')
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .style('opacity', 0)
        .text(d => `${d.views}B views`)
        .transition()
        .delay((d, i) => i * 100 + 500)
        .duration(600)
        .style('opacity', 1);

    // Y-axis
    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .attr('fill', '#fff')
        .attr('font-size', '12px');

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute');

    bars.on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', '#F40612');

        tooltip.html(`
            <strong>${d.title}</strong><br/>
            Views: ${d.views}B<br/>
            Rating: ${d.rating}/10<br/>
            Genre: ${d.genre}
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
}

function createScatterPlot() {
    const container = d3.select('#scatter-viz');
    const containerNode = container.node();
    if (!containerNode) return;

    container.html('');

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = containerNode.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = streamingData.scatterData;

    // Scales
    const x = d3.scaleLinear()
        .domain([6, 9.5])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.viewership) * 1.1])
        .range([height, 0]);

    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.viewership)])
        .range([5, 20]);

    // Grid
    svg.append('g')
        .attr('class', 'grid')
        .attr('opacity', 0.1)
        .call(d3.axisLeft(y)
            .tickSize(-width)
            .tickFormat(''));

    svg.append('g')
        .attr('class', 'grid')
        .attr('opacity', 0.1)
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .tickSize(-height)
            .tickFormat(''));

    // Axes
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(y));

    // Labels
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + 45)
        .attr('text-anchor', 'middle')
        .attr('fill', '#b3b3b3')
        .attr('font-size', '14px')
        .text('Rating (out of 10)');

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', '#b3b3b3')
        .attr('font-size', '14px')
        .text('Viewership (Millions)');

    // Circles
    const circles = svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.rating))
        .attr('cy', d => y(d.viewership))
        .attr('r', 0)
        .attr('fill', d => colorScales.genre[d.genre] || '#E50914')
        .attr('opacity', 0.7)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');

    circles.transition()
        .delay((d, i) => i * 50)
        .duration(800)
        .attr('r', d => sizeScale(d.viewership));

    // Tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute');

    circles.on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 1)
            .attr('r', sizeScale(d.viewership) * 1.3);

        tooltip.html(`
            <strong>${d.title}</strong><br/>
            Rating: ${d.rating}/10<br/>
            Viewership: ${d.viewership}M<br/>
            Genre: ${d.genre}
        `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .classed('visible', true);
    })
        .on('mouseout', function (event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr('opacity', 0.7)
                .attr('r', sizeScale(d.viewership));

            tooltip.classed('visible', false);
        });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDashboardVisualizations);
} else {
    createDashboardVisualizations();
}

window.addEventListener('resize', debounce(createDashboardVisualizations, 250));
