import { collection, db, query, onSnapshot } from './db.js';
import { activity } from './index.js';

const margin = { top: 40, right: 20, bottom: 50, left: 100 };
const width = 560;
const height = 400;
const graphWidth = width - margin.right - margin.left;
const graphHeight = height - margin.top - margin.bottom;

const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);
const xAxisGroup = graph.append('g').attr('class', 'x-axis').attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g').attr('class', 'y-axis');

const line = d3.line().x(d => x(new Date(d.date))).y(d => y(d.distance));
const path = graph.append('path');

const dottedLines = graph.append('g').attr('class', 'lines').style('opacity', 0);
const xDottedLine = dottedLines.append('line')
  .attr('stroke', '#aaa')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);
const yDottedLine = dottedLines.append('line')
  .attr('stroke', '#aaa')
  .attr('stroke-width', 1)
  .attr('stroke-dasharray', 4);

const update = (data) => {
  const filteredData = data.filter(item => item.activity === activity);

  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
  x.domain(d3.extent(filteredData, d => new Date(d.date)));
  y.domain([0, d3.max(filteredData, d => d.distance)]);
  path.data([filteredData])
    .attr('fill', 'none')
    .attr('stroke', '#00bfa5')
    .attr('stroke-width', 2)
    .attr('d', line);

  const circles = graph.selectAll('circle').data(filteredData);

  circles.exit().remove();

  circles
    .attr('r', 4)
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.distance));
  
  circles.enter().append('circle')
    .attr('r', 4)
    .attr('cx', d => x(new Date(d.date)))
    .attr('cy', d => y(d.distance))
    .attr('fill', '#ccc');

  graph.selectAll('circle')
    .on('mouseover', (e, d) => {
      d3.select(e.target).transition().duration(300).attr('r', 8).attr('fill', '#fff');

      xDottedLine
        .attr('x1', x(new Date(d.date)))
        .attr('x2', x(new Date(d.date)))
        .attr('y1', graphHeight)
        .attr('y2', y(d.distance));

      yDottedLine
        .attr('x1', 0)
        .attr('x2', x(new Date(d.date)))
        .attr('y1', y(d.distance))
        .attr('y2', y(d.distance));

      dottedLines.style('opacity', 1);
    })
    .on('mouseout', (e) => {
      d3.select(e.target).transition().duration(300).attr('r', 4).attr('fill', '#ccc');
      dottedLines.style('opacity', 0);
    })

  const xAxis = d3.axisBottom(x)
    .ticks(4).tickFormat(d3.timeFormat('%b %d'));
  const yAxis = d3.axisLeft(y)
    .ticks(4).tickFormat(d => d + 'm');

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
  xAxisGroup.selectAll('text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end');
};

let data = [];
const q = query(collection(db, 'activities'));

onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    if (change.type === 'added') {
      data.push(doc);
    }

    if (change.type === 'modified') {
      const index = data.findIndex(item => item.id == doc.id);
      data[index] = doc
    }

    if (change.type === 'removed') {
      data = data.filter(item => item.id !== doc.id);
    }
  });

  update(data);
});

export { update, data };
