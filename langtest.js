function fftest(prog, data) {
    // return;
    console.log(prog.toString())
    Object.getOwnPropertyNames(data).forEach(key => {
        var val = data[key]
        var sigma = [key]
        // if isinstance(key, tuple): sigma = list(key)
        // print sigma
        output = prog.apply(sigma)
        output == val
        ?   console.log( "✅ ", sigma, "➙", output )
        :   console.log( "❌ ", sigma, "➙", output, "\nExpected", val)
        // print prog.apply(sigma, bindings)
    })
}

var v1 = 0

console.log("Extract Numbers")

fftest(new SubStr(v1, new Pos([], ['NumTok'], 0), new CPos(-1)), {
    "BTR KRNL WK CORN 15Z":              "15Z",
    "CAMP DRY DBL NDL 3.6 OZ":                  "3.6 OZ",
    "CHORE BOY HD SC SPNG 1 PK":         "1 PK",
    "FRENCH WORCESTERSHIRE 5 Z":         "5 Z",
    "O F TOMATO PASTE 6 OZ":             "6 OZ",
})


console.log("Directory Name Extraction")

fftest(new SubStr(v1, new CPos(0), new Pos(['SlashTok'], [], -1)), {
    "Company/Code/index.html": "Company/Code/",
    "Company/Docs/Spec/specs.doc": "Company/Docs/Spec/",
})

console.log("Generate Abbreviation")

fftest(new Loop('w', new Concatenate(SubStr2(v1, ["UpperTok"], new BoundVar('w')))), {
    "International Business Machines": "IBM",
    "Principles Of Programming Languages": "POPL",
    "International Conference on Software Engineering": "ICSE",
})

console.log("Split Odds")

p1 = new Pos(['LeftParenTok'], ['NumTok', 'SlashTok'], new BoundVar('w'))
p2 = new Pos(['SlashTok', 'NumTok'], ['RightParenTok'], new BoundVar('w'))
prog = new Loop('w', new Concatenate(new SubStr(v1, p1, p2), new ConstStr(' # ')))

fftest(prog, {
    "(6/7)(4/5)(14/1)": "6/7 # 4/5 # 14/1 # ",
    "49(28/11)(14/1)": "28/11 # 14/1 # ",
    "() (28/11)(14/1)": "28/11 # 14/1 # ",
})


console.log("Mixed Date Parsing")

prog = new Switch(
    [new Match(v1, ['SlashTok']), new SubStr(v1, new Pos(['StartTok'], [], 0), new Pos([], ['SlashTok'], 0))],
    [new Match(v1, ['DotTok']), new SubStr(v1, new Pos(['DotTok'], [], 0), new Pos([], ['DotTok'], 1))],
    [new Match(v1, ['HyphenTok']), new SubStr(v1, new Pos(['HyphenTok'], [], 1), new Pos(['EndTok'], [], 0))]
)

fftest(prog, {
    "01/21/2001": "01",
    "22.02.2002": "02",
    "2003-23-03": "03"
})