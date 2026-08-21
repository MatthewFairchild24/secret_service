import { Project } from "../project.entity";
import { ProjectDto } from "./project.dto";


export class ProjectMapper{
    static toDo(project:Project): ProjectDto{
        return{
            id: project.id,
            title: project.title,
            description_0: project.description_0,
            description_1: project.description_1,
            description_2: project.description_2,
            short_text: project.short_text,
            image_0:project.image_0
            ? {
                id: project.image_0.id,
                url: `${process.env.API_URL}/${project.image_0.image_path}`
            } : null,

            image_1: project.image_1 
            ? {
                id: project.image_1.id,
                url: `${process.env.API_URL}/${project.image_1.image_path}`
            } : null,
            video: project.video
            ? {
                id: project.video.id,
                url: `${process.env.API_URL}/${project.video.path}`
            } :  null

        }
    }
}