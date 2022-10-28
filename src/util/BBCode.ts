import xss from "xss";

export type BBCodeParser = (currentText: string) => string;

export class BBCode {
    public parsers: BBCodeParser[];
    constructor() {
        this.parsers = [];
    }

    public add(parser: BBCodeParser): void {
        this.parsers.push(parser);
    }

    public parse(text: string): string {
        let currentText = xss(text);

        for (const parser of this.parsers) {
            currentText = parser(currentText);
        }

        return currentText;
    }

    /// BBCode parsers
    public static bold(currentText: string): string {
        return currentText.replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>');
    }

    public static italic(currentText: string): string {
        return currentText.replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>');
    }

    public static underline(currentText: string): string {
        return currentText.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>');
    }

    public static strikethrough(currentText: string): string {
        return currentText.replace(/\[s\](.*?)\[\/s\]/g, '<s>$1</s>');
    }

    public static color(currentText: string): string {
        return currentText.replace(/\[color=(.*?)\](.*?)\[\/color\]/g, '<span style="color:$1">$2</span>');
    }
}