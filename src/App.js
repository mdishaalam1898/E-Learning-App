import Hero from "./pages/app/hero/Hero";
import Nav from "./components/nav/Nav";
import Courses from "./pages/app/courses/Courses";
import Details from "./pages/app/details/Details";
import Chapter from "./pages/app/chapter/Chapter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Learn from "./pages/app/learn/Learn";

function App() {
  /** Using Routers */
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { index: true, element: <Hero /> },

        {
          path: "/courses",
          children: [
            { index: true, element: <Courses /> },
            {
              path: ":courseId",
              element: <Details />,
            },
          ],
        },
        {
          path: "/learn/:courseId",
          element: <Learn />,
          children: [{ path: "chapter/:chapterId", element: <Chapter /> }],
        },
      ],
    },
  ]);
  return (
    // <div className="App">
    //   <Nav />
    //   <Hero />
    //   <Courses />
    // </div>
    <RouterProvider router={browserRouter} />
  );
}

export default App;
