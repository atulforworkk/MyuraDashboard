import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import router from "./routes/Routes";
function App() {
  return (
    <MantineProvider>
      <Notifications />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
}

export default App;
