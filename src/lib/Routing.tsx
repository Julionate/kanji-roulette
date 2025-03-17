import type { Signal } from "@preact/signals";
import { signal } from "@preact/signals";
import { Routes } from "../types/Routes";

class Routing {
  private route: Signal;

  constructor() {
    this.route = signal<Routes>(Routes.CreateList);
  }

  getRoute = () => {
    return this.route.value;
  };

  changeRoute = (route: keyof typeof Routes) => {
    this.route.value = Routes[route];
  };
}

export const route = new Routing();
