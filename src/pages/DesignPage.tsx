import QuickActionPanel from "@/components/newUI/QuickActionPanel";
import Header from "@/components/newUI/header";
import DesignProject from "@/components/design/DesignProject";



const DesignPage = () => {
  return (
    <>
      <Header />
      <QuickActionPanel />
      <main>
        <DesignProject />
      </main>
    </>
  );
};

export default DesignPage;