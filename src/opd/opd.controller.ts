import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OpdService } from './opd.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOpdDto } from './DTOs/CreateOpdDto';
import { UpdateOpdDto } from './DTOs/UpdateOpdDtos';
import { OPD } from 'src/Entitys/OPD.Entity';

@Controller('opd')
@ApiTags('OPD')
export class OpdController {
    constructor(private OpdServices: OpdService) {}
    @Post()
    @ApiOperation({summary:'OPD patient created succesfully'})
    @ApiResponse({ status: 200, description: 'opd patient  created Successful ' })
    async CreateOPDPatient(@Body() opdDto: CreateOpdDto): Promise<void> {
      try {
          if ((opdDto.Amount === null && opdDto.MedicalScheme === null) ||
              (opdDto.Amount !== null && opdDto.MedicalScheme !== null)) {
              throw new HttpException("Either Amount or MedicalScheme should be entered, but not both.", HttpStatus.BAD_REQUEST);
          }
          await this.OpdServices.CreateOPDPatient(opdDto);
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
  }
  
    @Get()
    @ApiOperation({summary:'get all opd patients'})
    @ApiResponse({ status: 200, description: 'return all opd patients ' })
    async findAllOPDPatient()  {
      const patients=await this.OpdServices.findAllOPDPatient();
      return patients;

    }
    @Get(':name')
    @ApiOperation({summary:'get an opd patient'})
    @ApiResponse({ status: 200, description: 'return a certain opd patient ' })
    async findOPDpatientByName(@Param('name') name: string): Promise<OPD[] | string> {
      if (!name) {
        return 'Name is not provided';
      }
    
      const results = await this.OpdServices.findOPDpatientByName(name);
    
      if (results.length === 0) {
        return 'Name not found';
      }
    
      return results;
    }
  


    

    @Put(':ID')
    @ApiOperation({summary:'opd patient updated succesffuly'})
    @ApiResponse({ status: 200, description: 'opd patient updated succesffuly ' })
    async UpdateOPDPatientById(@Param('ID',ParseIntPipe) ID:number,@Body() UpdateOpdDto:UpdateOpdDto){
      await this.OpdServices.UpdateOPDPatientById(ID,UpdateOpdDto)
        return 'patient updated sucessfully'
    }

    @Delete(':ID')
    @ApiOperation({summary:'opd patient deleted '})
    @ApiResponse({ status: 200, description: 'opd  patient deleted Successfully ' })

    DeleteOPDPatientById(@Param('ID',ParseIntPipe)ID:number){
      this.OpdServices.DeleteOPDPatientById(ID);

        return 'patient deleted sucessfully'
    }

}
