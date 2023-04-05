import { SelectQueryBuilder } from 'typeorm';

export const conditionUtils = <T>(
  queryBuild: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  console.log(obj);
  Object.keys(obj).forEach((key) => {
    console.log(`${key} = :${key}`, { [key]: obj[key] });
    if (obj[key]) {
      queryBuild.andWhere(`${key} = :${key}`, { [key]: obj[key] });
    }
  });
  return queryBuild;
};
