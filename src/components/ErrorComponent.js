import React from "react";

const ErrorComponent = ({ error }) => {
  const statusTable = {
    400: "Матчи не найдены, проверьте запрос (400)",
    403: "К сожалению бесплатная версия API не позволяет показать данный контент (403)",
    404: "Матчи не найдены (404)",
    429: "Количество использований бесплатного API превышено. Пожалуйста, подождите минуту. (429)",
    CORS: "Ошибка загрузки данных.",
  };
  return (
    <div className="errorMessage">
      <div>Ошибка!</div>
      {error.response === undefined ? (
        <div>{statusTable["CORS"]}</div>
      ) : (
        <div>{statusTable[error.response.status]}</div>
      )}
    </div>
  );
};

export default ErrorComponent;
