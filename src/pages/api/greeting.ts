// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GreetingData, GreetingRes, ReqGreeting } from "@/types";
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL??"", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??"");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GreetingRes|{isSuccess: boolean}>,
) {
  const fetchData = async () => {
    const { data: greeting = [] } = await supabase
    .from('greeting')
    .select('*')
    .returns<GreetingData[]>();
    const sortedMappedGreeting = greeting
      ?.sort((a,b) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf())
      ?.reduce<Record<string, GreetingData[]>>((prev, curr)=>{
        const key = dayjs(curr.created_at).format("DD MMM YYYY")
        if(prev[key]){
          return {
            ...prev,
            [key]: [...(prev[key]||[]), curr]
          }
        }
        return {
          ...prev,
          [key]: [curr]
        }
        }, 
      {})
    res.status(200).json({greeting: sortedMappedGreeting||{} , numberGreeting: greeting?.length||0})
  }

  const postData = async (data:ReqGreeting) => {
    const {error } = await supabase
      .from("greeting")
      .insert(data);
    res.status(200).json({isSuccess: true});
  }

  if(req.method === "GET"){
    await fetchData();
    return;
  }

  const body = req.body;
  await postData(body.data);
  return;
}
