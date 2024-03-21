// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, UserRes } from "@/types";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL??"", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??"");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserRes>,
) {
  const fetchData = async () => {
    const { data } = await supabase
    .from('user')
    .select('*')
    .ilike('user_name', `${req.query.username}`)
    .returns<User[]>();
    if(!data?.length) {
      res.status(200).json({data: null});
    }
    res.status(200).json({data: {
      ...data?.[0] as User,
    }});
  }


  if(req.method === "GET"){
    await fetchData();
    return;
  }

  res.status(200).json({data: null});
}
