import { useRef } from "react";
import * as Papa from "papaparse";
import { Question } from "@byrenx/questionnaire-generator";

export const QuestionnaireInputForm = () => {
  const fileRef: any = useRef(null);

  const generateQuestionnaireSets = (questions: Question[]) => {
    console.log(questions);
  }

  const handleGenerateQuestionnaires = () => {
    console.log('handling click event');
    const file = fileRef?.current?.files[0];

    Papa.parse(file, {
      delimiter: ";",
      header: true,
      complete: (results, file) => {
    	let questions: Question[] = [];
	for (const item of results.data) {
	  if (!item['Question']) continue;
      	  questions.push(new Question({
	      question: item['Question'].trim(),
	      difficulty: item['Difficulty'].trim(),
	      choices: item['Choices'].split(",").map(it => it.trim())
          }));
	}
	
	generateQuestionnaireSets(questions);
      },
    });
  };


  return (
    <div style={styles.questionnaireInputFormContainer}>
      <div style={styles.formInput}>
        <label>Select Questionnaire File</label>
        <input
          id="fileSelect"
          ref={fileRef}
          type="file"
          name="questionnaires"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </div>
      <div style={styles.formInput}>
        <label>No. of Sets</label>
        <input type="number" />
      </div>
      <div style={styles.formInput}>
        <label>Items per Set</label>
        <input type="number" />
      </div>
      <div style={styles.formInput}>
        <label>Distribution</label>
        <input placeholder="Remembering" type="number" />
        <input placeholder="Understanding" type="number" />
        <input placeholder="Applying" type="number" />
        <input placeholder="Analyzing" type="number" />
        <input placeholder="Evaluating" type="number" />
      </div>
      <div style={styles.formInput}>
        <button onClick={handleGenerateQuestionnaires}>
          Generate Questionnaires
        </button>
      </div>
    </div>
  );
};

const styles = {
  questionnaireInputFormContainer: {
    display: "flex",
    flexDirection: "column",
  },

  formInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },
};
