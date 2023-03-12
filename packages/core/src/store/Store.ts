import { action, makeAutoObservable } from 'mobx';
import { Node } from 'components/node';

class Store {
  nodes: Map<string, Node>;

  constructor() {
    makeAutoObservable(this);
    this.nodes = new Map<Node['id'], Node>();
  }

  @action public addNode(node: Node) {
    this.nodes.set(node.id, node);
    return node;
  }

  @action public getNodeById(id: string) {
    return this.nodes.get(id);
  }
}

export default Store;
