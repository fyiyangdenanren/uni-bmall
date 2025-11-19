export type UserState = {
    token: string | null;
    userProfile: UserProfile | null;
};

export type UserProfile = {
    nickname: string;
    avatarUrl: string;
    gender: number;
    country: string;
    province: string;
    city: string;
    language: string;
}