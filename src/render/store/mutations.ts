import { MutationTree } from 'vuex';
import { State } from "./state";

export const enum MutationTypes{
    setConfigYaml="setConfigYaml",
    setConfigYamlStatus="setConfigYamlStatus",
    setTrees="setTrees"
}

type Mutation<S= State> = {
    [MutationTypes.setConfigYaml](state:S,value:number):void
}

export const mutations:Mutation & MutationTree<State> = {
    [MutationTypes.setConfigYaml](state:State,value:number):void{
        state.ConfigYaml.Yaml=value
    },
    [MutationTypes.setConfigYamlStatus](state:State,value:number):void{
        state.ConfigYaml.status=value
    },
    [MutationTypes.setTrees](state:State,value:any):void{
        state.FilmPath.Trees=value
    }
}