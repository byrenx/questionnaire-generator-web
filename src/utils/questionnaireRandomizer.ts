import { sampleSize } from 'lodash'
import { Question, QuestionnaireGeneratorConfig } from '../models'

export const generateQuestionnaireSets = (
    questions: Question[],
    config: QuestionnaireGeneratorConfig
) => {
    // initialize output
    // generate grouping of questions by diffulty
    const generateQuestionDiffultyMap = () => {
        let questionsMapping: { [key: string]: Question[] } = {}
        for (const question of questions) {
            if (!questionsMapping[question.difficulty])
                questionsMapping[question.difficulty] = [question]
            else questionsMapping[question.difficulty].push(question)
        }

        return questionsMapping
    }

    const generateSingleSet = (questionsMapping: {
        [key: string]: Question[]
    }) => {
        let questionnaires: Question[] = []
        const { distribution } = config
        for (const key in distribution) {
            const items = +distribution[key]
            const randomQuestions = sampleSize(questionsMapping[key], items)
            questionnaires.push(...randomQuestions)
        }
        return questionnaires
    }

    let questionnaireSets: { [key: string]: Question[] } = {}
    let setKey: number = 65 //A
    // iterate per set
    const { sets } = config
    const questionsMapping = generateQuestionDiffultyMap()

    for (let index = 0; index < sets; index++) {
        const key = String.fromCharCode(setKey)

        questionnaireSets[key] = generateSingleSet(questionsMapping)
        setKey += 1
    }

    return questionnaireSets
}
