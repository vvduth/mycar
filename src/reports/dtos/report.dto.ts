import { Expose, Transform } from 'class-transformer';


export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Transform(({obj}) => obj.user.id )
  @Expose()
  userId: number;
}
