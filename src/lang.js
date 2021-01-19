import kr from './lang/kr.js'
import en from './lang/en.js'
import jp from './lang/jp.js'

let languagepack = {kr, en, jp};
let language = 'kr';

export const LangSet = (lang) => {
    language = lang;
}

export const Translate = (key) => {
    if(key in languagepack[language]) return languagepack[language][key]
    else return 'tranlate error'
}