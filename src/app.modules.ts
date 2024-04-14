import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reception } from './Entitys/Reception.Entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OPD } from './Entitys/OPD.Entity';
import { DaySummary, Financial } from './Entitys/Financial.Entity';
import { BackstoreController } from './backstore/backstore.controller';
import { PhamarcyController } from './phamarcy/phamarcy.controller';
import { ReceptionController } from './reception/reception.controller';
import { OpdController } from './opd/opd.controller';
import { BackstoreService } from './backstore/backstore.service';
import { ReceptionService } from './reception/reception.service';
import { OpdService } from './opd/opd.service';
import { Pharmacy } from './Entitys/Phamarcy.Entity';
import { PhamarcyServices } from './phamarcy/phamarcy.service';

import { Backstore } from './Entitys/Backstore.Entity';
import { FinancialController } from './financial/financial.controller';
import { FinancialService } from './financial/financial.service';
import { XRayController } from './x-ray/x-ray.controller';
import { XRayService } from './x-ray/x-ray.service';
import { DentalService } from './dental/dental.service';
import { DentalController } from './dental/dental.controller';
import { LaboratoryService } from './laboratory/laboratory.service';
import { LaboratoryController } from './laboratory/laboratory.controller';
import { Xray } from './Entitys/Xray.Entity';
import { Laboratory } from './Entitys/Laborotary.Entity';
import { PhamarcySales } from './Entitys/PhamarcySales.Entity';
import { Dental } from './Entitys/Dental.Entity';
import { Vitals } from './Entitys/Vitals.Entity';
import { VitalsController } from './vitals/vitals.controller';
import { VitalsService } from './vitals/vitals.service';
import { PharmacySalesController } from './pharmacy_sales/pharmacy_sales.controller';
import { PharmacySalesService } from './pharmacy_sales/pharmacy_sales.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
     type: 'postgres',
      host: 'localhost',
      port: 5432,
      username:'postgres',
     database:'liwondeprivatehospital',
      password:'1234',
     url:"postgres://jhxtzhpp:Ax7lDlN81kXio7XGO4Zi_S_QC8Tj3W7d@baasu.db.elephantsql.com/jhxtzhpp",
    
      entities: [Reception, OPD, Pharmacy, Financial, DaySummary,Backstore,Xray,Laboratory,PhamarcySales,Dental,Vitals],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Backstore,Pharmacy,Reception,OPD,Financial,DaySummary,Xray,Laboratory,PhamarcySales,Dental,Vitals]), 
  ],
  providers: [
    BackstoreService,
    AppService,
    PhamarcyServices,
    FinancialService,
    ReceptionService,
    LaboratoryService,
    XRayService,
    DentalService,
    OpdService,
    VitalsService,
    PharmacySalesService,
    Backstore,
    Pharmacy,
    Reception ,
    OPD,
    Financial,
    DaySummary,
    Xray,
    Laboratory,
    PhamarcySales,
    Dental,
    Vitals
  ],
  controllers: [
    AppController,
    FinancialController,
    BackstoreController,
    LaboratoryController,
    PhamarcyController,
    ReceptionController,
    OpdController,
    XRayController,
    DentalController,
    VitalsController,
    PharmacySalesController,
  ],
})
export class AppModule {}
