import HomePage from "@/components/HomePage";
import { getData } from "@/app/actions";
export default async function Home() {
  const content = await getData();
  return <HomePage content={content} />;
}
