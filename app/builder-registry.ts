import type { RegisteredComponent } from "@builder.io/react";
import ArticleCard from "./components/ArticleCard/ArticleCard";
import Counter from "./components/Counter/Counter";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: ArticleCard,
    name: "ArticleCard",
    inputs: [
      {
        name: "item",
        type: "reference",
        model: 'article'
      },
    ],
  },
  {
    component: Counter,
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  },
];
