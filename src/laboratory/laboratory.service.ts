// laboratory.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/Entitys/Laborotary.Entity';
import { Repository, LessThan, MoreThanOrEqual } from 'typeorm'; // Import LessThan and MoreThanOrEqual
import { LabItem } from '../interfaces/lab-item.interface';
import { UpdateLaborotoryParams } from './Utils/types';

@Injectable()
export class LaboratoryService {
    constructor(@InjectRepository(Laboratory) private LaboratoryRepository: Repository<Laboratory>) {}

    async findAllLaboratoryPatientsByCurrentDay(): Promise<Laboratory[] | string> {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
        const patients = await this.LaboratoryRepository.find({
            where: {
                Date: MoreThanOrEqual(startOfDay) && LessThan(endOfDay),
            },
        });
    
        if (patients.length === 0) {
            return 'Oops! No data available for today.';
        }
    
        return patients;
    }
    
    async findLaboratoryPatientByName(FirstName?: string, LastName?: string): Promise<Laboratory[] | string> {
        const queryBuilder = this.LaboratoryRepository.createQueryBuilder('Laboratorypatients');
    
        if (FirstName && LastName) {
            queryBuilder.where('LOWER(Laboratorypatients.FirstName || Laboratorypatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
        } else if (FirstName) {
            queryBuilder.where('LOWER(Laboratorypatients.FirstName || Laboratorypatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
        } else if (LastName) {
            queryBuilder.where('LOWER(Laboratorypatients.FirstName || Laboratorypatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
        }
    
        const results = await queryBuilder.getMany();

        if (results.length === 0) {
            return 'Name not found';
        }
    
        return results;
    }
    
    async createLaborotoryPatient(labItem: LabItem): Promise<void> {
        const newPatientOnLaborotory = this.LaboratoryRepository.create({
            FirstName: labItem.FirstName,
            LastName: labItem.LastName,
            PaymentMethod: labItem.PaymentMethod,
            TestOrdered: labItem.TestOrdered,
            Date: new Date(),
        });
        await this.LaboratoryRepository.save(newPatientOnLaborotory);
    }
    
    async countPatients(): Promise<number> {
        return this.LaboratoryRepository.count(); // No need for await here
    }
    
    async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of patients in laboratory today: ${count}`;
    }
    
    async UpdateLaboratoryPatientById(ID: number, UpdatedLaboratoryDetails: UpdateLaborotoryParams): Promise<void> {
        const updateObject: Partial<UpdateLaborotoryParams> = {};
    
        if (UpdatedLaboratoryDetails.FirstName !== undefined) {
            updateObject.FirstName = UpdatedLaboratoryDetails.FirstName;
        }
    
        if (UpdatedLaboratoryDetails.LastName !== undefined) {
            updateObject.LastName = UpdatedLaboratoryDetails.LastName;
        }
    
        if (UpdatedLaboratoryDetails.PaymentMethod !== undefined) {
            updateObject.PaymentMethod = UpdatedLaboratoryDetails.PaymentMethod;
        }
    
        if (UpdatedLaboratoryDetails.TestOrdered !== undefined) {
            updateObject.TestOrdered = UpdatedLaboratoryDetails.TestOrdered;
        }
    
        if (Object.keys(updateObject).length > 0) {
            await this.LaboratoryRepository.update(ID, updateObject);
        }
    }

    async DeleteLabPatientById(id:number): Promise<void>{
        await this.LaboratoryRepository.delete(id);
    }
}
