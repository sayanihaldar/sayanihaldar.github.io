import { getResumeData } from "@/utils/fetchResume";
import HomeClient from "./HomeClient";

export default async function Home() {

  const resumeData = await getResumeData();

  return (
    <HomeClient resumeData={resumeData} />
  );
}