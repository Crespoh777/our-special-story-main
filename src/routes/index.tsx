import { createFileRoute } from "@tanstack/react-router";
import { SurpriseApp } from "@/components/surprise/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Surpresa" },
      { name: "description", content: "Surpresa animada com musica." },
      { property: "og:title", content: "Surpresa" },
      { property: "og:description", content: "Surpresa animada com musica." },
    ],
  }),
  component: Index,
});

function Index() {
  return <SurpriseApp />;
}
