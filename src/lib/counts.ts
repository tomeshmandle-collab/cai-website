import { getTeamContent } from './content';

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty'];

export function numberToWords(num: number, format: 'capitalize' | 'lower' | 'upper' = 'lower'): string {
  if (num === 0) return format === 'lower' ? 'zero' : format === 'capitalize' ? 'Zero' : 'ZERO';
  let word = '';
  if (num < 20) {
    word = ones[num];
  } else if (num <= 30) {
    word = tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ones[num % 10] : '');
  } else {
    word = num.toString();
  }
  
  if (format === 'lower') return word;
  if (format === 'upper') return word.toUpperCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function getPeopleCount(): Promise<number> {
  const team = await getTeamContent();
  return team.members.length;
}

export async function getFunctionsCount(): Promise<number> {
  const team = await getTeamContent();
  return team.functions.length;
}

export function getCopyrightYear(): number {
  return new Date().getFullYear();
}

export async function fillTemplate(template: string): Promise<string> {
  const team = await getTeamContent();
  const people = team.members.length;
  const functions = team.functions.length;
  
  return template
    .replace(/{people}/g, people.toString())
    .replace(/{functions}/g, functions.toString())
    .replace(/{PeopleWord}/g, numberToWords(people, 'capitalize'))
    .replace(/{peopleWord}/g, numberToWords(people, 'lower'))
    .replace(/{PEOPLEWORD}/g, numberToWords(people, 'upper'))
    .replace(/{functionsWord}/g, numberToWords(functions, 'lower'))
    .replace(/{FUNCTIONSWORD}/g, numberToWords(functions, 'upper'))
    .replace(/{currentYear}/g, team.currentYear);
}

