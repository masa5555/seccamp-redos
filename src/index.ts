import * as rerejs from 'rerejs';
import { buildNFA } from './enfa';
import { eliminateEpsilonTransitions } from './nfa';
import { toDOT } from './viz';

function main() {
  const sources = [
    String.raw`a`,
    String.raw`\s`,
    String.raw`a|b`,
    String.raw`ab`,
    String.raw`a*`,
    String.raw`a*?`,
    String.raw`(?:)`,
    String.raw`(?:a|bc)`,
    String.raw`(a*)*`,
    String.raw`(\w|\d)*`,
    String.raw`(.*)="(.*)"`,
    String.raw`[a-z][0-9a-z]*`,
  ];
  for (const src of sources) {
    console.log(src);
    const pat = new rerejs.Parser(src).parse();
    const enfa = buildNFA(pat);
    console.log(toDOT(enfa));
    const nfa = eliminateEpsilonTransitions(enfa);
    console.log(toDOT(nfa));
  }
}

if (require.main === module) {
  main();
}
