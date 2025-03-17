import { signal, Signal } from "@preact/signals";
import type { Kanji, KanjiField } from "../types/KanjiList";
import { localStorageNotExists } from "./errorHandling";

class KanjiList {
  private KanjiList: Signal<Kanji[]>;

  constructor() {
    this.KanjiList = signal<Kanji[]>([
      { Kanji: "日本語", Reading: "にほんご" },
    ]);
  }

  public getList = () => {
    return this.KanjiList.value;
  };

  public saveList = () => {
    if (localStorageNotExists()) return;
    localStorage.setItem("kanjiList", JSON.stringify(this.getList()));
  };

  public loadList = () => {
    if (localStorageNotExists()) return;
    const list = localStorage.getItem("kanjiList");
    this.KanjiList.value = !list ? this.getList() : JSON.parse(list);
  };

  public getItem = (index: number) => {
    return this.KanjiList.value[index];
  };

  public createItem = () => {
    this.KanjiList.value = [...List.getList(), { Kanji: "", Reading: "" }];
  };

  public editItem = (index: number, label: KanjiField, input: string) => {
    this.KanjiList.value = this.KanjiList.value.map((item, i) =>
      i === index ? { ...item, [label]: input } : item
    );
  };

  public deleteItem = (index: number) => {
    this.KanjiList.value = this.KanjiList.value.filter((_, i) => i !== index);
  };
}

export const List = new KanjiList();
