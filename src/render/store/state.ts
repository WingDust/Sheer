


export const state = {
    FilmPath:{
        Trees:Object.create(null),
        status:false
    },
    Flag:{
        flag:false,
        times:0
    },
    ConfigYaml:{
        Yaml:Object.create(null),
        status:0
    }
}
export type State = typeof state