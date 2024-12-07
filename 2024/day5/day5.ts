const rules = (await Deno.readTextFile("./rules.txt")).split("\n").map(row => row.split("|"));
const updates = (await Deno.readTextFile("./updates.txt")).split("\n").map(row => row.split(","));

const isUpdateCorrect = (rules: string[][], update: string[]) => rules.every(rule => !(update.includes(rule[0]) && update.includes(rule[1])) || update.indexOf(rule[0]) < update.indexOf(rule[1]))

function part1() {
    return updates.reduce((acc, update) => {
        if (isUpdateCorrect(rules, update)) acc.push(update[Math.floor(update.length / 2)]);
        return acc;
    }, []).reduce(((acc, mid) => acc + Number(mid)), 0);
}

function part2() {

    const rulesDict: { [key: string]: string[] } = rules.reduce<{ [key: string]: string[] }>((acc, rule) => {
        if (!acc[rule[0]]) acc[rule[0]] = [];
        acc[rule[0]].push(rule[1]);
        return acc;
    }, {});

    return updates.reduce((acc, update) => {
        if (!isUpdateCorrect(rules, update)) {
            Object.entries(rulesDict).forEach(([key, value]) => {
                if (update.includes(key) && value.some(val => update.includes(val) && update.indexOf(key) > update.indexOf(val))) {
                    update.splice(update.indexOf(key), 1);
                    update.splice(update.findIndex(val => value.includes(val)), 0, key);
                }
            });
            acc.push(update[Math.floor(update.length / 2)]);
        }
        return acc;
    }, []).reduce(((acc, mid) => acc + Number(mid)), 0);
}

console.log(part1());
console.log(part2());