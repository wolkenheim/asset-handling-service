import { IsNotEmpty, IsInt, ValidateNested, IsArray, IsUUID, IsDateString } from 'class-validator';

export class CreateBriefingDTO {

    @IsUUID()
    id: string;

    @IsNotEmpty()
    content_piece_id: string

    @IsNotEmpty()
    briefing_type: string

    @IsNotEmpty()
    team: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    jira_ticket_title: string

    @IsDateString()
    deadline: Date

    @IsDateString()
    briefing_date: Date

    @IsInt()
    kw: number

    camera: string

    @IsInt()
    scene: number;

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