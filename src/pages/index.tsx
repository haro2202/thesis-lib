import DefaultLayout from "@/layouts/default";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TableThesis from "@/components/table-thesis";
import { Input, Spacer } from "@heroui/react";
import { SearchIcon } from "@/components/icons";
import { Thesis } from "@/types/types";

const findSearchText = (rootText: string, textSearch?: string): number => {
  if (!textSearch) return 0;

  const from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";

  rootText = rootText.trim().toLowerCase();
  textSearch = textSearch.trim().toLowerCase();

  for (var i = 0, l = from.length; i < l; i++) {
    rootText = rootText.replace(RegExp(from[i], "gi"), to[i]);
    textSearch = textSearch.replace(RegExp(from[i], "gi"), to[i]);
  }
  return rootText.indexOf(textSearch);
};

export default function IndexPage() {
  const [thesisList, setThesisList] = useState<Thesis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [textSearch, setTextSearch] = useState<string>("");

  const filterdList = useMemo(() => {
    return thesisList
      .map((thesis) => {
        return {
          ...thesis,
        };
      })
      .filter((thesis) => findSearchText(thesis.title, textSearch) !== -1);
  }, [thesisList, textSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get<Map<String, Map<String, any>>>(
        "https://thesis-55996-default-rtdb.asia-southeast1.firebasedatabase.app/thesis-list.json"
      )
      .then((response) => {
        const thesisArray = Object.entries(response.data).map(
          ([key, value]) => {
            return {
              key: key,
              title: value.title,
              url: value.url,
              year: value.year,
            } as Thesis;
          }
        );
        setThesisList(thesisArray);
        setIsLoading(false);
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(function () {});
  }

  const onSave = (thesis: Thesis) => {
    axios
      .patch(
        `https://thesis-55996-default-rtdb.asia-southeast1.firebasedatabase.app/thesis-list/${thesis.key}.json`,
        thesis
      )
      .then(
        () => {
          fetchData();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const onDelete = (thesis: Thesis) => {
    axios
      .delete(
        `https://thesis-55996-default-rtdb.asia-southeast1.firebasedatabase.app/thesis-list/${thesis.key}.json`
      )
      .then(
        () => {
          fetchData();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // const onAdd = (thesis: Thesis) => {
  //   axios
  //     .post(
  //       `https://thesis-55996-default-rtdb.asia-southeast1.firebasedatabase.app/thesis-list.json`,
  //       thesis
  //     )
  //     .then(
  //       () => {
  //         fetchData();
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };

  return (
    <DefaultLayout>
      <Input
        isClearable={true}
        classNames={{
          label: "text-black/50  ",
          input: [
            "bg-transparent",
            "text-black/90 ",
            "placeholder:text-default-700/50 ",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "group-data-[focus=true]:bg-default-200/50",
            "!cursor-text",
          ],
        }}
        label="Search"
        placeholder="Type to search by title..."
        radius="lg"
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        value={textSearch}
        onChange={(e) => {
          setTextSearch(e.target.value);
        }}
        type="search"
        onClear={() => setTextSearch("")}
      />
      <Spacer y={8} />
      <TableThesis
        thesisList={filterdList}
        searchText={textSearch}
        searchFunction={findSearchText}
        isLoading={isLoading}
        onSave={onSave}
        onDelete={onDelete}
      />
    </DefaultLayout>
  );
}
