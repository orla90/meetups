export const checkWordDeclension = (number: number, words: Array<string>) => {  
  return words[(number % 100 > 4 && number % 100 < 20) ? 2
    : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10
      : 5]];
}

export const parseLongDescription = (description: string | null) => {
  if (
    description !== null &&
    description.includes('long')
  ) {
    return JSON.stringify(JSON.parse(description).long).slice(
      1,
      -1
    );
  }

  return description;
}

export const parseShortDescription = (description: string | null) => {
  if (
    description !== null &&
    description.includes('short')
  ) {
    return JSON.stringify(JSON.parse(description).short).slice(
      1,
      -1
    );
  }
  return description;
}

export const parseTime = (time: string | Date) => {
  const date = new Date(time);
  const day =
    date.getDate().toString().length < 2
      ? '0' + date.getDate()
      : date.getDate();
  const month =
    (date.getMonth() + 1).toString().length < 2
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  const hours =
    date.getHours().toString().length < 2
      ? '0' + date.getHours()
      : date.getHours();
  const minutes =
    date.getMinutes().toString().length < 2
      ? '0' + date.getMinutes()
      : date.getMinutes();
  const seconds =
    date.getSeconds().toString().length < 2
      ? '0' + date.getSeconds()
      : date.getSeconds();

  const thisDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  return thisDate;
}