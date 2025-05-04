import BST from "./BST.js";

const randomArray = (size) => {
    return Array.from({length: size}, () => Math.floor(Math.random() * 100 + 1));
}

const tree = new BST(randomArray(25));

console.log(tree.isBalanced());
tree.prettyPrint();

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());

tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log(tree.isBalanced());
tree.prettyPrint();

tree.rebalance();
console.log(tree.isBalanced());
tree.prettyPrint();

console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());