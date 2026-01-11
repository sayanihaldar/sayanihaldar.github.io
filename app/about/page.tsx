import AboutClient from "./AboutClient";
import { getPersonalData } from "@/utils/fetchPersonalData";

export default async function AboutPage() {
  const data = await getPersonalData();
  return (
    <AboutClient drawings={data.drawings} />
  )
}
