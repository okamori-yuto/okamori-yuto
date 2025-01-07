pub enum Token {
    LeftBrace, // {
    RightBrace, // }
    LeftBracket, // [
    RightBracket, // ]
    Colon, // :
    Comma, // ,
    String(String), // "string"
    Number(f64), // 123, 45.67
    True, // true
    False, // false
    Null, // null
}

// トークンに対応する文字を定義
const LEFT_BRACE_CHAR: char = '{';
const RIGHT_BRACE_CHAR: char = '}';
const LEFT_BRACKET_CHAR: char = '[';
const RIGHT_BRACKET_CHAR: char = ']';
const COLON_CHAR: char = ':';
const COMMA_CHAR: char = ',';
const DOUBLE_QUOTE_CHAR: char = '"';


pub struct Lexer<'a> {
    input: &'a str,
    position: usize,
    read_option: usize,
    ch: Option<char>
}

impl<'a> Lexer<'a> {
    pub fn new(input: &'a str) -> Self {
        let mut lexer = Lexer {
            input,
            position: 0,
            read_option: 0,
            ch: None,
        };
        lexer.read_char();
        return lexer;
    }
    fn read_char(&mut self) {
        if self.read_option >= self.input.len() {
            // 既に末尾の場合、終了
            self.ch = None;
        } else {
            // 次の文字があれば読む
            self.ch = self.input[self.read_optiono..].chars().next()
        }
        // 位置を進める（対象文字のバイト数分進める）
        self.position = self.read_option;
        self.read_option += self.char.map_or(0, |c| c.len_utf8());
    }
    fn skip_whitespace(&mut self) {
        while let Some(ch) = self.ch {
            if ch.is_whitespace() {
                self.read_char();
            } else {
                break;
            }
        }
    }
    fn next_token(&mut self) -> Option<Token> {
        self.skip_whitespace();
        let token: Option<Token> = match self.ch {
            Some(LEFT_BRACE_CHAR) => {
                self.read_char();
                Some(Token::LeftBrace)
            }
            Some(RIGHT_BRACE_CHAR) => {
                self.read_char();
                Some(Token::RightBrace)
            }
            Some(LEFT_BRACKET_CHAR) => {
                self.read_char();
                Some(Token::LeftBracket)
            }
            Some(COLON_CHAR) => {
                self.read_char();
                Some(Token::Colon)
            }
            Some(COMMA_CHAR) => {
                self.read_char();
                Some(Token::Comma)
            }
            Some(DOUBLE_QUOTE_CHAR) => {
                // tbd 文字列の処理
                let string = self.read_string();
                Some(Token::String(string))
            }
            Some(c) if c.is_digit(10) || c == '-' => {
                // tbd 数値の処理
                None
            }
            Some(c) if c.is_alphabetic() => {
                // tbd true/false/nullの処理を実装
            }
            _ => None

        };
    }
    // tbd 複雑なトークンの切り出しから
}