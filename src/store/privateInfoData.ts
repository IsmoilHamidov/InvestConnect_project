// store/PrivateInfoStore.ts
import {create} from "zustand";

interface IPrivateInfo {
  company_name: string;
  kampanya_egasi: string;
  kontact: string;
  oylik_daromadi: number;
  soff_foydasi: number;
  status: string;
}

interface PrivateInfoStore {
  data: IPrivateInfo;
  setPrivateInfo: (info: IPrivateInfo) => void;
}

export const usePrivateInfoStore = create<PrivateInfoStore>((set) => ({
  data: {
    company_name: "***",
    kampanya_egasi: "***",
    kontact: "+998*********",
    oylik_daromadi: 0,
    soff_foydasi: 0,
    status: "***",
  },
  setPrivateInfo: (info) => set({ data: info }),
}));
