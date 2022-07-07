import { Fragment, PropsWithChildren } from "react";
import BackToTop from "./BackToTop";
import MainNavigation from "./MainNavigation";

export const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className="bd-content order-1 mb-auto" id="content">
        {props.children}
      </main>
      <BackToTop />
    </Fragment>
  );
};
