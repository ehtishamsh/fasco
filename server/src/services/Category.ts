import prismm from "../utils/db";

export async function All() {
  return await prismm.category.findMany();
}
export async function One(name: string) {
  return await prismm.category.findUnique({ where: { name } });
}
export async function Create(name: string) {
  return await prismm.category.create({ data: { name } });
}
