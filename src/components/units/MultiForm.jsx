import React, { useState } from "react";

import MultiFormOption from "./MultiFormOption";

const MultiForm = ({
  actionTextOptions,
  titleOptions,
  formOptions,
  ...rest
}) => {
  const [islogging, isloggingSet] = useState(true);

  const [firstTitle, secondTitle] = titleOptions;
  const [FirstOption, SecondOption] = formOptions;
  const [firstActionText, secondActionText] = actionTextOptions;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col border-b border-solid border-primary py-5 dark:border-secondary">
        {islogging ? <FirstOption {...rest} /> : <SecondOption {...rest} />}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <div className="inline-flex items-center">
          <MultiFormOption
            title={islogging ? firstTitle : secondTitle}
            updateOption={() => isloggingSet(!islogging)}
            actionText={islogging ? firstActionText : secondActionText}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiForm;
