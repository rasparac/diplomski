<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class ProjectsFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'project_name' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'associates_number' => 'required',
            'description' => 'required'
        ];
    }
}
