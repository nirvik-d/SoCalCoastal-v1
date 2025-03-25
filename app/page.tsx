// pages/index.tsx

import { GetServerSideProps } from "next";
import { supabase } from "./supabaseClient";

type Data = {
  id: number;
  name: string;
};

type Props = {
  data: Data[];
};

const Home = ({ data }: Props) => {
  return (
    <div>
      <h1>Data from Supabase</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from Supabase
  const { data, error } = await supabase
    .from("SoCal Coastal Communities")
    .select("*");

  if (error) {
    console.error(error);
    return { props: { data: [] } };
  }

  return {
    props: {
      data,
    },
  };
};

export default Home;
