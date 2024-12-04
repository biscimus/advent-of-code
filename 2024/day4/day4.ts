const input = (await Deno.readTextFile("./input.txt")).split("\n").map(row => row.split(""));

// Find horizontal matches
// result += (input.match(/XMAS|SAMX/g) || []).length
// // Find vertical matches: transpose the input and find horizontal matches
// const inputT = input.split("\n").reduce((acc, row, rowIndex) => acc.concat(row.split("").map((col, colIndex) => input.split("\n")[colIndex][rowIndex]).join(""), "\n"), "");
// result += (inputT.match(/XMAS|SAMX/g) || []).length

function part1() {
    let result = 0;

    input.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col !== "X") return;

            const indices = [[[0, 1], [0, 2], [0, 3]], [[0, -1], [0, -2], [0, -3]], [[1, 0], [2, 0], [3, 0]], [[-1, 0], [-2, 0], [-3, 0]], [[1, 1], [2, 2], [3, 3]], [[-1, -1], [-2, -2], [-3, -3]], [[1, -1], [2, -2], [3, -3]], [[-1, 1], [-2, 2], [-3, 3]]];

            indices.forEach(index => {
                if (input[rowIndex + index[0][0]]?.[colIndex + index[0][1]] === "M" && input[rowIndex + index[1][0]]?.[colIndex + index[1][1]] === "A" && input[rowIndex + index[2][0]]?.[colIndex + index[2][1]] === "S") result++;
            });
        });
    });

    return result;
}

function part2() {
    let result = 0;
    input.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (col !== "A") return;
            if (((input[rowIndex - 1]?.[colIndex - 1] === "M" && input[rowIndex + 1]?.[colIndex + 1] === "S") || (input[rowIndex - 1]?.[colIndex - 1] === "S" && input[rowIndex + 1]?.[colIndex + 1] === "M")) && ((input[rowIndex + 1]?.[colIndex - 1] === "M" && input[rowIndex - 1]?.[colIndex + 1] === "S") || (input[rowIndex + 1]?.[colIndex - 1] === "S" && input[rowIndex - 1]?.[colIndex + 1] === "M"))) result++;
        });
    });
    return result;
}

console.log(part1());
console.log(part2());