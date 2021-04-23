import {ProvinceDto} from "./province-dto";

export class DistrictDto {
  districtId: number;
  province: ProvinceDto;
  districtName: string;
}
