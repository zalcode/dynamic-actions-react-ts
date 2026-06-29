import { useState, useEffect, ComponentType } from "react";

function App() {
  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold dark:text-white">Dynamic Actions!</h1>
      <div className="flex flex-row items-center gap-6">
        {/* actions should be type safe */}
        <DynamicButton
          actions={[
            {
              type: "Counter",
            },
            {
              type: "Theme",
              props: {
                theme: "dark",
              },
            },
          ]}
        />
      </div>
    </main>
  );
}

// list of action
const ACTION_COMPONENTS = {
  Counter: CounterButton,
  Theme: ToggleThemeButton,
};

// TODO: fix this type
type ActionType = {
  type: string;
  props?: unknown;
};

function DynamicButton(props: { actions: ActionType[] }) {
  return props.actions?.map((action, index) => {
    // TODO: fix this
    return null;
  });
}

// Counter Button
function CounterButton() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400"
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </button>
  );
}

// Toggle Theme Button
function ToggleThemeButton(props: { defaultTheme: "dark" | "light" }) {
  const [theme, setTheme] = useState(() => props.defaultTheme || "dark");

  useEffect(() => {
    setTheme(props.defaultTheme);
    getHtmlTag()?.setAttribute("class", props.defaultTheme);
  }, [props.defaultTheme]);

  return (
    <button
      className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400"
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        getHtmlTag()?.setAttribute("class", newTheme);
        setTheme(newTheme);
      }}
    >
      Theme: {theme}
    </button>
  );
}

function getHtmlTag() {
  return document.getElementsByTagName("html")?.[0];
}

export default App;
