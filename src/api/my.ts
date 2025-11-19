import { DecryptDTO, WxUserVO } from "@/types/my";
import { http } from "@/utils/http";

/**
 * 保存用户信息
 */
export function saveUserProfile(data: DecryptDTO) {
    return http<WxUserVO>({
        url: '/wx-user/profile',
        method: 'POST',
        data
    })
}