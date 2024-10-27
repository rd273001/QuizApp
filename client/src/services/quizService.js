import axiosInstance from "../utils/axiosInstance";

export const createQuiz = async () => {
  const response = await axiosInstance.post( '/quiz/create' );
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axiosInstance.get( '/quiz/all' );
  return response.data;
};

export const getQuizDetails = async ( id ) => {
  const response = await axiosInstance.get( `/quiz/${ id }` );
  return response.data;
};

export const submitQuiz = ( { id, answers } ) => axiosInstance.post( `/quiz/${ id }/submit`, { answers } );