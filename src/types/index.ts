export type GreetingData = {
  created_at: string,
  id:number,
  is_confirm: boolean,
  id_user: number,
  alias_name: string,
  message: string,
};

export type GreetingRes = {
  greeting: Record<string, GreetingData[]>,
  numberGreeting: number,
}

export type User =  {
  id: number,
  user_name:string,
  created_at: string,
  is_show_gift: boolean,
  is_invited:boolean,
}

export type UserRes = {
  data: {
    is_invited: boolean,
  } & User,
}

export type ReqGreeting = Pick<GreetingData, "alias_name"|"is_confirm"|"message"|"id_user">