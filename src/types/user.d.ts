export type UserState = {
    token: string | null;
    userInfo: UserInfo | null;
};

export type UserInfo = {
    nickname: string;
    avatarUrl: string;
    gender: number;
    country: string;
    province: string;
    city: string;
    language: string;
}