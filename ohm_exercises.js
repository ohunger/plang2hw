import * as ohm from "ohm-js";

export function matches(name,s) {
    const grammars = {
        canadianPostalCode: String.raw` G {
            postalCode = allowedLetter digit allowedLetter “ “ digit allowedLetter digit
            allowedLetter = “A”..”C” | “E” | “G”| “H” | “J”.. “N” | “P” | “R”..T” | “V”..”Z”
        }`,
        visa: String.raw` G {
            visa = (fourDigits twelveDigits) | (fourDigits fifteenDigits)
            fourDigits = digit digit digit digit
            twelveDigits = digit{12}
            fifteenDigits = digit{15}
        }`,
        masterCard: String.raw` G {
            masterCardNumber = ("5" ("1".."5") fourteenDigits) | ("2"(("2".."6" digit digit)| ("7" ("0".."1" digit)|("2""0"))) twelveDigits)
            fourteenDigits = digit{14}
            twelveDigits = digit{12}
            twothousandNum = 
        }`,
        notThreeEndingInOO: String.raw` G {
            String = (ThreeLettersButNotOo | Others)
            ThreeLettersButNotOo = Letter Letter Letter !(Letter ("o"|”O”) ("o"|”O”))
            Others = letter+
        }`,
        divisibleBy16: String.raw` G {
            binaryNumeral = "1" "0" "0" "0" ("0"*)+
        }`,
        eightThroughThirtyTwo: String.raw` G {
            decimalNumeral = (8-9) | (1-2) digit | 3 (0-2)
        }`,
        notPythonPycharmPyc: String.raw` G {
            NotPythonWords = !(<"python"> | <"pycharm"> | <"pyc">) letter+ end;
        }`,
        restrictedFloats: String.raw` G {
            floatingPointConstant = digit* ("." digit*)? exponent
            exponent = ("e" | "E") ("+" | "-") digit digit? digit?
        }`,
        palindromes2358: String.raw` G {
            Palindromes
                = Length2
                | Length3
                | Length5
                | Length8

            Length2 =( “a” “a”) | (“b” “b”) | (“c” “c”)

            Length3 = (“a” char “a”) | (“b” char “b”) |( “c” char “c”)

            Length5 = (“a” Length3 “a”) | (“b” Length3 “b” ) | (“c” Length3 “c”)

            Length6 = ( “a” “a” Length2 “a” “a”) |( “a” “b” Length2 “b” “a”) | (“b” “a” Length2 “a” “b”) |  (“b” “b” Length2 “b” “b”) | (“b” “c” Length2 “c” “b”) | (“c” “b” Length2 “b” “c”) | (“c” “c” Length2 “c” “c”) |( “a” “c” Length2 “c” “a”) | ( “c” “a” Length2 “a” “c”  )

            Length8 = (“a” Length6 “a”) | (“b” Length6 “b”) | (“c” Length6 “c” )

            char = “a” | “b” | “c”
        }`,
        pythonStringLiterals: String.raw` G {
            StringLiteral    = StringPrefix? (ShortString | LongString)
            StringPrefix     = "r" | "u" | "R" | "U" | "f" | "F"
                                | ("f" ("R" | r") ) | ("F" ("r" | "R)) | ("r" | ("f" | "F")) | ("R" | ("f" | "F"))
            ShortString      = "'" ShortStringItem* "'" | "\"" ShortStringItem* "\""
            LongString       = "'''" LongStringItem* "'''" | '"""' LongStringItem* '"""'
            ShortStringItem  = ShortStringChar | StringEscapeSeq
            LongStringItem   = LongStringChar | StringEscapeSeq
            ShortStringChar  = sourceChar - ("\\" | "\n" | "'") | StringEscapeSeq
            LongStringChar   = sourceChar - "\\"
            StringEscapeSeq  = "\\" sourceChar
        }`,
    };

    return ohm.grammar(grammars[name]).match(s).succeeded();
}
