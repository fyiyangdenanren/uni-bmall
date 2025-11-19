export type UserState = {
    token: string;
    userProfile: UserProfile | {};
};

export type UserProfile = {
    avatarUrl: string;
    city: string;
    country: string;
    gender: number;
    language: string;
    nickName: string;
    province: string;

}