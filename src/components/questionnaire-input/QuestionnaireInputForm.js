export const QuestionnaireInputForm = (props) => {
  return (
    <div style={styles.questionnaireInputFormContainer}>
      <form>
        <div style={styles.formInput}>
          <label for="fileSelect">Select Questionnaire File</label>
          <input
            id="fileSelect"
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
          <button>Generate Questionnaires</button>
        </div>
      </form>
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
