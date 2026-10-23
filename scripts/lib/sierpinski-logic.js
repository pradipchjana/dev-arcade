// Ported from js-practice/games/sierpinski.js (chaos-game algorithm only;
// original rendered to a terminal canvas with ANSI colors/half-block chars,
// replaced here with direct canvas pixel plotting).

export function createVertices(width, height) {
  return [
    { x: width / 2, y: 0 },
    { x: 0, y: height },
    { x: width, y: height },
  ];
}

export function getRandomVertex(vertices) {
  return vertices[Math.floor(Math.random() * vertices.length)];
}

export function nextPoint(current, vertices) {
  const target = getRandomVertex(vertices);
  return {
    x: (current.x + target.x) / 2,
    y: (current.y + target.y) / 2,
  };
}
