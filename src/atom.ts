import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDark", // key는 unique 해야 한다.
    default: true,
});
