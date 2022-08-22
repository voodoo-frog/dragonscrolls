import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useCatch,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { ReactNode } from "react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import Layout from "~/components/Layout";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Dragon Scrolls: D&D 5e Wiki & Character Creator",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

interface Props {
  children?: ReactNode;
}

const Document = ({ children }: Props) => {
  return (
    <html lang="en" className="min-h-screen">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[url('/images/parchment.jpeg')] bg-fixed bg-center bg-no-repeat bg-cover h-screen w-screen">
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />

        <ScrollRestoration />

        <Scripts />

        <LiveReload />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error; }) {
  return (
    <Document>
      <Layout>
        <h3 className="m-3 text-center text-4xl">Error!</h3>

        <img
          className="mx-auto mb-5 mt-10 w-1/4"
          src={`/images/dungeon.png`}
          alt={`404 not found`}
        />

        <div className="h-full w-full text-center text-xl">
          <p>Error: {error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <Layout>
        {caught.status === 404 ? (
          <>
            <img
              className="mx-auto mb-5 mt-10 w-1/4"
              src={`/images/404.png`}
              alt={`404 not found`}
            />

            <div className="h-full w-full text-center text-xl">
              <p>
                It would seem that the scroll you seek does not exist in our
                archives
              </p>
            </div>
          </>
        ) : null}
      </Layout>
    </Document>
  );
}
