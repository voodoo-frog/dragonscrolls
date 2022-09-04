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
      <body className="min-h-screen bg-[#aa885a] bg-fixed bg-center xl:bg-[url('/images/parchment.jpeg')]">
        {children}
        <ScrollRestoration />
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
        <Scripts />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <Layout>
        <img
          className="mx-auto mb-5 w-full lg:w-1/2"
          src={`/images/dungeon.png`}
          alt={`404 not found`}
        />

        <div className="h-full w-full text-center text-xl">
          <p>Error: {error.message}</p>
        </div>
        <Scripts />
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
              className="mx-auto mb-5 mt-10 w-full lg:w-1/4"
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
        ) : (
          <>
            <img
              className="mx-auto mb-5 mt-10 w-full lg:w-1/4"
              src={`/images/discussion.png`}
              alt={`people at table discussing`}
            />

            <div className="h-full w-full text-center text-xl">
              <p>
                It would seem we are experiencing some technical difficulties.
              </p>
            </div>
          </>
        )}
        <Scripts />
      </Layout>
    </Document>
  );
}
