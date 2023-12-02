import { useId, useState } from "react";
import { translate } from "google-translate-api-browser";

function App() {
  const [cors, setCors] = useState("http://cors-anywhere.herokuapp.com/");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const corsInputId = useId();
  const inputId = useId();

  const [isLoading, setIsLoading] = useState(false);

  const onTranslate = () => {
    setIsLoading(true);
    translate(input, { to: "en", corsUrl: cors })
      .then((res: any) => {
        setOutput(res.text);
      })
      .catch((err: unknown) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor={corsInputId} className="block text-sm font-medium leading-6 text-gray-900">
              Cors URL
            </label>
            <div className="mt-2">
              <input
                value={cors}
                onChange={(e) => setCors(e.target.value)}
                type="text"
                name="cors"
                id={corsInputId}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
                Input
              </label>
              <div className="mt-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  name="input"
                  id={inputId}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4">
              <button
                type="button"
                disabled={isLoading}
                onClick={onTranslate}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "loading..." : "Translate"}
              </button>
            </div>
            <div className="sm:col-span-3">
              <span className="text-sm text-gray-500">Translated text: </span> {output || "-"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
