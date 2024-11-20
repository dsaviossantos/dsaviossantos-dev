"use server";
import { client } from "@/lib/libsql";
import { compare } from "bcryptjs";

export async function getData() {
  const data = await client.execute("SELECT content FROM content WHERE id = 1");
  return JSON.parse(data.rows[0].content);
}
export async function updateContent(content: any) {
  const newData = JSON.stringify(content);
  await client.execute({
    sql: "UPDATE content SET content = (?) WHERE id = 1",
    args: [newData],
  });
}

export async function getUser(email: string) {
  const data = await client.execute({
    sql: "SELECT * FROM users WHERE email = (?)",
    args: [email],
  });
  return data.rows[0];
}

export async function validatePassword(user: any, password: string) {
  return compare(password, user.password);
}
