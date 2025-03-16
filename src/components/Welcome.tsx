import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { useEffect } from "preact/hooks";

export const Welcome = () => {
  const isOpen = useSignal(false);
  const page = useSignal<number>(0);
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const isFirstLoad = localStorage.getItem("firstLoad");
    if (!isFirstLoad) {
      isOpen.value = true;
      localStorage.setItem("firstLoad", "true");
    }
  });

  const handleNext = () => {
    if (page.value < 1) {
      page.value = page.value + 1;
    } else {
      modal.current?.classList.toggle("animate-fade-up");
      modal.current?.classList.add("animate-reverse");
      setTimeout(() => {
        modal.current?.classList.toggle("animate-ease-in");
        modal.current?.classList.toggle("animate-fade-down");
      }, 50);
      setTimeout(() => {
        isOpen.value = false;
      }, 1000);
    }
  };

  const FirstPage = () => {
    return (
      <div>
        <h1>Let's Roulette Kanji!</h1>
        <p>
          This website allows you to create a custom kanji list and roulette it.
          The point of this method it's developing your retention and
          recognition.
        </p>
      </div>
    );
  };

  const SecondPage = () => {
    return (
      <div class="animate-fade-left">
        <h1>Before you continue...</h1>
        <p>
          You can roulette your Kanji with a button or pressing 'R' key. This
          key it's completely customizable on settings!
        </p>
      </div>
    );
  };

  const Pagination = () => {
    const pages = [FirstPage, SecondPage];
    const PageComponent = pages[page.value];
    return <PageComponent />;
  };

  return (
    <dialog
      ref={modal}
      open={isOpen.value}
      class="bg-transparent inset-0 m-auto animate-fade-up"
    >
      <div class="prose prose-headings:text-2xl prose-xl">
        <Pagination />
      </div>
      <button
        onClick={handleNext}
        class="bg-slate-800 hover:bg-slate-700 hover:shadow-lg shadow-slate-800/15 w-24 h-10 rounded-md text-slate-100 font-bold cursor-pointer transition-all"
      >
        {page.value < 1 ? "Continue" : "Close"}
      </button>
    </dialog>
  );
};
