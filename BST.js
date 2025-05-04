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
}