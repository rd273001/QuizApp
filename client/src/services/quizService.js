import axiosInstance from "../utils/axiosInstance";

export const createQuiz = async () => {
  const { data } = await axiosInstance.post( '/quiz/create' );
  return data;
};

export const getQuizzes = async () => {
  const { data } = await axiosInstance.get( '/quiz/all' );
  return data;
};

export const getQuizDetails = async ( id ) => {
  const { data } = await axiosInstance.get( `/quiz/${ id }` );
  return data;
};

export const submitQuiz = async ( { id, answers } ) => {
  const { data } = axiosInstance.post( `/quiz/${ id }/submit`, { answers } );
  return data;
};