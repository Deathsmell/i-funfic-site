export default function getEnums<T>(enums:T){
    let roles: string[] = []
    for (let prop in enums) {
        roles.push(prop)
    }
    return roles;
}