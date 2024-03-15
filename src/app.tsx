import { Route, Switch } from "react-router-dom";
import { AppProviders } from "./context";
import { SignIn, TodoList } from "./pages";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

export function App() {
  return (
    <AppProviders>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </AppProviders>
  );
}
