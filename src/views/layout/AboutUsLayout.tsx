import React from "react";
import { Outlet } from "react-router-dom";
import AboutHeader from "../../composites/about/aboutHeader/AboutHeader";
import AboutFooter from "../../composites/about/aboutFooter/AboutFooter";
import { Input } from "@mantine/core";
import { Button } from "@/components/ui/button";

function AboutUsLayout() {
  return (
    <div>
      <AboutHeader />
      <Outlet />
      <AboutFooter />
      <Button>
        hello world 
        </Button>
    </div>

  );
}

export default AboutUsLayout;
