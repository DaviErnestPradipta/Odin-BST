import Node from "./node.js";

export default class BST {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null;

        const midpoint = Math.floor(sortedArray.length / 2);
        const newNode = Node(sortedArray[midpoint]);
        newNode.leftChild = this.buildTree(sortedArray.slice(0, midpoint));
        newNode.rightChild = this.buildTree(sortedArray.slice(midpoint + 1));
        
        return newNode;
    }

    insert(value, currentNode = this.root) {
        if (currentNode === null) return Node(value);
        if (currentNode.value === value) return;

        if (currentNode.value < value)
            currentNode.rightChild = this.insert(value, currentNode.rightChild);
        else currentNode.leftChild = this.insert(value, currentNode.leftChild);

        return currentNode;
    }

    remove(value, currentNode = this.root) {
        if (currentNode === null) return currentNode;

        if (currentNode.value === value) currentNode = this.#removeNode(currentNode);
        else if (currentNode.value > value) 
            currentNode.leftChild = this.remove(value, currentNode.leftChild);
        else currentNode.rightChild = this.remove(value, currentNode.rightChild);

        return currentNode;
    }

    find(value, node = this.root) {
        if (node === null || node.value === value) return node;

        if (node.value < value) return this.find(value, node.rightChild);
        else return this.find(value, node.leftChild);
    }

    levelOrder(callback) {
        const queue = [this.root];
        const levelOrderList = [];
        
        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback ? callback(currentNode) : levelOrderList.push(currentNode.value);

            const enqueueList = [
                currentNode?.leftChild,
                currentNode?.rightChild
            ].filter((value) => value);

            queue.push(...enqueueList);
        }

        if (levelOrderList.length > 0) return levelOrderList;
    }

    #removeNode(node) {
        if (node.leftChild && node.rightChild) {
            const successorNode = this.#inorderSuccessorFor(node.rightChild);
            node.value = successorNode.value;
            node.rightChild = this.remove(successorNode.value, node.rightChild);
            
            return node;
        }
        else {
            const replacementNode = node.rightChild || node.leftChild;
            node = null;
            
            return replacementNode;
        }
    }

    #inorderSuccessorFor(node) {
        let currentNode = node;
        while (currentNode.leftChild) currentNode = currentNode.leftChild;
        
        return currentNode;
    }
}