import { List } from "../lib/KanjiList";
import { useEffect } from "preact/hooks";
import { useSignal, Signal } from "@preact/signals";
import { randomNumber } from "../lib/randomNumber";
import { route } from "../lib/Routing";

export const Roulette = () => {
  const Kanji = useSignal<string | undefined>(undefined);
  const Reading = useSignal<string | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      List.loadList();
      randomItem();
    }, 150);

    document.addEventListener("keydown", keyPressHandler);
    return () => document.removeEventListener("keydown", keyPressHandler);
  }, []);

  const randomItem = () => {
    let newItem = List.KanjiBase;
    do {
      newItem = List.getItem(randomNumber(List.getList().length));
    } while (newItem.Kanji === Kanji.value);

    [Kanji.value, Reading.value] = [newItem.Kanji, newItem.Reading];
  };

  const keyPressHandler = (keydown: KeyboardEvent) => {
    if (keydown.key.toUpperCase() === "R") {
      randomItem();
    }
  };

  const loadingSkeleton = (Width: number, Height: number) => {
    return (
      <div
        class="bg-gradient-to-r from-slate-300/75 to-slate-300 animate-pulse rounded-full"
        style={{ width: Width, height: Height }}
      />
    );
  };

  const ifVoidRenderSkeleton = (text: Signal<string | undefined>) => {
    return !text.value ? loadingSkeleton(randomNumber(150, 50), 28) : text;
  };

  return (
    <div class="flex flex-col items-center gap-2">
      <div
        onClick={() => route.changeRoute("CreateList")}
        class="fixed bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-sm cursor-pointer select-none"
      >
        Change current list
      </div>
      <span class="text-center">{ifVoidRenderSkeleton(Reading)}</span>
      <span class="text-3xl md:text-4xl text-center font-bold">
        {ifVoidRenderSkeleton(Kanji)}
      </span>
      <button
        onClick={randomItem}
        class="text-white font-medium bg-slate-700 hover:bg-slate-600 w-max h-max px-3 py-2 rounded-lg shadow-sm self-center mt-2 cursor-pointer"
      >
        Roulette
      </button>
    </div>
  );
};
