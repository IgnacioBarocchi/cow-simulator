import "./index.css";

import { Page, PageContent, PageHeader, Spinner } from "grommet";
import { Suspense, lazy } from "react";

import LogOutButton from "./features/login/logout-button";
import { UIProvider } from "@mono/ui";
import { logged } from "./store/store";
import { useAtomValue } from "jotai";

const MainView = lazy(() => import("./main-view"));
const LoginForm = lazy(() => import("./features/login/login-form"));

export default function App() {
  const userLogged = useAtomValue(logged);

  return (
    <UIProvider>
      <Page kind="wide">
        <PageContent>
          <PageHeader
            title="Interveción V"
            subtitle={"Registros y mapas de puntos de interés."}
            actions={<LogOutButton />}
          />
          <Suspense fallback={<Spinner />}>
            {userLogged ? <MainView /> : <LoginForm />}
          </Suspense>
        </PageContent>
      </Page>
    </UIProvider>
  );
}
