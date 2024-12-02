const text = (await Deno.readTextFile("./input.txt")).split("\n").map(pair => pair.split("   "));
const list1 = text.map(pair => Number(pair[0]));
const list2 = text.map(pair => Number(pair[1]));

function part1() {
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);
    return list1.reduce((acc, curr, i) => acc + Math.abs(curr - list2[i]), 0);
}

function part2() {
    return list1.reduce((acc, id1) => acc + id1 * list2.reduce((acc, id2) => acc + +(id1 === id2), 0), 0)
}

console.log(part1());
console.log(part2());