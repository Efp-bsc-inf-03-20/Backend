import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OPD } from 'src/Entitys/OPD.Entity';
import { Repository } from 'typeorm';
import { UpdateOpdParams, createOpdParams } from './Utils/types';

@Injectable()
export class OpdService {
    constructor(@InjectRepository(OPD) private OPDRepository: Repository<OPD>){}

    async findAllOPDPatient(): Promise<OPD[]>{
        return this.OPDRepository.find();
    }

    async findOPDpatientByName(FirstName?: string, LastName?: string): Promise<OPD[]> {
        const queryBuilder = this.OPDRepository.createQueryBuilder('opdpatients');
    
        if (FirstName && LastName) {
            queryBuilder.where('LOWER(opdpatients.FirstName || opdpatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
        } else if (FirstName) {
            queryBuilder.where('LOWER(opdpatients.FirstName || opdpatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
        } else if (LastName) {
            queryBuilder.where('LOWER(opdpatients.FirstName || opdpatients.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
        }
    
        return queryBuilder.getMany();
    }
    async CreateOPDPatient(OpdDetails: createOpdParams): Promise<void> {
        if ((OpdDetails.Amount === null && OpdDetails.MedicalScheme === null) ||
            (OpdDetails.Amount !== null && OpdDetails.MedicalScheme !== null)) {
            throw new HttpException("Either Amount or MedicalScheme should be entered, but not both.", HttpStatus.BAD_REQUEST);
        }
        // Your service logic here
    

        const newOPDPatient = this.OPDRepository.create({
            FirstName: OpdDetails.FirstName,
            LastName: OpdDetails.LastName,
            Treatment: OpdDetails.Treatment,
            Amount: typeof OpdDetails.Amount === 'string' && OpdDetails.Amount !== '' ? +OpdDetails.Amount : null,
            MedicalScheme: typeof OpdDetails.MedicalScheme === 'string' && OpdDetails.MedicalScheme !== '' ? OpdDetails.MedicalScheme : null,
            Date: new Date(),
        });

        await this.OPDRepository.save(newOPDPatient);
    }

 
    async CountOpdPatient(): Promise<number>{
        const count = await this.OPDRepository.count();
        return count;
    }

    async countPatientsWithMessage(): Promise<string> {
        const count = await this.CountOpdPatient();
        return `This is the number of patients registered today: ${count}`;
    }

    async UpdateOPDPatientById(ID: number, UpdateOpdDetails: UpdateOpdParams): Promise<void> {
        const updateObject: Partial<UpdateOpdParams> = {};

        if (UpdateOpdDetails.FirstName !== undefined) {
            updateObject.FirstName = UpdateOpdDetails.FirstName;
        }

        if (UpdateOpdDetails.LastName !== undefined) {
            updateObject.LastName = UpdateOpdDetails.LastName;
        }

        if (UpdateOpdDetails.Treatment !== undefined) {
            updateObject.Treatment = UpdateOpdDetails.Treatment;
        }

        if (UpdateOpdDetails.Amount !== undefined) {
            updateObject.Amount = UpdateOpdDetails.Amount;
        }

        if (UpdateOpdDetails.MedicalScheme !== undefined) {
            updateObject.MedicalScheme = UpdateOpdDetails.MedicalScheme;
        }

        if (Object.keys(updateObject).length > 0) {
            await this.OPDRepository.update(ID, updateObject);
        }
    }

    async DeleteOPDPatientById(ID: number): Promise<void> {
        await this.OPDRepository.delete(ID);
    }
}
