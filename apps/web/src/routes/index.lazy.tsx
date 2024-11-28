import { createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils";

const MainPage = () => (
  <div>
    test <Button>click</Button>
  </div>
);

export const Route = createLazyFileRoute(ROUTES.MAIN)({
  component: MainPage,
});
