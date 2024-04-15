// laboratory.controller.ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryService } from './laboratory.service';
import { CreateLaborotoryDTO } from './DTOs/CreateLabotory.Dto';
import { Laboratory } from 'src/Entitys/Laborotary.Entity';
import { UpdatedLaborotoryDTO } from './DTOs/UpdateLabotory.Dto';

@Controller('laboratory')
@ApiTags('Laboratory')
export class LaboratoryController {

    constructor(private LaboratoryServices: LaboratoryService) {};

    @Post()
    @ApiOperation({summary:'Laboratory patient created '})
    @ApiResponse({ status: 200, description: 'Laboratory patient created successfullly ' })
    createLaborotoryPatient(@Body() LabDTO:CreateLaborotoryDTO){
        this.LaboratoryServices.createLaborotoryPatient(LabDTO)
        return 'Laboratory patient created successfully';
    }

    @Get()
    @ApiOperation({summary:'return all Laboratory patients'})
    @ApiResponse({ status: 200, description: 'return all Laboratory patient  ' })
    async findAllLaboratoryPatients(): Promise<Laboratory[] | string> {
        return await this.LaboratoryServices.findAllLaboratoryPatientsByCurrentDay();
    }

    @Get(':name')
    @ApiOperation({summary:'get an Laboratory patient  '})
    @ApiResponse({ status: 200, description: 'an Laboratory patient returned successfully ' })
    async findLaboratoryPatientByName(@Param('name') name: string): Promise<Laboratory[] | string> {
        return await this.LaboratoryServices.findLaboratoryPatientByName(name);
    }
  
    @Put(':ID')
    @ApiOperation({summary:'update Laboratory patient by id'})
    @ApiResponse({ status: 200, description: 'Laboratory patient updated successfully ' })  
    async UpdateLaboratoryPatientById(@Param('ID',ParseIntPipe) ID:number,@Body() UpdatedLabDto:UpdatedLaborotoryDTO){
        await this.LaboratoryServices.UpdateLaboratoryPatientById(ID, UpdatedLabDto);
        return 'Lab patient updated successfully';
    }

    @Delete(':ID')
    @ApiOperation({summary:'Delete Laboratory patient  '})
    @ApiResponse({ status: 200, description: 'Laboratory patient deleted successfully ' })
    async DeleteLabPatientById(@Param('ID',ParseIntPipe)ID:number){
        await this.LaboratoryServices.DeleteLabPatientById(ID);
        return 'Lab patient deleted successfully';
    }  
}
