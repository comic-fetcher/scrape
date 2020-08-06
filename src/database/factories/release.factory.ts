import { Comic } from "../../typeorm/entities";

export const releaseFactory = ({ id }: Comic, date: Date) => ({
  id: `${id}_${date.getTime()}`,
  comic: { id },
  date,
});
