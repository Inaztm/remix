import { BuilderComponent, builder } from "@builder.io/react";
import { useLoaderData } from "@remix-run/react";
import { CUSTOM_COMPONENTS } from "../builder-registry";
import type { LoaderArgs } from "@remix-run/server-runtime";

// Fetch contents of the page
export const loader = async ({ params, request, context }: LoaderArgs) => {
  // Initialize the Builder client and pass in your Public API Key
  const builderApiKey = process.env.PUBLIC_BUILDER_KEY!;
  builder.init(builderApiKey);

  // Fetch data content from Builder.io based on the URL path
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + params["*"],
      },
      locale: params.locale,
    })
    .toPromise();

  // Verify the user is previewing or editing in Builder
  const isPreviewing = new URL(request.url).searchParams.has("builder.preview");

  // If the page is not found and the user is not previewing, throw a 404.
  // The CatchBoundary component will catch the error
  if (!page && !isPreviewing) {
    throw new Response("Page Not Found", {
      status: 404,
      statusText:
        "We couldn't find this page, please check your url path and if the page is published on Builder.io.",
    });
  }

  return { page, builderApiKey };
};

// Define and render the page.
export default function Page() {
  // Use the useLoaderData hook to get the Page data from "loader" above.
  const { page, builderApiKey } = useLoaderData<typeof loader>();

  // Render the page content from Builder.io
  return (
    <BuilderComponent
      customComponents={CUSTOM_COMPONENTS}
      apiKey={builderApiKey}
      model="page"
      content={page}
    />
  );
}

declare global {
  interface Env {
    PUBLIC_BUILDER_KEY: string;
  }
}
