import { District } from "./district";

export interface Ward {
    wardId: number;
    district: District;
    wardName: string;
}