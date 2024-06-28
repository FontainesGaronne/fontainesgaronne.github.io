export const partition = <T,_>(arr: T[], criteria: (a: T) => boolean): T[][] => arr.reduce((acc, i) => (acc[criteria(i) ? 0 : 1].push(i), acc), [[], []]);
