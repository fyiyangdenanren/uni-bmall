import { http } from "@/utils/http";

type token = string;
export function login(code: string) {
    return http<token>({
        method: 'POST',
        url: '/wx-user/login',
        data: { code }
    })
}
