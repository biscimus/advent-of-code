const reports = (await Deno.readTextFile("./input.txt")).split("\n").map(levels => levels.split(" ").map(Number));

function isSafe(levels: number[]) {
    const isIncreasing = levels[0] < levels[1];
    return levels.every((level, i, levels) => (i === levels.length - 1) || (isIncreasing ? level < levels[i + 1] : level > levels[i + 1]) && Math.abs(level - levels[i + 1]) <= 3)
}

function part1() {
    return reports.reduce((acc, levels) => acc + +isSafe(levels), 0)
}

function part2() {
    return reports.reduce((acc, levels) => acc + +(isSafe(levels) || levels.some((_, i, levels) => isSafe(levels.filter((_, j) => j !== i)))), 0)
}

console.log(part1());
console.log(part2());