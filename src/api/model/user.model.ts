interface IUser {
  email: string;
  fullname: string;
  id: number;
  mobile_no: string;
  schedule_color: number;
  user_id: string;
}
interface IUserMe{
  createdAt: string;
  updatedAt: string;
  lastloginAt: string;
  marketingAgreeAt: string;
  id: number;
  user_id: string;
  fullname: string;
  platform: string;
  nickname: string;
  profile_image: string;
  agree_marketing: boolean;
  agree_email: boolean;
  email: string;
  mobile_no: string;
  schedule_color: number;
  recommender_id: string;
  push_token: string;
  birthday: string;
  gender: number;
  push_onoff: boolean;
  deletedYN: boolean;
}
interface IAuth extends IUser {
  access_token: string;
}

export {IUser, IAuth, IUserMe};
