import Node from "./node.js";

export default class BST {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(sortedArray) {
        if (sortedArray.length === 0) return null;

        const midpoint = Math.floor(sortedArray.length / 2);
        const newNode = new Node(sortedArray[midpoint]);
        newNode.leftChild = this.buildTree(sortedArray.slice(0, midpoint));
        newNode.rightChild = this.buildTree(sortedArray.slice(midpoint + 1));
        
        return newNode;
    }

    insert(value, currentNode = this.root) {
        if (currentNode === null) return new Node(value);
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

    inOrder(callback, node = this.root, inOrderList = []) {
        if (node === null) return;

        this.inOrder(callback, node.leftChild, inOrderList);
        callback ? callback(node) : inOrderList.push(node.value);
        this.inOrder(callback, node.rightChild, inOrderList);

        if (inOrderList.length > 0) return inOrderList;
    }

    preOrder(callback, node = this.root, preOrderList = []) {
        if (node === null) return;

        callback ? callback(node) : preOrderList.push(node.value);
        this.preOrder(callback, node.leftChild, preOrderList);
        this.preOrder(callback, node.rightChild, preOrderList);

        if (preOrderList.length > 0) return preOrderList;
    }

    postOrder(callback, node = this.root, postOrderList = []) {
        if (node === null) return;

        this.postOrder(callback, node.leftChild, postOrderList);
        this.postOrder(callback, node.rightChild, postOrderList);
        callback ? callback(node) : postOrderList.push(node.value);

        if (postOrderList.length > 0) return postOrderList;
    }
    
    height(node = this.root) {
        if (node === null) return 0;

        const leftHeight = this.height(node.leftChild);
        const rightHeight = this.height(node.rightChild);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(nodeValue, node = this.root, edgeCount = 0) {
        if (node === null) return;
        if (node.value === nodeValue) return edgeCount;

        if (node.value < nodeValue) 
            return this.depth(nodeValue, node.rightChild, edgeCount + 1);
        else return this.depth(nodeValue, node.leftChild, edgeCount + 1);
    }

    isBalanced() {
        return this.#testBalance(this.root) !== -1;
    }

    rebalance() {
        const inOrderList = this.inOrder();
        this.root = this.buildTree(inOrderList);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.rightChild)
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '|   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.leftChild)
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '|   '}`, true);        
    }

    // Private methods
    #removeNode(node) {
        if (node.leftChild && node.rightChild) {
            const successorNode = this.#inOrderSuccessorFor(node.rightChild);
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

    #inOrderSuccessorFor(node) {
        let currentNode = node;
        while (currentNode.leftChild) currentNode = currentNode.leftChild;
        
        return currentNode;
    }

    #testBalance(node) {
        if (node === null) return 0;

        const leftBalance = this.#testBalance(node.leftChild);
        const rightBalance = this.#testBalance(node.rightChild);
        const balanceDifference = Math.abs(leftBalance - rightBalance);

        if (leftBalance === -1 || rightBalance === -1 || balanceDifference > 1) return -1;
        else return Math.max(leftBalance, rightBalance) + 1;
    }
}