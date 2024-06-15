import ListIcon from '@mui/icons-material/List';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import RouteIcon from '@mui/icons-material/Route';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const emailScheduleArr = [
    {
        "type": "datetime-local",
        "required": true,
        "id": "schedule_date_time",
        "name": "schedule_date_time",
        "placeholder": "Schedule Date & Time",
        "icon": <ScheduleIcon className={iconCss} />
    },
    {
        "type": "dynamic_select",
        "required": true,
        "id": "schedule_customer",
        "name": "schedule_customer",
        "placeholder": "Select Customer",
        "icon": <GroupIcon className={iconCss} />,
        "multiple": true, 
        "options": [] 
    },
    {
        "type": "option",
        "required": true,
        "id": "schedule_template",
        "name": "schedule_template",
        "placeholder": "Select Email Template",
        "icon": <EmailIcon className={iconCss} />,
        "options": [] 
    },
    {
        "type": "option",
        "required": true,
        "id": "schedule_route_id",
        "name": "schedule_route_id",
        "placeholder": "Route ID",
        "icon": <RouteIcon className={iconCss} />
    },
    // {
    //     "type": "select",
    //     "required": true,
    //     "id": "status",
    //     "name": "status",
    //     "placeholder": "Status",
    //     "icon": <ListIcon className={iconCss} />,
    //     "options": [
    //         { value: 'schedule', label: 'Scheduled' },
    //         { value: 'sent', label: 'Sent' }
    //     ]
    // }
]

export default emailScheduleArr;
