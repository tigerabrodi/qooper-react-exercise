import { Redirect, Route, Switch } from "react-router-dom";
import { AppProviders } from "./context";
import { SignIn, TodoList } from "./pages";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import { useUser } from "./hooks";

function Routes() {
  const { currentUser, hasInitializedAuthState } = useUser();

  if (!hasInitializedAuthState) {
    return null;
  }

  return (
    <Switch>
      <Route exact path="/">
        {currentUser ? <TodoList /> : <Redirect to="/signin" />}
      </Route>
      <Route path="/signin">
        {currentUser ? <Redirect to="/" /> : <SignIn />}
      </Route>
    </Switch>
  );
}

export function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
}
