// @flow
import React from 'react';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import prism from 'react-syntax-highlighter/styles/prism/prism';

registerLanguage('jsx', jsx);

const stripLeadingAndTrailingWhitespace = (codeBlock): string => {
  const lines = codeBlock.split(/(?:\r\n|\n|\r)/);

  const countLeadingSpaces = str => str.length - str.trimLeft().length;

  const minNumberOfLeadingSpaces: number = lines
    .filter(line => !!line.trimLeft())
    .reduce(
      (minLeading, line) => Math.min(minLeading, countLeadingSpaces(line)),
      Infinity
    );

  const linesWithoutWhitespace = lines.map(line => line.replace(new RegExp(
    `^\\s{${minNumberOfLeadingSpaces}}`, 'gm'
  ), ''));

  const reducer = (accum, line) => (accum.stillCounting && !line.trim()
    ? { maxLine: accum.maxLine + 1, stillCounting: true }
    : { maxLine: accum.maxLine, stillCounting: false });
  const numberOfLeadingWhiteSpaceLines: number = linesWithoutWhitespace
    .reduce(reducer, { maxLine: 0, stillCounting: true }).maxLine;
  const numberOfTrailingWhiteSpaceLines: number = linesWithoutWhitespace
    .reverse()
    .reduce(reducer, { maxLine: 0, stillCounting: true }).maxLine;

  return linesWithoutWhitespace
    .slice(numberOfLeadingWhiteSpaceLines)
    .slice(
      0,
      linesWithoutWhitespace.length
        - numberOfLeadingWhiteSpaceLines
        - numberOfTrailingWhiteSpaceLines
    )
    .join('\n');
};

type CodeSnippetProps = {|
  code: string,
|};

export default ({ code }: CodeSnippetProps) => (<SyntaxHighlighter
  language="jsx"
  style={prism}
>
  {stripLeadingAndTrailingWhitespace(code)}
</SyntaxHighlighter>);
