import { MutationTree } from 'vuex';
import { State } from "./state";

// TODO 需要做注释
export const enum MutationTypes{
    setConfigYaml="setConfigYaml",
    setConfigYamlStatus="setConfigYamlStatus",
    setTrees="setTrees",
    setViewStatus="setViewStatus"
}

type Mutation<S= State> = {
    [MutationTypes.setConfigYaml](state:S,value:number):void
}

export const mutations:Mutation & MutationTree<State> = {
    // []中为方法名 () 为参数类型断言
    [MutationTypes.setConfigYaml](state:State,value:number):void{
        state.ConfigYaml.Yaml=value
    },
    [MutationTypes.setConfigYamlStatus](state:State,value:number):void{
        state.ConfigYaml.status=value
    },
    [MutationTypes.setTrees](state:State,value:any):void{
        state.FilmPath.Trees=value
    },
    [MutationTypes.setViewStatus](state:State,value:any):void{
        state.View.sibebar=value
    }
}