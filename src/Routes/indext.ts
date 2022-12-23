import Units from 'pages/Units';
import DigitalForms from 'pages/DigitalForms';
import Inspections from 'pages/Inspections';
import EmailTemplates from 'pages/EmailTemplates';
import Companies from 'pages/Companies';
import Locations from 'pages/Locations';
import Notifications from 'pages/Notifications';
import Regions from 'pages/Regions';
import Tasks from 'pages/Tasks';
import Users from 'pages/Users';
import WorkOrders from 'pages/WorkOrders';

export interface IRoutes {
  path: string;
  component: React.FC;
}

export const PrivateRoutes: IRoutes[] = [
  {
    path: 'units',
    component: Units,
  },
  {
    path: 'inspections',
    component: Inspections,
  },
  {
    path: 'workorders',
    component: WorkOrders,
  },
  {
    path: 'tasks',
    component: Tasks,
  },
  {
    path: 'notifications',
    component: Notifications,
  },
  {
    path: 'companies',
    component: Companies,
  },
  {
    path: 'regions',
    component: Regions,
  },
  {
    path: 'locations',
    component: Locations,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: 'emailtemplates',
    component: EmailTemplates,
  },
  {
    path: 'digitalForms',
    component: DigitalForms,
  },
];
