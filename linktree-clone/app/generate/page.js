import { Suspense } from "react";
import GenerateClient from "./GenerateClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GenerateClient />
    </Suspense>
  );
}
