import { action, computed, makeAutoObservable } from 'mobx';

import { CoordinateProps, Port, Node, NodeProps, Side } from '../components';
import { Rectangle, Vertex } from '../systems/routing';

class Store {
  public nodes: Map<Node['id'], Node> = new Map();
  public ports: Map<Port['id'], Port> = new Map();
  public nodeElements: Map<Node['id'], HTMLDivElement> = new Map();
  public nodePositions: Map<Node['id'], CoordinateProps> = new Map();
  public draftConnection: Port | null = null;
  public mousePosition: CoordinateProps = { x: 0, y: 0 };
  public magnetPosition: { port: Port; vertex: Vertex } | null = null;
  public selectedNode: Node | null = null;
  public viewPortTransform: { x: number; y: number; zoom: number } = { x: 0, y: 0, zoom: 1 };

  constructor() {
    makeAutoObservable(this);
  }

  @action public setViewportTransform = (transform: { x: number; y: number; zoom: number }): void => {
    this.viewPortTransform = transform;
  };

  @computed get connections() {
    return [...this.nodes.values()]
      .flatMap((node) => node.connections)
      .map((connection) => connection)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  get magnetConnection(): Vertex | null {
    let closestVertex = null;
    this.nodeElements.forEach((element, node) => {
      if (node !== this.draftConnection?.node.id) {
        const rect = Rectangle.fromRect(element.getBoundingClientRect(), this.viewPortTransform);
        const closeTo = rect.closeTo(this.mousePosition);
        if (closeTo) {
          const closestPort = this.getNodePortsMapBySide(node).get(closeTo);
          closestVertex = { side: closeTo, rect };
          if (closestPort) {
            this.setMagnetPosition({ port: closestPort, vertex: closestVertex });
          }
        }
      }
    });
    return closestVertex;
  }

  public setMagnetPosition(magnetPosition: { port: Port; vertex: Vertex } | null) {
    this.magnetPosition = magnetPosition;
  }

  /* NODES */

  @action public addNode({ coordinates, ...node }: NodeProps): Node {
    const newNode = new Node(node);
    this.nodes.set(newNode.id, newNode);
    this.nodePositions.set(newNode.id, coordinates);
    newNode.getPorts().forEach((port) => {
      this.ports.set(port.id, port);
    });
    return newNode;
  }

  @action public deleteNode(node: Node) {
    this.nodes.delete(node.id);
    this.nodePositions.delete(node.id);
    this.nodeElements.delete(node.id);
  }

  @action public getNodeById(id: string) {
    return this.nodes.get(id);
  }

  @action public addNodeElement(node: Node['id'], element: HTMLDivElement) {
    this.nodeElements.set(node, element);
  }

  @action public removeNodeElement(node: Node['id']) {
    this.nodeElements.delete(node);
  }

  @action public setNodePosition(nodeId: Node['id'], position: CoordinateProps) {
    const node = this.nodePositions.get(nodeId);
    if (!node) {
      throw new Error("Can't update position on node which doesn't exist");
    }
    this.nodePositions.set(nodeId, position);
  }

  @action public updateNode(node: Node) {
    const current = this.nodes.get(node.id);
    const currentElement = this.nodeElements.get(node.id);
    if (!current || !currentElement) {
      throw new Error("Can't update node which doesn't exist");
    }
    current.update(node);
  }

  @action public setSelectedNode(node: Node | null) {
    if (!node) {
      this.selectedNode = null;
    } else {
      const current = this.nodes.get(node.id);
      if (!current) {
        throw new Error("Can't select node which doesn't exist");
      }
      this.selectedNode = node;
    }
  }

  /* PORTS */
  @action public getNodePorts(nodeId: Node['id']): Port[] {
    return [...this.ports.values()].flatMap((port) => port).filter((port) => port.node.id === nodeId);
  }
  @action public getNodePortsMapBySide(nodeId: Node['id']): Map<Side, Port> {
    const ports: Port[] = [...this.ports.values()].flatMap((port) => port).filter((port) => port.node.id === nodeId);
    return new Map(ports.map((port: Port) => [port.side, port]));
  }

  @action public startConnection(from: Port | null) {
    this.draftConnection = from;
  }

  @action public endConnection(to: Port) {
    if (this.draftConnection) {
      if (to.node !== this.draftConnection.node) {
        this.draftConnection.connect(to);
        this.draftConnection = null;
      }
    }
  }

  /* MOUSE */
  @action public setMousePosition(position: CoordinateProps) {
    this.mousePosition = position;
  }
}

export default Store;
