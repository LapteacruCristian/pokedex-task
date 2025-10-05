import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import PokedexPage from "./pages/PokedexPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokedexPage />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetailsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
