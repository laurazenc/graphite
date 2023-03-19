import { action, computed, makeAutoObservable } from 'mobx';
import { CoordinateProps, Port, Node, NodeProps } from '../components';

class Store {
  public nodes: Map<Node['id'], Node> = new Map();
  public ports: Map<Port['id'], Port> = new Map();
  public nodeElements: Map<Node['id'], HTMLDivElement> = new Map();
  public nodePositions: Map<Node['id'], CoordinateProps> = new Map();
  public draftConnection: Port | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @computed get connections() {
    return [...this.nodes.values()]
      .flatMap((node) => node.connections)
      .map((connection) => connection)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

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

  /* PORTS */
  @action public getNodePorts(nodeId: Node['id']): Port[] {
    return [...this.ports.values()].flatMap((port) => port).filter((port) => port.node.id === nodeId);
  }

  @action public startConnection(from: Port) {
    this.draftConnection = from;
  }

  @action public endConnection(to: Port) {
    if (this.draftConnection) {
      this.draftConnection.connect(to);
      this.draftConnection = null;
    }
  }
}

export default Store;
