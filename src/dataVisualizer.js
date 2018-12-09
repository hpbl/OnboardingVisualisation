import * as d3 from 'd3';

// sections :: [{name: String, count: Int, color: String}]
export function donutChart(sections, size, divId) {
  const width = size;
  const height = size;

  const radius = 4 * size / 10;
  const innerRadius = 2 * size / 10;

  const numberTextSize = size / 10;
  const nameTextSize = size / 40;

  const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(innerRadius);

  const pie = d3.pie()
    .sort(null)
    .value(d => d.count);

  const svg = d3.select('div')
    .attr('id', divId)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const g = svg.selectAll('.arc')
    .data(pie(sections))
    .enter()
    .append('g');

  g.append('path')
    .attr('d', arc)
    .style('fill', d => d.data.color);

  const gTexts = svg.selectAll('.arc2')
    .data(pie(sections))
    .enter()
    .append('g')
    .attr('class', 'arc');

  gTexts.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .style('text-anchor', 'middle')
    .style('font-size', `${numberTextSize}px`)
    .attr('font-family', 'consolas')
    .text(d => d.data.count);

  gTexts.append('text')
    .attr('transform', (d) => {
      const dAux = arc.centroid(d);
      dAux[1] += (numberTextSize / 2);
      return `translate(${dAux})`;
    })
    .style('text-anchor', 'middle')
    .style('font-size', `${nameTextSize}px`)
    .attr('font-family', 'consolas')
    .text(d => d.data.name);
}

export function timeline(dateData, divId, initialDate) {
  console.log(initialDate);
  console.log(dateData);
  const width = 1000;
  const height = 400;
  const padding = 100;

  // create an svg container
  const vis = d3.select(`#${divId}`)
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height);

  // define the x scale (horizontal)
  const mindate = initialDate;
  const maxdate = new Date();

  const x = d3.scaleLinear()
    .domain([mindate, maxdate]) // values between for month of january
    .range([padding, width - padding]); // map these the the chart width = total

  const y = d3.scaleLinear()
    .domain([0, 0])
    .range([height - padding, height - padding]);
  // draw x axis with labels and move to the bottom of the chart area
  vis.append('g')
    .attr('class', 'xaxis') // give it a class so it can be used to select only xaxis labels  below
    .attr('transform', `translate(0,${height - padding})`)
    .call(d3.axisBottom(x)
      .tickFormat(d3.timeFormat('%B/%Y')))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-65)');

  vis.append('g')
    .selectAll('circle')
    .data(dateData)
    .enter()
    .append('circle')
    .attr('r', d => d.count * 2)
    .attr('cx', d => x(d.day))
    .attr('cy', y(0))
    .attr('opacity', 0.7);
}

export default {
  donutChart,
  timeline,
};
