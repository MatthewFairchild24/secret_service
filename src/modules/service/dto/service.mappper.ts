import { Service } from "../service.entity";
import { ServiceDto } from "./serviceDto.dto";

export class ServiceMapper{
    static toDo(service:Service): ServiceDto{
        return{
            id: service.id,
            title: service.title,
            preview_text: service.preview_text,
            description: service.description,

            image_0: service.image_0 
            ? {
                id: service.image_0.id,
                url: `${process.env.API_URL}/${service.image_0.image_path}`
            } : null,
            image_1: service.image_1 
            ? {
                id: service.image_1.id,
                url: `${process.env.API_URL}/${service.image_1.image_path}`
            } : null,
            icon: service.icon ? {
                id: service.icon.id,
                url: `${process.env.API_URL}/${service.icon.image_path}`
            } : null

        }
    }
}