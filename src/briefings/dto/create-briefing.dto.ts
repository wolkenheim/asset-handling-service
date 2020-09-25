import { IsNotEmpty, IsInt, ValidateNested, IsArray, IsUUID } from 'class-validator';


export class CreateBriefingDTO {

    @IsUUID()
    id: string;

    @IsInt()
    scene: number;

    @IsNotEmpty()
    jira_ticket_title: string

}

/**
 *           'id' => 'required|uuid',
            'briefing_type' => ['required', 'in:'.$this->getBriefingTypes()],
            'content_piece_id' => 'required|uuid',
            'team' => 'required|string',
            'description' => 'nullable|string',
            'jira_ticket_title' => 'string',
            'deadline' => 'nullable|date',
            'briefing_date' =>  'required|date',
            'kw' => 'integer',
            'camera' => 'nullable',
            'scene' => 'integer',
 */