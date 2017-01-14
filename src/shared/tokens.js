// We use the following collection of character classes 𝐶: 
// - Numeric Digits (0-9), 
// - Alphabets (a-zA-Z), 
// - Lowercase alphabets (a-z), 
// - Uppercase alphabets (A-Z), 
// - Accented alphabets, 
// - Alphanumeric characters, 
// - Whitespace characters, 
// - All characters. 
// We use the following SpecialTokens:
// - StartTok: Matches the beginning of a string. 
// - EndTok: Matches the end of a string.
// - A token for each special character, 
//   such as hyphen, dot, semicolon, colon, 
//   comma, backslash, forwardslash, 
//   left/right parenthesis/bracket etc.


// For better readability, we reference tokens by representative names. 
// For example, AlphTok refers to a sequence of alphabetic characters,
// NumTok refers to a sequence of numeric digits, NonDigitTok refers to 
// a sequence of characters that are not numeric digits, HyphenTok matches 
// with the hyphen character.


export var TokenStrings = {
    'AlphNumTok': '[a-zA-Z0-9]+',
    'AlphNumWsTok': '[a-zA-Z0-9 ]+',
    'AlphTok': '[a-zA-Z]+',
    'BckSlashTok': "\\\\",
    'ColonTok': ':',
    'CommaTok': ',',
    'DashTok': '-',
    'DotTok': '\\.',
    'EndTok': '$',
    'HyphenTok': '\\-',
    'LeftAngleTok': '<',
    'LeftParenTok': '\\(',
    'LeftSquareTok': '<',
    'LoDashTok': '_',
    'LowerTok': '[a-z]+',
    'NonAlphNumTok': '[^a-zA-Z0-9]+',
    'NonAlphNumWsTok': '[^a-zA-Z0-9 ]+',
    'NonAlphTok': '[^a-zA-Z]+',
    'NonLowerTok': '[^a-z]+',
    'NonNumTok': '[^\\d]+',
    'NonUpperTok': '[^A-Z]+',
    'NumTok': '\\d+',
    'RightAngleTok': '>',
    'RightParenTok': '\\)',
    'RightSquareTok': '>',
    'SemicolonTok': ';',
    'SlashTok': "[\\\/]",
    'SlashTok': "\/",
    'StartTok': '^',
    'UpperTok': '[A-Z]+',
    'WsTok': ' ',
}

/*
TokenStrings = {
    // 'AlphNumTok': '[a-zA-Z0-9]+',
    // 'AlphNumWsTok': '[a-zA-Z0-9 ]+',
    'AlphTok': '[a-zA-Z]+',
    // 'BckSlashTok': "\\\\",
    // 'ColonTok': ':',
    // 'CommaTok': ',',
    // 'DashTok': '-',
    // 'DotTok': '\\.',
    'EndTok': '$',
    // 'HyphenTok': '\\-',
    // 'LeftAngleTok': '<',
    // 'LeftParenTok': '\\(',
    // 'LeftSquareTok': '<',
    // 'LoDashTok': '_',
    // 'LowerTok': '[a-z]+',
    // 'NonAlphNumTok': '[^a-zA-Z0-9]+',
    // 'NonAlphNumWsTok': '[^a-zA-Z0-9 ]+',
    'NonAlphTok': '[^a-zA-Z]+',
    // 'NonLowerTok': '[^a-z]+',
    // 'NonNumTok': '[^\\d]+',
    // 'NonUpperTok': '[^A-Z]+',
    // 'NumTok': '\\d+',
    // 'RightAngleTok': '>',
    // 'RightParenTok': '\\)',
    // 'RightSquareTok': '>',
    // 'SemicolonTok': ';',
    // 'SlashTok': "[\\\/]",
    // 'SlashTok': "\/",
    'StartTok': '^',
    'UpperTok': '[A-Z]+',
    'WsTok': ' ',
}*/



export var TokenNames = Object.keys(TokenStrings)

export var TokenRegexes = {}
TokenNames.forEach(s => TokenRegexes[s] = new RegExp(TokenStrings[s]))

export var TokenRegexesG = {}
TokenNames.forEach(s => TokenRegexesG[s] = new RegExp(TokenStrings[s], 'g'))

export var TokenRegexesStart = {}
TokenNames.forEach(s => TokenRegexesStart[s] = new RegExp('^' + TokenStrings[s]))

export var TokenRegexesSticky = {}
TokenNames.forEach(s => TokenRegexesSticky[s] = new RegExp(TokenStrings[s], 'y'))

