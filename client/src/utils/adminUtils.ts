import {Roles} from "../../../interfaces";

export const isAdmin = (roles?:Roles[]):boolean => roles?.includes("ADMIN" as Roles) || false;
