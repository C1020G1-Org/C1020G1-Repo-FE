import {District} from "./district";

export interface Ward {
  wardId: number;
  wardName: string;
  district: District;
}
