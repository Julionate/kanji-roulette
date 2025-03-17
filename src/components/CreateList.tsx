import { List } from "../lib/KanjiList";
import { TrashIcon } from "../assets/TrashIcon";
import { AddIcon } from "../assets/AddIcon";
import { useRef } from "preact/hooks";
import { useEffect } from "preact/hooks";

export const CreateList = () => {
  const inputsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    List.loadList();
  }, []);

  const handleAddInput = () => {
    List.createItem();
    setTimeout(() => {
      inputsContainer.current?.scrollTo({
        top: inputsContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const InputKanji = ({ index }: { index: number }) => {
    return (
      <div class="flex gap-4 **:transition-colors mb-4">
        <input
          type="text"
          defaultValue={List.getItem(index).Kanji}
          onChange={(e) => List.editItem(index, "Kanji", e.currentTarget.value)}
          class="w-24 h-10 bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 p-2 rounded-lg placeholder:font-medium"
        ></input>
        <input
          type="text"
          defaultValue={List.getItem(index).Reading}
          onChange={(e) =>
            List.editItem(index, "Reading", e.currentTarget.value)
          }
          class="w-24 h-10 bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 p-2 rounded-lg placeholder:font-medium"
        ></input>
        <button
          onClick={() => List.deleteItem(index)}
          class="w-10 h-10 bg-slate-300 rounded-lg group hover:bg-red-100"
        >
          <TrashIcon class="w-full h-full p-2 fill-slate-700 group-hover:fill-red-500 cursor-pointer" />
        </button>
      </div>
    );
  };

  return (
    <div class="flex flex-col m-2">
      <h1 class="text-xl md:text-2xl text-center mb-6">Create your list</h1>
      <div
        ref={inputsContainer}
        class="max-h-[60svh] overflow-y-auto mb-4 px-2"
      >
        {List.getList().map((_, i) => (
          <InputKanji key={i} index={i} />
        ))}
      </div>
      <div class="flex flex-row self-center gap-2">
        <button class="w-10 h-10 bg-slate-300 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
          <AddIcon
            onClick={handleAddInput}
            class="w-full h-full p-1 fill-slate-700 hover:fill-slate-600 transition-colors"
          />
        </button>
        <button
          onClick={() => List.saveList()}
          class="max h-10 px-4 bg-slate-300 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
        >
          Ready
        </button>
      </div>
    </div>
  );
};
