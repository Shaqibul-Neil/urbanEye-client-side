import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <header className="py-4">header</header>
      <main className="my-4">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default MainLayout;
