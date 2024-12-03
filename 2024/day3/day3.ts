const input = await Deno.readTextFile("./input.txt")

function part1() {
    const matches = input.match(/mul\((-?\d+),(-?\d+)\)/g);
    if (!matches) return 0;
    return matches.reduce((acc, match) => {
        const [_, a, b] = match.match(/mul\((-?\d+),(-?\d+)\)/) || [];
        return acc + +a * +b;
    }, 0);
}

function part2() {
    const matches = input.match(/mul\((-?\d+),(-?\d+)\)|do\(\)|don['’]t\(\)/g);
    if (!matches) return 0;
    let isEnabled = true;
    return matches.reduce((acc, match) => {
        if (match === "do()" || match === "don't()") {
            isEnabled = match === "do()";
            return acc;
        } else {
            if (!isEnabled) return acc;
            const [_, a, b] = match.match(/mul\((-?\d+),(-?\d+)\)/) || [];
            return acc + +a * +b;
        }
    }, 0)
}

console.log(part1());
console.log(part2());