const contents = document.querySelectorAll('.content');
const counts = document.querySelectorAll('.count');
const optionData = [];
const canvas = d3
  .select('.box')
  .append('svg')
  .attr('width', 500)
  .attr('height', 350);

contents.forEach(content =>
  optionData.push({ content: content.textContent })
);
counts.forEach(
  (count, index) => (optionData[index].count = count.textContent)
);

canvas
  .selectAll('rect')
  .data(optionData)
  .enter()
  .append('rect')
  .attr('width', function(d, i) {
    return d.count * 50;
  })
  .attr('height', 50)
  .attr('y', function(d, i) {
    return i * 70;
  })
  .attr('fill', '#F6C8C8');

canvas
  .selectAll('text')
  .data(optionData)
  .enter()
  .append('text')
  .attr('fill', 'black')
  .attr('x', function(d, i) {
    return d.count * 50 + 30;
  })
  .attr('y', function(d, i) {
    return i * 70 + 30;
  })
  .text(function(d) {
    return d.content;
  });
  