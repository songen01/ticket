import { create } from "zustand";


export const useAleoPrivateKey = create<any>((set: any) => ({
    PK: "",
    Address: "",
    ViewKey: "",
    login: false,
    setAleoPrivateKey: (e: any) => set((state: any) => ({ PK: e })),
    setAleoAddress: (e: any) => set((state: any) => ({ Address: e })),
    setAleoViewKey: (e: any) => set((state: any) => ({ ViewKey: e })),
    setLogin: (e: any) => set((state: any) => ({ login: true })),
}));


export const useAleoLoading = create<any>((set: any) => ({
    loading: false,
    setLoading: (e: any) => set((state: any) => ({ loading: e })),
}));

export const useAleoRecords = create<any>((set: any) => ({
    records: [],
    setRecords: (e: any) => set((state: any) => ({ records: e })),
}));