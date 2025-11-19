export type WxUserVO = {
    nickName: string,
    avatarUrl: string,
    gender: number,
    city: string,
    province: string,
    country: string,
    language: string
}

export type DecryptDTO = {
    rawData: string,
    signature: string,
    iv: string,
    encryptedData: string
}