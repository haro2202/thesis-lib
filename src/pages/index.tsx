import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import axios from "axios";
import TableThesis from "@/components/table-thesis";

export interface Thesis {
  key: number;
  title: string;
  url: string;
  year: number;
}

export default function IndexPage() {
  const [thesisList, setThesisList] = useState<Thesis[]>([]);
  useEffect(() => {
    axios
      .get<Thesis[]>(
        "https://thesis-55996-default-rtdb.asia-southeast1.firebasedatabase.app/thesis-list.json"
      )
      .then((response) => {
        setThesisList(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(function () {});
  }, []);

  return (
    <DefaultLayout>
      <TableThesis thesisList={thesisList} />
    </DefaultLayout>
  );
}
