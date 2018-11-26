export abstract class BaseModel {

  public static db: any;
  public static tableName = '';
  private static knex: Knex;

  private static async manyOrNone<T>(this: T, query): Promise<T> {
    try {

    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}