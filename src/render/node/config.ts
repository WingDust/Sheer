const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

/**
 * 常量
 */
const  FilmYamlPath:string = "../../../../../../src/render/public/film.yml"

function readfilmPath(p:string):string[]|undefined {
    try {
        p = path.join(__dirname,p)
        const  FilmPath = yaml.safeLoad(fs.readFileSync(p,"utf8"))
        return FilmPath
    } catch (error) {
        console.log(error);
    }
}


export { readfilmPath }