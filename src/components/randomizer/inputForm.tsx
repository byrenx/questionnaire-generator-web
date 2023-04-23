import { useState } from 'react';
import * as XLSX from 'xlsx';
import {Question, QuestionnaireGeneratorConfig} from '../../models';
import {generateQuestionnaireSets} from '../../utils';

export const InputForm = () => {
	const [spreadsheetFile, setSpreadsheetFile] = useState(null);
  	const [numQuestionnaireSets, setNumQuestionnaireSets] = useState(1);
	const [questionsPerSet, setQuestionsPerSet] = useState(1);
  	const [numQuestionsPerDifficulty, setNumQuestionsPerDifficulty] = useState({
    	  Remembering: 0,
    	  Understanding: 0,
          Applying: 0,
          Evaluating: 0,
          Creating: 0,
	});

	const generateQSets = (
		questions: Question[],
		config: QuestionnaireGeneratorConfig
	) => {
		const questionnaireSets = generateQuestionnaireSets(questions, config)
		console.log(questionnaireSets)
	}

	const handleGenerateQuestionnaires = async () => {
		const file = spreadsheetFile
		const config: QuestionnaireGeneratorConfig = {
			sets: numQuestionnaireSets,
			itemsPerSet: questionsPerSet,
			distribution: numQuestionsPerDifficulty,
		}

		let questions: Question[] = [];
		const data = await file.arrayBuffer();
		const workbook = XLSX.read(data, {type: 'array'});
		workbook.SheetNames.forEach((sheetName) => {
			const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
			data.forEach(datum => {
				questions.push(new Question({
					question: datum['Question'],
					difficulty: datum['Difficulty(Bloom\'s Taxonomy)'],
					choices: datum['Choices (Should always be separated with semicolon ";".)'].split(';')
				}));
			});
		});
		console.log(questions);
		generateQSets(questions, config);
	};

	//	const handleChooseFileClick = () => {
	//		fileRef.current.click();
	//	}
	//
	//	const handleOnChangeFileSelect = () => {
	//		fileName.current.value = fileRef.current.value
	//	}

	return (

      <form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="spreadsheetFile">Spreadsheet File:</label>
      <input
        type="file"
        id="spreadsheetFile"
        onChange={(event) => setSpreadsheetFile(event.target.files[0])}
      />
      <br />

      <label htmlFor="numQuestionnaireSets">
        Number of Questionnaire Sets:
      </label>
      <input
        type="number"
        id="numQuestionnaireSets"
        value={numQuestionnaireSets}
        onChange={(event) => setNumQuestionnaireSets(event.target.value)}
      />
      <br />

      <label htmlFor="questionsPerSet">
        Number of Questions Per Set:
      </label>
      <input
        type="number"
        id="questionsPerSet"
        value={questionsPerSet}
        onChange={(event) => setQuestionsPerSet(event.target.value)}
      />
      <br />


      <label htmlFor="numQuestionsPerDifficulty">
        Number of Questions per Difficulty:
      </label>
      <br />
      <label htmlFor="remembering">Remembering:</label>
      <input
        type="number"
        id="remembering"
        value={numQuestionsPerDifficulty.Remembering}
        onChange={(event) =>
          setNumQuestionsPerDifficulty({
            ...numQuestionsPerDifficulty,
            Remembering: event.target.value,
          })
        }
      />
      <br />

      <label htmlFor="understanding">Understanding:</label>
      <input
        type="number"
        id="understanding"
        value={numQuestionsPerDifficulty.Understanding}
        onChange={(event) =>
          setNumQuestionsPerDifficulty({
            ...numQuestionsPerDifficulty,
            Understanding: event.target.value,
          })
        }
      />
      <br />

      <label htmlFor="applying">Applying:</label>
      <input
        type="number"
        id="applying"
        value={numQuestionsPerDifficulty.Applying}
        onChange={(event) =>
          setNumQuestionsPerDifficulty({
            ...numQuestionsPerDifficulty,
            Applying: event.target.value,
          })
        }
      />
      <br />

      <label htmlFor="evaluating">Evaluating:</label>
      <input
        type="number"
        id="evaluating"
        value={numQuestionsPerDifficulty.Evaluating}
        onChange={(event) =>
          setNumQuestionsPerDifficulty({
            ...numQuestionsPerDifficulty,
            Evaluating: event.target.value,
          })
        }
      />
      <br />

      <label htmlFor="creating">Creating:</label>
      <input
        type="number"
        id="creating"
        value={numQuestionsPerDifficulty.Creating}
        onChange={(event) =>
          setNumQuestionsPerDifficulty({
            ...numQuestionsPerDifficulty,
            Creating: event.target.value,
          })
        }
      />
      <br />

      <button onClick={handleGenerateQuestionnaires}>Generate Questionnaire</button>
    </form>
  );

}

const styles = {
	questionnaireInputFormContainer: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: "650px",
	},

	formInput: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginBottom: 10,
	},
	distributionContainer: {
		display: "flex",
		flexDirection: "column"
	},
	field: {
		height: "25px",
    		borderRadius: "5px",
    		borderColor: "blue",
    		border: "1px solid"
	},
	hidden: {
		display: "none"
	},
	distribInputGroup: {
		display: "flex",
		justifyContent: "space-between"
	},
	distribSpan: {
		marginBottom: "10px",
		fontWeight: 500
	},
	label500: {
		fontWeight: 500,
	},
	label300: {
		fontWeight: 300,
		fontStyle: "italic"
	},
	button: {
		color: "white",
		borderRadius: "5px",
		backgroundColor: "#0056d2",
		height: "25px",
		border: 0
	}
}
