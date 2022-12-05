import pathFinder, { Vertex } from '../../routing/path-finder';

export interface ConnectorProps {
  source: Vertex;
  target: Vertex;
}

export default function Connector({ source, target }: ConnectorProps) {
  const path = pathFinder(source, target);

  console.log(path);

  return null;
}
