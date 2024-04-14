import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/Entitys/Laborotary.Entity';
import { Repository } from 'typeorm';
import { LabItem } from '../interfaces/lab-item.interface';
import { CreateLaborotoryParams, UpdateLaborotoryParams } from './Utils/types';

@Injectable()
export class LaboratoryService {
    constructor(@InjectRepository(Laboratory) private LaboraotyRepository: Repository<Laboratory>){}


    async  findAllLabotoryPatients(): Promise<Laboratory[]>{
        return this.LaboraotyRepository.find();
    }

   
    async findLaborotorypatientByName(FirstName?: string, LastName?: string): Promise<Laboratory[]> {
      const queryBuilder = this.LaboraotyRepository.createQueryBuilder('Laborotorypatients');
  
      if (FirstName && LastName) {
          queryBuilder.where('LOWER(Laborotorypatients.FirstName || Laborotorypatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
      } else if (FirstName) {
          queryBuilder.where('LOWER(Laborotorypatients.FirstName || Laborotorypatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
      } else if (LastName) {
          queryBuilder.where('LOWER(Laborotorypatients.FirstName || Laborotorypatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
      }
  
      return queryBuilder.getMany();
  }
  
  
// Update the createLaborotoryPatient method to accept LabItem as input
async createLaborotoryPatient(labItem: LabItem): Promise<void> {
    const newPatientOnLaborotory = this.LaboraotyRepository.create({
        FirstName: labItem.FirstName,
        LastName: labItem.LastName,
        PaymentMethod: labItem.PaymentMethod,
        TestOrdered: labItem.TestOrdered,
        Date: new Date(),
    });
    await this.LaboraotyRepository.save(newPatientOnLaborotory);
}

  async countPatients(): Promise<number> {
    const count = await this.LaboraotyRepository.count();
    return count;
  }


  async countPatientsWithMessage(): Promise<string> {
    const count = await this.countPatients();
    return `This is the number of patients in laborotary today: ${count}`;
  }

  async UpdateLaborotoryPatientById(ID: number, UpdatedLaborotoryDetails: UpdateLaborotoryParams): Promise<void> {
    const updateObject: Partial<UpdateLaborotoryParams> = {};

    if (UpdatedLaborotoryDetails.FirstName !== undefined) {
        updateObject.FirstName= UpdatedLaborotoryDetails.FirstName;
    }

    if (UpdatedLaborotoryDetails.LastName !== undefined) {
        updateObject.LastName = UpdatedLaborotoryDetails.LastName;
    }

    if (UpdatedLaborotoryDetails.PaymentMethod !== undefined) {
        updateObject.PaymentMethod = UpdatedLaborotoryDetails.PaymentMethod;
    }

    if (UpdatedLaborotoryDetails.TestOrdered !== undefined) {
        updateObject.TestOrdered = UpdatedLaborotoryDetails.TestOrdered;
    }

   

    if (Object.keys(updateObject).length > 0) {
        await this.LaboraotyRepository.update(ID, updateObject);
    }
}
 async DeleteLabPatientById(id:number): Promise<void>{
    await this.LaboraotyRepository.delete(id);
  }





}
