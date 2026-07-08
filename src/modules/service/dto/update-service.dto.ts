import { PartialType } from "@nestjs/mapped-types";
import { Service } from "../service.entity";


export class UpdateServiceDto extends PartialType(Service){}