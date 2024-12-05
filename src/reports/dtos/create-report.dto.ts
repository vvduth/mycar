
import {
    IsNumber, Min, Max,  IsString, IsLongitude, IsLatitude,
}from 'class-validator'

export class CreateReportDTO {

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  price: number;
}
