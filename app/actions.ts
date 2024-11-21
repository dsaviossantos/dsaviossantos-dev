"use server";
import { client } from "@/lib/libsql";
import { compare } from "bcrypt-ts";
import { BioPageContent, UserDataDB } from "@/lib/types";

export async function getData() {
  const data = await client.execute("SELECT content FROM content WHERE id = 1");
  const content = data.rows[0].content?.toString() || "{}";
  return JSON.parse(content);
}
export async function updateContent(content: BioPageContent) {
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

export async function validatePassword(user: UserDataDB, password: string) {
  return compare(password, user.password);
}
