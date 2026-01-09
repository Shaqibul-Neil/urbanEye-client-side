import { useSearchParams } from "react-router";
import Footer from "../components/common/footer/Footer";
import Banner from "../components/home/banner/Banner";
import Home from "../pages/home/Home";
import useRole from "../hooks/auth & role/useRole";
import { useEffect } from "react";
import EditableWrapper from "../components/page builder/EditableWrapper";
import useEditorMode from "../hooks/page builder/useEditorMode";

const HomeLayout = () => {
  const { setEditMode } = useEditorMode();
  //detect edit mode from search params
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("edit"));
  //get the role
  const { role } = useRole();
  useEffect(() => {
    if (role === "admin" && searchParams.get("edit") === "true") {
      setEditMode(true);
    }
  }, [role, searchParams, setEditMode]);

  return (
    <div>
      {/* Navbar + Banner together */}
      <section className="relative">
        <EditableWrapper sectionKey="banner">
          <Banner />
        </EditableWrapper>

        <Home />
      </section>
      <Footer />
    </div>
  );
};

export default HomeLayout;
