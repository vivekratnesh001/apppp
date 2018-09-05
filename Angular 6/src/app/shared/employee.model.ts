//This is a model class to define mongodb schemas using mongoose packages

export class Employee {
    //all properties has to be added according to mongodb 
    _id: string;
    email: string;
    projectname: string;
    datacenter: string;
    ostype: string;
}
